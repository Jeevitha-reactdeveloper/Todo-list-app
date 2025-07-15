
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState,useEffect} from 'react';
import Additem from './Additem';
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';


function App() {
  const API_URL ='http://localhost:3500/items'
  const [items,setItems] = useState([]);
  const [newItem,setNewItem] = useState('')
  const [search,setSearch] =useState('')
  const[fetchError,setFetchError] = useState(null)
  const[loading,setLoading]  = useState(true);

  /*const storedItems=localStorage.getItem('todo_list');
    return storedItems ? JSON.parse(storedItems):[];
   when using useeffect with local storage: JSON.parse(localStorage.getItem('todo_list'))*/
  
 useEffect(()=> {
  const fetchitems = async()=>{
    try{
       const response = await fetch(API_URL);
       if (!response.ok) throw Error("Data not received");
       const listItems =await response.json();
       setItems(listItems);
       setFetchError(null)
    }catch(err){
      console.log(err.stack)
      setFetchError(err.message)
    }finally{
      setLoading(false)
    }
  }
  setTimeout(() => {
     (async () => await fetchitems())()
  }, 2000);
 

 },[])

    

    const handleCheck = async(id) =>{
        const checked = items.map((item) => item.id===id ?  {...item,checked:!item.checked} : item )
        setItems(checked) 
        /*localStorage.setItem("todo_list",JSON.stringify(checked))*/
        
        const myItem =checked.filter((item)=> item.id===id)
        
        const updateOptions = {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({checked:myItem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl,updateOptions)
    if(result) setFetchError(result)
    }
    

    const handleDelete = async(id) =>{
        const deletedItem = items.filter((item) => item.id !==id )
        setItems(deletedItem)

        const deleteOptions = {
      method:'DELETE'
      }

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl,deleteOptions)
    if(result) setFetchError(result)
      }

    const  addItem =async(item) => {
      const id = items.length ? items[items.length-1].id+1 : 1;
      const addNewItem ={id,checked:false,item}
      const listItems =[...items,addNewItem];
      setItems(listItems)
      /*localStorage.setItem("todo_list",JSON.stringify(listItems))*/

      const postOptions = {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(addNewItem)
    }
    const result = await apiRequest(API_URL,postOptions)
    if(result) setFetchError(result)
    }



    const handleSubmit = (e) =>{
        e.preventDefault()
        if(!newItem) return;
        addItem(newItem)
        setNewItem('')

    }

  return (
   <div className='to-do'>
    <Header/>
    <Additem
    newItem={newItem}
    setNewItem={setNewItem}
    handleSubmit={handleSubmit}/>
    <SearchItem
    search={search}
    setSearch={setSearch}/>
    <main>
      {loading && <p>loading items....</p>}
      {fetchError && <p>{`Error: ${fetchError}`}</p>}
      {!loading && !fetchError && <Content
      items ={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
      handleCheck={handleCheck}
      handleDelete={handleDelete}
      />}
    </main>
    <Footer
    length={items.length}/>
   </div>
  );
}

export default App;

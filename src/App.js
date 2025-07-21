
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState,useEffect} from 'react';
import Additem from './Additem';
import SearchItem from './SearchItem';


function App() {
  const [items,setItems] = useState([]);
  const [newItem,setNewItem] = useState('')
  const [search,setSearch] =useState('')
  const[loading,setLoading]  = useState(true);

  /*const storedItems=localStorage.getItem('todo_list');
    return storedItems ? JSON.parse(storedItems):[];
   when using useeffect with local storage: JSON.parse(localStorage.getItem('todo_list'))*/
  
 useEffect(()=> {
  const storedItems = JSON.parse(localStorage.getItem('todo_list')) || [];
    setItems(storedItems);
    setLoading(false);
 },[])

 useEffect(() => {
    localStorage.setItem('todo_list', JSON.stringify(items));
  }, [items]);

     const handleCheck =(id) =>{
        const checked = items.map((item) => item.id===id ?  {...item,checked:!item.checked} : item )
        setItems(checked) 
        /*localStorage.setItem("todo_list",JSON.stringify(checked))*/
    }
    

    const handleDelete = async(id) =>{
        const deletedItem = items.filter((item) => item.id !==id )
        setItems(deletedItem)
      }

    const  addItem =async(item) => {
      const id = items.length ? items[items.length-1].id+1 : 1;
      const addNewItem ={id,checked:false,item}
      const listItems =[...items,addNewItem];
      setItems(listItems)
      /*localStorage.setItem("todo_list",JSON.stringify(listItems))*/
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
      {!loading &&  <Content
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

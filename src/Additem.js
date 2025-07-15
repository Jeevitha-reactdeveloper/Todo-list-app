import { FaPlus } from "react-icons/fa"
import { useRef } from "react"

const Additem = ({newItem,setNewItem,handleSubmit}) => {

  const inputRef = useRef()
  return (
    <form action='' className="addForm">
        <input 
        type='text'
        ref={inputRef}
        autoFocus
        placeholder='Add items'
        id='addItem'
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}/> 
        <button
          type='submit'
          aria-label='Add Item'
          onClick={(e) => {
           handleSubmit(e);
          inputRef.current.focus();
  }}
        >
            <FaPlus/>
        </button>
        
    </form>
  )
}

export default Additem
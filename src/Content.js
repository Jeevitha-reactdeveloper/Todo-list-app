
import {FaTrashAlt} from "react-icons/fa";

const Content = ({items,handleCheck,handleDelete}) => {
    
  return (
    <main>
{items.length ?
    <ul>
        {items.map((item) => (
            <li className="list"  key={item.id}>
                <input 
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => handleCheck(item.id)}
                />
                <label onDoubleClick={() => handleCheck(item.id)}>{item.item}</label>
                < FaTrashAlt
                   role="button"
                   onClick={() => handleDelete(item.id)}
                   tabIndex="0"/>
            </li>
        ))}
        
    </ul> : <p>Your List is Empty...</p>}


    </main>
  )
}

export default Content
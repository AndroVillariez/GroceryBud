import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function List({list,deleteItem, editItem}){
return(
    <div className="grocery-list-box">
    {list.map((item)=>
    <div key={item.id} className="grocery-item">
    <p>{item.title}</p>

    <div className="item-button-box">
            <button className="edit-btn" onClick={() => editItem(item.id)} >
                <FaEdit />
            </button>
            <button className="delete-btn" onClick={() => deleteItem(item.id,item.title)} >
               <FaTrash />
            </button>
    </div>
    </div>)
   }
   </div>
);
};
import { useState, useEffect } from 'react';
import './App.css';
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function App() {
  const [input, setInput] = useState("");
  const [isEditing,setIsEditing] = useState(false);
  const [list, setList] = useState(getLocalStorage());
  const [selectID,setSelectID] = useState(null);
  const [alert,setAlert] = useState({state: false, type: "", content: ""});
  const [check, setCheck] = useState(false);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert({state: false, type: "", content: ""});
    }, 3000);
  
    return () => clearTimeout(timeout);
  }, [check]);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    

    if(input && !isEditing){

      setAlert({state: true, type: "confirm", content: `'${input}' Added To The Basket`});
      const newItem = { id: new Date().getTime().toString(), title: input};
      setList([...list, newItem]);
      setInput("");
     
    }if(input && isEditing){

      setList(
        list.map((item) => {
          if (item.id === selectID) {
            return { ...item, title: input };
          }
          return item;
        })
      );

      setIsEditing(false);
      setSelectID(null);
      setInput("");

      setAlert({state: true, type: "confirm", content: `Item Changed To '${input}'`});
    }else if(!input){
      setAlert({state: true, type: "warning", content: "Please enter value"});
    }
    
    setCheck(!check);
  }

  const clearList = () =>{
    setAlert({state: true, type: "confirm", content: "Basket is Empty"});
    setList([]);
    setCheck(!check);
  }

  const deleteItem = (targetID,targetTitle) => {
    setAlert({state: true, type: "warning", content: `'${targetTitle}' Removed From The Basket`});
    setList(list.filter((item) => item.id !== targetID));
    setCheck(!check);
  };

  const editItem = (id) => {
    const selected = list.find((item) => item.id === id);
    setIsEditing(true);
    setSelectID(id);
    setInput(selected.title);
    console.log(selectID);
  };
 
  return (
  
      <div className="basket-box">
       
       {alert.state && (
      <div className={`alert-box-${alert.type}`}>
       {alert.content}
      </div>
       )}
      

       <div className="basket-form-box">

        <form className="list-form" onSubmit={handleSubmit}>
        <h4>Grocery Bud</h4>
          <input className="item-input" type="text" placeholder="e.g. eggs" value={input} onChange={(e) => setInput(e.target.value)}/>
        <button type="submit" className="submit-btn">
          {isEditing ? "Edit" : "Submit"}
        </button>
        </form>
     
       </div>

       {list.length > 0 && (
          <div className="list-menu-box">
        
          <List list={list} deleteItem={deleteItem} editItem={editItem}/>

          <button className="clear-list-btn" onClick={clearList}>
          Clear Items
          </button>
          </div>
         )
         
        }
       
      </div>

  )
}

export default App

//Andro Edsarev S. Villariez

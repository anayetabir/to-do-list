import React, { useRef, useState } from 'react';
import axios from 'axios';

function Todolist(props) {
    const inputRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  const todo = props.todo;

    console.log()

  const handleDelete = () => {
    axios.delete(`http://localhost:8000/api/v1/task/${todo._id}`).then((res) => {
      console.log('todo deleted successfully');
      // Assuming setTodos is a function to update the state in your App component
      window.location.reload()
    });
  };


  const handleUpdateButton = ()=>{
    openModal(true)
   
  }

  const handleInputButton = () => {
    const input = inputRef.current.value;

    axios.put(`http://localhost:8000/api/v1/task/${todo._id}`,{
        todoName:input
      }).then((res)=>{
        console.log("todo updated successfully")
        window.location.reload()
      })
  };

  return (
    <li className="list-item">
      {todo.todoName}
      <span className='icons'>
        <i className="fa-solid fa-trash-can icon-delete" onClick={handleDelete}></i>
        <span style={{ paddingLeft: "20px" }}>
          <i className="fa-solid fa-file-pen" onClick={handleUpdateButton}></i>
        </span>
      </span>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-button" onClick={closeModal}>
              x
            </button>
            <input
            type="text"
            className="input-box-todo"
            ref={inputRef}
            defaultValue={todo.todoName}
          />
          <button className="add-btn" onClick={handleInputButton}>
            <i className="fa-solid fa-square-plus"></i>
          </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default Todolist;

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Todolist from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  console.log(todos)
  console.log("here is the data",todos)
  

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/tasks').then((res) => {
      console.log(res.data); // Check the structure of the response
      setTodos(res.data.tasks);
      console.log("abir data",res.data.tasks)
    });
  }, []);

  const inputRef = useRef();

  const handleInputButton = () => {
    const input = inputRef.current.value;

    axios.post('http://localhost:8000/api/v1/task', {
      todoName: input,
    }).then((res) => {
      console.log('todo added successfully');
      window.location.reload()
      
    });
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <div className="input-container">
          <input
            type="text"
            className="input-box-todo"
            ref={inputRef}
          />
          <button className="add-btn" onClick={handleInputButton}>
            <i className="fa-solid fa-square-plus"></i>
          </button>
        </div>

        <h1 className="app-heading">TODO</h1>
        <hr />
        {todos.map((todo) => {
      return <Todolist key={todo._id} todo={todo} />;
    })}
      </div>
    </div>
  );
}

export default App;

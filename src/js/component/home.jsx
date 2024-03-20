import React, { useState, useEffect } from 'react';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  //POST
  const urlTodos = "https://playground.4geeks.com/apis/fake/todos/user/josereimondez29";
  useEffect(() => {
    
    
    fetch(urlTodos, )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network Error');
        }
        return response.json();
      })
      .then((data) => {
        setTodos(data);
      })
      .catch((error) => {
        return error
      });
  }, [todos]);
  //PUT
  function addTodo  ()  {
    
      const newTodo = {
        label: inputValue,
        done: false
      };
      setTodos([...todos, newTodo]);
      fetch(urlTodos, {
        method: "PUT",
        body: JSON.stringify([...todos, newTodo]),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => { return response.json() })
			.then((data) => { console.log(data) })
			.catch((err) => { err })
      
  };

 

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    
    
    fetch(urlTodos, {
      method: "PUT",
      body: JSON.stringify(newTodos),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => { return response.json() })
    .then((data) => { console.log(data) 
      setTodos(newTodos) })
    .catch((err) => { err })
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => (e.key === 'Enter' ? addTodo() : null)}
        placeholder="Add a new task..."
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo.label}
            <button className="delete-button" onClick={() => handleDelete(index)}><i className="fa-solid fa-trash"></i></button>
          </li>
        ))}
      </ul>
      <div className='Counter'>
        {todos.length === 0 ? (<p>No Duty</p>) : (`${todos.length} task`)}
      </div>
    </div>
  );
};

export default Home;

import './App.css';
import { useState } from 'react';

function App() {
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState('');

  const deleteTask = (id) => {
    setTodos(toDos.filter((task) => task.id !== id));
  };

  const addTask = () => {
    const trimmedInput = toDo.trim();
    if (trimmedInput.length === 0) {
      return;
    }

    if (editMode) {
      setTodos(
        toDos.map((task) => {
          if (task.id === editTaskId) {
            task.text = trimmedInput;
          }
          return task;
        })
      );
      setEditMode(false);
      setEditTaskId('');
    } else {
      setTodos([...toDos, { id: Date.now(), text: trimmedInput, status: false }]);
    }

    setTodo('');
  };

  const editTask = (id) => {
    const taskToEdit = toDos.find((task) => task.id === id);
    if (taskToEdit) {
      setEditMode(true);
      setEditTaskId(id);
      setTodo(taskToEdit.text);
    }
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {new Date().toLocaleDateString('en-US', { weekday: 'long' })} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(event) => setTodo(event.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addTask} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((task) => (
          <div className="todo" key={task.id}>
            <div className="left">
              <input
                onChange={(event) =>
                  setTodos(
                    toDos.map((t) => {
                      if (t.id === task.id) {
                        t.status = event.target.checked;
                      }
                      return t;
                    })
                  )
                }
                checked={task.status}
                type="checkbox"
                name=""
                id=""
              />
              <p>{task.text}</p>
            </div>
            <div className="right">
              <i className="fas fa-pen" onClick={() => editTask(task.id)}></i>
              <i className="fas fa-times" onClick={() => deleteTask(task.id)}></i>
            </div>
          </div>
        ))}
        {toDos
          .filter((task) => task.status)
          .map((completedTask) => (
            <h1 key={completedTask.id}>{completedTask.text}</h1>
          ))}
      </div>
    </div>
  );
}

export default App;

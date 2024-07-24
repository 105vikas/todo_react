import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }


  return (
    <>
      <div>
        <h2 >Add a Todo</h2>
        <div>
          <input onChange={handleChange} value={todo} type="text" />
          <button onClick={handleAdd} disabled={todo.length <= 3} >Save</button>
        </div>
      </div>

      <div></div>

      <h2 >Your Todos</h2>
      <div className="todos">
        {todos.length === 0 && <div>No Todos to display</div>}
        {todos.map(item => {
          return <div key={item.id} >
            <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            {item.todo}
            <span >
              <button onClick={(e) => handleEdit(e, item.id)} >Edit</button>
              <button onClick={(e) => { handleDelete(e, item.id) }} >Delete</button>
            </span>
          </div>
        })}
      </div>
    </>
  )
}

export default App
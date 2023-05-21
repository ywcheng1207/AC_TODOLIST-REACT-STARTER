import { Footer, Header, TodoCollection, TodoInput } from 'components'
import { useEffect, useState } from 'react'
import { getTodos, createTodo, patchTodo, deleteTodo } from 'api/todos'

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState([])

  const handleChange = (value) => {
    setInputValue(value)
  }
  const handleAddTodo = async () => {
    if (inputValue.length === 0) {
      return
    }
    try {
      const data = await createTodo({ title: inputValue, isDone: false })
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
          // id: Math.floor(Math.random() * 100000),
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false
          }
        ]
      })
      setInputValue('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleKeyPress = () => {
    handleAddTodo()
  }

  const handleToggleDone = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id)
    try {
      await patchTodo({ id, isDone: !currentTodo.isDone })
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              isDone: !todo.isDone
            }
          }
          return todo
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit
          }
        }
        return { ...todo, isEdit: false }
      })
    })
  }

  const handleSave = async ({ id, title }) => {
    try {
      await patchTodo({ id, title })
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title,
              isEdit: false
            }
          }
          return todo
        })
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id)
      setTodos(todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos()
        setTodos(todos.map(todo => ({ ...todo, isEdit: false })))
      } catch (error) {
        console.error(error)
      }
    }
    getTodosAsync()
  }, [])

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyPress={handleKeyPress}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  )
}

export default TodoPage

import { Footer, Header, TodoCollection, TodoInput } from 'components'
import { useEffect, useState } from 'react'

const dummyTodos = [
  {
    title: 'Learn react-router',
    isDone: true,
    id: 1
  },
  {
    title: 'Learn to create custom hooks',
    isDone: false,
    id: 2
  },
  {
    title: 'Learn to use context',
    isDone: true,
    id: 3
  },
  {
    title: 'Learn to implement auth',
    isDone: false,
    id: 4
  }
]

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('')
  const [todos, setTodos] = useState(dummyTodos)

  const handleChange = (value) => {
    setInputValue(value)
  }
  const handleAddTodo = () => {
    if (inputValue.length === 0) {
      return
    }
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.floor(Math.random() * 100000),
          title: inputValue,
          isDone: false
        }
      ]
    })
  }

  const handleKeyPress = () => {
    handleAddTodo()
  }

  const handleToggleDone = (id) => {
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

  const handleSave = ({ id, title }) => {
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
  }

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

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

"use client"

import { useState, useMemo } from 'react'
import { Plus, Trash2, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const filteredTodos = useMemo(() => {
    return todos.filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [todos, searchTerm])

  return (
      <div className="min-h-screen bg-gray-100 flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-5">
          <div>
            <h2 className="mt-6 text-left text-3xl font-bold text-gray-900">
              Things to Do:
            </h2>
          </div>
          <div className="relative">
            <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search todos"
                className="pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
          </div>
          <div className="mt-8 space-y-6">
            <div className="flex">
              <Input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new todo"
                  className="flex-grow mr-2"
              />
              <Button onClick={addTodo}>
                <Plus className="h-4 w-4 mr-2"/>
                Add
              </Button>
            </div>
            <hr className="border-t-4 border-gray-300 my-6"/>
            <ul className="space-y-3">
              {filteredTodos.map(todo => (
                  <li
                      key={todo.id}
                      className="flex items-center justify-between p-3 bg-white shadow-sm rounded-lg"
                  >
                    <div className="flex items-center">
                      <Checkbox
                          id={`todo-${todo.id}`}
                          checked={todo.completed}
                          onCheckedChange={() => toggleTodo(todo.id)}
                      />
                      <label
                          htmlFor={`todo-${todo.id}`}
                          className={`ml-3 text-sm font-medium ${
                              todo.completed ? 'line-through text-gray-400' : 'text-gray-700'
                          }`}
                      >
                        {todo.text}
                      </label>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4"/>
                    </Button>
                  </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  )
}


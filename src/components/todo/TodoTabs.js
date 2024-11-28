import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { fetchTodos } from "@/store/todo";
import TodoItemForm from "./TodoItemFrom";

function TodoTabs() {
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTodos({
      timeConstraint: 'TODAY',
      status: 'ALL',
      date: ''
    }));
  }, [dispatch])

  return (
    <Tabs defaultValue="today" className="w-max">
      <TabsList>
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="today">
        <ul>
          {todos && todos.todo && todos.todo.map((todoItem) => (
            <li key={todoItem.id} className="mb-2">
              <TodoItem todoItem={todoItem} />
            </li>
          ))}
          
          <li key="new" className="mb-2">
            <TodoItemForm />
          </li>
        </ul>
      </TabsContent>
      <TabsContent value="upcoming">Change your password here.</TabsContent>
      <TabsContent value="past">Change your password here.</TabsContent>
    </Tabs>
  )
}

export default TodoTabs;

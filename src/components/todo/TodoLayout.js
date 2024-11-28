import { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import TodoForm from "./TodoForm";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "@/store/todo";
import TodoItem from "./TodoItem";
import TodoTabs from "./TodoTabs"

const todoSections = {
  "today": "Today",
  "past": "Past",
  "upcoming": "Upcoming",
  "unscheduled": "Unscheduled",
  "done": "Done"
}

function TodoLayout() {
  const [modalContent, setModalContent] = useState('');
  // const todo = useSelector((state) => state.todo);
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(todoActions.populateTodo({
  //     type: 'force',
  //   }));
  // }, [dispatch])

  const modal = useRef();

  function handleNewTodo() {
    setModalContent(<TodoForm hookOnSubmit={onSubmitTodo} hookOnCancel={onCancelSubmitTodo} />)
    modal.current.open();
  }

  function onSubmitTodo() {
    modal.current.close();
  }

  function onCancelSubmitTodo() {
    modal.current.close()
  }

  function handleEditTodo(todoItem) {
    setModalContent(<TodoForm todo={todoItem} hookOnSubmit={onSubmitTodo} hookOnCancel={onCancelSubmitTodo} />)

    modal.current.open();
  }

  return (
    <>
      <menu className="min-h-20 static">
        <div className="flex flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span> / </span>
          <div>TODO</div>  
        </div>
        
      </menu>

      <TodoTabs />
      
      {/* {Object.entries(todoSections).map(([key, val]) => (
        <section className="flex flex-col mt-10" key={key}>
          <div className="flex flex-row items-center justify-stretch border-b border-b-gray-700 pb-2 mb-5">
            <h2 className="flex font-bold text-xl basis-11/12 grow">{val}</h2>
            <button className="btn-default border-gray-600 px-2 py-1.5 hover:bg-gray-400/30" onClick={handleNewTodo}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
          </div>
          
          <ul>
            {todo[key] && todo[key].map((todoItem) => (
              <li key={todoItem.id} className="mb-2">
                <TodoItem todoItem={todoItem} handleEditTodo={handleEditTodo} />
              </li>
            ))}
            
          </ul>
        </section>
      ))}
      

      <Dialog title="Add Todo" ref={modal}>
        {modalContent}
      </Dialog> */}
    </>
  )
}

export default TodoLayout;
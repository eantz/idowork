import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Field, Label } from '@headlessui/react'
import { useEffect, useState } from "react";
import { todoActions } from "@/app/store/todo";

function TodoItem({todoItem, handleEditTodo}) {
  const [checkboxEnabled, setCheckboxEnabled] = useState(false);
  const categories = useSelector((state) => state.category.categories);
  const categoryIdx = categories.findIndex((cat) => cat.id === todoItem.categoryId)
  const category = categories[categoryIdx];

  const dispatch = useDispatch();

  useEffect(() => {
    setCheckboxEnabled(todoItem.isDone);
  }, [todoItem])

  function handleToggleCheckbox(isChecked) {
    setCheckboxEnabled(isChecked);

    dispatch(todoActions.toggleTodo({
      id: todoItem.id,
    }));
  }

  function handleRemoveTodo(id) {
    dispatch(todoActions.removeTodo({
      id: id,
    }))
  }

  return (
    <>
      <Field className="flex items-center gap-2">
        <Checkbox
          checked={checkboxEnabled}
          onChange={handleToggleCheckbox}
          className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
        >
          {/* Checkmark icon */}
          <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Checkbox>

        <Label>
          <span className={checkboxEnabled ? 'line-through text-gray-500' : ''}>{todoItem.title}</span>
          {category && <span className={`category-${category.color} text-[0.5rem] ml-2 mr-2`}>{category.category}</span> }
          
          <span className="text-sm text-gray-500">- {todoItem.schedule}</span>
        </Label>

        <button className="btn-default px-1 mt-1 hover:bg-gray-200" onClick={() => handleEditTodo(todoItem)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
          </svg>
        </button>
        <button className="btn-default bg-red-400 text-white px-1 mt-1 hover:bg-red-600" onClick={() => handleRemoveTodo(todoItem.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </Field>
      
    </>
  )
}

export default TodoItem;
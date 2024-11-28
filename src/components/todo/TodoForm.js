import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { todoActions } from "@/store/todo";

function TodoForm({todo, hookOnSubmit, hookOnCancel}) {
  const categories = useSelector(state => state.category.categories);
  const dispatch = useDispatch();

  const {
    register,
    formState: {errors},
    handleSubmit
  } = useForm({
    defaultValues: {
      id: todo ? todo.id : '',
      title: todo ? todo.title : '',
      categoryId: todo ? todo.categoryId : '',
      schedule: todo ? todo.schedule : ''
    }
  });

  function onSubmit(data) {
    const todoItem = {
      id: data.id,
      title: data.title,
      categoryId: data.categoryId,
      schedule: data.schedule,
      isDone: false,
      doneDate: '',
    }

    if (data.id === "") {
      dispatch(todoActions.addTodo(todoItem));
    } else {
      dispatch(todoActions.editTodo({
        original: todo,
        modified: todoItem,
      }));
    }

    hookOnSubmit();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register('id')} />
        <fieldset className="fieldset-default">
          <label htmlFor="title">Title</label>
          <input type="text" {...register('title', {required: 'Title is required'})} />
          <span className="text-xs text-red-600 pt-1">
            <ErrorMessage errors={errors} name="title" />
          </span>
        </fieldset>

        <fieldset className="fieldset-default">
          <label htmlFor="categoryId">Category</label>
          <select {...register('categoryId')}>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.category}</option>
            ))}
          </select>
          <span className="text-xs text-red-600 pt-1">
            <ErrorMessage errors={errors} name="categoryId" />
          </span>
        </fieldset>

        <fieldset className="fieldset-default">
          <label htmlFor="schedule">Schedule</label>
          <input type="date" {...register('schedule')} />
          <span className="text-xs text-red-600 pt-1">
            <ErrorMessage errors={errors} name="categoryId" />
          </span>
        </fieldset>

        <fieldset className="fieldset-button">
          <button type="button" onClick={hookOnCancel}>Cancel</button>
          <button type="submit">Save</button>
        </fieldset>
      </form>
    </>
  )
}

export default TodoForm;
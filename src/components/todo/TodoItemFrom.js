import { insertTodo } from "@/store/todo";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";

export default function TodoItemForm() {
  const {
    register,
    formState,
    formState: {errors, isSubmitSuccessful},
    handleSubmit,
    reset
  } = useForm({
    defaultValues: {
      message: '',
      scheduledAt: null,
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if(formState.isSubmitSuccessful) {
      reset()
    }
  }, [formState, reset])

  function onSubmit(data) {
    console.log(data);
    dispatch(insertTodo(data))
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('message')} />
      </form>
    </>
  )
}
import { insertTodo } from "@/store/todo";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat);

export default function TodoItemForm() {
  const [date, setDate] = useState(new Date());
  const [todoDate, setTodoDate] = useState(null);

  const {
    register,
    formState,
    formState: {errors, isSubmitSuccessful},
    handleSubmit,
    reset,
    setValue
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
      setDate(null)
    }
  }, [formState, reset]);

  function onSubmit(data) {
    dispatch(insertTodo(data))
  }

  function handleSetDate(date) {
    setTodoDate(date);
    setDate(date);

    setValue('scheduledAt', dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ'));
  }

  return (
    <>
      <div className="flex items-top space-x-2">
        <Checkbox id="terms" disabled className="mt-2" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full max-w-sm items-center">
            <Input type="text" {...register('message')}
              className="border-t-0 border-l-0 border-r-0 rounded-none rounded-bl focus-visible:ring-0"
              placeholder="next todo"  />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline"
                  className="border-t-0 border-l-0 border-r-0 rounded-none rounded-br">
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleSetDate}
                />
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-sm text-muted-foreground mt-1 ml-3">
            {todoDate !== null && dayjs(todoDate).format("L LT")}
          </p>
          <input type="hidden" {...register('scheduledAt')} />
        </form>
      </div>
    </>
  )
}
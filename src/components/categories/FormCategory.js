'use client'
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message"
import { categoryActions } from "@/store/category";

function FormCategory({category, hookOnSubmit, hookOnCancel}) {
  const dispatch = useDispatch();

  const {
    register, 
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      id: category ? category.id : '',
      category: category ? category.category : '',
      color: category ? category.color : ''
    }
  });

  const onSubmit = function(data) {
    const category = {
      id: data.id,
      category: data.category,
      color: data.color,
    }

    if (category.id === '') {
      dispatch(categoryActions.addCategory(category));
    } else {
      dispatch(categoryActions.editCategory(category));
    }
    
    hookOnSubmit();
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" {...register("id")} />
        <fieldset className="fieldset-default">
          <label htmlFor="category">Category</label>
          <input {...register("category", {"required": "Category Name is Required"})} 
            aria-invalid={errors.category ? "true" : "false"}
          />
          <span className="text-xs text-red-600 pt-1">
            <ErrorMessage errors={errors} name="category" />
          </span>
          
        </fieldset>

        <fieldset className="fieldset-default">
          <label htmlFor="color">Color</label>
          <select {...register("color", {"required": "Color is required"})}>
            <option value="purple">Purple</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
          <span className="text-xs text-red-600 pt-1">
            <ErrorMessage errors={errors} name="color" />
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

export default FormCategory;
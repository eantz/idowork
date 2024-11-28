'use client';

import { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import FormCategory from "./FormCategory";
import { useSelector, useDispatch } from "react-redux";
import CategoryMenuItem from "./CategoryMenuItem";
import {categoryActions} from "@/store/category";


function CategoriesMenu() {
  const [modalContent, setModalContent] = useState();
  const categories = useSelector(state => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryActions.populateCategories('force'));
  }, [dispatch])

  const modal = useRef();

  function onAddCategoryClick() {
    setModalContent(<FormCategory hookOnSubmit={onSubmitCategory} hookOnCancel={onCancelSubmitCategory} />)
    
    modal.current.open();
  }

  function onSubmitCategory() {
    modal.current.close();
  }

  function onEditMenuItem(id) {
    const category = categories.find((category) => category.id === id)
    setModalContent(<FormCategory hookOnSubmit={onSubmitCategory} hookOnCancel={onCancelSubmitCategory} category={category} />)

    modal.current.open();
  }

  function onCancelSubmitCategory() {
    modal.current.close();
  }

  return (
    <>
      <menu className="pt-5">
        <div className="flex flex-row items-center justify-stretch mb-4">
          <div className="mr-2 font-semibold">Todo Category</div>
          <div className="flex basis-1/4 h-1 mt-1 bg-black grow"></div>
          
          <button 
            type="button" 
            className="btn-default border-gray-800 px-2 py-1.5 ml-3 hover:bg-gray-100/40"
            onClick={onAddCategoryClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
        
        <ul>
          {
            categories.map((cat) => (
              <li className="flex flex-row mb-1" key={cat.id}>
                <CategoryMenuItem 
                  id={cat.id} 
                  name={cat.category} 
                  color={cat.color} 

                  hookOnEdit={onEditMenuItem}
                />
              </li>    
            ))
          }
        </ul>
      </menu>

      <Dialog title="Add Category" ref={modal}>
        {modalContent}
      </Dialog>
    </>
  )
}

export default CategoriesMenu;
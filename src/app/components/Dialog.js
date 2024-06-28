'use client';

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement('body');

const Dialog = forwardRef(function Dialog({title, children}, ref) {
  const dialog = useRef(ref);

  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        openModal();
      },
      close: () => {
        closeModal();
      }
    }
  })

  return (
    <Modal 
      ref={dialog} 
      isOpen={isOpen} 
      overlayClassName="fixed inset-0 bg-white/75"
      className="absolute inset-0 flex justify-center bg-white/75"
    >
      <div className="border border-gray-300 rounded-md bg-white overflow-auto outline-none h-fit mt-32">
        <div className="flex flex-row justify-stretch items-center p-2 border-b">
          <h4 className="basis-5/6 flex-grow font-semibold">{title}</h4>
          <button 
            type="button" 
            onClick={closeModal}
            className="border border-gray-400 px-2 py-0.5 rounded-md"
          >
            x
          </button>
        </div>
        <div className="p-5">
          {children}
        </div>
        
      </div>
      
    </Modal>
  )
});

export default Dialog;
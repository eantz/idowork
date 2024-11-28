'use client'
import { Provider } from "react-redux";
import store from "../store";
import TodoLayout from "@/components/todo/TodoLayout";
import Sidebar from "@/components/Sidebar";

export default function Home() {

  return (
    <Provider store={store}>
      
        <Sidebar></Sidebar>

        <main className="p-4 sm:ml-64">
          <TodoLayout />
        </main>
    </Provider>
  );
}

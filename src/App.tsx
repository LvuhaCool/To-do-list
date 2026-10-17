import { useState } from "react";

import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/MainSection";

export interface ITodo {
  id: number;
  name: string;
  description?: string;
  date: string;
}

const LOCAL_STORAGE_KEY = "tasksLocalStorageKey";

function App() {
  const StoreAndRender = (arr: ITodo[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arr));
  };

  const [toDos, setToDo] = useState<ITodo[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  });

  const addToDo = (properties: Omit<ITodo, "id">) => {
    setToDo((prevToDos) => {
      const newID =
        prevToDos.length > 0
          ? Math.max(...prevToDos.map((obj) => obj.id)) + 1
          : 1;

      const newToDo: ITodo = {
        ...properties,
        id: newID,
      };

      const updatedToDos = [...prevToDos, newToDo];

      StoreAndRender(updatedToDos);

      return updatedToDos;
    });
  };

  const handleRemoveTask = (id: number) => {
    setToDo((prevToDos) => {
      const updatedToDos = prevToDos.filter((task) => task.id !== id);
      StoreAndRender(updatedToDos);

      return updatedToDos;
    });
  };

  return (
    <>
      <Header addToDo={addToDo} />
      <MainSection toDos={toDos} onRemoveTask={handleRemoveTask} />
    </>
  );
}

export default App;

import { useState } from "react";

import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/MainSection";

export interface ITodo {
  id: number;
  name: string;
  description?: string;
  date: Date;
}

function App() {
  const [toDos, setToDo] = useState<ITodo[]>([]);

  const addToDo = (properties: Omit<ITodo, "id">) => {
    setToDo((prevToDos) => {
      const newID =
        prevToDos.length > 0 ? Math.max(...toDos.map((obj) => obj.id)) + 1 : 1;

      const newToDo: ITodo = {
        ...properties,
        id: newID,
      };
      return [...prevToDos, newToDo];
    });
  };

  return (
    <>
      <Header addToDo={addToDo} />
      <MainSection toDos={toDos} />
    </>
  );
}

export default App;

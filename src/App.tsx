import { useState } from "react";

interface ITodo {
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
        toDos.length > 0 ? Math.max(...toDos.map((obj) => obj.id)) + 1 : 1;

      const newToDo: ITodo = {
        ...properties,
        id: newID,
      };
      return [...prevToDos, newToDo];
    });
  };
}

export default App;

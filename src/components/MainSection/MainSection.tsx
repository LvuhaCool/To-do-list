// import styles from "./MainSection.module.css";

import { type ITodo } from "./../../App";

interface MainSectionProps {
  toDos: ITodo[];
}

function MainSection({ toDos }: MainSectionProps) {
  return (
    <main>
      {toDos.map((toDo) => (
        <div key={toDo.id}>
          <p>{toDo.name}</p>
        </div>
      ))}
    </main>
  );
}

export default MainSection;

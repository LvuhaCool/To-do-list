import styles from "./Header.module.css";

import type { ITodo } from "../../App";
import { useState } from "react";

interface HeaderProps {
  addToDo: (properties: Omit<ITodo, "id">) => void;
}

function Header({ addToDo }: HeaderProps) {
  let newToDo = () => {
    setVisibility(true);
  };

  const [isVisible, setVisibility] = useState(false);

  const [draft, setDraft] = useState<Omit<ITodo, "id">>({
    name: "",
    description: "",
    date: new Date(),
  });

  let addToDoFun = () => {
    if (draft.name.trim() === "") {
      alert("Заполните название дела!");
      return;
    }

    addToDo(draft);

    setDraft({ name: "", description: "", date: new Date() });

    setVisibility(false);
  };

  return (
    <header className={styles.header}>
      <button className={styles.newToDo} onClick={newToDo}>
        Новое дело
      </button>
      {isVisible && (
        <div className={styles.inputs}>
          <input
            type="text"
            className={styles.name}
            value={draft.name}
            placeholder="Название дела..."
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
          <input
            type="date"
            className={styles.date}
            value={draft.date.toISOString().split("T")[0]}
            placeholder="Дата..."
            onChange={(e) =>
              setDraft({ ...draft, date: new Date(e.target.value) })
            }
          />
          <input
            type="text"
            className={styles.desc}
            value={draft.description}
            placeholder="Описание (необязательно)..."
            onChange={(e) =>
              setDraft({ ...draft, description: e.target.value })
            }
          />
          <button className={styles.add} onClick={addToDoFun}>
            Добавить
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

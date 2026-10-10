import styles from "./MainSection.module.css";
import trashIcon from "./../../assets/trash-icon.svg";

import { type ITodo } from "./../../App";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface MainSectionProps {
  toDos: ITodo[];
  onRemoveTask: (id: number) => void;
}

function MainSection({ toDos, onRemoveTask }: MainSectionProps) {
  const [openedIDs, setOpenedIDs] = useState<number[]>([]);

  const toggleIDs = (id: number) => {
    if (openedIDs.includes(id)) {
      setOpenedIDs(openedIDs.filter((item) => item !== id));
    } else {
      setOpenedIDs([...openedIDs, id]);
    }
  };
  return (
    <motion.main className={styles.main}>
      <AnimatePresence>
        {toDos.map((toDo) => {
          const isCurrentOpen = openedIDs.includes(toDo.id);

          return (
            <motion.div
              className={styles.listItem}
              key={toDo.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <p>{toDo.name}</p>
              {toDo.description && (
                <div className={styles.descriptionWrapper}>
                  <p
                    className={styles.viewDesc}
                    onClick={() => toggleIDs(toDo.id)}
                  >
                    {isCurrentOpen ? "Скрыть описание" : "Описание"}
                  </p>
                  {isCurrentOpen && (
                    <p className={styles.description}>{toDo.description}</p>
                  )}
                </div>
              )}
              <button
                className={styles.removeTaskButton}
                onClick={() => onRemoveTask(toDo.id)}
              >
                <img src={trashIcon} alt="Remove task" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.main>
  );
}

export default MainSection;

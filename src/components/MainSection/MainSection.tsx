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
  const [activeTaskID, setActiveTaskID] = useState<number | null>(null);

  function setActiveTaskIDToNull() {
    setActiveTaskID(() => null);
  }

  const [openedIDs, setOpenedIDs] = useState<number[]>([]);

  const toggleIDs = (id: number) => {
    if (openedIDs.includes(id)) {
      setOpenedIDs(openedIDs.filter((item) => item !== id));
    } else {
      setOpenedIDs([...openedIDs, id]);
    }
  };
  return (
    <>
      <motion.main
        className={styles.main}
        layout
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {activeTaskID !== null && (
            <motion.div
              className={styles.removeTaskWindow}
              initial={{ opacity: 0, height: 0, scale: 0.95, marginBottom: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                scale: 1,
                marginBottom: 15,
              }}
              exit={{ opacity: 0, height: 0, scale: 0.95, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <p className={styles.removeTaskWindowText}>
                Вы точно хотите удалить эту задачу?
              </p>
              <div className={styles.removeTaskWindowButtonsWrapper}>
                <button
                  className={`${styles.removeTaskWindowButton} ${styles.removeTaskWindowButtonYes}`}
                  onClick={() => {
                    onRemoveTask(activeTaskID);
                    setActiveTaskIDToNull();
                  }}
                >
                  Да
                </button>
                <button
                  className={`${styles.removeTaskWindowButton} ${styles.removeTaskWindowButtonNo}`}
                  onClick={() => setActiveTaskIDToNull()}
                >
                  Нет
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {toDos.map((toDo) => {
            const isCurrentOpen = openedIDs.includes(toDo.id);

            return (
              <motion.div
                className={styles.listItem}
                key={toDo.id}
                layout
                initial={{ opacity: 0, height: 0, padding: 0 }}
                animate={{ opacity: 1, height: "auto", padding: 30 }} // паддинг должен совпадать с вашим CSS
                exit={{ opacity: 0, height: 0, padding: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
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
                  onClick={() => setActiveTaskID(toDo.id)}
                >
                  <img src={trashIcon} alt="Remove task" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.main>
    </>
  );
}

export default MainSection;

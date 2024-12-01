import { useDispatch } from "react-redux";
import { ReactComponent as MdClose } from "../../img/icons8-close.svg";
import { deleteTask, toggleCompleted } from "../../redux/tasksSlice";
import css from "./Task.module.css";
import axios from "axios";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    axios
      .delete("/api/message/delete", {
        data: {
          id: task.id,
        },
      })
      .then(function (response) {
        dispatch(deleteTask(task.id));
      })
      .catch(function (error) {
      })
      .finally(function () {
      });
  };

  const handleToggle = () => {
    axios
      .put("/api/message/update", {
        data: {
          id: task.id,
          body: task.text,
          completed: !task.completed,
        },
      })
      .then(function (response) {
        dispatch(toggleCompleted(task.id));
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });
  };

  return (
    <div className={css.wrapper}>
      <input
        type="checkbox"
        className={css.checkbox}
        checked={task.completed}
        onChange={handleToggle}
      />
      <p className={css.text}>{task.text}</p>
      <button className={css.btn} onClick={handleDelete}>
        <MdClose size={24} />
      </button>
    </div>
  );
};

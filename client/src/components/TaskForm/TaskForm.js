import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTask } from "../../redux/tasksSlice";
import css from "./TaskForm.module.css";
import { Button } from "../Button/Button";
import axios from "axios";

export const TaskForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const id = uuid();
    axios
      .post("/api/message/create", {
        body: form.elements.text.value,
        id,
      })
      .then(function (response) {
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
      });

    dispatch(
      addTask(form.elements.text.value, id, false)
    );
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        className={css.field}
        type="text"
        name="text"
        placeholder="Enter task text..."
      />
      <Button type="submit">Add task</Button>
    </form>
  );
};

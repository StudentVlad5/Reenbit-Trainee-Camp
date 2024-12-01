import { useDispatch, useSelector } from "react-redux";

import { getTasks, getStatusFilter } from "../../redux/selectors";
import { statusFilters } from "../../redux/constants";
import css from "./TaskList.module.css";
import { Task } from "../Task/Task";
import { useEffect, useState } from "react";
import axios from "axios";
import { addListOfTasks } from "../../redux/tasksSlice";

const getVisibleTasks = (tasks, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return tasks.filter((task) => !task.completed);
    case statusFilters.completed:
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

export const TaskList = () => {
  const [, setTasksInitialState] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/api/message")
      .then(function (response) {
        setTasksInitialState(response);
        dispatch(addListOfTasks([...response.data]));
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally();
  }, [dispatch]);

  const tasks = useSelector(getTasks);
  const statusFilter = useSelector(getStatusFilter);
  const visibleTasks = getVisibleTasks(tasks, statusFilter);

  return (
    <ul className={css.list}>
      {visibleTasks.map((task) => (
        <li className={css.listItem} key={task.id}>
          <Task task={task} />
        </li>
      ))}
    </ul>
  );
};

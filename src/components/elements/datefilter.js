function filteredTasks(tasks, filter) {
  if (filter === "all") {
    return tasks;
  }
  if (filter === "Completed") {
    return tasks.filter((task) => task.completed);
  } else if (filter === "Today") {
    const today = new Date();
    return tasks.filter(
      (task) =>
        task &&
        new Date(task.duedate).toDateString() === today.toDateString()
    );
  } else if (filter === "Tomorrow") {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tasks.filter(
      (task) =>
        task &&
        new Date(task.duedate).toDateString() === tomorrow.toDateString()
    );
  } else if (filter === "Upcoming") {
    const today = new Date();
    return tasks.filter((task) => task && new Date(task.duedate) > today);
  }
}
const getDaysDifference = (date1String, date2String) => {
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);

  const startOfDay1 = new Date(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate()
  );
  const startOfDay2 = new Date(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate()
  );

  const timeDifference = Math.abs(
    startOfDay2.getTime() - startOfDay1.getTime()
  );
  const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  return daysDifference;
};

export default filteredTasks;

function filteredTasks(tasks, filter) {
  if (filter === "all") {
    return tasks;
  }
  if (filter === "Completed") {
    return tasks.filter((task) => task.completed);
  } else if (filter === "Today") {
    return tasks.filter(
      (task) =>
        getDaysDifference(
          new Date(task.duedate.split(" ")[0]).toString(), // Formatted like " Wed Mar 29 2024"
          new Date().toString()
        ) === 0
    );
  } else if (filter === "Tomorrow") {
    return tasks.filter(
      (task) =>
        getDaysDifference(
          new Date(task.duedate.split(" ")[0]).toString(),
          new Date().toString()
        ) === 1
    );
  } else if (filter === "Upcoming") {
    return tasks.filter(
      (task) =>
        getDaysDifference(
          new Date(task.duedate.split(" ")[0]).toString(),
          new Date().toString()
        ) >= 1
    );
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

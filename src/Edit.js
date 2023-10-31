const handleEdit = (currentTaskLists, newTask, id) => {
    return currentTaskLists.map((task) =>
      task.id === id
        ? {
            ...task,
            taskName: newTask.title,
            taskDesc: newTask.description,
            dueDate: newTask.dueDate,
          }
        : task
    );
  };
  
  export default handleEdit;
  
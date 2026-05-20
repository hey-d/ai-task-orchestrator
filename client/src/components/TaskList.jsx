import React from "react";

const TaskList = ({ tasks }) => {
  console.log(tasks);
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 border-red-500 text-red-700";
      case "medium":
        return "bg-yellow-100 border-yellow-500 text-yellow-700";
      case "low":
        return "bg-green-100 border-green-500 text-green-700";
      default:
        return "bg-gray-100 border-gray-500 text-gray-700";
    }
  };
  return (
    <>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`p-4 border-l-4 rounded shadow-sm ${getPriorityColor(task.priority)}`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{task.title}</h3>
              <span className="text-xs uppercase font-semibold">
                {task.category}
              </span>
              <span className="text-xs font-semibold max-w-2 min-w-20 text-center">
                {task.estimatedTime}
              </span>
              <p className="text-sm opacity-80">Priority: {task.priority}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskList;

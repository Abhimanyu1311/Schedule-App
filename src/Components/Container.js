import React, { useEffect, useState } from 'react';
import Btn from './Btn';
import axios from 'axios';
import InputField from './Inputfields';

function Container() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [taskEditInput, setTaskEditInput] = useState('');
  const [taskStatusInput, setTaskStatusInput] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [sortedTasks, setSortedTasks] = useState({ key: 'taskName', ascending: true });

  const handleOpenEditModal = (task) => {
    setEditTaskId(task.id);
    setTaskEditInput(task.taskName);
    setTaskStatusInput(task.status);
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (taskId) => {
    setDeleteTaskId(taskId);
    setOpenDeleteModal(true);
  };

  const handleClose = () => {
    setOpenEditModal(false);
    setEditTaskId(null);
    setTaskEditInput('');
    setTaskStatusInput(false);
    setOpenDeleteModal(false);
    setDeleteTaskId(null);
  };

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setTaskEditInput(e.target.value);
  };

  const handleStatusChange = (e) => {
    setTaskStatusInput(e.target.checked);
  };

  const handleSave = async () => {
    try {
      const updatedTask = {
        id: editTaskId,
        taskName: taskEditInput,
        status: taskStatusInput,
      };
      await axios.put(`http://localhost:4000/tasks/${editTaskId}`, updatedTask);
      setTasks(tasks.map((t) => (t.id === editTaskId ? updatedTask : t)));
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async () => {
    if (taskInput.trim()) {
      try {
        const payload = {
          id: tasks.length + 1,
          taskName: taskInput.trim(),
          status: false,
        };
        const res = await axios.post('http://localhost:4000/tasks', payload);
        setTasks([...tasks, res.data]);
        setTaskInput('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteTask = async () => {
    if (deleteTaskId) {
      try {
        await axios.delete(`http://localhost:4000/tasks/${deleteTaskId}`);
        setTasks(tasks.filter((task) => task.id !== deleteTaskId));
        handleClose();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:4000/tasks');
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, []);

  const applySorting = (key) => {
    const isSameKey = sortedTasks.key === key;
    const direction = isSameKey ? !sortedTasks.ascending : true;
    const sorted = [...tasks].sort((a, b) => {
      if (a[key] < b[key]) return direction ? -1 : 1;
      if (a[key] > b[key]) return direction ? 1 : -1;
      return 0;
    });
    setTasks(sorted);
    setSortedTasks({ key, ascending: direction });
  };

  return (
    <>
      <div className="flex justify-center items-start">
        <div className="bg-customColor px-12 py-4 shadow-2xl rounded-2xl border-4 max-w-[1100px]">
          <form>
            <div className="mt-2 text-xl">
              <InputField
                fieldName="Enter Task:"
                onChange={handleInputChange}
                value={taskInput}
                type="text"
                placeholder="Specify the Task"
              />
            </div>
          </form>
          <Btn funCtion={addTask} buttonName={"Add"} />
        </div>
      </div>

      <div className="flex mx-16 justify-center items-start">
        <table className="border-2 shadow-xl rounded-3xl min-w-full m-2">
          <thead className="text-center">
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-gray-400 border-x-2 w-24 text-sm" onClick={() => applySorting('id')}>
                Sr. No. {sortedTasks.key === 'id' && (sortedTasks.ascending ? '▲' : '▼')}
              </th>
              <th className="py-2 px-4 border-gray-400 border-x-2 max-w-xs" onClick={() => applySorting('taskName')}>
                Task Name {sortedTasks.key === 'taskName' && (sortedTasks.ascending ? '▲' : '▼')}
              </th>
              <th className="py-2 px-4 border-gray-400 border-x-2" onClick={() => applySorting('status')}>
                Status {sortedTasks.key === 'status' && (sortedTasks.ascending ? '▲' : '▼')}
              </th>
              <th className="py-2 px-4 border-gray-400 border-x-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr className="border-black border-x-2" key={task.id}>
                <td className="text-center border-x-2">{index + 1}</td>
                <td className="border-r-2 max-w-xs break-words">{task.taskName}</td>
                <td className={`text-center border-r-2 ${task.status ? 'text-green-500' : 'text-red-500'}`}>
                  {task.status ? 'Completed' : 'Incomplete'}
                </td>
                <td className="text-center border-r-2">
                  <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => handleOpenEditModal(task)}>
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 ml-3" onClick={() => handleOpenDeleteModal(task.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Task Name:</label>
              <input
                type="text"
                value={taskEditInput}
                onChange={handleEditInputChange}
                placeholder="Edit the Task"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                checked={taskStatusInput}
                onChange={handleStatusChange}
                className="mr-2"
              />
              <label className="text-sm font-medium text-gray-700">Completed?</label>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={handleClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {openDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <div className="mb-4">
              <h2>Are you sure?</h2>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={handleClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2">
                Cancel
              </button>
              <button onClick={deleteTask} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Container;

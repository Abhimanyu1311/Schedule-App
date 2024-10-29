import React, { useEffect, useState } from 'react';
import Btn from './Btn';
import axios from 'axios';
import InputField from './Inputfields';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';
import Pagination from './Pagination';

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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')

  const tasksPerPage = 10;
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) setPage(newPage);
  };

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
        setPage(1);
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
  const inputHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearch(lowerCase);
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

  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(search)
  );

  const paginatedTasks = filteredTasks.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );

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

          <InputField
            placeholder="Search"
            type="text"
            onChange={inputHandler}
          />
        </div>
      </div>

      <div className="flex mx-16 justify-center items-start">
        <table className="border-2 shadow-xl rounded-3xl min-w-full m-2">
          <thead className="text-center">
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-gray-400 border-x-2 w-24 text-sm" onClick={() => applySorting('id')}>
                Sr. No.
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
            {paginatedTasks.map((task, index) => (
              <tr className="border-black border-x-2" key={task.id}>
                <td className="text-center border-x-2">{index + 1 + (page - 1) * tasksPerPage}</td>
                <td className="border-r-2 max-w-xs break-words">{task.taskName}</td>
                <td className={`text-center border-r-2 ${task.status ? 'text-green-500' : 'text-red-500'}`}>
                  {task.status ? 'Completed' : 'Incomplete'}
                </td>
                <td className="text-center items-center justify-center flex border-r-2">
                  <svg onClick={() => handleOpenEditModal(task)} className="h-4 w-4 m-2 cursor-pointer text-red-500" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                  <svg onClick={() => handleOpenDeleteModal(task.id)} className="cursor-pointer h-4 w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <polyline points="3 6 5 6 21 6" />  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />  <line x1="10" y1="11" x2="10" y2="17" />  <line x1="14" y1="11" x2="14" y2="17" /></svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openEditModal && (
        <EditModal
          taskName={taskEditInput}
          onTaskNameChange={handleEditInputChange}
          taskStatus={taskStatusInput}
          onStatusChange={handleStatusChange}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}

      {openDeleteModal && (
        <DeleteModal onClose={handleClose} onDelete={deleteTask} />
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
export default Container;



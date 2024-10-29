import React from 'react';

function EditModal({ taskName, onTaskNameChange, taskStatus, onStatusChange, onClose, onSave }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={onTaskNameChange}
            placeholder="Edit the Task"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mt-4 flex items-center">
          <input type="checkbox" checked={taskStatus} onChange={onStatusChange} className="mr-2" />
          <label className="text-sm font-medium text-gray-700">Completed?</label>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mr-2">Cancel</button>
          <button onClick={onSave} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Save</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;

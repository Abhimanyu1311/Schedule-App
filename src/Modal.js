function Modal({ isOpen, onClose, onSave, task }) {
    if (!isOpen) return null;
  
    return (
      <div className="w-screen h-screen justify-center  items-center">
        <div className="">
          <h4>Edit Task</h4>
          <p>Are you sure you want to save the changes?</p>
          <button onClick={() => onSave(task)}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    );
  }
export default Modal;  
import React, { useState, useEffect } from 'react'
import Card from '../Card';
import CreateTask from '../CreateTask';
import Filter from '../Filter';
import Modal from '../Modal';
import NewTask from '../NewTask';
import { readData, deleteData, fetchTask, filterSearchTaskList, taskReport } from '../Utils/utils';

import "./style.scss";

const TaskList = ({ updateTaskReport, searchInput, isOpen, setIsOpen }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [listData, setListData] = useState(readData());
  const [editTask, setEditTask] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  const handleActionClick = (e, idx) => {
    e.stopPropagation();
    if(idx === activeIndex) {
      setActiveIndex(null);
      return
    }
    setActiveIndex(idx);
  }

  const handleDelete = (id) => {
    setListData(deleteData(id));
    setActiveIndex(null);
    updateTaskReport(taskReport());
  }

  const handleEdit = (id) => {
    setIsEdit(true);
    setIsOpen(true);
    setEditTask(fetchTask(id))
    setActiveIndex(null);
  }

  const handleClose = () => {
    setIsOpen(false);
    setIsEdit(false);
  }

  useEffect(() => {
    setListData(filterSearchTaskList(searchInput));
  }, [searchInput]);

  useEffect(() => {
    !isOpen && setListData(readData());
  }, [isOpen])
  

  return (<>
    <div className='tm-list-container gr-one-fourth'>
      <div className='tm-list-container-header'>
        <Filter setListData={setListData}/>        
      </div>
      <div className='tm-task-list'>
          {listData.length > 0 && listData.map((task, index) => 
            <Card 
              key={task.id} 
              idx={index} 
              activeIndex={activeIndex} 
              handleActionClick={handleActionClick}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              task={task}
              onClickOutside={() => setActiveIndex(null)}
            />
          )}
          <NewTask setIsOpen={setIsOpen} />
      </div>
    </div>
    {isOpen && <Modal handleClose={handleClose}>
      <CreateTask handleClose={handleClose} editTask={editTask} isEdit={isEdit} updateTaskReport={updateTaskReport} />
    </Modal>}
    </>
  )
}

export default TaskList
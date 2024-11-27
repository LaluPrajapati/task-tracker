import React, { useState, useEffect } from 'react';
import Select from '../Common/Select';
import { saveData, updateTask } from '../Utils/utils';
import { statusOptions, priorityOptions } from '../Utils/constant';

import "./style.scss";

const initState = {
  id: '',
  title: '',
  description: '',
  status: '',
  priority: '',
  createdOn: '',
  lastUpdatedOn: ''
}

const CreateTask = ({handleClose, updateTaskReport, editTask, isEdit}) => {
  const [formValues, setFormValues] = useState(initState);
  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    let updatedFormValues = { ...formValues, [name]: value};
    setFormValues({...updatedFormValues});    
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const errorFields = validateForm();
    

    if(Object.keys(errorFields).length === 0) {
      if(!isEdit) {
        let createdOn = new Date().toLocaleDateString();
        let id = `${Math.floor(Math.random()*10)}00000${Math.floor(Math.random()*100)}`;
        const content = {...formValues, id, createdOn};
        saveData(JSON.stringify(content));
      } else {
        let lastUpdatedOn = new Date().toLocaleDateString();
        updateTask(formValues.id, {...formValues, lastUpdatedOn});
      }
      updateTaskReport();
      handleClose();
    } else {
      setErrors(errorFields);
    }   
  }

  const validateForm = () => {
    const {id, createdOn, lastUpdatedOn, ...fieldToValidate} = formValues;
    let errors = {};
    Object.keys(fieldToValidate).forEach((key) => {
      if(!fieldToValidate[key].length > 0){
        errors[key] = `${key} value is required`;
      }
    })
    return errors;      
  }

  useEffect(() => {
    if(isEdit) {
      setFormValues(editTask);
    } 
  }, []);
  
  
  return (
    <div className='tm-new-task-form'>
      <form>
      <div className="form-group">
        <label htmlFor="task-title">Task Title</label>
        <input type="text" name="title" className="form-control" id="task-title" value={formValues.title} onChange={handleOnChange} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea className="form-control" name="description" id="description" rows="2" value={formValues.description} onChange={handleOnChange}></textarea>
      </div>
      <Select id='task-status' name="status" labelText='Status' options={statusOptions} value={formValues.status} onChange={handleOnChange}/>
      <Select id='task-priority' name="priority" labelText='Priority' options={priorityOptions} value={formValues.priority} onChange={handleOnChange} />
      {Object.keys(errors).length > 0 && Object.keys(errors).map(key => <p className='error'>{errors[key]}</p>)}
      <div className='text-right'>
        <button className='btn' onClick={(e) => handleSubmit(e)}>
          {!isEdit ? 'Submit' : 'Update'}          
        </button>
      </div>
      </form>
    </div>
  )
}

export default CreateTask
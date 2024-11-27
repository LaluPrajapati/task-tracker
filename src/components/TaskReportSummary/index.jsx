import React from 'react';
import "./style.scss";

const TaskReportSummary = ({ report }) => {
  const {alltask = 0, completed = 0, inprogress = 0, offtrack = 0} = report;
  const user = localStorage.getItem('user') ? JSON.parse(decodeURIComponent(localStorage.getItem('user'))) : {};

  return (
    <div className='gr-fourth'>
      <div className='my-account tm-box'>
        <div className='account-greet'>
          <h4>Hello,</h4>
          <h2>{user.name}</h2>
        </div>
        <div className='account-user'>
          <span className='icon user-icon' />
        </div>
      </div>
      <div className='tm-task-report-summary'>
        <div className='report-card tm-box'>
          <span className='report-card-title'>All Tasks:</span>
          <span className='report-count all'>{alltask}</span>
        </div>
        <div className='report-card tm-box'>
          <span className='report-card-title'>Completed:</span>
          <span className='report-count completed'>{completed}</span>
        </div>
        <div className='report-card tm-box'>
          <span className='report-card-title'>In Progress:</span>
          <span className='report-count in-progress'>{inprogress}</span>
        </div>
        <div className='report-card tm-box'>
          <span className='report-card-title'>Overdue:</span>
          <span className='report-count overdue'>{offtrack}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskReportSummary
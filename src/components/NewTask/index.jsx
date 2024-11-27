import React from 'react'

const NewTask = ({ elementAs, setIsOpen }) => {
  return (
    <div className={`${elementAs === 'btn' ? 'tm-new-task' : 'tm-card df jcc dashed-border bg-transparent p-0'}`} onClick={() => setIsOpen(true)}>
      {elementAs === 'btn' ? <button className='btn btn-with-icon'>
        <span className='icon plus-icon' />
        <span>New Task</span>
      </button> : 
      <span className='icon plus-icon bg-transparent w-100' />
      }
    </div>
  )
}

export default NewTask
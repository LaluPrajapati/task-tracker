import React, { useRef } from 'react'
import { daysCal } from "../Utils/utils";
import useClickOutside from "../Hooks/useOutsideClick";

import "./style.scss";

const Card = ({idx, activeIndex, handleActionClick, handleDelete, handleEdit, task, onClickOutside}) => {
  const { id, title, description, priority, createdOn, lastUpdatedOn, status } = task;
  const ref = useRef(null);
  useClickOutside(ref, onClickOutside);

  return (
      <div className='tm-card' key={id}>
        <div className='tm-card-header mb-15'>
          <h6 className='tm-title'>{title}</h6>
          <span className='icon more-option-icon' onClick={(e) => handleActionClick(e,idx)} />
          {idx === activeIndex && <div ref={ref} className='tm-card-action tm-box'>
            <span className='icon edit-icon' onClick={() => handleEdit(id)} />
            <span className='icon delete-icon' onClick={() => handleDelete(id)} />
            <span className='icon setting-icon' />
          </div>}
        </div>
        <p className='tm-description mb-15 text-clamp-3'>{description}</p>
        <div className='tm-status mb-15'>
          <span className={`status-sache ${status.toLowerCase().replace(' ','')}`}>{status}</span>
          <span className='tm-priority'>{priority}</span>
        </div>
        <span className='tm-created-on'>
          {lastUpdatedOn ? `Updated ${daysCal(lastUpdatedOn)} ${daysCal(lastUpdatedOn).toLowerCase() !== 'today' ? 'before' : ''}` : `Created ${daysCal(createdOn)} ${daysCal(createdOn).toLowerCase() !== 'today' ? 'before' : ''}`}
        </span>
      </div>
  )
}

export default Card
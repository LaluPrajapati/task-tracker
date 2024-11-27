import React, { useState, useRef } from 'react'
import { statusOptions } from '../Utils/constant'
import { filterTaskList } from '../Utils/utils'
import useClickOutside from "../Hooks/useOutsideClick";

import './style.scss';

const Filter = ({ setListData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);

  useClickOutside(ref, () => setIsOpen(false));

  const handleFilterItem = (selectedFilter) => {
    setListData(filterTaskList(selectedFilter))
    setIsOpen(false)
  }

  return (
    <div className='tm-filter' ref={ref}>
      <span className='icon filter-icon' onClick={() => setIsOpen(!isOpen)} />
      <ul className={`tm-box tm-filter-options ${isOpen ? 'active' : ''}`}>
        <li key='all' className='tm-filter-option' onClick={() => handleFilterItem('all')}>All</li>
        {statusOptions.length && statusOptions.map(item => 
          <li key={item.key} className='tm-filter-option' onClick={() => handleFilterItem(item.value)}>{item.value}</li>
        )}
      </ul>
    </div>
  )
}

export default Filter
import React from 'react'
import Logout from '../Logout'
import NewTask from '../NewTask'

import './style.scss'

const Header = ({ handleSearchInput, setIsLoggedin, setIsOpen }) => {
  return (
    <header className='tm-header'>
      <div className='header-left df jcb gr-one-fourth'>
        <h2>Task Tracker</h2>
        <div className='search'>
          <input className='search-field' type="text" placeholder='Search Task' onChange={(e) => handleSearchInput(e.target.value)} />
          <span className='icon search-icon' />
        </div>
        <NewTask elementAs='btn' setIsOpen={setIsOpen} />
      </div>
      <div className='header-right df gr-fourth jce'>
        <Logout setIsLoggedin={setIsLoggedin} />
      </div>
    </header>
  )
}

export default Header
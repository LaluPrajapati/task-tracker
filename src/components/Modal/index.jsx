import React from 'react'

import './style.scss';

const Modal = ({handleClose, children, isOpen}) => {
  return (
    <>
      <div className='modal'>
          <span className='close-btn' onClick={()=> handleClose()} />
          <div className="modal-body">              
              {children}               
          </div>
      </div>
      <div className="modal-backdrop" onClick={()=> handleClose()}></div>
    </>
  )
}

export default Modal
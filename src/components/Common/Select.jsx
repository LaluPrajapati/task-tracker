import React from 'react'

const Select = ({id, labelText, name, options, value, onChange}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>
      <select name={name} className="form-control" id={id} onChange={onChange} value={value}>
        <option value=''>select</option>
        {options.length && options.map(option => {
          const { key, value } = option;
          return <option key={key} value={value}>{value}</option>
        })}
      </select>
    </div>
  )
}

export default Select
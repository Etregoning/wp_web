import React from 'react'
import Icon from '@material-ui/core/Icon'

const urgencyFilter = {
  contents: ({ value }) => 
  ( 
    value === "urgent" 
    ? <Icon style={{ color: 'red' }}>error</Icon>  
    : <Icon>error_outline</Icon>
  ),
  select: ({ filter, onChange }) =>
  (
    <select
      onChange={event => onChange(event.target.value)}
      style={{ width: "100%", marginTop: 5}}
      value={filter ? filter.value : "all"}
    >
      <option value="all">All</option>
      <option value="urgent">Urgent</option>
      
    </select>
  ),
  method: (filter, row) => {
    if (filter.value === "all") {
      return row[filter.id] === null
    }
    if (filter.value === "urgent") {
      return row[filter.id] === "urgent";
    }
    // return row[filter.id] === "urgent" 
  },
  
}

export {
  urgencyFilter
}
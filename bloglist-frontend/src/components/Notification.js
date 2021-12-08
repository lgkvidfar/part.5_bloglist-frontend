import { useSelector } from 'react-redux'
import React from 'react'

const Notification = () => {
  const notification = useSelector(state => state.notifications)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 2
  }
  if(notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else {
    return (
      <div>
        {null}
      </div>
    )
  }
}

export default Notification
let timer

export const setNotification = ( message, time  ) => {

  clearTimeout(timer)

  return async dispatch => {
    await dispatch ({
      type: 'SET_NOTIFICATION',
      message 
    })

   timer = setTimeout(() => {
     dispatch(clearNotification())
  },  time *1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

const notificationReducer = (state=null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message;
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer
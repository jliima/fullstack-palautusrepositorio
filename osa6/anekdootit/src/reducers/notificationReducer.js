let timeoutId = null

const reducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export const setNotification = (notification, time) => (
  async dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification }
    })

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { notification: null }
      })
      }, time*1000)
  }
)

export default reducer
const initialNotification = null

const reducer = (state = initialNotification, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.data.notification
    default:
      return state
  }
}

export const setNotification = (notification, time) => (
  async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: { notification }
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: { notification: null }
      })
      }, time*1000)
  }
)

export default reducer
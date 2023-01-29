export function registerReducer(state = [], action) {
  switch (action.type) {
    case "REGISTER_BUILDER":
      return action.payload
    default:
      return state
  }
}

export function positionReducer(state = [], action) {
  switch (action.type) {
    case "REGISTER_POSITION":
      return action.payload
    default:
      return state
  }
}

export function userReducer(state = [], action) {
  switch (action.type) {
    case "REGISTER_USER":
      return [...state, action.payload]
    default:
      return state
  }
}

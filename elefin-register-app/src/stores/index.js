import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux"
import {
  registerReducer,
  positionReducer,
  userReducer,
} from "./reducers/rootReducer"

import thunk from "redux-thunk"
const combine = combineReducers({
  registerReducer,
  positionReducer,
  userReducer,
})

const store = createStore(combine, applyMiddleware(thunk))

export default store

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import user from "../reducers/user";
import lists from "../reducers/Lists";
import games from "../reducers/GamesList"
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const appReducer = combineReducers({
    lists,
    games,
    user
  });

  const rootReducer = (state, action) => {
    if (action.type === "LOG_OUT") {
      state = undefined;
    }

    return appReducer(state, action);
  };

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

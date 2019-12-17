import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import * as Serials from "./Serials";

export default function configureStore() {
 
  const reducers = {    
    serialsReduce: Serials.reducer,
  };

  const rootReducer = combineReducers({
    ...reducers,
  });

  const middleware = [thunk];

  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(...middleware),
    )
  );
}

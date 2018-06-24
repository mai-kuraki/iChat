import {createStore,compose} from 'redux';
import rootReducer from '../reducers';
const composeEnhancers = compose;
const enhancer = composeEnhancers();
const store = createStore(rootReducer, enhancer);

export default store;
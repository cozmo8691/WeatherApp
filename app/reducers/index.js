import {combineReducers} from 'redux';

import ItemsReducer from './itemsReducer';


const reducers = combineReducers({
  itemsState: ItemsReducer
});


export default reducers;

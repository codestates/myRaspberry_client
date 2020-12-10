import {combineReducers} from "redux";
import moviesReducer from './movies'

const rootReducer = combineReducers({
	moviesReducer,
})

export default	rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
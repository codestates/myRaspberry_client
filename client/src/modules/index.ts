import { combineReducers } from "redux";
import moviesReducer from "./movies";
import youtubeReducer from "./youtube";

const rootReducer = combineReducers({
	moviesReducer,
	youtubeReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

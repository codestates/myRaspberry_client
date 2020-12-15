import { combineReducers } from "redux";
import moviesReducer from "./movies";
import youtubeReducer from "./youtube";
import userReducer from "./users";

const rootReducer = combineReducers({
	moviesReducer,
	youtubeReducer,
	userReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

import { combineReducers } from "redux";
import moviesReducer from "./movies";
import youtubeReducer from "./youtube";
import userReducer from "./users";
import introMoviesreducer from "./introMovie";

const rootReducer = combineReducers({
	moviesReducer,
	youtubeReducer,
	userReducer,
	introMoviesreducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

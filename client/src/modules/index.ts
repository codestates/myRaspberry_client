import { combineReducers } from "redux";
import moviesReducer from "./movies";
import youtubeReducer from "./youtube";
import introMoviesreducer from "./introMovie";

const rootReducer = combineReducers({
	moviesReducer,
	youtubeReducer,
	introMoviesreducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

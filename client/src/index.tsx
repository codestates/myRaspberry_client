import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalStyle } from "./styles/global-styles";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./modules";
import Thunk from "redux-thunk";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Router } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory();

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(Thunk.withExtraArgument({ history: customHistory })),
	),
);

ReactDOM.render(
	<Router history={customHistory}>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Provider store={store}>
				<App />
			</Provider>
		</ThemeProvider>
	</Router>,
	document.getElementById("root"),
);

reportWebVitals();

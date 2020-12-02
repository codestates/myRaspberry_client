import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Introduction from "./page/introduction/Introduction";
import Main from "./page/main/Main";
import Mypage from "./page/mypage/Mypage";
import Sign from "./page/sign/Sign";

const App = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" exact component={Introduction} />
			<Route path="/main" component={Main} />
			<Route path="/mypage" component={Mypage} />
			<Route path="/user" component={Sign} />
		</Switch>
	</BrowserRouter>
);

export default App;

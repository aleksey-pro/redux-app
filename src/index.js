import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'; // для работы с асинхронными экшенами
import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'; // синхронизирует историю с redux
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';
import App from './App';
import About from './About';
import Track from './Track';

// В случае "плоских" данных
// const initialState = ['Smells like spirit', 'Enter Sandmen'];
// function playlist(state = initialState, action) {
//   if (action.type === 'ADD_TRACK') {
//     return [...state, action.payload];
//   }
//   return state;
// }

// Без thunk
// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Передаем в метод composeWithDevTools который комбиирует в себя что передаем внутрь, метод applyMiddleware, который вызыватет middleware
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  // Provider даст доступ к redux во всех компонентазх внутри него
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/about" component={About} />
      <Route path="/tracks/:id" component={Track} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// -------------- Чистый redux без react-redux --------------------------------

// import { createStore } from "redux";

// ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();

// const store = createStore(playlist);
// const addTrackBtn = document.querySelectorAll(".addTrack")[0];
// const list = document.querySelectorAll(".list")[0];
// const trackInput = document.querySelectorAll(".trackInput")[0];

// function playlist(state = [], action) {
//   if (action.type === "ADD_TRACK") {
//     return [...state, action.payload];
//   }
//   return state;
// }

// store.subscribe(() => {
//   list.innerHTML = "";
//   trackInput.value = "";
//   store.getState().forEach(track => {
//     const li = document.createElement("li");
//     li.textContent = track;
//     list.appendChild(li);
//   });
// });

// addTrackBtn.addEventListener("click", () => {
//   const trackName = trackInput.value;
//   store.dispatch({ type: "ADD_TRACK", payload: trackName });
// });

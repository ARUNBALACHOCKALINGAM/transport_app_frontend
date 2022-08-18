import { useState,useEffect } from 'react';
import { useImmerReducer } from "use-immer";
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Requests from './components/Requests';
import SignUp from './components/Signup';
import Details from './components/Details';
import FlashMessages from './components/Flash';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import Axios from 'axios';
Axios.defaults.baseURL="https://transportapp-backend.herokuapp.com"


function App() {

  const initialState = {
    loggedIn: Boolean(localStorage.getItem("appToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("appToken"),
      username: localStorage.getItem("appUsername"),
      role: localStorage.getItem("appRole"),

    },
  };


  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
          draft.flashMessages.push(action.value);
          return;


    }
  }
  
  const [state, dispatch] = useImmerReducer(ourReducer, initialState);


  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("appToken", state.user.token);
      localStorage.setItem("appUsername", state.user.username);
      localStorage.setItem("appRole",state.user.role);
    } else {
      localStorage.removeItem("appToken");
      localStorage.removeItem("appUsername");
      localStorage.removeItem("appRole");
    }
  }, [state.loggedIn]);

  useEffect(() => {
    if (state.loggedIn) {
      const ourRequest = Axios.CancelToken.source();
      async function fetchResults() {
        try {
          const response = await Axios.post(
            "/checkToken",
            { token: state.user.token },
            { cancelToken: ourRequest.token }
          );
          if (!response.data) {
            dispatch({ type: "logout" });
          }
        } catch (e) {
          console.log("There was a problem or the request was cancelled.");
        }
      }
      fetchResults();
      return () => ourRequest.cancel();
    }
  }, []);

  const comp = state.user.role==="user" ? <Checkout/> : <Requests/>
  
 
  return (
    <div className="App">
      <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
      <BrowserRouter>
      <FlashMessages messages={state.flashMessages} />
      <Routes>
       <Route path="/" element={state.loggedIn ? comp : <Login/>} />
       <Route path="/signup" element={<SignUp/>} />
       <Route path="/details/:id" element={<Details/>} />
      </Routes>
      </BrowserRouter>
      </DispatchContext.Provider>
      </StateContext.Provider>
      
    </div>
  );
}

export default App;

import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from "axios";
// Initial state
const initialState = {
  allUsers: [],
  currentUser: "",
  currentUserSearchResults: []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function switchCurrentUser(email) {



    dispatch({
      type: 'SWITCH_CURRENT_USER',
      payload: email
    });
  }

  function updateCurrentUserSearchResults(emailAddress) {

    let currentUserStatsQueryArray;

    const currentUserStatsQuery = async function (emailAddress) {
      const uRL = `https://mailstats-api.onrender.com/api/v1/spamStatsPerUserStats/user/${emailAddress}`;

      currentUserStatsQueryArray = await axios.get(uRL);

      if (currentUserStatsQueryArray.status === 200) {
        console.log(currentUserStatsQueryArray.data);
       
      }

      dispatch({
        type: "UPDATE_CURRENT_USER_SEARCH_RESULTS",
        payload: currentUserStatsQueryArray.data,
      });
    };

    // const currentUserStatsRes = currentUserStatsQuery(emailAddress);

     currentUserStatsQuery(emailAddress);

//  dispatch({
//    type: "UPDATE_CURRENT_USER_SEARCH_RESULTS",
//    payload: currentUserStatsRes,
//  });


  }

  function loadDistinctUsers(distinctUsers) {
    dispatch({
      type: "LOAD_DISTINCT_USERS",
      payload: distinctUsers,
    });
  }

  

  return (
    <GlobalContext.Provider
      value={{
        allUsers: state.allUsers,
        currentUser: state.currentUser,
        currentUserSearchResults: state.currentUserSearchResults,
        switchCurrentUser,
        loadDistinctUsers,
        updateCurrentUserSearchResults,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
export default (state, action) => {
  switch (action.type) {
    case "SWITCH_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "LOAD_DISTINCT_USERS":
      return {
        ...state,
        allUsers: action.payload,
      };

    case "UPDATE_CURRENT_USER_SEARCH_RESULTS":

      console.log(action.payload)
      return { ...state, currentUserSearchResults: action.payload };

    default:
      return state;
  }
};

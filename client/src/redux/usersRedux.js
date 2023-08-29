// selectors
export const getUser = ({ users }) => users.user;

// actions
const createActionName = (name) => `app/user/${name}`;
const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');

// action creators
export const logIn = (payload) => ({
  payload,
  type: LOG_IN,
});

export const logOut = (payload) => ({
  payload,
  type: LOG_OUT,
});

const initialState = {
  user: null
};

// reducer
const usersReducer = (statePart = initialState, action = {}) => {
  switch (action.type) {
    case LOG_IN:
      return { user: { ...action.payload } };
    case LOG_OUT:
      return { ...statePart, user: null };
    default:
      return statePart;
  }
};

export default usersReducer;



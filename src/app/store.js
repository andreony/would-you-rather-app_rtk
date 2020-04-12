import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from '../middleware/logger';
import authReducer from '../features/auth/authedUserSlice'
import usersReducer from '../features/users/usersSlice'
import questionsReducer from '../features/questions/questionsSlice'
import filterReducer from '../features/filters/filtersSlice'
import { loadingBarReducer } from 'react-redux-loading-bar'

export default configureStore({
  reducer: {
    visibilityFilter: filterReducer,
    authedUser: authReducer,
    users: usersReducer,
    questions: questionsReducer,
    loadingBar: loadingBarReducer,
  },
  middleware: [ ...getDefaultMiddleware(), logger ]
});

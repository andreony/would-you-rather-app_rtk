import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from '../middleware/logger';
import authReducer from '../features/auth/authedUserSlice'
import usersReducer from '../features/users/usersSlice'
import questionsReducer from '../features/questions/questionsSlice'


export default configureStore({
  reducer: {
    authedUser: authReducer,
    users: usersReducer,
    questions: questionsReducer
  },
  middleware: [ ...getDefaultMiddleware(), logger ]
});

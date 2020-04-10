import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from '../middleware/logger';
import authReducer from '../features/auth/authedUserSlice'
import usersReducer from '../features/users/usersSlice'

export default configureStore({
  reducer: {
    authedUser: authReducer,
    users: usersReducer,
  },
  middleware: [ ...getDefaultMiddleware(), logger ]
});

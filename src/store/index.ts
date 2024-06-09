import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/Userslice';
import contactsReducer from './contacts/contactsSlice';
import authReducer from './auth/authSlice';
import eventReducer from './event/eventSlice';
import invitationReducer from './invitations/invitationsSlice';
import contactsMiddleware from "./contacts/contactsMiddleware";
import loadingReducer from "./loading/loadingSlice";
import { userLocalStorageMiddleware } from "./user/UserMiddleware";
import authLocalStorageMiddleware from "./auth/authMiddleware";
import {eventLocalStorageMiddleware} from './event/eventMiddelware';

const rootReducer = combineReducers({
  user: userReducer,
  contacts: contactsReducer,
  auth: authReducer,
  event: eventReducer,
  invitations: invitationReducer,
  loading: loadingReducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: [contactsMiddleware, userLocalStorageMiddleware, authLocalStorageMiddleware,
    eventLocalStorageMiddleware]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
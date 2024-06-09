import { Middleware } from "@reduxjs/toolkit";

export const eventLocalStorageMiddleware: Middleware = store => next => action => {
  next(action);
  const eventValue =  store.getState().event;
  localStorage.setItem("__event__", JSON.stringify(eventValue));
}


const eventBdMiddleware: Middleware = store => next => action => {
	const { type, payload } = action
	next(action)
	if (type === 'event/editEvent') {
		console.log('eventMiddelware', payload, store);
	}
}

export default eventBdMiddleware;
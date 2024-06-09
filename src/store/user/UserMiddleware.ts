import { Middleware } from "@reduxjs/toolkit";

export const userLocalStorageMiddleware: Middleware = store => next => action => {
  next(action);
  console.log(store);
  //localStorage.setItem("__redux__user__", JSON.stringify(store.getState()));
}

// const UserMiddleware: Middleware = store => next => action => {
// 	const { type, payload } = action
// 	next(action)
// 	if (type === 'user/editUser') {
// 	}
// }

// export default UserMiddleware;
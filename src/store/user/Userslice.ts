import { createSlice } from "@reduxjs/toolkit";
import { IUserResponse } from "../../types";

export const DEFAULT_USER_STATE: IUserResponse = {
  id: "",
  name: "",
  email: "",
  lastName: "",
  username: "",
  profileImage: "",
  balance: 0,
}

const initialState: IUserResponse = (() => {
	const persistedState = localStorage.getItem("__user__");
	return persistedState ? JSON.parse(persistedState) : DEFAULT_USER_STATE;
})();

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    editUser: (_state, action) => {
      return {
        ...action.payload,
      }
    }
  }
})

export const { editUser } = userSlice.actions;
export default userSlice.reducer;
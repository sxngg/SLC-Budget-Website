import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TInvitationContactInfoResponse } from "../../types";

const DEFAULT_STATE: TInvitationContactInfoResponse[] = [];

const initialState: TInvitationContactInfoResponse[] = (() => {
  const persistedState = localStorage.getItem("__invitations__");
  return persistedState ? JSON.parse(persistedState) : DEFAULT_STATE;
})();

export const invitationsSlice = createSlice({
  name: "invitations",
  initialState,
  reducers: {
    addInvitation: (state, action: PayloadAction<TInvitationContactInfoResponse>) => {
      state.push(action.payload);
    },
    updateInvitations: (_, action: PayloadAction<TInvitationContactInfoResponse[]>) => {
      return action.payload;
    },
    editInvitation: (_state, action: PayloadAction<TInvitationContactInfoResponse[]>) => {
      return action.payload;
    },
  },
});

export default invitationsSlice.reducer;

export const { addInvitation, editInvitation, updateInvitations } =
  invitationsSlice.actions;

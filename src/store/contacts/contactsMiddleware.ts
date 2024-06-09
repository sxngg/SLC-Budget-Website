import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "..";
import { addContact } from "../../services/user/UserService";
import { IUserWithId } from "../../types";
import { rollbackContact } from "./contactsSlice";
import { toast } from 'sonner';
import { stopLoading } from "../loading/loadingSlice";

const contactsMiddleware: Middleware = store => next => async action => {
  const { type } = action

  next(action)
  if (type === 'contacts/createContact') {
    const payload: IUserWithId = action.payload;
    const {user, contacts} = store.getState() as RootState
    const contactToAdd = contacts.find(contact => contact.id === payload.id)
    try {
      await addContact(payload.id, user.id)
      toast.success('Contacto agregador con éxito');
    } catch (error) {
      if (contactToAdd) store.dispatch(rollbackContact(contactToAdd));
      toast.error('Error al agregar contacto');
    } finally {
      store.dispatch(stopLoading());
    }

  }

};

export default contactsMiddleware;
import { editUser } from "./Userslice";
import { IUserResponse } from "../../types";
import { useAppDispatch } from "../../hooks/store";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

  const updateUser = async (user: IUserResponse) => {
		dispatch(editUser(user))
	}

	return { updateUser };
};
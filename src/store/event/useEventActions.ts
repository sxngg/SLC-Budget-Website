import { IEventWithId } from "../../types";
import { useAppDispatch } from "../../hooks/store";
import { editEvent } from "./eventSlice";

export const useEventActions = () => {
	const dispatch = useAppDispatch();

  const updateEvent = async (event: IEventWithId) => {
		dispatch(editEvent(event))
	}

	return { updateEvent };
};
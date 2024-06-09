import { useAppDispatch } from "../../hooks/store";
import { startLoading, stopLoading } from "./loadingSlice";

export const useLoadingActions = () => {
	const dispatch = useAppDispatch();

  const loadingOn = async () => {
		dispatch(startLoading())
	}

  const loadingOff = async () => {
		dispatch(stopLoading())
	}

	return { loadingOn, loadingOff };
};
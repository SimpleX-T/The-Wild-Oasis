import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
		mutationFn: updateSettingApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["settings"],
			});
			toast.success("Setting Successfully Updated");
		},
		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateSetting };
}

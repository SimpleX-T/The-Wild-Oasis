import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
	const queryClient = useQueryClient();

	const { isLoading: isCreating, mutate: createCabin } = useMutation({
		mutationFn: createEditCabin,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			toast.success("Cabin Successfully Created");
		},
		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createCabin };
}

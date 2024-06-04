import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
	const { id: editId, ...editValues } = cabinToEdit;

	const isEditingSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditingSession ? editValues : {},
	});

	const { errors } = formState;

	const { isCreating, createCabin } = useCreateCabin();

	const { isLoading: isEditing, mutate: editCabin } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			toast.success("Cabin Successfully Edited");
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	const isWorking = isCreating || isEditing;

	function onSubmit(data) {
		const image =
			typeof data.image === "string" ? data.image : data.image[0];
		const newCabinData = { ...data, image };
		const id = editId;

		if (isEditingSession)
			editCabin({ newCabinData: { ...data, image }, id: editId });
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: (data) => {
						reset();
					},
				}
			);
	}

	function onError(errors) {
		// console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label='Cabin name' error={errors?.name?.message}>
				<Input
					type='text'
					disabled={isWorking}
					id='name'
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow
				label='Maximum capacity'
				error={errors?.maxCapacity?.message}>
				<Input
					type='number'
					disabled={isWorking}
					id='maxCapacity'
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1.",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label='Regular price'
				error={errors?.regularPrice?.message}>
				<Input
					type='number'
					disabled={isWorking}
					id='regularPrice'
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 100,
							message: "Price must at least be at least 100.",
						},
					})}
				/>
			</FormRow>

			<FormRow label='Discount' error={errors?.discount?.message}>
				<Input
					type='number'
					disabled={isWorking}
					id='discount'
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							+value <= +getValues().regularPrice ||
							"Discount should be less than Price",
					})}
				/>
			</FormRow>

			<FormRow
				label='Description for website'
				error={errors?.description?.message}>
				<Textarea
					type='number'
					disabled={isWorking}
					id='description'
					defaultValue=''
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label='Cabin photo'>
				<FileInput
					id='image'
					accept='image/*'
					{...register("image", {
						required: isEditingSession
							? false
							: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button variation='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditingSession ? "Edit cabin" : "Create new cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;

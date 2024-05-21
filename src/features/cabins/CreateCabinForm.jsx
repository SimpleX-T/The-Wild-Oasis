import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();

	const { errors } = formState;

	const queryClient = useQueryClient();

	const { isLoading: isCreating, mutate } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			toast.success("Cabin Successfully Created");
			reset();
		},
		onError: (err) => toast.error(err.message),
	});

	function onSubmit(data) {
		mutate({ ...data, image: data.image["0"] });
	}

	function onError(errors) {
		// console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label='Cabin name' error={errors?.name?.message}>
				<Input
					type='text'
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
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
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button variation='secondary' type='reset'>
					Cancel
				</Button>
				<Button disabled={isCreating}>Add cabin</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;

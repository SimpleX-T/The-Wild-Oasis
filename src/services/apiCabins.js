import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function createCabin(newCabin) {
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);

	//https://mywivwpgcuxoiwpzswwl.supabase.co/storage/v1/object/public/cabin-images/0.8575970927424115-cabin-007.jpg?t=2024-05-21T18%3A32%3A37.598Z

	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	//1. Create Cabin
	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created");
	}

	//2. Upload image

	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	//3. delete the cabin IF there was

	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error(
			"The cabin image was not uploaded and the cabin was not created"
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { error } = await supabase.from("cabins").delete().eq("id", id);
	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}
}

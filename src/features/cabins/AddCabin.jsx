import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
	const [isOpenModal, setIsOpenModal] = useState(false);
	return (
		<div>
			<Button onClick={() => setIsOpenModal((show) => !show)}>
				Create new Cabin
			</Button>
			{isOpenModal && (
				<Modal onClose={() => setIsOpenModal(false)}>
					<CreateCabinForm />
				</Modal>
			)}
		</div>
	);
}
export default AddCabin;

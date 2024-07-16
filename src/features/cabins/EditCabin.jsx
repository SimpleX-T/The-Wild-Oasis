import { HiPencil } from "react-icons/hi2";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function EditCabin() {
	return (
		<Modal>
			<Modal.Open opens='edit-form'>
				<Button>
					<HiPencil />
				</Button>
			</Modal.Open>
			<Modal.Window name='edit-form'>
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	);
}
export default EditCabin;

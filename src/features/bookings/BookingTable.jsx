import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useBookings } from "./useBookings";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";

function BookingTable() {
	const { bookings, isLoading, count } = useBookings();

	const [searchParams] = useSearchParams();

	const filterValue = searchParams.get("status") || "all";

	let filteredBookings;

	switch (filterValue) {
		case "all":
			filteredBookings = bookings;
			break;
		case "checked-in":
			filteredBookings = bookings?.filter(
				(booking) => booking.status === "checked-in"
			);
			break;
		case "checked-out":
			filteredBookings = bookings?.filter(
				(booking) => booking.status === "checked-out"
			);
			break;
		default:
			filteredBookings = bookings;
	}

	const sortValue = searchParams.get("sortBy") || "startDate-desc";
	let sortedBookings;

	switch (sortValue) {
		case "startDate-desc":
			sortedBookings = filteredBookings?.sort(
				(a, b) => b.startDate - a.startDate
			);
			break;
		case "startDate-asc":
			sortedBookings = filteredBookings?.sort(
				(a, b) => a.startDate - b.startDate
			);
			break;
		case "totalPrice-desc":
			sortedBookings = filteredBookings?.sort(
				(a, b) => b.totalPrice - a.totalPrice
			);
			break;
		case "totalPrice-asc":
			sortedBookings = filteredBookings?.sort(
				(a, b) => a.totalPrice - b.totalPrice
			);
			break;
		default:
			sortedBookings = filteredBookings;
			break;
	}

	if (isLoading) {
		return <Spinner />;
	}

	if (!bookings?.length) {
		return <Empty resourceName='bookings' />;
	}

	return (
		<Menus>
			<Table columns='0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem'>
				<Table.Header>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={bookings}
					render={(booking) => (
						<BookingRow
							key={booking.id}
							booking={booking}
						/>
					)}
				/>
				<Table.Footer>
					<Pagination count={count} />
				</Table.Footer>
			</Table>
		</Menus>
	);
}

export default BookingTable;

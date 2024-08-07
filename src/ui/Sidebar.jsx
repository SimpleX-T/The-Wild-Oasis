import styled from "styled-components";

import Logo from "../ui/Logo";
import MainNav from "../ui/MainNav";
import Uploader from "../data/Uploader";

const StyledSidebar = styled.aside`
	padding: 3.2rem 2.4rem;
	grid-row: 1/-1;
	background-color: var(--color-grey-0);
	border-right: 1px solid var(--color-grey-100);

	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;

function Sidebar() {
	return (
		<StyledSidebar>
			<Logo />
			<MainNav />

			<Uploader />
		</StyledSidebar>
	);
}
export default Sidebar;

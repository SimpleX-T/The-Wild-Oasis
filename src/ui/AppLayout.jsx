import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
	height: 100vh;
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
`;

const Main = styled.main`
	padding: 4rem 4.8rem 6.4rem;
	background-color: var(--color-grey-50);
	overflow: scroll;
	scrollbar-width: thin;
	scrollbar-color: var(--color-grey-500) var(--color-grey-50);
`;

const Container = styled.div`
	max-width: 110rem;
	margin: 0 auto;

	display: flex;
	flex-direction: column;
	gap: 3.3rem;
`;

function AppLayout() {
	return (
		<StyledAppLayout>
			<Header />
			<Sidebar />
			<Main>
				<Container>
					<Outlet />
				</Container>
			</Main>
		</StyledAppLayout>
	);
}

export default AppLayout;

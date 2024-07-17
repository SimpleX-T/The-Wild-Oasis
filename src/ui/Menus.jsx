import { createContext, useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;

const StyledList = styled.ul`
	position: fixed;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${(props) => props.$position.x}px;
	top: ${(props) => props.$position.y}px;
`;

// const StyledList = styled.ul`
// 	position: fixed;

// 	background-color: var(--color-grey-0);
// 	box-shadow: var(--shadow-md);
// 	border-radius: var(--border-radius-md);

// 	${({ position }) => position}
// `;

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
		color: var(--color-grey-900);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;

export const MenusContext = createContext();

// function Menus({ children }) {
// 	const [position, setPosition] = useState(null);
// 	const [openId, setOpenId] = useState("");
// 	const close = () => setOpenId("");
// 	const open = setOpenId;

// 	return (
// 		<MenusContext.Provider
// 			value={{ openId, close, open, position, setPosition }}>
// 			{children}
// 		</MenusContext.Provider>
// 	);
// }

// function Toggle({ id }) {
// 	const { openId, open, close, setPosition } = useContext(MenusContext);
// 	const buttonRef = useRef(null);

// 	function handleClick() {
// 		if (openId === id) {
// 			close();
// 		} else {
// 			open(id);
// 			updatePosition();
// 		}
// 	}

// 	function updatePosition() {
// 		if (buttonRef.current) {
// 			const rect = buttonRef.current.getBoundingClientRect();
// 			setPosition({
// 				right: `${window.innerWidth - rect.right}px`,
// 				top: `${rect.bottom + 8}px`,
// 			});
// 		}
// 	}

// 	useEffect(() => {
// 		window.addEventListener("resize", updatePosition);
// 		window.addEventListener("scroll", updatePosition);

// 		return () => {
// 			window.removeEventListener("resize", updatePosition);
// 			window.removeEventListener("scroll", updatePosition);
// 		};
// 	}, []);

// 	return (
// 		<StyledToggle
// 			onClick={handleClick}
// 			ref={buttonRef}>
// 			<HiEllipsisVertical />
// 		</StyledToggle>
// 	);
// }

// function List({ children, id }) {
// 	const { openId, position } = useContext(MenusContext);
// 	const listRef = useRef(null);

// 	useEffect(() => {
// 		function adjustPosition() {
// 			if (listRef.current && position) {
// 				const rect = listRef.current.getBoundingClientRect();
// 				const viewportHeight = window.innerHeight;
// 				const viewportWidth = window.innerWidth;

// 				let newPosition = { ...position };

// 				if (rect.bottom > viewportHeight) {
// 					newPosition.top = `${viewportHeight - rect.height - 10}px`;
// 				}

// 				if (rect.right > viewportWidth) {
// 					newPosition.right = "10px";
// 				}

// 				listRef.current.style.top = newPosition.top;
// 				listRef.current.style.right = newPosition.right;
// 			}
// 		}

// 		if (id === openId) {
// 			adjustPosition();
// 		}
// 	}, [id, openId, position]);

// 	if (id !== openId) return null;

// 	return createPortal(
// 		<StyledList
// 			position={position}
// 			ref={listRef}>
// 			{children}
// 		</StyledList>,
// 		document.body
// 	);
// }

function Menus({ children }) {
	const [position, setPosition] = useState(null);
	const [openId, setOpenId] = useState(null);
	const close = () => setOpenId("");
	const open = setOpenId;

	useEffect(
		function () {
			console.log(openId);
		},
		[openId]
	);

	return (
		<MenusContext.Provider
			value={{ openId, close, open, position, setPosition, setOpenId }}>
			{children}
		</MenusContext.Provider>
	);
}

function Toggle({ id }) {
	const { openId, open, close, setPosition, setOpenId } =
		useContext(MenusContext);

	function handleClick(e) {
		const rect = e.target.closest("button").getBoundingClientRect();
		setPosition({
			x: window.innerWidth - rect.width - rect.x,
			y: rect.y + rect.height + 8,
		});

		setOpenId((prev) => (prev ? null : id));
	}

	return (
		<StyledToggle onClick={handleClick}>
			<HiEllipsisVertical />
		</StyledToggle>
	);
}

function List({ children, id }) {
	const { openId, position, close } = useContext(MenusContext);
	const ref = useOutsideClick(close, true);

	if (id !== openId) return null;

	return createPortal(
		<StyledList
			ref={ref}
			$position={position}>
			{children}
		</StyledList>,
		document.body
	);
}

function Button({ children, icon, onClick }) {
	const { close } = useContext(MenusContext);
	function handleClick() {
		close();
		onClick?.();
	}
	return (
		<li>
			<StyledButton onClick={handleClick}>
				<span>{icon}</span>
				{children}
			</StyledButton>
		</li>
	);
}

Menus.Menu = Menu;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;

export default Menus;

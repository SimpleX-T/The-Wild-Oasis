import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`;

const FilterButton = styled.button`
	background-color: var(--color-grey-0);
	border: none;

	${(props) =>
		props.$active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

function Filter({ filterField, options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentFilter = searchParams.get(filterField) || options.at(0).value;

	// Testing out an api
	// useEffect(function () {
	// 	async function getEmoji() {
	// 		try {
	// 			const res = await fetch(
	// 				"https://emoji-api.com/emojis?search=computer&access_key=569cbf363772e85ce2144f21ba37e6fbddc1d000"
	// 			);
	// 			if (!res.ok) throw new Error("failed to fetch");

	// 			const emoji = await res.json();
	// 			console.log(emoji);
	// 		} catch (err) {
	// 			console.error(err.message);
	// 		}
	// 	}
	// 	getEmoji();
	// }, []);

	function handleClick(value) {
		searchParams.set(filterField, value);
		setSearchParams(searchParams);
	}

	return (
		<StyledFilter>
			{options.map(({ value, label }, index) => (
				<FilterButton
					key={index}
					onClick={() => handleClick(value)}
					$active={value === currentFilter}
					disabled={value === currentFilter}>
					{label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}
export default Filter;

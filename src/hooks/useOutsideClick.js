import { useEffect, useRef } from "react";

export function useOutsideClick(handler, bubbleCapture = true) {
	const ref = useRef();

	useEffect(
		function () {
			function handleClick(e) {
				// console.log(e.target);
				if (ref.current && !ref.current.contains(e.target)) {
					handler();
				}
			}

			document.addEventListener("click", handleClick, bubbleCapture);

			return () =>
				document.removeEventListener(
					"click",
					handleClick,
					bubbleCapture
				);
		},
		[handler, bubbleCapture]
	);
	return ref;
}

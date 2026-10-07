// Zet .is-in op een element zodra het in beeld komt, zodat de CSS-overgang van
// .reveal (app.css) afspeelt. Eén gedeelde observer voor de hele pagina.

let observer: IntersectionObserver | null = null;

function getObserver() {
	observer ??= new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-in');
				observer?.unobserve(entry.target);
			}
		},
		{ rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
	);
	return observer;
}

export function reveal(node: HTMLElement, index = 0) {
	node.classList.add('reveal');
	node.style.setProperty('--i', String(index));
	const io = getObserver();
	io.observe(node);
	return {
		destroy() {
			io.unobserve(node);
		}
	};
}

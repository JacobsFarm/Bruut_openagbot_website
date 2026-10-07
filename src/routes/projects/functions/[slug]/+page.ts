import { error } from '@sveltejs/kit';
import { implementBySlug, implementList } from '$lib/data/implements';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => implementList.map((item) => ({ slug: item.slug }));

export const load: PageLoad = ({ params }) => {
	if (!implementBySlug.has(params.slug)) error(404, 'Not found');
	return { slug: params.slug };
};

import type { PageLoad } from './$types';
import { userApi } from '$lib/api/user';

export const load: PageLoad = async () => {
	// Profile fetched client-side; auth guard handled in the component
	return {};
};

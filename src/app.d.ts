declare global {
	namespace App {
		interface Locals {
			user?: import('$lib/types').User;
		}
		interface PageData {
			user?: import('$lib/types').User | null;
		}
	}
}

export {};

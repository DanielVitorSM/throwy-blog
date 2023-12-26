interface PageProps {
	[key: string];
	auth: {
		user?: User;
	};
	flash: {
		success?: string;
		error?: string;
	};
}

interface Response<T> {
	success: boolean;
	message: string;
	body: T;
}

interface Timestamps {
	created_at?: string;
	updated_at?: string;
	deleted_at?: string;
}

interface Category extends Timestamps {
	id: string;
	name: string;
	slug: string;
}

interface Tag extends Timestamps {
	id: string;
	name: string;
	slug: string;
}

interface UserBasic extends Timestamps {
	id: string;
	slug: string;
	name: string;
	description?: string;
	avatar: string;
}

interface User extends UserBasic {
	role: string;
	email: string;
	description: string;
	last_login_at?: string;
}

interface Post extends Timestamps {
	id: string;
	slug: string;
	title: string;
	caption: string;
	content?: string;
	banner: string;
	published: boolean;
	published_at: string;
	category: Category;
	tags: Tag[];
	author: UserBasic;
}

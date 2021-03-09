export interface ICategories {
    id?: number;
    name?: string;
    created_at?: Date;
}

export interface IComments {
    id?: number;
    userid?: number;
    dishid?: number;
    comment?: string;
    created_at?: Date;
}

export interface IDishCategories {
    categoryid?: number;
    userid?: number;
}

export interface IDishLikes {
    dishid?: number;
    userid?: number;
}

export interface ICommentLikes {
    commentid?: number;
    userid?: number;
}

export interface IDishes {
    id?: number;
    userid?: number;
    name?: string;
    description?: string;
    created_at?: Date;
    image_url?: string;
    allergies?: string;
    num_of_comments?: number;
    restaurant_name?: string;
    location?: string;
}

export interface IRestaurants {
    id?: number;
    name?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    city?: string;
    state?: string;
    price?: string;
    phone?: string;
}

export interface IToken {
    id?: number;
    email?: string;
    token?: string;
    expiration?: Date;
    created_at?: Date;
    updated_at?: Date;
    used?: number;
}

export interface IUsers {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    avatar_url?: string;
    created_at?: Date;
    
}

export interface CannedResponse {
    insertId?: number;
    affectedRows?: number;
    changedRows?: number;
}

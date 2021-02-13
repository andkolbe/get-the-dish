export interface ICategories {
    id: number;
    name: string;
    created_at: Date;
}

export interface IComments {
    id: number;
    userid: number;
    dishid: number;
    username: string;
    avatar_url: string;
    comment: string;
    created_at: Date;
}

export interface IDishes {
    id: number;
    userid: number;
    name: string;
    description: string;
    created_at: Date;
    image_url: string;
    username: string;
    avatar_url: string;
    allergies: string;
    num_of_comments?: number;
}

export interface IRestaurants {
    id: number;
    name: string;
    location: string;
    latitude: number;
    longitude: number;
    price: string;
    phone: string;
}

export interface IUsers {
    id: number;
    username: string;
    email: string;
    password: string;
    avatar_url: string;
    created_at: Date;
    
}



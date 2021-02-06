export interface ICategories {
    id: number;
    name: string;
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
    created_at: Date;
    password: string;
}



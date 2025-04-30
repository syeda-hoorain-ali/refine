export interface IProduct {
    id: string;
    title: string;
    price: number;
    images: string[]; // URLs of first two images
}


export interface IProductDetails {
    id: string;
    title: string;
    description: string;
    price: number;
    stock: number;
    color: string[];
    images: string[]; // Array of image URLs
}

export interface Product {
    _id: string;
    id?: number;
    title: string;
    writer: string;
    availableItems: number;
    price: number;
    description: string;
    image?: string;
}
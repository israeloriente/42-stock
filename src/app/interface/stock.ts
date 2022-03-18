import { Product } from "./product";
import { User } from "./user";

export interface Stock {
    id?: string;
    className?: string;
    createdAt?: Date;
    updatedAt?: Date;
    username?: string;
    // Colums
    product: Product,
    addedBy: User
}
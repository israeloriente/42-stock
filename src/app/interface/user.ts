export interface User {
    id?: string;
    className?: string;
    createdAt?: Date;
    updatedAt?: Date;
    username?: string;
    // Colums
    name: string,
    email: string,
    get?(value: string)
}
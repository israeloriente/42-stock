export interface Mail {
    id?: string;
    className?: string;
    createdAt?: Date;
    updatedAt?: Date;
    // Colums
    email: string,
    get?(value: string)
}
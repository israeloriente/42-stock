export interface Product {
    id?: string;
    className?: string;
    createdAt?: Date;
    updatedAt?: Date;
    // Colums
    name: string,
    barcodeId: string,
    get?(value: string)
}
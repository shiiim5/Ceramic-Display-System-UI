export interface ProductImage {
    id:number;
    productId: number;
    imageURL: string;
    AltText: string;
    DisplayOrder: number;
    createdDate: Date;
    isDeleted: boolean;
    Datedeleted: Date | null;

}

import { ProductImage } from "./product-image";

export interface Product {
id:number;
qualityGrade: string;
name: string;
category: string;
type:number;
quantity: number;
size:{
    length: number;
    width: number;
};

productImages: ProductImage[];
piecesPerBox: number;
pricePerSqm: number;
adminId:number;
createdDate: Date;
isDeleted: boolean;
Datedeleted: Date | null;
}

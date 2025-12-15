import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
   private apiUrl = 'http://localhost:5000/api/Product';

  constructor(private http: HttpClient) { }

getProducts(filters: any) {
  let params = new HttpParams()
    .set('pageNumber', filters.pageNumber)
    .set('pageSize', filters.pageSize);

  Object.keys(filters).forEach(key => {
    const value = filters[key];
    if (value !== null && value !== undefined && value !== '') {
      params = params.set(key, value);
    }
  });

  return this.http.get<any>(this.apiUrl, { params });
}


  addProduct(data: any) {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

addProductImages(productId: number, formData: FormData) {
  return this.http.post(
    `${this.apiUrl}/${productId}/images`,
    formData
  );
}

getProduct(id: number){
return this.http.get<any>(`${this.apiUrl}/${id}`);
}

updateProduct(id:number, data:any){
  return this.http.put(`${this.apiUrl}/${id}`, data);
}

deleteProduct(id:number){
  return this.http.delete(`${this.apiUrl}/${id}`);

}
 
deleteProductImages(prdId:number, imgId:number){
  return this.http.delete(`${this.apiUrl}/${prdId}/images/${imgId}`);

}
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-add-product-component',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-product-component.html',
  styleUrl: './add-product-component.css',
})
export class AddProductComponent  implements OnInit {
 productForm: FormGroup;
  imagePreview: string[] = [];
  categories:  any[] = [];
  qualities : any[] =[];
  types  : any[] =[];
  productId:number = 0;
  selectedImages: File[] = [];




  constructor(private fb: FormBuilder,
    private productService: ProductService
  ) {

 this.productForm = this.fb.group({
  qualityGrade: [null, Validators.required],
  name: ['', [Validators.required, Validators.minLength(2)]],
  category: [null, Validators.required],
  type: [null, Validators.required],
  quantity: [0, [Validators.required, Validators.min(1)]],
  size: this.fb.group({
    length: [0, [Validators.required, Validators.min(10)]],
    width: [0, [Validators.required, Validators.min(10)]],
  }),
  piecesPerBox: [0, [Validators.required, Validators.min(1)]],
  pricePerSqm: [0, [Validators.required, Validators.min(10)]]
});
  }
  ngOnInit(): void {
         this.categories = [
    { id: 0, name: 'Walls' },
    { id: 1, name: 'Floors' },
    { id: 2, name: 'Bathroom' },
    { id: 3, name: 'Kitchen' }
  ];

  this.qualities = [
    { id: 0, name: 'A' },
    { id: 1, name: 'B' },
    { id: 2, name: 'C' }
  ];

  this.types = [
    { id: 0, name: 'Ceramic' },
    { id: 1, name: 'Porcelain' }
  ];
  }

    trackById(index: number, item: any) {
    return item.id;
  }

  
 uploadImages(event: any) {
  const files: FileList = event.target.files;

  if (!files || files.length === 0) return;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    this.selectedImages.push(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview.push(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
}


 saveProduct() {
  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched();
    return;
  }

  const payload = this.productForm.value;

  this.productService.addProduct(payload).subscribe({
    next: (response) => {
      this.productId = response.data.id;
      console.log('Product added successfully', this.productId);

      
      if (this.selectedImages.length > 0) {
        this.uploadProductImages(this.productId);
      }
    },
    error: (error) => {
      console.error('Error adding product', error);
    }
  });
}

uploadProductImages(productId: number) {
  const formData = new FormData();

  this.selectedImages.forEach(file => {
    formData.append('images', file);
  });

  this.productService.addProductImages(productId, formData).subscribe({
    next: (res) => {
      console.log('Images added successfully', res);
    },
    error: (err) => {
      console.error('Error adding product images', err);
    }
  });
}



}

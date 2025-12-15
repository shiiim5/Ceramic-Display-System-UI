import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product-service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-edit-product-component',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './edit-product-component.html',
  styleUrl: './edit-product-component.css',
})
export class EditProductComponent {

 productForm: FormGroup;
 categories:  any[] = [];
  qualities : any[] =[];
  types  : any[] =[];
  productId:number = 0;
 product:Product | undefined;



  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute
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

    this.getProduct();

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


getProduct() {
  this.productId = Number(this.route.snapshot.paramMap.get('id'));
  console.log(this.productId);

  this.productService.getProduct(this.productId).subscribe(res => {
    this.product = res.data;

    
    this.productForm.patchValue({
      name: this.product?.name ,
      category: this.categories.find(c => c.name === this.product?.category)?.id,
      qualityGrade: this.qualities.find(q => q.name === this.product?.qualityGrade)?.id,
      type: this.types.find(t => t.name === this.product?.type)?.id,
      quantity: this.product?.quantity,
      pricePerSqm: this.product?.pricePerSqm,
      piecesPerBox: this.product?.piecesPerBox,
      size: {
        length: this.product?.size.length,
        width: this.product?.size.width
      },
      productImages: this.product?.productImages
    });
    console.log(this.product?.productImages);
  }
);
}


updateProduct() {
  if (this.productForm.invalid) return;

  const payload = {
    ...this.productForm.value,
    category: this.categories.find(c => c.id === this.productForm.value.category)?.name,
    qualityGrade: this.qualities.find(q => q.id === this.productForm.value.qualityGrade)?.name,
    type: this.types.find(t => t.id === this.productForm.value.type)?.name
  };

  this.productService.updateProduct(this.productId, payload).subscribe({
    next: res => {
      console.log('Product updated successfully', res);
      // Optionally show a success message or navigate back
    },
    error: err => {
      console.error('Failed to update product', err);
    }
  });
}



removeImage(imgId: number) {
  if (!this.product) return;

  this.productService.deleteProductImages(this.productId, imgId).subscribe({
    next: () => {
      console.log('Image deleted successfully');
      // Remove it from the local product array so UI updates
      this.product!.productImages = this.product!.productImages.filter(img => img.id !== imgId);
    },
    error: err => {
      console.error('Failed to delete image', err);
    }
  });
}


deleteProduct() {
  if (!this.product || !this.product.productImages) return;

  // First delete all images sequentially
  const deleteImagePromises = this.product.productImages.map(img =>
    this.productService.deleteProductImages(this.productId, img.id).toPromise()
  );

  Promise.all(deleteImagePromises)
    .then(() => {
      // All images deleted, now delete the product
      this.productService.deleteProduct(this.productId).subscribe({
        next: () => {
          console.log('Product deleted successfully');
          // Optionally navigate away after deletion
        },
        error: err => {
          console.error('Failed to delete product', err);
        }
      });
    })
    .catch(err => {
      console.error('Failed to delete some images', err);
    });
}


}

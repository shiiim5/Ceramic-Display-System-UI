import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product-service';
import { QualityGradePipe } from "../../pipes/quality-grade-pipe";

@Component({
  selector: 'app-manage-products-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, QualityGradePipe],
  templateUrl: './manage-products-component.html',
  styleUrl: './manage-products-component.css',
})
export class ManageProductsComponent implements OnInit {

  
  filtered: Product[] = [];
  products: Product[] = [];

  searchText = '';
  selectedCategory?: string;
  selectedQuality?: string;
  selectedType?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;


  pageNumber = 1;
  pageSize = 10;
  totalPages = 0;

  constructor(private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
  const filters: any = {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
    searchTerm: this.searchText || null,
    category: this.selectedCategory || null,
    qualityGrade: this.selectedQuality || null,
    type: this.selectedType || null,
    minPrice: this.minPrice || null,
    maxPrice: this.maxPrice || null,
    sortBy: this.sortBy || null
  };

  this.productService.getProducts(filters).subscribe({
    next: res => {
      this.products = res.data.items;
      this.filtered = res.data.items;
      this.totalPages = res.data.totalPages;
      this.cdr.detectChanges();
    },
    error: err => {
      console.error('Failed to load products', err);
    }
  });
}




filterProducts() {
  this.pageNumber = 1; 
  this.loadProducts();
}

resetFilters(): void {

  this.selectedCategory = '';
  this.selectedQuality = '';
  this.minPrice = undefined;
  this.maxPrice = undefined;
  this.sortBy = '';


  this.searchText = '';


  this.filtered = [...this.products];
     this.loadProducts();

}


onSearch() {
  this.pageNumber = 1;
  this.loadProducts();
}

changePage(page: number) {
  if (page < 1 || page > this.totalPages) return;
  this.pageNumber = page;
  this.loadProducts();
}

get pages(): number[] {
  const total = this.totalPages > 0 ? this.totalPages : 1;
  return Array(total).fill(0).map((_, i) => i + 1);
}



}

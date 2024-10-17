import { ModalService } from './../../services/modal.service';
import { ProductsService } from './../../services/products.service';
import { Component, inject, ViewChild } from '@angular/core';
import { ProductsListComponent } from "../../components/products/products-list/products-list.component";
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ProductsFormComponent } from "../../components/products/products-form/products-form.component";
import { IProduct } from '../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsListComponent, PaginationComponent, ModalComponent, LoaderComponent, ProductsFormComponent],
  templateUrl:'./products.component.html',
  styleUrl: './products.component.scss'
})

export class ProductsComponent {
  public productsService: ProductsService = inject(ProductsService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  @ViewChild('addProductsModal') public addProductsModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  public product: IProduct ={}
  productsForm = this.fb.group({
    id: [''],
    description: ['', Validators.required],
    name: ['', Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    category: ['', Validators.required]
  })

  constructor(){
    this.productsService.getAll();
  }

  saveProduct(product: IProduct){    
    
    this.productsService.save(product);
    this.modalService.closeAll();
  }

  callEdition(product:IProduct){
    this.productsForm.controls['id'].setValue(product.id ? JSON.stringify(product.id) : '');
    this.productsForm.controls['description'].setValue(product.description ? product.description : '');
    this.productsForm.controls['name'].setValue(product.name ? product.name : '');
    this.productsForm.controls['price'].setValue(product.price ? JSON.stringify(product.price) : '');
    this.productsForm.controls['stock'].setValue(product.stock ? JSON.stringify(product.stock) : '');
    this.productsForm.controls['category'].setValue(product.category_id ? JSON.stringify(product.category_id) : '');
    this.modalService.displayModal('lg', this.addProductsModal)
  }

  updateProduct(product: IProduct){
    
    this.productsService.update(product)
    this.modalService.closeAll();
  }

}

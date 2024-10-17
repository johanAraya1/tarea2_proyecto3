import { IProduct } from './../../../interfaces';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss'
})
export class ProductsFormComponent {

  public fb: FormBuilder = inject(FormBuilder);
  @Input() productId!: number;
  @Input() productsForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  callSave(){
    let product: IProduct = {
      description : this.productsForm.controls['description'].value,
      name : this.productsForm.controls['name'].value,
      price : this.productsForm.controls['price'].value,
      stock : this.productsForm.controls['stock'].value,
      category_id : this.productsForm.controls['category'].value
    }
    if(this.productsForm.controls['id'].value){
      product.id = this.productsForm.controls['id'].value;
    }

    if(product.id){
      this.callUpdateMethod.emit(product);
    }else{
      this.callSaveMethod.emit(product);
    }
    
  }
}

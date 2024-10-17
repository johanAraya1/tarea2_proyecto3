import { Component, inject, ViewChild } from '@angular/core';
import { CategoriesListComponent } from '../../components/categories/categories-list/categories-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CategoriesFormComponent } from '../../components/categories/categories-form/categories-form.component';
import { CategoriesService } from '../../services/categories.service';
import { ModalService } from '../../services/modal.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from '../../interfaces';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategoriesListComponent, PaginationComponent, ModalComponent, LoaderComponent, CategoriesFormComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  public categoriesService: CategoriesService = inject(CategoriesService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  @ViewChild('addCategoriesModal') public addCategoriesModal: any;
  public fb: FormBuilder = inject(FormBuilder);
  public category: ICategory ={}
  categoryForm = this.fb.group({
    id: [''],
    description: ['', Validators.required],
    name: ['', Validators.required]
  })

  constructor(){
    this.categoriesService.getAll();
  }

  saveCategory(category: ICategory){    
    this.categoriesService.save(category);
    this.modalService.closeAll();
  }

  callEdition(category: ICategory){
    this.categoryForm.controls['id'].setValue(category.id ? JSON.stringify(category.id) : '');
    this.categoryForm.controls['description'].setValue(category.description ? category.description : '');
    this.categoryForm.controls['name'].setValue(category.name ? category.name : '');
    this.modalService.displayModal('lg', this.addCategoriesModal)
  }

  updateCategory(category: ICategory){
    this.categoriesService.update(category)
    this.modalService.closeAll();
  }
}

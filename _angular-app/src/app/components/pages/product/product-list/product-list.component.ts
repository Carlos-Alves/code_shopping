import { Product } from './../../../../model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductNewModalComponent } from '../product-new-modal/product-new-modal.component';
import { ProductEditModalComponent } from '../product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from './../product-delete-modal/product-delete-modal.component';
import { ProductHttpService } from '../../../../services/http/product-http.service';
import { ProductInsertService } from './product-insert.service';
import { ProductEditService } from './product-edit.service';
import { ProductDeleteService } from './product-delete.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  private products: Array<Product> = [];

  @ViewChild(ProductNewModalComponent)
  productNewModal: ProductNewModalComponent;

  @ViewChild(ProductEditModalComponent)
  productEditModal: ProductEditModalComponent;

  @ViewChild(ProductDeleteModalComponent)
  productDeleteModal: ProductDeleteModalComponent;

  productId: number;
  pagination = {
    page: 1,
    totalItems: 0,
    itemsPerPage: 10
  };

  constructor(private productHttp: ProductHttpService,
              protected productInsertService: ProductInsertService,
              protected productEditService: ProductEditService,
              protected productDeleteService: ProductDeleteService) {
              this.productInsertService.productListComponent = this;
              this.productEditService.productListComponent = this;
              this.productDeleteService.productListComponent = this;
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.getProducts();
  }


  getProducts() {
    const token = window.localStorage.getItem('token');
    this.productHttp.list({page: this.pagination.page})
    .subscribe(response =>  {
      this.products = response.data;
      this.pagination.totalItems = response.meta.total;
      this.pagination.itemsPerPage = response.meta.per_page;
    });
  }

  pageChanged(page){
    this.pagination.page = page;
    this.getProducts();
  }


}

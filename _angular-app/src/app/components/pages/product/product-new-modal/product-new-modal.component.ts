import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { Product } from './../../../../model';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductHttpService } from '../../../../services/http/product-http.service';

@Component({
  selector: 'product-new-modal',
  templateUrl: './product-new-modal.component.html',
  styleUrls: ['./product-new-modal.component.css']
})
export class ProductNewModalComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    active: true
  };

  @ViewChild(ModalComponent) modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  constructor(public productHttp: ProductHttpService) { }

  ngOnInit() {
  }

  submit() {
    this.productHttp
      .create(this.product)
      .subscribe((product) => {
        this.onSuccess.emit(product);
        this.modal.hide();
      }, error => this.onError.emit(error));
  }


  showModal() {
    this.modal.show();
  }

  hideModal($event) {
    console.log($event);
  }

}

import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { ProductHttpService } from './../../../../services/http/product-http.service';

@Component({
  selector: 'product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.css']
})
export class ProductDeleteModalComponent implements OnInit {

  product = null;

  _productId: number;

  // tslint:disable-next-line:no-output-on-prefix
 @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
 // tslint:disable-next-line:no-output-on-prefix
 @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

 @ViewChild(ModalComponent) modal: ModalComponent;

 constructor(private productHttp: ProductHttpService) { }

  ngOnInit() {
  }

  @Input()
  set productId(value) {
    this._productId = value;
    if (this._productId) {
        this.productHttp
          .get(this._productId)
          .subscribe( product => this.product = product )
    }
  }


  destroy() {
    this.productHttp
      .destroy(this._productId)
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

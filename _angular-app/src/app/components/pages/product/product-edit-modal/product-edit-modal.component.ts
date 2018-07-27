import { ProductHttpService } from './../../../../services/http/product-http.service';
import { Product } from './../../../../model';
import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    active: true
  };
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

  submit() {
    this.productHttp
      .update(this._productId, this.product)
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

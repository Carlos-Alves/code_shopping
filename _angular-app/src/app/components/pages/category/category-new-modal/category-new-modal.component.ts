import { Category } from './../../../../model';
import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryHttpService } from '../../../../services/http/category-http.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'category-new-modal',
  templateUrl: './category-new-modal.component.html',
  styleUrls: ['./category-new-modal.component.css']
})
export class CategoryNewModalComponent implements OnInit {


  category: Category = {
    name: '',
    active: true
  };


  @ViewChild(ModalComponent) modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  private urlCategoryList = 'http://localhost:8000/api/categories';

  constructor(public categoryHttp: CategoryHttpService) { }

  ngOnInit() {
  }

  submit() {
    this.categoryHttp
      .create(this.category)
      .subscribe((category) => {
        this.onSuccess.emit(category);
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

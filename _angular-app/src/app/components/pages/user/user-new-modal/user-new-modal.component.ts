import { User } from './../../../../model';
import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';
import { UserHttpService } from '../../../../services/http/user-http.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-new-modal',
  templateUrl: './user-new-modal.component.html',
  styleUrls: ['./user-new-modal.component.css']
})
export class UserNewModalComponent implements OnInit {

  user: User = {
    name: '',
    email: '',
    password: ''
  };


  @ViewChild(ModalComponent) modal: ModalComponent;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  private urlUserList = 'http://localhost:8000/api/users';

  constructor(public userHttp: UserHttpService) { }

  ngOnInit() {
  }

  submit() {
    this.userHttp
      .create(this.user)
      .subscribe((user) => {
        this.onSuccess.emit(user);
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

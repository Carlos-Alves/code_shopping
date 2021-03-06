import { UserHttpService } from './../../../../services/http/user-http.service';
import { User } from './../../../../model';
import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { ModalComponent } from './../../../bootstrap/modal/modal.component';
import { HttpErrorResponse} from '@angular/common/http';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent implements OnInit {

  user: User = {
    name: '',
    email: ''
  };
   _userId: number;

   // tslint:disable-next-line:no-output-on-prefix
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent) modal: ModalComponent;

  constructor(private userHttp: UserHttpService) { }

  ngOnInit() {
  }

  @Input()
  set userId(value) {
    this._userId = value;
    if (this._userId) {
        this.userHttp
          .get(this._userId)
          .subscribe( user => this.user = user )
    }
  }

  submit() {
    this.userHttp
      .update(this._userId, this.user)
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

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-noanswerpopup',
  templateUrl: './noanswerpopup.component.html',
  styleUrls: ['./noanswerpopup.component.scss']
})
export class NoanswerpopupComponent implements OnInit {

  constructor(public ngbModal:NgbModal) { }

  ngOnInit(): void {
  }

  closeDialog()
  {
    this.ngbModal.dismissAll()
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var window: any; // Needed on Angular 8+

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {


  @Input() public qID:string
  url:string;
  showQuestionnaire: boolean;

  constructor(public ngbModal:NgbModal) { }

  ngOnInit(): void {
    const parsedUrl = new URL(window.location.href);
    const baseUrl = parsedUrl.origin;
    console.info(baseUrl);
    if(this.qID!=undefined)
    {
    this.url=baseUrl+"/user/home/"+this.qID;
    this.showQuestionnaire=true;
    }
    else
    {
     this.showQuestionnaire=false;
    }

  }

  closeDialog()
  {
    this.ngbModal.dismissAll()
  }

}

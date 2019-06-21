import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

  predictionValue = 0;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.predictionValue = JSON.parse(localStorage.getItem("value"));
  }


}

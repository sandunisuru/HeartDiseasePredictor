import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-danger',
  templateUrl: './danger.component.html',
  styleUrls: ['./danger.component.css']
})
export class DangerComponent implements OnInit {

  predictionValue = 0;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.predictionValue = JSON.parse(localStorage.getItem("value"));
  }

}

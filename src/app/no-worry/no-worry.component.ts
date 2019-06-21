import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-no-worry',
  templateUrl: './no-worry.component.html',
  styleUrls: ['./no-worry.component.css']
})
export class NoWorryComponent implements OnInit {

  predictionValue = 0;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.predictionValue = JSON.parse(localStorage.getItem("value"));
  }


}

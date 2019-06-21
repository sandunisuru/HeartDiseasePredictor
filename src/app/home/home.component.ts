import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PredictionService } from '../prediction.service';
import { Observable } from 'rxjs';
import { SubSink } from 'subsink'
import { WarningComponent } from '../warning/warning.component';
import { DangerComponent } from '../danger/danger.component';
import { NoWorryComponent } from '../no-worry/no-worry.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  predictData = {
    age: 63,
    sex: 1,
    cp: 3,
    trestbps: 145,
    chol: 233,
    fbs: 1,
    restecg: 0,
    thalach: 150,
    exang: 0,
    oldpeak: 2.3,
    slope: 0,
    ca: 0,
    thal: 1
  }

  prediction: any;
  buttonClicked = false;

  subs = new SubSink();


  constructor(private predict: PredictionService, private modalService: NgbModal) { }

  onChange(event) {

    this.predictData[event.target.name] = parseInt(event.target.value)
  }

  getPrediction() {
    this.buttonClicked = true;
    localStorage.clear();
    this.subs.add(
      this.predict.getPrediction(this.predictData).subscribe(data => {
        this.buttonClicked = false;
        this.prediction = data["prediction"];
        localStorage.setItem("value", JSON.stringify(parseInt(this.prediction)))
        if (parseInt(this.prediction) >= 75) {
          const modalRef = this.modalService.open(DangerComponent, { size: 'lg' });
          modalRef.componentInstance.name = 'World';

        } else if (parseInt(this.prediction) >= 40 && parseInt(this.prediction) < 75) {
          const modalRef = this.modalService.open(WarningComponent, { size: 'lg' });
          modalRef.componentInstance.name = 'World';

        } else {
          const modalRef = this.modalService.open(NoWorryComponent, { size: 'lg' });
          modalRef.componentInstance.name = 'World';

        }

      }));

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}

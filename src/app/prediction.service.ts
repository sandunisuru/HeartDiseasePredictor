import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http: HttpClient) { }

  getPrediction(predictData){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json' });
    let options = { headers: headers };

    return this.http.post("https://localhost:5002/predict", predictData, options);
  }
}

import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Data } from './models/data.medel';
import { HttpClient } from "@angular/common/http";
import {Type_name} from "./preview/menu";
import { ChartComponent} from "./preview/preview.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  // data:Observable<Data>;

  data: any;

  constructor(private http: HttpClient) {
    // this.data =
      this.http.get<Data>('./assets/data.json')
      .pipe()
      .subscribe(res => {
        console.log(res)
        this.data = res;
      });
    // console.log(this.data)
  }
}

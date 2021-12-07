import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import * as d3 from 'd3';
import { Data } from '../models/data.medel';
import {Observable} from "rxjs";

@Component({
  selector: 'bar-chart',
  templateUrl: 'bar.template.html',
  styleUrls:['bar.style.scss']
})


export class BarComponent implements OnInit, OnChanges {

  element: any;


  svgs:any;

@ViewChild('barchart') bar: ElementRef | undefined;

@Input() data: any;

 ngAfterViewInit() {
   setTimeout(() => {
     this.renderchart();
   }, 500);
 }

 renderchart(){
   this.element = this.bar?.nativeElement;
   // console.log(this.element,'$$$$$$$$$$$$$$$$$$$$$');

   const {offsetWidth, offsetHeight} = this.element;
   console.log(this.element)
   this.svgs = d3.select(this.element).append('svg')
     .attr('viewbox', `0 0 ${offsetWidth} ${offsetHeight}`);

 }
  ngOnInit(): void {
     this.createChart()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.data) return;

   this.createChart();
  }


  createChart() {
    console.log(this.data) //data
    setTimeout( () => {
      this.createChart();
    }, 1);
  }


}

import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Type_name} from './menu'
import * as d3 from "d3";


@Component({
  selector: 'app-chart',
  templateUrl: 'preview.template.html',
  styleUrls: ['preview.style.scss']
})

export class ChartComponent implements OnInit {

x:any;
element:any;
svgbox:any
c:any;
margin = {top: 30, right: 30, left: 30, bottom: 20}

  constructor() {

  }

  @ViewChild('Fele') Fele: ElementRef | undefined;


  ngAfterViewInit() {
    setTimeout(() => {
      this.renderchart();
    }, 500);
  }


  renderchart(){
    this.element = this.Fele?.nativeElement;

    const {offsetWidth, offsetHeight} = this.element;
    console.log(this.element)
    this.svgbox = d3.select(this.element).append('svg')
      .attr('viewbox', `0 0 ${offsetWidth} ${offsetHeight}`);

    this.setLayout()
  }

  setLayout(){
    const {offsetWidth, offsetHeight} = this.element;
    const {left, bottom, top} = this.margin;
    let x_range = this.element.offsetWidth;  //1000
    let y_range = this.element.offsetHeight;  //300

  }

  ngOnInit():void {
    console.log(Type_name);
    this.update();
  }


  update(){
    if(!this.element){
      setTimeout( () => {
        this.update();
      },1);
      return;
    }

    const vm = this;
    const { top, bottom, left, right } = vm.margin;
    let ews = this.element.offsetWidth - this.margin.left - this.margin.right;
    let ehs = this.element.offsetHeight - this.margin.bottom;
    console.log(ews,ehs,'@@@@@@@@@@@@@@@@@@')



    this.x =Type_name.map(c => d3.scaleLinear()
      .domain(d3.extent(Type_name, d => d[c]))
      .range([28 / 2, 231-28 / 2]))

    this.svgbox.append('g')
      .attr('transform',`translate( 0, ${ehs})`)
      .call(d3.axisBottom(this.x))
  }

}

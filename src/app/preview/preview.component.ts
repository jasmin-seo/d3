import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Type_name} from './menu'
import * as d3 from "d3";
import { csv,select,scaleLinear } from "d3";
import * as _ from "lodash";

@Component({
  selector: 'app-chart',
  templateUrl: 'preview.template.html',
  styleUrls: ['preview.style.scss']
})

export class ChartComponent implements OnInit {

x:any;
y:any;
element:any;
svgbox:any
c:any;

margin = {top: 30, right: 30, left: 30, bottom: 20}
col = [
  'culmen_length_mm',
  'culmen_depth_mm',
  'flipper_length_mm',
  'body_mass_g',
]


   size = 231.5;

  constructor() {

  }

  @ViewChild('Fele') Fele: ElementRef | undefined;



  ngAfterViewInit() {
    setTimeout(() => {
      this.renderchart();
    }, 500);
  }

//   나의 문제점
//   1. viewbox 생성시 크기가 변하도록 인식하는 함수가 없음 - 사실 방법을 정확히 모르겠음!!
//   2. g태그를 이용해 그룹핑
//   3. x,y축을 생성하지 못함
//      x축- 수치를 줬음에도 함수로 찍었을때 숫자로 안나오고 string으로 나옴!
//     => reduce함수 사용해서 가공하기. string을 number로 바꾸기.. 여기서는 그냥 number인데 height가 작아서 안보였음.
  renderchart(){
    this.element = this.Fele?.nativeElement;

    const {offsetWidth, offsetHeight} = this.element;
    console.log(this.element)
    this.svgbox = d3.select(this.element).append('svg')
      .attr('viewBox', `0 0 ${offsetWidth} ${offsetHeight}`);

    this.setLayout()
  }

  setLayout(){
    const { offsetWidth, offsetHeight } = this.element;
    const { left, bottom, top } = this.margin;
    let x_range = this.element.offsetWidth;  //1000
    let y_range = this.element.offsetHeight;  //300
  }

  ngOnInit():void {

    // console.log(Type_name);
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

    console.log(Type_name);
    // _.reduce(Type_name,function(r:any,v,k){
    //    console.log(r)

    // })

    this.x = this.col.map((c:string) => d3.scaleLinear()//@ts-ignore
     // .domain(d3.extent(Type_name, d => d[c]))
      // .domain(d3.extent(Type_name, d => {
      //   console.log(Type_name)
         // @ts-ignore
       // console.log(d[c])
         // @ts-ignore
       //  return d[c];
    // }))
      .domain(d3.extent(Type_name,d => d[c]))
      .rangeRound([50, (this.size)]));

    // const gg = this.svgbox.append('g')



    const xAxis = () => {
      // @ts-ignore
      const axis = d3.axisBottom()
        .ticks(6)
        .tickSize( this.size * this.col.length);

      return (g:any) => g.selectAll("g").data(this.x).join("g")
        .attr('class', (d: any, i: number) => `gg${i}`)
        .attr("transform", (d: any, i: number) => `translate( ${i * this.size},0)`)
        .each(function (d: any, i: number) {
          // console.log(d3.select('.gg'));
          // @ts-ignore
          return d3.selectAll(`.gg${i}`).call(axis.scale(d));
          // return this.svgbox.node()
        })
        .call((g: any) => g.select(".domain").remove())
        .call((g: any) => g.selectAll(".tick line").attr("stroke", "#ddd"));
    }

    this.svgbox.append('g')
      // .attr('transform',`translate( 0, ${ehs})`)
      .attr('class', 'x-axis')
      .call(xAxis());

    this.y = this.x.map((x:any) => x.copy()
      .range([(this.size -20) , 28]))


    const yAxis = () => {//@ts-ignore
      const axis = d3.axisLeft()
        .ticks(6)
        .tickSize(-(this.size) * this.col.length);

      return (g:any)=> g.selectAll("g").data(this.y).join("g")
        .attr('class', (d: any, i: number) => `ygg${i}`)
        .attr("transform", (d:any, i:number) => `translate(0, ${i * this.size})`)
        .each(function(d:any, i:number) { //@ts-ignore
          return d3.selectAll(`.ygg${i}`).call(axis.scale(d)); })
        .call((g:any) => g.select(".domain").remove())
        .call((g:any) => g.selectAll(".tick line").attr("stroke", "#ddd"));
    }

    this.svgbox.append('g')
      .attr('transform',`translate( 40, 0 )`)
      .attr('class','y-axis')
      .call(yAxis());
  }

}

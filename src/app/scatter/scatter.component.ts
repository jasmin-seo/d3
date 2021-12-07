import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import * as d3  from 'd3';
import * as _ from 'lodash';
import {createViewChild} from "@angular/compiler/src/core";


@Component({
   selector: 'scatter-chart',
  templateUrl:'./scatter.template.html',
  styleUrls : ['./scatter.style.scss']
})

export class scatterComponent implements OnInit {
  x_datas: Array<any> = [
    [
      {x: 'A', y: 0},
      {x: 'B', y: 10},
      {x: 'C', y: 20},
      {x: 'D', y: 30},
    ],
    [
      {x: 'a', Y: 0},
      {x: 'b', y: 5},
      {x: 'c', y: 10},
      {x: 'd', y: 15},
    ]
  ]
  x: any;
  y:any;
  mainbox: any;
  z:any;
  margin = {top: 30, right: 30, left: 30, bottom: 20}

  svg: any;

  @ViewChild('scatter') scatter: ElementRef | undefined;

  ngOnInit(): void {

  }

  ngAfterViewInit() {   //생성전에 데이터가 오면 안되니까
    setTimeout(() => {
      this.renderbox();
    }, 1);
  }

  renderbox() {
    this.mainbox = this.scatter?.nativeElement;
    const {offsetWidth, offsetHeight} = this.mainbox;
    // console.log(this.mainbox)
    this.svg = d3.select(this.mainbox).append('svg')
      .attr('viewBox', `0 0 ${offsetWidth} ${offsetHeight}`)
    this.updata();
  }

  // @ts-ignore
  private padding: number | { valueOf(): number };
  updata() {
    console.log(this.x_datas)

    if (!this.mainbox) {
      setTimeout(() => {
        this.updata();
      }, 1);
      return;
    }
    const vm = this;
    const {top, bottom, left, right} = vm.margin;  //그래프 사이값
    const {offsetHeight} = vm.mainbox
    console.log(vm.mainbox)

    let ew = (this.mainbox.offsetWidth - this.margin.left - this.margin.right) / 2;
    let eh = this.mainbox.offsetHeight - this.margin.bottom;
    console.log(ew, eh)  //371, 282출력됨

    this.x = d3.scalePoint()
      .domain(this.x_datas[0].map((item: any) => item.x))
      .range([this.margin.left, (this.mainbox.offsetWidth - this.margin.right) / 2])


    this.svg.append('g')
      .attr('transform', `translate(0, ${eh})`)
      .call(d3.axisBottom(this.x))


    this.y = d3.scalePoint()
      .domain(this.x_datas[0].map((item: any) => item.y))
      .range([this.mainbox.offsetHeight - this.margin.bottom, this.margin.top])


    this.svg.append('g')
      .attr('transform', `translate( ${this.margin.left}, 0)`)
      .call(d3.axisLeft(this.y))

    //점 차트 그리기
    d3.select('svg')
      .selectAll('circle')
      .data(this.x_datas[0])
      .enter()
      .append('circle')
      .attr('r',3)
      .attr('cx',x => {
        if(x){
          // @ts-ignore
          return this.y(x.x);
        }
      })
      .attr('cy',y => {
        if(y){
          // @ts-ignore
          return this.y(y.y);
        }
      })
      .style('fill','red')
  }

}

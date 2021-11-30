import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import * as d3  from 'd3';
import * as _ from 'lodash';
import {forEach} from "lodash";
import {installTempPackage} from "@angular/cli/utilities/install-package";
import {DSVRowArray , line } from "d3";

@Component({
  selector: 'line-chart',
  templateUrl: './line-template.html',
  styleUrls: ['./line-component.scss']
})

export class lineComponent implements OnInit {

  data2:Array<any> = [
    {"Framework": "Vue", "Stars": "166443", "Released": "2014"},
    {"Framework": "React", "Stars": "150793", "Released": "2013"},
    {"Framework": "Angular", "Stars": "62342", "Released": "2016"},
    {"Framework": "Backbone", "Stars": "27647", "Released": "2010"},
    {"Framework": "Ember", "Stars": "21471", "Released": "2011"}
  ]



  data: Array<any> = [
    {
      "date": "2021-11-13",
      "datenum": "20211113",
      "desc_per": 23,
      "col_t_desc_per": 65.53
    },
    {
      "date": "2021-11-14",
      "datenum": "20211114",
      "desc_per": 88,
      "col_t_desc_per": 65.53
    },
    {
      "date": "2021-11-15",
      "datenum": "20211115",
      "desc_per": 74,
      "col_t_desc_per": 65.53
    },
    {
      "date": "2021-11-16",
      "datenum": "20211116",
      "desc_per": 45,
      "col_t_desc_per": 65.53
    },
    {
      "date": "2021-11-17",
      "datenum": "20211117",
      "desc_per": 8,
      "col_t_desc_per": 65.53
    },
    {
      "date": "2021-11-18",
      "datenum": "20211118",
      "desc_per": 99,
      "col_t_desc_per": 65.53
    },
    {
      "date": "2021-11-19",
      "datenum": "20211119",
      "desc_per": 39,
      "col_t_desc_per": 65.53
    },
    {
      "date": "2021-11-20",
      "datenum": "20211120",
      "desc_per": 88,
      "col_t_desc_per": null
    },
    {
      "date": "2021-11-21",
      "datenum": "20211121",
      "desc_per": 29,
      "col_t_desc_per": null
    },
    {
      "date": "2021-11-22",
      "datenum": "20211122",
      "desc_per": 55,
      "col_t_desc_per": 65.53
    },
    {
      "date": "2021-11-23",
      "datenum": "20211123",
      "desc_per": 77,
      "col_t_desc_per": null
    }
  ];
  element: any;
  x: any;
  y: any;

  margin = {top: 30, right: 30, left: 30, bottom: 20}

  @ViewChild('lineChart') lineChart: ElementRef | undefined; //외부에서 가져오는 것을 지정해준다.
  @ViewChild('barchart') barchart: ElementRef | undefined;
  private svg: any;


  ngOnInit(): void {
    this.update();
    this.bar();
    this.drawBars(this.data2);
    //자료 가져옴!!
    // d3.csv("https://gist.githubusercontent.com/mbostock/4063570/raw/11847750012dfe5351ee1eb290d2a254a67051d0/flare.csv")
    //   .then(res => {
    //     let s_data = res.slice(0,30); //30개 데이터만 자름
    //     console.log(s_data);
    //     this.update(s_data); //값을 넘겨주려고 파라미터로 태움
    //   })

  }

  ngAfterViewInit() {   //생성전에 데이터가 오면 안되니까
    setTimeout(() => {
      this.renderchart();

    }, 1);
  }


  private renderchart() {
    this.element = this.lineChart?.nativeElement;
    console.log(this.element);

    const {offsetWidth, offsetHeight} = this.element;
    //svg viewbox를 설정하기!! g태그가 붙는다.
    this.svg = d3.select(this.element).append('svg')
      .attr('viewBox', `0 0 ${offsetWidth} ${offsetHeight}`);

    this.setLayout();
  }

  setLayout() {  //레이아웃 정하기

    const {offsetWidth, offsetHeight} = this.element;
    const {left, bottom, top} = this.margin;
    let x_range = this.element.offsetWidth;
    let y_range = this.element.offsetHeight;
    console.log(x_range, y_range, '@@@@@@@')
  }

  update() {
    console.log(this.data);


    if (!this.element) {
      setTimeout(() => {
        this.update();
      }, 1);
      return;
    }
    // if(!this.element) return;

    const vm = this;
    const {top, bottom, left, right} = vm.margin;
    const {offsetHeight} = vm.element;

    let ew = this.element.offsetWidth - this.margin.left - this.margin.right;
    let eh = this.element.offsetHeight;  //200
    let ht = eh - this.margin.bottom;  //80

    console.log(eh, ew, ht, '3333333333');

    this.x = d3.scalePoint()
      .domain(this.data.map((item: any) => item.date))
      .range([this.margin.left, this.element.offsetWidth - this.margin.right]);


    let re_num = _.map(this.data, 'desc_per')
    console.log(d3.max(re_num))
    // const dd = d3.max(this.re_num)
    // re_num 배열에서 최대값을 가져와서 범위로 정하려고 했는데 오류남

    console.log(this.element.offsetHeight - this.margin.bottom, this.margin.top)

    this.y = d3.scaleLinear()
      .domain([0, d3.max(re_num)])
      .range([this.element.offsetHeight - this.margin.bottom, this.margin.top])

    this.svg.append('g')
      .attr('transform', `translate( 0 , ${ht})`)
      .call(d3.axisBottom(this.x))

    this.svg.append('g')
      .attr('transform', `translate( ${this.margin.left}, 0)`)
      .call(d3.axisLeft(this.y))

    d3.select('svg').selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('r', 2)
      .attr('cx', x => this.x(x.date))
      .attr('cy', y => this.y(y.desc_per))
      .style('fill', 'black')





    const lineDrowing = d3.line()
      // @ts-ignore
      .x(d => this.x(d.date))
      // @ts-ignore
      .y(d => this.y((d.desc_per)))

    d3.select('svg')
      .append('path')
      .attr('d', lineDrowing(this.data))
      .attr('fill','none')
      .attr('stroke-width', 2)
      .attr('stroke', 'black')

  }






/**
 * bar chart
 * */

  private margins =50;
  private width = 750 - (this.margins*2);
  private height = 300 - (this. margins*2);


  bar(): void {   //barr chart
    console.log(this.data2);
    if (!this.element) {
      setTimeout(() => {
        this.bar();
      }, 1);
      return;
    }
   this.svg = d3.select('p')
     .append('svg')
     .attr('width', this.width + (this.margins * 2))
     .attr('height', this.height + (this.margins * 2))
     .append('g')
     .attr("transform", "translate("+ this.margins + "," + this.margins + ")");
  }

  drawBars(dds:any[]): void {
    console.log(dds)
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(dds.map(d => d.Framework))
      .padding(0.2);

    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform','translate(-10,0)rotate(-45)')
      .style('text-anchor','end');

    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);

    this.svg.append('g')
      .call(d3.axisLeft(y));

    this.svg.selectAll('g')
      .data(dds)
      .enter()
      .append('rect')
      .attr('x', (d: { Framework: string; }) => x(d.Framework))
      .attr('y', (d: { Stars: d3.NumberValue; })=> y(d.Stars))
      .attr('width', x.bandwidth())  // .attr('x', d => x(d.Framework))
      .attr('height', (d: { Stars: d3.NumberValue; }) => this.height - y(d.Stars))
      .attr('fill','magenta');
  }


}

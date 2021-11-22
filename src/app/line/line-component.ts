import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import * as d3  from 'd3';
import * as _ from 'lodash';

@Component({
  selector: 'line-chart',
  templateUrl: './line-template.html',
  styleUrls: ['./line-component.scss']
})

export class lineComponent implements OnInit{


  data: any;
  element: any;


  margin = { top:30, right:30, left:30, bottom:20 }

  @ViewChild('lineChart') lineChart: ElementRef | undefined; //외부에서 가져오는 것을 지정해준다.

  ngOnInit(): void {
    //자료 가져옴!!
    d3.csv("https://gist.githubusercontent.com/mbostock/4063570/raw/11847750012dfe5351ee1eb290d2a254a67051d0/flare.csv")
      .then(res => {
        let s_data = res.slice(0,30); //30개 데이터만 자름
        console.log(s_data);
        this.update();
      })
  }
  ngAfterViewInit(){   //생성전에 데이터가 오면 안되니까
    setTimeout(()=> {
      this.renderchart();
    },1);
  }


  private renderchart() {
    this.element = this.lineChart?.nativeElement;
    console.log(this.element);

    const { offsetWidth, offsetHeight } = this.element;

    this.setLayout();
  }

  setLayout(){  //레이아웃 정하기

    const { offsetWidth, offsetHeight } = this.element;
    const { left, bottom, top } = this.margin;
    let x_range = this.element.offsetWidth;
    let y_range = this. element.offsetHeight;
    console.log(x_range,y_range,'@@@@@@@')
   }

  update(){
    console.log(this.element,'!!!!!!!!!!!!!!')
    if(!this.element) {
      setTimeout(() => { this.update(); }, 1);
      return;
    }
    if(!this.element) return;

    const vm =this;
     const { top, bottom, left, right } = this.margin;
     let eh = this.element.offsetWidth - this.margin.left - this.margin.right;
     let ew = this.element.offsetHeight;
     console.log(eh,ew,'3333333333')



  }
}

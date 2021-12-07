import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { lineComponent } from "./line/line-component";
import { BarComponent} from "./bars/bar.component";
import {CommonModule} from "@angular/common";
import {scatterComponent} from "./scatter/scatter.component";
import {ChartComponent} from "./preview/preview.component";

@NgModule({
  declarations: [
    AppComponent,
    lineComponent,
    BarComponent,
    scatterComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    CommonModule
  ],
  providers: [
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

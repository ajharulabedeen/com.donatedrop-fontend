import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  about = "<h1>About About GUB Alumni";
  todayDate: string;

  constructor() { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-blue sidebar-mini';
  }

  // showDate(){
  //   console.log();
  // }

}

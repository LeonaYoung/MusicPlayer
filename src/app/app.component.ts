import {Component, OnInit, DoCheck} from '@angular/core';
import {MyAudio} from "./my-audio";

@Component({
  selector: 'bp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  audioSelected: MyAudio;

  ngOnInit(){}

}

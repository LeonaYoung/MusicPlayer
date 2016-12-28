import { Component, OnInit, Input } from '@angular/core';
import { MyAudio } from "../my-audio";

@Component({
  selector: 'bp-audio-item',
  templateUrl: './audio-item.component.html',
  styleUrls: ['./audio-item.component.css']
})
export class AudioItemComponent implements OnInit {
  @Input() audio: MyAudio;
  @Input() audioId: number;

  constructor() {
  }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Songs } from "../audio.list";

@Component({
  selector: 'bp-audio-item',
  templateUrl: './audio-item.component.html',
  styleUrls: ['./audio-item.component.css']
})
export class AudioItemComponent implements OnInit {
  @Input() audio: Songs;
  @Input() audioId: number;

  constructor() {
  }

  ngOnInit() {
  }

}

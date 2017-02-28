import { Component, Input } from '@angular/core';

import { Songs } from "../audio.list";

@Component({
  selector: 'bp-audio-item',
  templateUrl: './audio-item.component.html',
  styleUrls: ['./audio-item.component.css']
})
export class AudioItemComponent {
  @Input() audio: Songs;
  @Input() audioId: number;

}

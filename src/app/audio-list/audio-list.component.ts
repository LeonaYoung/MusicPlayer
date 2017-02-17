import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AudioService } from '../audio.service';
import { MyAudio } from '../my-audio';

@Component({
  selector: 'bp-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.css']
})
export class AudioListComponent implements OnInit {
  private audios: MyAudio[] = [];
  @Output() audioSelect = new EventEmitter<MyAudio>();

  constructor(private audioService: AudioService) {
  }

  ngOnInit() {
    this.audios = this.audioService.getAudios();
  }

  onSelected(audio: MyAudio) {
    this.audioSelect.emit(audio);
    console.log(audio.title);
  }
}

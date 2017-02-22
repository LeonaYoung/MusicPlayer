import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { AudioService } from '../audio.service';
import { MyAudio } from '../my-audio';
import { AudioList } from '../audio.list';

@Component({
  selector: 'bp-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.css']
})
export class AudioListComponent implements OnInit {
  private audioList: AudioList;

  constructor(private audioService: AudioService) {
  }

  ngOnInit() {
    this.audioService
      .getPlayList()
      .subscribe((songs:AudioList)=>{this.audioList = songs;});
  }

}

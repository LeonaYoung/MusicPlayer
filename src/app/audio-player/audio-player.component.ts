import { Component, OnInit, OnDestroy ,  trigger, state, style, transition, animate} from '@angular/core';
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

import { AudioService }  from '../audio.service';
import { MyAudio } from "../my-audio";
import { error } from "util";

import { AudioList,Result } from '../audio.list';
import { Song } from '../audio';
import {Lyrc} from '../lyrc';

@Component({
  selector: 'bp-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css'],
  animations: [
    trigger('audioState', [
      state('play', style({
        transform:'rotate(0deg)'
      })),
      state('pause',   style({
        transform: 'rotate(-30deg)'
      })),
      transition('play => pause', animate('400ms ease-in')),
      transition('pause => play', animate('400ms ease-out'))
    ])
  ]
})

export class AudioPlayerComponent implements OnInit,OnDestroy {
  selectedAudio: Song;
  audioUrl: string;
  audioIndex: number;
  audiosLength: number;
  private subscription: Subscription;
  private audioList: AudioList;

  lyric:string;

  constructor(private audioService: AudioService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.audioIndex = params['id'];
        this.audioService
          .getPlayList()
          .subscribe((songs: AudioList) => {
            this.audioList = songs;
            this.audiosLength = this.audioList.result.songs.length;

            this.audioService
              .getSongById(this.audioList.result.songs[this.audioIndex].id)
              .subscribe((audio: Song) => {
                this.selectedAudio = audio;
                this.audioUrl = this.selectedAudio.songs[0].mp3Url;
                this.myAudio.src = this.audioUrl;
              });

            this.audioService
              .getLyricBySongId(this.audioList.result.songs[this.audioIndex].id)
              .subscribe((lyric1: Lyrc) => {
                this.lyric = lyric1.lrc.lyric;
                this.lyricText = this.lyric.split("\n");
                this.getLyrics();
              });
          });
        this.createAudio();
      }
    );
    this.getLyrics();

  }

  private myAudio: HTMLAudioElement;
  public isPlay = false;
  public isFinish = false;
  private progress: number = 0;
  private completed: number = 0;
  private isLoad = false;
  private hasLoaded = false;
  private lyricText: string[] = [];
  private lyricTime: number[] = [];


  createAudio() {
    this.myAudio = new Audio();
    // this.myAudio.src = this.audioUrl;


    this.myAudio.addEventListener("timeupdate", (e) => {
      this.onTimeUpdate(e);
    }, false);

    this.myAudio.addEventListener("playing", () => {
      this.isPlay = true;
      this.isFinish = false;
    }, false);

    this.myAudio.addEventListener("pause", () => {
      this.isPlay = false;
      this.isFinish = false;
    }, false);

    this.myAudio.addEventListener("ended", (e) => {
      this.isFinish = true;
      this.isPlay = false;
      this.playNext();
    }, false);

    this.myAudio.addEventListener("error", () => {
      this.isPlay = false;
      this.onErrorCase(this.myAudio.error);
      //console.log(this.myAudio.error);
      //this.playNext();
    }, false);

    this.myAudio.addEventListener("canplay", () => {
      this.isLoad = false;
      this.hasLoaded = true;
    }, false);
    this.myAudio.addEventListener("progress", (e) => {
      //this.networkState(e);
      //console.log(e);
      //console.log(this.myAudio.networkState);
    }, false);

    this.playOrPause();
  }

  private scrollh = 0;

  onTimeUpdate(e) {
    if (this.isPlay && this.myAudio.duration > 0) {
      this.progress = this.myAudio.currentTime;
      this.completed = Math.floor((this.myAudio.currentTime / this.myAudio.duration) * 1000);
      var track = document.getElementById('slider-up');
      track.style.backgroundSize=this.completed/10 + '% 100%';
    }

    let div1 = document.getElementById('lyr');
    document.getElementById("lyr").innerHTML = " ";

    if (this.myAudio.currentTime < this.lyricTime[this.lyricTime.length - 1]) {
      if (this.myAudio.currentTime < this.lyricTime[1]) {
        div1.innerHTML += "<font color=gainsboro  style=font-weight:bold>" + this.lyricText[0] + "</font><br>";
        for (let i = 1; i < this.lyricText.length; i++) {
          div1.innerHTML += this.lyricText[i] + "<br>";
        }
      }
      else if (this.myAudio.currentTime < this.lyricTime[this.lyricTime.length - 1]) {
        for (let k = 0; k < this.lyricTime.length; k++) {
          if (this.lyricTime[k] <= this.myAudio.currentTime && this.myAudio.currentTime < this.lyricTime[k + 1]) {
            this.scrollh = k * 25;
            div1.innerHTML += "<font color=gainsboro  style=font-weight:bold>" + this.lyricText[k] + "</font><br>";
          } else{
            div1.innerHTML += this.lyricText[k] + "<br>";
          }
        }
      }
    }
    else {
      for (let j = 0; j < this.lyricText.length - 1; j++)
        div1.innerHTML += this.lyricText[j] + "<br>";
      div1.innerHTML += "<font  color=red  style=font-weight:bold>" + this.lyricText[this.lyricText.length - 1] + "</font><br>";
    }

    if (Math.floor(this.myAudio.currentTime) == this.lyricTime[this.scrollh / 25]) {
      document.getElementById("lyr").scrollTop = this.scrollh;
    }
  }

  getLyrics() {
    //将歌词字符串拆分成数组
    //this.lyricText = this.lyric.split("\n");

    //去除数组中为空的字符串
    for (let i = 0; i < this.lyricText.length; i++) {
      if (this.lyricText[i] == '') {
        this.lyricText.splice(i, 1);
      }
    }

    //获取歌词数组和时间戳数组
    for (let i = 0; i < this.lyricText.length; i++) {
      let lyric = decodeURIComponent(this.lyricText[i]);
      let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      let timeRegExpArr = lyric.match(timeReg);
      if (!timeRegExpArr) continue;
      this.lyricText[i] = lyric.replace(timeReg, '');

      for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
        let t = timeRegExpArr[k];
        let min = Number(String(t.match(/\[\d*/i)).slice(1));
        let sec = Number(String(t.match(/\:\d*/i)).slice(1));
        let time = min * 60 + sec;
        this.lyricTime[i] = time;
      }
      //this.lyricTime[i] = time;
    }

    //去除歌词数组中为空的对象，以及时间戳数组中对应的对象
    for (let j = 0; j < this.lyricText.length; j++) {
      if (this.lyricText[j] == '') {
        this.lyricText.splice(j, 1);
        this.lyricTime.splice(j, 1);
      }
    }
  }

  onErrorCase(error) {
    switch (error.code) {
      case 1:
        alert('下载过程被中止');
        break;
      case 2:
        alert('网络发生故障，下载过程被中止');
        break;
      case 3:
        alert('解码失败');
        break;
      case 4:
        alert('媒体资源不可用或媒体格式不被支持');
        break;
    }
  }

  /********************读取当前网络状态，在加载的时候添加加载动画**************
   networkState(e){
    if(this.myAudio.networkState == 2){
      this.loaded = e.loaded;
      this.total = e.total;
    }
    else if(this.myAudio.networkState == 3){

    }
  }
   **************************/

  private lyricOrCd = false;

  changeLyricOrCd() {
    this.lyricOrCd = !this.lyricOrCd;
  }

  changeRange(inputValue: number) {
    this.myAudio.currentTime = Math.floor((this.myAudio.duration * inputValue) / 1000);
  }

  int;
  playOrPause() {
    if (this.myAudio.paused) {
      this.myAudio.play();
      this.state = 'play';  //唱片机动画应处于播放状态
      this.int = setInterval(()=>{
        var image = document.getElementById('img-cycle');
        image.style.webkitTransform +="rotate(0.5deg)"
      },56);
    } else {
      this.myAudio.pause();
      this.state = 'pause';   //唱片机动画应处于暂停状态
      clearInterval(this.int);
    }
  }

  //动画转场
  state;
  toggleState(){
    this.state = (this.state === 'active' ? 'inactive' : 'active');
  }

  isCycle = true;
  isRandom = false;
  isSingle = false;

  playModeSelect() {
    if (this.isCycle) {
      this.isCycle = false;
      this.isSingle = true;
      this.isRandom = false;
    }
    else if (this.isSingle) {
      this.isCycle = false;
      this.isSingle = false;
      this.isRandom = true;
    }
    else if (this.isRandom) {
      this.isCycle = true;
      this.isSingle = false;
      this.isRandom = false;
    }
  }

  playForward() {
    this.myAudio.pause();
    clearInterval(this.int);
    if (this.audioIndex == (this.audiosLength - 1)) {
      this.audioIndex = 0;
      this.router.navigate(['/list', this.audioIndex]);
    } else {
      this.audioIndex = ++this.audioIndex;
      this.router.navigate(['/list', this.audioIndex]);
    }
  }

  playBackward() {
    this.myAudio.pause();
    clearInterval(this.int);
    if (this.audioIndex == 0) {
      this.audioIndex = this.audiosLength - 1;
      this.router.navigate(['/list', this.audioIndex]);
    } else {
      this.audioIndex = --this.audioIndex;
      this.router.navigate(['/list', this.audioIndex]);
    }
  }

  playNext() {
    clearInterval(this.int);
    if (this.isCycle) {
      if (this.audioIndex == (this.audiosLength - 1)) {
        this.router.navigate(['/list', 0]);
      } else {
        this.audioIndex = ++this.audioIndex;
        this.router.navigate(['/list', this.audioIndex]);
      }
    }
    else if (this.isSingle) {
      this.playOrPause();
    }
    else if (this.isRandom) {
      let max = this.audiosLength - 1;
      let randomId = Math.floor(Math.random() * (max + 1));
      if (this.audioIndex == randomId) {
        if (randomId == max) {
          this.audioIndex = 0;
          this.router.navigate(['/list', this.audioIndex]);
        } else {
          this.audioIndex = randomId + 1;
          this.router.navigate(['/list', this.audioIndex]);
        }
      }
      else {
        this.audioIndex = randomId;
        this.router.navigate(['/list', this.audioIndex]);
      }
      console.log(randomId, this.audioIndex);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

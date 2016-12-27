import {Component, OnInit, OnDestroy,} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import { AudioService }  from '../audio.service';
import {MyAudio} from "../my-audio";
import {error} from "util";

@Component({
  selector: 'bp-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit,OnDestroy{
  selectedAudio: MyAudio;
  audioId: number;
  audiosLength: number;
  private subscription: Subscription;

  lyric  = "[00:10.130]马条：我想吻的人不在我身旁\n[00:14.500]我想唱的歌不在我心房\n" +
  "[00:19.070]我想种棵树但没有土壤\n" +
  "[00:23.600]我想把骨头包起来献给海洋\n" +
  "[00:27.790]\n" +
  "[00:28.330]艾尔肯：我想走的路不怎么顺畅\n" +
  "[00:32.680]我想读的书都有钢铁的重量\n" +
  "[00:37.230]我想打开的门都已经关上\n[00:41.820]我想冷不丁的划破肃穆的思想\n[00:45.700]\n[00:46.500]合：我想 我想 在夏天穿上冬装\n[00:50.890]我想 我想 听清鸟儿的展望\n[00:55.440]我想 我想 分辨集体的份量\n[01:00.030]突然间 裸露在一个神圣的广场\n[01:04.690]\n[01:23.050]洪启：我想吻的人不在我身旁\n[01:27.350]我想唱的歌不在我心房\n[01:31.820]我想种棵树但没有土壤\n[01:36.380]我想把骨头包起来献给海洋\n[01:40.530]\n[01:40.830]张楚：我想走的路不怎么顺畅\n[01:45.670]我想读的书都有钢铁的重量\n[01:50.000]我想打开的门都已经关上\n[01:54.560]我想冷不丁的划破肃穆的思想\n[01:59.010]\n[01:59.260]合：我想 我想 在夏天穿上冬装\n[02:03.670]我想 我想 听清鸟儿的展望\n[02:08.210]我想 我想 分辨集体的份量\n[02:12.890]突然间 裸露在一个神圣的广场\n[02:17.830]\n[02:36.230]杨嘉松：我想吻的人不在我身旁\n[02:40.900]我想唱的歌不在我心房\n[02:45.340]我想种棵树但没有土壤\n[02:49.850]我想把骨头包起献给海洋\n[02:54.190]\n[02:54.440]钟立风：我想走的路不怎么顺畅\n[02:59.000]我想读的书都有钢铁的重量\n[03:03.540]我想打开的门都已经关上\n[03:08.110]我想冷不丁的划破肃穆的思想\n[03:12.240]\n[03:12.440]合：我想 我想 在夏天穿上冬装\n[03:17.250]我想 我想 听清鸟儿的展望\n[03:21.740]我想 我想 分辨集体的份量\n[03:26.430]突然间 裸露在一个神圣的广场\n[03:31.440]合：我想 我想 在夏天穿上冬装\n[03:35.680]我想 我想 听清鸟儿的展望\n" +
  "[03:40.140]我想 我想 分辨集体的份量\n" +
  "[03:44.690]突然间 裸露在一个神圣的广场\n";

  constructor(
    private audioService: AudioService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.audioId = params['id'];
        this.selectedAudio = this.audioService.getAudio(this.audioId);
        this.audiosLength = this.audioService.getAudioLength();
        this.createAudio();
        this.playOrPause();
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

  private lyrics ;
  private lyricId: number[] =[];

  getLyrics(){
    //将歌词字符串拆分成数组
    this.lyrics = this.lyric.split("\n");

    //去除数组中为空的字符串
    for(let i=0;i<this.lyrics.length;i++){
      if(this.lyrics[i]==''){
        this.lyrics.splice(i,1);
      }
    }

    //获取歌词数组和时间戳数组
    for(let i = 0;i<this.lyrics.length; i++){
      var lyric = decodeURIComponent(this.lyrics[i]);
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      var timeRegExpArr = lyric.match(timeReg);
      if (!timeRegExpArr) continue;
      var clause = lyric.replace(timeReg, '');
      this.lyrics[i] = clause;

      for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
        var t = timeRegExpArr[k];
        var min = Number(String(t.match(/\[\d*/i)).slice(1));
        var sec = Number(String(t.match(/\:\d*/i)).slice(1));
        var time = min * 60 + sec;
      }
      this.lyricId[i] = time;
    }

    //去除歌词数组中为空的对象，以及时间戳数组中对应的对象
    for(let j=0;j<this.lyrics.length;j++){
      if(this.lyrics[j] == ''){
        this.lyrics.splice(j,1);
        this.lyricId.splice(j,1);
      }
    }

  }

  /*************
  pos = 0;
  dos = 0;
  get line() {
    return this.lyrics[this.pos];
  }
  ngAfterViewInit(){
    if(this.pos < this.lyrics.length){
      setInterval(()=> this.pos = (this.pos+1)%4, 1500);
    }
  }

   ******************/

  createAudio() {
    this.myAudio = new Audio();
    this.myAudio.src = this.selectedAudio.src;

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

    this.myAudio.addEventListener("error", () =>{
      this.isPlay = false;
      this.onErrorCase(this.myAudio.error);
      //console.log(this.myAudio.error);
      //this.playNext();
    }, false);

    this.myAudio.addEventListener("canplay", () => {
      this.isLoad = false;
      this.hasLoaded = true;
    }, false);
    this.myAudio.addEventListener("progress",(e) => {
      //this.networkState(e);
      //console.log(e);
      //console.log(this.myAudio.networkState);

    },false);
  }

  private x =0;
  private scrollh = 0;
  private delay = 10;

  onTimeUpdate(e) {
    if (this.isPlay && this.myAudio.duration > 0) {
      this.progress = this.myAudio.currentTime;
      this.completed = Math.round((this.myAudio.currentTime / this.myAudio.duration) * 1000);
    }



    /*************************
     if(this.myAudio.currentTime < this.lyricId[this.x]){
      this.pos = this.x;
      this.x = this.x+1;
    }

     if(Math.round(this.myAudio.currentTime) == this.lyricId[this.x]){
      this.pos = this.x;
      this.x = this.x+1;
      div1.innerHTML += "<font color=red>"+this.lyrics[this.x-1]+"</font><br>"
    }else {
      console.log(this.lyricId[this.x],this.myAudio.currentTime);
    }
     ***********************/
    let div1 = document.getElementById('lyr');
    document.getElementById("lyr").innerHTML = " ";
   // console.log('scrollHeight:',div1.scrollHeight);


    if(this.myAudio.currentTime<this.lyricId[this.lyricId.length-1]){
      if (this.myAudio.currentTime < this.lyricId[1]) {
        div1.innerHTML += "<font color=red  style=font-weight:bold>" + this.lyrics[0] + "</font><br>";
        for (let i = 1; i < this.lyrics.length; i++) {
          div1.innerHTML += this.lyrics[i] + "<br>";
        }
      }
      else if(this.myAudio.currentTime<this.lyricId[this.lyricId.length-1]){
        for (let k = 0; k < this.lyricId.length; k++) {
          if (this.lyricId[k] <= this.myAudio.currentTime && this.myAudio.currentTime < this.lyricId[k + 1]) {
            this.scrollh = k * 25;
            div1.innerHTML += "<font color=red  style=font-weight:bold>" + this.lyrics[k] + "</font><br>";
          } else if (this.myAudio.currentTime < this.lyricId[this.lyricId.length - 1])
            div1.innerHTML += this.lyrics[k] + "<br>";
        }
      }
    }
    else{
      for (let j = 0; j < this.lyrics.length - 1; j++)
      div1.innerHTML += this.lyrics[j] + "<br>";
      div1.innerHTML += "<font  color=red  style=font-weight:bold>" + this.lyrics[this.lyrics.length - 1] + "</font><br>";
    }
    //this.scrollBar();
  }

  scrollBar(){
    if(document.getElementById("lyr").scrollTop<=this.scrollh)
      document.getElementById("lyr").scrollTop+=1;
    if(document.getElementById("lyr").scrollTop>=this.scrollh+50)
      document.getElementById("lyr").scrollTop-=1;
    window.setTimeout(this.scrollBar(),this.delay);
  }


  onErrorCase(error){
    switch (error.code){
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

  changeRange(x:number){
    this.myAudio.currentTime = Math.round((this.myAudio.duration * x) / 1000);
  }

  private lyricOrCd = false;

  test(){
    this.lyricOrCd = !this.lyricOrCd;
  }


  playOrPause(){
    if(this.myAudio.paused){
      this.myAudio.play();
    }else{
      this.myAudio.pause();
    }
  }

  isCycle = true;
  isRandom = false;
  isSingle = false;

  playModeSelect(){
    if(this.isCycle){
      this.isCycle = false;
      this.isSingle = true;
      this.isRandom = false;
    }
    else if(this.isSingle){
      this.isCycle = false;
      this.isSingle = false;
      this.isRandom = true;
    }
    else if(this.isRandom){
      this.isCycle = true;
      this.isSingle = false;
      this.isRandom = false;
    }
  }

  playForward(){
      this.myAudio.pause();
      if(this.audioId == (this.audiosLength-1)){
        this.audioId = 0;
        this.router.navigate(['/list',this.audioId]);
      }else {
        this.audioId = ++this.audioId;
        this.router.navigate(['/list',this.audioId]);
      }
  }

  playBackward(){
    this.myAudio.pause();
    if(this.audioId == 0){
      this.audioId = this.audiosLength-1;
      this.router.navigate(['/list',this.audioId]);
    }else {
      this.audioId = --this.audioId;
      this.router.navigate(['/list',this.audioId]);
    }
  }

  playNext(){
    if(this.isCycle){
      if(this.audioId == (this.audiosLength-1)){
        this.router.navigate(['/list',0]);
      }else {
        this.audioId = ++this.audioId;
        this.router.navigate(['/list',this.audioId]);
      }
    }
    else if(this.isSingle){
      this.playOrPause();
    }
    else if(this.isRandom){
      let max = this.audiosLength -1;
      let randomId = Math.floor(Math.random()*(max+1));
      if(this.audioId == randomId){
        if(randomId == max){
          this.audioId = 0;
          this.router.navigate(['/list',this.audioId]);
        }else {
          this.audioId = randomId + 1;
          this.router.navigate(['/list',this.audioId]);
        }
      }
      else{
        this.audioId = randomId;
        this.router.navigate(['/list',this.audioId]);
      }
      console.log(randomId, this.audioId);
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

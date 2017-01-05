import { Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentChecked, DoCheck,Input,
  trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';

let lyric = ["鸳鸯双栖蝶双飞", "满园春色惹人醉", "悄悄问圣僧", "女儿美不美"];
let lyric1 = [{
  "sgc": true,
  "sfy": false,
  "qfy": false,
  "lrc": {
    "version": 12,
    "lyric": "[00:10.130]马条：我想吻的人不在我身旁\n" +
    "[00:14.500]我想唱的歌不在我心房\n" +
    "[00:19.070]我想种棵树但没有土壤\n" +
    "[00:23.600]我想把骨头包起来献给海洋\n" +
    "[00:27.790]\n" +
    "[00:28.330]艾尔肯：我想走的路不怎么顺畅\n" +
    "[00:32.680]我想读的书都有钢铁的重量\n" +
    "[00:37.230]我想打开的门都已经关上\n[00:41.820]我想冷不丁的划破肃穆的思想\n[00:45.700]\n[00:46.500]合：我想 我想 在夏天穿上冬装\n[00:50.890]我想 我想 听清鸟儿的展望\n[00:55.440]我想 我想 分辨集体的份量\n[01:00.030]突然间 裸露在一个神圣的广场\n[01:04.690]\n[01:23.050]洪启：我想吻的人不在我身旁\n[01:27.350]我想唱的歌不在我心房\n[01:31.820]我想种棵树但没有土壤\n[01:36.380]我想把骨头包起来献给海洋\n[01:40.530]\n[01:40.830]张楚：我想走的路不怎么顺畅\n[01:45.670]我想读的书都有钢铁的重量\n[01:50.000]我想打开的门都已经关上\n[01:54.560]我想冷不丁的划破肃穆的思想\n[01:59.010]\n[01:59.260]合：我想 我想 在夏天穿上冬装\n[02:03.670]我想 我想 听清鸟儿的展望\n[02:08.210]我想 我想 分辨集体的份量\n[02:12.890]突然间 裸露在一个神圣的广场\n[02:17.830]\n[02:36.230]杨嘉松：我想吻的人不在我身旁\n[02:40.900]我想唱的歌不在我心房\n[02:45.340]我想种棵树但没有土壤\n[02:49.850]我想把骨头包起献给海洋\n[02:54.190]\n[02:54.440]钟立风：我想走的路不怎么顺畅\n[02:59.000]我想读的书都有钢铁的重量\n[03:03.540]我想打开的门都已经关上\n[03:08.110]我想冷不丁的划破肃穆的思想\n[03:12.240]\n[03:12.440]合：我想 我想 在夏天穿上冬装\n[03:17.250]我想 我想 听清鸟儿的展望\n[03:21.740]我想 我想 分辨集体的份量\n[03:26.430]突然间 裸露在一个神圣的广场\n[03:31.440]合：我想 我想 在夏天穿上冬装\n[03:35.680]我想 我想 听清鸟儿的展望\n" +
    "[03:40.140]我想 我想 分辨集体的份量\n" +
    "[03:44.690]突然间 裸露在一个神圣的广场\n"
  },
  "klyric": {"version": 0}, "tlyric": {"version": 0, "lyric": null}, "code": 200
}];


@Component({
  selector: 'bp-audio-recommend',
  templateUrl: './audio-recommend.component.html',
  styleUrls: ['./audio-recommend.component.css'],
  animations: [
    trigger('heroState', [
      state('inactive', style({
        transform:'rotate(-30deg)'
      })),
      state('active',   style({
        transform: 'rotate(0deg)'
      })),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))
    ])
  ]
})
export class AudioRecommendComponent implements OnInit, AfterViewInit ,AfterViewChecked,AfterContentChecked,DoCheck{

  lyric2 = "[00:10.130]马条：我想吻的人不在我身旁\n[00:14.500]我想唱的歌不在我心房\n" +
    "[00:19.070]我想种棵树但没有土壤\n" +
    "[00:23.600]我想把骨头包起来献给海洋\n" +
    "[00:27.790]\n" +
    "[00:28.330]艾尔肯：我想走的路不怎么顺畅\n" +
    "[00:32.680]我想读的书都有钢铁的重量\n" +
    "[00:37.230]我想打开的门都已经关上\n[00:41.820]我想冷不丁的划破肃穆的思想\n[00:45.700]\n[00:46.500]合：我想 我想 在夏天穿上冬装\n[00:50.890]我想 我想 听清鸟儿的展望\n[00:55.440]我想 我想 分辨集体的份量\n[01:00.030]突然间 裸露在一个神圣的广场\n[01:04.690]\n[01:23.050]洪启：我想吻的人不在我身旁\n[01:27.350]我想唱的歌不在我心房\n[01:31.820]我想种棵树但没有土壤\n[01:36.380]我想把骨头包起来献给海洋\n[01:40.530]\n[01:40.830]张楚：我想走的路不怎么顺畅\n[01:45.670]我想读的书都有钢铁的重量\n[01:50.000]我想打开的门都已经关上\n[01:54.560]我想冷不丁的划破肃穆的思想\n[01:59.010]\n[01:59.260]合：我想 我想 在夏天穿上冬装\n[02:03.670]我想 我想 听清鸟儿的展望\n[02:08.210]我想 我想 分辨集体的份量\n[02:12.890]突然间 裸露在一个神圣的广场\n[02:17.830]\n[02:36.230]杨嘉松：我想吻的人不在我身旁\n[02:40.900]我想唱的歌不在我心房\n[02:45.340]我想种棵树但没有土壤\n[02:49.850]我想把骨头包起献给海洋\n[02:54.190]\n[02:54.440]钟立风：我想走的路不怎么顺畅\n[02:59.000]我想读的书都有钢铁的重量\n[03:03.540]我想打开的门都已经关上\n[03:08.110]我想冷不丁的划破肃穆的思想\n[03:12.240]\n[03:12.440]合：我想 我想 在夏天穿上冬装\n[03:17.250]我想 我想 听清鸟儿的展望\n[03:21.740]我想 我想 分辨集体的份量\n[03:26.430]突然间 裸露在一个神圣的广场\n[03:31.440]合：我想 我想 在夏天穿上冬装\n[03:35.680]我想 我想 听清鸟儿的展望\n" +
    "[03:40.140]我想 我想 分辨集体的份量\n" +
    "[03:44.690]突然间 裸露在一个神圣的广场\n";

  lyric3 = this.lyric2.split("\n");

  constructor() {
  }

  state;
  toggleState(){
    this.state = (this.state === 'active' ? 'inactive' : 'active');
  }

  int;
  ngOnInit() {
    var tt = this.parseLyric(this.lyric2);

    this.int = setInterval(()=>{
      var image = document.getElementById('img-cycle');
      image.style.webkitTransform +="rotate(0.5deg)"
    },56);


    //console.log(tt);
  }

  pause(){
    clearInterval(this.int);
  }
  start(){
    this.int = setInterval(()=>{
      var image = document.getElementById('img-cycle');
      image.style.webkitTransform +="rotate(0.5deg)"
    },56);
  }

  scrollTo() {
    let lyricB = document.getElementById('lyricBox');
    document.getElementById('lyricBox').scrollTop += 30;
    console.log('scrollHight:', lyricB.scrollHeight);
    console.log('clientHight:', lyricB.clientHeight);

  }

  parseLyric(lrc) {
    var lyrics = lrc.split("\n");

    var lrcObj = {};
    for (var i = 0; i < lyrics.length; i++) {
      var lyric = decodeURIComponent(lyrics[i]);
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      var timeRegExpArr = lyric.match(timeReg);
      if (!timeRegExpArr)continue;
      var clause = lyric.replace(timeReg, '');

      for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
        var t = timeRegExpArr[k];
        var min = Number(String(t.match(/\[\d*/i)).slice(1)),
          sec = Number(String(t.match(/\:\d*/i)).slice(1));
        var time = min * 60 + sec;
        lrcObj[time] = clause;
      }
    }
    return lrcObj;

  }

  private testV = false;

  test() {
    this.test != this.test;
  }

  pos = 0;

  get line() {
    return this.lyric3[this.pos];
  }

  ngAfterViewInit() {
    //setInterval(()=> this.pos = (this.pos+1)%4, 1500);
    //console.log('afterviewinit');

  }

  ngAfterViewChecked(){
    //console.log('afterviewchecked');
  }

  ngAfterContentChecked(){
   // console.log('aftercontentchecked');
  }

  ngDoCheck(){
    //console.log('dochecked');
  }

  trackto(value){
    var track = document.getElementById('testslider');
    console.log(value);
    //track.style.backgroundSize=value/10 + '% 100%';
    track.style.backgroundSize=value/10+'% 100%';
    //track.addEventListener("input",(e)=>{
    //console.log(value);});

  }

  /*********************************
   *
   *
   *
   *
   *
   *
   *
   *

  slider = document.querySelector(".slider");
  buffer = document.querySelector(".buffer");

  step = 0.05;

  timer = window.setInterval(function(){
    let sw = this.slider.offsetWidth;
    let w = this.buffer.offsetWidth;

    this.buffer.style.width = w + sw*this.step + "px";

    if(w+sw*this.step == sw){
      window.clearInterval(this.timer);
    }
  },100);


  processor = document.querySelector(".processor");
  controller = document.querySelector(".controller");

  dragDropHandler(event){
    switch (event.type){
      case "mousedown":{
        break;
      }
      case "mousemove":{
        break;
      }
      case "mouseup":{
        break;
      }
    }
}

  slider.addEventListener("mousedown",dragDropHandler);

  window.addEnentListener("mousemove",dragDropHandler);
  window.addEnentListener("mouseup",dragDropHandler);

  tx = event.clientX - slider.offsetWidth;
  halfW = controller.offsetWidth>>1;

  controller.style.left = this.tx + this.halfW + "px";
  processer.style.width = this.tx + this.halfW*3 + "px";





  var elem = document.querySelector('input[type="range"]');
  var rangeValue = function(){
  var newValue = elem.value;
  var target = document.querySelector('.value');
  target.innerHTML = newValue;
};
  elem.addEventListener("input", rangeValue);




   var elem = document.querySelector('input[type="range"]');
   var rangeValue = function(){
      //var newValue = elem.value;
      var target = document.querySelector('.value');
      target.innerHTML = elem.nodeValue;
    };
   elem.addEventListener("input", rangeValue);
   console.log('afterviewinit');

   **********************************/




}





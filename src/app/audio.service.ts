import { Injectable } from '@angular/core';

import { MyAudio } from './my-audio';

@Injectable()
export class AudioService {
  private myAudios: MyAudio[] = [
    new MyAudio('千千厥歌', '陈慧娴', 'http://img3.imgtn.bdimg.com/it/u=4166721891,1503444760&fm=21&gp=0.jpg', 'http://localhost:8080/Downloads/%E5%8D%83%E5%8D%83%E9%98%99%E6%AD%8C.mp3'),
    new MyAudio('我想，我想', '马条', 'http://img4.imgtn.bdimg.com/it/u=3179239109,203604917&fm=21&gp=0.jpg', 'http://localhost:8080/Downloads/woxiangwoxiang.mp3'),
    new MyAudio('爱的魔法', '金莎', 'http://img2.imgtn.bdimg.com/it/u=26697390,4248724664&fm=21&gp=0.jpg', 'http://localhost:8080/Downloads/172a1a5ce753ca01230f2dd8742e9098.mp3'),
    new MyAudio('Under a Violet Moon', "Blackmore's night", 'http://img2.imgtn.bdimg.com/it/u=1985744488,1645890010&fm=21&gp=0.jpg', 'http://m8.music.126.net/20161215183136/5d0dca8d2c00e4adfdb020943fa20278/ymusic/920c/c513/e20b/8a5f2605e8e10a63494708993cc3a986.mp3'),
    new MyAudio('Yellow', 'Coldplay', 'http://img2.imgtn.bdimg.com/it/u=1985744488,1645890010&fm=21&gp=0.jpg', 'http://219.238.7.67/files/5214000007F2A41D/m8.music.126.net/20160402183952/5931fafd3c2c84a94c6c27cbda1b67a1/ymusic/378e/6ad0/bdf6/a1e43e718fce38b801b6bcc2290870f7.mp3'),
    new MyAudio('往事只能回味','好妹妹乐队','http://img2.imgtn.bdimg.com/it/u=1985744488,1645890010&fm=21&gp=0.jpg','http://m8.music.126.net/20161221175914/fffcc0c57ac06361d852cb6cbf705af3/ymusic/d7a7/7ff1/b401/955b22ca8aaccf79bed7ad623b8f1641.mp3'),
    new MyAudio('女儿情','好妹妹乐队','https://raw.githubusercontent.com/sqaiyan/netmusic-app/master/image/fm/cm2_default_cover_fm-ip6%402x.png','http://m8.music.126.net/20161221203412/f0379566c161501be51861333e52f9a0/ymusic/1c48/62d1/b928/12e5fe0c0f36c4691e812e390a476046.mp3')
  ];


  constructor() {
  }

  getAudios() {
    return this.myAudios;
  }

  getAudio(id: number){
    return this.myAudios[id];
  }

  getAudioLength(){
    return this.myAudios.length;
  }

}

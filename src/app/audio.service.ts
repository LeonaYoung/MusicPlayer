import { Injectable } from '@angular/core';

import { MyAudio } from './my-audio';

@Injectable()
export class AudioService {
  private myAudios: MyAudio[] = [
    new MyAudio('千千厥歌', '陈慧娴', 'http://img3.imgtn.bdimg.com/it/u=4166721891,1503444760&fm=21&gp=0.jpg', 'http://localhost:8080/Downloads/%E5%8D%83%E5%8D%83%E9%98%99%E6%AD%8C.mp3'),
    new MyAudio('我想，我想', '马条', 'http://img4.imgtn.bdimg.com/it/u=3179239109,203604917&fm=21&gp=0.jpg', 'http://localhost:8080/Downloads/woxiangwoxiang.mp3'),
    new MyAudio('爱的魔法', '金莎', 'http://img2.imgtn.bdimg.com/it/u=26697390,4248724664&fm=21&gp=0.jpg', 'http://localhost:8080/Downloads/%E7%88%B1%E7%9A%84%E9%AD%94%E6%B3%95.mp3'),
    new MyAudio('Yellow', 'Coldplay', 'http://img2.imgtn.bdimg.com/it/u=1985744488,1645890010&fm=21&gp=0.jpg', 'http://219.238.7.67/files/5214000007F2A41D/m8.music.126.net/20160402183952/5931fafd3c2c84a94c6c27cbda1b67a1/ymusic/378e/6ad0/bdf6/a1e43e718fce38b801b6bcc2290870f7.mp3')
  ];


  constructor() {
  }

  getAudios() {
    return this.myAudios;
  }

  getAudio(id: number) {
    return this.myAudios[id];
  }

  getAudioLength() {
    return this.myAudios.length;
  }

}

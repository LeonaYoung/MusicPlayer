import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Song } from './audio';
import { AudioList } from './audio.list';
import {Lyrc} from './lyrc';
import { encode } from "punycode";

@Injectable()
export class AudioService {

  private baseUrl = 'http://api.tlbhajxc.com';
  private songUrl = this.baseUrl + '/songs/';
  private playListUrl = (this.baseUrl + '/search/ni');
  private songLyric = this.baseUrl + '/lyrc/';

  constructor(private http: Http) {
  }

  getSongById(songId: number): Observable<Song> {
    return this.http.get(this.songUrl + songId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'getSongById error'));
  }

  getPlayList(): Observable<AudioList> {
    return this.http.post(this.playListUrl, {})
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'getPlayList error'));
  }

  getLyricBySongId(songId: number):Observable<Lyrc> {
    return this.http.get(this.songLyric + songId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'getSongById error'));
  }
}

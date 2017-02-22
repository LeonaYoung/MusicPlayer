class Song1 {
  constructor(public name: string,
              public mp3Url: string,
              public artists: Artist[],
              public album: Album) {
  }
}

class Artist {
  constructor(public name: string) {
  }
}

class Album {
  constructor(public name: string,
              public blurPicUrl: string) {
  }
}

export class Song {
  constructor(public songs: Song1[]) {
  }
}
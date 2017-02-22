class Artists{
  constructor(
    public name: string
  ){}
}

export class Songs {
  constructor(
    public id: number,
    public name: string,
    public artists: Artists[]
  ){}
}

export class Result {
  constructor(
    public songs: Songs[]) {}
}

export class AudioList{
  constructor(
    public result:Result
  ){}
}

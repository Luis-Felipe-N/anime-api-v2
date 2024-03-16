interface MovieProps {
  title: string
  description: string
  banner: string
  cover: string

  duration: number
}

export class Movie {
  public title: string
  public description: string
  public banner: string
  public cover: string

  public duration: number // in seconds

  constructor(props: MovieProps, id?: string) {
    this.title = props.title
    this.description = props.description
    this.banner = props.banner
    this.cover = props.cover

    this.duration = props.duration
  }
}
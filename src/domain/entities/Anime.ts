interface AnimeProps {
  title: string
  description: string
  banner: string
  cover: string
}

export class Anime {
  public title: string
  public description: string
  public banner: string
  public cover: string

  constructor(props: AnimeProps, id?: string) {
    this.title = props.title
    this.description = props.description
    this.banner = props.banner
    this.cover = props.cover
  }
}
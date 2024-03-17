export class Slug {
  public value: string

  private constructor(value: string) {
    this.value = value
  }

  static create(text: string) {
    return new Slug(text)
  }

  /**
   * Transform a text in slug normalize
   *
   * Example: "Hell's Paradise" => "hells-paradise"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize('NFKD')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}

export class Normalize {
  private text: string

  constructor(text: string) {
    this.text = text
  }

  /**
   * Normalize a text by removing symbols and specials characters
   *
   * Example: "Hell's Paradise" => "hells paradise"
   *
   * @param text {string}
   */
  static normalizeText(text: string) {
    return text
      .normalize('NFKD')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, ' ')
      .replace(/--+/g, ' ')
      .replace(/-$/g, '')
  }
}

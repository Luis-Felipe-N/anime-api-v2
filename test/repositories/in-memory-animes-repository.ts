import { Anime } from '@/domain/enterprise/entities/anime'
import { AnimesRepository } from '@/domain/application/repositories/animes.repository'
import { InMemorySeasonsRepository } from './in-memory-seasons-repository'
import { PaginationParams } from '@/core/types/pagination-params'
import { InMemoryGenresRepository } from './in-memory-genres-repository'
import { Normalize } from '@/core/values-objects/normalize'

export class InMemoryAnimesRepository implements AnimesRepository {
  public items: Anime[] = []

  constructor(
    private seasonsRepository: InMemorySeasonsRepository,
    private genresRepository: InMemoryGenresRepository,
  ) {}

  async create(anime: Anime): Promise<void> {
    this.items.push(anime)

    this.seasonsRepository.createMany(anime.seasons.getItems())
    this.genresRepository.createMany(anime.genres.getItems())
  }

  async createFromScrapper(anime: Anime): Promise<void> {
    this.items.push(anime)

    this.seasonsRepository.createMany(anime.seasons.getItems())
    this.genresRepository.createMany(anime.genres.getItems())
  }

  async save(anime: Anime): Promise<void> {
    const animeIndex = this.items.findIndex((item) => item.id === anime.id)

    this.items[animeIndex] = anime

    this.seasonsRepository.createMany(anime.seasons.getItems())
    this.genresRepository.createMany(anime.genres.getItems())
  }

  async delete(anime: Anime): Promise<void> {
    const animeIndex = this.items.findIndex((item) => item.id === anime.id)

    this.items.splice(animeIndex, 1)
  }

  async findBySlug(slug: string): Promise<Anime | null> {
    const anime = this.items.find((item) => item.slug.value === slug)

    if (!anime) {
      return null
    }

    return anime
  }

  async findById(id: string): Promise<Anime | null> {
    const anime = this.items.find((item) => item.id.toString() === id)

    if (!anime) {
      return null
    }

    return anime
  }

  async findManyByGenre(genreSlug: string, params: PaginationParams) {
    const animes = this.items
      .filter((item) =>
        item.genres.getItems().some((genre) => genre.slug.value === genreSlug),
      )
      .slice((params.page - 1) * 20, params.page * 20)

    return animes
  }

  async findManyByKeyword(
    keyword: string,
    params: PaginationParams,
  ): Promise<Anime[]> {
    const animes = this.items
      .filter(
        (item) =>
          Normalize.normalizeText(item.title).includes(keyword) ||
          item.description.toLowerCase().includes(keyword),
      )
      .slice((params.page - 1) * 20, params.page * 20)

    return animes
  }

  async findManyPopular() {
    const animes = this.items.sort(function (o1, o2) {
      return o1.rating - o2.rating
    })

    return animes.slice(0, 5)
  }
}

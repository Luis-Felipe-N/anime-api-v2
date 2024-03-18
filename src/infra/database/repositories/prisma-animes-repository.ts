import { AnimesRepository } from '@/domain/application/repositories/animes.repository'
import { Anime } from '@/domain/enterprise/entities/anime'

export class PrismaAnimesRepository implements AnimesRepository {
  create(anime: Anime): Promise<void> {
    throw new Error('Method not implemented.')
  }

  findBySlug(slug: string): Promise<Anime | null> {
    throw new Error('Method not implemented.')
  }

  findById(id: string): Promise<Anime | null> {
    throw new Error('Method not implemented.')
  }

  delete(anime: Anime): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

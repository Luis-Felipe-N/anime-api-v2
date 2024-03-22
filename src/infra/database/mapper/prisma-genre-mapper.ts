import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Slug } from '@/core/values-objects/slug'
import { Genre } from '@/domain/enterprise/entities/genre'
import { Prisma, Genre as PrismaGenre } from '@prisma/client'

export class PrismaGenreMapper {
  static toDomain(raw: PrismaGenre): Genre {
    return Genre.create(
      {
        animeId: new UniqueEntityId(raw.anime_id),
        title: raw.title,
        slug: Slug.create(raw.slug),
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(raw: Genre): Prisma.GenreUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      title: raw.title,
      slug: raw.slug.value,
    }
  }

  static toPrismaMany(raws: Genre[]): Prisma.GenreUncheckedCreateInput[] {
    return raws.map((raw) => ({
      id: raw.id.toString(),
      title: raw.title,
      slug: raw.slug.value,
    }))
  }

  static toPrismaUpdateMany(genres: Genre[]): Prisma.GenreUpdateManyArgs {
    const genresIds = genres.map((genre) => {
      return genre.id.toString()
    })

    return {
      where: {
        id: {
          in: genresIds,
        },
      },
      data: {
        animeId: genres[0].animeId.toString(),
      },
    }
  }
}

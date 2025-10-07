import { UniqueEntityId } from 'src/core/entities/unique-entity-id'
import { Season, SeasonProps } from 'src/domain/enterprise/entities/season'
import { PrismaSeasonMapper } from 'src/infra/database/mapper/prisma-season-mapper'
import { prisma } from 'src/infra/database/prisma/prisma'
import { faker } from '@faker-js/faker'

export function makeSeason(
  override: Partial<SeasonProps> = {},
  id?: UniqueEntityId,
) {
  const season = Season.create(
    {
      animeId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return season
}

export async function makePrismaSeason(
  data: Partial<SeasonProps> = {},
): Promise<Season> {
  const season = makeSeason(data)

  await prisma.season.create({ data: PrismaSeasonMapper.toPrisma(season) })

  return season
}

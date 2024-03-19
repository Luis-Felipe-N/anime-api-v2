import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Season, SeasonProps } from '@/domain/enterprise/entities/season'
import { faker } from '@faker-js/faker'

export function makeSeason(
  override: Partial<SeasonProps> = {},
  id?: UniqueEntityId,
) {
  const season = Season.create(
    {
      title: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return season
}

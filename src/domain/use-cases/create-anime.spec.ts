import { test, expect } from 'vitest'
import { Anime } from '../entities/Anime'
import { CreateAnimeUseCase } from './create-anime'
import { AnimesRepository } from '../repositories/animes.repository'

const fakeAnimesRepository: AnimesRepository = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: async function (anime: Anime): Promise<void> {},
}

test('create anime', async () => {
  const animeUseCase = new CreateAnimeUseCase(fakeAnimesRepository)

  const { anime } = await animeUseCase.execute({
    banner: '',
    cover: '',
    description: '',
    title: 'Jujutsu',
  })

  expect(anime.title).toEqual('Jujutsu')
})

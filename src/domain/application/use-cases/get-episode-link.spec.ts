import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryEpisodesRepository } from 'test/repositories/in-memory-episodes-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { makeEpisode } from 'test/factories/make-episode'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { GetEpisodeLinkByIdUseCase } from './get-episode-link'

let inMemoryEpisodesRepository: InMemoryEpisodesRepository
let sut: GetEpisodeLinkByIdUseCase

describe('Get Episode Link by Id', () => {
    beforeEach(() => {
        inMemoryEpisodesRepository = new InMemoryEpisodesRepository()
        sut = new GetEpisodeLinkByIdUseCase(inMemoryEpisodesRepository)
    })

    it('should be able to get episode link by id', async () => {
        const newEpisode = makeEpisode({}, new UniqueEntityId('id-do-episodio'))

        await inMemoryEpisodesRepository.create(newEpisode)

        const result = await sut.execute({
            id: 'id-do-episodio',
        })

        expect(result.isSuccess()).toBe(true)
    })

    it('should not be able to get episode link with non-exists id', async () => {
        const result = await sut.execute({
            id: 'non-exists-id',
        })

        expect(result.isFailure()).toBe(true)
        expect(result.value).toBeInstanceOf(ResourceNotFoundError)
    })
})

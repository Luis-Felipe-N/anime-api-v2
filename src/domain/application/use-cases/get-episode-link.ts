import { Episode } from 'src/domain/enterprise/entities/episode'
import { EpisodesRepository } from '../repositories/episode.repository'
import { Either, failure, success } from 'src/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { extractor } from 'src/core/uteis/extractor'

interface GetEpisodeLinkByIdUseCaseRequest {
    id: string
}

type GetEpisodeLinkByIdUseCaseResponse = Either<
    ResourceNotFoundError,
    {
        episode: Episode
    }
>

export class GetEpisodeLinkByIdUseCase {
    constructor(private episodesRepository: EpisodesRepository) { }

    async execute({
        id,
    }: GetEpisodeLinkByIdUseCaseRequest): Promise<GetEpisodeLinkByIdUseCaseResponse> {
        const episode = await this.episodesRepository.findById(id)

        if (!episode) {
            return failure(new ResourceNotFoundError())
        }

        console.log(episode)
        await extractor(episode.video)

        return success({ episode })
    }
}

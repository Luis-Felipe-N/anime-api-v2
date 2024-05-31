import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { PaginationParams } from "@/core/types/pagination-params"
import { WatchedEpisodesRepository } from "@/domain/application/repositories/watched-episodes"
import { WatchedEpisode } from "@/domain/enterprise/entities/watched-episode"

export class InMemoryWatchedEpisodesRepository implements WatchedEpisodesRepository {
    public items: WatchedEpisode[] = []

    async create(watchedepisode: WatchedEpisode) {
        this.items.push(watchedepisode)

        return watchedepisode
    }


    async save(watchedepisode: WatchedEpisode) {
        const watchedepisodeIndex = this.items.findIndex((item) => item.id === watchedepisode.id)

        this.items[watchedepisodeIndex] = watchedepisode

        return watchedepisode
    }

    async findByEpisodeAndUser(authorId: string, episodeId: string) {
        const watchedepisodeMemory = this.items.find((watchedepisode) => authorId === watchedepisode.authorId.toString() && episodeId === watchedepisode.episodeId.toString())

        if (!watchedepisodeMemory) {
            return null
        }

        return watchedepisodeMemory
    }

    async findManyByUserId(authorId: string, params: PaginationParams) {
        const watchedepisodeMemory = this.items
            .filter((watchedepisode) => authorId === watchedepisode.authorId.toString())
            .slice((params.page - 1) * 20, params.page * 20)

        return watchedepisodeMemory
    }
}

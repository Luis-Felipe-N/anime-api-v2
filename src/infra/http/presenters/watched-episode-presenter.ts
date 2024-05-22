import { WatchedEpisode } from "@/domain/enterprise/entities/watched-episode";

export class WatchedEpisodePresenter {
    static toHTTP(watched: WatchedEpisode) {
        return {
            id: watched.id.toString(),
            userId: watched.userId.toString(),
            episodeId: watched.episodeId.toString(),
            stopAt: watched.stopAt,
            createdAt: watched.createdAt,
            updatedAt: watched.updatedAt,
        }
    }
}

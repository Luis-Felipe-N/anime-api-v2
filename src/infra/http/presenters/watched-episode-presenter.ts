
import { UserPresenter } from "./user-presenters";
import { EpisodePresenter } from "./episode-presenters";
import { WatchedEpisode } from "@/domain/enterprise/entities/watched-episode";

export class WatchedEpisodePresenter {
    static toHTTP(watched: WatchedEpisode) {

        return {
            id: watched.id.toString(),
            authorId: watched.authorId.toString(),
            episodeId: watched.episodeId.toString(),
            stopAt: watched.stopAt,
            createdAt: watched.createdAt,
            updatedAt: watched.updatedAt,
            author: watched.author && UserPresenter.toHTTP(watched.author),
            episode: watched.episode && EpisodePresenter.toHTTP(watched.episode),
        }
    }
}

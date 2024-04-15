import { WatchlistAnimesRepository } from "@/domain/application/repositories/question-animes.repository"
import { WatchlistAnime } from "@/domain/enterprise/entities/watchlist-anime"
import { prisma } from "../prisma/prisma"

export class PrismaWatchlistAnimesRepository
    implements WatchlistAnimesRepository {

    async createMany(attachments: WatchlistAnime[]): Promise<void> {
        if (attachments.length === 0) {
            return
        }

        const data = PrismaQuestionAttachmentMapper.toPrismaUpdateMany(attachments)

        await prisma.watchlistOnAnimes.updateMany(data)
    }

    async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
        if (attachments.length === 0) {
            return
        }

        const attachmentIds = attachments.map((attachment) => {
            return attachment.id.toString()
        })

        await this.prisma.attachment.deleteMany({
            where: {
                id: {
                    in: attachmentIds,
                },
            },
        })
    }

    async deleteManyByQuestionId(questionId: string): Promise<void> {
        await this.prisma.attachment.deleteMany({
            where: {
                questionId,
            },
        })
    }
}
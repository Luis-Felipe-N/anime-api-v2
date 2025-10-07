import axios from 'axios'
import * as cheerio from 'cheerio'
import { fetchOrCache } from '../uteis/fetch-or-cache'
import { Either, failure, success } from '../either'
import { ResourceNotFoundError } from 'src/domain/application/use-cases/errors/resource-not-found-error'
import { Slug } from '../values-objects/slug'
import { EpisodeTypes } from '../enums/episode-types.enum'
import { title } from 'process'

const BASE_URL = 'https://animesonlinecc.to/'

interface IMoreInfos {
  status?: string
  trailerId?: string
  cover?: string
  post?: string
}

export interface AnimeProps {
  title: string
  slug: string
  nsfw: boolean
  rating: number
  cover: string | null
  banner: string | null
  description: string | null
  trailerYtId: string | null
}

export interface EpisodeProps {
  slug: Slug
  title: string
  index: number
  cover: string
  video: string
  createdAt: Date
  duration: number
  type: EpisodeTypes
  linkEmbed: string | null
  description: string | null
}

export interface SeasonProps {
  title: string
  episodes: EpisodeProps[]
}

export interface GenreProps {
  title: string
}

export default class AnimeBrBiz {
  async getAnimesByGenre(genre: string, numberPage = 1) {
    const animes: AnimeProps[] = []
    const baseURLGenre = `${BASE_URL}/genero/${genre}`

    const url = baseURLGenre + `/page/` + numberPage

    const data = await fetchOrCache(url)

    if (!data) {
      return failure(new ResourceNotFoundError())
    }

    const $ = cheerio.load(data)

    const pages = $('.items article').toArray()

    for (const page of pages) {
      const slug = $(page)
        .find('.data a')
        .attr('href')
        ?.replace('https://animesonlinecc.to/anime/', '')
        .replace('/', '')

      if (slug) {
        const response = await this.getAnimeBySlug(slug)

        if (response.isSuccess()) {

          animes.push(response.value.anime)
        }

      }
    }

    return success({ animes })
  }

  async getSlugsFromPage(
    genre: string,
    page: number,
  ): Promise<Either<ResourceNotFoundError, { slugs: string[] }>> {
    const slugs: string[] = []

    for (let i = page; i < 80; i++) {
      console.log("CURRENT PAGE: ", page)
      const baseURLGenre = `${BASE_URL}/genero/${genre}`

      const url = baseURLGenre + `/page/` + i

      const data = await fetchOrCache(url)

      if (!data) {
        break
        return failure(new ResourceNotFoundError())
      }

      const $ = cheerio.load(data)

      const pages = $('.items article').toArray()

      for (const page of pages) {
        const slug: string | undefined = $(page)
          .find('.data a')
          .attr('href')
          ?.replace('https://animesonlinecc.to/anime/', '')
          .replace('/', '')

        if (slug) {
          console.log(slug)
          slugs.push(slug)
        }
      }
    }

    console.log(slugs)

    return success({ slugs })
  }

  async getAnimeBySlug(
    slug: string,
  ): Promise<
    Either<
      ResourceNotFoundError,
      { anime: AnimeProps; seasons: SeasonProps[]; genres: GenreProps[] }
    >
  > {
    const animePage = await this.getPageAnimeBySlug(slug)

    if (!animePage) {
      return failure(new ResourceNotFoundError())
    }

    const $ = cheerio.load(animePage)

    const post = $('img').attr('src')
    const rating = Number($('.dt_rating_vgs').text())
    const title = $('.breadcrumb_last').text()
    console.log("TITLE: ", title)
    const description = this._getDescription($('.wp-content').text())
    const genres = $('.content .sgeneros a')
      .toArray()
      .map((elem) => {
        const title = $(elem).text()

        return {
          title,
        }
      })

    // if (
    //   genres.includes({ title: 'sem-censura' }) ||
    //   genres.includes({ title: '18' })
    // ) {
    //   return failure(new ResourceNotFoundError())
    // }

    if (!animePage) {
      return failure(new ResourceNotFoundError())
    }

    const override = await this.getMoreInfoFromKitsu(slug)

    const result = await this.getSeasonsByAnimeSlug(slug)

    if (result.isFailure()) {
      return failure(new ResourceNotFoundError())
    }

    const anime: AnimeProps = {
      title,
      slug,
      post,
      nsfw: false,
      rating,
      banner: null,
      trailerYtId: null,
      cover: post ?? null,
      description: description || null,
      ...override,
    }

    return success({
      anime,
      seasons: result.value.seasons,
      genres: genres.slice(0, 2),
    })
  }

  async getPageAnimeBySlug(slug: string) {
    const url = `${BASE_URL}/anime/${slug}`
    const data = await fetchOrCache(url, true)
    return data
  }

  async getSeasonsByAnimeSlug(
    animeSlug: string,
  ): Promise<Either<ResourceNotFoundError, { seasons: SeasonProps[] }>> {
    const seasons: SeasonProps[] = []

    const animePage = await this.getPageAnimeBySlug(animeSlug)

    if (!animePage) {
      return failure(new ResourceNotFoundError())
    }

    const $ = cheerio.load(animePage)

    const seasonsElements = $('.content .tempep #seasons .se-c').toArray()

    for (const seasonElement of seasonsElements) {
      const seasonTitle = $(seasonElement).find('.se-q .title').text()
      const episodes: EpisodeProps[] = []
      let episodeIndex = 0

      const listLinksEpisodesElement = $(seasonElement)
        .find('.se-a .episodios li')
        .toArray()

      for (const linkElem of listLinksEpisodesElement) {
        episodeIndex = episodeIndex + 1
        const linkEpisode = $(linkElem).find('.episodiotitle a').attr('href')
        const createdAt =
          new Date($(linkElem).find('.date').text()) || new Date()
        const titleEpisode = $(linkElem).find('.episodiotitle a').text()
        const episodeCover = $(linkElem).find('.imagen img').attr('src')
        const episodeSlug = Slug.createFromText(
          `${animeSlug}-${seasonTitle}-${titleEpisode}`,
        )
        console.log({ episodeSlug })
        const links = await this.getLinkEmbed(linkEpisode!)

        const duration = links?.linkPlayer
          ? Number(new URL(links?.linkPlayer).searchParams.get('dur'))
          : 0

        if (
          !episodes.find((episode) => episode.slug.value === episodeSlug.value)
        ) {
          episodes.push({
            title: titleEpisode,
            slug: episodeSlug,
            index: episodeIndex,
            duration,
            createdAt,
            type: 'ANIMESONLINE',
            description: '',
            cover: episodeCover || '',
            linkEmbed: links?.linkEmbed || null,
            video: links?.linkEmbed || '',
          })
        }
      }

      if (!seasons.find((season) => season.title === seasonTitle)) {
        seasons.push({
          title: seasonTitle,
          episodes,
        })
      }
    }

    return success({ seasons })
  }

  async getMoreInfoFromKitsu(slug: string): Promise<IMoreInfos | undefined> {
    const { data } = await axios.get(
      `https://kitsu.io/api/edge/anime?filter[slug]=${slug}&page[limit]=1`,
    )

    const dataAnime = data.data[0]?.attributes
    console.log(dataAnime)
    if (!dataAnime) {
      return
    }
    console.log(dataAnime.titles.en)
    const moreInfoAnime: Partial<AnimeProps & IMoreInfos> = {
      nsfw: dataAnime.nsfw,
      status: dataAnime.status,
      trailerYtId: dataAnime?.youtubeVideoId,
      banner: dataAnime.coverImage?.original,
      cover: dataAnime.posterImage?.original,
    }

    if (dataAnime.titles.en) {
      moreInfoAnime.title = dataAnime.titles.en
    }

    return moreInfoAnime
  }

  async getLinkEmbed(url: string) {
    const data = await fetchOrCache(url)

    if (!data) {
      return
    }

    const { linkEmbed, linkPlayer } = await this.animeBizExtractor(data)

    return { linkEmbed, linkPlayer }
  }

  async animeBizExtractor(data: string) {
    const $ = cheerio.load(data)
    const linkEmbed = $('#option-1 > iframe').attr('src')
    let linkPlayer

    if (linkEmbed) {
      const dataIframe = await fetchOrCache(linkEmbed)

      if (dataIframe) {
        const $$ = cheerio.load(dataIframe)

        const videoConfig = $$('head > script:nth-child(2)').text()

        linkPlayer = this.extractorUrlFromString(videoConfig)
      }
    }

    return { linkEmbed, linkPlayer }
  }

  extractorUrlFromString(str: string) {
    const indexStartStream = str.replace('var VIDEO_CONFIG = ', '')

    try {
      const obj = JSON.parse(indexStartStream)
      const streamsLength = obj.streams.length
      const url = obj.streams[streamsLength - 1].play_url

      return url
    } catch (error) {
      return null
    }
  }

  _getDescription(text: string) {
    if (text.split('Online. ')[1]) {
      return text.split('Online. ')[1].split('Todos epis')[0]
    }
    return text
  }
}

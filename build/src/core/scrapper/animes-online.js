"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const fetch_or_cache_1 = require("../uteis/fetch-or-cache");
const either_1 = require("../either");
const resource_not_found_error_1 = require("@/domain/application/use-cases/errors/resource-not-found-error");
const slug_1 = require("../values-objects/slug");
const GENRE_LIST = ['acao', 'artes-marciais', 'aventura', 'comedia', 'shounen'];
const BASE_URL = 'https://animesonlinecc.to/';
class AnimeBrBiz {
    async getAnimesByGenre(genre, numberPage = 1) {
        const animes = [];
        const baseURLGenre = `${BASE_URL}/genero/${genre}`;
        const url = baseURLGenre + `/page/` + numberPage;
        const data = await (0, fetch_or_cache_1.fetchOrCache)(url);
        if (!data) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const $ = cheerio.load(data);
        const pages = $('.items article').toArray();
        for (const page of pages) {
            const slug = $(page)
                .find('.data a')
                .attr('href')
                ?.replace('https://animesonlinecc.to/anime/', '')
                .replace('/', '');
            if (slug) {
                const anime = await this.getAnimeBySlug(slug);
                animes.push(anime);
            }
        }
        return (0, either_1.success)({ animes });
    }
    async getSlugsFromPage(genre, page) {
        const slugs = [];
        const baseURLGenre = `${BASE_URL}/genero/${genre}`;
        const url = baseURLGenre + `/page/` + page;
        const data = await (0, fetch_or_cache_1.fetchOrCache)(url);
        if (!data) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const $ = cheerio.load(data);
        const pages = $('.items article').toArray();
        for (const page of pages) {
            const slug = $(page)
                .find('.data a')
                .attr('href')
                ?.replace('https://animesonlinecc.to/anime/', '')
                .replace('/', '');
            if (slug) {
                slugs.push(slug);
            }
        }
        return (0, either_1.success)({ slugs });
    }
    async getAnimeBySlug(slug) {
        const animePage = await this.getPageAnimeBySlug(slug);
        if (!animePage) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const $ = cheerio.load(animePage);
        const post = $('img').attr('src');
        const rating = Number($('.dt_rating_vgs').text());
        const title = $('.breadcrumb_last').text();
        const description = this._getDescription($('.wp-content').text());
        const genres = $('.content .sgeneros a')
            .toArray()
            .map((elem) => {
            const title = $(elem).text();
            return {
                title,
            };
        });
        if (genres.includes({ title: 'sem-censura' }) || genres.includes({ title: '18' })) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        if (!animePage) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const override = await this.getMoreInfoFromKitsu(slug);
        const result = await this.getSeasonsByAnimeSlug(slug);
        if (result.isFailure()) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const anime = {
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
        };
        return (0, either_1.success)({
            anime,
            seasons: result.value.seasons,
            genres: genres.slice(0, 2),
        });
    }
    async getPageAnimeBySlug(slug) {
        const url = `${BASE_URL}/anime/${slug}`;
        const data = await (0, fetch_or_cache_1.fetchOrCache)(url, true);
        return data;
    }
    async getSeasonsByAnimeSlug(animeSlug) {
        const seasons = [];
        const animePage = await this.getPageAnimeBySlug(animeSlug);
        if (!animePage) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError());
        }
        const $ = cheerio.load(animePage);
        const seasonsElements = $('.content .tempep #seasons .se-c').toArray();
        for (const seasonElement of seasonsElements) {
            const seasonTitle = $(seasonElement).find('.se-q .title').text();
            const episodes = [];
            let episodeIndex = 0;
            const slug = slug_1.Slug.createFromText(`${animeSlug}-${seasonTitle}`).value;
            const listLinksEpisodesElement = $(seasonElement)
                .find('.se-a .episodios li')
                .toArray();
            for (const linkElem of listLinksEpisodesElement) {
                episodeIndex = episodeIndex + 1;
                const linkEpisode = $(linkElem).find('.episodiotitle a').attr('href');
                const createdAt = new Date($(linkElem).find('.date').text()) || new Date();
                const titleEpisode = $(linkElem).find('.episodiotitle a').text();
                const episodeCover = $(linkElem).find('.imagen img').attr('src');
                const episodeSlug = slug_1.Slug.createFromText(`${animeSlug}-${seasonTitle}-${titleEpisode}`);
                console.log({ episodeSlug });
                const links = await this.getLinkEmbed(linkEpisode);
                const duration = links?.linkPlayer
                    ? Number(new URL(links?.linkPlayer).searchParams.get('dur'))
                    : 0;
                if (!episodes.find((episode) => episode.slug.value == episodeSlug.value)) {
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
                    });
                }
            }
            if (!seasons.find((season) => season.title === seasonTitle)) {
                seasons.push({
                    title: seasonTitle,
                    episodes,
                });
            }
        }
        return (0, either_1.success)({ seasons });
    }
    async getMoreInfoFromKitsu(slug) {
        const { data } = await axios_1.default.get(`https://kitsu.io/api/edge/anime?filter[slug]=${slug}&page[limit]=1`);
        const dataAnime = data.data[0]?.attributes;
        if (!dataAnime) {
            return;
        }
        const moreInfoAnime = {
            nsfw: dataAnime.nsfw,
            status: dataAnime.status,
            trailerYtId: dataAnime?.youtubeVideoId,
            banner: dataAnime.coverImage?.original,
            cover: dataAnime.posterImage?.original,
        };
        return moreInfoAnime;
    }
    async getLinkEmbed(url) {
        const data = await (0, fetch_or_cache_1.fetchOrCache)(url);
        if (!data) {
            return;
        }
        const { linkEmbed, linkPlayer } = await this.animeBizExtractor(data);
        return { linkEmbed, linkPlayer };
    }
    async animeBizExtractor(data) {
        const $ = cheerio.load(data);
        const linkEmbed = $('#option-1 > iframe').attr('src');
        let linkPlayer;
        if (linkEmbed) {
            const dataIframe = await (0, fetch_or_cache_1.fetchOrCache)(linkEmbed);
            if (dataIframe) {
                const $$ = cheerio.load(dataIframe);
                const videoConfig = $$('head > script:nth-child(2)').text();
                linkPlayer = this.extractorUrlFromString(videoConfig);
            }
        }
        return { linkEmbed, linkPlayer };
    }
    extractorUrlFromString(str) {
        const indexStartStream = str.replace('var VIDEO_CONFIG = ', '');
        try {
            const obj = JSON.parse(indexStartStream);
            const streamsLength = obj.streams.length;
            const url = obj.streams[streamsLength - 1].play_url;
            return url;
        }
        catch (error) {
            return null;
        }
    }
    _getDescription(text) {
        if (text.split('Online. ')[1]) {
            return text.split('Online. ')[1].split('Todos epis')[0];
        }
        return text;
    }
}
exports.default = AnimeBrBiz;

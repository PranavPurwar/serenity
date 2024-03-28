import { Anime, Episode, Home, Info, LatestEpisodes, Servers, Spotlight, Stream, Top10Animes, TopAiring, TopUpcoming, Trending, } from './types';

var home: Home

var spotlight: Spotlight[]
var topAiring: TopAiring[]
var popular: Anime[]
var trending: Trending[]
var latestEpisodes: LatestEpisodes[]
var topUpcoming: TopUpcoming[]
var genres: string[]
var top10: Top10Animes[]

var mostFavorite: Anime[]
var recentlyAdded: Anime[]
var recentlyUpdated: Anime[]


const domain = 'https://hianime-api.vercel.app/anime/'


const tmdb = domain + '/meta/tmdb/'

async function updateData() {
    await $fetch(domain + 'home').then((data) => {
        home = data;
        topUpcoming = home.topUpcomingAnimes
        spotlight = home.spotlightAnimes
        trending = home.trendingAnimes
        latestEpisodes = home.latestEpisodeAnimes
        top10 = home.top10Animes
        genres = home.genres
    });

    await $fetch(domain + 'top-airing').then((data) => {
        topAiring = data.animes;
    });

    await $fetch(domain + 'most-popular').then((data) => {
        popular = data.animes;
    });

    await $fetch(domain + 'recently-added').then((data) => {
        recentlyAdded = data.animes;
    });

    await $fetch(domain + 'recently-updated').then((data) => {
        recentlyUpdated = data.animes;
    });

    await $fetch(domain + 'most-favorite').then((data) => {
        mostFavorite = data.animes;
    });
}

async function getAnimeDetails(id: string): Promise<Info> {
    return await $fetch(domain + 'info?id=' + id);
}

async function getEpisodes(id: string): Promise<Episode[]> {
    return (await $fetch(domain + 'episodes/' + id)).episodes;
}

async function getServers(episodeId: string): Promise<Servers> {
    return await $fetch(domain + 'servers?episodeId=' + episodeId);
}

async function getStream(episodeId: string, type: string = 'sub', server: string = 'vidstreaming'): Promise<Stream> {
    return await $fetch(domain + 'episode-srcs?id=' + episodeId + '&server=' + server + '&category=' + type);
}

async function searchAnime(query: string) {
    return (await $fetch(domain + 'search?q=' + encodeURIComponent(query))).animes;
}

async function searchSuggestions(query: string) {
    return (await $fetch(domain + 'suggest?q=' + encodeURIComponent(query))).suggestions;
}

async function getTmdbDetails(id: string) {
    return await $fetch(tmdb + 'info/' + id + '?type=tv');
}

async function getAnimeByGenre(genre: string) {
    return await $fetch(domain + 'genre/' + genre);
}

await updateData();

export {
    domain,
    home,
    spotlight,
    topAiring,
    popular,
    trending,
    latestEpisodes,
    topUpcoming,
    genres,
    top10,
    mostFavorite,
    recentlyAdded,
    recentlyUpdated,
    getAnimeDetails,
    getServers,
    getStream,
    searchAnime,
    getTmdbDetails,
    getEpisodes
};

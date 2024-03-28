import { Anime, Episode, Home, Info, LatestEpisodes, Spotlight, Top10Animes, TopAiring, TopUpcoming, Trending, } from './types';

var home: Home

var spotlight: Spotlight[]
var topAiring: TopAiring[]
var popular: Anime[]
var trending: Trending[]
var latestEpisodes: LatestEpisodes[]
var topUpcoming: TopUpcoming[]
var genres: string[]
var top10: Top10Animes[]

const domain = 'https://hianime-api.vercel.app/anime/'


const tmdb = domain + '/meta/tmdb/'

async function updateData() {
    await $fetch(domain + 'home').then((data) => {
        home = data;
        topAiring = home.topAiringAnimes
        topUpcoming = home.topUpcomingAnimes
        spotlight = home.spotlightAnimes
        popular = home.trendingAnimes
        latestEpisodes = home.latestEpisodeAnimes
        top10 = home.top10Animes
        genres = home.genres
    });

    await $fetch(domain + 'most-popular').then((data) => {
        popular = data.animes;
    });
}

async function getAnimeDetails(id: string): Promise<Info> {
    return await $fetch(domain + 'info?id=' + id);
}

async function getEpisodes(id: string): Promise<Episode[]> {
    return (await $fetch(domain + 'episodes/' + id)).episodes;
}

async function watchEpisode(id: string) {
    return await $fetch(domain + 'episode-srcs?id=' + id);
}

async function searchAnime(query: string) {
    return (await $fetch(domain + 'search?q=' + encodeURIComponent(query))).animes;
}

async function searchSuggestions(query: string) {
    return (await $fetch(domain + 'search/suggest?q=' + encodeURIComponent(query))).suggestions;
}

async function getTmdbDetails(id: string) {
    return await $fetch(tmdb + 'info/' + id + '?type=tv');
}

async function getAnimeByGenre(genre: string) {
    return await $fetch(domain + 'genre/' + genre);
}

await updateData();

export { domain, home, spotlight, topAiring, popular, latestEpisodes, topUpcoming, genres, top10, getAnimeDetails, watchEpisode, searchAnime, getTmdbDetails, getEpisodes };

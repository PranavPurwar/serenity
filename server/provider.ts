var topAiring: IAnimeResult[]
var popular: IAnimeResult[]
var mostFavorited: IAnimeResult[]
var latestCompleted: IAnimeResult[]
var recentlyUpdated: IAnimeResult[]
var topUpcoming: IAnimeResult[]
var recentlyAdded: IAnimeResult[]

const domain = 'https://api-serenity.vercel.app'

const provider = '/anime/zoro/'

const tmdb = domain + '/meta/tmdb/'

const base = domain + provider

async function updateData() {
    await $fetch(base + 'top-airing').then((data) => {
        topAiring = data.results;
    });

    await $fetch(base + 'most-popular').then((data) => {
        popular = data.results;
    });

    await $fetch(base + 'most-favorite').then((data) => {
        mostFavorited = data.results;
    });

    await $fetch(base + 'latest-completed').then((data) => {
        latestCompleted = data.results;
    });

    await $fetch(base + 'recent-episodes').then((data) => {
        recentlyUpdated = data.results;
    });

    await $fetch(base + 'recent-added').then((data) => {
        recentlyAdded = data.results;
    });

    await $fetch(base + 'top-upcoming').then((data) => {
        topUpcoming = data.results;
    });
}

async function getAnimeDetails(id: string) {
    return await $fetch(base + 'info?id=' + id);
}

async function watchEpisode(id: string) {
    return await $fetch(base + 'watch?episodeId=' + id);
}

async function searchAnime(query: string) {
    return (await $fetch(tmdb + encodeURIComponent(query))).results;
}

async function getTmdbDetails(id: string) {
    return await $fetch(tmdb + 'info/' + id + '?type=tv');
}


await updateData();

export { base, topAiring, popular, mostFavorited, latestCompleted, recentlyUpdated, recentlyAdded, topUpcoming, getAnimeDetails, watchEpisode, searchAnime, getTmdbDetails };

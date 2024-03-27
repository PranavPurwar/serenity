import { ANIME } from "@pranavpurwar/consumet";
import { IAnimeResult } from "@pranavpurwar/consumet";

const provider = new ANIME.Zoro();

var topAiring: IAnimeResult[]
var popular: IAnimeResult[]
var topUpcoming: IAnimeResult[]
var recentlyAdded: IAnimeResult[]
var recentlyUpdated: IAnimeResult[]

async function updateData() {
    await provider.fetchTopAiring().then((data) => {
        topAiring = data.results;
    });

    await provider.fetchMostPopular().then((data) => {
        popular = data.results;
    });

    await provider.fetchTopUpcoming().then((data) => {
        topUpcoming = data.results;
    });

    await provider.fetchRecentlyAdded().then((data) => {
        recentlyAdded = data.results;
    });

    await provider.fetchRecentlyUpdated().then((data) => {
        recentlyUpdated = data.results;
    });
}

updateData().then(() => {
    console.log("Data updated");
});

export { provider, topAiring, popular, topUpcoming, recentlyAdded, recentlyUpdated };

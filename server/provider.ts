import NodeCache from "node-cache";
import {
  Anime,
  Episode,
  Home,
  Info,
  LatestEpisodes,
  Result,
  Servers,
  Spotlight,
  Stream,
  TmdbSearch,
  Top10Animes,
  TopAiring,
  TopUpcoming,
  Trending,
} from "./types";

const domain = "https://hianime.vercel.app/anime/";

const serenity = "https://api-serenity.vercel.app";

const cache = new NodeCache({ stdTTL: 86400 }); // 24 hours in seconds

var home: Home = await fetchWithCache(domain + "home");

var spotlight: Spotlight[] = home.spotlightAnimes;
var topAiring: TopAiring[] = (await fetchWithCache(domain + "top-airing")).animes;
var popular: Anime[] = (await fetchWithCache(domain + "most-popular")).animes;
var trending: Trending[] = home.trendingAnimes;
var latestEpisodes: LatestEpisodes[] = home.latestEpisodeAnimes;
var topUpcoming: TopUpcoming[] = home.topUpcomingAnimes;
var genres: string[] = home.genres;
var top10: Top10Animes[] = home.top10Animes;

var mostFavorite: Anime[] = (await fetchWithCache(domain + "most-favorite")).animes;
var recentlyAdded: Anime[] = (await fetchWithCache(domain + "recently-added")).animes;
var recentlyUpdated: Anime[] = (await fetchWithCache(domain + "recently-updated")).animes;

const tmdb = serenity + "/meta/tmdb/";

async function fetchWithCache(url: string) {
  const cachedData = cache.get(url);
  if (cachedData) {
    return cachedData; // Return cached data
  }
  const data = await $fetch(url);
  cache.set(url, data); // Cache the new data
  return data;
}
function substringBefore(str: string, delimiter: string) {
  const delimiterIndex = str.indexOf(delimiter);

  if (delimiterIndex === -1) return str;

  return str.substring(0, delimiterIndex);
}

async function getAnimeDetails(id: string): Promise<Info> {
  const url = domain + "info?id=" + id;
  return await fetchWithCache(url); // Use caching for anime details
}

async function getEpisodes(id: string): Promise<Episode[]> {
  return (await $fetch(domain + "episodes/" + id)).episodes;
}

async function getServers(episodeId: string): Promise<Servers> {
  return await $fetch(domain + "servers?episodeId=" + episodeId);
}

async function getStream(episodeId: string, type: string = "sub", server: string = "vidstreaming"): Promise<Stream> {
  return await $fetch(domain + "episode-srcs?id=" + episodeId + "&category=" + type);
}

async function searchAnime(query: string) {
  return (await $fetch(domain + "search?q=" + encodeURIComponent(query))).animes;
}

async function getTmdbFromInfo(info: Info): Promise<Result | null> {
  const search: TmdbSearch = await $fetch(tmdb + encodeURIComponent(info.anime.info.name));

  if (search.results.length === 0) return null;

  const type = info.anime.info.stats.type === "TV" ? "TV Series" : "Movie";
  console.log(type);
  const year = substringBefore(info.anime.moreInfo.aired, " to ").substring(
    info.anime.moreInfo.aired.indexOf(", ") + 2,
    info.anime.moreInfo.aired.length - 1,
  );
  console.log(year);

  for (const result of search.results) {
    if (result.type === type && result.releaseDate === year) return result;
  }

  return null;
}

async function searchSuggestions(query: string) {
  return (await $fetch(domain + "suggest?q=" + encodeURIComponent(query))).suggestions;
}

async function getTmdbDetails(id: string, type: string = 'tv') {
  return await $fetch(tmdb + "info/" + id + "?type=" + type);
}

async function getAnimeByGenre(genre: string) {
  return (await $fetch(domain + "genre/" + genre.toLocaleLowerCase().replace(" ", "-"))).animes;
}

export {
  domain,
  genres,
  getAnimeByGenre,
  getAnimeDetails,
  getEpisodes,
  getServers,
  getStream,
  getTmdbDetails,
  getTmdbFromInfo,
  home,
  latestEpisodes,
  mostFavorite,
  popular,
  recentlyAdded,
  recentlyUpdated,
  searchAnime,
  searchSuggestions,
  spotlight,
  top10,
  topAiring,
  topUpcoming,
  trending,
};

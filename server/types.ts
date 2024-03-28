export interface Home {
    spotlightAnimes: Spotlight[]
    trendingAnimes: Trending[]
    latestEpisodeAnimes: LatestEpisodes[]
    topUpcomingAnimes: TopUpcoming[]
    top10Animes: Top10Animes
    topAiringAnimes: TopAiring[]
    genres: string[]
  }
  
  export interface Spotlight {
    rank: number
    id: string
    name: string
    description: string
    poster: string
    jname: string
    episodes: Episodes
    otherInfo: string[]
  }
  
  export interface Episodes {
    sub: number
    dub?: number
  }
  
  export interface Trending {
    rank: number
    name: string
    id: string
    poster: string
  }
  
  export interface LatestEpisodes {
    id: string
    name: string
    poster: string
    duration: string
    type: string
    rating?: string
    episodes: Episodes
  }

    export interface Anime {
        id: string,
        name: string,
        poster: string,
        duration: string,
        type: string,
        rating: string,
        episodes: {
            sub: number,
            dub: number,
       }
    }

  export interface TopUpcoming {
    id: string
    name: string
    poster: string
    duration: string
    type: string
    rating?: string
    episodes: Episodes
  }
  
  export interface Top10Animes {
    today: Timeline[]
    week: Timeline[]
    month: Timeline[]
  }
  
  export interface Timeline {
    id: string
    rank: number
    name: string
    poster: string
    episodes: Episodes
  }
  
  export interface TopAiring {
    id: string
    name: string
    jname: string
    poster: string
    otherInfo: string[]
  }
  
    
export interface Anime {
    info: Info
    moreInfo: MoreInfo
  }
  
  export interface Info {
    id: string
    name: string
    poster: string
    description: string
    stats: Stats
  }
  
  export interface Stats {
    rating: string
    quality: string
    episodes: Episodes
    type: string
    duration: string
  }
  
  export interface MoreInfo {
    japanese: string
    synonyms: string
    aired: string
    premiered: string
    duration: string
    status: string
    malscore: string
    genres: string[]
    studios: string
    producers: string[]
  }

  export interface Info {
        anime: Anime
        seasons: any[]
        mostPopularAnimes: any[]
        relatedAnimes: any[]
        recommendedAnimes: any[]
  }
  
  export interface Episode {
    title: string
    episodeId: string
    number: number
    isFiller: boolean
  }
  
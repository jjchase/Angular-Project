import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  // data: any = [
  //   { temp: 90, weather: "sunny", date: "20-05-20" },
  //   { temp: 80, weather: "cloudy", date: "20-05-21" },
  //   { temp: 70, weather: "rainy", date: "20-05-22" },
  //   { temp: 75, weather: "clear", date: "20-05-23" },
  //   { temp: 22, weather: "snow", date: "20-05-24" },
  // ]

  apiKey: string = '9de00a3aded0074e4a583ad4a86ef37b';
  baseUrl: string = 'https://api.themoviedb.org/3';
  genreEndpoint: string = `${this.baseUrl}/genre/movie/list`;
  discoverEndpoint: string = `${this.baseUrl}/discover/movie`;
  popularEndpoint: string = `${this.baseUrl}/movie/popular`;
  voteCount: string | string[];
  year: any;

  discoverParams: any = {
    api_key: this.apiKey,
    vote_average: this.voteCount,
    year: this.year,
  };

  watchlist: any = [];

  constructor(private http: HttpClient) { }
  //FILTER ADULT??
  //add in methods here

  getGenreData() {
    // return this.data;\
    return this.http.get(this.genreEndpoint, {
      params: {
        //params must match how it is written in the API. Refer to how the API calls each parameter (such as api_key)
        api_key: this.apiKey,
      },
    });
  }
  //add in all of the parameters for the different things here
  //refer to the example with Kyle where we used an api and put in city and units
  //we need to replace title with a different filter
  //getMovieData will get this info from the form
  //on ngsubmit ( so first connect this to the search-criteria component then the html )
  //for the picture find where it is coming from on PostMan first
  getDiscoverData(year: string, vote: string, genre: string) {
    console.log(year, vote, genre);
    return this.http.get(this.discoverEndpoint, {
      params: {
        api_key: this.apiKey,
        vote_average: vote,
        year: year,
        with_genres: genre,
      },
    });
  }

  getPopularMovies() {
    return this.http.get(this.popularEndpoint, {
      params: {
        api_key: this.apiKey,
      },
    });
  }

  addToWatchlist(movie: any) {
    this.watchlist.push(movie);
    console.log(this.watchlist);
  }

  //updated version of the watchlist after things are removed in the component
  removeWatchlist(index) {
    this.watchlist.splice(index, 1);
  }


  getWatchlist() {
    return this.watchlist;
  }

  // getWatchlistMovie() {
  //   return this.watchlistContainer;
  // }

  // setWatchlistMovie(watchlistMovie) {
  //   this.watchlistContainer = watchlistMovie;
  //   console.log(this.watchlistContainer);
  // }
}

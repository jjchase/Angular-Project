import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-criteria',
  templateUrl: './search-criteria.component.html',
  styleUrls: ['./search-criteria.component.css'],
})
export class SearchCriteriaComponent implements OnInit {
  popularMovies: any;
  genre: any = null;
  data: any = [];
  watchlist: any = [];

  constructor(
    private service: MoviesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // watchlist now has the watchlist in the service 
    this.watchlist = this.service.getWatchlist();

    this.route.queryParams.subscribe((response) => {
      console.log(response)
      if (response.year || response.voteCount || response.genre) {
        // console.log("Hi 24")
        this.service.getDiscoverData(response.year, response.voteCount, response.genre).subscribe((response) => {
          this.data = response['results'];
          this.addProperty();
        });
      } else {
        this.service.getPopularMovies().subscribe((response) => {
          // console.log("Hi from 33")
          console.log(response)
          this.data = response['results'];
          this.addProperty();
        });
      }
    });

    this.service.getGenreData().subscribe((response) => {
      this.genre = response;
    });


  }

  getFormData(form: NgForm): void {
    this.router.navigate(['main-page'], {
      queryParams: {
        voteCount: form.value['vote-text'],
        year: form.value['year-text'],
        genre: form.value['select-genre'],
      },
    });
    form.reset();
  }


  addToWatchlist(movie: any) {
    if (this.checkDuplicate(movie)) {
      console.log("I need to remove")
    } else {
      this.service.addToWatchlist(movie);
      movie.isClicked = true;
    }

  }

  checkDuplicate(movie: any): boolean {
    return this.watchlist.some((item) => {
      return item.id === movie.id;

    })
  }


  addProperty(): void {
    this.data.forEach(element => {
      if (this.checkDuplicate(element)) {
        element.isClicked = true
      }
    });
  }

}

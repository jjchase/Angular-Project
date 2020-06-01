import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {


  @Input() data: any;
  //this is to let the parent know about the event see line 24
  @Output() added = new EventEmitter<any>();
  showIndex: number = null;

  constructor(private route: ActivatedRoute, private service: MoviesService) { }

  ngOnInit(): void { }

  addToWatchlist(movie: any) {

    this.added.emit(movie)
  }

  setShowIndex(index: number) {
    this.showIndex = index;
  }

  removeShowIndex() {
    this.showIndex = null;
  }



}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SearchCriteriaComponent } from './search-criteria/search-criteria.component';
import { MainPageComponent } from './main-page/main-page.component';
import { WatchlistPageComponent } from './watchlist-page/watchlist-page.component';
import { SearchCriteriaComponent } from './search-criteria/search-criteria.component';

const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch: 'full' },
  { path: 'main-page', component: MainPageComponent },
  { path: 'watchlist-page', component: WatchlistPageComponent },
  { path: '**', redirectTo: '/main-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

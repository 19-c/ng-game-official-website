import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  sort: string;
  games: Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit')
      }
    })
  }

  searchGames(sort: string, search?: string) {
    this.gameSub = this.httpService.getGameList(sort, search).subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      console.log(gameList)
      console.log(this.games)
    })
  }

  openGameDetails(id: string) {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy() {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
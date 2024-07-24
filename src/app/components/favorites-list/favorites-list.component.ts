import { Component, OnInit } from '@angular/core';
import { ComicService } from './../../services/comic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.css']
})
export class FavoritesListComponent implements OnInit {
  favoriteComics: any[] = [];
  loading: boolean = false;
  skeletonCountArray: number[] = Array.from({ length: 10 });

  constructor(private comicService: ComicService, private router: Router) { }

  ngOnInit(): void {
    this.loadFavoriteComics();
  }

  loadFavoriteComics() {
    this.loading = true;
    this.comicService.getFavoriteComics().subscribe({
      next: (response) => {
        this.favoriteComics = response.map((favorite: any) => ({
          ...favorite,
          loadingDetails: true,
          details: null
        }));
        this.loadComicDetails();
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  loadComicDetails() {
    this.favoriteComics.forEach((favorite, index) => {
      this.comicService.getComicById(favorite.comicId).subscribe({
        next: (comicDetails) => {
          this.favoriteComics[index].details = {
            ...comicDetails,
            thumbnail: comicDetails.thumbnail && comicDetails.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' ?
              comicDetails.thumbnail : { path: 'assets/default-thumbnail', extension: 'png' }
          };
          this.favoriteComics[index].loadingDetails = false;
        },
        error: (error) => {
          console.error(error);
          this.favoriteComics[index].loadingDetails = false;
        }
      });
    });
  }

  goToComicDetail(comicId: string) {
    this.router.navigate(['/comics', comicId]);
  }
}

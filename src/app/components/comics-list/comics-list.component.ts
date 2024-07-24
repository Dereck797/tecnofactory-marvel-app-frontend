import { Component, HostListener, OnInit } from '@angular/core';
import { ComicService } from './../../services/comic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.css']
})
export class ComicsListComponent implements OnInit {
  comics: any[] = [];
  favorites: any[] = [];
  limit: number = 3;
  maxComics: number = 10;
  offset: number = 0;
  loading: boolean = false;
  skeletonCountArray: number[] = Array.from({ length: 10 });

  constructor(private comicService: ComicService, private router: Router) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites() {
    this.comicService.getFavoriteComics().subscribe(favorites => {
      this.favorites = favorites;
      this.loadComics();
    });
  }

  loadComics() {
    if (this.loading) return;

    this.loading = true;
    this.comicService.getComics(this.limit, this.offset).subscribe(response => {
      const formattedComics = response.map((comic: any) => ({
        ...comic,
        thumbnail: comic.thumbnail && comic.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' ? 
          comic.thumbnail : { path: 'assets/default-thumbnail', extension: 'png' },
        isFavorite: this.isFavorite(comic.id) // Marcar si es favorito
      }));
      this.comics = [...this.comics, ...formattedComics];
      this.offset += this.limit;
      this.loading = false;

      if (this.comics.length < this.maxComics) {
        this.loadComics();
      }
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }

  isFavorite(comicId: number): boolean {
    return this.favorites.some(fav => fav.comicId == comicId);
  }

  goToComicDetail(comicId: string) {
    this.router.navigate(['/comics', comicId]);
  }

  toggleFavorite(comic: any, event: Event) {
    event.stopPropagation();
  
    comic.isFavorite = !comic.isFavorite;
  
    if (comic.isFavorite) {
      this.comicService.addFavoriteComic({
        comicId: comic.id,
        title: comic.title,
        description: comic.description,
        thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`
      }).subscribe({
        next: () => {
          console.log('Comic added to favorites');
        },
        error: (error) => {
          console.error('Failed to add comic to favorites', error);
        }
      });
    } else {
      this.comicService.removeFavoriteComic(comic.id).subscribe({
        next: () => {
          console.log('Comic removed from favorites');
        },
        error: (error) => {
          console.error('Failed to remove comic from favorites', error);
        }
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadComics();
    }
  }
}

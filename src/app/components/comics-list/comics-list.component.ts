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
  limit: number = 3;
  maxComics: number = 10;
  offset: number = 0;
  loading: boolean = false;
  skeletonCountArray: number[] = Array.from({ length: 10 });

  constructor(private comicService: ComicService, private router: Router) { }

  ngOnInit(): void {
    this.loadComics();
  }

  loadComics() {
    if (this.loading) return;

    this.loading = true;
    this.comicService.getComics(this.limit, this.offset).subscribe(response => {
      const formattedComics = response.map((comic: any) => ({
        ...comic,
        thumbnail: comic.thumbnail && comic.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' ? 
          comic.thumbnail : { path: 'assets/default-thumbnail', extension: 'png' }
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

  goToComicDetail(comicId: string) {
    this.router.navigate(['/comics', comicId]);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadComics();
    }
  }
}

import { Component, HostListener, OnInit } from '@angular/core';
import { ComicService } from './../../services/comic.service';

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

  constructor(private comicService: ComicService) { }

  ngOnInit(): void {
    this.loadComics();
  }

  loadComics() {
    if (this.loading) return;

    this.loading = true;
    this.comicService.getComics(this.limit, this.offset).subscribe(response => {
      this.comics = [...this.comics, ...response];
      this.offset += this.limit;
      this.loading = false;

      // Si no se han cargado suficientes cómics para el máximo de 10, seguimos cargando
      if (this.comics.length < this.maxComics) {
        this.loadComics();
      }
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.loadComics();
    }
  }
}

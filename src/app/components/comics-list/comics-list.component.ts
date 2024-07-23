import { Component, OnInit } from '@angular/core';
import { ComicService } from './../../services/comic.service';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.css']
})
export class ComicsListComponent implements OnInit {
  comics: any[] = [];
  loading: boolean = true;

  constructor(private comicService: ComicService) {}

  ngOnInit(): void {
    this.fetchComics();
  }

  fetchComics(): void {
    this.comicService.getComics().subscribe({
      next: (data) => {
        this.comics = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching comics:', error);
        this.loading = false;
      }
    });
  }
}

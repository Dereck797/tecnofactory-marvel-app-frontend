import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicService } from './../../services/comic.service';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrls: ['./comic-detail.component.css']
})
export class ComicDetailComponent implements OnInit {
  comic: any;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private comicService: ComicService) {}

  ngOnInit(): void {
    const comicId = this.route.snapshot.paramMap.get('id');
    this.fetchComicDetails(comicId);
  }

  fetchComicDetails(id: string | null): void {
    if (id) {
      this.comicService.getComicById(id).subscribe({
        next: (data) => {
          this.comic = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching comic details:', error);
          this.loading = false;
        }
      });
    }
  }
}

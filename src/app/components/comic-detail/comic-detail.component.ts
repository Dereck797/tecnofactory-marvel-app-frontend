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
  loading: boolean = false;
  error: string = '';

  constructor(private route: ActivatedRoute, private comicService: ComicService) { }

  ngOnInit(): void {
    this.getComicDetail();
  }

  getComicDetail() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.comicService.getComicById(id).subscribe(response => {
        this.comic = {
          ...response,
          thumbnail: response.thumbnail && response.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' ? 
            response.thumbnail : { path: 'assets/default-thumbnail', extension: 'png' }
        };
        this.loading = false;
      }, error => {
        console.error(error);
        this.error = 'Failed to load comic details.';
        this.loading = false;
      });
    }
  }
}

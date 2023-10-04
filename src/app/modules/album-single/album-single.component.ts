import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-album-single',
  templateUrl: './album-single.component.html',
  styleUrls: ['./album-single.component.scss'],
})
export class AlbumSingleComponent implements OnInit {
  id: number;
  title: string;
  photos: any = '';
  selectedImage: any = null;
  selectedIndex: number | null = null;

  constructor(private readonly route: ActivatedRoute, private readonly apiService: ApiService) {}

  openImage(image: any, index: number): void {
    this.selectedImage = image;
    this.selectedIndex = index;
  }
  nextImage(): void {
    if (this.selectedIndex !== null && this.selectedIndex < this.photos.length - 1) {
      this.selectedIndex++;
      this.selectedImage = this.photos[this.selectedIndex];
    }
  }

  prevImage(): void {
    if (this.selectedIndex !== null && this.selectedIndex > 0) {
      this.selectedIndex--;
      this.selectedImage = this.photos[this.selectedIndex];
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (!this.selectedImage) {
      return; // Ne léptessen, ha a lightbox nincs nyitva
    }

    switch (event.key) {
      case 'Escape':
        this.selectedImage = null;
        this.selectedIndex = null;
        break;
      case 'ArrowRight':
        this.nextImage();
        break;
      case 'ArrowLeft':
        this.prevImage();
        break;
    }
  }

  closeImage(): void {
    this.selectedImage = null;
  }

  ngOnInit(): void {
    //kinyeri az 'id' nevű paraméter értékét, és hozzárendeli azt a komponens id változójához.
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    // Az adott album lekérése az id alapján
    this.apiService.getAlbum$(this.id).subscribe((album) => {
      this.title = album.title;
    });

    // Az album képek lekérése az id alapján
    this.apiService.getAlbumById$(this.id).subscribe((albumImages) => {
      this.photos = albumImages;
    });
  }
}

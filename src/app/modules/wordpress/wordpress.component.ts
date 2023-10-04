import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WordpressService } from 'src/app/services/wordpress.service';

@Component({
  selector: 'app-wordpress',
  templateUrl: './wordpress.component.html',
  styleUrls: ['./wordpress.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class WordpressComponent implements OnInit {
  constructor(private readonly wordpressService: WordpressService, private readonly sanitizer: DomSanitizer) {}

  postData?: {
    title: string;
    excerpt: SafeHtml;
  }[];

  ngOnInit(): void {
    this.wordpressService.getPosts$().subscribe((posts: any) => {
      this.postData = posts.map((post: any) => ({
        title: post.title.rendered,
        excerpt: this.sanitizer.bypassSecurityTrustHtml(post.excerpt.rendered),
      }));
    });
  }
}

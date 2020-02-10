import {Component, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  title = '';
  comment = '';

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
  }

  addPost() {
    this.postsService.addPosts(this.title, this.comment);
    this.title = '';
    this.comment = '';
  }

}

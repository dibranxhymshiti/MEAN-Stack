import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Post} from '../post';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postSub: Subscription;

  constructor(private postsService: PostsService) {
  }

  ngOnInit() {
    this.postsService.getPosts();
    this.getPosts();
  }

  getPosts() {
    this.postSub = this.postsService.getUpdatedPosts().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    console.log('PostSub unsubscribed');
  }

  onDelete(id: string) {
    this.postsService.deletePost(id);
  }
}

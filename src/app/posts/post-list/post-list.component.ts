import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {Post} from '../post';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  isLoading = false;
  isUserAuthenticated = false;

  private postSub: Subscription;
  private isAuthenticated: Subscription;

  constructor(private postsService: PostsService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.getPosts();
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    this.isAuthenticated = this.authService.getAuthenticatedListener()
      .subscribe((isAuthenticated: boolean) => {
        this.isUserAuthenticated = isAuthenticated;
      });
  }

  getPosts() {
    this.isLoading = true;
    this.postSub = this.postsService.getUpdatedPosts().subscribe((postsData: { posts: Post[], postsCount: number }) => {
      this.isLoading = false;
      this.posts = postsData.posts;
      this.totalPosts = postsData.postsCount;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
    this.isAuthenticated.unsubscribe();
  }

  onDelete(id: string) {
    this.isLoading = true;
    this.postsService.deletePost(id).subscribe(response => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }


}

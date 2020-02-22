import {Injectable} from '@angular/core';
import {Post} from './post';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: Post[] = [];

  private updatedPosts = new Subject<{ posts: Post[], postsCount: number }>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{ posts: any, postsCount: number }>('http://localhost:3000/api/posts' + queryParams)
      .pipe(
        map(response => {
          return {
            posts: response.posts.map(posts => {
              return {
                id: posts._id,
                title: posts.title,
                comment: posts.comment,
                imagePath: posts.imagePath
              };
            }),
            postsCount: response.postsCount
          };
        })
      )
      .subscribe(transformedPostsData => {
        this.posts = transformedPostsData.posts;
        this.updatedPosts.next({posts: [...this.posts], postsCount: transformedPostsData.postsCount});
      });
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/api/posts/${id}`);
  }

  addPosts(title: string, comment: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('comment', comment);
    postData.append('image', image, title);

    this.http.post<Post>('http://localhost:3000/api/posts', postData)
      .subscribe(createPost => {
        // IF POST-CREATE AND POST-LIST WERE IN THE SAME COMPONENT, WE HAVE TO UPDATE THE LIST

        // console.table(createPost);
        // this.posts.push(createPost);
        // this.updatedPosts.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(post: Post) {
    let postData: Post | FormData;
    if (typeof post.imagePath === 'object') {
      postData = new FormData();
      postData.append('id', post.id);
      postData.append('title', post.title);
      postData.append('comment', post.comment);
      postData.append('image', post.imagePath, post.title);

    } else {
      postData = post;
    }
    this.http.put(`http://localhost:3000/api/posts/${post.id}`, postData).subscribe((response: Post) => {

      // IF POST-CREATE AND POST-LIST WERE IN THE SAME COMPONENT, WE HAVE TO UPDATE THE LIST

      // const oldPosts = [...this.posts];
      // const updatedPostIndex = oldPosts.findIndex(x => x.id === post.id);
      // oldPosts[updatedPostIndex] = {
      //   title: response.title,
      //   comment: response.comment,
      //   imagePath: response.imagePath
      // };
      // this.posts = oldPosts;
      // this.updatedPosts.next([...oldPosts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    return this.http.delete<{ message: string }>('http://localhost:3000/api/posts/' + id);
  }
}

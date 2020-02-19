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

  private updatedPosts = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {
  }

  getPosts() {
    this.http.get<any>('http://localhost:3000/api/posts')
      .pipe(
        map(postData => {
          return postData.map(post => {
            return {
              id: post._id,
              title: post.title,
              comment: post.comment
            };
          });
        })
      )
      .subscribe((posts: Post[]) => {
        this.posts = posts;
        this.updatedPosts.next([...this.posts]);
      });
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }


  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`http://localhost:3000/api/posts/${id}`);
  }

  addPosts(title: string, comment: string) {
    console.log('addpost');
    const post: Post = {
      title,
      comment
    };

    this.http.post<any>('http://localhost:3000/api/posts', post)
      .pipe(
        map(postData => {
          return {
            id: postData._id,
            title: postData.title,
            comment: postData.comment,
          };
        })
      )
      .subscribe(transformedPost => {
        this.posts.push(transformedPost);
        this.updatedPosts.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  updatePost(post: Post) {
    this.http.put<Post>(`http://localhost:3000/api/posts/${post.id}`, post).subscribe(response => {
      const oldPosts = [...this.posts];
      const updatedPostIndex = oldPosts.findIndex(x => x.id === post.id);
      oldPosts[updatedPostIndex] = post;
      this.posts = oldPosts;
      this.updatedPosts.next([...oldPosts]);
      this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http.delete<{ message: string }>('http://localhost:3000/api/posts/' + id).subscribe(response => {

      this.posts = this.posts.filter(post => post.id !== id);
      this.updatedPosts.next([...this.posts]);
      console.log(response.message);
    });
  }
}

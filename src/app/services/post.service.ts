import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../model/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private _httpClient: HttpClient) {}

  getPosts() {
    this._httpClient
      .get<{ message: string; posts: Post[] }>(
        'http://localhost:3000/api/posts'
      )
      .subscribe((data) => {
        this.posts = data.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(toAdd: Post) {
    this._httpClient
      .post<{ message: string }>('http://localhost:3000/api/posts', toAdd)
      .subscribe((data) => {
        console.log(data.message);
        this.posts.push(toAdd);
        this.postsUpdated.next([...this.posts]);
      });
  }
}

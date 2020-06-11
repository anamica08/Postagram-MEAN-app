import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../model/post';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private _httpClient: HttpClient) {}

  getPosts() {
    this._httpClient
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((data) => {
          return data.posts.map((post) => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath,
            };
          });
        })
      )
      .subscribe((transaformedData) => {
        this.posts = transaformedData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(newPost) {
    const postData = new FormData();
    postData.append('title', newPost.title);
    postData.append('content', newPost.content);
    postData.append('image', newPost.image, newPost.title);

    this._httpClient
      .post<{ message: string; post: Post }>(
        'http://localhost:3000/api/posts',
        postData
      )
      .subscribe((data) => {
        const new_post: Post = {
          id: data.post.id,
          title: data.post.title,
          content: data.post.content,
          imagePath: data.post.imagePath,
        };
        this.posts.push(new_post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(post_id: string, postForm) {
    let postData: Post | FormData;
    if (typeof postForm.image == 'object') {
      postData = new FormData();
      postData.append('id', post_id);
      postData.append('title', postForm.title);
      postData.append('content', postForm.content);
      postData.append('image', postForm.image, postForm.title);
    } else {
      postData = {
        id: post_id,
        title: postForm.title,
        content: postForm.content,
        imagePath: postForm.image,
      };
    }
    this._httpClient
      .put<{ message: string; post: Post }>(
        `http://localhost:3000/api/posts/${post_id}`,
        postData
      )
      .subscribe((response) => {
        //locally update the posts array.
        const updatedPosts = [...this.posts];
        const oldpostIndex = updatedPosts.findIndex((p) => p.id === post_id);
        const post = {
          id: post_id,
          title: postForm.title,
          content: postForm.content,
          imagePath: response.post.imagePath,
        };
        updatedPosts[oldpostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this._httpClient
      .delete(`http://localhost:3000/api/posts/${postId}`)
      .subscribe(() => {
        const updatedPost = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id: string) {
    return this._httpClient.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
    }>(`http://localhost:3000/api/posts/${id}`);
  }
}

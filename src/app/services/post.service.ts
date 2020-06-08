import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../model/post';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { ɵBROWSER_SANITIZATION_PROVIDERS__POST_R3__ } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private _httpClient: HttpClient) {}

  getPosts() {
    this._httpClient
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(map((data)=>{
        return data.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((transaformedData) => {
        this.posts = transaformedData;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(newPost) {
    const new_post:Post = {id : null ,title: newPost.title , content: newPost.content}
    this._httpClient
      .post<{ message: string, postId:string }>('http://localhost:3000/api/posts', new_post)
      .subscribe((data) => {
        const id = data.postId;
        new_post.id =id;
        this.posts.push(new_post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId:string){
    this._httpClient.delete(`http://localhost:3000/api/posts/${postId}`)
    .subscribe(()=>{
     const updatedPost =  this.posts.filter(post => post.id !== postId);
     this.posts = updatedPost;
     this.postsUpdated.next([...this.posts]);
    })
  }
}

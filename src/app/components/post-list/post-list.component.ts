import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService} from '../../services/post.service';
import { Post } from '../../model/post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy
 {
  posts:Post[] = [];
  private _subscribe:Subscription;
  isLoading:boolean = true;
  noPostCreated:boolean ;
  constructor(
    private _postService :PostService
  ) { }
  

  ngOnInit(): void {
    this._postService.getPosts();
    this._subscribe = this._postService.getPostUpdateListener().subscribe((posts:Post[])=>
    {
      this.isLoading = false;
      this.posts = posts;
      if(this.posts.length == 0){
        this.noPostCreated = true;
      }else{
        this.noPostCreated = false;
      }
      
    }

    )
  }
  onDelete(id:string){
    this._postService.deletePost(id);
  }

  ngOnDestroy(): void {
    this._subscribe.unsubscribe();
  }
  
}

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
  constructor(
    private _postService :PostService
  ) { }
  

  ngOnInit(): void {
    this._postService.getPosts();
    this._subscribe = this._postService.getPostUpdateListener().subscribe((posts:Post[])=>
    {
      this.posts = posts;
    }

    )
  }

  ngOnDestroy(): void {
    this._subscribe.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService} from '../../services/post.service';
import { Post } from '../../model/post';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy
 {
  //page related settings
  length:number = 0;
  pageSize:number = 2;
  pageSizeOptions:number[] = [1,2,5,10];
  currPage:number = 1;
  


  posts:Post[] = [];
  private _subscribe:Subscription;
  isLoading:boolean = true;
  noPostCreated:boolean ;



  constructor(
    private _postService :PostService
  ) { }
  

  ngOnInit(): void {
    this._postService.getPosts(this.pageSize,this.currPage);
    this._subscribe = this._postService.getPostUpdateListener().subscribe((retreivedPostData: {posts:Post[],postCount:number})=>
    {
      this.isLoading = false;
      this.length = retreivedPostData.postCount;
      this.posts = retreivedPostData.posts;

      if(this.posts.length == 0){
        this.noPostCreated = true;
      }else{
        this.noPostCreated = false;
      }
      
    }

    )
  }
  onDelete(id:string){
    this._postService.deletePost(id).subscribe(()=>{
      this._postService.getPosts(this.pageSize,this.currPage);
    });
  }

  onChangedPage( pageData:PageEvent){
    this.isLoading = true;
    this.pageSize = pageData.pageSize;
    this.currPage = pageData.pageIndex +1 ;
    this._postService.getPosts(this.pageSize,this.currPage);

  }

  ngOnDestroy(): void {
    this._subscribe.unsubscribe();
  }
  
}

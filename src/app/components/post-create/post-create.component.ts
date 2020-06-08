import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  private mode = 'create';
  private postId: string = null;
  private post: Post;
  dataLoaded:boolean = false;
postForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _postService: PostService,
    private _activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        //edit form
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this._postService.getPost(this.postId).subscribe(postData=>{
        this.post = {
            id : postData._id,
            title: postData.title,
            content: postData.content
          };
          console.log(this.post)
          this.dataLoaded = true;
        });
      } else {
        this.mode = "create"
        this.post = { id: '', title: '', content: '' };
      }
    });

    
  }
  if(dataLoaded){
  this.postForm = this._formBuilder.group({
    title: [this.post?.title, Validators.required],
    content: [this.post?.content, Validators.required],
  });
}

  onFormSubmit() {
    if(this.mode === "edit"){
      if (this.postForm.valid) this._postService.updatePost(this.postId,this.postForm.value);
    }else{
      if (this.postForm.valid) this._postService.addPosts(this.postForm.value);
    }
    this.postForm.reset();
  }
  
}

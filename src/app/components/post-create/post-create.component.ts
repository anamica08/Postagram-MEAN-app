import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/model/post';
import { Router } from '@angular/router';
import { mimeType } from './mime-type.validator'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  
  private mode = 'create';
  private postId: string = null;
  private post: Post;
  imagePreview:string;
  dataLoaded:boolean = false;
  postForm:FormGroup = this._formBuilder.group({
    title: [null, Validators.required],
    image:[null,[Validators.required],[mimeType]],
    content: [null, Validators.required]
  });;
  

  constructor(
    private _formBuilder: FormBuilder,
    private _postService: PostService,
    private _activeRoute: ActivatedRoute,
    private _router: Router
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
         
          this.dataLoaded = true;
          this.populateForm();
        });
        } else {
       
        this.mode = "create";
        this.dataLoaded = true;
      }
      
    });

  
  
}

populateForm(){
this.postForm = this._formBuilder.group({
  title: [this.post.title, Validators.required],
  image:[null,[Validators.required],[mimeType]],
  content: [this.post.content, Validators.required]
});
}

  

  onFormSubmit() {
    if(this.mode === "edit"){
      if (this.postForm.valid) this._postService.updatePost(this.postId,this.postForm.value);
      //console.log(this.postForm.value)
    }else{
      if (this.postForm.valid) this._postService.addPosts(this.postForm.value);
      this.postForm.reset();
    
    }

    this._router.navigateByUrl('/');
  }

  onImagePicked(event:Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({image:file});
    this.postForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result as string;
    }
   reader.readAsDataURL(file);

  }
}

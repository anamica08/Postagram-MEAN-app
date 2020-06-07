import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PostService} from '../../services/post.service';



@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder,
    private _postService:PostService) {}

  ngOnInit(): void {}

  postForm = this._formBuilder.group({
    id:[''],
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  onFormSubmit(){
    if(this.postForm.valid)
    this._postService.addPosts(this.postForm.value);
    this.postForm.reset();
    
  }
}

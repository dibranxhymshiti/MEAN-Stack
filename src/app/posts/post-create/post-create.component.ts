import {Component, OnInit} from '@angular/core';
import {PostsService} from '../posts.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Post} from '../post';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {mimeType} from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

  postForm: FormGroup;

  private mode = 'create';
  private postID: string;
  imagePreviewSrc: string | ArrayBuffer;
  isLoading = false;

  constructor(private postsService: PostsService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      comment: ['', Validators.required],
      image: [null, {validators: [Validators.required], asyncValidators: [mimeType]}]
    });

    this.route.url.subscribe(value => {
      console.log('value', value);
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.isLoading = true;
        this.postsService.getPost(this.postID).subscribe(response => {
          this.isLoading = false;
          this.imagePreviewSrc = response.imagePath;
          this.postForm.setValue({
            title: response.title,
            comment: response.comment,
            image: response.imagePath
          });
        });

      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.postForm.patchValue({
      image: file
    });
    this.postForm.get('image').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.postForm.valid) {
      if (this.mode === 'create') {
        this.postsService.addPosts(this.postForm.value.title, this.postForm.value.comment, this.postForm.value.image);
      } else {
        const post: Post = {
          id: this.postID,
          title: this.postForm.value.title,
          comment: this.postForm.value.comment,
          imagePath: this.postForm.value.image,
          creator: null
        };
        this.postsService.updatePost(post);
      }
    }
  }
}

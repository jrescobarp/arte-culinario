import { Component, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Comment, User } from '../../models'

@Component({
  selector: 'app-comments-section',
  templateUrl: './comments-section.component.html',
  styleUrls: ['./comments-section.component.scss']
})
export class CommentsSectionComponent {
  @Input() comments_arr: any[];
  @Input() isMobile!: boolean;
  @Input() userInfo: User;
  @Input() parentObject: any;
  @Input() parentType: any;
  showBtns = false;
  comment : Comment = {
    user_id: "",
    text: "",
    upvotes: 0,
    replies: [],
    parent_id: "",
    parent_type: "",
    update_arr: []
  };

  constructor(
    private apiService: ApiService
) { }

  ngOnInit(): void {}

  deleteCommentTxt(){
    this.comment.text = "";
  }

  commentBtnToggle(setToggle:boolean){
    this.showBtns = setToggle;
  }

  submitComment(){
    this.comment.user_id = this.userInfo._id ? this.userInfo._id : '';
    this.comment.parent_id = this.parentObject._id;
    this.comment.update_arr = this.parentObject.comments;
    this.comment.parent_type = this.parentType;

    this.apiService.createComment(this.comment).subscribe((result: any) =>{
      location.reload();
    });
  }
}

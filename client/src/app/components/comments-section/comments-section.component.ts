import { Component, Input, Output, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Comment, User } from '../../models'
import { MatSnackBar } from '@angular/material/snack-bar';

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
  replyTxt = "";
  comment : Comment = {
    user_id: "",
    username: "",
    text: "",
    upvotes: 0,
    replies: [],
    parent_id: "",
    parent_type: "",
    update_arr: []
  };

  constructor(
    private apiService: ApiService,
    private _snackbar: MatSnackBar
) { }

  ngOnInit(): void {}

  deleteCommentTxt(){
    this.comment.text = "";
  }

  commentBtnToggle(setToggle:boolean){
    if(this.userInfo){
      this.showBtns = setToggle;
    }else{
      this._snackbar.open("inicia sesión o crea una cuenta para comentar", '', {duration: 2500, panelClass: ['aac-red']});
    }
  }

  submitComment(id:string, updateArr: [], parentType: string, reply = false){
    this.comment.user_id = this.userInfo._id ? this.userInfo._id : '';
    this.comment.username = this.userInfo.username ? this.userInfo.username : '';

    this.comment.parent_id = id;
    this.comment.update_arr = updateArr;
    this.comment.parent_type = parentType;
    if(reply){
      this.comment.text = this.replyTxt
    }

    this.apiService.createComment(this.comment).subscribe((result: any) =>{
      location.reload();
    });
  }

  showReplyInput(id:string, showTxt:string){
    document.getElementById(id + "-comment")!.style.display=showTxt;
  }

  viewReplies(id:string, comment: any){
    this.apiService.getComments(id).subscribe((result:any) =>{
      console.log("RESULT: ", result);
      comment.replies = result.replies
    });
  }
}

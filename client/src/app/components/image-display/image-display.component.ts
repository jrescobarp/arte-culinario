import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/api.service';
import { Image, User } from '../../models'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit{
  @Input() images: any[];
  @Input() recipe_name: string;
  @Input() recipe_id: string;
  @Input() userInfo: User;
  @Input() isMobile: boolean;
  @Input() isHomePage: boolean;
  createType = "";
  deleteImgs: any[];
  editImgIndex = -1;
  showSpinner = false;
  newImage : Image = {
    imgDataArr: [],
    user_id:"",
    recipe_id:"",
    description:"",
    username: "",
    upvotes: 0,
    comments: []
  }
  constructor(
    private modalService: NgbModal,
    private apiService: ApiService,
    private _snackbar: MatSnackBar,
    ){}

  ngOnInit(): void {
    this.showSpinner = false;
  }

  open(content:any, createType:string, editImgIndex: number = -1) {
    this.createType = createType;
    if(this.userInfo){
      this.modalService.open(content, { size:'lg', centered: true, ariaLabelledBy: 'modal-basic-title' });
    }else{
      this._snackbar.open("inicia sesión o crea una cuenta para subir fotos", '', {duration: 2500, panelClass: ['aac-red']});
    }
    this.editImgIndex = editImgIndex;
	}

  clearImgData(){
    this.newImage.description = "";
  }

  uploadImg(uploadType:string){
    this.showSpinner = true;
    const form = document.getElementById('modalForm') as HTMLFormElement;
    const formData = new FormData(form);
    let image = this.images[this.editImgIndex];
    formData.append("username", this.userInfo.username);
    formData.append("user_id", this.userInfo._id!);
    formData.append("recipe_id", this.recipe_id);

    formData.getAll("deleteImgs").forEach(deleteImgId => {
      image.imgDataArr.forEach((img:any, index:any) => {
          if(deleteImgId === img.filename){
            image.imgDataArr.splice(index, 1);
          }
      });
    });
    // if(formData.getAll("deleteImgs").length === this.images[this.editImgIndex].imgDataArr.length){
    //   console.log("UNAMEMKDMS: ",formData.getAll("form-imgs"));
    // }
    if(uploadType === "create"){
      this.apiService.createImage(formData).subscribe((result: any) =>{
        location.reload();
      });
    }else if(uploadType === "edit"){
      formData.append('imgDataArr', JSON.stringify(image.imgDataArr));
      this.apiService.editImage(this.images[this.editImgIndex]._id,formData).subscribe((result: any) =>{
        location.reload();
      });
    }
  }

  scroll(el: string) {
    let scrollHere = document.getElementById(el)!;
    scrollHere.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
  }
}

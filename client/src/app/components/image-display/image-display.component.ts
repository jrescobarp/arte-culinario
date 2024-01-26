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
  editableImgs: any[] = [];
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
      // if(createType === 'edit'){
      //   this.editableImgs = this.images[editImgIndex].imgDataArr;
      // }
      this.modalService.open(content, { size:'lg', centered: true, ariaLabelledBy: 'modal-basic-title' });
    }else{
      this._snackbar.open("inicia sesión o crea una cuenta para subir fotos", '', {duration: 2500, panelClass: ['aac-red']});
    }
    this.editImgIndex = editImgIndex;
    // this.editableImgs = [];
    if(this.editImgIndex >= 0){
      this.editableImgs.push(...this.images[this.editImgIndex].imgDataArr);
    }
	}

  clearImgData(){
    this.newImage.description = "";
    this.editableImgs = [];
  }

  checkFiles(event:Event){
    let list = new DataTransfer;
    this.editableImgs = [];
    if(this.editImgIndex >= 0){
      this.editableImgs.push(...this.images[this.editImgIndex].imgDataArr);
    }
    if(event.target && (event.target as HTMLInputElement).files?.length){
      if(
          (this.editImgIndex < 0 && (event.target as HTMLInputElement).files?.length! > 10) ||
          (this.editImgIndex >= 0 && ((event.target as HTMLInputElement).files?.length! + this.images[this.editImgIndex].imgDataArr.length) > 10)
      ){
        let counter = 0;
        if(this.editImgIndex >= 0){counter = this.images[this.editImgIndex].imgDataArr.length;}
        Array.prototype.forEach.call((event.target as HTMLInputElement).files, function(file:any) {
          if(counter < 10){
            list.items.add(file);
          }
          counter++;
        });
        (event.target as HTMLInputElement).files = list.files;
        this._snackbar.open("no podes subir mas de 10 fotos total en cada post.", '', {duration: 2500, panelClass: ['aac-red', 'mb-5']});
      }
    }

    for( const file of (event.target as HTMLInputElement).files!){
      this.editableImgs.push({
        url: URL.createObjectURL(file),
        name: file.name
      });
    }
  }

  uploadImg(uploadType:string){
    this.showSpinner = true;
    const form = document.getElementById('modalForm') as HTMLFormElement;
    const formData = new FormData(form);
    let image = this.images[this.editImgIndex];
    formData.append("username", this.userInfo.username);
    formData.append("user_id", this.userInfo._id!);
    formData.append("recipe_id", this.recipe_id);
    formData.append("imgOrder", JSON.stringify(this.editableImgs));

    formData.getAll("deleteImgs").forEach(deleteImgId => {
      image.imgDataArr.forEach((img:any, index:any) => {
          if(deleteImgId === img.filename){
            image.imgDataArr.splice(index, 1);
          }
      });
    });
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

  changeImgOrder(){

  }

  scroll(el: string) {
    let scrollHere = document.getElementById(el)!;
    scrollHere.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
  }
}

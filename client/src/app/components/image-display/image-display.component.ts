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
  imgEx = ["https://www.allrecipes.com/thmb/uAwSabBR2F1Nt88E2z6tFUFuPuw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/5061638-93061a303c0047b68e1d2ef3ed113952.jpg", "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/M6HASPARCZHYNN4XTUYT7H6PTE.jpg&w=1440", "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg"]
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

  ngOnInit(): void {}

  open(content:any) {
    if(this.userInfo){
      this.modalService.open(content, { size:'lg', centered: true, ariaLabelledBy: 'modal-basic-title' });
    }else{
      this._snackbar.open("inicia sesión o crea una cuenta para subir fotos", '', {duration: 2500, panelClass: ['aac-red']});
    }
	}

  clearImgData(){
    this.newImage.description = "";
  }

  uploadImg(){
    const form = document.getElementById('modalForm') as HTMLFormElement;
    const formData = new FormData(form);
    formData.append("username", this.userInfo.username);
    formData.append("user_id", this.userInfo._id!);
    formData.append("recipe_id", this.recipe_id);
    this.apiService.createImage(formData).subscribe((result: any) =>{
      location.reload();
    });
  }

  scroll(el: string) {
    let scrollHere = document.getElementById(el)!;
    scrollHere.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' });
  }
}

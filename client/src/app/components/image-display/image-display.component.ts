import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '../../models'


@Component({
  selector: 'app-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.scss']
})
export class ImageDisplayComponent implements OnInit{
  @Input() images: any[];
  @Input() recipe_name: string;
  @Input() recipe_id: string;
  @Input() user_id: string;
  @Input() username: string;
  @Input() isMobile: boolean;
  @Input() isHomePage: boolean;
  imgEx = ["https://www.allrecipes.com/thmb/uAwSabBR2F1Nt88E2z6tFUFuPuw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/5061638-93061a303c0047b68e1d2ef3ed113952.jpg", "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/M6HASPARCZHYNN4XTUYT7H6PTE.jpg&w=1440", "https://www.foodandwine.com/thmb/4qg95tjf0mgdHqez5OLLYc0PNT4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg"]

  newImage : Image = {
    url: "",
    user_id:"",
    recipe_id:"",
    description:"",
    username: "",
    upvotes: 0,
    comments: []
  }
  imageFiles: any[] = [];
  constructor(private modalService: NgbModal){}

  ngOnInit(): void {}

  open(content:any) {
		this.modalService.open(content, { size:'lg', centered: true, ariaLabelledBy: 'modal-basic-title' });
	}

  clearImgData(){
    this.newImage.description = "";
    this.imageFiles = [];
  }

  uploadImg(){
    console.log("IMAGEFiles: ", this.imageFiles);
    console.log("IMAGEObj: ", this.newImage);
  }
}

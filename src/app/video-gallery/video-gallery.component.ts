import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { BridgeService } from '../modules/service/bridge.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {
  closeResult = '';
  evt:any[]=[];
  video1:any[]=[];
  video: any[]=[
    {
      id:1 , category:"email", title:"Learn Angular" , link:"https://www.youtube.com/embed/0LhBvp8qpro"
    },
    {
      id:2 , category:"email",title:"Angular Tutorial - 2 - Getting Started" , link:"https://www.youtube.com/embed/k5E2AVpwsko"
    },
    {
      id:3 , category:"email",  title:"Angular Tutorial - 3 - Hello World App" , link:"https://www.youtube.com/embed/mDoHtD1hI3I&list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ&index=3"
    },
    {
      id:4 , category:"Reports", title:"Report Writing |" , link:"https://www.youtube.com/embed/GuLeSES8PAk"
    },
    {
      id:5 ,   category:"Reports", title:"Explained: Key takeaways from IPCC Synthesis Report on climate change" , link:"https://www.youtube.com/embed/qfiRM003Tco"
    },
    {
      id:6 ,  category:"Reports",  title:"Business Matters | How can EU’s carbon tax hurt India?" , link:"https://www.youtube.com/embed/sSufl19F68I"
    },
    {
      id:7 ,  category:"Social Media", title:"Social Media Latest" , link:"https://www.youtube.com/embed/0eWrpsCLMJQ&list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ"
    },
    {
      id:8 ,  category:"Social Media", title:"Social Meadia Treats" , link:"https://www.youtube.com/embed/0eWrpsCLMJQ&list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ"
    },
    {
      id:9 ,  category:"Social Media", title:"Trades" , link:"https://www.youtube.com/embed/0eWrpsCLMJQ&list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ"
    },
    {
      id:10 ,  category:"Graphics", title:"Graphics" , link:"https://www.youtube.com/embed/VXQuHSi0FqE"
    },
    {
      id:11 ,  category:"Graphics", title:"Learn Graphics" , link:"https://www.youtube.com/embed/MmCTJNr10xc"
    },
    {
      id:12,  category:"Graphics", title:"Learn Graphics" , link:"https://www.youtube.com/embed/hvXotgxBOvk"
    }

  ];
  constructor(
    private modalService: NgbModal,
    public _BridgeService: BridgeService
  ) { }

  ngOnInit(): void {
    this.video1=this.video;
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', modalDialogClass: 'modal-dialog-centered order-cards-modal' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  opentab(cate:any ) {
    if(cate=='all'){
      this.video1=this.video;
      console.log('filterall', this.video1);
    }
    else{
this.video1=this.video.filter((item:any)=>item.category==cate);
console.log('filter', this.video1);
    }


  }


}



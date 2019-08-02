import { Component } from '@angular/core';
import {AppserviceService} from './appservice.service';
// import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ImageUpload';
  fileToUpload: File = null;
  nameConfidence=[];
  imageSrc: string | ArrayBuffer;
  clicked:boolean=false;
  errorfileType:boolean=false;
  errorfileSize:boolean=false;
  flag:number=0;
  public loading = false;
  height: number;
  width: number;
  imageType: string;
  imageSize: number;
  constructor(private appService:AppserviceService){

  }
onSubmit(){

  console.log("Button Pressed!");

}

handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
  this.clicked=false;
  this.flag=0;
  this.errorfileType=false;
  this.errorfileSize=false;
  if(this.fileToUpload.type!="image/jpeg" && this.fileToUpload.type!="image/png"){
    this.errorfileType=true;
    this.flag=1;
  }
  else if(this.fileToUpload.size>(5*1024*1024)){
    this.errorfileSize=true;
    this.flag=1;
    
  }

  if(this.flag==1){
    return "error";
  }
  this.clicked=true;
  var image = <HTMLCanvasElement>document.getElementById('blah');
this.width = image.width;
this.height = image.height;
this.imageType = this.fileToUpload.type;
this.imageSize = this.fileToUpload.size;
console.log(this.width+" "+this.height)
  if(this.fileToUpload!=null){
    
    const reader = new FileReader();
    
        reader.onload = e => this.imageSrc = reader.result;
       
        reader.readAsDataURL(this.fileToUpload);
    this.uploadFileToActivity();
  }
}

uploadFileToActivity() {
  
  console.log(this.fileToUpload.size);
  console.log(this.fileToUpload.type);
  // console.log(this.fileToUpload.width);
  // console.log(this.fileToUpload.height);
  // this.spinner.show();
  this.loading = true;
  this.appService.postFile(this.fileToUpload).subscribe(data => {
    // do something, if upload success
    // this.spinner.hide();
    this.loading = false;
    this.nameConfidence=[];
    console.log(data);
    console.log(data['result']['tags'].length);
    for(let i=0; i<data['result']['tags'].length; i++){
      // console.log(data['result']['tags'][i].confidence)
    this.nameConfidence.push({"Confidence":data['result']['tags'][i].confidence,"Name":data['result']['tags'][i]['tag'].en});
    }
    // console.log(data['result']['tags'][0]['tag'].en);
    //console.log(data[0].result);
    // console.log(data[0].result.tags[0].tag.en);
    console.log(this.nameConfidence);
    console.log("Uploaded");
    }, error => {
      // this.spinner.hide();
      this.loading = false;
      console.log(error);
    });
}




}

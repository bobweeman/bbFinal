import { LaravelProvider } from './../../providers/laravel/laravel';
import { Geolocation } from '@ionic-native/geolocation';
import { AlertProvider } from './../../providers/alert/alert';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera,CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the NewPharmacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-pharmacy',
  templateUrl: 'new-pharmacy.html',
})
export class NewPharmacyPage {

  constructor(private geolocation: Geolocation,
    private toastr:AlertProvider, 
    private camera:Camera, 
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private http:LaravelProvider
  ) {
  }
  next:boolean=false;
  // map search
  search_place:any='';

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPharmacyPage');
    this.getPostition();
    
  }

  shopForm = new FormGroup({
    name: new FormControl(null, ([Validators.required, Validators.email])),
  })


  // data object to persist at backend
  pharmData={
    name:'',
    logo:'general.png',
    longitude:0,
    latitude:0,
    owner_id:''
  }
  
//Location of the pharmacy
  userPosition={
    longitude:0,
    latitude:0
  }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose image source',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            console.log('Get from camera');
            this.takePhoto(1);
          }
        }, {
          text: 'Gallery',
          handler: () => {
            console.log('Get from gallery');
            this.takePhoto(0);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  //take Photo
  takePhoto(sourceType: number) {
    const options: CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType,
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.pharmData.logo =base64Image;

    }, (err) => {
      // Handle error
      this.toastr.messenger('Could not get image');
    });
  }

  // get coordinates
  getPostition(){
    
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      this.userPosition.latitude= resp.coords.latitude;
      this.userPosition.longitude= resp.coords.longitude;
    }).catch((error) => {
      this.toastr.messenger('Error getting location');
    });
  }

 
  continue() {
    this.savePharmacy();
    
    this.navCtrl.push("MapPage");
  }  

  buildData(){
    this.pharmData.name = this.shopForm.controls['name'].value;
    this.pharmData.owner_id = localStorage.getItem('user_id');
  }

  savePharmacy(){
    this.buildData();
    this.http.store('pharmacies',this.pharmData).subscribe((response)=>{
      console.log(JSON.stringify(response));
    },error=>{
      this.toastr.messenger("Failed to save pharmacy");
      console.log(JSON.stringify(error));
    });
  }
}

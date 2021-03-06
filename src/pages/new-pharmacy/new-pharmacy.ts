import { Geolocation } from '@ionic-native/geolocation';
import { AlertProvider } from './../../providers/alert/alert';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera,CameraOptions } from '@ionic-native/camera';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
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

  constructor(private geolocation: Geolocation,private toastr:AlertProvider, private camera:Camera, public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams) {
  }
  map: GoogleMap;
  next:boolean=false;

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
    logo:''
  }

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
      quality: 50,
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
      alert(this.userPosition.longitude);
    }).catch((error) => {
      this.toastr.messenger('Error getting location');
    });
  }

  // load google maps
  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.userPosition.latitude,
          lng: this.userPosition.longitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('jack', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.toastr.messenger('Map is ready');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'You',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: this.userPosition.latitude,
            lng: this.userPosition.longitude
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });

  }
  continue() {
    this.next=true;
    this.loadMap();
  }  

  savePharmacy(){

  }
}

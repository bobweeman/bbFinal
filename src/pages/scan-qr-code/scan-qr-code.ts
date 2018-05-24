import { AlertProvider } from './../../providers/alert/alert';
import { LaravelProvider } from './../../providers/laravel/laravel';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

/**
 * Generated class for the ScanQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-qr-code',
  templateUrl: 'scan-qr-code.html',
})
export class ScanQrCodePage {

  constructor(private toastr:AlertProvider, private http:LaravelProvider, private qrScanner: QRScanner,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanQrCodePage');
  }
  
  diagDrugs={
    qr_code_url:''
  };
  showDrugs:boolean=false;
  deDrugs:any[]=[];

  beginScan(){

      var context = this;
      // Optionally request the permission early
      this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {

          if (status.authorized) {
            // camera permission was granted
            console.log("scanning");
            var ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];
            // start scanning
            let scanSub = this.qrScanner.scan().subscribe((drug: string) => {
              // alert('Scanned drugs... '+ drug);
              this.diagDrugs.qr_code_url=drug;
              this.getPatientDrugs();
              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
              
              ionApp.style.display = "block";
            });

            // show camera preview
            ionApp.style.display = "none";
            context.qrScanner.show();
            setTimeout(() => {
              ionApp.style.display = "block";
              scanSub.unsubscribe(); // stop scanning
              context.qrScanner.hide();
            }, 5000);
            // wait for user to scan something, then the observable callback will be called

          } else if (status.denied) {
            console.log("Denied permission to access camera");
          } else {
            console.log("Something else is happening with the camera");
          }
        })
        .catch((e: any) => console.log('Error is', e));
    
  }

  getPatientDrugs(){
    this.http.store('patient_drugs',this.diagDrugs).subscribe((response)=>{
        this.deDrugs=response['drugs'];
        this.showDrugs=true;
        console.log(this.deDrugs);
    },error=>{
      this.toastr.messenger('Could not get related drugs');
    });
  }

}

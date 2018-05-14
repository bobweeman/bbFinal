import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LaravelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const server = "http://127.0.0.1:8000/api/";

@Injectable()

export class LaravelProvider {

  constructor(public http: HttpClient,public HttpHeader:HttpHeaders) {
    console.log('Hello LaravelProvider Provider');
  }

    
  jwt = localStorage.getItem('jwt');
  // index of a resource

  index(url){
    let config = new HttpHeaders();
    config.append('Accept', 'application/json');
    config.append('Authorization', 'Bearer ' + this.jwt);
    return this.http.get(server + url, { headers: config });
  }
  
  // store a new resource
  store(url,payload) {
    let config = new HttpHeaders();
    config.append('Accept', 'application/json');
    config.append('Authorization', 'Bearer ' + this.jwt);
    return this.http.post(server + url, payload, { headers: config });
  }
  // show a single resource
  show(url,id){
    let config = new HttpHeaders();
    config.append('Accept', 'application/json');
    config.append('Authorization', 'Bearer ' + this.jwt);
    return this.http.get(server + url + '/' + id), { headers: config };
  }

  // show edit details for  a single resource
  edit(url, id) {
    let config = new HttpHeaders();
    config.append('Accept', 'application/json');
    config.append('Authorization', 'Bearer ' + this.jwt);
    return this.http.get(server + url + '/' + id, { headers: config });
  }
// update a single resource
  update(url,id,payload){
    let config = new HttpHeaders();
    config.append('Accept', 'application/json');
    config.append('Authorization', 'Bearer ' + this.jwt);
    return this.http.patch(server + url + '/' + id, payload, { headers: config });
    }
// delete a particular resource
  destroy(url,id){
    let config = new HttpHeaders();
    config.append('Accept', 'application/json');
    config.append('Authorization', 'Bearer ' + this.jwt);
    return this.http.delete(server + url+'/'+id, { headers: config });
  }
  
    
}

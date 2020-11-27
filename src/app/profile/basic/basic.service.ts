import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Basic} from './basic.model';
import {AuthService} from '../../auth/auth.service';
import {tap, catchError, map} from 'rxjs/operators';
import {throwError, BehaviorSubject} from 'rxjs';
import {ArrayConcatBuiltinFn} from '@angular/compiler-cli/src/ngtsc/partial_evaluator/src/builtin';
import {Divisions} from './divisions.model';
import {PhoneNumber} from './phone-number.model';
import {Districts} from './districts.model';
import {Upzillas} from './upzillas.model';
import {Unions} from './unions.model';
import {forEachComment} from 'tslint';
import {Address} from '../../model/address.model';
import {EmergencyContact} from './emergency-contact.model';

@Injectable({
  providedIn: 'root'
})
export class BasicService {
  // currentBasic : Basic;
  basicObserverable = new BehaviorSubject<Basic>(null);
  currentBasic = this.basicObserverable.asObservable();

  // constructor(private http: HttpClient) { }
  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  data: Object;
  loading: boolean;
  deleteStatus: string;
  phoneNumbers: PhoneNumber[] = new Array();
  bas: Basic = new Basic();

  create(basic: Basic) {
    this.http.post(
      'http://127.0.0.1:8000/api/basic/create', basic, this.authService.getHeader()
    ).subscribe((res: Response) => {
      console.log(res);
      this.loading = false;
    });
  } // create


  public update(basic: Basic) {
    this.http.post(
      'http://127.0.0.1:8080/public/profile/basic/update', basic, this.authService.getHeader()
    ).subscribe((res: Response) => {
      console.log(res);
      this.loading = false;
    });
  }// create

  // bas: Basic = new Basic();

  public getCurrentUserBasic() {
    return this.http.get(
      'http://127.0.0.1:8080/public/profile/basic/findOneByUser', this.authService.getHeader(),
    );

    // refactor : setBasicInformation not working, phone number is working, but in same way not the basic info.
    //   .subscribe((b: Basic) => {
    //   this.loading = false;
    //   console.log(b);
    //
    //   // phone number
    //   for (const key in b['phone_number']) {
    //     const phoneNumber = new PhoneNumber();
    //     phoneNumber.$id = b['phone_number'][key]['id'];
    //     phoneNumber.$number = b['phone_number'][key]['number'];
    //     this.phoneNumbers.push(phoneNumber);
    //   }
    //
    //   // basic information
    //   this.bas.$id = b['id'];
    //   console.log('response name : ' + b['name']);
    //   this.bas.$name = b['name'];
    //   console.log('service : ' + this.bas['name']);
    //   this.bas.$birthDate = b['birthDate'];
    //   this.bas.$gender = b['gender'];
    //   this.bas.$blood_Group = b['blood_Group'];
    //   this.bas.$religion = b['religion'];
    //   this.bas.$email = b['email'];
    // });
  }// get current user basic.

  public getPhoneNumbers() {
    return this.phoneNumbers;
  }

  public getBasicInformation() {
    // this.bas
    this.basicObserverable.next(this.bas);
    console.log('service : ' + this.bas['name']);
    return this.bas;
  }


  public getDept() {
    var dept: string[] = ['CSE', 'EEE', 'TEX', 'FTDM', 'BBS', 'BBA', 'LAW'];
    return dept;
  }

  public getBloodGroup() {
    var blood: string[] = ['A+', 'B+', 'O+', 'A-', 'B-', 'O-', 'AB+', 'AB-'];
    return blood;
  }

  public getDivisions() {
    var divisions: Divisions[] = new Array();
    this.http.get(
      'http://127.0.0.1:8080/public/geocode/divisions', this.authService.getHeader()
    ).subscribe((res: Response) => {
      for (const index in res) {
        var div = new Divisions();
        div.id = res[index]['id'];
        div.name = res[index]['name'];
        // this.present_divisions.push(res[index]['name']);
        divisions.push(div);
      }
    });
    return divisions;
  }

  public getDistricts(divID: string) {
    var districts: Districts[] = new Array();
    this.http.post(
      'http://127.0.0.1:8080/public/geocode/districts?divID=' + divID, this.authService.getHeader()
    ).subscribe((res: Response) => {
      console.log(res);
      for (const index in res) {
        var dist = new Districts();
        dist.id = res[index]['id'];
        dist.name = res[index]['name'];
        // this.present_divisions.push(res[index]['name']);
        districts.push(dist);
      }
    });
    return districts;
  }

  public getUpzillas(distID: string) {
    var upzillas: Upzillas[] = new Array();
    this.http.post(
      'http://127.0.0.1:8080/public/geocode/upzillas?distID=' + distID, this.authService.getHeader()
    ).subscribe((res: Response) => {
      // console.log(res);
      for (const index in res) {
        var upz = new Upzillas();
        upz.id = res[index]['id'];
        upz.name = res[index]['name'];
        upzillas.push(upz);
      }
    });
    return upzillas;
  }

  public getUnions(upzID: string) {
    var unions: Unions[] = new Array();
    this.http.post(
      'http://127.0.0.1:8080/public/geocode/unions?upzID=' + upzID, this.authService.getHeader()
    ).subscribe((res: Response) => {
      for (const index in res) {
        var union = new Unions();
        union.id = res[index]['id'];
        union.name = res[index]['name'];
        unions.push(union);
      }
    });
    return unions;
  }


  public addPhoneNumber(phoneNumber: string): PhoneNumber {
    var newNumber = new PhoneNumber();
    newNumber.$number = phoneNumber;
    this.http.post(
      'http://127.0.0.1:8080/public/profile/basic/addPhoneNumber', newNumber, this.authService.getHeader())
      .subscribe(res => {
        console.log(res);
        if (res['STATUS'] === 'OK') {
          newNumber.$id = res['ID'];
        }
        if (res['STATUS'] === 'FAIL') {
          newNumber = null;
        }
      });
    return newNumber;
  }


  public deletePhoneNumber(p: PhoneNumber): string {
    this.http.post(
      'http://127.0.0.1:8080/public/profile/basic/deletePhoneNumber', p, this.authService.getHeader())
      .subscribe(res => {
        console.log(res);
        if (res['STATUS'] === 'OK') {
          console.log('OK');
          this.deleteStatus = 'OK';
        }
        if (res['STATUS'] === 'FAIL') {
          this.deleteStatus = 'FAIL';
          console.log('FAIL');
        }
      });
    console.log('After Assingn in service: ' + this.deleteStatus);
    return this.deleteStatus;
  }


  getName() {
    return this.bas.$name;
  }

  // refactor : single method to update
  update_address_present(address: Address): string {
    var updateStatus: string;
    this.http.post(
      'http://127.0.0.1:8080/public/profile/basic/updatePresentAddress', address, this.authService.getHeader())
      .subscribe(res => {
        console.log(res);
        if (res['STATUS'] === 'OK') {
          console.log('OK');
          updateStatus = 'OK';
        }
        if (res['STATUS'] === 'FAIL') {
          updateStatus = 'FAIL';
          console.log('FAIL');
        }
      });
    return updateStatus;
  }

  update_address_permanent(addressPermanent: Address) {
    var updateStatus: string;
    this.http.post(
      'http://127.0.0.1:8080/public/profile/basic/updatePermanentAddress', addressPermanent, this.authService.getHeader())
      .subscribe(res => {
        console.log(res);
        if (res['STATUS'] === 'OK') {
          console.log('OK');
          updateStatus = 'OK';
        }
        if (res['STATUS'] === 'FAIL') {
          updateStatus = 'FAIL';
          console.log('FAIL');
        }
      });
    return updateStatus;
  }

  addEmergencyContact(emergencyContact: EmergencyContact) {
    // var addStatus: string;
    return this.http.post(
      'http://127.0.0.1:8080/public/profile/basic/addEmergencyContact', emergencyContact,
      this.authService.getHeader());
    // refactor : not working : addStatus, being used before value return there.
    //   .subscribe(res => {
    //     console.log(res);
    //     if (res['STATUS'] === 'OK') {
    //       console.log('OK');
    //       addStatus = 'OK';
    //     }
    //     if (res['STATUS'] === 'FAIL') {
    //       addStatus = 'FAIL';
    //       console.log('FAIL');
    //     }
    //   });
    // return addStatus;
  }

  public deleteEmergencyContact(emergencyContactID: string) {
    return this.http.post(
      'http://127.0.0.1:8080/public/profile/basic/deleteEmergencyContact?emergencyContactID=' + emergencyContactID,
      this.authService.getHeader());
  }

  editEmergencyContact(editEmergencyContact: EmergencyContact) {
    return this.http.post(
      'http://127.0.0.1:8080/public/profile/basic/updateEmergencyContact', editEmergencyContact,
      this.authService.getHeader());
  }
}// class
// working
// {
//   user_id: '1',
//   first_name: '1',
// }

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../../auth/auth.service';
import {RequestSearchReview} from '../model/request-search-review.model';
import {RequestSearchDonnerAssing} from '../model/request-search-donner-assign.model';
import {DonnerAssingShow} from '../model/donner-assing-show.model';
import {Basic} from '../../../profile/basic/basic.model';
import {DonnerAssingment} from '../model/donner-assingment.model';
import {ProfileDetails} from '../../../model/profile-details.model';

@Injectable({
  providedIn: 'root'
})
export class DonnerAssignService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // public getDonnerToAgentRequestToReview(search: RequestSearchReview) {
  //   return this.http.post(
  //     'http://localhost:8080/public/user/agent/donner/getDonnerToAgentRequestToReview', search,
  //     this.authService.getHeader());
  // }

  getAssingments(donnerAssingSearch: RequestSearchDonnerAssing) {
    return this.http.post<DonnerAssingShow[]>('http://localhost:8080/public/user/agent/donnerAssign/getAssingments', donnerAssingSearch, this.authService.getHeader());
  }

  getAssingmentsCount(donnerAssingSearch: RequestSearchDonnerAssing) {
    return this.http.post<any>('http://localhost:8080/public/user/agent/donnerAssign/getAssingmentsCount', donnerAssingSearch, this.authService.getHeader());
  }

  delete(deleteId: string) {
    return this.http.delete<any>('http://localhost:8080/public/user/agent/donnerAssign/delete?donnerAssingmentID=' + deleteId, this.authService.getHeader());
  }


  profileCheckingByUserID(donnerUserID: string) {
    return this.http.get<Basic>('http://localhost:8080/public/user/agent/donnerAssign/profileCheckingByUserID?userID=' + donnerUserID, this.authService.getHeader());
  }

  save(donnerAssignment: DonnerAssingment) {
    return this.http.post<any>('http://localhost:8080/public/user/agent/donnerAssign/save', donnerAssignment, this.authService.getHeader());
  }

  update(da: DonnerAssingShow) {
    // return this.http.get<Basic>('http://localhost:8080/public/user/agent/donnerAssign/profileCheckingByUserID?userID=' + donnerUserID, this.authService.getHeader());
  }

  complete(donnerAssingmentId: string) {
    return this.http.post<any>('http://localhost:8080/public/user/agent/donnerAssign/complete?donnerAssingmentID=' + donnerAssingmentId, this.authService.getHeader());
  }

  getProfileDetails(userId: string) {
    return this.http.get<ProfileDetails>('http://localhost:8080/public/user/agent/donnerAssign/profileDetails?userID=' + userId, this.authService.getHeader());
  }
}

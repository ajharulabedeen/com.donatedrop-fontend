import {Injectable} from '@angular/core';
import {SearchRequest} from '../../donation-history/search-request.model';
import {HttpClient} from '@angular/common/http';
import {History} from '../../donation-history/history.model';
import {AuthService} from '../../auth/auth.service';
import {RequestGetAgentRequests} from './models/request-get-agent-requests.model';
import {RequestReviewRequest} from './models/request-review-request.model';
import {RequestAdminNote} from './models/request-admin-note.model';
import {RequestPersonalNote} from './models/request-personal-note.model';

@Injectable({
  providedIn: 'root'
})
export class AgentServiceService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // http://localhost:8080/public/user/getAgentRequestsToReview
  public getAgentRequestsToReview(agentSearch: RequestGetAgentRequests) {
    return this.http.post(
      'http://localhost:8080/public/user/agent/admin/getAgentRequestsToReview', agentSearch,
      this.authService.getHeader());
  }

  // http://localhost:8080/public/user/getAgentRequestsToReviewCount
  public getAgentRequestsToReviewCount(agentSearch: RequestGetAgentRequests) {
    return this.http.post(
      'http://localhost:8080/public/user/agent/admin/getAgentRequestsToReviewCount', agentSearch,
      this.authService.getHeader());
  }


  // http://localhost:8080/public/user/agent/admin/reviewRequest
  public requestReview(reviewRequestObj: RequestReviewRequest) {
    return this.http.post(
      'http://localhost:8080/public/user/agent/admin/reviewRequest', reviewRequestObj,
      this.authService.getHeader());
  }

  // http://localhost:8080/public/user/agent/admin/updateAdminNote
  public updateAdminNote(adminNote: RequestAdminNote) {
    return this.http.post(
      'http://localhost:8080/public/user/agent/admin/updateAdminNote', adminNote,
      this.authService.getHeader());
  }

  // http://localhost:8080/public/user/agent/admin/updatePersonalNote
  public updatePersonalNote(personalNote: RequestPersonalNote) {
    return this.http.post(
      'http://localhost:8080/public/user/agent/admin/updatePersonalNote', personalNote,
      this.authService.getHeader());
  }

}

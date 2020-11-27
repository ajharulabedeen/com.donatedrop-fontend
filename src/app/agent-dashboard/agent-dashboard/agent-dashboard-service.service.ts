import {Injectable} from '@angular/core';
import {RequestGetAgentRequests} from '../../admin/agent/models/request-get-agent-requests.model';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/auth.service';
import {RequestSearchReview} from './model/request-search-review.model';
import {RequestAdminNote} from '../../admin/agent/models/request-admin-note.model';
import {RequestNote} from './model/request-note.model';
import {RequestReviewRequest} from './model/request-review-request.model';

@Injectable({
  providedIn: 'root'
})
export class AgentDashboardServiceService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  // http://localhost:8080/public/user/agent/donner/getDonnerToAgentRequestReviewCount
  public getDonnerToAgentRequestReviewCount(search: RequestSearchReview) {
    return this.http.post(
      'http://localhost:8080/public/user/agent/donner/getDonnerToAgentRequestReviewCount', search,
      this.authService.getHeader());
  }

  // http://localhost:8080/public/user/agent/donner/getDonnerToAgentRequestToReview
  public getDonnerToAgentRequestToReview(search: RequestSearchReview) {
    return this.http.post(
      'http://localhost:8080/public/user/agent/donner/getDonnerToAgentRequestToReview', search,
      this.authService.getHeader());
  }

  // http://localhost:8080/public/user/agent/donner/updateAgentNote
  public updateAgentNote(note: RequestNote) {
    return this.http.post(
      'http://localhost:8080/public/user/agent/donner/updateAgentNote', note,
      this.authService.getHeader());
  }

  // http://localhost:8080/public/user/agent/donner/updateNoteAgentPersonal
  public updateAgentPersonalNote(note: RequestNote) {
    return this.http.post(
      'http://localhost:8080/public/user/agent/donner/updateNoteAgentPersonal', note,
      this.authService.getHeader());
  }

  // http://localhost:8080/public/user/agent/donner/reviewDonnerRequest
  public donnerRequestReview(reviewRequest: RequestReviewRequest) {
    return this.http.post(
      'http://localhost:8080/public/user/agent/donner/reviewDonnerRequest', reviewRequest,
      this.authService.getHeader());
  }

}

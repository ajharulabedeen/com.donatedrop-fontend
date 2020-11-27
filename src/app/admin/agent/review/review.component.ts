import {Component, Input, OnInit} from '@angular/core';
import {AgentRequestToReview} from '../models/agent-request-to-review.model';
import {AgentServiceService} from '../agent-service.service';
import {RequestGetAgentRequests} from '../models/request-get-agent-requests.model';
import {RequestReviewRequest} from '../models/request-review-request.model';
// import {ReviewValue} from '../models/review-value.model';
import {RequestAdminNote} from '../models/request-admin-note.model';
import {RequestPersonalNote} from '../models/request-personal-note.model';
import {History} from '../../../donation-history/history.model';

@Component({
  selector: 'app-agent-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  //start : new
  @Input()
  pageHeader = '';
  @Input()
  buttonReview = false;
  @Input()
  buttonReject = false;
  @Input()
  buttonApprove = false;
  // @Input()
  // buttonAccept = false;
  @Input()
  buttonActive = false;
  @Input()
  buttonFreeze = false;
  @Input()
  buttonDetials = false;
  @Input()
  statusType = '';

  @Input()
  modalIDAdmin = '';
  @Input()
  modalIDAgent = '';


  headerColor = '';
  //end : new


  searchKey: string;
  searchByColumn = 'username';
  total = 0;
  startRequests = 0;
  perPage = 10;
  pageNumber = 0;
  phoneNumber = '';

  requestID: string;
  adminNote: string;
  personalNote: string;

  agentRequestsToReview: AgentRequestToReview[] = new Array();

  // rivewValue: ReviewValue = new ReviewValue();

  constructor(private agentService: AgentServiceService) {
  }

  ngOnInit() {
    if (this.statusType == '0') {
      this.headerColor = 'text-orange';
    } else if (this.statusType == 'ACCEPT') {
      this.headerColor = 'text-aqua';
    } else if (this.statusType == 'REJECT') {
      this.headerColor = 'text-danger';
    } else if (this.statusType == 'FREEZE') {
      this.headerColor = 'text-info';
    }
    this.searchKey = '';
    this.getAgentRequestsToReview();
  }

  public getAgentRequestsToReview() {
    console.log('this.statusType : ' + this.statusType);
    var finalSearchKey = '%' + this.searchKey + '%';
    const agentSearch: RequestGetAgentRequests = new RequestGetAgentRequests(
      this.startRequests.toString(), this.perPage.toString(), this.searchByColumn, finalSearchKey, this.statusType);
    console.log(agentSearch);
    this.agentRequestsToReview = [];
    this.agentService.getAgentRequestsToReview(agentSearch).subscribe(res => {
        console.log('res : ' + res);
        for (const key in res) {
          var artr = new AgentRequestToReview();

          // artr.addressPermanent = res[key]['addressPermanent'];
          // artr.addressPresent = res[key]['addressPresent'];

          artr.gender = res[key]['gender'];
          artr.name = res[key]['name'];
          artr.noteApplicant = res[key]['noteApplicant'];
          artr.noteAdmin = res[key]['noteAdmin'];
          artr.notePersonal = res[key]['notePersonal'];
          //clean
          console.log(res[key]['notePersonal']);


          // artr.phone_number = res[key]['phone_number'];
          artr.phone_number = '';
          for (const phoneKey in res[key]['phone_number']) {
            artr.phone_number += res[key]['phone_number'][phoneKey]['number'] + ';\n';
            console.log(res[key]['phone_number'][phoneKey]['number']);
          }
          // console.log(artr.phone_number);
          // console.log(res[key]['phone_number']);
          // console.log(res[key]['addressList']);
          // console.log(res[key]['addressList']['0']['type']);
          for (const addrKey in res[key]['addressList']) {
            if (res[key]['addressList'][addrKey]['type'] === 'PRESENT') {
              // type = 'PRESENT'
              artr.presentDist = res[key]['addressList'][addrKey]['district'];
              artr.presentDiv = res[key]['addressList'][addrKey]['division'];
              artr.presentId = res[key]['addressList'][addrKey]['addressID'];
              artr.presentStreet = res[key]['addressList'][addrKey]['street_address'];
              artr.presentUnion = res[key]['addressList'][addrKey]['union_ward'];
              artr.presentUpz = res[key]['addressList'][addrKey]['upzilla'];
            } else {
              artr.permanentDist = res[key]['addressList'][addrKey]['district'];
              artr.permanentDiv = res[key]['addressList'][addrKey]['division'];
              artr.permanentId = res[key]['addressList'][addrKey]['addressID'];
              artr.permanentStreet = res[key]['addressList'][addrKey]['street_address'];
              artr.permanentUnion = res[key]['addressList'][addrKey]['union_ward'];
              artr.permanentUpz = res[key]['addressList'][addrKey]['upzilla'];
            }
          }
          artr.profession = res[key]['profession'];
          artr.profileId = res[key]['profileId'];
          if (this.statusType == '0') {
            artr.requestDate = res[key]['requestDate'];
          } else if (this.statusType == 'ACCEPT') {
            artr.requestDate = res[key]['acceptDate'];
          } else if (this.statusType == 'REJECT') {
            artr.requestDate = res[key]['rejectDate'];
          } else if (this.statusType == 'FREEZE') {
            artr.requestDate = res[key]['freezeDate'];
          }
          // artr.requestId = res[key]['requestId'];
          artr.requestId = res[key]['id'];
          artr.status = res[key]['status'];
          artr.userId = res[key]['userId'];
          artr.username = res[key]['username'];

          this.agentRequestsToReview.push(artr);
        }
      }
    );
    // console.log(this.agentRequestsToReview);
    this.agentService.getAgentRequestsToReviewCount(agentSearch).subscribe(res => {
        console.log(res);
        this.total = res['COUNT'];
      }
    );
  }

  public nextPage() {
    if (this.startRequests <= this.total) {
      this.startRequests += this.perPage;
      this.getAgentRequestsToReview();
    }
  }

  public previousPage() {
    if (this.startRequests > 0) {
      this.startRequests -= this.perPage;
      this.getAgentRequestsToReview();
    }
  }

  public requestReject(requestIdReject: string) {
    const reviewRequestReject: RequestReviewRequest = new RequestReviewRequest(requestIdReject, 'REJECT');
    this.agentService.requestReview(reviewRequestReject).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        // this.getAgentRequestsToReview();
        var artr: AgentRequestToReview = this.agentRequestsToReview.find(({requestId}) => requestId === requestIdReject);
        this.agentRequestsToReview = this.agentRequestsToReview.filter(obj => obj !== artr);
        this.total -= 1;
      }
    });
  }

  requestAccept(requestIdAccept: string) {
    const reviewRequestAccept: RequestReviewRequest = new RequestReviewRequest(requestIdAccept, 'ACCEPT');
    // console.log(requestId);
    console.log(reviewRequestAccept);
    this.agentService.requestReview(reviewRequestAccept).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        // this.getAgentRequestsToReview();
        // var hist: History = this.historyDonation.find(({id}) => id === this.deleteId);
        var artr: AgentRequestToReview = this.agentRequestsToReview.find(({requestId}) => requestId === requestIdAccept);
        this.agentRequestsToReview = this.agentRequestsToReview.filter(obj => obj !== artr);
        this.total -= 1;
      }
    });
  }

  public requestFreeze(requestIdFreeze: string) {
    const reviewRequestFreeze: RequestReviewRequest = new RequestReviewRequest(requestIdFreeze, 'FREEZE');
    this.agentService.requestReview(reviewRequestFreeze).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        // this.getAgentRequestsToReview();
        var artr: AgentRequestToReview = this.agentRequestsToReview.find(({requestId}) => requestId === requestIdFreeze);
        this.agentRequestsToReview = this.agentRequestsToReview.filter(obj => obj !== artr);
        this.total -= 1;
      }
    });
  }

  requestHold(requestIdHold: string, HOLD: string) {
    const reviewRequestHold: RequestReviewRequest = new RequestReviewRequest(requestIdHold, HOLD);
    this.agentService.requestReview(reviewRequestHold).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        // this.getAgentRequestsToReview();
        var artr: AgentRequestToReview = this.agentRequestsToReview.find(({requestId}) => requestId === requestIdHold);
        this.agentRequestsToReview = this.agentRequestsToReview.filter(obj => obj !== artr);
        this.total -= 1;
      }
    });
  }

  updateAdminNote() {
    const adminNote = new RequestAdminNote(this.requestID, this.adminNote);
    console.log(adminNote);
    this.agentService.updateAdminNote(adminNote).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        this.getAgentRequestsToReview();
      }
    });
  }

  updatePersonalNote() {
    const personalNoteObj = new RequestPersonalNote(this.requestID, this.personalNote);
    console.log(personalNoteObj);
    this.agentService.updatePersonalNote(personalNoteObj).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        this.getAgentRequestsToReview();
      }
    });
  }


}

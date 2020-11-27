import {Component, Input, OnInit} from '@angular/core';
import {RequestPersonalNote} from '../../../admin/agent/models/request-personal-note.model';
// import {ReviewValue} from '../../../admin/agent/models/review-value.model';
import {RequestGetAgentRequests} from '../../../admin/agent/models/request-get-agent-requests.model';
import {RequestReviewRequest} from '../../../admin/agent/models/request-review-request.model';
import {RequestAdminNote} from '../../../admin/agent/models/request-admin-note.model';
import {AgentRequestToReview} from '../../../admin/agent/models/agent-request-to-review.model';
import {AgentServiceService} from '../../../admin/agent/agent-service.service';
import {DonnerToAgentRequestToReview} from '../model/donner-to-agent-request-to-review.model';
import {AgentDashboardServiceService} from '../agent-dashboard-service.service';
import {RequestSearchReview} from '../model/request-search-review.model';
import {RequestNote} from '../model/request-note.model';

@Component({
  selector: 'app-agent-dashboard-review',
  templateUrl: './agent-dashboard-review.component.html',
  styleUrls: ['./agent-dashboard-review.component.scss']
})
export class AgentDashboardReviewComponent implements OnInit {

  //start : new
  @Input()
  pageHeader = '';
  @Input()
  buttonReview = false;
  @Input()
  buttonReject = false;
  @Input()
  buttonApprove = false;
  @Input()
  buttonRemove = false;
  @Input()
  buttonDetials = false;
  @Input()
  statusType = '';

  @Input()
  modalIDAgent = '';
  @Input()
  modalIDDonner = '';
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
  agentNote: string;
  personalNote: string;

  donnerRequestsToReview: DonnerToAgentRequestToReview[] = new Array();

  // rivewValue: ReviewValue = new ReviewValue();

  constructor(private adService: AgentDashboardServiceService) {
  }

  ngOnInit() {
    if (this.statusType == '0') {
      this.headerColor = 'text-orange';
    } else if (this.statusType == 'ACCEPT') {
      this.headerColor = 'text-aqua';
    } else if (this.statusType == 'REJECT') {
      this.headerColor = 'text-danger';
    } else if (this.statusType == 'REMOVE') {
      this.headerColor = 'text-info';
    }
    this.searchKey = '';
    this.getDonnerRequestsToReview();
  }

  public getDonnerRequestsToReview() {
    var finalSearchKey = '%' + this.searchKey + '%';
    const search: RequestSearchReview = new RequestSearchReview(
      this.startRequests.toString(), this.perPage.toString(), this.searchByColumn, finalSearchKey, this.statusType);
    console.log(search);
    this.donnerRequestsToReview = [];
    this.adService.getDonnerToAgentRequestToReview(search).subscribe(res => {
      console.log('res : ' + res);
      for (const key in res) {
        var artr = new DonnerToAgentRequestToReview();

        artr.addressPermanent = res[key]['addressPermanent'];
        artr.addressPresent = res[key]['addressPresent'];

        artr.gender = res[key]['gender'];
        artr.name = res[key]['name'];
        artr.noteDonner = res[key]['noteDonner'];
        artr.noteAgent = res[key]['noteAgent'];
        artr.noteAgentPersonal = res[key]['noteAgentPersonal'];
        // console.log(res[key]['notePersonal']);

        // artr.phone_number = res[key]['phone_number'];
        artr.phone_number = '';
        for (const phoneKey in res[key]['phone_number']) {
          artr.phone_number += res[key]['phone_number'][phoneKey]['number'] + ';\n';
          // console.log(res[key]['phone_number'][phoneKey]['number']);
        }
        // console.log(artr.phone_number);
        // console.log(res[key]['phone_number']);

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
        artr.requestDate = res[key]['requestDate'];
        // artr.requestId = res[key]['requestId'];
        artr.requestId = res[key]['requestDonnerToAgentId'];
        artr.status = res[key]['status'];
        artr.userId = res[key]['userId'];
        artr.username = res[key]['username'];

        this.donnerRequestsToReview.push(artr);
      }
    });
    console.log(this.donnerRequestsToReview);
    this.adService.getDonnerToAgentRequestReviewCount(search).subscribe(res => {
      console.log(res);
      this.total = res['COUNT'];
    });
  }

  // yet to apply

  public nextPage() {
    if (this.startRequests <= this.total) {
      this.startRequests += this.perPage;
      this.getDonnerRequestsToReview();
    }
  }

  public previousPage() {
    if (this.startRequests > 0) {
      this.startRequests -= this.perPage;
      this.getDonnerRequestsToReview();
    }
  }

  public requestReject(requestIdReject: string) {
    const reviewRequestReject: RequestReviewRequest = new RequestReviewRequest(requestIdReject, 'REJECT');
    this.adService.donnerRequestReview(reviewRequestReject).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        // this.getDonnerRequestsToReview();
        var artr: DonnerToAgentRequestToReview = this.donnerRequestsToReview.find(({requestId}) => requestId === requestIdReject);
        this.donnerRequestsToReview = this.donnerRequestsToReview.filter(obj => obj !== artr);
        this.total -= 1;
      }
    });
  }

  public requestAccept(requestIdAccept: string, value: string) {
    const reviewRequestAccept: RequestReviewRequest = new RequestReviewRequest(requestIdAccept, value);
    // console.log(requestId);
    console.log(reviewRequestAccept);
    this.adService.donnerRequestReview(reviewRequestAccept).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        // this.getDonnerRequestsToReview();
        // var hist: History = this.historyDonation.find(({id}) => id === this.deleteId);
        var artr: DonnerToAgentRequestToReview = this.donnerRequestsToReview.find(({requestId}) => requestId === requestIdAccept);
        this.donnerRequestsToReview = this.donnerRequestsToReview.filter(obj => obj !== artr);
        this.total -= 1;
      }
    });
  }

  public updateAgentNote() {
    const note: RequestNote = new RequestNote(this.requestID, this.agentNote);
    console.log('this.agentNote : ' + this.agentNote);
    console.log(note);
    this.adService.updateAgentNote(note).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        this.getDonnerRequestsToReview();
      }
    });
  }

  public updateAgentPersonalNote() {
    const note = new RequestNote(this.requestID, this.personalNote);
    console.log(note);
    this.adService.updateAgentPersonalNote(note).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        this.getDonnerRequestsToReview();
      }
    });
  }

  setPersonalNote(requestId: string, notePersonal: string) {
    console.log(requestId);
    console.log(notePersonal);
    this.personalNote = notePersonal;
  }
}

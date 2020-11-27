import {Component, OnInit} from '@angular/core';
import {DonationHistoryService} from './donation-history.service';
import {SearchRequest} from './search-request.model';
import {History} from './history.model';
import {Districts} from '../profile/basic/districts.model';

@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.scss']
})
export class DonationHistoryComponent implements OnInit {
  searchBy: string;
  perPage: number;
  total: string;
  pageNumber: number;
  sortBy: string;
  searchKey: string;
  public historyDonation: History[] = new Array();

  donationDate: string;
  donationLocation: string;
  patientType: string;
  refferedBy: string;
  donationNote: string;

  deleteId: string;
  startHistory: number;

  // historyDonation = new Array();

  constructor(private serviceHistory: DonationHistoryService) {
  }

  ngOnInit() {
    this.searchBy = 'location';
    this.searchKey = '';
    this.startHistory = 0;
    this.perPage = 10;
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-blue sidebar-mini';
  }

  public searchCount() {
    var srcRequest = new SearchRequest();
    srcRequest.column = this.searchBy;
    srcRequest.key = '%' + this.searchKey + '%';
    srcRequest.start = '0';
    srcRequest.perPage = this.perPage.toString();
    srcRequest.userID = '';
    console.log(srcRequest);
    this.serviceHistory.getHistoryCount(srcRequest).subscribe(res => {
      console.log(res);
      this.total = res['COUNT'];
    });
    // userID, column, key, start
  }

  public getAll() {
    var srcRequest = new SearchRequest();
    srcRequest.column = this.searchBy;
    srcRequest.key = '%' + this.searchKey + '%';
    srcRequest.start = this.startHistory.toString();
    srcRequest.perPage = this.perPage.toString();
    srcRequest.userID = '';
    // workings
    // console.log(srcRequest);
    // this.serviceHistory.getHistory(srcRequest).subscribe(res => {
    //   console.log(res);
    //   for (const key in res) {
    //     var his = new History();
    //     his.$id = res[key]['id'];
    //     his.$date = res[key]['date'];
    //     his.$location = res[key]['location'];
    //     his.$note = res[key]['note'];
    //     his.$patient_description = res[key]['patientDescription'];
    //     his.$reffered_by = res[key]['refferedBy'];
    //     his.$user_id = res[key]['userId'];
    //     this.historyDonation.push(his);
    //   }
    // });
    this.historyDonation = this.serviceHistory.getHistory(srcRequest);
    this.searchCount();
    console.log(this.historyDonation);
  }


  public saveHistory() {
    var history = new History();
    history.$date = this.donationDate;
    history.$location = this.donationLocation;
    history.$note = this.donationNote;
    history.$patientDescription = this.patientType;
    history.$refferedBy = this.refferedBy;

    this.serviceHistory.save(history).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        history.$id = res['ID'];
        this.historyDonation.push(history);
        this.searchCount();
      }
    });
  }

  public deleteDonation() {
    console.log('delete : ' + this.deleteId);
    this.serviceHistory.delete(this.deleteId).subscribe(res => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        var hist: History = this.historyDonation.find(({id}) => id === this.deleteId);
        console.log(hist);
        this.historyDonation = this.historyDonation.filter(obj => obj !== hist);
        this.searchCount();
      }
    });
  }


  public nextPage() {
    if (this.startHistory.toString() <= this.total) {
      this.startHistory += this.perPage;
      this.getAll();
    }
  }

  public previousPage() {
    if (this.startHistory > 0) {
      this.startHistory -= this.perPage;
      this.getAll();
    }
  }
}// class

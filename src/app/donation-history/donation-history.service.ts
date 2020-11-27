import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {SearchRequest} from './search-request.model';
import {History} from './history.model';

@Injectable({
  providedIn: 'root'
})
export class DonationHistoryService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getHistoryCount(searchRequest: SearchRequest) {
    return this.http.post(
      'http://127.0.0.1:8080/public/user/history/searchCount', searchRequest,
      this.authService.getHeader());
  }

  public getHistory(srcRequest: SearchRequest): History[] {
    // working
    // return this.http.post(
    //   'http://127.0.0.1:8080/public/user/history/search', srcRequest,
    //   this.authService.getHeader());

    var h: History[] = new Array();

    this.http.post(
      'http://127.0.0.1:8080/public/user/history/search', srcRequest,
      this.authService.getHeader()).subscribe(res => {
      console.log(res);
      for (const key in res) {
        var his = new History();
        his.$id = res[key]['id'];
        his.$date = res[key]['date'];
        his.$location = res[key]['location'];
        his.$note = res[key]['note'];
        his.$patientDescription = res[key]['patientDescription'];
        his.$refferedBy = res[key]['refferedBy'];
        his.$user_id = res[key]['userId'];
        h.push(his);
      }
    });
    return h;
  }

  public save(history: History) {
    return this.http.post(
      'http://127.0.0.1:8080/public/user/history/save', history,
      this.authService.getHeader());

    //   .subscribe(res => {
    //   console.log(res);
    // });
  }

  public delete(deleteId: string) {
    return this.http.post(
      'http://127.0.0.1:8080/public/user/history/delete?historyID=' + deleteId, [],
      this.authService.getHeader());
  }
}// class

import {Component, Input, OnInit} from '@angular/core';
import {BasicService} from '../../profile/basic/basic.service';
import {PostServiceService} from '../post-service.service';
import {Post} from '../post.model';
import {PostSearch} from '../post-search.model';
import {DonnerToAgentRequestToReview} from '../../agent-dashboard/agent-dashboard/model/donner-to-agent-request-to-review.model';
import {PostType} from '../post-type.model';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

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
  modalNew = '';
  @Input()
  modalEdit = '';
  @Input()
  modalDelete = '';

  @Input()
  postType = '';

  @Input()
  reactiveButton = false;
  @Input()
  managedButton = true;
  @Input()
  expiredButton = false;


  dateType: string;
  startDate: string;
  endDate: string;

  searchBy: string;
  sortBy: string;
  orderType: string;
  searchKey: string;
  total: string;

  pageNumber: number;
  startPost: number;
  perPage: number;

  bloodPosts = new Array();

  bloods = new Array();
  quantity: string;
  anyNotes: string;
  contactInfo: string;
  blood_Group: string;
  hospitalName: string;
  bloodNeedDate: string;
  patientGender: string;
  patientRemarks: string;
  hospitalAddress: string;
  searchWithinDate: boolean;
  donationLocation: string;
  patientDescription: string;
  relationWithPatient: string;

  delete_post_id: string;

  edit_status: string;
  edit_post_id: string;
  edit_anyNotes: string;
  edit_quantity: string;
  edit_contactInfo: string;
  edit_blood_Group: string;
  edit_hospitalName: string;
  edit_bloodNeedDate: string;
  edit_patientGender: string;
  edit_patientRemarks: string;
  edit_hospitalAddress: string;
  edit_donationLocation: string;
  edit_patientDescription: string;
  edit_relationWithPatient: string;

  postTosave: Post;

  constructor(private basicService: BasicService, private postService: PostServiceService) {
  }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-blue sidebar-mini';

    this.perPage = 10;
    this.startPost = 0;
    this.dateType = 'need_date';
    this.searchKey = '';
    this.searchBy = 'need_date';
    this.sortBy = 'need_date';
    this.orderType = 'DESC';

    this.getAllPostsByAnUser();
    this.bloods = this.basicService.getBloodGroup();
    this.searchWithinDate = false;
  }

  // start : for tab in font end.
  public tabChange(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    // document.getElementById(tabName).style.background = 'pink';
    // evt.currentTarget.className += ' active';
    // console.log(evt.currentTarget.className);
    // evt.currentTarget.style.backgroundColor = 'pink';
  }

  // end : for tab in font end.

  public save(): void {
    this.postService.save(this.getPost()).subscribe((res: Response) => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        console.log('OK STATUS!');
        this.bloodPosts.push(this.postTosave);
        console.log(this.bloodPosts);
      }
    });
  }

  public saveEditPost(): void {
    this.postService.update(this.getEditPost()).subscribe((res: Response) => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        console.log('OK STATUS!');
        this.getAllPostsByAnUser();
        // this.bloodPosts.push(this.postTosave);
        // console.log(this.bloodPosts);
      }
    });
  }

  public deletePost(): void {
    this.postService.delete(this.delete_post_id).subscribe((res: Response) => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        console.log('OK STATUS!');
        this.getAllPostsByAnUser();
        // this.bloodPosts.push(this.postTosave);
        // console.log(this.bloodPosts);

      }
    });
  }

  public getAllPostsByAnUser(): void {
    var postSearch = new PostSearch();
    postSearch.dateType = this.dateType;
    postSearch.startDate = this.startDate;
    postSearch.endDate = this.endDate;
    postSearch.start = this.startPost.toString();
    postSearch.max = this.perPage.toString();
    postSearch.key = '\'%' + this.searchKey + '%\'';
    postSearch.column = this.searchBy;
    postSearch.orderBy = this.sortBy;
    postSearch.orderType = this.orderType;
    postSearch.postType = '\'' + this.postType + '\'';

    //delete
    console.log(postSearch);

    if (this.searchWithinDate === true) {
      this.postService.countAllPostsByAnUserWithinDate(postSearch).subscribe((res: string) => {
        console.log(res);
        this.total = res;
      });
      this.postService.getAllPostsByAnUserWithinDate(postSearch).subscribe((res: Response) => {
        console.log(res);
        this.bloodPosts = [];
        this.setMyPostsFromResponse(res);
      });
    } else {
      this.postService.countAllPostsByAnUser(postSearch).subscribe((res: string) => {
        console.log(res);
        this.total = res;
      });
      this.postService.getAllPostsByAnUser(postSearch).subscribe((res: Response) => {
        console.log(res);
        this.setMyPostsFromResponse(res);
      });
    }
  }

  public setMyPostsFromResponse(res: Response): void {
    this.bloodPosts = [];
    for (const key in res) {
      var post = new Post();
      post.postID = res[key]['postID'];
      post.bloodType = res[key]['bloodType'];
      post.quantity = res[key]['quantity'];
      post.needDate = res[key]['needDate'];
      post.patientGender = res[key]['patientGender'];
      post.relation = res[key]['relation'];
      post.hospitalName = res[key]['hospitalName'];
      post.hospitalAddress = res[key]['hospitalAddress'];
      post.location = res[key]['location'];
      post.contactInfo = res[key]['contactInfo'];
      post.patientDescription = res[key]['patientDescription'];
      post.remarks = res[key]['remarks'];
      post.notes = res[key]['notes'];
      post.status = res[key]['status'];
      this.bloodPosts.push(post);
    }
    console.log(this.bloodPosts);
  }

  public getPost(): Post {
    var p = new Post();
    p.status = 'ACTIVE';
    p.bloodType = this.blood_Group;
    p.quantity = this.quantity;
    p.needDate = this.bloodNeedDate;
    p.patientGender = this.patientGender;
    p.relation = this.relationWithPatient;
    p.hospitalName = this.hospitalName;
    p.hospitalAddress = this.hospitalAddress;
    p.location = this.donationLocation;
    p.contactInfo = this.contactInfo;
    p.patientDescription = this.patientDescription;
    p.remarks = this.patientRemarks;
    p.notes = this.anyNotes;
    this.postTosave = p;
    return p;
  }

  public getEditPost(): Post {
    var p = new Post();
    p.postID = this.edit_post_id;
    p.status = this.edit_status;
    p.bloodType = this.edit_blood_Group;
    p.quantity = this.edit_quantity;
    p.needDate = this.edit_bloodNeedDate;
    p.patientGender = this.edit_patientGender;
    p.relation = this.edit_relationWithPatient;
    p.hospitalName = this.edit_hospitalName;
    p.hospitalAddress = this.edit_hospitalAddress;
    p.location = this.edit_donationLocation;
    p.contactInfo = this.edit_contactInfo;
    p.patientDescription = this.edit_patientDescription;
    p.remarks = this.edit_patientRemarks;
    p.notes = this.edit_anyNotes;
    this.postTosave = p;
    return p;
  }

  public setPostsForEdit(p: Post): void {
    this.edit_post_id = p.postID;
    this.edit_status = p.status;
    this.edit_blood_Group = p.bloodType;
    this.edit_quantity = p.quantity;
    this.edit_bloodNeedDate = p.needDate;
    this.edit_patientGender = p.patientGender;
    this.edit_relationWithPatient = p.relation;
    this.edit_hospitalName = p.hospitalName;
    this.edit_hospitalAddress = p.hospitalAddress;
    this.edit_donationLocation = p.location;
    this.edit_contactInfo = p.contactInfo;
    this.edit_patientDescription = p.patientDescription;
    this.edit_patientRemarks = p.remarks;
    this.edit_anyNotes = p.notes;
  }

  public nextPage(): void {
    if (this.startPost.toString() <= this.total) {
      this.startPost += this.perPage;
      this.getAllPostsByAnUser();
    }
  }

  public previousPage(): void {
    if (this.startPost > 0) {
      this.startPost -= this.perPage;
      this.getAllPostsByAnUser();
    }
  }

  public bloodManaged(p: Post): void {
    p.status = 'MANAGED'
    console.log(p.status);
    this.postService.update(p).subscribe((res: Response) => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        console.log('OK STATUS!');
        this.getAllPostsByAnUser();
        // this.bloodPosts.push(this.postTosave);
        // console.log(this.bloodPosts);
      }
    });
  }

  public postReactive(p: Post) {
    p.status = 'ACTIVE';
    this.postService.update(p).subscribe((res: Response) => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        console.log('OK STATUS!');
        this.getAllPostsByAnUser();
        // this.bloodPosts.push(this.postTosave);
        // console.log(this.bloodPosts);
      }
    });
  }

  public setPostExpired(p: Post) {
    p.status = 'EXPIRED';
    this.postService.update(p).subscribe((res: Response) => {
      console.log(res);
      if (res['STATUS'] === 'OK') {
        console.log('OK STATUS!');
        this.getAllPostsByAnUser();
        // this.bloodPosts.push(this.postTosave);
        // console.log(this.bloodPosts);
      }
    });
  }
}

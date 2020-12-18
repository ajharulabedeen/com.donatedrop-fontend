import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoginComponent} from '../../login/login/login.component';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from 'src/app/auth/auth.service';
import {Router} from '@angular/router';
import {BasicService} from '../../profile/basic/basic.service';
import * as fromTraining from '../../profile/training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-asidenavbar',
  templateUrl: './asidenavbar.component.html',
  styleUrls: ['./asidenavbar.component.scss']
})
export class AsidenavbarComponent implements OnInit, OnDestroy {

  isAuthenticated = true;//have to make false
  private userSub: Subscription;

  currentUserName$ : Observable<string>;

  profile = true;
  loggedIn = LoginComponent.loggedIn;

  constructor(private authService: AuthService,
              private router: Router,
              private basicService : BasicService,
              private store: Store<fromTraining.State>) {}

  ngOnInit() {
    this.currentUserName$ = this.store.select(fromTraining.getAvailableExercises);
    //TODO: delete
    console.log(this.currentUserName$);

    console.log('Asidebar onInit() : ');
    this.userSub = this.authService.user.subscribe(user => {
      console.log('Auth Subscriber: ');
      this.isAuthenticated = !!user;
      console.log('B:' + !user);
      console.log('A:' + !!user);
    });
  }//onInit

  public logOut() {
    this.isAuthenticated = false;
    this.userSub.unsubscribe();
    this.authService.removeToken();
    console.log(' Log Out : isAuthenticated ' + this.isAuthenticated);
    this.router.navigate(['/home']);
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}//class

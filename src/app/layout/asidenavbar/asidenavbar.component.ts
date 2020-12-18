import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoginComponent} from '../../login/login/login.component';
import {Subscription} from 'rxjs';
import {AuthService} from 'src/app/auth/auth.service';
import {Router} from '@angular/router';
import {BasicService} from '../../profile/basic/basic.service';

@Component({
  selector: 'app-asidenavbar',
  templateUrl: './asidenavbar.component.html',
  styleUrls: ['./asidenavbar.component.scss']
})
export class AsidenavbarComponent implements OnInit, OnDestroy {

  isAuthenticated = true;//have to make false
  private userSub: Subscription;

  currentUserName = "Current User Name!";

  profile = true;
  loggedIn = LoginComponent.loggedIn;

  constructor(private authService: AuthService,
              private router: Router,
              private basicService : BasicService
  ) {
  }

  public logOut() {
    this.isAuthenticated = false;
    this.userSub.unsubscribe();
    this.authService.removeToken();
    console.log(' Log Out : isAuthenticated ' + this.isAuthenticated);
    this.router.navigate(['/home']);
  }

  ngOnInit() {

    this.basicService.currentBasic.subscribe(cb=>{
        this.currentUserName = cb.$name;
    });

    //TODO: delete
    console.log(this.currentUserName);

    console.log('Asidebar onInit() : ');
    this.userSub = this.authService.user.subscribe(user => {
      console.log('Auth Subscriber: ');
      this.isAuthenticated = !!user;
      console.log('B:' + !user);
      console.log('A:' + !!user);
    });
  }//onInit

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}//class

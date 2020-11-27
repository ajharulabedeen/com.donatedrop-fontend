import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './public/about/about.component';
import {NewsComponent} from './public/news/news.component';
import {EventsComponent} from './public/events/events.component';
import {RegisterComponent} from './public/register/register.component';
import {LoginComponent} from './login/login/login.component';
import {AuthComponent} from './auth/auth.component';
import {ProfileComponent} from './profile/profile/profile.component';
import {TimelineComponent} from './profile/timeline/timeline.component';
import {FileUploaderTestComponent} from './file-uploader-test/file-uploader-test.component';
import {EventManageComponent} from './event/event-manage/event-manage.component';
import {RecordClearComponent} from './record-clear/record-clear.component';
import {DonationHistoryComponent} from './donation-history/donation-history.component';
import {PersonalInfoComponent} from './profile/personal-info/personal-info.component';
import {AgentComponent} from './admin/agent/agent.component';
import {AgentDashboardComponent} from './agent-dashboard/agent-dashboard/agent-dashboard.component';
import {ParentComponent} from './test/parent/parent.component';
import {MyPostsComponent} from './post/my-posts/my-posts.component';
import {PostComponent} from './post/post.component';
import {PostDetailsComponent} from './post/post-details/post-details.component';
import {UserPostsComponent} from './post/user-posts/user-posts.component';


const routes: Routes = [
  // {path: '', redirectTo: 'login', pathMatch: 'full'}
  // {path: '', redirectTo: 'dashboard', pathMatch: 'full'}//working
  // {path: 'about', redirectTo: 'about', pathMatch: 'full'},//not working
  {path: 'about', component: AboutComponent},
  {path: 'news', component: NewsComponent},
  {path: 'events', component: EventsComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin_login', component: LoginComponent},
  {path: 'admin', component: AuthComponent},
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'file', component: FileUploaderTestComponent},
  {path: 'event', component: EventManageComponent},
  // {path: 'record', component: RecordRtcComponent},
  {path: 'rec', component: RecordClearComponent},
  {path: 'user/profile', component: ProfileComponent},
  {path: 'user/donation_history', component: DonationHistoryComponent},
  {path: 'user/my_posts', component: PostComponent},
  {path: 'user/user_posts', component: UserPostsComponent},
  {path: 'user/personal_info', component: PersonalInfoComponent},
  {path: 'user/agent', component: AgentComponent},
  {path: 'user/agent/dashboard', component: AgentDashboardComponent},
  {path: 'parent', component: ParentComponent},
  {path: 'post_details/:post_id', component: PostDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

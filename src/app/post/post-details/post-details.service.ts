import {Injectable} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {Post} from '../post.model';
import {PostcommentWithUserInfo} from './postcomment-with-user-info.model';
import {CommentSave} from './comment-save.model';
import {CommentDelete} from './comment-delete.model';
import {UserPublicContact} from '../../model/user-public-contact.model';

@Injectable({
  providedIn: 'root'
})
export class PostDetailsService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  public findOnePostByIDNoComment(postID: string) {
    return this.http.post<Post>('http://localhost:8080/public/user/post/findOnePostByIDNoComment?postID=' + postID, this.authService.getHeader());
  }

  public getCommentWithUserInfo(postID: string) {
    return this.http.post<PostcommentWithUserInfo[]>('http://localhost:8080/public/user/post/getCommentWithUserInfo?postID=' + postID, this.authService.getHeader());
  }

  saveComment(commentSave: CommentSave) {
    return this.http.post<any>('http://localhost:8080/public/user/post/saveComment', commentSave, this.authService.getHeader());
  }

  deleteComment(commentDelete: CommentDelete) {
    return this.http.post<any>('http://localhost:8080/public/user/post/deleteComment', commentDelete, this.authService.getHeader());
  }

  getUserPublicContact(userID: string) {
    return this.http.post<UserPublicContact>('http://localhost:8080/public/getUserPublicContact?userID=' + userID, this.authService.getHeader());
  }

  getUserPublicContactService(userID: string) {
    return this.http.get<UserPublicContact>('http://localhost:8080/public/getUserPublicContact?userID=' + userID, this.authService.getHeader());
  }
}

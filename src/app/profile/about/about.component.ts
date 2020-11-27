import { Component, OnInit } from '@angular/core';
import { About } from './about.model';
import { AboutService } from './about.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private aboutService: AboutService) { }

  public Editor = ClassicEditor;

  id: string;
  user_id: string;
  about_me: string;

  aboutEdit = false;
  aboutExist = false;

  ngOnInit() {

    this.aboutExist = false;
    console.log("this.aboutExist  : " + this.aboutExist);
    this.aboutService.getCurrentUserAbout();
    this.aboutService.about.subscribe(a => {
      for (const key in a) {
        switch (key) {
          case "id": {
            this.id = a[key];
            break;
          }
          case "user_id": {
            this.user_id = a[key];
            break;
          }
          case "about_me": {
            this.about_me = a[key];
            break;
          }
          default: {
            // console.log("Invalid choice");
            break;
          }
        }
      }//for

    });
    console.log("this.basicExist  : " + this.aboutExist);
  }

  public model = {
    editorData: '<p>Hello, world!</p>'
  };


  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  public editAbout() {
    this.aboutEdit = !this.aboutEdit;
  }

  public save() {
    this.Editor.get
    this.editAbout();
    this.aboutService.create(this.getAbout());
  }

  public update() {
    this.editAbout();
    this.aboutService.update(this.getAbout());
  }



  /**
   * name
   */
  public getAbout(): About {
    var about = new About();
    about.$about_me = this.about_me;
    return about;
  }


}//class

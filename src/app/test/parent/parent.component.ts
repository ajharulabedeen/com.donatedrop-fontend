import {Component, OnInit} from '@angular/core';
import {Student} from '../student.model';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent {

  parentTitle = 'Parent Component';

  // Property for child component one
  cityMsg = 'Indian City Names';
  cityArray = ['Varanasi', 'Delhi', 'Mumbai'];
  stdAddMsg = 'Add Student';
  stdAddMsg1 = 'Add Student';
  rejectValue = '0';

  // Property for child component two
  stdMsg = 'Student Leader Detail';
  stdLeaderObj: Student = new Student('Narendra', 'Modi');

// Property for child component two
  stdMsgAK = 'Student Leader Detail';
  stdLeaderObjAK: Student = new Student('Arbind', 'Kejriwal');


  // Property used in parent
  stdFullName = '';
  stdFullName1 = '';
  sum = '';
  msg = '';

  saveData(std) {
    this.stdFullName = std.fname + ' ' + std.lname;
    console.log('stdFullName > ' + this.stdFullName);
  }

  saveData1(std) {
    console.log('saveData1');
    this.stdFullName1 = std.fname + ' ' + std.lname;
    console.log('stdFullName1' + this.stdFullName1);
  }

  printSum(res) {
    this.sum = res;
  }

  printMsg(msg) {
    this.msg = msg;
  }

}

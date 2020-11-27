import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:8080';
  }
}

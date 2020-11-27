import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-record-rtc',
  templateUrl: './record-rtc.component.html',
  styleUrls: ['./record-rtc.component.scss']
})
export class RecordRtcComponent {

  //Lets initiate Record OBJ
  private record;
  //Will use this flag for detect recording
  private recording = false;
  //Url of Blob
  private url;
  private error;
  constructor(private domSanitizer: DomSanitizer) {
  }
  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
   * Start recording.
   */
  initiateRecording() {

    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }
  /**
   * Will be called automatically.
   */
  successCallback(stream) {
    var options = {
      // mimeType: "audio/wav",
      mimeType: "audio/mp3",
      numberOfAudioChannels: 1
    };
    this.record = null;
   this.url = null;
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  /**
   * Stop recording.
   */
  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }
  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {

    this.url = URL.createObjectURL(blob);
  }
  /**
   * Process Error.
   */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }



}//class

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from './audio-recording.service';

@Component({
  selector: 'app-record-clear',
  templateUrl: './record-clear.component.html',
  styleUrls: ['./record-clear.component.scss']
})
export class RecordClearComponent implements OnDestroy {

  isRecording = false;
  recordedTime;
  blobUrl;
  recording = new Array();


  constructor(private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer) {

    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    console.log(this.blobUrl);
    this.recording.push(this.blobUrl);
    console.log("Length : " + this.recording.length);
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

}//class

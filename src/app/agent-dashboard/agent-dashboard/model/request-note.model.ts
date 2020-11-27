export class RequestNote {
  public note: string;
  public requestId: string;

  constructor(requestId: string, note: string) {
    this.requestId = requestId;
    this.note = note;
  }
}

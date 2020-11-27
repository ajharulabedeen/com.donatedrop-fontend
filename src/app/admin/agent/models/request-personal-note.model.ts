export class RequestPersonalNote {
  public requestId: string;
  public personalNote: string;

  constructor(requestId: string, personalNote: string) {
    this.requestId = requestId;
    this.personalNote = personalNote;
  }
}

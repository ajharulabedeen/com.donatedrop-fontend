export class RequestAdminNote {
  public requestId: string;
  public adminNote: string;

  constructor(requestId: string, adminNote: string) {
    this.requestId = requestId;
    this.adminNote = adminNote;
  }
}

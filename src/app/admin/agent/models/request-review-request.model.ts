export class RequestReviewRequest {
  public requestID: string;
  public value: string;

  constructor(requestID: string, value: string) {
    this.requestID = requestID;
    this.value = value;
  }
}


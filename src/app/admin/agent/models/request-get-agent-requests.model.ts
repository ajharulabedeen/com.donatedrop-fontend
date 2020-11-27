export class RequestGetAgentRequests {
  public start: string;
  public max: string;
  public column: string;
  public key: string;
  public statusType: string;

  constructor(start: string, max: string, column: string, key: string, statusType: string) {
    this.start = start;
    this.max = max;
    this.column = column;
    this.key = key;
    this.statusType = statusType;
  }
}

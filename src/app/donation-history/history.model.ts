export class History {
  public id: string;
  private date: string;
  private location: string;
  private note: string;
  private patientDescription: string;
  private user_id: string;

  /**
   * Getter $refferedBy
   * @return {string}
   */
  public get $refferedBy(): string {
    return this.refferedBy;
  }

  /**
   * Setter $refferedBy
   * @param {string} value
   */
  public set $refferedBy(value: string) {
    this.refferedBy = value;
  }

  private refferedBy: string;


  /**
   * Getter $patientDescription
   * @return {string}
   */
  public get $patientDescription(): string {
    return this.patientDescription;
  }

  /**
   * Setter $patientDescription
   * @param {string} value
   */
  public set $patientDescription(value: string) {
    this.patientDescription = value;
  }


  /**
   * Getter $id
   * @return {string}
   */
  public get $id(): string {
    return this.id;
  }

  /**
   * Getter $date
   * @return {string}
   */
  public get $date(): string {
    return this.date;
  }

  /**
   * Getter $location
   * @return {string}
   */
  public get $location(): string {
    return this.location;
  }

  /**
   * Getter $note
   * @return {string}
   */
  public get $note(): string {
    return this.note;
  }

  /**
   * Getter $user_id
   * @return {string}
   */
  public get $user_id(): string {
    return this.user_id;
  }

  /**
   * Setter $id
   * @param {string} value
   */
  public set $id(value: string) {
    this.id = value;
  }

  /**
   * Setter $date
   * @param {string} value
   */
  public set $date(value: string) {
    this.date = value;
  }

  /**
   * Setter $location
   * @param {string} value
   */
  public set $location(value: string) {
    this.location = value;
  }

  /**
   * Setter $note
   * @param {string} value
   */
  public set $note(value: string) {
    this.note = value;
  }

  /**
   * Setter $user_id
   * @param {string} value
   */
  public set $user_id(value: string) {
    this.user_id = value;
  }


}

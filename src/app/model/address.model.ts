export class Address {
  private id: string;
  private division: string;
  private district: string;
  private upzilla: string;
  private union_ward: string;
  private street_address: string;
  public type: string;


  /**
   * Getter $id
   * @return {string }
   */
  public get $id(): string {
    return this.id;
  }

  /**
   * Getter $division
   * @return {string }
   */
  public get $division(): string {
    return this.division;
  }

  /**
   * Getter $district
   * @return {string }
   */
  public get $district(): string {
    return this.district;
  }

  /**
   * Getter $upzilla
   * @return {string }
   */
  public get $upzilla(): string {
    return this.upzilla;
  }

  /**
   * Getter $union_ward
   * @return {string }
   */
  public get $union_ward(): string {
    return this.union_ward;
  }

  /**
   * Getter $street_address
   * @return {string }
   */
  public get $street_address(): string {
    return this.street_address;
  }

  /**
   * Setter $id
   * @param {string } value
   */
  public set $id(value: string) {
    this.id = value;
  }

  /**
   * Setter $division
   * @param {string } value
   */
  public set $division(value: string) {
    this.division = value;
  }

  /**
   * Setter $district
   * @param {string } value
   */
  public set $district(value: string) {
    this.district = value;
  }

  /**
   * Setter $upzilla
   * @param {string } value
   */
  public set $upzilla(value: string) {
    this.upzilla = value;
  }

  /**
   * Setter $union_ward
   * @param {string } value
   */
  public set $union_ward(value: string) {
    this.union_ward = value;
  }

  /**
   * Setter $street_address
   * @param {string } value
   */
  public set $street_address(value: string) {
    this.street_address = value;
  }


}

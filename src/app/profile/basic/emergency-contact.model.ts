export class EmergencyContact {
  private id: string;
  private name: string;
  private phone: string;
  private mail: string;
  private address: string;
  private relation: string;

  /**
   * Getter $id
   * @return {string}
   */
  public get $id(): string {
    return this.id;
  }

  /**
   * Getter $name
   * @return {string}
   */
  public get $name(): string {
    return this.name;
  }

  /**
   * Getter $phone
   * @return {string}
   */
  public get $phone(): string {
    return this.phone;
  }

  /**
   * Getter $mail
   * @return {string}
   */
  public get $mail(): string {
    return this.mail;
  }

  /**
   * Getter $address
   * @return {string}
   */
  public get $address(): string {
    return this.address;
  }

  /**
   * Getter $relation
   * @return {string}
   */
  public get $relation(): string {
    return this.relation;
  }

  /**
   * Setter $id
   * @param {string} value
   */
  public set $id(value: string) {
    this.id = value;
  }

  /**
   * Setter $name
   * @param {string} value
   */
  public set $name(value: string) {
    this.name = value;
  }

  /**
   * Setter $phone
   * @param {string} value
   */
  public set $phone(value: string) {
    this.phone = value;
  }

  /**
   * Setter $mail
   * @param {string} value
   */
  public set $mail(value: string) {
    this.mail = value;
  }

  /**
   * Setter $address
   * @param {string} value
   */
  public set $address(value: string) {
    this.address = value;
  }

  /**
   * Setter $relation
   * @param {string} value
   */
  public set $relation(value: string) {
    this.relation = value;
  }

  public toString() {
    return 'id : ' + this.id +
      '\nname : ' + this.name +
      '\naddress : ' + this.address +
      '\nphone : ' + this.phone +
      '\nmail : ' + this.mail +
      '\nrelation : ' + this.relation;


    // console.log('id : ' + this.id);
    // console.log('name : ' + this.name);
    // console.log('address : ' + this.address);
    // console.log('phone : ' + this.phone);
    // console.log('mail : ' + this.mail);
    // console.log('relation : ' + this.relation);
  }


}

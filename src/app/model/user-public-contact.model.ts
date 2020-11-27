import {PhoneNumber} from '../profile/basic/phone-number.model';

export class UserPublicContact {
  public contactType: string;
  public name: string;
  public email: string;
  public phoneNumbers: Array<PhoneNumber>;
}

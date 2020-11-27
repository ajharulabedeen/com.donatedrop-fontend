import {PhoneNumber} from '../profile/basic/phone-number.model';
import {Address} from './address.model';
import {EmergencyContact} from '../profile/basic/emergency-contact.model';

export class ProfileDetails {
  public id: string;
  public userId: string;
  public name: string;
  public birthDate: string;
  public care_of: string;
  public gender: string;
  public maritalStatus: string;
  public profession: string;
  public blood_Group: string;
  public available: string;
  public religion: string;
  public email: string;
  public profileFound: boolean;
  public lastBloodGiven: string;
  public address: Array<Address>;
  public phone_number: Array<PhoneNumber>;
  public emergency_contact: Array<EmergencyContact>
}

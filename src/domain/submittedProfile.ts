import {
  CONSENT_PROFILE_LEAD_TYPE,
  GROUP_STATE_CARD_AND_LOAN,
  PARTNER_ID,
  PRODUCT_TYPE,
} from '~/constants/enums';

export type SubmittedProfile = {
  productName: string;
  imageUrl: string;
  partnerId: PARTNER_ID;
  productType: PRODUCT_TYPE;
  groupState: GROUP_STATE_CARD_AND_LOAN;
  leadType: CONSENT_PROFILE_LEAD_TYPE;
  leadId: string;
  stateText: string;
  stateClassName: string;
  createdAt: number;
};

export type DetailSubmittedProfile = {
  name: string;
  dob: number;
  gender: number;
  currentAddressStreet: string;
  currentAddressWard: string;
  currentAddressDistrict: string;
  currentAddressProvince: string;
  selfieImageUrl: string;
  icFrontImageUrl: string;
  icBackImageUrl: string;
  phone: string;
  vehiclePlate: string;
  frameNumber: string;
  machineNumber: string;
  ic: string;
  issueDate: number;
  oldIc: string;
  maritalStatus: any;
  referencePersonName: string;
  referencePersonPhone: string;
  referencePersonRelationship: any;
  referencePersonName2: string;
  referencePersonPhone2: string;
  referencePersonRelationship2: any;
  email: string;
  emergencyPhone: string;
  partnerId: number;
  jobId: number;
  productType: PRODUCT_TYPE;
  productName: string;
  groupState: GROUP_STATE_CARD_AND_LOAN;
  imageUrl: string;
  leadType: CONSENT_PROFILE_LEAD_TYPE;
  leadId: string;
  displayGender?: string;
  displayMaritalStatus?: string;
  displayJob?: string;
  displayLocation?: string;
  displayDob?: string;
  displayIssueDate?: string;
};

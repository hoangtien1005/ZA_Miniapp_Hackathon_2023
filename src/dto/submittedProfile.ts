import { MAP_GROUP_STATE_CARD_AND_LOAN_TEXT } from '~/constants';
import {
  CONSENT_PROFILE_LEAD_TYPE,
  GROUP_STATE_CARD_AND_LOAN,
  PARTNER_ID,
  PRODUCT_TYPE,
} from '~/constants/enums';
import {
  DetailSubmittedProfile,
  SubmittedProfile,
} from '~/domain/submittedProfile';

export type SubmittedProfileDTO = {
  partner_id: PARTNER_ID;
  product_type: PRODUCT_TYPE;
  product_name: string;
  group_state: GROUP_STATE_CARD_AND_LOAN;
  product_image_url: string;
  lead_type: CONSENT_PROFILE_LEAD_TYPE;
  lead_id: string;
  created_at;
};

export type DetailSubmittedProfileDTO = {
  name: string;
  dob: number;
  gender: number;
  current_address_street: string;
  current_address_ward_code: string;
  current_address_district_code: string;
  current_address_province_code: string;
  selfie_image_url: string;
  ic_front_image_url: string;
  ic_back_image_url: string;
  phone: string;
  vehicle_plate: string;
  frame_number: string;
  machine_number: string;
  ic: string;
  issue_date: number;
  old_ic: string;
  marital_status: any;
  reference_person_name: string;
  reference_person_phone: string;
  reference_person_relationship: any;
  reference_person_name2: string;
  reference_person_phone2: string;
  reference_person_relationship2: any;
  email: string;
  emergency_phone: string;
  partner_id: number;
  job_id: number;
  product_type: PRODUCT_TYPE;
  product_name: string;
  group_state: GROUP_STATE_CARD_AND_LOAN;
  product_image_url: string;
  lead_type: CONSENT_PROFILE_LEAD_TYPE;
  lead_id: string;
};

export const submittedProfileFromDTO = (
  dto: SubmittedProfileDTO
): SubmittedProfile => {
  if (!dto || Object.keys(dto).length <= 0) return {} as SubmittedProfile;
  return {
    productName: dto.product_name,
    imageUrl: dto.product_image_url,
    partnerId: dto.partner_id,
    productType: dto.product_type,
    groupState: dto.group_state,
    leadType: dto.lead_type,
    leadId: dto.lead_id,
    stateText: MAP_GROUP_STATE_CARD_AND_LOAN_TEXT[dto.group_state].text,
    stateClassName:
      MAP_GROUP_STATE_CARD_AND_LOAN_TEXT[dto.group_state].className,
    createdAt: dto.created_at,
  };
};

export const detailSubmittedProfileFromDTO = (
  dto: DetailSubmittedProfileDTO
): DetailSubmittedProfile => {
  if (!dto || Object.keys(dto).length <= 0) return {} as DetailSubmittedProfile;
  return {
    name: dto.name,
    dob: dto.dob,
    gender: dto.gender,
    currentAddressStreet: dto.current_address_street,
    currentAddressWard: dto.current_address_ward_code,
    currentAddressDistrict: dto.current_address_district_code,
    currentAddressProvince: dto.current_address_province_code,
    selfieImageUrl: dto.selfie_image_url,
    icFrontImageUrl: dto.ic_front_image_url,
    icBackImageUrl: dto.ic_back_image_url,
    phone: dto.phone,
    vehiclePlate: dto.vehicle_plate,
    frameNumber: dto.frame_number,
    machineNumber: dto.machine_number,
    ic: dto.ic,
    issueDate: dto.issue_date,
    oldIc: dto.old_ic,
    maritalStatus: dto.marital_status,
    referencePersonName: dto.reference_person_name,
    referencePersonPhone: dto.reference_person_phone,
    referencePersonRelationship: dto.reference_person_relationship,
    referencePersonName2: dto.reference_person_name2,
    referencePersonPhone2: dto.reference_person_phone2,
    referencePersonRelationship2: dto.reference_person_relationship2,
    email: dto.email,
    emergencyPhone: dto.emergency_phone,
    partnerId: dto.partner_id,
    jobId: dto.job_id,
    productType: dto.product_type,
    productName: dto.product_name,
    groupState: dto.group_state,
    imageUrl: dto.product_image_url,
    leadType: dto.lead_type,
    leadId: dto.lead_id,
  };
};

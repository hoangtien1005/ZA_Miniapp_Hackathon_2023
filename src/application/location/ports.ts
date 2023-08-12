export interface LocationServiceApp {
  getLocations: () => Promise<any>;
  getDistrict: (locationId) => Promise<any>;
  getWard: (districtId) => Promise<any>;
}

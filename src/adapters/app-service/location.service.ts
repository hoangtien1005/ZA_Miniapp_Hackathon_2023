import { BaseApiService } from '../baseApi.service';

class LocationService extends BaseApiService {
  getLocations(): Promise<any> {
    const path = 'website/location/province';
    return super
      .get(this.generateUrl(path))
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {};
      });
  }

  getDistrict(locationId): Promise<Array<any>> {
    const path = 'website/location/district';
    return super
      .get(this.generateUrl(path), { province: locationId })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {};
      });
  }

  getWard(districtId): Promise<number> {
    const path = 'website/location/ward';
    return super
      .get(this.generateUrl(path), { district: districtId })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return {};
      });
  }
}

export const useLocationService = () => new LocationService();

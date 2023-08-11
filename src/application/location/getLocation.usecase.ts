import { useLocationService } from '~/adapters/app-service/location.service';
import { LocationServiceApp } from '~/application/location/ports';

export function useGetLocation() {
  const locationService: LocationServiceApp = useLocationService();

  async function getLocations(): Promise<any> {
    return locationService.getLocations();
  }

  async function getDistrict(locationId): Promise<number> {
    return locationService.getDistrict(locationId);
  }

  async function getWard(districtId): Promise<number> {
    return locationService.getWard(districtId);
  }

  return {
    getLocations,
    getDistrict,
    getWard,
  };
}

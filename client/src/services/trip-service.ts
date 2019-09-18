import { Trip } from '../models/trip';
import { TripDay } from '../models/trip-day';
import { ApiService } from './api-service';

const SERVER_URL = 'http://localhost:3000/api';

export class TripService {
  apiService = new ApiService();

  getTripList(requestBody: any): any {
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('POST', `${SERVER_URL}/trip`, requestBody, searchParams, formParams);
  }

  getTripDetail(tripId: number): any {
    const requestBody = {};
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('GET', `${SERVER_URL}/trip/${tripId}`, requestBody, searchParams, formParams);
  }

  createTrip(requestBody: Trip): any {
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('POST', `${SERVER_URL}/trip/create`, requestBody, searchParams, formParams);
  }

  createTripDay(requestBody: TripDay): any {
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('POST', `${SERVER_URL}/trip/day/create`, requestBody, searchParams, formParams);
  }

  updateTrip(requestBody: Trip): any {
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('PUT', `${SERVER_URL}/trip/update`, requestBody, searchParams, formParams);
  }

  updateTripDay(requestBody: TripDay): any {
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform('PUT', `${SERVER_URL}/trip/day/update`, requestBody, searchParams, formParams);
  }

  deleteTripDay(tripDayId: number): any {
    const requestBody = {};
    const searchParams = {};
    const formParams = {};

    return this.apiService.perform(
      'DELETE',
      `${SERVER_URL}/trip/day/${tripDayId}`,
      requestBody,
      searchParams,
      formParams
    );
  }
}

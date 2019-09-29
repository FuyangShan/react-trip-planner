import { map, remove, sortBy } from 'lodash';
import { Actions } from '../../constants/actions';
import { TripState } from '../../constants/types';
import { Event as TripEvent } from '../../models/event';
import { Trip } from '../../models/trip';
import { TripDay } from '../../models/trip-day';
import { parseToLocalTime } from '../helpers';

const tripList: Trip[] = [];
const tripDetail: Trip = {
  id: 0,
  timezone_id: 0,
  start_date: '',
  end_date: '',
  name: '',
  destination: '',
  archived: false,
  trip_day: [],
};

const initialState: TripState = {
  isLoading: false,
  tripList,
  tripDetail,
};

export const tripReducers = (state: TripState = initialState, action: any) => {
  switch (action.type) {
    case Actions.FETCHING_TRIP_LIST:
      return {
        ...state,
        isLoading: true,
      };

    case Actions.FETCHING_TRIP_LIST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case Actions.FETCHING_TRIP_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tripList: action.tripList,
      };

    case Actions.FETCHING_TRIP_DETAIL:
      return {
        ...state,
        isLoading: true,
      };

    case Actions.FETCHING_TRIP_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case Actions.FETCHING_TRIP_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tripDetail: action.tripDetail,
      };

    case Actions.CREATING_TRIP:
      return {
        ...state,
        isLoading: true,
      };

    case Actions.CREATING_TRIP_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case Actions.CREATING_TRIP_SUCCESS:
      const newTrip = action.trip;
      newTrip.trip_day = [];

      state.tripList.push(newTrip);
      state.tripList = sortBy(state.tripList, (trip: Trip) => trip.start_date);

      return {
        ...state,
        isLoading: false,
      };

    case Actions.CREATING_TRIP_DAY:
      return {
        ...state,
        isLoading: true,
      };

    case Actions.CREATING_TRIP_DAY_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case Actions.CREATING_TRIP_DAY_SUCCESS:
      const newTripDay = action.tripDay;
      newTripDay.events = [];

      state.tripDetail.trip_day.push(newTripDay);
      state.tripDetail.trip_day = sortBy(state.tripDetail.trip_day, (tripDay: TripDay) => tripDay.trip_date);

      return {
        ...state,
        isLoading: false,
      };

    case Actions.CREATING_TRIP_EVENT:
      return {
        ...state,
        isLoading: true,
      };

    case Actions.CREATING_TRIP_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case Actions.CREATING_TRIP_EVENT_SUCCESS:
      const tripEvent = parseToLocalTime(action.tripEvent, state.tripDetail.timezone_id);
      map(state.tripDetail.trip_day, (tripDay: TripDay) => {
        if (tripDay.id === tripEvent.trip_day_id) {
          tripDay.events.push(tripEvent);
          tripDay.events = sortBy(tripDay.events, (event: TripEvent) => event.start_time);
        }
        return tripDay;
      });

      return {
        ...state,
        isLoading: false,
      };

    case Actions.DELETING_TRIP_DAY:
      return {
        ...state,
        isLoading: true,
      };

    case Actions.DELETING_TRIP_DAY_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case Actions.DELETING_TRIP_DAY_SUCCESS:
      remove(state.tripDetail.trip_day, (tripDay: TripDay) => tripDay.id === action.tripDayId);
      return {
        ...state,
        isLoading: false,
      };

    case Actions.DELETING_TRIP_EVENT:
      return {
        ...state,
        isLoading: true,
      };

    case Actions.DELETING_TRIP_EVENT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case Actions.DELETING_TRIP_EVENT_SUCCESS:
      map(state.tripDetail.trip_day, (tripDay: TripDay) => {
        if (tripDay.id === action.tripEvent.trip_day_id) {
          remove(tripDay.events, tripEvent => tripEvent.id === action.tripEvent.id);
        }
        return tripDay;
      });
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

import {ReservationStatus} from "../../reservation.status";

export interface GuestReservation {
  id: number;
  accommodation: number;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  status: ReservationStatus;
  price: number;
  photos: string[];
}

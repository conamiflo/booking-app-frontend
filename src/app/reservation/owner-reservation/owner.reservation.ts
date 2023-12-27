import {ReservationStatus} from "../reservation.status";

export interface OwnerReservation {
  id : number,
  accommodation : number,
  guest : string,
  startDate : string,
  endDate : string,
  numberOfGuests : number,
  status: ReservationStatus,
  price : number,
  cancelledReservations : number
}

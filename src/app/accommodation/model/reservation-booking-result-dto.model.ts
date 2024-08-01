export interface ReservationBookingResultDTO {
  id: number;
  accommodation: string;
  guest: string;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  status: ReservationStatus;
  price: number | null; // Use number or null depending on the possibility of a null value
}
export enum ReservationStatus {
  Accepted = 'Accepted',
  Declined = 'Declined',
  Waiting = 'Waiting'
}

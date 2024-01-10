export interface Review{
  id: number,
  guestEmail: string,
  description: string,
  rating: number,
  date: number,
  reported: boolean,
  ownerEmail: string,
  accommodationId: number,
  approved: boolean
}

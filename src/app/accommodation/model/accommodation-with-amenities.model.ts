import {AmenityBackend} from "./amenity-backend.model";

export interface AccommodationWithAmenities {
  id: number;
  name: string;
  description: string;
  location: string;
  defaultPrice: number;
  photos: string[];
  minGuests: number;
  maxGuests: number;
  type: string;
  amenities: AmenityBackend[];
}

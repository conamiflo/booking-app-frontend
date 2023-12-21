import {PriceType} from "./price-type.model";
import {AccommodationStatus} from "./accommodation.status";

export interface AccommodationDetails{
  id: number;
  ownerEmail: string;
  name: string;
  description: string;
  location: string;
  defaultPrice: number;
  photos: string[];
  minGuests: number;
  maxGuests: number;
  created: Date;
  type: string;
  priceType: PriceType;
  status: AccommodationStatus;
}

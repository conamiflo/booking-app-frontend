import {Amenity} from "./amenity.model";
import {AccommodationTypeCheckBox} from "./accommodation-type.model";

export interface AccommodationFilterModel {
  minimumPrice: number;
  maximumPrice: number;
  amenities : Amenity[];
  type: AccommodationTypeCheckBox[];
}

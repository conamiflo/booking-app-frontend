import {AfterViewInit, Component, ElementRef, Input, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';
import {MapService} from "./map.service";
import {Accommodation} from "../../accommodation/model/accommodation.model";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private mapInitializedPromise: Promise<void>;
  private mapInitializedResolver: () => void;
  constructor(private mapService: MapService, private elementRef: ElementRef) {
    this.mapInitializedPromise = new Promise<void>((resolve) => {
      this.mapInitializedResolver = resolve;
    });
  }
  @Input() locationToSearch: string; // New input property
  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.registerOnClick();
    this.search();
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
    });
  }

  search(): void {
    this.mapService.search(this.locationToSearch).subscribe({
      next: (result) => {
        console.log(result);
        L.marker([result[0].lat, result[0].lon])
          .addTo(this.map)
          .bindPopup(this.locationToSearch)
          .openPopup();
      },
      error: () => {},
    });
  }

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'assets/external/location.svg',
      iconSize: [60, 50],
      iconAnchor: [30, 50],
      popupAnchor:  [0, -50]
    });
    this.initMap();
  }

}

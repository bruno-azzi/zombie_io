import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

import { InputComponent } from './../input/input.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MapComponent),
      multi: true
    }
  ]
})

export class MapComponent implements OnInit {

  @Input() formControl: FormControl;

  @ViewChild('search')
  public inputRef: InputComponent;

  theme = [
    {
      stylers: [
        {
          hue: '#ff1a00'
        },
        {
          invert_lightness: true
        },
        {
          saturation: -100
        },
        {
          lightness: 33
        },
        {
          gamma: 0.5
        }
      ]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#1f1f22'
        }
      ]
    }
  ];

  restriction = {
    latLngBounds: {
      north: 85.0,
      south: -85.0,
      west: -180.0,
      east: 180.0
    },
    strictBounds: true
  };

  lon: number;
  lat: number;
  zoom = 12;
  minZoom = 4;
  geolocationDisabled = false;
  geolocationNotSupported = false;
  tooltipText: string;

  constructor(
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader
  ) { }

  ngOnInit(): void {
    this.checkIfGeolocationIsEnabled();
    this.initPlacesAutocomplete();

    if (!this.formControl.value) {
      this.setCurrentLocation();
    } else {
      const lat = +this.formControl.value.split(' ')[0];
      const lon = +this.formControl.value.split(' ')[1];

      this.updateLocation(lon, lat);
    }
  }

  initPlacesAutocomplete() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.inputRef.searchElementRef.nativeElement);

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude
          this.updateLocation(place.geometry.location.lng(), place.geometry.location.lat());
        });
      });
    });
  }

  checkIfGeolocationIsEnabled() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {
        this.geolocationDisabled = false;
      }, error => {
        if (error.PERMISSION_DENIED) {
          this.geolocationDisabled = true;
          this.tooltipText = 'You must activate geolocation in your browser!';
        }
      });
    } else {
      this.geolocationNotSupported = false;
      this.tooltipText = 'Geolocation not supported in this browser!';
    }
  }

  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.updateLocation(position.coords.longitude, position.coords.latitude);
      }, error => {
        /** Check if user declined the geolocation popup */
        this.geolocationDisabled = true;
        this.tooltipText = 'You must activate geolocation in your browser!';
        this.updateLocation(0, 0);
        this.zoom = this.minZoom;
      });
    } else {
      this.geolocationNotSupported = false;
      this.tooltipText = 'Geolocation not supported in this browser!';
      this.updateLocation(0, 0);
    }
  }

  onDragEnd(event) {
    const lon = event.latLng.lng();
    const lat = event.latLng.lat();

    if ((lat >= -85.0 && lat <= 85.0) && (lon >= -180.0 && lon <= 180.0)) {
      this.updateLocation(lon, lat);
    } else {
      this.updateLocation(0, 0);
    }
  }

  updateLocation(lon, lat) {
    this.lon = lon;
    this.lat = lat;
    this.formControl.patchValue(`${lat} ${lon}`);
  }

  writeValue(): void {}

  registerOnChange(): void {}

  registerOnTouched(): void {}

}

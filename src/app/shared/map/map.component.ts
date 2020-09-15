import { InputComponent } from './../input/input.component';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Component, forwardRef, Input, NgZone, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

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

  lon: number;
  lat: number;
  zoom = 15;
  geoCoder;
  showMap = true;

  constructor(
    private ngZone: NgZone,
    private mapsAPILoader: MapsAPILoader
  ) { }

  ngOnInit(): void {
    this.initPlacesAutocomplete();
  }

  initPlacesAutocomplete() {
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

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

  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(() => {
        this.showMap = true;
        navigator.geolocation.getCurrentPosition(position => {
          this.updateLocation(position.coords.longitude, position.coords.latitude);
        });
      }, error => {
        /** Check if user declined the geolocation popup */
        if (error.code === error.PERMISSION_DENIED) {
          this.showMap = false;
        }
      });
    } else {
      console.log('else')
      this.showMap = false;
    }
  }

  onDragEnd(event) {
    this.updateLocation(event.latLng.lng(), event.latLng.lat());
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

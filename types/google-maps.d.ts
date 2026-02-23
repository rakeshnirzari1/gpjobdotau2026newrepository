declare namespace google.maps {
  interface MapsLibrary {
    Map: typeof google.maps.Map
    Marker: typeof google.maps.Marker
    InfoWindow: typeof google.maps.InfoWindow
  }

  interface GeocodingLibrary {
    Geocoder: typeof google.maps.Geocoder
  }
}

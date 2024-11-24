import { useMapEvents, Marker } from "react-leaflet";

type Props = {
  position?: { lat: number; lng: number };
  onLocationChange?: (lat: number, lng: number) => void;
};

export const LocationMarker = (props: Props) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      props.onLocationChange && props.onLocationChange(lat, lng);
    },
  });

  return props.position ? (
    <Marker position={[props.position.lat, props.position.lng]}></Marker>
  ) : null;
};

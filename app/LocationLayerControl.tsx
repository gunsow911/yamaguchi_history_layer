import { useEffect, useRef } from "react";
import L from "leaflet";
import { GeoJsonObject } from "geojson";
import { useMapEvents } from "react-leaflet";

export type Props = {
  position?: { lat: number; lng: number };
  geoJsonList: GeoJsonObject[];
};

const LocationLayerControl = (props: Props) => {
  const ref = useRef(null);

  useMapEvents({
    click(e) {
      const clickedLatLng = e.latlng;

      // フィーチャーを走査して重なっているデータを収集
      const features = props.geoJsonList.flatMap((geojson) => geojson.features);
      features.filter((feature) => {
        const layer = L.geoJSON(feature); // フィーチャーをLeafletレイヤーに変換
        return layer.getBounds().contains(clickedLatLng);
      });
      console.log(features);

      // const overlappingFeatures = props.geoJsonList
      //   .flatMap((geojson) => geojson.features)
      //   .features.filter((feature) => {
      //     const layer = L.geoJSON(feature); // フィーチャーをLeafletレイヤーに変換
      //     return layer.getBounds().contains(clickedLatLng); // クリック位置が含まれるか判定
      //   });
      // console.log(overlappingFeatures);
    },
  });

  useEffect(() => {
    if (ref.current) {
      const disableClickPropagation = L.DomEvent.disableClickPropagation;
      disableClickPropagation(ref.current);
    }
  }, []);

  return (
    <div className="leaflet-top leaflet-right w-1/4">
      <div className="leaflet-control leaflet-bar top-20 p-2 bg-white text-gray-900 w-full"></div>
    </div>
  );
};

export default LocationLayerControl;

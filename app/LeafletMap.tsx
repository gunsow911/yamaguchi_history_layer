import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useIsekiData } from "./useIsekiData";
import { toEraList } from "./utils";
import EraLayerControl, { EraLayerInput } from "./EraLayerControl";
import { FormProvider, useForm } from "react-hook-form";

export default function LeafletMap() {
  const iseki = useIsekiData();
  // const site = useSiteData();
  //
  const form = useForm<EraLayerInput>({
    reValidateMode: "onSubmit",
    defaultValues: {
      era: 1,
    },
  });

  form.watch();

  return (
    <FormProvider {...form}>
      <MapContainer
        style={{ width: "100%", height: "100dvh" }}
        center={{ lat: 34.18583, lng: 131.47139 }}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {iseki && (
          <GeoJSON
            data={iseki}
            style={(feature) => {
              const eraString = feature?.properties["時代"] as string | null;
              const eras = toEraList(eraString ?? "");
              if (
                eras.filter((era) => era.order == form.getValues().era).length >
                0
              ) {
                return { opacity: 1, fillOpacity: 0.3, color: "red" };
              }
              return { opacity: 0, fillOpacity: 0 };
            }}
            onEachFeature={(feature) => {
              console.log(feature.properties["種別"]);
            }}
          />
        )}

        {/* site && <GeoJSON data={site} /> */}
        <EraLayerControl />
      </MapContainer>
    </FormProvider>
  );
}

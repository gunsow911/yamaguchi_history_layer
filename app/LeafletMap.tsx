import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useIsekiData } from "./useIsekiData";
import { getSiteTypeFromName, toEraList } from "./utils";
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
              const pastNumber = eras
                .map((era) => form.getValues().era - era.order)
                .reduce((prev, current) => {
                  if (current < prev) return current;
                  return prev;
                }, 8);
              if (pastNumber < 0) {
                return {
                  opacity: 0,
                  fillOpacity: 0,
                };
              }
              const site = getSiteTypeFromName(
                feature?.properties["種別"] ?? ""
              );
              return {
                opacity: 1 - pastNumber * 0.15,
                fillOpacity: 0.8 - pastNumber * 0.15,
                color: site.color,
              };
            }}
          />
        )}

        {/* site && <GeoJSON data={site} /> */}
        <EraLayerControl />
      </MapContainer>
    </FormProvider>
  );
}

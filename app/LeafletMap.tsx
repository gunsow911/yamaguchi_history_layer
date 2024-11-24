import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useIsekiData } from "./useIsekiData";
import {
  getIsekiSiteFromName,
  getSiteType,
  getYouchiSiteFromNumber,
  toEraList,
} from "./utils";
import EraLayerControl, { EraLayerInput } from "./EraLayerControl";
import { FormProvider, useForm } from "react-hook-form";
import LegendControl from "./LegendControl";
import { useSiteData } from "./useSiteData";

export default function LeafletMap() {
  const iseki = useIsekiData();
  const site = useSiteData();

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
              const site = getIsekiSiteFromName(
                feature?.properties["種別"] ?? ""
              );
              const siteType = getSiteType(site);
              return {
                opacity: 1 - pastNumber * 0.1,
                fillOpacity: 0.8 - pastNumber * 0.09,
                color: siteType.color,
              };
            }}
          />
        )}
        {site && form.getValues().era == 9 && (
          <GeoJSON
            data={site}
            style={(feature) => {
              const youchiString = feature?.properties["A29_004"] as
                | number
                | null;
              const site = getYouchiSiteFromNumber(youchiString ?? 99);
              const siteType = getSiteType(site);
              return {
                color: siteType.color,
              };
            }}
          />
        )}
        <EraLayerControl />
        <LegendControl />
      </MapContainer>
    </FormProvider>
  );
}

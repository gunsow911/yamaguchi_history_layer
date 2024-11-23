import { useCallback, useEffect, useState } from "react";
import { GeoJsonObject } from "geojson";

/**
 * 用地のデータを取得する
 */
export const useSiteData = () => {
  const [data, setData] = useState<GeoJsonObject>();

  const load = useCallback(async () => {
    const filepath = "/data/site.json";
    const response = await fetch(filepath);
    const json = (await response.json()) as GeoJsonObject;
    setData(json);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return data;
};

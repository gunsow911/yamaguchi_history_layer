import { useCallback, useEffect, useState } from "react";
import { GeoJsonObject } from "geojson";

/**
 * 遺跡のデータを取得する
 */
export const useIsekiData = () => {
  const [data, setData] = useState<GeoJsonObject>();

  const load = useCallback(async () => {
    const filepath = "/data/iseki.json";
    const response = await fetch(filepath);
    const json = (await response.json()) as GeoJsonObject;
    setData(json);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return data;
};

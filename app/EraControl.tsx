import { useFormContext, useWatch } from "react-hook-form";
import { getEraFromOrder } from "./utils";
import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";

export type EraInput = {
  era: number;
};

const EraControl = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const disableClickPropagation = L.DomEvent.disableClickPropagation;
      disableClickPropagation(ref.current);
    }
  }, []);

  const { register } = useFormContext<EraInput>();
  const eraNumber = useWatch({ name: "era" });

  const eraName = useMemo(() => {
    const era = getEraFromOrder(eraNumber);
    return era?.display ?? "";
  }, [eraNumber]);

  return (
    <div ref={ref} className="leaflet-top leaflet-right mb-4 w-2/3">
      <div className="leaflet-control leaflet-bar p-2 bg-white text-gray-900 w-2/3">
        <div className="pb-1">
          <div>
            <b className="text-lg">{eraName}</b>
          </div>
          <div className="flex items-center">
            <input
              className="w-full"
              type="range"
              min="1"
              max="9"
              step="1"
              {...register("era")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EraControl;

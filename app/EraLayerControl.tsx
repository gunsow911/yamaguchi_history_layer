import { useFormContext, useWatch } from "react-hook-form";
import { getEraFromOrder } from "./utils";
import { useMemo } from "react";

export type EraLayerInput = {
  era: number;
};

const EraLayerControl = () => {
  const { register } = useFormContext<EraLayerInput>();
  const eraNumber = useWatch({ name: "era" });

  const eraName = useMemo(() => {
    const era = getEraFromOrder(eraNumber);
    return era?.name ?? "";
  }, [eraNumber]);

  return (
    <div className="leaflet-top leaflet-right mb-4 w-64">
      <div className="leaflet-control leaflet-bar p-2 bg-white text-gray-900">
        <div className="pb-2">
          <div>
            <b>{eraName}時代</b>
          </div>
          <div className="flex items-center">
            <input type="range" min="1" max="8" step="1" {...register("era")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EraLayerControl;

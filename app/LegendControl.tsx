import { japanYouchiSiteList } from "./utils";

const LegendControl = () => {
  return (
    <div className="leaflet-bottom leaflet-right mb-4 w-64">
      <div className="leaflet-control leaflet-bar p-2 bg-white text-gray-900">
        <div>
          {japanYouchiSiteList.map((site, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-6 h-3`}
                style={{ backgroundColor: site.color }}
              ></div>
              <div className="ml-2">{site.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegendControl;

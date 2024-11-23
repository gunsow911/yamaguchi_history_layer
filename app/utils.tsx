import { Era, SiteType } from "./type";

// const japanSiteList: SiteType[] = [{}];

const japanEraList: Era[] = [
  {
    order: 1,
    name: "旧石器",
  },
  {
    order: 2,
    name: "縄文",
  },
  {
    order: 3,
    name: "弥生",
  },
  {
    order: 4,
    name: "古墳",
  },
  {
    order: 5,
    name: "奈良",
  },
  {
    order: 6,
    name: "平安",
  },
  {
    order: 7,
    name: "中世",
  },
  {
    order: 8,
    name: "近世",
  },
];

export const getEraFromOrder = (order: number): Era | undefined => {
  const era = japanEraList.find((era) => {
    return era.order == order;
  });
  if (era) {
    return era;
  }
  return undefined;
};

const getEraListFromRange = (start: Era, end: Era): Era[] => {
  // startとendの間にあるEraを取得する
  const eraList: Era[] = [];
  japanEraList.forEach((era) => {
    if (start.order <= era.order && era.order <= end.order) {
      eraList.push(era);
    }
  });
  return eraList;
};

const getEraFromString = (value: string): Era | undefined => {
  const era = japanEraList.find((era) => era.name === value);
  if (era) {
    return era;
  }
  return undefined;
};

export const toEraList = (eraString: string) => {
  // 〜が含まれている場合
  if (eraString.includes("〜")) {
    const [start, end] = eraString.split("〜");
    const startEra = getEraFromString(start);
    const endEra = getEraFromString(end);
    if (endEra === undefined || startEra === undefined) {
      return [];
    }
    return getEraListFromRange(startEra, endEra);
  }
  const eraStrings = eraString.split("、");
  return eraStrings
    .map((eraString) => getEraFromString(eraString))
    .filter((era) => era !== undefined) as Era[];
};

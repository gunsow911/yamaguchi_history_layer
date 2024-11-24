import { Era, SiteType } from "./type";

export type SiteEnum = "Zyuukyo" | "Shougyou" | "Kougyou" | "Unknown";

export const japanYouchiSiteList: SiteType[] = [
  {
    color: "#D62728",
    name: "住居用地",
  },
  {
    color: "#2CA02C",
    name: "商業用地",
  },
  {
    color: "#1F77B4",
    name: "工業用地",
  },
  {
    color: "#8C564B",
    name: "不明",
  },
];

export const japanIsekiSiteList: SiteType[] = [
  {
    color: "#1F77B4",
    name: "散布地",
  },
  {
    color: "#FF7F0E",
    name: "集落跡",
  },
  {
    color: "#2CA02C",
    name: "城館跡",
  },
  {
    color: "#D62728",
    name: "生産遺跡",
  },
  {
    color: "#9467BD",
    name: "社寺跡",
  },
  {
    color: "#E377C2",
    name: "埋葬跡",
  },
  {
    color: "#8C564B",
    name: "その他の遺跡",
  },
];

export const japanEraList: Era[] = [
  {
    order: 1,
    name: "旧石器",
    display: "旧石器時代(約250万年前〜約1万年前)",
  },
  {
    order: 2,
    name: "縄文",
    display: "縄文時代(約1万3,000年前〜紀元前10世紀頃)",
  },
  {
    order: 3,
    name: "弥生",
    display: "弥生時代(紀元前10世紀頃〜3世紀頃)",
  },
  {
    order: 4,
    name: "古墳",
    display: "古墳時代(3世紀中頃〜7世紀末)",
  },
  {
    order: 5,
    name: "奈良",
    display: "奈良時代(710年〜794年)",
  },
  {
    order: 6,
    name: "平安",
    display: "平安時代(794年〜1185年)",
  },
  {
    order: 7,
    name: "中世",
    display: "中世(1185年〜1573年)",
  },
  {
    order: 8,
    name: "近世",
    display: "近世(1573年〜1868年)",
  },
  {
    order: 9,
    name: "現代",
    display: "現代",
  },
];

export const getSiteType = (site: SiteEnum): SiteType => {
  if (site === "Zyuukyo") {
    return {
      color: "#D62728",
      name: "住居用地",
    };
  }
  if (site === "Shougyou") {
    return {
      color: "#2CA02C",
      name: "商業用地",
    };
  }
  if (site === "Kougyou") {
    return {
      color: "#1F77B4",
      name: "工業用地",
    };
  }
  return {
    color: "#8C564B",
    name: "不明",
  };
};

export const getYouchiSiteFromNumber = (num: number): SiteEnum => {
  const jyuukyoNumber = [1, 2, 3, 4, 5, 6, 7, 21];
  const shougyouNumber = [8, 9];
  const kougyouNunber = [10, 11, 12];

  if (jyuukyoNumber.includes(num)) {
    return "Zyuukyo";
  }
  if (shougyouNumber.includes(num)) {
    return "Shougyou";
  }
  if (kougyouNunber.includes(num)) {
    return "Kougyou";
  }
  return "Unknown";
};

const getYouchiSiteFromIseki = (iseki: SiteType): SiteEnum => {
  const jyuukyo = ["散布地", "集落跡", "城館跡", "埋葬跡"];
  const shougyou = ["社寺跡"];
  const kougyou = ["生産遺跡"];

  if (jyuukyo.includes(iseki.name)) {
    return "Zyuukyo";
  }
  if (shougyou.includes(iseki.name)) {
    return "Shougyou";
  }
  if (kougyou.includes(iseki.name)) {
    return "Kougyou";
  }
  return "Unknown";
};

export const getIsekiSiteFromName = (name: string): SiteEnum => {
  const site = japanIsekiSiteList.find((site) => {
    return name.includes(site.name);
  });
  if (site) {
    return getYouchiSiteFromIseki(site);
  }
  return "Unknown";
};

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

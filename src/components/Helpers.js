// This files contains helper functions

export const keyFinder = (arr, name) => {
  const result = arr.find(x => x.name === name);
  return result.key;
};

export const linkDataDetails = allData => {
  const linkData = allData.map((data, i) => ({
    key: -(i + 1),
    from: data.from == "" || keyFinder(allData, data.from) == -1 ? "" : keyFinder(allData, data.from),
    to: data.to == "" || keyFinder(allData, data.to) == -1 ? data.key : keyFinder(allData, data.to),
  }));

  return linkData;
};

export const removeObjectDuplicate = allArray =>
  allArray.filter((item, ind) => ind === allArray.findIndex(elem => elem.key === item.key && elem.id === item.id));

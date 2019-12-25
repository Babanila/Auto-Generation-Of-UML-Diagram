// This file contains helper functions

export const keyFinder = (arr, name) => {
  const result = arr.find(x => x.name === name);
  return result.key;
};

export const linkDataDetails = allData => {
  const linkData = allData.map((data, i) => ({
    key: -(i + 1),
    from: data.from === null ? "" : keyFinder(allData, data.from),
    to: data.to === null ? data.key : keyFinder(allData, data.to),
  }));

  return linkData;
};

export const removeObjectDuplicate = allArray =>
  allArray.filter((item, ind) => ind === allArray.findIndex(elem => elem.key === item.key && elem.id === item.id));

export const checkForDuplicate = (allArray, objKey) =>
  allArray.filter(elem => elem.name === objKey || elem.key === objKey).length > 0;

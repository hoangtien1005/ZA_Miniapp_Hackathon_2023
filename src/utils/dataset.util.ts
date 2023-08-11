/* eslint-disable eqeqeq */
export const findById = (id: number, dataset) => {
  return findOneFromDataset({ id }, dataset);
};

export const findOneFromDataset = (filter, dataset) => {
  return dataset.find((item) =>
    Object.keys(filter).some((field) => item[field] == filter[field])
  );
};

export const findListFromDataset = (ids, dataset) => {
  return ids.reduce((prev, curr) => {
    const index = dataset.findIndex((item) => item?.id === curr);
    if (index > -1) {
      return [...prev, dataset[index]];
    }
    return prev;
  }, []);
};

export const findFromDataset = (filter, dataset) => {
  return Object.keys(filter).length === 0 && filter.constructor === Object
    ? dataset
    : dataset.filter((item) =>
        Object.keys(filter).some((field) => item[field] == filter[field])
      );
};

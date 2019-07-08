// accepts 1) an array of objects 2) a prop
// returns an array of values of keys
export const mapArrByProps = (arrOfObjs, prop) => {
  return arrOfObjs.map(elem => {
    return elem[prop];
  });
};

// accepts 1) an array of objects 2) a key 3) an array of values
// returns a filtered array of objects from the first argument
export const filterArrByKey = (arrToFilter, key, filterCriteriaArr) => {
  return filterCriteriaArr.map(criterion => {
    return arrToFilter.find(elem => {
      return elem[key] == criterion;
    });
  });
};

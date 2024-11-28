
export function removeEmptyValuesFromObject(object) {

  for (let key in object) {
    if (!object[key]) delete object[key];
  }
  return object;
};
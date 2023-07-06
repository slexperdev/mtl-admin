export const setLocalStorage = async (key, value) => {
  try {
    await localStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getFromLocalStorage = async (key) => {
  try {
    let retrieveItem = await localStorage.getItem(key);
    return retrieveItem;
  } catch (e) {
    console.error(e);
  }
};

export const removeFromLocalStorage = async (key) => {
  try {
    let retrieveItem = await localStorage.removeItem(key);
    return retrieveItem;
  } catch (e) {
    console.error(e);
  }
};

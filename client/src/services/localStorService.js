function saveToStorage(storageKey, dataToSave) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
}

function getFromStorage(storageKey) {
  try {
    const data = localStorage.getItem(storageKey);
    return data === null ? undefined : JSON.parse(data);
  } catch (err) {
    console.warn("Cannot parse JSON from localStorage");
    return null;
  }
}

function removeItem(storageKey) {
  localStorage.removeItem(storageKey);
}

function clearData() {
  localStorage.clear();
}

export { clearData, getFromStorage, saveToStorage, removeItem };

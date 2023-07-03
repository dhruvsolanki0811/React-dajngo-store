const useLocalStorageSetItem= (itemName,itemValue) => localStorage.setItem(itemName,itemValue);
const useLocalStorageGetItem= (itemName)=>localStorage.getItem(itemName);
export {useLocalStorageSetItem,useLocalStorageGetItem}

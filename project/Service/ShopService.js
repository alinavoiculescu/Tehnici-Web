const shopRepository = require("../Repository/ShopRepository");
const uuid = require("uuid");


module.exports.getAllShops = () => {
    let shopsList = shopRepository.readJSONFile();
    return shopsList;
}

module.exports.addShop = (newShop) => {
    const shopsList = shopRepository.readJSONFile();
    newShop.id = uuid.v4.apply();

    shopsList.push(newShop);
    shopRepository.writeJSONFile(shopsList);

  return newShop;
}

module.exports.getShopById = (id) => {
  const shopsList = shopRepository.readJSONFile();
  let foundShop = null
  shopsList.forEach(shop => {
      if(shop.id === id) {
          foundShop = shop;
      }
  });

  return foundShop;
}

module.exports.updateShop = (id, newShop) => {
  const shopsList = shopRepository.readJSONFile();
  for(let i = 0; i < shopsList.length; i++) {
      if(shopsList[i].id === id) {
        if(newShop.name) {
            shopsList[i].name = newShop.name;
        }

        if(newShop.img) {
            shopsList[i].img = newShop.img;
        }
        
        shopRepository.writeJSONFile(shopsList);
        return shopsList[i];
      }
  }
  return null;
}

module.exports.deleteShop = (id) => {
  const shopsList = shopRepository.readJSONFile();
  for(let i = 0; i < shopsList.length; i++) {
      if(shopsList[i].id === id) {
          shopsList.splice(i, 1);
          shopRepository.writeJSONFile(shopsList)
          return true;
      }
  }

  return false;
}

module.exports.getShopsByCategory = (category) => {
  const shopsList = shopRepository.readJSONFile();
  let shopsToReturn = [];
  if(category == "" || category == null || category == undefined) {
    return shopsList;
  }

  for(let i = 0; i < shopsList.length; i++) {
    if(shopsList[i].categories.includes(category)) {
      shopsToReturn.push(shopsList[i]);
    }
  }

  return shopsToReturn;
}
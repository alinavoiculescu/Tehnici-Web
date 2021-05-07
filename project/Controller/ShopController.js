var express = require("express");
var router = express.Router();

const shopService = require("../Service/ShopService");

router.get("/shops", (req, res) => {
    const shopsList = shopService.getAllShops();
    if(shopsList != undefined && shopsList.length != 0) {
        res.status(200).send(shopsList);
    } else {
        res.status(404).send("Nu au fost găsite magazine!");
    }
});

//Create
router.post("/shops", (req, res) => {
    let newShop = shopService.addShop(req.body);
    res.status(200).send(newShop);
});

//Afisarea unui magazin dupa id
router.get("/shops/:id", (req, res) => {
    let id = req.params.id;
    let shop = shopService.getShopById(id);
    console.log(shop);

    if(shop != null && shop != undefined) {
        res.status(200).send(shop);
    } else {
        res.status(404).send("Magazinul căutat nu a fost găsit!");
    }
});

//Update
router.put("/shops/:id", (req, res) => {
    let id = req.params.id;
    let shop = shopService.updateShop(id, req.body);

    if(shop != null && shop != undefined) {
        res.status(200).send(shop);
    } else {
        res.status(404).send("Magazinul pe care doriți să îl modificați nu a fost găsit!");
    }
});
  
//Delete
router.delete("/shops/:id", (req, res) => {
    let id = req.params.id;
    let Delete = shopService.deleteShop(id);

    if(Delete === true) {
        res.status(200).send("Magazinul a fost șters!");
    } else {
        res.status(404).send("Magazinul nu a fost găsit!");
    }
});

router.get("/shops/filter/property", (req, res) => {
    let category = req.query.category;
    let shops = shopService.getShopsByCategory(category);
    if(shops.length != 0) {
        res.status(200).send(shops);
    } else {
        res.status(404).send("Nu a fost găsit niciun magazin!");
    }
});

module.exports = router;
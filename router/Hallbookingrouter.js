const express=require("express");
const router=express.Router();
const hallbookingModule= require("../modules/Hallbooking");

router.post("/createRoom",hallbookingModule.createRoom);
router.post("/createRoombooking",hallbookingModule.createRoombooking);
router.get("/listRooms",hallbookingModule.listRooms);
router.get("/listCustomers",hallbookingModule.listCustomers);

module.exports=  router;
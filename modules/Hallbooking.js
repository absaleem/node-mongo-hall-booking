const { ObjectID } = require("bson");
const  mongo  = require("../connect.js")
  
module.exports.createRoom=async(req,res,next)=>{
    try{
      responseInserted = await mongo.selectedDB.collection("rooms").insertOne(req.body);
      res.send(responseInserted);
    }catch(error){
        console.error(error);
        res.status(500).send(error);
    }

};

module.exports.createRoombooking=async(req,res,next)=>{
     alreadyexists=(await mongo.selectedDB.collection("room_booking").find(
        {
            $and: [
                {'room_id': req.body.room_id},
                {'booked_date': req.body.booked_date},
                {'start_time': req.body.start_time},
                {'end_time': req.body.end_time},
            ]
        }
       ).count() > 0);
    if(alreadyexists){
        res.send({"msg":'Customer already booked on this date and time'});
    }else{

     try{

      responseInserted = await mongo.selectedDB.collection("room_booking").insertOne(req.body);
      res.send(responseInserted);
     
    }catch(error){
    
        console.error(error);
        res.status(500).send(error);
     }
   }
};


module.exports.listRooms= async(req,res,next)=>{
    try{

     listBookedrooms = await mongo.selectedDB.collection("rooms").aggregate(
        [
            {
                $lookup: {
                    from: 'room_booking',
                    localField : 'id',
                    foreignField: 'room_id',
                    as: 'rooms_booked_data'
                }
            }
        ]
    ).toArray();
     res.send(listBookedrooms);
    }catch(error){ 
        res.status(500).send(error);
    }
};


module.exports.listCustomers= async(req,res,next)=>{
    try{

        listBookedcustomers = await mongo.selectedDB.collection("room_booking").aggregate(
           [
               {
                   $lookup: {
                       from: 'rooms',
                       localField : 'room_id',
                       foreignField: 'id',
                       as: 'customers_booked_data'
                   }
               }
           ]
       ).toArray();
        res.send(listBookedcustomers);
       }catch(error){ 
           res.status(500).send(error);
       }};

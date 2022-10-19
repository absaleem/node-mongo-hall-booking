const { MongoClient } = require("mongodb");


module.exports={
    selectedDB:{ },
    async connect(){
            try{
              const client=  await MongoClient.connect(process.env.MONGODB_URL);
              this.selectedDB=client.db("hall_booking");
              console.log(this.selectedDB);  
            }
            catch(error){
                console.log(error);
            }
    }
}

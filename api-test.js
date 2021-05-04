const fetch = require('node-fetch');
const express = require("express")
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.urlencoded({extended: true}));

let url = "http://3.1.189.234:8091/data/ttntest";

let settings = { method: "Get" };



app.get("/getdata",(req, res)=>{
  fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
      let seperateData = seperate(json)
      let calculateData = calculate(json)
      let predictOneDayData = predictOneDay(calculateData.max.data)
      let predictSevenDayData = predictSevenDay(calculateData.max.data)
      let sendData = {seperateData:seperateData, minMaxAvg:calculateData, predictOneDay:predictOneDayData, predictSevenDay: predictSevenDayData}
      res.json(sendData)
     
    });
})





    function calculate(array){
  
    let minData= array[0];
    let maxData= array[array.length-1];
    let averageData= calculateAverage(array);

    return {min: minData, max: maxData, avg:  averageData}
    }




    function predictOneDay(data){
      let predictOneDayContainer=[];
      predictOneDayContainer.push(data+0.41);
      let i;
      for(i=0; i<=1646; i++){
        predictOneDayContainer.push(predictOneDayContainer[i]+0.41);
      }
      return predictOneDayContainer;
    }
    
    function predictSevenDay(data){
      let predictSevenDayContainer=[];
      predictSevenDayContainer.push(data+0.41);
      let i;
      for(i=0; i<=11522; i++){
        predictSevenDayContainer.push(predictSevenDayContainer[i]+0.41);
      }
      return predictSevenDayContainer;
    }
    

    function seperate(array){
      let dataContainer=[];
      let seperateContainer=[];
      let i;
      let j;
      for(i=0; i<=140; i++){
        for(j=0; j<=199; j++){
          seperateContainer.push(array[j])
        }
        j+=199
        dataContainer.push(seperateContainer);
      }
      return dataContainer;
    }



    function calculateAverage(array){
        let total = 0;
        let count = 0;

      array.forEach(element => {
        let data = element.data
        total += data;
        count++
      });
      return total / count;
    }

  


    app.listen(3000,function(){
      console.log("Server is online");
    });

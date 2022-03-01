// ODM URL
const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=1e420c2d&t=' ;



// Manual Search 
function manualSearch() { 

  const moviename = document.getElementById('moviename');
  const result =  document.getElementById('movieresult');
  

  fetch(url+moviename.value)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    result.innerText = 'Manual Response: '+JSON.stringify(value);


  })
  .catch(function(err) {
      console.log("error while fetching");
  });


}


// AutoSearch 

function autoSearch(){

const search = document.getElementById('lastMessageUnique-search');
const response =  document.getElementById('lastMessageUnique-response');
const customerMessages = [];
var LastcustomerMessage = "";

lpTag.agentSDK.init();


var updateCallback = function(data) {
  var path = data.key;
  var value = data.newValue;

  console.log('update call back Path : ', path);
  console.log('update call back Value : ', value);
  

  value.forEach( element => {
    if(element.source == 'visitor') {
      customerMessages.push(element.text);
      LastcustomerMessage= customerMessages[customerMessages.length - 1];
    }
  });
  console.log("customer messages: ",customerMessages);
  console.log("LastcustomerMessage: ",LastcustomerMessage);

};


var notifyWhenDone = function(err) {
  if (err) {
    console.log("error when notifying");
  }
  console.log("Bind Done");
 
};



// Binding 
  var pathToData = "chatTranscript.lines";
  lpTag.agentSDK.bind(pathToData, updateCallback, notifyWhenDone);

  
   search.innerText = "Auto Search: " + LastcustomerMessage;
 
    
   //API  Better add a tiemeout ifor controlling



   setTimeout(function () {

    fetch(url+LastcustomerMessage)

    .then(function(res) {
      if (res.ok) {
          return res.json();
        }
    })

    .then(function(value) {
        console.log(value);
        response.innerText = 'Auto Response: '+JSON.stringify(value);

        })

    .catch(function(err) {
      console.log("error while fetching");
      }); 


    },10000);
}

function resetForm(){
    
  const form = document.getElementById('newform').reset();
  
  

}
function searchMovieName() { 

  const moviename = document.getElementById('moviename');
  const result =  document.getElementById('movieresult');
  const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=1e420c2d&t=' ;


  fetch(url+moviename.value)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    result.innerText = JSON.stringify(value);



  })
  .catch(function(err) {
      console.log("error while fetching");
  });


}





function searchLastMessage(){

const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=1e420c2d&t=' ;
const response =  document.getElementById('search-by-msg-response');
const searchString = document.getElementById('search-by-msg-string');
const customerMessages = [];
var LastcustomerMessage = "";

lpTag.agentSDK.init();

var updateCallback = function(data) {
  var path = data.key;
  var value = data.newValue;
console.log('update call back Path : ', value);
console.log('update call back Value : ', value);
  value.forEach( elem => {
    if(elem.source == 'visitor') {
      customerMessages.push(elem.text);
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



  var pathToData = "chatTranscript.lines";
  lpTag.agentSDK.bind(pathToData, updateCallback, notifyWhenDone);
  
  
  setTimeout(function () {
    // do what you want
       const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=1e420c2d&t=' ;
        searchString.innerText = "Search String: "+ LastcustomerMessage;
         console.log("Search string:" , searchString)
      
        fetch(url+LastcustomerMessage)
    .then(function(res) {
    if (res.ok) {
        return res.json();
    }
    })
    .then(function(value) {
    console.log(value);
    response.innerText = JSON.stringify(value);

    })
    .catch(function(err) {
    console.log("error while fetching");
}); }, 5000);



}


function resetValues(){
  
const form = document.getElementById('search-by-title-form').reset();



}

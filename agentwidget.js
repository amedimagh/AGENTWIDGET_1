

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


  const response =  document.getElementById('search-by-msg-response');
  const searchString = document.getElementById('search-by-msg-string');
  const customerMessages = [];
  var t ="";
  lpTag.agentSDK.init();
  
  var updateCallback = function(data) {
    var value = data.newValue;
    value.forEach( elem => {
      if(elem.source == 'visitor') {
        customerMessages.push(elem.text);
      }
    });
    console.log("customer messages: ",customerMessages);
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
          searchString.innerText = "Search String: "+ customerMessages[customerMessages.length - 1];
          t = customerMessages[customerMessages.length - 1];
          fetch(url+t)
           .then(res => res.json())
              .then((out) => {
                  //console.log('Output: ', out);
                  response.innerText = 'Search by Message Response: '+JSON.stringify(out);
              
              }).catch(err => errorTxt.innerText = err);
          
    }, 6000);


  
}



function resetValues(){
    
  const form = document.getElementById('search-by-title-form').reset();
  
  

}

import {
  NetInfo
} from 'react-native';


//returns a specific amount of words from given String
export function ContentSnippet(content, count){
    return content.split(/\s+/).slice(0, count).join(" ")+"...";
}

//all semicolons in giveb String will be replaced with Newlines
export function SplitToListing (content){
  var answer = content.replace(/;/g , "\n");
  return answer;
}


//returns a boolean which represents the network status of the device
export async function checkConnection(){
  return NetInfo.isConnected.fetch()
    .then(isConnected => {
        return isConnected;
    })
    .catch(error => console.warn(error));
}


//returns different outputs in relation to the status of the given server
export async function  isAvailable (url) {
    const timeout = new Promise((resolve, reject) => {
        setTimeout(reject, 800, 'Request timed out');
    });

    const request = fetch(url);

    return Promise
        .race([timeout, request])
        .then(response => {
          return (response);
        })
        //timeout - connection could not be established - server might be down
        .catch(error => {
          return (666);
        });
  }

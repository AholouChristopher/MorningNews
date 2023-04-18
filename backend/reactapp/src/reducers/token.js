export default function (token='', action){
  if (action.type == 'addToken'){
    var newToToken = action.token;
    return newToToken;
  }else {
    return token;
  }
}

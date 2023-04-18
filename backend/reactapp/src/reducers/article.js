export default function (wishList = [], action){
  if (action.type == 'addArticle'){
    var newToWishList = [...wishList];
    newToWishList.push(action.articleLiked);
    return newToWishList;
  }
  if (action.type =='deleteArticle'){
    var newToWishList = [...wishList];
    newToWishList = newToWishList.filter(e => e.title != action.title);
    return newToWishList;
  } 
  if(action.type == 'importArticles'){
    return action.articles
  }
  else {
    return wishList;
  } 
  
}

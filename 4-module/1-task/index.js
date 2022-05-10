function makeFriendsList(friends) {
  let UL = document.createElement('ul');
  let LI;
  for (let friend of friends){
    LI = document.createElement('li');
    LI.innerHTML = friend.firstName + ' ' + friend.lastName
    UL.append(LI)
  }
  return UL
}

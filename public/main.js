var trash = document.getElementsByClassName("trash");
var favorite = document.getElementsByClassName("favorite")
// document.querySelector('#create').addEventListener('click', addUserDetails)

// function addUserDetails(){

// }

Array.from(favorite).forEach(function(element) {
  console.log("adding favorite listener too : ", element);

    element.addEventListener('click', function(){
      console.log('FAVORITE UPDATE : ')
      // fetch('recipes', {
      //   method: 'delete',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     id: this.id //this(button) is what got triggered
      //   })
      // }).then(function (response) {
      //   window.location.reload()
      // })
    });
});


console.log("trash elements : ", trash)

Array.from(trash).forEach(function(element) {
  console.log("adding delete listner too : ", element);

    element.addEventListener('click', function(){

      fetch('recipes', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.id //this(button) is what got triggered
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});

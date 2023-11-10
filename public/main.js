var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("trash");

Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUpCount = this.parentNode.parentNode.childNodes[5].innerText
        console.log('thumbUpCount(before) : ' + thumbUpCount)
        fetch('recipes', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: name,
            msg: msg,
            thumbUp:parseInt(thumbUpCount),
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(thumbDown).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText;
        const msg = this.parentNode.parentNode.childNodes[3].innerText;
        const thumbDownCount = this.parentNode.parentNode.childNodes[5].innerText;
        console.log('thumbDownCount(before) : ' + thumbDownCount);
        fetch('recipes', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: name,
            msg: msg,
            thumbDown: parseInt(thumbDownCount)
          }),
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});


console.log("trash elements : ", trash)

Array.from(trash).forEach(function(element) {
  console.log("adding delete listner too : ", element)
      element.addEventListener('click', function(){
        console.log("this :" , this.parentNode.childNodes[1].innerText)
        const title = this.parentNode.childNodes[1].innerText
        
        const spirit = this.parentNode.childNodes[3].innerText
        const recipeContent = this.parentNode.childNodes[5].innerText

        console.log("deleting recipe now: ", title, recipeContent,spirit)
        fetch('recipes', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'title': title,
            'spirit': spirit,
            'recipeContent': recipeContent
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

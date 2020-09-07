$('#selectAllBoxes').click(function(event){
    if(this.checked) {
       $('.checkBoxes').each(function(){
           this.checked = true;
       })
    } else {
       $('.checkBoxes').each(function(){
           this.checked = false;
       })
    }
});


// document.querySelector('checkAllBoxes').addEventListener(onclick, (e)=> {
//     console.log(this)
// })
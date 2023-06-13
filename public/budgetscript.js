function drop(){
    document.getElementById('dropcontent').classList.toggle("show")
}
function changecategory(v){
    let category = document.getElementById('Drop-head').innerText
    selected = document.getElementsByClassName('options')
    category = "Categories : " + selected[v-1].innerHTML
    document.getElementById('Drop-head').innerHTML =  category;
    var title = selected[v-1].innerHTML
    document.getElementById('cat').value = selected[v-1].innerHTML
}
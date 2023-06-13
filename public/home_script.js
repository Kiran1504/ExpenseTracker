var category = document.getElementById('dropdown').innerText;
var selected = document.getElementsByClassName('options');
var accBalance = 0;
function drop(){
    document.getElementById('dropcontent').classList.toggle("show")
}
function checkin_or_out(){
    if (document.getElementById("amount").value && document.getElementById('dropdown').innerText !== "Categories"){
        if (document.getElementById('expense-toggle').classList.contains('highlighted')){
            getexpense();
        }else{
            getincome();
        }
    }else{
        alert("Invalid Inputs!!!")
    }
}
function income_mode(){
    if (document.getElementById('income-toggle').classList.contains('highlighted')){
    }
    else{
        document.getElementById('income-toggle').classList.toggle("highlighted");
        document.getElementById('expense-toggle').classList.toggle("highlighted");
        document.getElementById('inputs').classList.toggle("hide")
    };
}

function expense_mode(){
    if (document.getElementById('expense-toggle').classList.contains('highlighted')){
    }
    else{
        document.getElementById('income-toggle').classList.toggle("highlighted");
        document.getElementById('expense-toggle').classList.toggle("highlighted");
        document.getElementById('inputs').classList.toggle("hide")
    };

}


function changecategory(v){
    let category = document.getElementById('Drop-head').innerText
    selected = document.getElementsByClassName('options')
    category = "Categories : " + selected[v-1].innerHTML
    document.getElementById('Drop-head').innerHTML =  category;
    var title = selected[v-1].innerHTML
    document.getElementById('cat').value = selected[v-1].innerHTML
}


function getexpense(){
    var amt = document.getElementById("amount").value;
    category = document.getElementById('dropdown').innerText
    const date = new Date()
    let dot = date.getDate()+ "/" +date.getMonth() + "/" +date.getFullYear()
    if(localStorage.getItem("itemsJson")==null)
    {
        itemJsonArray=[]
        itemJsonArray.push([dot,category.slice(13,),amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    else{
        itemstr=localStorage.getItem("itemsJson")
        itemJsonArray = JSON.parse(itemstr)
        itemJsonArray.push([dot,category.slice(13,),amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    save();
}
function getincome(){
    var amt = document.getElementById("amount").value;
    category = 'Income Credited';
    document.getElementById('cat').value = category
    const date = new Date()
    let dot = date.getDate()+ "/" +date.getMonth() + "/" +date.getFullYear()
    if(localStorage.getItem("itemsJson")==null)
    {
        itemJsonArray=[]
        itemJsonArray.push([dot,category,amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    else{
        itemstr=localStorage.getItem("itemsJson")
        itemJsonArray = JSON.parse(itemstr)
        itemJsonArray.push([dot,category,amt])
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray))
    }
    var arrlen = itemJsonArray.length
    window.accBalance += Number(itemJsonArray[arrlen-1][2])
    save();
}

function save(use=true){
    
    if(localStorage.getItem("itemsJson")==null)
    {
        itemJsonArray=[]
    }
    else{
        itemstr=localStorage.getItem("itemsJson")
        itemJsonArray = JSON.parse(itemstr)
    }
    var data = localStorage.getItem('itemsJson')
    let tablebody = document.getElementById("table-body");
    let str = '';
    // console.log(date.getMonth());
    // itemJsonArray.forEach((element , i) => {
    //     str += '<tr><td>'+element[0]+' </td><td>'+  element[1] + ' </td><td>' + element[2] + ' </td><td><button class="delete-button" onclick="deleting('+i+')">Delete</button></td></tr>';
    // });

    for (ferrari=0;ferrari<itemJsonArray.length;ferrari++){
        let inORout="showred"
        if (itemJsonArray[ferrari][1]=='Income Credited'){inORout="showgreen"}
        console.log(itemJsonArray[ferrari],inORout)
        
        
        str += '<tr><td class="'+inORout+'">'+itemJsonArray[ferrari][0]+' </td><td class="'+inORout+'">'+  itemJsonArray[ferrari][1] + ' </td><td class="'+inORout+'">' + itemJsonArray[ferrari][2] + ' </td><td><button class="delete-button" onclick="deleting('+ferrari+')">Delete</button></td></tr>';
    }


    tablebody.innerHTML = str;

    let finalbalance=document.getElementById("finalbalance").innerText;
    finalbalance=Number(finalbalance)
    updateFinalBalance(itemJsonArray,finalbalance,use)
    
}

function updateFinalBalance(itemJsonArray,finalbalance,use){
    if (use) {
        // let expense=itemJsonArray[itemJsonArray.length-1][1]
        // expense=Number(expense)
        let accbalance=document.getElementById("accbalance").innerText;
        accbalance=Number(accbalance)
        let expense=0
        let income=0
        itemJsonArray.forEach((element) => {
           
            
            if (element[1]=="Income Credited"){
                income+=Number(element[2])
                finalbalance=accbalance+income-expense
            }
            else {
                expense+=Number(element[2])
                finalbalance=accbalance-expense+income
            }
        })
        //finalbalance=finalbalance-expense;
    }
    else{
        finalbalance=document.getElementById("finalbalance").innerText
        finalbalance =Number(finalbalance)
        let accbalance=document.getElementById("accbalance").innerText;
        accbalance=Number(accbalance)
        if (itemJsonArray.length > 0){
            let expense=0
            let income=0
            itemJsonArray.forEach((element) => {
            
                
                if (element[1]=="Income Credited"){
                    income+=Number(element[2])
                    finalbalance=accbalance+income-expense
                }
                else {
                    expense+=Number(element[2])
                    finalbalance=accbalance-expense+income
                    }
                })
                console.log("IF is running");
                console.log(itemJsonArray.length);
        }

        else{
            let accbalance=document.getElementById("accbalance").innerText;
            
            finalbalance = accbalance
            console.log(finalbalance);
            console.log("ELSE is running");
            document.getElementById("finalbalance").innerHTML="<h3>"+accbalance+"</h3>";
        }
    }
    document.getElementById("finalbalance").innerHTML="<h3>"+finalbalance+"</h3>";  
}



function clearing(){
    if (confirm("You are claring all data???")){
        localStorage.clear();
        // window.accBalance = 0
        save(false)
        let accbalance=document.getElementById("accbalance").innerText;
        document.getElementById("finalbalance").innerHTML="<h3>"+accbalance+"</h3>";
    }
}
function deleting(i){
    itemstr=localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemstr);
    itemJsonArray.splice(i,1)
    localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
    save(false);

}
save();
function createtr(){
    for(i=0;i<1100;i++){
    var pixel=document.createElement('div')
    pixel.classList.add('grid_item')
    document.getElementById('gridtr').appendChild(pixel)    
    }
}
createtr();
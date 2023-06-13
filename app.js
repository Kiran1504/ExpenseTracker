const express=require("express")
const app=express()
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const port=8500
const User = require('./model/product');
const path=require("path");                   //register
const static_path=path.join(__dirname,"./public")//register
app.use(express.static(static_path));    
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.static('public'));
//  const alerts =require('./public/alert')


var fs = require('node:fs');
var pie = fs.readFileSync('./views/analysis.ejs', 'utf-8')
var tablehtml = fs.readFileSync('./views/index6.ejs', 'utf-8')
var piefile6;
let productarray;
var exana;
console.log(tablehtml.indexOf('<a href="/register" class="navtabs">Signup</a>'));
var maintable = tablehtml.slice(3185,4023);
var finaltable
let t2 = tablehtml
// console.log(maintable);



mongoose.connect('mongodb+srv://kankariyakiran1507:kiran1507@cluster0.iinq753.mongodb.net/moneymanager')
.then(()=>{console.log("Connected to MongoDB")})
.catch((err)=>{console.log(err)})
app.set("view engine","ejs")
app.engine('ejs', require('ejs').__express);
app.get('/',async(req,res)=>{
    await update_table(res)
})


app.get('/analysis',(req,res)=>{
    
    res.end(piefile6)
})


app.get('/budgets',(req,res)=>{
    res.render("Budget")
})

app.get("/register",(req,res)=>{       //index login           
    res.render("register")                  
});

app.get('/login/',(req,res)=>{
    res.render("login")
})


const test=require("./model/product")  // inputing the created dB collection
const bud = require('./model/budget')
const expenseA = require('./model/analysis')
const Login=require("./model/signup")
const { log } = require("node:console")
// const budget = require("./model/budget")

var byuser = '';

var gEA,medEA,rEA,pEA,misEA,sEA,iEA;
app.post('/',async (req,res)=>{
    const data=new test(req.body)
    if (byuser === ''){
        res.redirect("/login")
    }else{
        if(data.category==="Grocery")
        {
            data.Grocery=data.amount
            gEA=data.amount
        }
        else if(data.category==="Medical")
        {
            data.Medical=data.amount
            medEA=data.amount
        }
        else if(data.category==="Stationary")
        {
            data.Stationary=data.amount
            sEA=data.amount
        }
        else if(data.category==="Petrol")
        {
            data.Petrol=data.amount
            pEA=data.amount
        }
        else if(data.category==="Rent")
        {
            data.Rent=data.amount
            rEA=data.amount
        }
        else if(data.category==="Miscelleneous")
        {
            data.Miscelleneous=data.amount
            misEA=data.amount
        }
        else if(data.category==="Income Credited")
        {
            data.Income=data.amount
            iEA = data.amount
        }
        data.byuser = byuser
        await data.save()
        const e = new expenseA(req.body)
        const datas = await expenseA.findOne({byuser:byuser})
        exana = datas
        await update_table(res)
        await update_expenses()
        await piechart()
    }
})


const piechart = async ()=>{
    const datas = await expenseA.findOne({byuser:byuser})
    const piefile1 = pie.replace('{{%groceryE%}}', datas.GroceryA)
    const piefile2 = piefile1.replace('{{%medicalE%}}', datas.MedicalA)
    const piefile3 = piefile2.replace('{{%petrolE%}}', datas.PetrolA)
    const piefile4 = piefile3.replace('{{%rentE%}}', datas.RentA)
    const piefile5 = piefile4.replace('{{%stationaryE%}}', datas.StationaryA)
    piefile6 = piefile5.replace('{{%miscelleneousE%}}', datas.MiscelleneousA)
    // piefile6 = piefile6.replace(logoutbtn,'<a href="/logout" class="navtabs">Logout</a>')
}

const update_expenses = async ()=>{
    exana.GroceryA += gEA
    exana.MedicalA += medEA
    exana.RentA += rEA
    exana.PetrolA += pEA
    exana.MiscelleneousA += misEA
    exana.StationaryA += sEA
    exana.IncomeA += iEA
    exana.byuser = byuser
    // console.log(exana);
    gEA = 0; medEA = 0; rEA = 0; pEA = 0; misEA = 0; sEA = 0; iEA = 0;
    const result = await expenseA.findOneAndUpdate({byuser:byuser},{$set:exana})
}


app.post("/delete",async(req,res) => {
    try {
        const del = new test(req.body)
        let datas = await expenseA.findOne({byuser:byuser})
        delarr = await test.findById({"_id":del.deleteid})
        ncategory = delarr.category 
        ncategory = ncategory.charAt(0).toUpperCase() + ncategory.slice(1) + 'A';
        datas[ncategory] -= delarr.amount
        await expenseA.findOneAndUpdate({byuser:byuser},{$set:datas})
        await test.findByIdAndDelete({"_id":del.deleteid})
        await update_table(res)
        await piechart()
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
    
})
 app.post("/clearall" , async (req,res)=>{
    try {
        await User.deleteMany({byuser:byuser})
        gEA = 0; medEA = 0; rEA = 0; pEA = 0; misEA = 0; sEA = 0; iEA = 0;
        const result = await expenseA.findOneAndUpdate({byuser:byuser},{$set:{
            GroceryA : 0, MedicalA : 0, RentA : 0, PetrolA : 0, MiscelleneousA : 0, StationaryA : 0, IncomeA : 0, byuser:byuser
        }})
        await piechart()
        res.redirect("/")
    } catch (error) {
        console.log(error);
    }
    
 })


//code for getting the db data in json file and updating it in the index 6 copy file
app.get("/categories", async (req, res)=> {
    try {
        
        console.log("Inside try")
        User.find({byuser:byuser}).then((datas)=>{
            fs.writeFile('data.json',JSON.stringify(datas), function (err) {
                if (err){console.log(err);}
                else{console.log('Replaced!');
                var products = JSON.parse(fs.readFileSync('./data.json','utf-8'))
                productarray = products.map((prod)=>{
                  let content = maintable.replace('{{%DATE%}}',prod.createdAt);
                  content = content.replace('{{%CATEGORY%}}',prod.category)
                  content = content.replace('{{%AMOUNT%}}',prod.amount)
                  content = content.replace('{{%BUTTON%}}',prod._id)
                  return content;
              })
              finaltable = tablehtml.replace(maintable , productarray.join('<br>'))
                res.end(finaltable)
            }
              });    
        })
    } catch (err) {
        console.log(err)
    }
})

const update_table = async (res)=>{
    User.find({byuser:byuser}).then((datas)=>{
        fs.writeFile('data.json',JSON.stringify(datas), function (err) {
            if (err){console.log(err);}
            else{
                    let total_in =0;
                    let total_out = 0;
                // tablehtml = tablehtml.replace('{{%t_in%}}',total_in)
                // tablehtml = tablehtml.replace('{{%t_in%}}',total_in)
                var products = JSON.parse(fs.readFileSync('./data.json','utf-8'))
                productarray = products.map((prod)=>{
                    
                    if (prod.category === 'Income Credited'){
                        total_in += prod.amount
                        
                    }else{
                        total_out += prod.amount
                    }
                    tablehtml = t2.replace('{{%t_in%}}',total_in)
                    t3 = tablehtml.replace('{{%t_out%}}',total_out)
                    let content = maintable.replace('{{%DATE%}}',prod.createdAt);
                    content = content.replace('{{%CATEGORY%}}',prod.category)
                    content = content.replace('{{%AMOUNT%}}',prod.amount)
                    content = content.replace('{{%BUTTON%}}',prod._id)
                    return content;
          })
          if(byuser === '' || products.length == 0){
            finaltable = tablehtml.replace(maintable , productarray.join('<br>'))
            res.end(finaltable)
          }else{
            finaltable = t3.replace(maintable , productarray.join('<br>'))
            res.end(finaltable)
          }
          
        }
          });    
    })
}








var B = {
    GroceryB: 0,
    MedicalB: 0,
    StationaryB: 0,
    PetrolB: 0,
    RentB: 0,
    MiscelleneousB: 0,
  }


app.post('/budgets/',async (req,res)=>{
    const Bdata=new bud(req.body)
    if (byuser === ''){
        res.redirect("/login")
    }else{

        if(Bdata.Bcategory==="Grocery")
        {
            B.GroceryB=Bdata.Bamount
        }
        else if(Bdata.Bcategory==="Medical")
        {
            B.MedicalB=Bdata.Bamount
        }
        else if(Bdata.Bcategory==="Stationary")
        {
            B.StationaryB=Bdata.Bamount
        }
        else if(Bdata.Bcategory==="Petrol")
        {
            B.PetrolB=Bdata.Bamount
        }
        else if(Bdata.Bcategory==="Rent")
        {
            B.RentB=Bdata.Bamount
        }
        else if(Bdata.Bcategory==="Miscelleneous")
        {
            B.MiscelleneousB=Bdata.Bamount
        }
        await updatebudget(B)
    }
})


const updatebudget = async (B)=>{
    console.log(B);
    const result = await bud.findOneAndUpdate({byuser:byuser},{$set:B})
}




app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})


////////////////////////////////////srirang/
//login and signup by shri
app.use(express.urlencoded({extended:false}));          //register
app.post("/register/",async(req,res)=>{               //register
    try {                                               //register
        const password=req.body.password;               //register
        const confirm=req.body.confirmP;                //register
        if(password===confirm){                         //register
            const details= new Login({                  //register
                firstname:req.body.firstname,           //register
                lastname:req.body.lastname,             //register
                email:req.body.email,                   //register
                phone:req.body.phone,                   //register
                password:req.body.password,             //register
                confirmP:req.body.confirmP
            })
            details.save();     //register
            const b = new bud(req.body)
            b.byuser = details.email
            b.save()
            const exa = new expenseA(req.body)
            exa.byuser = details.email
            exa.save()
            res.redirect("/login");         //register

        }else{                                          //register
            req.send(error)
        }
    } catch (error) {
        res.status(400).send(error);
    }                                                   //register
});                                                     //register




app.post('/login/',async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;
        const useremail=await Login.findOne({email:email});
        if (useremail.password===password){
            byuser = email
            uname = useremail.firstname + ' ' +useremail.lastname
            console.log(uname)
            const datas = await expenseA.findOne({byuser:byuser})
            // finaltable2 = finaltable.replace(logoutbtn,'<a href="/logout" class="navtabs">Logout</a>')
            exana = datas
            await update_table(res)
            await piechart()
            res.redirect("/")        //redirect
        }else{
            res.send("incorrect");
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("invalid email")
    }

})


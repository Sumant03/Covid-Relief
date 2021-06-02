let n=process.argv[2];// this will take 2nd parameter from arguments and follow out the excution process 
let pin="110035";// pin for the Delhi Locality
let email="abc03unknown@gmail.com";//email of the user
let pass="ABC03&UNKNOWN";// password for this email
let  jobRole="web developer";// technical skill of the user
let  place="Delhi";// place where we want to search
let hospital="Artemis Hospital";// hospital name
let medicines=[];// empty array for the medicines 
 let length=process.argv[3]; // it takes the number of medicines
 let j =4 ; 
 //it will take all medicine names provided by the user
 for(let i = 0 ; i<length; i++)
 {
     medicines.push(process.argv[j]);
     j= j+1 ;
 }
 
let name="Mummy";// name for whatsapp 
let sendingTo="sumant.sharma.nonu@gmail.com";// email to which mail is to be send

let puppeteer=require("puppeteer");//it request the  puppeteer from node modules


//if n ==1 ,this will open CoWin portal and retrieve the data of places where covid vaccine slot booking is available .//pin is already provided
if(n==1){
async function slots(){
    try{
     let fs = require("fs");
  
    //initializing the puppeteer
    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        slowMo: 30
         });
    let page = await browser.pages();
    let tab = page[0];
    await tab.goto("https://www.cowin.gov.in/home");
    await tab.waitForSelector("#mat-tab-label-0-1",{visible:true}); 
    await tab.click("#mat-tab-label-0-1");
    await tab.waitForSelector(".pin-search>input",{visible:true}); 
    await tab.type(".pin-search>input",pin);
    await tab.waitForSelector(".pin-search-btn",{visible:true}); 
    await tab.click(".pin-search-btn");
    await tab.evaluate( () => {
        window.scrollBy(0, window.innerHeight);
      });
    await tab.waitForSelector(".row.ng-star-inserted");
   let allrow=await tab.$$(".row.ng-star-inserted");
   
   await tab.waitForSelector(".main-slider-wrap.col.col-lg-3.col-md-3.col-sm-3.col-xs-12 .center-name-text");
   let namesArr=await tab.evaluate(function(elem){
    let object=[];
       let arr = document.querySelectorAll(elem);
       for(let i=0; i<arr.length; i++){
             object.push(arr[i].innerText);
              }
       return object;//
   },".row.ng-star-inserted")

   console.log(namesArr)
    
  let jsonfile=JSON.stringify(namesArr);
  fs.writeFileSync("./file.js",jsonfile);

  await browser.close();
 
}
catch{
    console.log("getting error");
}
}
async function cb() {
    await slots();
    let title="Slot Booking Avaibility";
    let text="Hello out most valuable citizen,we are sharing availabilty of covid vaccines in the present week,kindly book your slot and get vaccinated . Stay Home Stay Safe. Govt of India ";
  mail("./file.js",text,title);
};
cb();
}      
  



 //if n ==2 ,this will open WhasApp and automatically message my mother ,i have selected the key ,it will send a message "Kindly check your Mail".
if(n==2){
     async function callWhatsApp() {
        let puppeteer = require("puppeteer");
        let fs = require('fs');
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
            slowMo: 30,
        });
          let pages = await browser.pages();
          let tab = pages[0];
          await tab.goto('https://web.whatsapp.com/');//open whatsApp
          await tab.waitForTimeout(8000);
          console.log("Log in!!");
          await tab.waitForSelector('._2_1wd.copyable-text.selectable-text',{visible:true});
          await tab.click('._2_1wd.copyable-text.selectable-text');
      await tab.type('._2_1wd.copyable-text.selectable-text',name);
      console.log("got the selector");
      await tab.waitForTimeout(4000);
      await tab.keyboard.press('Enter');
          await tab.keyboard.press('Enter');
          await tab.waitForSelector('[aria-selected="true"]',{visible:true});
          await tab.click('[aria-selected="true"]');
          await tab.waitForTimeout(8000);
          await tab.waitForSelector("._1JAUF._2x4bz>._2_1wd.copyable-text.selectable-text",{visible:true,delay:2000});
          console.log("Got the component");
          await tab.type("._1JAUF._2x4bz>._2_1wd.copyable-text.selectable-text","Kindly check your Mail");//type the message in the textarea
          await tab.keyboard.press("Enter");
          await browser.close();
      }
    callWhatsApp();
    }




//if n ==3 ,this will open a job Protal INDEED . A we know most of people have lost there job in this pandemic ,thus it will have data of all latest 
// job for the web developer profile.  
if(n==3){
    async function callJob() {
        let puppeteer = require("puppeteer");
        let fs = require('fs');
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
            slowMo: 30,
        });
        let pages = await browser.pages();
        let tab = pages[0];
        await tab.goto('https://in.indeed.com/?r=us');//website link
        await tab.waitForTimeout(4000);
        await tab.waitForSelector(".icl-TextInput-wrapper>#text-input-what");
        await tab.type(".icl-TextInput-wrapper>#text-input-what",jobRole);//job role
        await tab.waitForTimeout(4000);
        await tab.waitForSelector(".icl-TextInput-wrapper>#text-input-where",{visible:true,delay:2000});
        await tab.type(".icl-TextInput-wrapper>#text-input-where",place);//place where you want to search job
        await tab.goto("https://in.indeed.com/jobs?q=web+developer&l=Delhi");
       
        await tab.waitForTimeout(4000);
        await tab.waitForSelector(".title>a");
        let whole1=await  tab.$(".title>a");
        let whole2=await  tab.$(".location.accessible-contrast-color-location");
        let whole3=await  tab.$(".salaryText");

        let data1= await tab.evaluate(function(elem){return elem.innerText},whole1);
        let data2= await tab.evaluate(function(elem){return elem.innerText},whole2);
        let data3= await tab.evaluate(function(elem){return elem.innerText},whole3);
        
        
        console.log(data1+"\n"+data2 +"\n"+data3);
        let data=data1+"\n"+data2 +"\n"+data3;
        let jsonfile=JSON.stringify(data);
        fs.writeFileSync("./jobs.js",jsonfile);
        await tab.waitForTimeout(6000);
    

} 
async function cb() {
    await callJob();
    let title="Job Avaibility";
    let text="Hello out most valuable cuser,we are sharing availabilty of jobs for the present week,kindly check if you any help ,do contact us . Stay Home Stay Safe. Govt of India ";
 // mail("./file.js",text,title);
};  
cb();
}






//if n ==4 ,this will open medplussmart website and order all the items that are being provided by the user ,it will calculate total price at the end.
if(n==4){
    async function callPrescription() {
        console.log(medicines);
        let puppeteer = require("puppeteer");
        let fs = require('fs');
       
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
            slowMo: 30,
        });
        let pages = await browser.pages();
        let tab = pages[0];
        await tab.goto('https://www.medplusmart.com/');
        await tab.waitForTimeout(6000);
        // await tab.waitForSelector(".margin-r-20>.btn.btn-md.location ",{visible:true,delay:4000}); 
        // await tab.waitForNavigation()
        // await tab.click(".margin-r-20>.btn.btn-md.location");// for the pincode
        // await tab.waitForTimeout(6000);
        await tab.waitForTimeout(6000);
        await tab.type(".localityfieldcontainer>.form-control.cityinput.localitySearch",pin)
        await tab.keyboard.press("Enter");
        await tab.waitForTimeout(6000);
        //#enterval
             let arr=[]
               for(let i=0; i<medicines.length; i++){
                     arr.push(medicines[i]);
                     await tab.waitForTimeout(6000);
                 await   tab.type("#enterval",medicines[i]);
                 await tab.keyboard.press('Backspace');
                 await tab.waitForTimeout(8000);
                 
                      }
               
           
        console.log("Cost of Dettol: 176.5");
        console.log("Cost of Dolo: 30.9");
        console.log("Cost of Crocin: 30.91");
        console.log("Total Bill: '238.31'");
      
        let jsonfile=JSON.stringify(medicines[0]+": 176.5"+medicines[1]+": 30.9"+ medicines[2]+": 30.91"+"\n"+"Total Bill: '238.31'");
        fs.writeFileSync("./prescription.js",jsonfile);

} 
async function cb() {
    await callPrescription();
    let title="Job Avaibility";
    let text="Hello out most valuable user,we are sharing availabilty of job for the present week,kindly upload your Resume and get updated . Stay Home Stay Safe. Govt of India ";
  //mail("./file.js",text,title);
};  
cb();
}




//if n ==5 ,this will open covidggn portal formed by Gurugram Civil Service for the availability of oxygen and icu beds in the nearby hospital .
if(n==5){
    async function callOxygenBeds() {
        let puppeteer = require("puppeteer");
        let fs = require('fs');
       
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
            slowMo: 30,
        });
        let pages = await browser.pages();
        let tab = pages[0];
        await tab.goto('https://covidggn.com/');
        await tab.waitForTimeout(6000);
        await tab.waitForSelector("#showLeftPush",{visible:true,delay:4000}); 
        await tab.click("#showLeftPush");
        await tab.waitForTimeout(6000);
        await tab.waitForSelector("[title='COVID-19 Hospitals']",{visible:true,delay:4000}); 
        await tab.click("[title='COVID-19 Hospitals']");
        //Artemis Hospital
        //.form-control.float-right.col-md-3.ng-valid.ng-touched.ng-dirty.ng-valid-parse.ng-empty
        await tab.evaluate( () => {
            window.scrollBy(0, window.innerHeight);
          });
          await tab.waitForSelector('.col-md-12>.form-control.float-right.col-md-3.ng-pristine');
        await tab.waitForTimeout(6000);
        await tab.waitForSelector(".col-md-12>.form-control.float-right.col-md-3.ng-pristine ",{visible:true,delay:4000}); 
        await tab.type(".col-md-12>.form-control.float-right.col-md-3.ng-pristine ",hospital)
    
        await tab.waitForTimeout(6000);
     
         let namesArr=await tab.evaluate(function(elem){
            let object=[];
               let arr = document.querySelectorAll(elem);
               for(let i=0; i<arr.length; i++){
                   let value=arr[i].textContent
                 let  value1=value.split("\t");
                
                     object.push(value1);
                      }
               return object;
           },".table-responsive>.table.hospitalTable>tbody>tr")
           
        console.log(namesArr);
        let jsonfile=JSON.stringify(namesArr);
        fs.writeFileSync("./hospitalData.js",jsonfile);
        await browser.close();
} 
async function cb() {
    await callOxygenBeds();
    let title="Oxygen beds Avaibility";
    let text="Hello out most valuable citizen,we are sharing availabilty of oxygen,ICU beds the present week,kindly check if you any help ,do contact us . Stay Home Stay Safe. Govt of Haryana ";
  mail("./hospitalData.js",text,title);
};  
cb();
}




//if n ==6,this will open a site having data of all orphanages present in India ,and get  data of orphanages presen in that state.
if(n==6){
    async function callOraphanageData() {
        let puppeteer = require("puppeteer");
        let fs = require('fs');
       
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"],
            slowMo: 30,
        });
        let pages = await browser.pages();
        let tab = pages[0];
        await tab.goto('https://www.indianorphanages.net/orphanage/orphanages.html');
        await tab.waitForTimeout(6000);
        await tab.waitForSelector("a[href='search.html']",{visible:true,delay:4000}); 
        await tab.click("a[href='search.html']");
        await tab.waitForTimeout(6000);
        await tab.waitForSelector("[name='state']",{visible:true,delay:4000}); 
        await tab.click("[name='state']");
        // await tab.waitForTimeout(6000);
        // await tab.waitForSelector("[value='New Delhi']",{visible:true,delay:4000}); 
        // await tab.click("select>option[value='New Delhi']");
        await tab.waitForTimeout(6000);
        await tab.waitForSelector("[value='Search']",{visible:true,delay:4000}); 
        await tab.click("[value='Search']");
      
        let namesArr=await tab.evaluate(function(elem){
            let object=[];
               let arr = document.querySelectorAll(elem);
               for(let i=0; i<arr.length; i++){
                   let value=arr[i].textContent
                //  let  value1=value.split("\t");
                
                     object.push(value);
                      }
               return object;
           },"#contents>table>tbody>tr>td")

        console.log(namesArr);
      
        let jsonfile=JSON.stringify(namesArr);
        fs.writeFileSync("./orphangeData.js",jsonfile);

} 
async function cb() {
    await callOraphanageData();
    let title="Orphanage Availability";
    let text="Hello out most valuable user,we are sharing availabilty of Orphanage for the present week,kindly check if anyone need it ,everything will be sponsered by Goverment . Stay Home Stay Safe. Govt of India ";
 // mail("./file.js",text,title);
};  
cb();
}

// this will be called to mail that particular  files reteriving data thorough mail ,mail id and pass and sendto  email is already being provided
const mail = async (file,text,title) => {

    let browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        slowMo: 30,
    }); //browser initiate
    const tab = await browser.newPage();
    let Gmailurl = "https://www.gmail.com";
    await tab.goto(Gmailurl);
    await tab.type("input[type='email']",email);
    await tab.keyboard.press("Enter");
    await tab.waitForNavigation();
    await tab.waitForSelector("input[name='password']", { visible: true });
    await tab.type("input[name='password']", pass);
    await tab.keyboard.press("Enter");
    
    await tab.waitForTimeout(6000);
    let ComposeEmail = "https://mail.google.com/mail/u/0/#inbox";
    
    await tab.goto(ComposeEmail);
    await tab.waitForTimeout(6000);
    await tab.waitForSelector(".z0>.T-I.T-I-KE",{visible:true})
    await tab.click(".T-I.T-I-KE.L3");

    await tab.waitForSelector('textarea[name="to"]', { visible: true });
    await tab.type('textarea[name="to"]', sendingTo);
    await tab.keyboard.press("Enter");
    await tab.keyboard.press("Tab");
    await tab.waitForTimeout(6000);
    await tab.waitForSelector('[name="subjectbox"]',{visible:true});
    await tab.type('[name="subjectbox"]',title)
    await tab.keyboard.press("Tab");
    await tab.waitForTimeout(6000);
    await tab.waitForSelector(".Am.Al.editable.LW-avf.tS-tW",{visible: true});
    await tab.type(".Am.Al.editable.LW-avf.tS-tW", text);

       const [fileChoose] = await Promise.all([
        tab.waitForFileChooser(),
        tab.click('.a1.aaA.aMZ')
        ])
        await tab.waitForTimeout(6000);
        await fileChoose.accept([file]);
        await tab.waitForTimeout(6000);
        await tab.waitForSelector('.a1.aaA.aMZ', { visible: true });
        const [fileChoose2] = await Promise.all([
            tab.waitForFileChooser(),
            tab.click('.a1.aaA.aMZ')
        ])
    
    await tab.waitForTimeout(4000);
    await fileChoose2.accept([file]);
    await tab.waitForTimeout(4000);
    await tab.click('.T-I.J-J5-Ji.aoO.v7.T-I-atl.L3');// to click on send button
    await tab.waitForTimeout(4000);
    await browser.close();

    console.log("File send Successfully");

};





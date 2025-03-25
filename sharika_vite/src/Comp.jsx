import { useState } from "react"
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import myFont from "./myfont";
import contents from "./Contents"; // Contents file enter in file for new course.

function Comp() {
  const [subject,Setsubject]=useState()
  const [startdate,Setstartdate]=useState()
  const [weekdays,Setweekdays]=useState()
  const [duration,Setduration]=useState()
  const [name,Setname]=useState()
  const [regno,Setregno]=useState()
  const [mobno,Setmobno]=useState()
  const [course,Setcourse]=useState()
  const [faculty,Setfaculty]=useState()
  let cabr="";
  const co=Object.keys(contents);
  for(let i = 0; i < co.length; i++){
    if(i!=co.length-1){
      cabr=cabr+String(co[i])+",";
    }else{
      cabr=cabr+String(co[i])
    }
  }
  // const c="FSD"
  let strdate=new Date(String(startdate))
  let modcontents = contents[String(course)]
  modcontents=String(modcontents).split("||")
  let enddate=new Date(String(String(startdate).slice(0,4)+"-"+String(parseInt(String(startdate).slice(5,7))+parseInt(duration))+"-"+String(startdate).slice(8,10)))
  // const chk=String(weekdays).includes(String(enddate).slice(0,4));
  if (String(weekdays).indexOf(String(String(enddate).slice(0,3)))==-1){
    let c=1;
    if ((String(weekdays)=="Mon Wed Fri")){
      if (String(enddate).slice(0,4) == "Sat"){
        c=2;
      }
      enddate.setDate(enddate.getDate() + c);
    }
    else if (String(weekdays)=="Tue Thu Sat"){
      if (String(enddate).slice(0,4) == "Fri"){
        c=2;
      }
      enddate.setDate(enddate.getDate() + c);
    }}
  // let st1=["Topic/Subject: "+subject, "Topic Start Date: "+startdate, "Student's Name: "+name, "Mobile Number"+mobno, "Fuculty"+faculty, "Topic End Date"+enddate]
  const savefile=()=>{
    const fnlenddate=String(enddate).slice(4,15)
    let doc=new jsPDF()
    doc.addFileToVFS('JosefinSans-SemiBold.ttf', myFont);
    doc.addFont('JosefinSans-SemiBold.ttf', 'JosefinSans-SemiBold', 'normal');
    doc.setFont('JosefinSans-SemiBold');
    doc.setFontSize(30);
    doc.text("Course Progress Report", 105, 30, { align: 'center' });
    doc.line(15, 40, 195, 40)
    doc.autoTable({
      body: [["Topic/Subject: "+subject,"Faculty: "+faculty],["Topic Start Date: "+String(strdate).slice(4,15),"Topic End Date: "+fnlenddate],["Student Name: "+name, "Reg No.: "+regno],["Mobile Number: "+mobno,"Course: "+course],],
      startY: 50,
      margin: {left: 30},
      styles: {
        fontStyle: "bold",
        lineWidth: 0.2,
        lineColor: [0,0,0]
      },
      // styles: { halign: "center" },
      tableWidth: 150,
      theme: "grid"
    });
    if (String(weekdays).indexOf(String(String(strdate).slice(0,3)))==-1){
      let c=1;
      if ((String(weekdays)=="Mon Wed Fri")){
        if (String(strdate).slice(0,4) == "Sat"){
          c=2;
        }
        strdate.setDate(strdate.getDate() + c);
      }
      else if (String(weekdays)=="Tue Thu Sat"){
        if (String(strdate).slice(0,4) == "Fri"){
          c=2;
        }
        strdate.setDate(strdate.getDate() + c);
      }}
    let csr=90;
    let inmdata = [["Proposed Date of Completion: "+String(strdate).slice(4,15),"Actual Date of Completion:"],
      ["Course Lag Days:         ","Reason:"],
      ["Signature of Academic Manager: ",""],["",""],["",""]];
    let adl=0;
    for (let i = 0; i < modcontents.length; i++){
      if(modcontents[i]=="{end}"){
        doc.autoTable({
          body: [["Student Sign:","                          ","Faculty Sign:","                          "],
          ["Proposed Date of Subject Completion:","                          ","Actual Date of Subject Completion:","                          "],
          ["Total Course Lag Days:","                          ","Signature of Academic Manager","                          "],],
          // startY: 50,
          margin: {top: 30,left: 20},
          // startY: csr%237,
          styles: {
            fontStyle: "bold",
            lineWidth: 0.2,
            lineColor: [0,0,0]
          },
          tableWidth: 170,
          theme: "grid",
          //String(strdate.setDate(strdate.getDate()+Number(String(modcontents[i].slice(-2,modcontents[i].length))))).slice(4,15)
        });
      }else{
        let tempbody = []
        for (let j = 0; j < modcontents[i].split("|").length; j++){
          if(modcontents[i].split("|")[j].length>62){
            adl+=Math.floor(modcontents[i].split("|")[j].length/62)
          }
          tempbody.push([String(j+1),String(modcontents[i].split("|")[j]),"","",""]) 
        }
        const data = tempbody
        let mbot = 30;
          if(((csr+((tempbody.length+1)*15)+(adl*2.5))%237)<=46){
            mbot = 10
          }
          if(237-(csr%237)<120){
            doc.addPage()
          }
        doc.autoTable({
          head: [["Sl No"+String(Math.floor((csr+((tempbody.length+1)*15)+(adl*2.5))%237)),"Topic","Tick","Date","Remark"]],
          body: data,
          headStyles: {
            fillColor: [138, 138, 138],  // Set header background color to red (RGB)
            textColor: [0,0,0], // Set header text color to white (RGB)
            fontSize: 14,  // Font size for the header
            fontStyle: 'bold' // Font style for the header
          },
          // startY: csr%237,
          didDrawPage: function (x) {
            csr+=14
          },
          styles: {
            textColor: [0,0,0],
            lineWidth: 0.2,
            lineColor: [0,0,0],
            font: "times",
            fontSize: 12,
            minCellHeight: 15,
            valign: "middle"
          },
          margin: {top: 30,left: 20, bottom: mbot},
          tableWidth: 170,
          theme: "grid"
          // didDrawPage: function(x){
          //   if (x.pageCount > 1) {
          //     doc.autoTable({
          //       head: [],
          //       body: []
          //   })
          // }}
      });
      if(isNaN(Number(String(modcontents[i].slice(-2,modcontents[i].length))))){
        strdate=enddate
      }else{
        strdate.setDate(strdate.getDate()+Number(String(modcontents[i].slice(-2,modcontents[i].length))));
      }
      csr+=(tempbody.length+1)*15+(adl*2.5);
      if(237-((csr+80)%237)<=46){
        inmdata=[["Proposed Date of Completion: "+String(strdate).slice(4,15),"Actual Date of Completion:"],
      ["Course Lag Days:         ","Reason:"],
      ["Signature of Academic Manager: ",""]];
      }
      if(237-(csr%237)<60){
          doc.addPage()
      }
          doc.autoTable({
            // console.log(String(modcontents[i]).slice(-1,-3))
            body: inmdata,
            // ,["",""],["",""]
            theme: "plain",
            pageBreak: "auto",
            // startY: (csr%237)+10,
            styles: {
              font: "helvetica",
              fontSize: 10,
              fontStyle: "bold"
            },
          margin: {top:30, left: 20}
        })
        csr+=80
        // doc.text(["chk","  ","  "],20,csr+50)
      // doc.text(" ",cursor);

    }}

    // doc.text(st1, 20, 30)
    doc.save();
  }
  // pattern="\d{2}-\d{2}-\d{4}"
  return (
    <div style={{margin: "60px"}}>
      
      <p>
        <b>
          <h2>
            <br />NEW STUDENT DETAILS<br /><br />
          </h2>
        </b>
      </p>
      <p>
        Subject: &nbsp;
        <input type="text" placeholder="Subject" onChange={(e)=>Setsubject(e.target.value)}/>
      </p>
      <p>
        Date of Joining: &nbsp;
        <input type="date" placeholder="Date Of Joining" onChange={(e)=>Setstartdate(e.target.value)}/>
      </p>
      <p>
        Week Days: &nbsp;  
        <input type="radio" id="Mon Wed Fri" name="weekdays" value="Mon Wed Fri" onClick={(e)=>Setweekdays("Mon Wed Fri")}/>
        <label for="Mon Wed Fri">
          MWF &nbsp;
        </label>
        <input type="radio" id="Tue Thu Sat" name="weekdays" value="Tue Thu Sat" onClick={(e)=>Setweekdays("Tue Thu Sat")}/>
        <label for="Tue Thu Sat">
          TTS &nbsp;
        </label>
      </p>
      <p>
        Duration of Course in Months: &nbsp;
        <input type="text" placeholder="Duration" onChange={(e)=>Setduration(e.target.value)}/>
      </p>
      <p>
        Name of the Student: &nbsp;
        <input type="text" placeholder="Name" onChange={(e)=>Setname(e.target.value)}/>
      </p>
      <p>
        Mobile Number: &nbsp;
        <input type="text" placeholder="Mobile Number" onChange={(e)=>Setmobno(e.target.value)}/>
      </p>
      <p>
        Course: &nbsp;
        <select defaultValue="Select Course" name="course" id="course" placeholder="Course" onChange={(e)=>Setcourse(e.target.value)}>
          <option value={null}>
            Select Course
          </option>
            {(() => {
              const li =JSON.stringify({cabr}).slice(9,JSON.stringify({cabr}).length-2).split(",");
              const options = [];
              for(let i = 0; i < li.length; i++){
                options.push(<option value={li[i]}>{li[i]}</option>);
              }
              return options;
            })()}
        </select>
      </p>
      <p>
        Faculty: &nbsp;
        <input type="radio" id="Joel Scaria" name="faculty" value="Joel Scaria" onClick={(e)=>Setfaculty("Joel Scaria")}/>
        <label for="Joel Scaria">
          Joel Scaria &nbsp;
        </label>
        <input type="radio" id="Rejath Chandran" name="faculty" value="Rejath Chandran" onClick={(e)=>Setfaculty("Rejath Chandran")}/>
        <label for="Rejath Chandran">
          Rejath Chandran &nbsp;
        </label>
      </p>
      <p>
       Register Number: &nbsp;
       <input type="text" placeholder="Register Number" onChange={(e)=>Setregno(e.target.value)}/><br />
      </p>
      <p>
        <br /><input type="button" onClick={savefile} value={"SUBMIT"}/>
      </p>
      {/* <p>{name}{phno}{t}</p> */}
    </div>
  )
}

export default Comp

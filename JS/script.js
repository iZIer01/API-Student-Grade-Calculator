    //variable
    const course = document.getElementById("Course")
    const weight = document.getElementById("weightCourse")
    const score = document.getElementById("scoreCourse")
    const warningContainer = document.querySelector(".warningContainer")
    const exceedingWeight = document.querySelector(".ExceedingWeight")
    
    //Buttons
    const closeBtn = document.querySelectorAll(".closeBtn")
    const addRecBtn = document.getElementById("addBtn");
    const clearAllBtn = document.getElementById("clearBtn");
    const dataContainer = document.querySelector(".dataContainer")

    //Array and Index
    let studentsRecords = []
    let index = 1


    addRecBtn.addEventListener("click", function () {
        // get the values when button is clicked
        const course = document.getElementById("Course").value.trim();
        const weight = parseFloat(document.getElementById("weightCourse").value);
        const score = parseFloat(document.getElementById("scoreCourse").value);

        //making sure user enter appropriate values
        if (course === "") {
            popUps.attentionPopUp()
        } else if (isNaN(score) || isNaN(weight)) {
            popUps.attentionPopUp()
        } else {
            const StudentDetails = {
                Course: course,
                Score: score,
                Weight:weight,
                storeRecord:function(){
                    
                    //refuse to push if weight is more than 100%
                    if(this.Weight > 100){
                               popUps.exceedingPopUp()

                    }else{
                        studentsRecords.push(
                            {
                                ID: index++,
                                Course:this.Course,
                                Score: this.Score,
                                Weight:this.Weight,
                            }
                        )
                    }    

                },
                displayValue:function(){

                    const tr = document.createElement("tr");
                    const tbody = document.querySelector("tbody")


                    //creating an individual variable for the 
                    const tdID = document.createElement("td")
                    tdID.innerText = studentsRecords[studentsRecords.length -1].ID
                    
                    const tdCourse = document.createElement("td");
                    tdCourse.innerText = studentsRecords[studentsRecords.length -1].Course

                    const tdScore = document.createElement("td")
                    tdScore.innerText = studentsRecords[studentsRecords.length -1].Score

                    const tdWeight = document.createElement("td")
                    tdWeight.innerText = studentsRecords[studentsRecords.length -1].Weight

                    const tdActionBtn= document.createElement("td")
                    tdActionBtn.innerHTML = `<div class="actionContainer">
                                            <button class="actionBtn , saveBtn">save</button>    
                                            <button class="actionBtn , deleteBtn">Delete</button>
                                        </div>`

                    //joining the variable to their parents
                    
                    tr.appendChild(tdID)
                    tr.appendChild(tdCourse)
                    tr.appendChild(tdScore)
                    tr.appendChild(tdWeight)
                    tr.appendChild(tdActionBtn)                                                
                    tbody.appendChild(tr)

                    //clear the input field 
                    const restCourse = document.getElementById("Course").value = " ";
                    const restWeight = document.getElementById("weightCourse").value = "";
                    const restScore = document.getElementById("scoreCourse").value = "";

                }
        }

        StudentDetails.storeRecord()
        performCalculation()
        StudentDetails.displayValue()

    }


    });


    //clear all data from the table 
    clearAllBtn.addEventListener("click",()=>{
        
        studentsRecords = []
        index = 1

        const tBody = document.querySelector("tbody");
        tBody.innerHTML = " "

        const letterGrade = document.querySelector(".letterGrade")
        const weightTotal = document.querySelector(".weightTotal");

        letterGrade.style.display = "none"
        weightTotal.innerText = "0.00%"

    })

// creating a group of Pops 
const popUps = {
    attentionPopUp: function(){
        warningContainer.style.visibility = "visible";
    },
    exceedingPopUp:function(){        
    //weight total can npt be over 100%
        exceedingWeight.style.visibility = "visible";
  
}
}

closeBtn.forEach(button =>{
    button.addEventListener("click", function(){
        button.parentElement.parentElement.style.visibility = "hidden" ;

    })
})

function performCalculation(){

//get the final grade result
    let totalScore = 0;
    let totalWeight = 0;

    studentsRecords.forEach(mark => {
        totalScore += mark.Score * mark.Weight;
        totalWeight += mark.Weight;
    });
    
    let finalGrade = totalScore / totalWeight;



    //Determining the grade letter and displaying them
    const letterGrade = document.querySelector(".letterGrade")
    const weightTotal = document.querySelector(".weightTotal");

    weightTotal.innerText = parseFloat(totalWeight) +"%" 

    if(finalGrade>= 90){
        letterGrade.innerText = "A";
        letterGrade.style.backgroundColor = "#07b13f5d";  
        letterGrade.style.borderColor = "#008631";
    }else if(finalGrade >= 80){
        letterGrade.innerText = "B";
        letterGrade.style.backgroundColor = "#07b13f5d";  
        letterGrade.style.borderColor = "#008631";
    }else if(finalGrade>= 70){
        letterGrade.innerText = "C";
        letterGrade.style.backgroundColor = "#b1b1075d";  
        letterGrade.style.borderColor = "#868600";
    }else if(finalGrade >= 60){
        letterGrade.innerText = "D";
        letterGrade.style.backgroundColor = "#b1a3075d";  
        letterGrade.style.borderColor = "#867b00";
    }else if(finalGrade >= 50){
        letterGrade.innerText = "E";
        letterGrade.style.backgroundColor = "#b140075d";  
        letterGrade.style.borderColor = "#862f00";
    }else{
        letterGrade.innerText = "F";
        letterGrade.style.backgroundColor = "#b107075d";  
        letterGrade.style.borderColor = "#860000";
    }
    // making letter grade visible to see
    letterGrade.style.display = "inline";

    // incase the student record is empty
    if(studentsRecords.length === 0){
        letterGrade.style.display = "none";
        weightTotal.innerText = "0.00%"     
    }

    
}


// remove data row
dataContainer.addEventListener("click", (e)=>{

    //We seeing if the user clicked the tbody and deleteBtn
    if(e.target && e.target.classList.contains("deleteBtn")){

        //if user did get me the that table row where the button is in 
        const row = e.target.closest("tr")
        
        // get the id/index of where the button was licked
        const id = parseInt(row.querySelector("td").innerText)

        //now we remove that row
        row.remove()
        
        //we im going to update the student record
        studentsRecords = studentsRecords.filter(record => record.ID !== id)
        
        // resting the value 
        performCalculation()
        
    }

    

})
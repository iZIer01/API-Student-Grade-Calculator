//variable
const course = document.getElementById("Course")
const weight = document.getElementById("weightCourse")
const score = document.getElementById("scoreCourse")
const warningContainer = document.querySelector(".warningContainer")

//Buttons
const closeBtn = document.querySelector(".closeBtn")
const addRecBtn = document.getElementById("addBtn");
const clearAllBtn = document.getElementById("clearBtn");
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
            performCalculation:function(){

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


            },
            storeRecord:function(){
                studentsRecords.push(
                    {
                        ID: index++,
                        Course:this.Course,
                        Score: this.Score,
                        Weight:this.Weight,
                    }
                )
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


            }
    }

    StudentDetails.storeRecord()
    StudentDetails.performCalculation()
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
    }
}

closeBtn.addEventListener("click",()=>{
    warningContainer.style.visibility = "hidden";

})
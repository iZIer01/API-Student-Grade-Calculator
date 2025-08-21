let course = "Bio"
let score = 10
let weight = 12

let studentsRecords = []

let index = 1;

const StudentDetails = {
            ID: index++,
            Course: course,
            Score: score,
            Weight:weight,
           
            push: function(){
                studentsRecords.push(
                    {
            ID: this.ID,
            Course: this.Course,
            Score: this.Score,
            Weight:this.Weight
                    }
                )
            },
             performCalculation:function(){

                weightedScore = this.Score *(this.Weight/100);

                if(wi)
            }
    
}

StudentDetails.push()

console.log(studentsRecords[0].Weight)   // dot notation
// or
console.log(studentsRecords[0]["Weight"]) // bracket notation

studentsRecords.forEach(function(element){
    console.log(element.Score)
})

console.log(studentsRecords[studentsRecords.length - 1].ID)




console.log(StudentDetails.performCalculation())
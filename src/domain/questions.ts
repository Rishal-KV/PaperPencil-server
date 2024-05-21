interface Question {
    _id?:string
    question : string,
    options : string[];
    correctOption : number;
    courseId:string
    
}

export default Question
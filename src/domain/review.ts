interface Review {
    courseId:string,
    reviews :[{
        studentId : string,
        reviewText : string,
        rating : number,
        createdAt : any
    }]
}
export default Review
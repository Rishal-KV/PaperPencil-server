import Review from "../../domain/review"

interface IReview {
addReview(reviewData:string,studentId:string):Promise<{review:boolean}>
checkReview(studentId:string,courseId):Promise<boolean>
fetchReview(courseId:string):Promise<Review | null>
}
 
export default IReview
import ReviewRepo from "../infrastructure/repository/reviewRepo";
class ReviewUseCase {
  private reviewRepo: ReviewRepo;
  constructor(reviewRepo: ReviewRepo) {
    this.reviewRepo = reviewRepo;
  }

  async review(review: { review: string; rating: number }, studentId: string) {
    try {
      // console.log(studentId + "#usecase");
      // console.log(review,"usecase");

      let response = await this.reviewRepo.addReview(review, studentId);
      if (response.review) {
        return {
          status: response.review,
          message: "review added successfully",
        };
      } else {
        return { status: response.review };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async checkReview(courseId: string, studentId: string) {
    try {
      // console.log(courseId , + " " + studentId + "###useCase");
      // console.log("check review");

      let reviewAdded = await this.reviewRepo.checkReview(studentId, courseId);
      if (reviewAdded) {
        return { status: true };
      } else {
        return { status: false };
      }
    } catch (error) {
      console.log(error);
    }
  }
  async fetchReview(courseId: string) {
    try {
      const response = await this.reviewRepo.fetchReview(courseId);
      console.log(response);
      
      if (response) {
        return response;
      } else {
        return response;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default ReviewUseCase;

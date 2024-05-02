import reviewModel from "../database/review";
import IReview from "../../useCase/interface/IReview";
import Review from "../../domain/review";

class ReviewRepo implements IReview {
  async addReview(
    reviewData: any,
    studentId: string
  ): Promise<{ review: boolean }> {
    try {
      const { courseId, review, rating } = reviewData;

      const reviewAdded = await reviewModel.findOne({
        courseId: reviewData.courseId,
      });

      if (reviewAdded) {
        await reviewModel.findOneAndUpdate(
          { courseId: courseId },
          {
            $push: {
              reviews: {
                studentId: studentId,
                reviewText: review,
                rating: rating,
              },
            },
          }
        );
        return { review: true };
      } else {
        await reviewModel.create({
          courseId: courseId,
          reviews: [
            {
              studentId: studentId,
              reviewText: review,
              rating: rating,
            },
          ],
        });
        return { review: true };
      }
    } catch (error) {
      throw error;
    }
  }
  async checkReview(studentId: string, courseId: string): Promise<boolean> {
    // console.log(studentId, courseId, + "oooo");
    console.log(courseId, "repoo");

    try {
      const reviewed = await reviewModel.findOne(
        { courseId: courseId },
        {
          reviews: { $elemMatch: { studentId: studentId } },
        }
      );
     

      if (reviewed?.reviews && reviewed.reviews.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }
  async fetchReview(courseId: string): Promise<Review | null> {
    try {
      const reviews = await reviewModel
        .findOne({ courseId: courseId })
        .populate("reviews.studentId");
      if (reviews) {
        return reviews;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default ReviewRepo;

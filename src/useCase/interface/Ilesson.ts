import Lesson from "../../domain/lessons";
interface Ilesson {
  addLesson(lessonUrl: string,title:string): Promise<Lesson>;
}
export default Ilesson;

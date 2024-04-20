import Lesson from "../../domain/lessons";
interface Ilesson {
  addLesson(lessonUrl: string,title:string): Promise<Lesson>;
  deleteLesson(id:string):Promise<boolean>
}
export default Ilesson;

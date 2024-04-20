import chapter from "../../domain/chapter"
interface IChapter{ 
    createChapter(chapter:string,order:number,id:string):Promise<chapter>
    getChapterById(id:string):Promise<chapter[] | null>
    insertLesson(id:string,lesson:string):Promise<Boolean>
    findChapterOfCourse(id:string):Promise<chapter[]>
    editChapter(id:string,title:string,order:number):Promise<boolean>
    deleteLesson(courseId:string,lessonId:string):Promise<boolean>
}
export default IChapter
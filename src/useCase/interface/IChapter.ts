import chapter from "../../domain/chapter"
interface IChapter{ 
    createChapter(chapter:string,id:string):Promise<chapter>
    getChapterById(id:string):Promise<chapter[] | null>
    insertLesson(id:string,lesson:string):Promise<Boolean>
    findChapterOfCourse(id:string):Promise<chapter[]>
}
export default IChapter
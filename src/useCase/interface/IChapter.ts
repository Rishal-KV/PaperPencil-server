import chapter from "../../domain/chapter"
interface IChapter{ 
    createChapter(chapter:string,id:string):Promise<chapter>
    getChapterById(id:string):Promise<chapter[] | null>
}
export default IChapter
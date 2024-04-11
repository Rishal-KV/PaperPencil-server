import chapterModel from "../database/chapter";
import Chapter from "../../useCase/interface/IChapter";
import chapter from "../../domain/chapter";
class ChapterRepo implements Chapter {
   async  createChapter(chapter:string,id:string): Promise<chapter> {
    console.log(chapter)
    
    try {
        let chapterAdded = await chapterModel.create({
          title : chapter,
          course : id
        })
        return chapterAdded

    } catch (error) {
        throw error
    }
        
    }
    async getChapterById(id: string): Promise<chapter[] | null> {
        let chapters = await chapterModel.find({course:id});
        if (chapters) {
            return chapters
        }else{
            return null
        }
    }
}
export default ChapterRepo
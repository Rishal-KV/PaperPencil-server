import Category from "../../domain/categroy"
interface ICategory{
    findCategory(name:string):Promise<Category|null>
    saveCategory(name:string):Promise<Category | null>
    fetchCategory():Promise<Category[]|null>
    actionCategory(id:string):Promise<boolean>
    updateCategory(catId:string,cat:string):Promise<boolean|Category>
    getSpecific_category(id:string) : Promise<Category | null>
}

export default ICategory
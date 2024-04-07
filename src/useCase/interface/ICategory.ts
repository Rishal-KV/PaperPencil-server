import Category from "../../domain/categroy"
interface ICategory{
    findCategory(name:string):Promise<Category|null>
    saveCategory(name:string):Promise<Category | null>
    fetchCategory():Promise<Category[]|null>
    actionCategory(id:string):Promise<boolean>
}

export default ICategory
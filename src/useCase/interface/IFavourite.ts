import Favourites from "../../domain/favourites"

interface IFavourite {
    addToFavourite(studentId:string, courseId:string):Promise<boolean>
    fetchFavourites(studentId:string):Promise<Favourites | null>
}

export default IFavourite
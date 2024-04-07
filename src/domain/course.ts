interface Course {
    _id : string,
    name: string,
    price: number,
    description: string,
    chapters: string[],
    approved: Boolean,
    listed: Boolean,
    image : string


}
export default Course
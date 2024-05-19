interface Course {
    _id : string,
    instructor:string
    name: string,
    price: number,
    description: string,
    category:string
    approved: Boolean,
    listed: Boolean,
    image : string
    adminVerified :boolean,
    publish:boolean
    questions : string[]


}
export default Course
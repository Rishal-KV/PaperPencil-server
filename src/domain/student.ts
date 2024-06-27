interface student {
    _id: string,
    name: string,
    email: string,
    number:number
    password: string,
    is_blocked: boolean,
    is_Verified:boolean
    about: string,
    googleId:string
    profileImage:string
    googleAuth : boolean

}
export default student
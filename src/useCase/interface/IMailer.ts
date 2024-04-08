interface Imailer{
    sendMail(to:string, otp:number):Promise<any>
    sendVerificationMail(id:any,to:any):Promise<any>
}
export default Imailer
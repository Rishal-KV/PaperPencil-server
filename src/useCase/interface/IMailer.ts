interface Imailer{
    sendMail(to:string, otp:number):Promise<any>
}
export default Imailer
import bcrypt from 'bcrypt';

class Bcrypt{
    async hashPass(password:string){
         try {
            console.log(password);
            
            let bcryptedPassword = bcrypt.hash(password,10);
            return bcryptedPassword
         } catch (error) {
            console.log(error);
            
            
         }
    }

    async encryptPass(password:string, hashpass:any ){
        try {
            let verifiedPass = bcrypt.compare(password,hashpass)
            return verifiedPass
        } catch (error) {
           console.log(error) 
        }
    }
}

export default Bcrypt
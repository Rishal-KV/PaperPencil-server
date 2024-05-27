interface  Admin{
    _id : string,
    email:string,
    password:string
}
export default Admin


export interface MonthlySales {
    _id: { year: number, month: number };
    totalSales: number;
    enrollmentCount: number;
  }
  
  export interface CompleteMonthlySales {
    year: number;
    month: number;
    totalSales: number;
    enrollmentCount: number;
    profit: number;
  }
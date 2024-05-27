 interface Chapter {
    _id?: string;
    title: string;
    description:string
    lessons?: string[];
    course: string;
    order:number
    createdAt?: Date;
    updatedAt?: Date;
  }
  export default Chapter
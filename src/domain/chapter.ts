 interface Chapter {
    _id?: string;
    title: string;
    lessons?: string[];
    course: string;
    order:number
    createdAt?: Date;
    updatedAt?: Date;
  }
  export default Chapter
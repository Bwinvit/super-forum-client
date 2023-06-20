import Category from "./Category";
import ThreadItem from "./ThreadItem";
import User from "./User";

export default class Thread {
    constructor(
        public id: string,
        public views: number,
        public title: any,
        public body: string | undefined,
        public user: User,
        public points: number,
        public createdOn: Date,
        public lastModifiedOn: Date,
        public threadItems: Array<ThreadItem>,
        public category: Category
    ) { }
}
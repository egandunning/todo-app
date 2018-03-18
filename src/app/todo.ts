export class Todo {
    constructor(
        public _id: string,
        public creator: string,
        public text: string,
        public completed: boolean,
        public completedAt: number) { }
}
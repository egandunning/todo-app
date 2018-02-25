export class Todo {
    constructor(
        public creator: string,
        public text: string,
        public completed: boolean,
        public completedAt: number) { }
}
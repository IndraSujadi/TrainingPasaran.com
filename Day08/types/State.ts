export type Items = {
    id: string;
    name: string;
    isDone : boolean
}

export type State = {
    todoItems: Array<Items>,
    newItem : string,
}
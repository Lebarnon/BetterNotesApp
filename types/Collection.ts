import AppDocument from "./AppDocument";

export default interface Collection {
    id: string|null,
    name: string,
    icon: string,
    dateCreated: any,
    documents: Array<AppDocument>,
}

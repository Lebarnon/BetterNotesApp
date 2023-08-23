export default interface AppDocument {
    id: string,
    name: string,
    type: string,
    size: number,
    icon: string,
    dateCreated: any,
    downloadURL: string | null,
    status: string
}


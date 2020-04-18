import {Id} from "../../../../domain/id/id";

export interface SectionsFooter{
    id:Id
    title:string
    links: { name: string, url: string }[]
}
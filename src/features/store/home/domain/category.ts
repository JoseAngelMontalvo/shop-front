import {Id} from "../../../../core/domain/id/id";

export interface Category {
    id: Id
    text: string
    link:string
    type:'material-icons' | 'comercio-chino-icons',
    content:string
}
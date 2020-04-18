export interface Product{
    _id:string
    name:string
    lastname:string
    email:string
    password:number
    googleid:string
    ownauth:boolean
    googleauth:boolean
    state:"ACTIVATED" | "DEACTIVATED"
    role:"USER_ROLE" | "ADMIN_ROLE" | "SUPERADMIN_ROLE"
    products:string[]
    shops:string[]
}
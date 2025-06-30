export interface Size {
    code : string;
    name : string; 
    description: string;
}


export interface Product {
    id : number;
    name : string;
    price : number;
    description : string;
    features : string [];
    mainImage : string;
    images : string [];
    sizes : Size [];
    categoriy : string;
}


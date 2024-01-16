import { Document } from 'mongoose';

export interface Catalog extends Document {
    readonly name: string,
    readonly crop: string,
    readonly antherCulture: string,  
    readonly silkColour: string, 
    readonly hnsNumber: string, 
    readonly price: number, 
    readonly unit: string,
    readonly createdAt: string
}
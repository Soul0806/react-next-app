// 'use client'

// Client comp
import { Index } from './client/Index';

export type Spec = {
    id: number,
    format: string,
}

export type SizeType = {
    size: string,
    format: string[],
} 

function getSpecGroup(specArr: Spec[]): SizeType[] {
    let group: SizeType[] = [];

    specArr.map((spec: Spec) => {
        let format = spec.format;
        let size = format.slice(-2);
        
        let sizeObj =  group.find(obj => obj.size == size);

        if(!sizeObj) {
            let newObj = {} as SizeType;
            newObj.size = size;
            newObj.format = [format];
            group.push(newObj);
        } else {
            sizeObj.format.push(format);
        }
    })
    return group;
}

export default async function Record() {

    const res_spec = await fetch('http://localhost:3000/api/specification', { cache: "no-store" });
    const specs = await res_spec.json();        
    const specGroup = getSpecGroup(specs);        

    const res_record = await fetch('http://localhost:3000/api/record', { cache: "no-store" });
    const records = await res_record.json();
    
    return (
        <>
            <Index specGroup={specGroup} records={records} />         
        </>
    );
}

// 'use client'

// Client comp
import FancyOption from '@/components/ui/FancyOption';
import { Index } from './client/Index';

// Type

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

const option: string[] = ['11', '22', '33'];
const defaultOption = option[0];
const n: number = option.length - 1;


export default async function Record() {

    const res_spec = await fetch('http://localhost:3000/api/specification', { cache: "no-store" });
    const specs = await res_spec.json();        
    const specGroup = getSpecGroup(specs);        

    const res_record = await fetch('http://localhost:3000/api/record', { cache: "no-store" });
    const records = await res_record.json();

    const option: string[] = ['店內', '外出'];
    const defaultOption = option[0];
    const n: number = option.length - 1;

    const fanccyOptionProp = {
        option,
        defaultOption,
        n,
        name: 'area',
        setRecord: undefined,
    }
    
    return (
        <>
            <Index specGroup={specGroup} records={records} />         
            <FancyOption option={option} defaultOption={defaultOption} n={n}/> 
        </>
    );
}

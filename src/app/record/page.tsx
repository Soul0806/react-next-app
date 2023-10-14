// 'use client'

// import { useEffect, useRef } from 'react';
import DialogRecord from './DialogRecord';

// Client comp
import Index from './client/Index';

import Search from './client/Search';

import FormText from '@/components/form/FormText';

type Spec = {
    [key: string]: string,
}
export type GroupData = {
    [key: string]: string[]
}

// function writeToNewDb(specs: Spec[]) {
//     specs.map(async (item: Spec) => {
//         const format = item.format;
//         if (format.length > 6) {
//             let new_format = format.slice(0, 3) + '/' + format.slice(4, 6) + '-' + format.slice(-2);
//             await create(table.SPECIFICATION, { format: new_format });
//         } else {
//             await create(table.SPECIFICATION, { format: format });
//         }
//     })
// }

function getGroupData(arr: Spec[]) {
    let groupData: any = {}
    arr.map((item: Spec) => {
        const format = item.format;
        const inch = format.slice(-2);
        if (groupData[inch] === undefined) {
            groupData[inch] = [format];
        } else {
            groupData[inch].push(format);
        }
    })
    return groupData;
}

export default async function Record() {

    // const refSearch = useRef<HTMLInputElement>(null);

    // Ref

    // const refView = useRef<HTMLElement>(null);

    const res_spec = await fetch('http://localhost:3000/api/specification', { cache: "no-store" });
    const specs = await res_spec.json();
    const groupData: GroupData = getGroupData(specs);


    const res_record = await fetch('http://localhost:3000/api/record', { cache: "no-store" });
    const records = await res_record.json();
    const record_last_id: string = records.at(-1).id;


    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value);
    }

    return (
        <>
            <Index groupData={groupData} lastId={record_last_id} />
        </>
    );
}

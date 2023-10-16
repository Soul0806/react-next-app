// 'use client'

// import { useEffect, useRef } from 'react';
import DialogRecord from './DialogRecord';

// Client comp
import { Index } from './client/Index';

export type Spec = {
    [key: string]: string
}

export type GroupData = {
    [key: string]: string[]
}

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

    const res_spec = await fetch('http://localhost:3000/api/specification', { cache: "no-store" });
    const specs = await res_spec.json();
    const groupData: GroupData = getGroupData(specs);


    const res_record = await fetch('http://localhost:3000/api/record', { cache: "no-store" });
    const records: any[] = await res_record.json();
    const record_last_id: string = records.at(-1).id;

    return (
        <>
            <Index groupData={groupData} records={records} />
        </>
    );
}

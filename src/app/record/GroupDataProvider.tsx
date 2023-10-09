'use client'

import React, { useState, useEffect, createContext, useContext } from "react";
import { queryData, table } from '@/utils/readData';

type Spec = {
    [key: string]: string,
}

type GroupData = {
    [key: string]: Spec[]
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

const GroupDataContext = createContext<GroupData | null>(null);

export function useGropuData() {
    return useContext(GroupDataContext)
}
export function GroupDataProvider({ children } : { children: React.ReactNode}) {
    const [ groupData, setGroupData ] = useState<GroupData | null>();

    return (
        <GroupDataContext.Provider value={groupData}>
            {children}
        </GroupDataContext.Provider>
    )   
}
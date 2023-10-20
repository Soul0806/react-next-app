'use client'

// React 
import { createContext, useContext, useRef, useState } from "react";

// Client comp
import DialogRecord from "../DialogRecord";
import Input from '@/components/form/Input';
// import Search from "./Search";

// Type
import type { GroupData } from "../DialogRecord";

export const RecordContext = createContext<any | null>(null);

export type Record = {
    [key: string]: string
}

type GroupRecord = {
    [key: string]: Record[]
}

type Props = {
    groupData: GroupData,
    records: any[],
}

const test = 123;

function groupRecord(records: Record[]) {
    const group_record: GroupRecord = {};

    records.map((item: Record) => {
        const date = item.date;
        if (group_record[date] == undefined) {
            group_record[date] = [item];
        } else {
            group_record[date].push(item);
        }
    })

    return group_record;
}

export function Index(props: Props) {

    const { groupData, records } = props;
    const [filteredRecord, SetFilteredRecord] = useState<GroupRecord>({});
    const [keys, setKeys] = useState<string[]>([]);

    // const [t, tt] = useState([1, 2, 3, 4, 5]);

    // Timeout id 
    // const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>[]>([]);

    const lastId = records.at(-1).id;

    // Ref
    const refInput = useRef<HTMLInputElement>(null);
    const refView = useRef<HTMLDivElement>(null);

    function onchange(e: React.ChangeEvent<HTMLInputElement>) {

        const search = e.target.value;

        if (refView.current) {
            refView.current.addEventListener('animationend', function () {
                this.classList.remove('record__view__records');
            })
        }

        if (search == '') {
            setKeys([]);
            return;
        }

        const result: any[] = records.filter(item => {
            return item.spec.match(search) || item.note.match(search);
        })
        const group = groupRecord(result);
        const keys = Object.keys(group).reverse();
        SetFilteredRecord(group);
        setKeys(keys);

        if (refView.current) {
            refView.current.classList.add('record__view__records');
        }

    }
    return (
        <RecordContext.Provider value={{ setKeys }}>
            <div className="record">
                <div className="wrapper">
                    <div className="record__operate">
                        <DialogRecord groupData={groupData} lastId={lastId} />
                        <div className="record__operate__input">
                            <Input ref={refInput} onchange={onchange} placeholder="搜尋規格" />
                        </div>
                        {/* <div className="record__operate__groupview" style={toggleGroupViewShow}>
                                <div className="groupview__wrapper">
                                    <div className="groupview__menu">
                                        <svg className="groupview__close" style={toggleSearchClose} onClick={searchDelete} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                            <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z"></path>
                                        </svg>
                                    </div>
                                    <GroupView filteredSale={filteredSale} groupViewProps={groupViewProps} />
                                </div>
                            </div> */}
                    </div>
                    {/* <input id="datepicker" /> */}
                    <section className="record__view">
                        <div ref={refView}>
                            {keys.map((key, index) => (
                                <div key={index}>
                                    <div>{key}</div>
                                    <ul>
                                        {filteredRecord[key].map(item => (
                                            <li key={item.id}>
                                                <div>{item.spec} -- {item.note}</div>
                                            </li>
                                        )
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div >
                    </section>
                    {/* <section className="record__view">
                            <div className="record__overview__view">
                                {!isEmpty(salesState.dbSale) &&
                                    <>
                                        {salesState.dbSale.map(sale => {
                                            return <Sale key={sale.id} sale={sale} salesState={salesState} remove={remove} />
                                        })
                                        }
                                    </>
                                }
                            </div>
                        </section> */}
                </div >
            </div >
        </RecordContext.Provider>
    );
}

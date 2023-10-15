'use client'

// React 
import { useRef, useState } from "react";

// Client comp
import DialogRecord from "../DialogRecord";
import Search from "./Search";

// Type
import type { GroupData } from "../DialogRecord";

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

function Index(props: Props) {

    const { groupData, records } = props;
    const [filteredRecord, SetFilteredRecord] = useState<GroupRecord>({});
    const [keys, setKeys] = useState<string[]>([]);

    // Timeout id 
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>[]>([]);
    // const [group, setGroup] = useState<GroupData>({});

    const lastId = records.at(-1).id;
    const refView = useRef<HTMLElement>(null);

    function onchange(e: React.ChangeEvent<HTMLInputElement>) {

        // Clear timeout
        timeoutId.map(item => {
            clearTimeout(item);
        })

        // Remove element innerHTML
        if (refView.current) {
            refView.current.innerHTML = "";
        }


        const search = e.target.value;
        const result: any[] = records.filter(item => {
            return item.spec.match(search) || item.note.match(search);
        })

        const group = groupRecord(result);
        const keys = Object.keys(group).reverse();

        SetFilteredRecord(group);
        setKeys(keys);

        records.map((item, index) => {
            const id = setTimeout(() => {
                const div = document.createElement('div');
                div.innerHTML = item.spec;
                refView.current?.appendChild(div);
                div.classList.toggle('record');
            }, 20 * index)

            setTimeoutId((prev) => [...prev, id]);
        })
    }
    return (
        // <div>123</div>
        <div className="record">
            <div className="wrapper">
                <div className="record__operate">
                    <DialogRecord groupData={groupData} lastId={lastId} />
                    <div className="record__operate__input">
                        <Search onchange={onchange} />
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
                <section ref={refView} className="record__view">
                    {/* {keys.map((key, index) => (
                        <>
                            <div>{key}</div>
                            <ul>
                                <li>
                                    {filteredRecord[key].map(item => (
                                        <div key={item.id}>{item.spec}</div>
                                    )
                                    )}
                                </li>
                            </ul>
                        </>
                    ))
                    } */}
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
            </div>
        </div>
    );
}

export default Index;
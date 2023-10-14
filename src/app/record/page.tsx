import DialogRecord from './DialogRecord';

// Client comp

import Search from './client/Search';

import { FormText } from '@/components/form/FormText';
type Spec = {
    [key: string]: string,
}
type GroupData = {
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

    const res_spec = await fetch('http://localhost:3000/api/specification', { cache: "no-store" });
    const specs = await res_spec.json();
    const groupData = getGroupData(specs);

    const res_record = await fetch('http://localhost:3000/api/record', { cache: "no-store" });
    const records = await res_record.json();
    const record_last_id = records.at(-1).id;


    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value);
    }

    return (
        <>
            <div className="record">
                <div className="wrapper">
                    <div className="record__sidebar">
                        <div className="record__operate">
                            <DialogRecord groupData={groupData} lastId={record_last_id} />
                            <Search />
                            {/* <div className="record__operate__input">
                                <input type="text" name="search" ref={refSearch} onChange={handleSearch} />
                                <svg className="feather feather-search" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
                            </div> */}
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
                    </div>
                    <section className="record__view">
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
        </>
    );
}

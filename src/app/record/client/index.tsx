'use client'

// React 
import { useRef } from "react";

// Client comp
import DialogRecord from "../DialogRecord";
import Search from "./Search";

// Type
import type { GroupData } from "../DialogRecord";

type Props = {
    groupData: GroupData,
    lastId: string,
}

function Index(props: Props) {
    const { groupData, lastId } = props;

    const refView = useRef<HTMLElement>(null);
    return (
        // <div>123</div>
        <div className="record">
            <div className="wrapper">
                <div className="record__operate">
                    <DialogRecord refView={refView} groupData={groupData} lastId={lastId} />
                    <div className="record__operate__input">
                        <Search />
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
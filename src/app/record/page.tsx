import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

import DialogRecord from './DialogRecord';
import readLocalJson from './readLocalJson';

import { queryData } from '@/utils/getFormat';
import { create } from '@/utils/createFormat';

type Spec = {
    id: Number,
    format: String
}

async function getServerSideProps(): Promise<Spec> {
    const res = await fetch('http://localhost:9000');
    return res.json();
}

export default async function Record()  {
    const sales = readLocalJson();
    const spec = await getServerSideProps();
    if (false) {
        // const spec_result = await create(spec);
    }
    // const result = await queryData();
    // console.log(result);

    return (
        <>
            <div className="record">
                <div className="wrapper">
                    <div className="record__sidebar">
                        <DialogRecord />
                        <div className="record__operate">
                            <div className="record__operate__insert">
                                <button type="button" className="btn btn-sm btn-secondary dialog__sale__open">
                                    新增銷售
                                </button>
                            </div>
                            {/* <div className="record__operate__input">
                                <input id="" type="text" ref={refSearch} onChange={handleSearch} />
                                <svg class="feather feather-search" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
                            </div>
                            <div className="record__operate__groupview" style={toggleGroupViewShow}>
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

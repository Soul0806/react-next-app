'use client'

import { useRef, useEffect, createContext, useContext, forwardRef } from "react";
import RecordForm from "./RecordForm";
import { Dom } from "@/lib/helper";

import { queryData, table } from '@/utils/readData';

export type GroupData = {
    [key: string]: string[]
}
export const Context = createContext<GroupData | {}>({});
// export const LastIdContext = createContext<string | null>(null);

type Props = {
    groupData: GroupData,
    lastId: string,
}

const DialogRecord = ({ groupData, lastId }: Props) => {
    // const refSearch = useRef('');
    const ref = useRef(false);
    const refDate = useRef(new Date());
    const refDialogsRecord = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // document.getElementById('datepicker').innerHTML = "";

        if (ref.current) {
            Dom('.dialog__sale__open').event('click', () => {
                refDialogsRecord?.current?.showModal();
            })
            Dom('.dialog__close').event('click', () => {
                refDialogsRecord?.current?.close();
            })
            Dom(refDialogsRecord?.current).event('click', (e: React.MouseEvent<HTMLElement>) => {
                const dialogDimensions = refDialogsRecord?.current?.getBoundingClientRect();
                if (dialogDimensions != null) {
                    if (
                        e.clientX > dialogDimensions.right ||
                        e.clientX < dialogDimensions.left ||
                        e.clientY < dialogDimensions.top ||
                        e.clientY > dialogDimensions.bottom
                    ) {
                        refDialogsRecord?.current?.close();
                    }
                }
            })

            // Dom('.overlap').event('click', (e) => {
            //     refSearch.current.value = '';
            //     setSearchClose(false);
            //     setGroupViewShow(false);
            // });
            // const picker = new AirDatepicker('#datepicker', {
            //     navTitles: {
            //         days: dt.getTodayDate()
            //     },
            //     locale: localeEn,
            //     // inline: true,
            //     buttons: [prevBtn, button, nextBtn],
            //     onSelect: function ({ date, datepicker }) {
            //         if (!date) return;
            //         datepicker.nav.$title.innerHTML = date.toDate();
            //         getDbSale(date.toDate()).then(({ id, sale: res }) => salesState.setDbSale(res))
            //     },
            // });

        }
        return () => {
            ref.current = true;
        }
    }, [])
    return (
        <>
            <Context.Provider value={{ groupData, lastId }}>
                <div className="record__operate__insert">
                    <button type="button" className="dialog__sale__open">
                        新增銷售
                    </button>
                </div>
                <dialog ref={refDialogsRecord}>
                    <div className="wrapper">
                        <div className="dialog__menu">
                            <h5 className="dialog__title">新增銷售</h5>
                            <span className="material-symbols-outlined dialog__close">
                                Close
                            </span>
                        </div>
                        <RecordForm />
                    </div>
                </dialog>
            </Context.Provider>
        </>
    )
}
export default DialogRecord;

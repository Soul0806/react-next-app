'use client'

import { useRef, useEffect, createContext, useContext, forwardRef, RefObject } from "react";
import RecordForm from "./RecordForm";
import { Dom } from "@/lib/helper";

export type GroupData = {
    [key: string]: string[]
}
export const Context = createContext<GroupData | {}>({});
// export const LastIdContext = createContext<string | null>(null);

type Props = {
    groupData: GroupData,
    lastId: string,
}



export default function DialogRecord({ groupData, lastId }: Props) {
    // const refSearch = useRef('');
    const ref = useRef(false);
    const refDate = useRef(new Date());
    const refDialogsRecord = useRef(null);

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
                <dialog className="dialog" ref={refDialogsRecord}>
                    <div className="wrapper">
                        <div className="dialog-menu">
                            <h5 className="dialog-title">新增銷售</h5>
                            <span className="material-symbols-outlined dialog__close">
                                Close
                            </span>
                        </div>
                        <RecordForm ref={refDialogsRecord}/>
                    </div>
                </dialog>
            </Context.Provider>
        </>
    )
}

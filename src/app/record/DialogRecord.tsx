'use client'

import { useRef, useEffect, MutableRefObject } from "react";
import { Dom } from "@/lib/helper";

const DialogRecord = () => {
    // const refSearch = useRef('');
    const ref = useRef(false);
    const refDate = useRef(new Date());
    const refDialogsale = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        // document.getElementById('datepicker').innerHTML = "";

        if (ref.current) {
            Dom('.dialog__sale__open').event('click', () => {
                refDialogsale?.current?.showModal();
            })
            Dom('.dialog__close').event('click', () => {
                refDialogsale?.current?.close();
            })
            Dom(refDialogsale.current).event('click', (e: React.MouseEvent<HTMLElement>) => {
                const dialogDimensions = refDialogsale?.current?.getBoundingClientRect();
                if (dialogDimensions != null) {
                    if (
                        e.clientX > dialogDimensions.right ||
                        e.clientX < dialogDimensions.left ||
                        e.clientY < dialogDimensions.top ||
                        e.clientY > dialogDimensions.bottom
                    ) {
                        refDialogsale?.current?.close();
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
        <dialog className="dialog dialog__sale" ref={refDialogsale}>
            <div className="wrapper">
                <div className="dialog__menu">
                    <h5 className="dialog__title">新增銷售</h5>
                    <span className="material-symbols-outlined dialog__close">
                        Close
                    </span>
                </div>
                {/* <RecordForm salesState={salesState} /> */}
            </div>
        </dialog>
    );
}
export default DialogRecord;

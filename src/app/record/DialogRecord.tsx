'use client'

// React
import { useRef, useEffect, forwardRef, RefObject, useState } from "react";

// Clinet comp
import RecordForm from "./RecordForm";

// Helper
import { Dom } from "@/lib/helper"

// Type
export type GroupData = {
    [key: string]: string[]
}

export default function DialogRecord() {

    // State

    // Ref 
    const ref = useRef<boolean>(false);
    // const refDate = useRef(new Date());
    const refDialogClose = useRef<HTMLSpanElement | null>(null);
    const refDialogsRecord = useRef<HTMLDialogElement| null>(null);

    useEffect(() => {
        
        if (ref.current) {
            Dom('.dialog-sale__open').event('click', () => {
                refDialogsRecord?.current?.showModal();
            })
            refDialogClose.current?.addEventListener('click', () => {
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

    // Event 
    function changeForm() {
        if(refDialogsRecord.current) {
            
            const form: HTMLElement | null = refDialogsRecord.current?.querySelector('.dialog-form');

            if(form) {
                form.style.flexDirection = 'row';
                refDialogsRecord.current.style.maxHeight = 'auto';
                refDialogsRecord.current.style.width = '90%';
            } else {
                // form.style.flexDirection = 'column';
                // refDialogsRecord.current.style.maxHeight = originHeight.toString();
                // refDialogsRecord.current.style.width = originWidth.toString();
            }            
        }
        
    }
    return (
        <>
            <div className="record__operate__insert">
                <button type="button" className="dialog-sale__open">
                    新增銷售
                </button>
            </div>
            <dialog className="dialog" ref={refDialogsRecord}>
                <div className="wrapper">
                    <div className="dialog-menu">
                        <button type="button" onClick={changeForm}>Click</button>
                        <h5 className="dialog-title">新增銷售</h5>
                        <span ref={refDialogClose} className="material-symbols-outlined dialog-close">
                            Close
                        </span>
                    </div>
                    <RecordForm ref={refDialogsRecord} />
                </div>
            </dialog>
        </>
    )
}

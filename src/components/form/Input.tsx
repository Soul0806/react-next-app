'use client'

// React
import React, { FC, forwardRef, useContext, useRef } from "react";

// Context
import { RecordContext } from "@/app/record/client/Index";

// THird party
import { isEmpty } from "lodash";

// Css 
// import style from '@/styles/comps/form.module.css';

type Props = {
    label?: string,
    placeholder?: string,
    insertBtn?: any,
    onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onclick?: (e: React.MouseEvent<HTMLInputElement>) => void,
}

const Input = forwardRef((props: Props, ref: any) => {
    const { label, insertBtn, onchange, onclick, ...inputs } = props;

    // ref 
    const refInput = useRef<HTMLInputElement>(null);

    // Use context 
    const { setKeys } = useContext(RecordContext);
    // 
    function clearInput() {
        if (ref.current) {
            ref.current.value = "";
        }
        setKeys([]);
    }
    return (
        <div className="input-wrapper">
            <label className="input-label">{label}
                <input ref={ref} className="input-elem" onChange={onchange} {...inputs}
                />
            </label>
            {!isEmpty(ref?.current?.value) &&
                <>
                    <button onClick={clearInput} className="input-clear">&times;</button>
                    <>
                        {
                            onclick != undefined && <button>確認</button>
                        }
                    </>
                </>
            }
            {insertBtn &&
                <button type="button" onClick={insertBtn.onclick}>{insertBtn.name}</button>
            }
            {/* <div className="input-underline"></div> */}
        </div>
    )
}
)

export default Input

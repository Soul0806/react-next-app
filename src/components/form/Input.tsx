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
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const FormText = (props: Props) => {
    const { label, onchange, ...inputs } = props;

    // ref 
    const refInput = useRef<HTMLInputElement>(null);

    // Use context 
    const { setKeys } = useContext(RecordContext);
    // 
    function clearInput() {
        if (refInput.current) {
            refInput.current.value = "";
        }
        setKeys([]);
    }
    return (
        <div className="input-wrapper">
            <label className="input-labe">{label}
                <input ref={refInput} className="input-elem" onChange={onchange} {...inputs}
                />
            </label>
            {!isEmpty(refInput?.current?.value) && <button onClick={clearInput} className="input-clear">&times;</button>}
            <div className="input-underline"></div>
        </div>
    )
}

export default FormText

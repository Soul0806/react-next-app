'use client'

// React
import React, { FC, forwardRef, useRef } from "react";

// Css 
import style from '@/styles/comps/form.module.css';

type Props = {
    label?: string,
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const FormText = (props: Props) => {
    const { label, onchange, ...inputs } = props;
    
    // ref 
    const refInput = useRef<HTMLInputElement>(null);

    function clearInput() {
        if(refInput.current) {
            refInput.current.value = "";
        }
    }
    return (
        <div className={style["input-wrapper"]}>
            <label>{label}
                <input ref={refInput} className={style["input-elem"]} onChange={onchange} {...inputs}
                />
            </label>
            <button onClick={clearInput} className={style["input-clear"]}>&times;</button>
            <div className={style["input-underline"]}></div>
        </div>
    )
}

export default FormText

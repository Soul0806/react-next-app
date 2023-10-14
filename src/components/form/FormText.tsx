'use client'

import React, { FC, forwardRef } from "react";

// export const FormText_temp = forwardRef((props, ref) => {
//     const { label, onchange, ...inputs } = props;
//     return (
//         <label>{label}
//             <input ref={ref} onChange={onchange} {...inputs}
//             />
//         </label>

//     )
// })

type Props = {
    label?: string,
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    // ref?: any
}

const FormText: FC<Props> = (props) => {
    const { label, onchange, ...inputs } = props;
    // console.log(ref);
    return (
        <div className="form__group">
            <label>{label}
                <input className="form__input" onChange={onchange} {...inputs}
                />
            </label>
            <svg className="feather feather-search" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
        </div>
    )
}

export default FormText

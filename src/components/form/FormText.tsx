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
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const FormText: FC<Props> = (props) => {
    const { label, onchange, ...inputs } = props;
    return (
        <label>{label}
            <input onChange={onchange} {...inputs}
            />
        </label>
    )
}

export default FormText

'use client'

// React
import React, { forwardRef, useContext, useRef } from "react";

// Context
import { RecordContext } from "@/app/record/context";

// THird party
import { isEmpty } from "lodash";

// Type
type Props = {
    label?: string,
    placeholder?: string,
    insertBtn?: any,
    onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onclick?: (e: React.MouseEvent<HTMLInputElement>) => void,
}

const Input = forwardRef((props: Props, ref: any) => {

    // Props
    const { label, insertBtn, onchange, onclick, ...inputs } = props;

    // Use context 
    const { setKeys } = useContext(RecordContext);
    // 
    function clearInput() {
        if (ref.current) {
            ref.current.value = "";
        }
        setKeys([]);
    }

    // Return
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
                <button type="button" onClick={insertBtn.insert}>{insertBtn.name}</button>
            }
            {/* <div className="input-underline"></div> */}
        </div>
    )
}
)

export default Input

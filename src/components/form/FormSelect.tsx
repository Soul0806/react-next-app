import React, { Children, forwardRef } from 'react'

type Props = {
    optgroup?: boolean,
    name: string,
    option: (string | number)[],
}

const ConditionalWrapper = ({ optgroup, wrapper, children }: any) =>
    optgroup ? wrapper(children) : children;

function FormSelect({optgroup, name, option}: Props, ref: any) {
    return (
        <div>
        <select name={name}>
            <ConditionalWrapper
                optgroup={optgroup}
                wrapper={(children: React.ReactNode) =>
                    <>
                        <optgroup label='--'>
                            {children}
                        </optgroup>
                        {optgroup &&
                            <>
                                <optgroup label="操作">
                                    <option value="new">新增</option>
                                </optgroup>
                            </>
                        }
                    </>}
            >
                {option.map((op: string | number, idx: number) => (
                    <option key={idx} value={op}>{op}</option>
                )
                )}
            </ConditionalWrapper>
        </select>
    </div>
    )
}


export default FormSelect
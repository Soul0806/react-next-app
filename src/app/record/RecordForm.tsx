'use client'

import { useEffect, useState, useContext, useRef, forwardRef } from 'react';
// import Router from "next/router";

import FormSelect from '@/components/form/FormSelect';
import FormRadio from '@/components/form/FormRadio';
import Input from '@/components/form/Input';

// From Data 
import { inputRadioPay, inputRadioPlace, inputRadioPrice, inputRadioService, inputTextSpec } from './RecordFormData';

// Context
import { Context } from './DialogRecord';

// import { useTire } from '../Tire/useTire';
import { dt } from '../../lib/helper';
import { axi } from '@/lib/axios';
import { notify } from '@/lib/notify';

// Third Party
import _, { isEmpty } from 'lodash'

// Air Datepicker 
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

// import css 

const RECORD_API = `http://localhost:3000/api/record`;
const SPEC_API = `http://localhost:3000/api/specification`;

type Obj = {
    [key: string]: FormDataEntryValue,
}

const RecordForm = forwardRef((props, ref) => {
    /*
    // const [inches] = useTire
    */

    // Default value 
    const DEFAULT_INCH: string = '12';
    const DEFAULT_INCH_RANGE = _.range(12, 23);

    // Context
    const { groupData, lastId }: any = useContext(Context)

    //  Router

    //  State 
    const [seed, setSeed] = useState<number>(1);
    const [format, setFormat] = useState<string[]>([]);
    const [btnBehave, setBtnBehave] = useState<string | null>(null);
    const [record, setRecord] = useState({
        // id: lastId + 1,
        area: '',
        service: '',
        inch: DEFAULT_INCH,
        // spec: '',
        price: '',
        // quantity: '',
        pay: '',
        // note: '',
        // date: dt.getTodayDate(),
    });

    const [id, setId] = useState(lastId + 1);

    // Ref
    const ref1 = useRef(false);
    const refDate = useRef<Date | Date[]>(new Date());

    const refForm = useRef<HTMLFormElement>(null);
    const refDialogInsert = useRef<HTMLDialogElement>(null);
    const refDialogClose = useRef<HTMLSpanElement>(null);
    const refInput = useRef<HTMLInputElement>(null);

    const refPrice = useRef<HTMLInputElement>(null);
    const refEmpty = useRef(record);

    let button = {
        content: 'Today',
        className: 'custom-button-classname',
        onClick: (dp: any) => {
            let date = new Date();
            dp.selectDate(date);
            dp.setViewDate(date);
            refDate.current = date;
        }
    }

    useEffect(() => {
        if (ref1.current) {
            refDialogClose.current?.addEventListener('click', function () {
                refDialogInsert?.current?.close();
            })
            const picker = new AirDatepicker('#datepicker__insert', {
                navTitles: {
                    days: dt.getTodayDate()
                },
                locale: localeEn,
                inline: true,
                buttons: [button],
                onSelect: function ({ date, datepicker }) {
                    if (!date) return;
                    datepicker.nav.$title.innerHTML = date.toLocaleString().split(' ')[0];
                    refDate.current = date;
                },
            });
        }
        return () => {
            ref1.current = true;
        }
    }, [])

    useEffect(() => {
        if (record.inch) {
            setFormat(
                groupData[record.inch].sort()
            )
        }
    }, [record.inch])

    useEffect(() => {
        if (record.inch) {
            console.log('123');
            const select = document.querySelectorAll('select')[1];

            document.querySelector('[value="new"]')?.removeAttribute('selected');
            select?.querySelector('option')?.setAttribute('selected', 'selected');

            // const selects = document.querySelectorAll('select');
            // selects[1]?.querySelector('option')?.setAttribute('selected', 'selected')
            // console.log(selects[1]?.querySelector('option'));
        }
    }, [format])


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setRecord(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let payload: Obj = {};
        const formData: FormData = new FormData(e.currentTarget);
        formData.set('date', refDate.current.toLocaleString().split(' ')[0]);
        formData.set('createdAt', dt.getDateTime())
        formData.delete('inch');

        for (let [key, value] of formData) {
            payload[key] = value;
        }
        // const result = await axi.post(RECORD_API, payload);

        // if (!isEmpty(result.data)) {
        //     const id = result.data.insertId;
        //     notify(id, () => {
        //         setId(id + 1);
        //     });

        if (btnBehave == 'insert_close') {
            ref.current.close();
        }

        refForm.current.reset();

        setRecord(refEmpty.current);

    }
    function handleInsert() {
        if(refDialogInsert.current) {
            refDialogInsert.current.showModal();
        }
    }
    const insertBtn = {
        name: '新增',
        insert:  async (e: React.FormEvent<HTMLFormElement>) => {
            if (refInput.current) {
                const format = refInput?.current?.value
                const inch = format?.slice(-2);

                document.querySelector(`[value="${inch}"]`)?.setAttribute('selected', 'selected');
                setRecord((prev): any => {
                    return {
                        ...prev,
                        inch: inch
                    }
                })

                const payload = {
                    format: format
                }

                const result = await axi.post(SPEC_API, payload);
                groupData[inch].push(format);
                setSeed(Math.random);

                refInput.current.value = '';
                refDialogInsert?.current?.close();
            }
        }
    }
    return (
        <>
            <form method="post" onSubmit={handleSubmit} ref={refForm} className="dialog-form" autoComplete="off">
                <dialog style={{ width: '30%' }} className="dialog" ref={refDialogInsert}>
                    <div className="wrapper">
                        <div className="dialog-menu">
                            <h5 className="dialog-title">新增項目</h5>
                            <span ref={refDialogClose} className="material-symbols-outlined dialog-close">Close</span></div>
                    </div>
                    <div className="dialog-form">
                        <Input ref={refInput} insertBtn={insertBtn} />
                    </div>
                </dialog>
                <div id="datepicker__insert"></div>
                <div className="modal-place">
                    {inputRadioPlace.map(radio => {
                        return <FormRadio key={radio.id} {...radio} onchange={handleChange} />
                    })}
                    {
                        !record.area && <span className="dialog-form__invalid">請選擇地點</span>
                    }
                </div>
                <div className="modal-service">
                    {inputRadioService.map(radio => {
                        return <FormRadio key={radio.id} {...radio} onchange={handleChange} />
                    })}
                    {
                        !record.service && <span className="dialog-form__invalid">請選擇服務</span>
                    }
                </div>
                {record.service == 'tire-change' &&
                    <div className="modal-tire" onChange={handleChange}>
                        <div>規格</div>
                        <div>
                            <FormSelect name="inch" option={DEFAULT_INCH_RANGE} />
                        </div>
                        {record.inch != '' &&
                            <div>
                                <FormSelect key={seed} name="spec" optgroup={true} option={format} />
                            </div>
                        }
                        <button type="button" onClick={handleInsert}>新增新規格</button>
                    </div>
                }
                {record.service == 'tire-change' &&
                    <div className="modal-quantity">
                        <div>數量</div>
                        <div>
                            <FormSelect name="quantity" option={_.range(1, 11)} />
                        </div>
                    </div>
                }
                <div className="modal-price input-icon">
                    <input className="price" name="price" type="text" placeholder="0.0" onChange={handleChange} />
                    <i>$</i>
                    {/* {record.service == 'fix' &&
                        <>
                            {inputRadioPrice.map(radio => {
                                return <FormRadio key={radio.id} {...radio} onchange={handleChange} />
                            })}
                        </>
                    } */}
                    {
                        record.price == '' && <span className="dialog-form__invalid">請輸入價格</span>
                    }
                </div>
                <div className="modal-pay">
                    {inputRadioPay.map(radio => {
                        return <FormRadio key={radio.id} {...radio} onchange={handleChange} />
                    })}
                    {
                        !record.pay && <span className="dialog-form__invalid">請選擇付款方式</span>
                    }
                </div>
                <div className="modal-note">
                    <label className="note">備註
                        <input name="note" type="text" onChange={handleChange} />
                    </label>
                </div>
                <div className="modal-footer">
                    <button type="submit" onClick={() => setBtnBehave('insert_next')} className="btn btn-primary">新增接續下筆</button>
                    <button type="submit" onClick={() => setBtnBehave('insert_close')} className="btn btn-primary">新增單筆</button>
                </div>
            </form>
        </>

    )
}
)

export default RecordForm;
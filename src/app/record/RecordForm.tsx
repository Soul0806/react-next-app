'use client'

import { useEffect, useState, useContext, useRef } from 'react';
// import Router from "next/router";

import FormSelect from '@/components/form/FormSelect';
import FormRadio from '@/components/form/FormRadio';

// From Data 
import { inputRadioPay, inputRadioPlace, inputRadioPrice, inputRadioService } from './RecordFormData';

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

type Obj = {
    [key: string]: string,
}

function RecordForm() {
    /*
    // const [inches] = useTire
    */

    // Default value 

    const DEFAULT_INCH: string = '12';
    const DEFAULT_INCH_RANGE = _.range(12, 23);

    // Context
    const { groupData, lastId }: any = useContext(Context)

    // Ref
    const ref = useRef(false);
    const refDate = useRef(new Date());
    const refForm = useRef<HTMLFormElement>(null);
    const refPrice = useRef<HTMLInputElement>(null);
    const refSubmitButton = useRef<HTMLButtonElement>(null);


    //  Router

    //  State 
    const [format, setFormat] = useState<string[]>([]);
    const [record, setRecord] = useState({
        id: lastId + 1,
        place: '',
        service: '',
        inch: DEFAULT_INCH,
        spec: '',
        price: '',
        quantity: '',
        pay: '',
        note: '',
        date: dt.getTodayDate(),
    });
    const [id, setId] = useState(lastId + 1);

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
        if (ref.current) {
            const picker = new AirDatepicker('#datepicker__insert', {
                navTitles: {
                    days: dt.getTodayDate()
                },
                locale: localeEn,
                inline: true,
                buttons: [button],
                onSelect: function ({ date, datepicker }) {
                    if (!date) return;
                    // datepicker.nav.$title.innerHTML = date.toDate();
                    refDate.current = date;
                    console.log(refDate.current);
                    // setRecord(prev => {
                    //     return {
                    //         ...prev,
                    //         date: date.toDate(),
                    //     }
                    // })
                },
            });
        }
        return () => {
            ref.current = true;
        }
    }, [])

    useEffect(() => {
        if (record.inch) {
            setFormat(
                groupData[record.inch].sort()
            )
        }
    }, [record.inch])

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

        const formData: FormData = new FormData(e.currentTarget);
        formData.set('date', refDate.current.toDate());
        formData.set('createdAt', dt.getDateTime())
        formData.delete('inch');

        let payload: Obj = {};

        for (let [key, value] of formData) {
            payload[key] = value;
        }

        refForm.current.reset();
        
        // const result = await axi.post(RECORD_API, payload);

        // if (!isEmpty(result.data)) {
        //     const id = result.data.insertId;
        //     notify(id, () => {
        //         setId(id + 1);
        //     });
        // }
    }

    return (
        <>
            <form method="post" onSubmit={handleSubmit} ref={refForm} className="dialog-form" autoComplete="off">
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
                                <FormSelect name="spec" option={format} />
                            </div>
                        }
                    </div>
                }
                {record.service == 'tire-change' &&
                    <div className="modal-quantity" onChange={handleChange} >
                        <div>數量</div>
                        <div>
                            <FormSelect name="quantity" option={_.range(1, 11)} />
                        </div>
                    </div>
                }
                <div className="modal-price input-icon">
                    <input className="price" name="price" type="text" placeholder="0.0" value={record.price} onChange={handleChange} />
                    <i>$</i>
                    {/* {record.service == 'fix' &&
                        <>
                            {inputRadioPrice.map(radio => {
                                return <FormRadio key={radio.id} {...radio} onchange={handleChange} />
                            })}
                        </>
                    } */}
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
                    {/* <button type="submit" style={formValidate} className="btn btn-primary">Send message</button> */}
                    <button type="submit" ref={refSubmitButton} className="btn btn-primary">Send message</button>
                </div>
            </form>
        </>

    )
}
export default RecordForm;
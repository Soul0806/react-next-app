'use client'

// React
import { useEffect, useState, useContext, useRef, forwardRef } from 'react';

// Context
import { RecordContext } from "./context";

// Comps
import FormSelect from '@/components/form/FormSelect';
import FormRadio from '@/components/form/FormRadio';
import Input from '@/components/form/Input';

// From Data 
import { inputRadioPay, inputRadioPlace, inputRadioPrice, inputRadioService, inputTextSpec } from './RecordFormData';

// Helper
import { dt } from '../../lib/helper';
import { axi } from '@/lib/axios';
// import { notify } from '@/lib/notify';

// Third Party
import _ from 'lodash'

// Air Datepicker 
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';
import FancyOption from '@/components/ui/FancyOption';

// API 
const RECORD_API = `http://localhost:3000/api/record`;
const SPEC_API = `http://localhost:3000/api/specification`;

// Type
type Obj = {
    [key: string]: FormDataEntryValue,
}

function RecordForm() {
    /*
    // const [inches] = useTire
    */

    // Context
    const { specGroup, lastId } = useContext(RecordContext);

    // Variable
    const DEFAULT_INCH: string = '12';
    const DEFAULT_INCH_RANGE = _.range(12, 23);

    //  State 
    const [id, setId] = useState(lastId + 1);
    const [seed, setSeed] = useState<number>(1);
    const [format, setFormat] = useState<string[]>([]);
    const [btnBehave, setBtnBehave] = useState<string | null>(null);
    const [record, setRecord] = useState({
        area: '',
        service: '',
        inch: DEFAULT_INCH,
        price: '',
        pay: '',
        // id: lastId + 1,
        // spec: '',
        // quantity: '',
        // note: '',
        // date: dt.getTodayDate(),
    });

    // Ref
    const ref1 = useRef(false);
    const refDate = useRef<Date | Date[]>(new Date());

    const refForm = useRef<HTMLFormElement>(null);
    const refDialogInsert = useRef<HTMLDialogElement>(null);
    const refDialogClose = useRef<HTMLSpanElement>(null);
    const refInput = useRef<HTMLInputElement>(null);

    const refPrice = useRef<HTMLInputElement>(null);
    const refEmpty = useRef(record);

    // Third party variable
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


    // 
    const insertBtn = {
        name: '新增',
        insert: async (e: React.FormEvent<HTMLFormElement>) => {
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

                // db query
                const result = await axi.post(SPEC_API, payload);
                let obj = specGroup.find((obj: any) => obj.size == inch);
                obj['format'].push(format);
                setSeed(Math.random);

                refInput.current.value = '';
                refDialogInsert?.current?.close();
            }
        }
    }

    // Effect
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
        console.log(record);
    },[record])

    useEffect(() => {
        if (record.inch) {
            let obj = specGroup.find((obj: any) => obj.size == record.inch);
            setFormat(
                obj['format'].sort()
            )
        }
    }, [record.inch])

    useEffect(() => {
        if (record.inch) {
            const select = document.querySelectorAll('select')[1];

            document.querySelector('[value="new"]')?.removeAttribute('selected');
            select?.querySelector('option')?.setAttribute('selected', 'selected');

            // const selects = document.querySelectorAll('select');
            // selects[1]?.querySelector('option')?.setAttribute('selected', 'selected')
            // console.log(selects[1]?.querySelector('option'));
        }
    }, [format])

    // Function

    function getOptionProp(label: string, name: string, option: any[]) {

        const defaultOptionValue = option[0]['value'];
        const n: number = option.length - 1;
        return {
            option,
            defaultOptionValue,
            n,
            label,
            name,
            setRecord
        }
    }
 
    const areaOption: any[] = [{ value: 'store', name: '店內' }, { value: 'out-service', name: '外出' }];
    const serviceOption: any[] = [{ value: 'fix', name: '補胎' }, { value: 'tire-change', name: '換胎' }];
    const payOption: any[] = [
        { value: 'cash', name: '現金' }, 
        { value: 'credit', name: '刷卡' },
        { value: 'transfer', name: '轉帳' }
    ];

    const areaOptionProp = getOptionProp('地點', 'area', areaOption);
    const serviceOptionProp = getOptionProp('服務', 'service', serviceOption);
    const payOptionProp = getOptionProp('付款', 'pay', payOption);


    // Event
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
        
        // db query
        const result = await axi.post(RECORD_API, payload);

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
        if (refDialogInsert.current) {
            refDialogInsert.current.showModal();
        }
    }


    // Return
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
                    {inputRadioPlace.map(radio => (
                         <FormRadio key={radio.id} {...radio} onchange={handleChange} />
                    ))}
                    <FancyOption {...areaOptionProp}/>                
                    {
                        !record.area && <span className="dialog-form__invalid">請選擇地點</span>
                    }
                </div>
                <div className="modal-service">
                    {inputRadioService.map(radio => {
                        return <FormRadio key={radio.id} {...radio} onchange={handleChange} />
                    })}
                    <FancyOption {...serviceOptionProp}/>
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
                    <FancyOption {...payOptionProp}/>
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


export default forwardRef(RecordForm);
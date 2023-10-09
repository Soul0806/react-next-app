'use client'

import { useEffect, useState, useContext, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';

import FormSelect from '@/app/components/form/FormSelect';
import FormRadio from '@/app/components/form/FormRadio';

// Context
import { GroupDataContext } from './DialogRecord';

// Type 
import type {GroupData} from './DialogRecord';

// import { useTire } from '../Tire/useTire';
import { dt } from '../../lib/helper';
import { axi } from '../../lib/axios';

import _ from 'lodash'

// Air Datepicker 
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

const WRITE_API = `http://localhost:9000/io/writeFile`;
// const SALE_API_URL = `https://localhost:7123/api/Sale/`;

// const toDate = dt.getTodayDate();

function RecordForm() {

    console.log(useContext(GroupDataContext));
    // const [inches] = useTire
    const optionInch = _.range(12, 23);

    const [specs, setSpecs] = useState([]);

    const ref = useRef(false);
    const refPrice = useRef();
    const refDate = useRef(new Date());

    // const navigate = useNavigate();

    const [record, setRecord] = useState({
        id: '',
        place: '',
        service: '',
        inch: '',
        spec: '',
        price: '',
        quantity: '',
        pay: '',
        note: '',
        date: dt.getTodayDate(),
        createdAt: ''
    });

    // const formValidate = {
    //     opacity: validate() ? '.4' : 1,
    //     cursor: validate() ? 'not-allowed' : 'pointer',
    // }

    let button = {
        content: 'Today',
        className: 'custom-button-classname',
        onClick: (dp: { selectDate: (arg0: Date) => void; setViewDate: (arg0: Date) => void; }) => {
            let date = new Date();
            dp.selectDate(date);
            dp.setViewDate(date);
            refDate.current = date;
        }
    }

    // function validate() {
    //     return !record.place || !record.price || !record.quantity || !record.pay || (record.service != 'fix' && !record.spec)
    //         ? true
    //         : false
    // }

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
                    datepicker.nav.$title.innerHTML = date.toDate();
                    setRecord(prev => {
                        return {
                            ...prev,
                            date: date.toDate(),
                        }
                    })
                },
            });

        }
        return () => {
            ref.current = true;
        }
    }, [])

    useEffect(() => {
        if (record.inch) {
            setSpecs((prev) => {
                return Object.keys(inches[record['inch']]['spec']).sort();
            })
        }
    }, [record.inch])


    useEffect(() => {
        record.quantity && refPrice.current.focus();
    }, [record.quantity])

    function handleChange(e) {
        const { name, value } = e.target;
        setRecord(prev => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const content = {
            // id: salesState.id,
            area: record.place,
            service: record.service,
            spec: record.spec,
            price: record.price,
            quantity: record.quantity,
            pay: record.pay,
            note: record.note,
            date: record.date,
            createdAt: dt.getDateTime()
        }
        const fileName = 'static/sale.json';
        const data = { fileName, content }
        axi.post(WRITE_API, data);
        // navigate(0);
    }

    function handleClose() {
        // setRecord({
        //     place: '',
        //     service: '',
        //     inch: '',
        //     spec: '',
        //     price: '',
        //     quantity: 1,
        //     pay: '',
        //     note: ''
        // })
    }
    const inputs = [
        {
            id: "price",
            type: "text",
            name: "price",
            value: record.price,
            pattern: '^[^0a-zA-Z]\\d{1,}',
            label: "價格",
            onchange: onchange,
        }
    ]

    const inputRadioPlace = [
        {
            id: "store",
            type: "radio",
            name: "place",
            value: "store",
            label: "店內",
        },
        {
            id: "out-service",
            type: "radio",
            name: "place",
            value: "out-service",
            label: "外出",
        }
    ]

    const inputRadioService = [
        {
            id: "fix",
            type: "radio",
            name: "service",
            value: "fix",
            label: "補胎",
        },
        {
            id: "tire-change",
            type: "radio",
            name: "service",
            value: "tire-change",
            label: "換胎",
        }
    ]

    const inputRadioPrice = [
        {
            id: "custom",
            type: "radio",
            name: "price",
            value: "",
            label: "自訂",
        },
        {
            id: "twohundred",
            type: "radio",
            name: "price",
            value: "200",
            label: "200",
        },
        {
            id: "threehundred",
            type: "radio",
            name: "price",
            value: "300",
            label: "300",
        }
    ]

    const inputRadioPay = [
        {
            id: "cash",
            type: "radio",
            name: "pay",
            value: "cash",
            label: "現金",
        },
        {
            id: "credit",
            type: "radio",
            name: "pay",
            value: "credit",
            label: "刷卡",
        },
        {
            id: "transfer",
            type: "radio",
            name: "pay",
            value: "transfer",
            label: "轉帳",
        }
    ]

    const inputRadioDay = [
        {
            id: "yesterday",
            type: "radio",
            name: "date",
            value: dt.getLastDate(),
            label: "昨天",
        },
        {
            id: "today",
            type: "radio",
            name: "date",
            value: dt.getTodayDate(),
            label: "今天",
        }
    ]

    function onchange(e: { target: { name: any; value: any; }; }) {
        setRecord(prev => {
            const { name, value } = e.target;
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    return (
        <>
            <div className="dialog__content">
                <form className="dialog__form" autoComplete="off" method="post" onSubmit={handleSubmit}>
                    <div id="datepicker__insert"></div>
                    <div className="modal-place">
                        {inputRadioPlace.map(radio => {
                            return <FormRadio key={radio.id} {...radio} onchange={handleChange} />
                        })}
                        {
                            !record.place && <span className="invalid">請選擇地點</span>
                        }
                    </div>
                    <div className="modal-service">
                        {inputRadioService.map(radio => {
                            return <FormRadio key={radio.id} {...radio} onchange={onchange} />
                        })}
                        {
                            !record.service && <span className="invalid">請選擇服務</span>
                        }
                    </div>
                    {record.service != 'fix' &&
                        <div className="modal-tire" onChange={handleChange}>
                            <div>規格</div>
                            <div>
                                <FormSelect name="inch" option={optionInch}/>
                            </div>
                            {specs.length != 0 &&
                                <div>
                                    <FormSelect name="spec" option={specs} />
                                </div>
                            }
                        </div>
                    }
                    <div className="modal-quantity" onChange={handleChange} >
                        <div>數量</div>
                        <div>
                            <FormSelect name="quantity" option={_.range(1, 11)} />
                        </div>
                    </div>
                    <div className="input-icon modal-input-icon">
                        <input ref={refPrice} className="price" name="price" type="text" placeholder="0.0" value={record.price} onChange={handleChange} />
                        <i>$</i>
                        {record.service == 'fix' &&
                            <>
                                {inputRadioPrice.map(radio => {
                                    return <FormRadio key={radio.id} {...radio} onchange={onchange} />
                                })}
                            </>
                        }
                    </div>
                    <div className="modal-pay">
                        {inputRadioPay.map(radio => {
                            return <FormRadio key={radio.id} {...radio} onchange={onchange} />
                        })}
                        {
                            !record.pay && <span className="invalid">請選擇付款方式</span>
                        }
                    </div>
                    <div className="modal-note">
                        <label className="note" htmlFor="note">備註 </label>
                        <input id="note" name="note" type="text" onChange={handleChange} />
                    </div>
                    <div className="modal-footer">
                        {/* <button type="submit" style={formValidate} className="btn btn-primary">Send message</button> */}
                        <button type="submit" className="btn btn-primary">Send message</button>
                    </div>
                </form>
            </div>
        </>

    )
}
export default RecordForm;
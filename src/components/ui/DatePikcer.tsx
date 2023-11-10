'use client'

import React, { useEffect, useRef, forwardRef } from "react";

// Helper
import { dt } from '../../lib/helper';

// Air Datepicker 
import AirDatepicker from 'air-datepicker';
import localeEn from 'air-datepicker/locale/en';
import 'air-datepicker/air-datepicker.css';

// Type 
type Props = {}

// Global 


function Datepicker(props: Props, refDate: any) {
    
    const refAnchor = useRef<boolean>(false);
    // const refDate = useRef<Date | Date[]>(new Date());

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
    
    // Effect
    useEffect(() => {
        if (refAnchor.current) {
            let picker = new AirDatepicker('#datepicker__insert', {
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
            refAnchor.current = true;
        }
    }, [])

    return (
        <div id="datepicker__insert"></div>
    )
}

// export { picker };
export default forwardRef(Datepicker);
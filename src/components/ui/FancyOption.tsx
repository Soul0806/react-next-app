'use client'

import React, { useEffect, useRef, useState } from "react";

// const option: string[] = ['11', '22', '33'];
// const defaultOption = option[0];
// const n: number = option.length - 1;

function FancyOption(props: any) {

    const { option, areaOptionValue, n, name, setRecord} = props;

    // State 
    const [i, setI] = useState<number>(0);
    const [index, setIndex] = useState<number>(0);
    const [value, setValue] = useState<string>(areaOptionValue);

    // Ref
    const ref = useRef<Boolean | null>(false);
    const refOption = useRef<HTMLDivElement | null>(null);

    // Effect
    useEffect(() => {
        if (ref.current) {
            refOption.current?.addEventListener('transitionend', function () {
                if (this.firstElementChild) {
                    // this.removeChild(this.firstElementChild);
                }
            });
        }

        return () => {
            ref.current = true;
        }
    }, [])

    useEffect(() => {
        setValue(option[index]['value']);
    }, [index])

    useEffect(() => {
        console.log(value);
    }, [value])

    // Function 
    function newDiv() {
        const div = document.createElement('div');
        const text = document.createTextNode(option[index]['name']);
        div.className = 'item';
        div.appendChild(text);
        setIndex((prev: number) => {
            if (prev != 0 && prev % n == 0) {
                return 0
            }
            return prev + 1;
        });
        setI(prev => prev + 1);
        return div;
    }

    // Event
    function handleClick(e: React.MouseEvent<HTMLElement>) {

        if (refOption.current) {
            const elem = refOption.current;
            const offsetTop = elem.offsetTop;

            refOption.current.style.transform = `translateY(calc(${i + 1} * (-1em - 20px)))`;
            elem.appendChild(newDiv());
        }

        setRecord((prev: any) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    return (
        <>
         <div className="fancyoption">
            <div ref={refOption} className="option" onClick={handleClick}>
                {option.map((item, key) => (
                    <div key={key} className="item">{item['name']}</div>
                ))
                }
            </div>            
        </div>
        </>
       
    )
}

export default FancyOption;
'use client'

import { useEffect, useRef, useState } from "react";

const option: string[] = ['11', '22', '33'];

function FancyOption() {

    // State 
    const [ index, setIndex ] = useState<number>(0); 

    // Ref
    const ref = useRef<HTMLDivElement | null>(null);

    // Effect
    useEffect(() => {

    }, [])

    // Function 

    function newDiv() {
        const div = document.createElement('div');
        const text = document.createTextNode(option[index]);
        div.appendChild(text);
        setIndex((prev: number) => {
            if(prev != 0 && prev%2 == 0) {
                return 0
            }
            return prev + 1;
        });
        // const frag = document.createDocumentFragment();
        return div;
    }

    // Event
    function handleClick() {
        
        if(ref.current) {
            const elem = ref.current;            
            const offsetTop = elem.offsetTop;    

            ref.current.style.transform = `translateY(calc(${index +1 } * (-1em - 20px)))`;
            // ref.current.style.transform = `translateY(calc(-1em - 20px))`;
            elem.style.top = (offsetTop) + "px";        

            elem.appendChild(newDiv());                    
            // if(elem.firstElementChild) {
            //     elem.removeChild(elem.firstElementChild);
            // }
           
           
        }        
    }
    return (
        <div className="fancyoption">
            <div ref={ref} className="option" onClick={handleClick}>
                <div className="item">11</div>
                <div className="item">22</div>
                <div className="item">33</div>
            </div>
        </div>
    )
}

export default FancyOption;
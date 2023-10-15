'use client'

import Input from "@/components/form/Input";
import React from "react";

// function onchange(e: React.ChangeEvent<HTMLInputElement>) {
//     const search = e.target.value;
//     console.log(e.target.value);
type Props = {
    label?: string,
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const Search = (props: Props) => {
    const { onchange } = props;
    return (
        <Input onchange={onchange} />
    );
}

export default Search;
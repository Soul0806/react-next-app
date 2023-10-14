'use client'

import FormText from "@/components/form/FormText";
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
        <FormText onchange={onchange} />
    );
}

export default Search;
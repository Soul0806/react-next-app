'use client'

import FormText from "@/components/form/FormText";
import React from "react";

function onchange(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    console.log(e.target.value);
}
function Search() {

    return (
        <FormText onchange={onchange} />
    );
}

export default Search;
function FormRadio(props) {
    const { label, onchange, ...inputs } = props;
    return (
        <label>{label}
            <input {...inputs} onChange={onchange}
            />
        </label>
    )
}

export default FormRadio
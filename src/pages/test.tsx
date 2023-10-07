const Test = (data: any) => {
    return (
        <div>{JSON.stringify(data)}</div>
    )
}

export const getStaticProps = async () => {
    const url = 'http://localhost:9000';
    const option = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    const result = await fetch(url, option);
    const data = await result.json();
    // const { data: { data } } = res;
    return {
        props: { data }
    }
}


export default Test;
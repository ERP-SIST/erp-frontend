import { useEffect } from "react";

function Title(props){
    const name = props.name;
    useEffect(()=>{
        window.top.document.title = name;
    }, [name])
    return(<></>);
}

export default Title;
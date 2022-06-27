import type {InputHTMLAttributes} from "react";
import './index.css';

const BaseInput = (props: InputHTMLAttributes<any>) => {
    return (
        <input className="input-component" {...props}/>
    );
}

export default BaseInput;
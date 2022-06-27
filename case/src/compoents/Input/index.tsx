import BaseInput from "./BaseInput";
import {useMount, useSetState} from "react-use";
import {useCallback, useEffect, useRef} from "react";

import type {InputHTMLAttributes, ChangeEvent} from "react";

import classNames from "classnames";

import './index.css';

interface InputProps {
    onDoubleClick?: () => void;
    onBlue?: () => void;
    click?: () => void;
    onAddNode?: () => void;
    onRmNode?: () => void;
}

interface State {
    active: boolean;
    selectable: boolean;
    inputVal: string;
}

const Input = (props: InputHTMLAttributes<any> & InputProps) => {
    const [state, setState] = useSetState<State>({
        active: false,
        selectable: false,
        inputVal: ""
    });
    const clickRefId = useRef<any>();
    const placeholder = props.placeholder ?? "这是一个节点";

    const {active, selectable, inputVal} = state;

    const {onBlue, onAddNode, onRmNode} = props;

    const onKeydown = (event: any) => {
        const {keyCode} = event;
        if (keyCode === 8) {
            onRmNode && onRmNode();
            setState({
                selectable: !selectable
            });
        }
        if (keyCode === 13) {
            onAddNode && onAddNode();
            setState({
                selectable: !selectable
            });
        }
    }

    useMount(() => {

    });

    useEffect(() => {
        if (selectable) {
            document.addEventListener("keydown", onKeydown);
        } else {
            document.removeEventListener("keydown", onKeydown);
        }

        return () => {
            document.removeEventListener("keydown", onKeydown);
        }
    }, [selectable])

    const onBlueInput = useCallback(() => {
        setState({
            active: !active
        });
        onBlue && onBlue();
    }, [onBlue, state.active]);

    const changeVal = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setState({
            inputVal: event.target.value.trim()
        });
    }, [state.inputVal]);

    return (
        <>
            {!active ?
                <div
                    className={classNames("input-component", {
                        'active': selectable
                    })}
                    onClick={() => {
                        clearTimeout(clickRefId.current);
                        clickRefId.current = setTimeout(() => {
                            setState({
                                selectable: !selectable
                            });
                        }, 200);
                    }}
                    onDoubleClick={() => {
                        if (clickRefId.current) {
                            clearTimeout(clickRefId.current);
                        }
                        setState({
                            active: !active
                        });
                    }}
                >
                    {inputVal || placeholder}
                </div>
                : <BaseInput
                    autoFocus
                    value={inputVal}
                    onBlur={onBlueInput}
                    onChange={(event) => changeVal(event)}
                    {...props}/>
            }
            {/*<BaseInput {...props}/>*/}
        </>
    );
}

export default Input;
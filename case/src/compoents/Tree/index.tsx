import {memo, ReactNode, useCallback, useEffect, useMemo, useState} from "react";
import Input from "../Input";
import {cloneDeep} from "lodash";
import classNames from "classnames";

import './index.css';

const M_F = 24;

export interface TreeData {
    id: string;
    text: string;
    level: number;

    [propName: string]: any;
}

interface TreeProps {
    treeData?: TreeData[];
    expandable?: boolean; // 是否开启收起与展开的功能
    editable?: boolean; // 是否开启编辑功能
    selectable?: boolean; // 是否开始选中
    colorRenderItem?: (id: string) => any;
}

const Tree = (props: TreeProps) => {
    const {
        treeData = [],
        expandable = true,
        editable = false,
        selectable = false,
        colorRenderItem,
    } = props;
    const [d, setD] = useState<TreeData[]>(cloneDeep(treeData!).map(i => {
        if (expandable) {
            i.expandable = true;
        }
        return i;
    }));

    const data = useMemo(() => {
        return d.map((item) => {
            const parent = item.level - 1;
            item.parent = parent > -1 ? parent : 0;
            item.parent1 = parent === -1;
            return item;
        });
    }, [treeData, d]);

    const renderInput = (item: TreeData, index: number): ReactNode => {
        const {level} = item;
        const cIndex = index + 1;
        const pIndex = index - 1;

        const removeNode = () => {
            let cNum = 1;
            const rD = cloneDeep(d);
            if (index + 1 >= rD.length) {
                rD.splice(index, 1);
                setD(rD);
                return;
            }
            if (rD[index + 1].level > rD[index].level) {
                for (let i = index; i < rD.length - 1; i++) {
                    if (rD[i + 1].level > rD[i].level) {
                        cNum += 1;
                    }
                    if (rD[i + 1].parent1) {
                        break
                    }
                }
            }
            rD.splice(index, cNum);
            setD(rD);
        }

        const addNode = () => {
            const rD = cloneDeep(d);
            const newItem = {
                expandable: true,
                id: Date.now().toString(),
                level: rD[index].level + 1,
                parent: rD[index].level,
                parent1: false,
                text: `level${rD[index].level + 1}`
            }
            rD.splice(index + 1, 0, newItem);
            setD(rD);
        }

        const renderInpBox = () => {
            if (pIndex < 0) {
                return <>
                    {renderIcon(item)}<Input onAddNode={addNode} onRmNode={removeNode} disabled={editable}/>
                </>
            }
            if (d[pIndex]?.level < level && !d[pIndex]?.expandable) {
                return null;
            }
            return <>
                {renderIcon(item)}<Input onAddNode={addNode} onRmNode={removeNode} disabled={editable}/>
            </>
        }

        return (
            <div
                className="input-container"
                style={{marginLeft: `${level * M_F}px`}}>
                <>
                    {
                        renderInpBox()
                    }
                </>
            </div>
        )

        function renderIcon(item: TreeData) {
            const handleClick = () => {
                for (let i = index; i < d.length - 1; i++) {
                    if (d[i + 1].level > d[i].level) {
                        d[i + 1].expandable = !d[i + 1].expandable;
                    }
                    break;
                }
                const nD = d.map((i, nIndex) => {
                    if (i.id === item.id) {
                        i.expandable = !i.expandable;
                    }
                    return i;
                });
                setD(nD);
            }

            if (cIndex >= data.length) {
                return null;
            }
            if (item.parent >= 0 && data[cIndex].level > item.level) {
                if (item.expandable) {
                    return <span className="icon-touch" onClick={handleClick}>➖</span>
                } else {
                    return <span className="icon-touch" onClick={handleClick}>➕</span>
                }
            }
            return null;
        }
    }

    return (
        <div>
            {data?.map((item, index) => {
                return <div key={item.id}>
                    {renderInput(item, index)}
                </div>;
            })}
        </div>
    );
}

export default Tree;
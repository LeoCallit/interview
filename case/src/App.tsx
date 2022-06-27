import React, {useState} from 'react';
import Tree, {TreeData} from "./compoents/Tree";
import {useMount} from "react-use";
import 'normalize.css/normalize.css';
import {getTreeListData} from "./service/sys";

const treeData = [
    {
        "id": "GOVKZv_4m87yzzTVf1y8I",
        "text": "level0",
        "level": 0
    },
    {
        "id": "Uis7EGIasksR8IspEv3Gp",
        "text": "level1",
        "level": 1
    },
    {
        "id": "HIdxm_LdkBop9HuUXYLJF",
        "text": "level0",
        "level": 0
    },
    {
        "id": "S_UN6SgpQgtziv_BkR_Oz",
        "text": "level1",
        "level": 1
    },
    {
        "id": "1rkmcctEnS-Snbj3P2rcu",
        "text": "level2",
        "level": 2
    },
    {
        "id": "wAwgbrqhb0JYns1m_HHrh",
        "text": "level3",
        "level": 3
    },
    {
        "id": "8RBpHqcfqaE8nD2YoS6QX",
        "text": "level0",
        "level": 0
    },
    {
        "id": "kZD755x-4UYNZBmHDro_D",
        "text": "level0",
        "level": 0
    }
]

function App() {
    const [data, setData] = useState<TreeData[]>([]);
    useMount(async () => {
        try {
            // const response = await getTreeListData();
            // const {code} = response;
            // if (code === 200 ) {
            //     setData(response.data);
            // }
        } catch (err) {
            // Not Doing
        }
    });

    return (
        <>
            <Tree
                treeData={treeData}
                colorRenderItem={(nodeId) => {
                    return {backgroundColor: '#333', color: '#fff'}
                }}
            />
        </>
    );
}

export default App;

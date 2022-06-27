import axios from "axios";
import type {TreeData} from "../../compoents/Tree";

export function getTreeListData(): Promise<API.Response<TreeData>> {
    return axios.get('https://node-service.dev.shxg.tech/api/node-server/interview/get-tree-data');
}
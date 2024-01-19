// https://github.com/umijs/hox?tab=readme-ov-file
// npm i hox@1.1.6

import { useState } from "react";
import { createModel } from "hox"; // createGlobalStore in V2

const useCollapsed = () => {
    const [collapsed, setCollapsed] = useState(false) // 默认不折叠
    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }
    return {
        collapsed,
        changeCollapsed
    }
}
export default createModel(useCollapsed)
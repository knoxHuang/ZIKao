
window.app.Util = {
    // 搜索节点
    searchComp (parent, name, component) {
        let node = this.searchNode(parent, name);
        if (!node) {
            return null;
        }
        let comp = node.getComponent(component);
        if (!comp) {
            return null;
        }
        return comp;
    },

    //搜索节点
    searchNode (parent, name1, name2) {
        //广搜
        let node;
        function search(node, name) {
            let queue = [
                [node]
            ];
            for (let i = 0; i < queue.length; ++i) {
                let list = queue[i];
                for (let j = 0; j < list.length; ++j) {
                    node = list[j];
                    if (node.name === name) {
                        return node;
                    } else {
                        queue.push(node.children);
                    }
                }
            }
            return null;
        }

        node = parent;
        for (let i = 1; i < arguments.length && node; ++i) {
            node = search(node, arguments[i]);
        }
        return node;
    }
};

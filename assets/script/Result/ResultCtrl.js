cc.Class({
    extends: cc.Component,

    properties: {
        preItem: cc.Prefab,
        root: cc.ScrollView,
        fenShu: cc.Label,
        daDui: cc.Label,
        daCuo: cc.Label,
        zongFen: cc.Label,
        zongTiMu: cc.Label,
        btnReset: cc.Node
    },

    onLoad: function ()
    {
        this.btnReset.on('touchend', () => {
            cc.director.loadScene('Launch');
        });
    },

    init: function (saveDatas)
    {
        let idx = 0, duiCount = 0, cuoCount = 0, fenShu = 0;
        this.node.active = true;
        this.root.scrollToTop();
        saveDatas.forEach((data) =>
        {
            idx++;
            let node = cc.instantiate(this.preItem);
            node.parent = this.root.content;
            let result = node.getComponent('Result');
            let answer = data.result === data.rightKey;
            if (answer)
            {
                fenShu++;
                duiCount++
            }
            else
            {
                cuoCount++;
            }
            result.init(idx, answer);
        });
        this.zongFen.string = idx;
        this.zongTiMu.string = idx;
        this.fenShu.string = fenShu;
        this.daDui.string = duiCount;
        this.daCuo.string = cuoCount;
    }

});

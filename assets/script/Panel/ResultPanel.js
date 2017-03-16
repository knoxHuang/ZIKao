
cc.Class({
    extends: cc.Component,

    properties: {
        subjectPanel: cc.Node,
        preResult: cc.Prefab,
        root: cc.Node,
        lbl_total: cc.Label,
        lbl_score: cc.Label,
        lbl_error: cc.Label
    },

    onEnable: function () {
        this.root.removeAllChildren();
        this._createResult();
    },

    _createResult: function () {

        let total = Global.achievement.length;
        let score = 0, errCount = 0;
        for (let i = 0; i < total; ++i)
        {
            let node = cc.instantiate(this.preResult);
            node.tag = i;
            let info = Global.achievement[i];
            let result = node.getComponent('Result');
            result.init(i + 1, info.right);
            node.on('touchend', this.onGoSubject, this);
            node.parent = this.root;
            if (!info.right)
            {
                errCount++;
                Global.errorList.push(i);
            }
            else
            {
                score++;
            }
        }

        this.lbl_total.string = "总题：" + total;
        this.lbl_error.string = "做错：" + errCount;
        this.lbl_score.string = "得分：" + score + " / " + total;
    },

    onBack: function () {
        Global.goToMainPanel(Global.PANEL.RESULT);
    },

    onGoSubject: function (event) {
        Global.viewIndx = event.target.tag;
        Global.goToSubjectPanel(Global.PANEL.RESULT);
    }

});

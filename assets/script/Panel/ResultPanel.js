
const RIGHT_COLOR = new cc.Color(150, 150, 255);

cc.Class({
    extends: cc.Component,

    properties: {
        preResultItem: cc.Prefab,
        resultRoot: cc.Node,
        btnBack: cc.Node
    },

    onLoad () {
        this.node.on('touchend', (event)=>{
            event.stopPropagation();
        }, this);
        this.btnBack.on('touchend', this.onBack, this);
    },

    removeResultAll () {
        this.resultRoot.removeAllChildren();
    },

    _createResult () {
        for (let i = 0; i < app.configList.length; ++i) {
            let data = app.configList[i];
            let node = cc.instantiate(this.preResultItem);
            let text = app.Util.searchComp(node, 'Text', cc.Label);
            text.string = i + 1;
            let result = data['result'];
            if (-1 !== result) {
                node.color = data['result'] ? RIGHT_COLOR : cc.Color.RED;
            }
            node.index = i;
            node.on('touchend', this._goToTargetSubject, this);
            node.parent = this.resultRoot;
        }
    },

    _goToTargetSubject (event) {
        this._appMgr.index = event.target.index;
        this._appMgr.onShowAnswer();
        this.hide();
    },

    show (appMgr) {
        this.removeResultAll();
        this._appMgr = appMgr;
        this._createResult();
        this.node.runAction(cc.moveTo(0.2, cc.v2(0, 0)));
    },

    hide () {
        let hideMoveTo = cc.moveTo(0.2, cc.v2(0, -960));
        let callFnc = cc.callFunc(this._hide, this);
        let action = cc.sequence(hideMoveTo, callFnc);
        this.node.runAction(action);
    },

    _hide () {
        this.resultRoot.removeAllChildren();
    },

    onBack () {
        this.hide();
    }
});

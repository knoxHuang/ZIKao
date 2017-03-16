cc.Class({
    extends: cc.Component,

    properties: {
        layout: cc.Node
    },

    onLoad () {
        Global.mainPanel = this.node;
        Global.resultPanel = cc.find('Canvas/ResultPanel');
        Global.subjectPanel = cc.find('Canvas/SubjectPanel');
        this._loadComponent();
    },

    _loadComponent () {
        let subjectType = cc.Enum.getList(Global.SUBJECT_TYPE);
        let children = this.layout.children;
        for (let i = 0, len = children.length; i < len; ++i)
        {
            let node = children[i];
            node.tag = subjectType[i].value;
            node.on('touchend', this.onChooseSubject, this);
        }
    },

    onChooseSubject (event) {
        Global.curSubjectType = event.target.tag;
        Global.goToSubjectPanel(Global.PANEL.MAIN);
    }
});

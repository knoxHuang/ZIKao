cc.Class({
    extends: cc.Component,

    properties: {
        layout: cc.Node
    },

    onLoad: function () {
        this.btnMenuList = [];
        Global.mainPanel = this.node;
        Global.resultPanel = cc.find('Canvas/ResultPanel');
        Global.subjectPanel = cc.find('Canvas/SubjectPanel');
        Global.subjectPanel.active = false;
        Global.resultPanel.active = false;
        this._loadComponent();
    },

    onEnable: function ()
    {
        this.btnMenuList.forEach((node)=>{
            if (node.tag === Global.SUBJECT_TYPE.ERROR_TI) {
                node.active = Global.errorList.length > 0;
            }
        })
    },

    _loadComponent: function () {
        let subjectType = cc.Enum.getList(Global.SUBJECT_TYPE);
        let children = this.layout.children;
        for (let i = 0, len = children.length; i < len; ++i)
        {
            let node = children[i];
            node.tag = subjectType[i].value;
            node.on('touchend', this.onChooseSubject, this);
            if (node.tag === Global.SUBJECT_TYPE.ERROR_TI) {
                node.active = false;
            }
            this.btnMenuList.push(node);
        }
    },

    onChooseSubject: function (event) {
        Global.curSubjectType = event.target.tag;
        Global.goToSubjectPanel(Global.PANEL.MAIN);
    }
});

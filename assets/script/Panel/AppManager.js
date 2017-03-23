let ResultPanel = require('ResultPanel');

window.SUBJECT_TYPE = cc.Enum({
    Single: -1, // 单选
    Multi: -1,  // 多选
});

cc.Class({
    extends: cc.Component,

    properties: {
        preSubjectItem: cc.Prefab,
        subjectRoot:cc.Node,
        count: cc.Label,
        totalCount: cc.Label,

        _index: 0,
        index: {
            get: function () {
                return this._index;
            },
            set: function (val) {
                let len = this._subjectList.length - 1;
                if (val === this._index || val < 0 || val > len) {
                    return;
                }
                this._index = val;
                this.count.string = val + 1;
                this.moveTo(val);
            },
            visible: false
        },
        _subjectList: [],

        resultPanel: ResultPanel
    },

    init: function (title, configArr)
    {
        if (title)
        {
            this.title = app.Util.searchComp(this.node, 'AppTitle', cc.Label);
            this.title.string = title;
        }
        this.count.string = 1;
        this.totalCount.string = configArr.length;
        app.configList = [];
        for (let i = 0; i < configArr.length; ++i) {
            let data = configArr[i];
            let node = cc.instantiate(this.preSubjectItem);
            let item = node.getComponent('SubjectItem');
            // 类型
            let answerkeys = data['answer'].split(',');
            let _type = answerkeys.length > 1 ? SUBJECT_TYPE.Multi : SUBJECT_TYPE.Single;
            item.init(i, data, this.onSelectOption.bind(this));
            node.parent = this.subjectRoot;
            this._subjectList.push({
                item: item,
                type: _type
            });
            data.result = -1;
            app.configList.push(data);
        }
    },

    moveTo: function (idx) {
        let newX = -320 - idx * 640;
        let newPos = cc.p(newX, 375);
        this.subjectRoot.runAction(cc.moveTo(0.1, newPos));
        let subject = this._subjectList[idx];
        this.subjectRoot.height = subject.item.node.height;
    },

    update: function ()
    {
        let subject = this._subjectList[this.index];
        if (subject) {
            this.subjectRoot.height = subject.item.node.height;
        }
    },

    onShowAnswer: function ()
    {
        let subject = this._subjectList[this.index];
        if (subject)
        {
            subject.item.showAnswerDisplay();
        }
    },

    onCheckAnswer: function ()
    {
        let subject = this._subjectList[this.index];
        if (subject)
        {
            subject.item.updateAnswerDisplay();
        }
    },

    onAssignment: function ()
    {
        this._subjectList.forEach((subject) =>{
            if (subject.type === SUBJECT_TYPE.Multi)
            {
                let item = subject.item;
                let subjectData = app.configList[item.index];
                let answerArr = subjectData.answer.split(',');

                let selectAnswerArr = [], _Count = true;
                let optionList = item.optionGroupNode.children;
                optionList.forEach((node) => {
                    let option = node.getComponent(cc.Toggle);
                    if (option.isChecked) {
                        selectAnswerArr.push(option.node.tag);
                    }
                    else {
                        _Count++;
                    }
                });

                if (_Count >= 5) {
                    subjectData['result'] = -1;
                }
                else if (answerArr.length !== selectAnswerArr.length) {
                    subjectData['result'] = false;
                }
                else
                {
                    let matching = true;
                    selectAnswerArr.forEach((answer)=>
                    {
                        if (answerArr.indexOf(answer) === -1) {
                            matching = false;
                        }
                    });
                    subjectData['result'] = matching;
                }
                app.configList[item.index] = subjectData;
            }
        });

        this.resultPanel.show(this);
    },

    onLast: function ()
    {
        this.index--;
    },

    onNext: function ()
    {
        this.index++;
    },

    onBack: function ()
    {
        this.mainPanel = app.Util.searchNode(this.node.parent, 'MainPanel');
        this.mainPanel.active = true;
    },

    onSelectOption: function (info)
    {
        let subject = this._subjectList[this.index];
        if (subject.type === SUBJECT_TYPE.Single)
        {
            let subjectData = app.configList[info.number];
            subjectData['result'] = subjectData.answer === info.option;
            app.configList[info.number] = subjectData;
        }
    }

});

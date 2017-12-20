let ResultPanel = require('ResultPanel');

window.SUBJECT_TYPE = cc.Enum({
    Single: -1, // 单选
    Multi: -1,  // 多选
});

cc.Class({
    extends: cc.Component,

    properties: {
        preSubjectItem: cc.Prefab,
        subjectScrollView: cc.ScrollView,
        count: cc.Label,
        totalCount: cc.Label,

        _index: 0,
        index: {
            get: function () {
                return this._index;
            },
            set: function (val) {
                let len = this._configArr.length - 1;
                if (val === this._index || val < 0 || val > len) {
                    return;
                }
                this._index = val;
                this.count.string = val + 1;
                this.moveTo(val);

                let lastVal = val + 1;
                if (lastVal <= len) {
                    this.create(lastVal, this._configArr, this.onSelectOption.bind(this))
                }
            },
            visible: false
        },
        _subjectList: [],

        resultPanel: ResultPanel
    },

    create (idx, configArr, cb) {
        let data = configArr[idx];
        let answerkeys = data['answer'].split(',');
        let _type = answerkeys.length > 1 ? SUBJECT_TYPE.Multi : SUBJECT_TYPE.Single;
        let info = this._subjectList[idx];
        if (!info) {
            let node = cc.instantiate(this.preSubjectItem);
            node.parent = this.subjectScrollView.content;
            info = {
                item: node.getComponent('SubjectItem'),
            };
            this._subjectList.push(info);
        }
        info.type = _type;
        info.item.init(idx, data, cb);
        data.result = -1;
        app.configList.push(data);
    },

    init (title, configArr) {
        if (title) {
            this.title = app.Util.searchComp(this.node, 'AppTitle', cc.Label);
            this.title.string = title;
        }
        this.count.string = 1;
        this._configArr = configArr;
        this.totalCount.string = configArr.length;
        app.configList = [];
        for (let i = 0; i < 2; ++i) {
            this.create(i, configArr, this.onSelectOption.bind(this));
        }
    },

    moveTo (idx) {
        let newX = -320 - idx * 640;
        let newPos = cc.p(newX, 375);
        this.subjectScrollView.scrollToTop();
        this.subjectScrollView.content.runAction(cc.moveTo(0.1, newPos));
        let subject = this._subjectList[idx];
        this.subjectScrollView.content.height = subject.item.node.height;
    },

    update () {
        let subject = this._subjectList[this.index];
        if (subject) {
            this.subjectScrollView.content.height = subject.item.node.height;
        }
    },

    onShowAnswer () {
        let subject = this._subjectList[this.index];
        if (subject) {
            subject.item.showAnswerDisplay();
        }
    },

    onCheckAnswer () {
        let subject = this._subjectList[this.index];
        if (subject) {
            subject.item.updateAnswerDisplay();
        }
    },

    onAssignment () {
        this._subjectList.forEach((subject) => {
            let item = subject.item;
            let subjectData = app.configList[item.index];
            if (subjectData && subject.type === SUBJECT_TYPE.Multi) {
                let answerArr = subjectData.answer.split(',');
                let selectAnswerArr = [], _Count = 0;
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
                else {
                    let matching = true;
                    selectAnswerArr.forEach((answer)=> {
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

    onLast () {
        this.index--;
    },

    onNext () {
        this.index++;
    },

    onBack () {
        this.mainPanel = app.Util.searchNode(this.node.parent, 'MainPanel');
        this.mainPanel.active = true;
        this.index = 0;
        this._subjectList.forEach((target) => {
            if (target.item.optionGroup && target.item.optionGroup.node) {
                target.item.optionGroup.node.removeComponent(cc.ToggleGroup);
            }
        });
    },

    onSelectOption (info) {
        let subject = this._subjectList[this.index];
        if (subject.type === SUBJECT_TYPE.Single) {
            let subjectData = app.configList[info.number];
            subjectData['result'] = subjectData.answer === info.option;
            app.configList[info.number] = subjectData;
            if (Settings.auto) {
                this.onNext();
            }
        }
    }
});

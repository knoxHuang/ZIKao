let SubjectGroup = require('SubjectGroup');

cc.Class({
    extends: cc.Component,

    properties: {
        subjectGroup: SubjectGroup,

        _curIdx: -1,
        curIdx: {
            get: function ()
            {
                return this._curIdx;
            },
            set: function (val)
            {
                let len = this.configArr.length;
                if (val >= len || val < 0)  {
                    return;
                }
                this._curIdx = val;
                this._updateDanXiang(this.configArr);
            },
            visible: false
        }
    },

    onEnable () {
        Global.curChooseAnswer = '';
        this.subjectGroup.enabled = false;
        cc.loader.loadRes('Data/config_'+ Global.curSubjectType, (err, config) => {
            this.configArr = config.configArr;
            if (Global.viewIndx === -1)
            {
                this._updateAchievement(config.configArr);
            }
            this.curIdx = 0;
        });
    },


    _updateAchievement (configArr) {
        let achievement = [];
        for (let i = 0; i < configArr.length; ++i)
        {
            achievement[i] = {
                chooseAnswer: '',
                answer: '',
                right: false
            };
        }
        Global.achievement = achievement;
    },

    // 更新单项选择
    _updateDanXiang (configArr) {
        let idx, config;
        if (Global.viewIndx !== -1) {
            idx = Global.viewIndx;
            config = configArr[idx];
            let subjectList = this.subjectGroup.updateConfig(idx, config, this.onChooseItem.bind(this));
            let achievement = Global.achievement[idx];
            if (subjectList[achievement.chooseAnswer])
            {
                subjectList[achievement.chooseAnswer].toggle.isChecked = true;
            }
        }
        else
        {
            idx = this.curIdx;
            config = configArr[idx];
            this.subjectGroup.updateConfig(idx, config, this.onChooseItem.bind(this));
        }
    },

    // 选择选项
    onChooseItem (event) {
        this.subjectGroup.enabled = true;
        let item = event.target.parent.getComponent('SubjectGroup');
        Global.curChooseAnswer = event.target.tag;
        Global.achievement[this.curIdx] = {
            chooseAnswer: Global.curChooseAnswer,
            answer: item.answer,
            right: Global.curChooseAnswer === item.answer
        };
    },

    // 上一页
    onBefore () {
        this.curIdx--;
        this.subjectGroup.hideAnswer();
    },

    // 下一页
    onAfter () {
        this.curIdx++;
        this.subjectGroup.hideAnswer();
        this.subjectGroup.reset();
    },

    onShowAnswer () {
        this.subjectGroup.changedAnswer();
    },

    onBack () {
        if (Global.lastPanel === Global.PANEL.RESULT) {
            Global.goToResultPanel(Global.PANEL.SUBJECT);
        }
        else
        {
            Global.goToMainPanel(Global.PANEL.SUBJECT);
        }
    },

    onGoResult () {
        Global.goToResultPanel(Global.PANEL.SUBJECT);
    }
});

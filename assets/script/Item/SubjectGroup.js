let SubjectItem = require('SubjectItem');

let KEYS = ['A','B','C','D'];

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        itemList: {
            default: [],
            type: SubjectItem
        },
        answerStr: cc.Label,
        spState: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    updateConfig (idx, config, onChooseItem, single = true)
    {
        let subjectList = [];
        this.toggle = this.node.getComponent(cc.ToggleGroup);
        this.toggle.allowSwitchOff = !single;
        this.title.string = config['title'];
        for (let i = 0; i < KEYS.length; ++i)
        {
            let key = KEYS[i];
            let item = this.itemList[i];
            item.toggle = item.getComponent(cc.Toggle);
            item.toggle.isChecked = false;
            item.node.tag = key;
            item.setText(key + '. ' + config[key], key);
            item.node.on('touchend', onChooseItem);
            subjectList[key] = item;
        }
        let answer = config.answer;
        this.answer = answer;
        this.answerStr.string = answer + '. ' + config[answer];
        this.answerStr.node.parent.active = false;
        return subjectList;
    },

    _getCurItem (tag) {
        for (let i = 0; i < this.itemList.length; ++i)
        {
            let item = this.itemList[i];
            if (item.node.tag === tag) {
                return item;
            }
        }
    },

    reset : function ()
    {
        this.itemList.forEach((item) => {
            item.hideState();
            item.toggle.isChecked = false;
        });
    },

    changedAnswer () {
        let active = !this.answerStr.node.parent.active;
        if (active) {
            this.showAnswer();
        }
        else {
            this.hideAnswer();
        }
    },

    showAnswer () {
        this.answerStr.node.parent.active = true;
        // 设置对错
        let item;
        if (!Global.curChooseAnswer)
        {
            item = this._getCurItem(this.answer);
            item.showState(this.spState[0], true);
        }
        else if (Global.curChooseAnswer === this.answer)
        {
            item = this._getCurItem(Global.curChooseAnswer);

            item.showState(this.spState[0], true);
        }
        else
        {
            item = this._getCurItem(Global.curChooseAnswer);
            item.toggle.isChecked = false;
            item.showState(this.spState[1], false);
            item = this._getCurItem(this.answer);
            item.showState(this.spState[0], true);
        }
    },

    hideAnswer ()
    {
        this.answerStr.node.parent.active = false;
        let item;
        if (Global.curChooseAnswer)
        {
            item = this._getCurItem(Global.curChooseAnswer);
            item.toggle.isChecked = true;
            item.hideState();
        }
        item = this._getCurItem(this.answer);
        item.hideState();
    }
});

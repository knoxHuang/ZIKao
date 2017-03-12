window.LETTER = ['A','B','C','D','E'];

let Item = require('Subject');
let ResultCtrl = require('ResultCtrl');


cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.Label,
        answer: cc.Label,
        root: cc.ToggleGroup,
        itemArr: {
            default: [],
            type: Item
        },
        before: cc.Node,
        view: cc.Node,
        submit: cc.Node,
        next: cc.Node,
        resultCtrl: ResultCtrl
    },

    _initComponent: function ()
    {
        this.itemList = [];
        let item, idx = 0;
        this.itemArr.forEach((item) =>
        {
            item.node.tag = LETTER[idx];
            item.node.on('click', this.onClick, this);
            idx++;
            this.itemList.push(item);
        });
    },

    _initEvent: function ()
    {
        this.before.on('touchend', this.onBefore, this);
        this.view.on('touchend', this.onView, this);
        this.submit.on('touchend', this.onSubmit, this);
        this.next.on('touchend', this.onNext, this);
    },

    _initData: function ()
    {
        this.curIdx = 0;
        this.curSelectResult = '';
        this.curResult = '';
        this.saveDataList = [];
        this.answerStr = [];
        this.titleStr = '';
        cc.loader.loadRes('config', cc.TextAsset, (err, data) =>
        {
            this.configData = data;
            let len = Object.keys(data).length;
            for (let i = 0; i < len; ++i)
            {
                let config = this.configData['config_' + i];
                this.saveDataList[i] = {
                    result: '',
                    rightKey: config.answer
                }
            }
            this._updateSubject(this.currentIndex = 0);
        });
    },

    _resetData: function ()
    {
        this.root.enabled = false;
        this.itemList.forEach((item) => {
            item.node.active = true;
            item.toggle.isChecked = false;
        });
        this._allHideAnswer();
        this._setAnswer(false);
    },

    _checkBeyondBoundary: function ()
    {
        let idx = this.curIdx;
        let len = Object.keys(this.configData).length;
        if (idx >= len)  {
            this.curIdx = len;
            return false;
        }
        if (idx < 0) {
            this.curIdx = 0;
            return false;
        }
        return true
    },

    _addNewSubject: function ()
    {
        let idx = this.curIdx;
        let config = this.configData['config_' + idx];
        this.titleStr = (idx + 1) + ". " + config.title;
        this.text.string = this.titleStr + ' ( )';

        for (let i = 0; i < this.itemList.length; ++i)
        {
            let item = this.itemList[i];
            let key = LETTER[i];
            let text = key + '. ' + config[key];
            this.answerStr[key] = text;
            item.setText(text);
        }
        this.answer.string = this.answerStr[config.answer];
        this.curResult = config.answer;
    },

    _updateSubject: function ()
    {
        this._resetData();
        this._addNewSubject();
        let answer = this.saveDataList[this.curIdx];
        if (answer)
        {
            this.curSelectResult = answer.result;
            this.itemList.forEach((item) =>
            {
                item.toggle.isChecked = answer.result === item.node.tag;
            });
        }
    },

    _setAnswer: function (active)
    {
        this.answer.node.parent.active = active;
        this.answer.node.active = active;
    },

    _allShowAnswer: function ()
    {
        this.itemList.forEach((item) =>
        {
            item.toggle.interactable = false;
            item.showAnswer(this.curSelectResult, this.curResult);
        });
    },

    _allHideAnswer: function (answer)
    {
        this.itemList.forEach((item) =>
        {
            item.toggle.interactable = true;
            item.hideAnswer();
        });
    },

    start: function ()
    {
        this._initComponent();
        this._initEvent();
        this._initData();
        this.root.node.active = true;
        this.root.enabled = false;
    },

    onClick: function (event)
    {
        this.root.enabled = true;
        this.curSelectResult = event.target.tag;
        this.saveDataList[this.curIdx] = {
            result: this.curSelectResult,
            rightKey: this.curResult
        };
    },

    onBefore: function (event)
    {
        this.curIdx--;
        if (this._checkBeyondBoundary())
        {
            this._updateSubject();
        }
    },

    onView: function (event)
    {
        let state = !this.answer.node.active;
        if (state)
        {
            this._allShowAnswer();
        }
        else
        {
            this._allHideAnswer();
        }
        this._setAnswer(state);
    },

    onSubmit: function (event)
    {
        this.resultCtrl.init(this.saveDataList);
    },

    onNext: function (event)
    {
        this.curIdx++;
        if (this._checkBeyondBoundary())
        {
            this._updateSubject();
        }
    }

});

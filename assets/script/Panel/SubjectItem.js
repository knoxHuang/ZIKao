
const OPTION_STR = ['A', 'B', 'C', 'D', 'E'];

cc.Class({
    extends: cc.Component,

    properties: {
        title: cc.Label,
        optionGroupNode: cc.Node,
        answer: cc.Label
    },

    init: function (idx, config, onSelectOption)
    {
        let answerkey = config['answer'];
        let answerkeys = answerkey.split(',');
        let isCheckbox = answerkeys.length > 1;
        if (!isCheckbox) {
            this.optionGroup = this.optionGroupNode.addComponent(cc.ToggleGroup);
            this.optionGroup.enabled = false;
        }
        //
        this.index = idx;
        this._onSelectOption = onSelectOption;
        this.title.string = config['title'];
        let children = this.optionGroupNode.children;
        for (let i = 0; i < children.length; ++i) {
            let option = children[i];
            let key = OPTION_STR[i];
            let text = app.Util.searchComp(option, 'Text', cc.Label);
            if (!config[key]) {
                option.active = false;
                continue;
            }
            text.string = key + '.' + config[key];
            option.tag = key;
            option.on('click', this.onClick, this);
            option.isChecked = false;
            option.toggleGroup = this.optionGroup;
            if (!isCheckbox)
            {
                this.optionGroup.addToggle(option);
            }
        }

        // 如果有多个答案用多选框
        this.answer.string = '';
        if (isCheckbox)
        {
            answerkeys.forEach((str)=>{
                this.answer.string += str + '. ' + config[str] + '\n\n';
            });
        }
        else
        {
            this.answer.string = answerkey + '. ' + config[answerkey];
        }
        this.answer.node.parent.active = false;
    },

    showAnswerDisplay: function () {
        this.answer.node.parent.active = true;
    },

    updateAnswerDisplay: function () {
        this.answer.node.parent.active = !this.answer.node.parent.active;
    },

    onClick: function (event)
    {
        if (this.optionGroup)
        {
            this.optionGroup.enabled = true;
        }
        let info = {
            number: this.index,
            option: event.target.tag
        };
        if (this._onSelectOption) {
            this._onSelectOption(info)
        }
    }
});

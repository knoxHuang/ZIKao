const NORMAL_COLOR = new cc.Color(148, 148, 148, 255);

cc.Class({
    extends: cc.Component,

    properties: {
        spriteFrameArr: {
            default: [],
            type: cc.SpriteFrame
        },
        item: cc.Label,
        checkmark: cc.Sprite,
        spState: cc.Sprite
    },

    onLoad: function ()
    {
        this.toggle = this.node.getComponent(cc.Toggle);
    },

    setText: function (text)
    {
        this.item.string = text;
    },

    showAnswer: function (selectResult, result)
    {
        let answer = this.node.tag === result;
        this.spState.node.active = selectResult !== result && answer;
        this.spState.node.color = cc.Color.GREEN;
        this.checkmark.spriteFrame = this.spriteFrameArr[answer ? 1 : 2];
        this.checkmark.node.color = !answer ? cc.Color.RED : cc.Color.GREEN;
    },

    hideAnswer: function ()
    {
        this.spState.node.active = false;
        this.checkmark.spriteFrame = this.spriteFrameArr[0];
        this.checkmark.node.color = NORMAL_COLOR;
    }
});

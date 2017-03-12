cc.Class({
    extends: cc.Component,

    properties: {
        lblText: cc.Label,
        spAccept: cc.Sprite,
        spriteFrameArr: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    init: function (idx, answer)
    {
        this.lblText.string = idx + '.';
        this.spAccept.spriteFrame = this.spriteFrameArr[answer ? 0 : 1];
        this.spAccept.node.color = !answer ? cc.Color.RED : cc.Color.GREEN;
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.Label,
        state: cc.Sprite
    },

    setText: function (text) {
        this.text.string = text;
    },

    showState: function (spState, answer) {
        this.toggle.isChecked = false;
        this.state.node.active = true;
        this.state.spriteFrame = spState;
        this.state.node.color = !answer ? cc.Color.RED : cc.Color.GREEN;
    },

    hideState: function () {
        this.state.node.active = false;
    }

});

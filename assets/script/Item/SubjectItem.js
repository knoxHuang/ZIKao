cc.Class({
    extends: cc.Component,

    properties: {
        text: cc.Label,
        state: cc.Sprite
    },

    setText (text) {
        this.text.string = text;
    },

    showState (spState, answer) {
        this.toggle.isChecked = false;
        this.state.node.active = true;
        this.state.spriteFrame = spState;
        this.state.node.color = !answer ? cc.Color.RED : cc.Color.GREEN;
    },

    hideState () {
        this.state.node.active = false;
    }

});

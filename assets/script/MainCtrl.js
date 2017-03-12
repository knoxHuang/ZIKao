
cc.Class({
    extends: cc.Component,

    properties: {
        subjectCtrl: cc.Node
    },

    onLoad: function ()
    {
        this.subjectCtrl.active = true;
    }
});

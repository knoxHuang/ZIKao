
window.Settings = {
    auto: false,
};

cc.Class({
    extends: cc.Component,

    properties: {
        preMenuItem: cc.Prefab,
        menuItemRoot: cc.ScrollView
    },

    _loadConfig () {
        this._config = [];
        cc.loader.loadResDir('Data', (err, datas)=> {
            if (err) {
                return;
            }
            for (let i = 0; i < datas.length; ++i) {
                let data = datas[i];
                this._config[i] = data;
                this._initControl(i, data.tag, data.type);
            }
        });
    },

    _initControl (idx, tag, type) {
        let node = cc.instantiate(this.preMenuItem);
        let text = node.getChildByName('Text').getComponent(cc.Label);
        text.string = tag + '-' + type + '(' + idx + ')';
        node.tag = idx;
        node.on('click', this.onClick, this);
        node.parent = this.menuItemRoot.content;
        if (9 === idx && app.scrollViewPos) {
            this.menuItemRoot.setContentPosition(app.scrollViewPos);
        }
    },

    onClick (event) {
        app.scrollViewPos = this.menuItemRoot.getContentPosition();
        let config = this._config[event.target.tag];
        this.appMgr = app.Util.searchComp(this.node.parent, 'AppPanel', 'AppManager');
        this.appMgr.init(config.tag, config.configArr);
        this.node.active = false;
    },

    onAuto () {
        Settings.auto = !Settings.auto;
    },

    onLoad () {
        cc.game.setFrameRate(30);
        this._loadConfig();
    }
});

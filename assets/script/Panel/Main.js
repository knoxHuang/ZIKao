
window.Settings = {
    auto: false,

    init: function () {
        this.auto = cc.sys.localStorage.getItem('auto') === 'true';

        let toggleNode = cc.find('Canvas/MainPanel/New Toggle');
        let toggle = toggleNode.getComponent(cc.Toggle);
        toggle.isChecked = this.auto;
        console.log('get auto:' + this.auto);
    },
    save: function () {
        cc.sys.localStorage.setItem('auto', this.auto);
        console.log('save auto:' + this.auto);
    }
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
        text.string = tag + '-' + type;
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
        Settings.save();
    },

    onLoad () {
        cc.director.setDisplayStats(false);
        cc.game.setFrameRate(30);
        Settings.init();
        this._loadConfig();
    }
});

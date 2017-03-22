cc.Class({
    extends: cc.Component,

    properties: {
        preMenuItem: cc.Prefab,
        menuItemRoot: cc.ScrollView
    },

    _loadConfig: function ()
    {
        this._config = [];
        for (let i = 1; i <= 11; ++i)
        {
            cc.loader.loadRes('Data/config_' + i, (err, data)=>
            {
                this._config[i] = data;
                this._initControl(i, data.tag, data.type);
            });
        }
    },

    _initControl: function (idx, tag, type)
    {
        let node = cc.instantiate(this.preMenuItem);
        let text = node.getChildByName('Text').getComponent(cc.Label);
        text.string = tag + '-' + type + '(' + idx + ')';
        node.tag = idx;
        node.on('click', this.onClick, this);
        node.parent = this.menuItemRoot.content;
        if (9 === idx && app.scrollViewPos)
        {
            this.menuItemRoot.setContentPosition(app.scrollViewPos);
        }
    },

    onClick: function (event)
    {
        app.scrollViewPos = this.menuItemRoot.getContentPosition();
        let config = this._config[event.target.tag];
        cc.director.loadScene('app', ()=>{
            let appMgr = cc.find('Canvas').getComponent('AppManager');
            appMgr.init(config.title, config.configArr);
        });
    },

    onLoad: function () {
        cc.director.preloadScene('app');
        this._loadConfig();
    }
});

let MainMenuPanel = require('MainMenuPanel');
let SubjectPanel = require('SubjectPanel');
let ResultPanel = require('ResultPanel');

cc.Class({
    extends: cc.Component,

    properties: {
        mainMenuPanel: {
            default: null,
            type: MainMenuPanel
        },
        subjectPanel: {
            default: null,
            type: SubjectPanel
        },
        resultPanel: {
            default: null,
            type: ResultPanel
        }
    },

    onLoad () {
        this.mainMenuPanel.init();
        this.subjectPanel.init();
        this.resultPanel.init();
        this.goToMainMenuPanel();
        Global.AppManager = this;
        Global.MainMenuPanel = this.mainMenuPanel;
        Global.SubjectPanel = this.subjectPanel;
        Global.ResultPanel = this.resultPanel;
    },

    goToMainMenuPanel () {
        this.mainMenuPanel.show();
        this.subjectPanel.close();
        this.resultPanel.close();
    },

    goToSubjectPanel (type) {
        cc.loader.loadRes('config' + type, (configData) =>{
            this.mainMenuPanel.close();
            this.subjectPanel.show(type, configData);
            this.resultPanel.close();
        });
    },

    goToResultPanel () {
        this.mainMenuPanel.close();
        this.subjectPanel.show();
        this.resultPanel.open();
    }

});

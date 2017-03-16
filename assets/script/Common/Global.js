
let _PANEL = cc.Enum({
    MAIN: -1,
    SUBJECT: -1,
    RESULT: -1
});

let _SUBJECT_TYPE = cc.Enum({
    DAN_XIANG: 0, // 单项选择
    DUO_XIANG: 1, // 多项选择
    MING_CI_JIE_SHI: 2,// 名词解释
    JI_SUAN: 3, // 计算
    JIAN_DA: 4, // 简答
    LUN_SHU: 5  // 论述
});

window.Global = {
    PANEL: _PANEL,
    SUBJECT_TYPE: _SUBJECT_TYPE, //项目类型
    lastPanel: _PANEL.MAIN,
    curSubjectType: 0,          // 当前项目类型
    viewIndx: -1,                // 查看指定题目
    curChooseAnswer: -1,         // 当前中的答案
    achievement: [], // 成绩
    mainPanel: null,
    resultPanel: null,
    subjectPanel: null,

    _resetData: function ()
    {
        this.viewIndx = -1;
        this.curChooseAnswer = -1;
        this.achievement = [];
    },

    goToMainPanel: function (lastPanel)
    {
        this._resetData();
        this.lastPanel = lastPanel;
        this.mainPanel.active = true;
        this.subjectPanel.active = false;
        this.resultPanel.active = false;
    },
    goToSubjectPanel: function (lastPanel)
    {
        this.lastPanel = lastPanel;
        this.mainPanel.active = false;
        this.subjectPanel.active = true;
        this.resultPanel.active = false;
    },
    goToResultPanel: function (lastPanel)
    {
        this.lastPanel = lastPanel;
        this.mainPanel.active = false;
        this.subjectPanel.active = false;
        this.resultPanel.active = true;
    }
};



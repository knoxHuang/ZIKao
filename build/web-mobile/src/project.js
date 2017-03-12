require=function t(e,i,c){function s(r,o){if(!i[r]){if(!e[r]){var a="function"==typeof require&&require;if(!o&&a)return a(r,!0);if(n)return n(r,!0);var u=new Error("Cannot find module '"+r+"'");throw u.code="MODULE_NOT_FOUND",u}var h=i[r]={exports:{}};e[r][0].call(h.exports,function(t){var i=e[r][1][t];return s(i?i:t)},h,h.exports,t,e,i,c)}return i[r].exports}for(var n="function"==typeof require&&require,r=0;r<c.length;r++)s(c[r]);return s}({MainCtrl:[function(t,e,i){"use strict";cc._RFpush(e,"c72187Ta0REOZZMvkNf/GJi","MainCtrl"),cc.Class({"extends":cc.Component,properties:{subjectCtrl:cc.Node},onLoad:function(){this.subjectCtrl.active=!0}}),cc._RFpop()},{}],ResultCtrl:[function(t,e,i){"use strict";cc._RFpush(e,"9e20aQ5rBpANIgAAwLgk66q","ResultCtrl"),cc.Class({"extends":cc.Component,properties:{preItem:cc.Prefab,root:cc.ScrollView,fenShu:cc.Label,daDui:cc.Label,daCuo:cc.Label,zongFen:cc.Label,zongTiMu:cc.Label,btnReset:cc.Node},onLoad:function(){this.btnReset.on("touchend",function(){cc.director.loadScene("Launch")})},init:function(t){var e=this,i=0,c=0,s=0,n=0;this.node.active=!0,this.root.scrollToTop(),t.forEach(function(t){i++;var r=cc.instantiate(e.preItem);r.parent=e.root.content;var o=r.getComponent("Result"),a=t.result===t.rightKey;a?(n++,c++):s++,o.init(i,a)}),this.zongFen.string=i,this.zongTiMu.string=i,this.fenShu.string=n,this.daDui.string=c,this.daCuo.string=s}}),cc._RFpop()},{}],Result:[function(t,e,i){"use strict";cc._RFpush(e,"15ea7vExTtPKYstTsg+3m72","Result"),cc.Class({"extends":cc.Component,properties:{lblText:cc.Label,spAccept:cc.Sprite,spriteFrameArr:{"default":[],type:cc.SpriteFrame}},init:function(t,e){this.lblText.string=t+".",this.spAccept.spriteFrame=this.spriteFrameArr[e?0:1],this.spAccept.node.color=e?cc.Color.GREEN:cc.Color.RED}}),cc._RFpop()},{}],SubjectCtrl:[function(t,e,i){"use strict";cc._RFpush(e,"0def9zlyAxKwJTCERaPJ05c","SubjectCtrl"),window.LETTER=["A","B","C","D","E"];var c=t("Subject"),s=t("ResultCtrl");cc.Class({"extends":cc.Component,properties:{text:cc.Label,answer:cc.Label,root:cc.ToggleGroup,itemArr:{"default":[],type:c},before:cc.Node,view:cc.Node,submit:cc.Node,next:cc.Node,resultCtrl:s},_initComponent:function(){var t=this;this.itemList=[];var e=0;this.itemArr.forEach(function(i){i.node.tag=LETTER[e],i.node.on("click",t.onClick,t),e++,t.itemList.push(i)})},_initEvent:function(){this.before.on("touchend",this.onBefore,this),this.view.on("touchend",this.onView,this),this.submit.on("touchend",this.onSubmit,this),this.next.on("touchend",this.onNext,this)},_initData:function(){var t=this;this.curIdx=0,this.curSelectResult="",this.curResult="",this.saveDataList=[],this.answerStr=[],this.titleStr="",cc.loader.loadRes("config",cc.TextAsset,function(e,i){t.configData=i;for(var c=Object.keys(i).length,s=0;s<c;++s){var n=t.configData["config_"+s];t.saveDataList[s]={result:"",rightKey:n.answer}}t._updateSubject(t.currentIndex=0)})},_resetData:function(){this.root.enabled=!1,this.itemList.forEach(function(t){t.node.active=!0,t.toggle.isChecked=!1}),this._allHideAnswer(),this._setAnswer(!1)},_checkBeyondBoundary:function(){var t=this.curIdx,e=Object.keys(this.configData).length;return t>=e?(this.curIdx=e,!1):!(t<0)||(this.curIdx=0,!1)},_addNewSubject:function(){var t=this.curIdx,e=this.configData["config_"+t];this.titleStr=t+1+". "+e.title,this.text.string=this.titleStr+" ( )";for(var i=0;i<this.itemList.length;++i){var c=this.itemList[i],s=LETTER[i],n=s+". "+e[s];this.answerStr[s]=n,c.setText(n)}this.answer.string=this.answerStr[e.answer],this.curResult=e.answer},_updateSubject:function(){this._resetData(),this._addNewSubject();var t=this.saveDataList[this.curIdx];t&&(this.curSelectResult=t.result,this.itemList.forEach(function(e){e.toggle.isChecked=t.result===e.node.tag}))},_setAnswer:function(t){this.answer.node.parent.active=t,this.answer.node.active=t},_allShowAnswer:function(){var t=this;this.itemList.forEach(function(e){e.toggle.interactable=!1,e.showAnswer(t.curSelectResult,t.curResult)})},_allHideAnswer:function(t){this.itemList.forEach(function(t){t.toggle.interactable=!0,t.hideAnswer()})},start:function(){this._initComponent(),this._initEvent(),this._initData(),this.root.node.active=!0,this.root.enabled=!1},onClick:function(t){this.root.enabled=!0,this.curSelectResult=t.target.tag,this.saveDataList[this.curIdx]={result:this.curSelectResult,rightKey:this.curResult},this.onNext()},onBefore:function(t){this.curIdx--,this._checkBeyondBoundary()&&this._updateSubject()},onView:function(t){var e=!this.answer.node.active;e?this._allShowAnswer():this._allHideAnswer(),this._setAnswer(e)},onSubmit:function(t){this.resultCtrl.init(this.saveDataList)},onNext:function(t){this.curIdx++,this._checkBeyondBoundary()&&this._updateSubject()}}),cc._RFpop()},{ResultCtrl:"ResultCtrl",Subject:"Subject"}],Subject:[function(t,e,i){"use strict";cc._RFpush(e,"6bd02xZ+W5PjIYuXHXEdqnm","Subject");var c=new cc.Color(148,148,148,255);cc.Class({"extends":cc.Component,properties:{spriteFrameArr:{"default":[],type:cc.SpriteFrame},item:cc.Label,checkmark:cc.Sprite,spState:cc.Sprite},onLoad:function(){this.toggle=this.node.getComponent(cc.Toggle)},setText:function(t){this.item.string=t},showAnswer:function(t,e){var i=this.node.tag===e;this.spState.node.active=t!==e&&i,this.spState.node.color=cc.Color.GREEN,this.checkmark.spriteFrame=this.spriteFrameArr[i?1:2],this.checkmark.node.color=i?cc.Color.GREEN:cc.Color.RED},hideAnswer:function(){this.spState.node.active=!1,this.checkmark.spriteFrame=this.spriteFrameArr[0],this.checkmark.node.color=c}}),cc._RFpop()},{}]},{},["MainCtrl","Result","ResultCtrl","Subject","SubjectCtrl"]);
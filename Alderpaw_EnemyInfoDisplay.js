//=============================================================================
// RPG Maker MZ - Enemy Info Display
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 选择敌人时，在左上角显示信息，并可按tab键查看详情
 * @author Alderpaw
 *
 * @param Simple Info X-Axis
 * @text 简易信息栏的x坐标
 * @desc 简易信息栏的x坐标. 
 * @default 24
 * 
 * @param Simple Info Y-Axis
 * @text 简易信息栏的y坐标
 * @desc 简易信息栏的y坐标. 
 * @default 150
 * 
 * @param Detailed Info X-Axis
 * @text 详细信息栏的x坐标
 * @desc 详细信息栏的x坐标. 
 * @default 440
 * 
 * @param Detailed Info Y-Axis
 * @text 详细信息栏的y坐标
 * @desc 详细信息栏的y坐标. 
 * @default 20
 * 
 * @param tabIconId
 * @text tab键的图标id
 * @desc tab键的图标id，如果填0就直接用文本.
 * @default 0
 * 
 * @param isMpShown
 * @text 是否显示敌人MP
 * @desc 简略和详细信息里是否显示敌人MP
 * @type boolean
 * @default false
 * 
 * @param isElementShown
 * @text 是否显示敌人的元素属性有效率
 * @desc 详细信息里是否显示敌人的元素属性有效率
 * @type boolean
 * @default true
 * 
 * @param elementPercentShowStrategy
 * @text 显示元素属性有效率时，用文字还是图标
 * @desc 显示元素属性有效率时，是否用文字（比如雷、风）来代表对应元素？如果选择false则用图标来代表
 * @type boolean
 * @default true
 * 
 * @param elementIconIds
 * @text 所有元素属性对应的图标ID
 * @desc 按数据库里的顺序，列出所有元素属性对应的图标ID
 * @type number[]
 * @default [77, 64, 65, 66, 67, 68, 69, 70, 71]
 * 
 * @param isAbnormalStateShown
 * @text 是否显示敌人的异常状态有效率
 * @desc 详细信息里是否显示敌人的异常状态有效率
 * @type boolean
 * @default true
 * 
 * @param abnormalStatePercentShowStrategy
 * @text 显示异常状态有效率时，用文字还是图标
 * @desc 显示异常状态有效率时，是否用文字（比如冰冻、麻痹）来代表对应状态？如果选择false则用图标来代表
 * @type boolean
 * @default true
 * 
 * @param abnormalStateList
 * @text 异常状态id
 * @desc 定义哪些属于异常状态，填状态的id
 * @type number[]
 * @default [1, 4, 5, 6, 7, 8, 9, 10, 12, 13]
 * 
 * @param enemyInfoWindowSkin
 * @text 使用哪种窗口皮肤
 * @desc 使用哪种窗口皮肤
 * @type file
 * @dir img/system
 * @default Window
 * 
 * 
 * @help Alderpaw_EnemyInfoDisplay.js
 *
 * 选择敌人时，用独立的小窗口显示各项信息。
 * 有简略模式和详细模式，按TAB键切换。
 * 敌人掉落的物品、武器和防具，其ID必须≥2，否则无法显示。
 */

var Alderpaw = Alderpaw || {};
Alderpaw.EnemyInfoDisplay = {};
const parameters = PluginManager.parameters('Alderpaw_EnemyInfoDisplay');

Alderpaw.EnemyInfoDisplay.simpleEnemyInfoXPos = Number(parameters['Simple Info X-Axis'] || 24);
Alderpaw.EnemyInfoDisplay.simpleEnemyInfoYPos = Number(parameters['Simple Info Y-Axis'] || 120);
Alderpaw.EnemyInfoDisplay.detailedEnemyInfoXPos = Number(parameters['Detailed Info X-Axis'] || 440);
Alderpaw.EnemyInfoDisplay.detailedEnemyInfoYPos = Number(parameters['Detailed Info Y-Axis'] || 80);
Alderpaw.EnemyInfoDisplay.tabIconId = Number(parameters["tabIconId"] || 0);
Alderpaw.EnemyInfoDisplay.isMpShown = Boolean(parameters["isMpShown"] == "true" || false);
Alderpaw.EnemyInfoDisplay.isElementShown = Boolean(parameters["isElementShown"] == "true" || false);
Alderpaw.EnemyInfoDisplay.isAbnormalStateShown = Boolean(parameters["isAbnormalStateShown"] == "true" || false);
Alderpaw.EnemyInfoDisplay.elementPercentShowStrategy = Boolean(parameters["elementPercentShowStrategy"] == "true" || false);
Alderpaw.EnemyInfoDisplay.abnormalStatePercentShowStrategy = Boolean(parameters["abnormalStatePercentShowStrategy"] == "true" || false);
Alderpaw.EnemyInfoDisplay.abnormalStateList = JSON.parse(parameters["abnormalStateList"]);
Alderpaw.EnemyInfoDisplay.enemyInfoWindowSkin = parameters["enemyInfoWindowSkin"];
Alderpaw.EnemyInfoDisplay.elementIconIds = JSON.parse(parameters["elementIconIds"]);


// ============================
// Window_EnemyInfo
// ============================
function Window_EnemyInfo() {
    this.initialize(...arguments);
}

Window_EnemyInfo.prototype = Object.create(Window_Base.prototype);
Window_EnemyInfo.prototype.constructor = Window_EnemyInfo;

Window_EnemyInfo.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._additionalSprites = {};
    this._stateBuffUpdateCount = 0;
    this._currentStateBuffIndex = 0;
	this._enemyStateBuffIcon = new Sprite(ImageManager.loadSystem("IconSet"));
    this._enemyStateBuffCountText = new Sprite(new Bitmap(24, 24));
    this._enemyStateBuffIcon.x = 160;
    this._enemyStateBuffIcon.y = 12;
    this._enemyStateBuffCountText.x = 172;
    this._enemyStateBuffCountText.y = 10;
    this._enemyStateBuffCountText.bitmap.fontSize = 16;
    this._enemyStateBuffIcon.visible = false;
    this._enemyStateBuffCountText.visible = false;
    this.addChildToBack(this._enemyStateBuffCountText);
    this.addChildToBack(this._enemyStateBuffIcon);
    this.opacity = 192;
};

Window_EnemyInfo.prototype.lineHeight = function() {
  return 26;
};

Window_EnemyInfo.prototype.createInnerSprite = function(key, spriteClass) {
    const dict = this._additionalSprites;
    if (dict[key]) {
        return dict[key];
    } else {
        const sprite = new spriteClass();
        dict[key] = sprite;
        this.addInnerChild(sprite);
        return sprite;
    }
};

const _alderpaw_Window_EnemyInfo_resetFontSettings = Window_EnemyInfo.prototype.resetFontSettings;
Window_EnemyInfo.prototype.resetFontSettings = function() {
	_alderpaw_Window_EnemyInfo_resetFontSettings.call(this);
    this.contents.fontSize = $gameSystem.mainFontSize() - 4;
	// if (FontManager._states["my-battle-hud-font"] !== "loaded") {
	// 	FontManager.load("my-battle-hud-font", "ZCOOL_KuaiLe2016.otf");
	// }
    // this.contents.fontFace = "my-battle-hud-font";
};

Window_EnemyInfo.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem(Alderpaw.EnemyInfoDisplay.enemyInfoWindowSkin);
};

Window_EnemyInfo.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.visible) {
        if (this._stateBuffUpdateCount % 40 === 0) {
            this.refreshStateBuffHud();
            this._stateBuffUpdateCount = 0;
        }
        this._enemyStateBuffIcon.visible = true;
        this._enemyStateBuffCountText.visible = true;
        this._stateBuffUpdateCount++;
    }
    else {
        this._stateBuffUpdateCount = 0;
        this._enemyStateBuffIcon.visible = false;
        this._enemyStateBuffCountText.visible = false;
    }
};

Window_EnemyInfo.prototype.refreshStateBuffHud = function() {
    let stateBuffIcon = this._enemyStateBuffIcon;
    let stateBuffCountText = this._enemyStateBuffCountText;
    if (stateBuffIcon == null || stateBuffCountText == null || SceneManager._scene._enemyWindow == null) {
        return;
    }
    let enemy = SceneManager._scene._enemyWindow.enemy();
    if (enemy == null) {
        for (const battler of $gameTroop.members()) {
            if (battler._selected) {
                enemy = battler;
                break;
            }
        }
    }
    if (enemy == null) {
        return;
    }
    let icons = enemy.allIcons();
    if (this._currentStateBuffIndex >= icons.length) {
        this._currentStateBuffIndex = 0;
    }
    let state_icon_index = icons[this._currentStateBuffIndex];
    let state_count_content = "";
    //画状态图标
    let sx = state_icon_index % 16 * 32;
    let sy = Math.floor(state_icon_index / 16) * 32;
    stateBuffIcon.setFrame(sx, sy, 32, 32);
    //画状态剩余数
    //如果是buff
    if (state_icon_index >= 2016 && state_icon_index <= 2062) {
        const buff_index = state_icon_index % 8;	//一共8种能力上升/下降
        const buffTurns = enemy._buffTurns;
        state_count_content = buffTurns[buff_index].toString();
    }
    //如果是state
    else {
        const stateTurns = enemy._stateTurns;    //这是字典
        const current_stateIds = Object.keys(stateTurns);
        for (let j = 0; j < current_stateIds.length; j++) {
            if ($dataStates[current_stateIds[j]].iconIndex === state_icon_index) {
                state_count_content = stateTurns[current_stateIds[j]];
                break;
            }
        }
    }
    stateBuffCountText.bitmap.clear();
    stateBuffCountText.bitmap.drawText(state_count_content, 0, 0, 24, 24, "center");
    if (icons.length > 0) {
        this._currentStateBuffIndex = (this._currentStateBuffIndex + 1) % icons.length;
    }
};

// ============================
// Window_DetailedEnemyInfo
// ============================
function Window_DetailedEnemyInfo() {
    this.initialize(...arguments);
}

Window_DetailedEnemyInfo.prototype = Object.create(Window_Base.prototype);
Window_DetailedEnemyInfo.prototype.constructor = Window_DetailedEnemyInfo;

Window_DetailedEnemyInfo.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this._additionalSprites = {};
    this.opacity = 192;
};

Window_DetailedEnemyInfo.prototype.lineHeight = function() {
  return 36;
};

Window_DetailedEnemyInfo.prototype.createInnerSprite = function(key, spriteClass) {
    const dict = this._additionalSprites;
    if (dict[key]) {
        return dict[key];
    } else {
        const sprite = new spriteClass();
        dict[key] = sprite;
        this.addInnerChild(sprite);
        return sprite;
    }
};

const _alderpaw_Window_DetailedEnemyInfo_resetFontSettings = Window_DetailedEnemyInfo.prototype.resetFontSettings;
Window_DetailedEnemyInfo.prototype.resetFontSettings = function() {
	_alderpaw_Window_DetailedEnemyInfo_resetFontSettings.call(this);
    this.contents.fontSize = $gameSystem.mainFontSize() - 4;
	// if (FontManager._states["my-battle-hud-font"] !== "loaded") {
	// 	FontManager.load("my-battle-hud-font", "ZCOOL_KuaiLe2016.otf");
	// }
    // this.contents.fontFace = "my-battle-hud-font";
};

Window_DetailedEnemyInfo.prototype.loadWindowskin = function() {
    this.windowskin = ImageManager.loadSystem(Alderpaw.EnemyInfoDisplay.enemyInfoWindowSkin);
};

//增加简要信息窗口和详细信息窗口
const _alderpaw_enemyInfoDisplay_sceneBattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    _alderpaw_enemyInfoDisplay_sceneBattle_createAllWindows.call(this);
    this.createEnemySimpleInfoWindow();
    this.createEnemyDetailedInfoWindow();
};

Scene_Battle.prototype.createEnemySimpleInfoWindow = function() {
    const rect = this.enemySimpleInfoWindowRect();
    this._enemySimpleInfoWindow = new Window_EnemyInfo(rect);
    this._enemySimpleInfoWindow.hide();
    this.addWindow(this._enemySimpleInfoWindow);
};

Scene_Battle.prototype.enemySimpleInfoWindowRect = function() {
    const wx = Alderpaw.EnemyInfoDisplay.simpleEnemyInfoXPos;
    const wy = Alderpaw.EnemyInfoDisplay.simpleEnemyInfoYPos;
    const ww = 240;
    const wh = 280;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createEnemyDetailedInfoWindow = function() {
  const rect = this.enemyDetailedInfoWindowRect();
  this._enemyDetailedInfoWindow = new Window_DetailedEnemyInfo(rect);
  this._enemyDetailedInfoWindow.hide();
  this.addWindow(this._enemyDetailedInfoWindow);
};

Scene_Battle.prototype.enemyDetailedInfoWindowRect = function() {
  const wx = Alderpaw.EnemyInfoDisplay.detailedEnemyInfoXPos;
  const wy = Alderpaw.EnemyInfoDisplay.detailedEnemyInfoYPos;
  const ww = 400;
  const wh = 680;
  return new Rectangle(wx, wy, ww, wh);
};

//检测是否要打开详细信息窗口
const alderpaw_enemyInfoDisplay_sceneBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    alderpaw_enemyInfoDisplay_sceneBattle_update.call(this);
    if (!this.checkHitKeyForDetailedInfo()) {
        this.checkHitKeyForCloseDetailedInfo();
    }
};

Scene_Battle.prototype.checkHitKeyForDetailedInfo = function() {
    if (this._enemySimpleInfoWindow && this._enemySimpleInfoWindow.visible && this._enemyDetailedInfoWindow && !this._enemyDetailedInfoWindow.visible && Input.isTriggered("tab")) {
        this._enemyDetailedInfoWindow.show();
        this.refreshDetailedEnemyInfo();
        return true;
    }
    return false;
};

//刷新详细信息，切换敌人和按下tab时均触发
Scene_Battle.prototype.refreshDetailedEnemyInfo = function(showEnemy=null) {
    let enemy = showEnemy != null ? showEnemy : this._enemyWindow.enemy();
    if (enemy == null) {
        for (const battler of $gameTroop.members()) {
            if (battler._selected) {
                enemy = battler;
                break;
            }
        }
    }
    if (enemy == null) {
        return;
    }
    const infoWindow = this._enemyDetailedInfoWindow;
    infoWindow.contents.clear();
    infoWindow.changeTextColor(ColorManager.systemColor());
    //名称和等级
    infoWindow.resetTextColor();
    if (enemy.level) {
        infoWindow.drawText(enemy.originalName() + " Lv" + enemy.level, 0, 0, 200, "left");
    }
    else {
        infoWindow.drawText(enemy.originalName(), 0, 0, 200, "left");
    }
    infoWindow.drawText(TextManager.exp + "：" + enemy.exp(), 200, 0, 200, "left");
    //血量
    infoWindow.drawTextEx("\\i[84]生命值：" + enemy.hp + "/" + enemy.mhp, 0, infoWindow.lineHeight(), 200);
    let nextRowIndex = 2;
    if (Alderpaw.EnemyInfoDisplay.isMpShown) {
        infoWindow.drawTextEx("\\i[160]魔法值：" + enemy.mp + "/" + enemy.mmp, 0, infoWindow.lineHeight() * nextRowIndex, 200);
        nextRowIndex++;
    }
    //基本属性
    infoWindow.changeTextColor(ColorManager.systemColor());
    infoWindow.drawText("基本属性", 0, infoWindow.lineHeight() * nextRowIndex, 400, "left");
    nextRowIndex++;
    infoWindow.drawTextEx("\\i[76]" + TextManager.param(2) + "：" + enemy.atk, 0, infoWindow.lineHeight() * nextRowIndex, 200);
    infoWindow.drawTextEx("\\i[81]" + TextManager.param(3) + "：" + enemy.def, 200, infoWindow.lineHeight() * nextRowIndex, 200);
    nextRowIndex++;
    infoWindow.drawTextEx("\\i[101]" + TextManager.param(4) + "：" + enemy.mat, 0, infoWindow.lineHeight() * nextRowIndex, 200);
    infoWindow.drawTextEx("\\i[133]" + TextManager.param(5) + "：" + enemy.mdf, 200, infoWindow.lineHeight() * nextRowIndex, 200);
    nextRowIndex++;
    infoWindow.drawTextEx("\\i[140]" + TextManager.param(6) + "：" + enemy.agi, 0, infoWindow.lineHeight() * nextRowIndex, 200);
    infoWindow.drawTextEx("\\i[87]" + TextManager.param(7) + "：" + enemy.agi, 200, infoWindow.lineHeight() * nextRowIndex, 200);
    //元素属性有效率
    if (Alderpaw.EnemyInfoDisplay.isElementShown) {
        nextRowIndex++;
        infoWindow.changeTextColor(ColorManager.systemColor());
        infoWindow.drawText("元素属性有效率", 0, infoWindow.lineHeight() * nextRowIndex, 400, "left");
        infoWindow.resetTextColor();
        for (let elementId = 1; elementId <= Alderpaw.EnemyInfoDisplay.elementIconIds.length; elementId++) {
            if (elementId % 2) {
                nextRowIndex++;
            }
            if (Alderpaw.EnemyInfoDisplay.elementPercentShowStrategy) {
                let elementName = $dataSystem.elements[elementId];
                infoWindow.drawText(`${elementName}：`, 200 * ((elementId - 1) % 2), infoWindow.lineHeight() * nextRowIndex, 64, "right");
                infoWindow.changeTextColor(ColorManager.paramchangeTextColor(enemy.elementRate(elementId) - 1));
                infoWindow.drawText((enemy.elementRate(elementId) * 100).toString() + "%", 72 + 200 * ((elementId - 1) % 2), infoWindow.lineHeight() * nextRowIndex, 200, "left");
                infoWindow.resetTextColor();
            }
            else {
                let elementIconIndex = Alderpaw.EnemyInfoDisplay.elementIconIds[elementId - 1];
                infoWindow.drawTextEx(`\\i[${elementIconIndex}]：`, 200 * ((elementId - 1) % 2), infoWindow.lineHeight() * (nextRowIndex + 0.06), 200);
                infoWindow.changeTextColor(ColorManager.paramchangeTextColor(enemy.elementRate(elementId) - 1));
                infoWindow.drawText((enemy.elementRate(elementId) * 100).toString() + "%", 46 + 200 * ((elementId - 1) % 2), infoWindow.lineHeight() * nextRowIndex, 200, "left");
                infoWindow.resetTextColor();
            }
        }
    }
    //异常状态有效率
    if (Alderpaw.EnemyInfoDisplay.isAbnormalStateShown) {
        nextRowIndex++;
        infoWindow.changeTextColor(ColorManager.systemColor());
        infoWindow.drawText("异常状态有效率", 0, infoWindow.lineHeight() * nextRowIndex, 400, "left");
        infoWindow.resetTextColor();
        let colIndex = 0;
        for (let i = 0; i < Alderpaw.EnemyInfoDisplay.abnormalStateList.length; i++) {
            if (colIndex === 0) {
                nextRowIndex += 1;
            }
            let stateId = parseInt(Alderpaw.EnemyInfoDisplay.abnormalStateList[i]);
            if (Alderpaw.EnemyInfoDisplay.abnormalStatePercentShowStrategy) {
                let stateName = $dataStates[stateId].name;
                infoWindow.drawText(`${stateName}：`, 133 * colIndex, infoWindow.lineHeight() * nextRowIndex, 64, "right");
                infoWindow.changeTextColor(ColorManager.paramchangeTextColor(enemy.stateRate(stateId) - 1));
                infoWindow.drawText(enemy.stateRate(stateId) * 100 + "%", 133 * colIndex + 54, infoWindow.lineHeight() * nextRowIndex, 133, "left");
                infoWindow.resetTextColor();
            }
            else {
                let stateIconIndex = $dataStates[stateId].iconIndex;
                infoWindow.drawTextEx(`\\i[${stateIconIndex}]：`, 133 * colIndex, infoWindow.lineHeight() * (nextRowIndex + 0.06), 133);
                infoWindow.changeTextColor(ColorManager.paramchangeTextColor(enemy.stateRate(stateId) - 1));
                infoWindow.drawText(enemy.stateRate(stateId) * 100 + "%", 133 * colIndex + 46, infoWindow.lineHeight() * nextRowIndex, 133, "left");
                infoWindow.resetTextColor();
            }
            colIndex = (colIndex + 1) % 3;
        }
    }
};

Scene_Battle.prototype.checkHitKeyForCloseDetailedInfo = function() {
    if (this._enemyDetailedInfoWindow && this._enemyDetailedInfoWindow.visible && (Input.isTriggered("tab"))) {
        this._enemyDetailedInfoWindow.hide();
    }
};

//ALIAS
const _alderpaw_enemyInfoDisplay_sceneBattle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
Scene_Battle.prototype.hideSubInputWindows = function() {
    _alderpaw_enemyInfoDisplay_sceneBattle_hideSubInputWindows.call(this);
    this._enemySimpleInfoWindow.hide();
    this._enemyDetailedInfoWindow.hide();
};

//ALIAS
const _alderpaw_enemyInfoDisplay_sceneBattle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    _alderpaw_enemyInfoDisplay_sceneBattle_onEnemyCancel.call(this);
    this._enemySimpleInfoWindow.hide();
    this._enemyDetailedInfoWindow.hide();
};

/**
 * ●选择敌人为目标时，简略信息
 */
const alderpaw_enemyInfoDisplay_windowBattleEnemy_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    const lastIndex = this._index;
    alderpaw_enemyInfoDisplay_windowBattleEnemy_select.call(this, index);
    //左上角弹出窗口
    if (SceneManager._scene._enemySimpleInfoWindow != null && this.enemy() != null) {
        const infoWindow = SceneManager._scene._enemySimpleInfoWindow;
        const enemy = this.enemy();
        //名字和等级
        infoWindow.contents.clear();
        if (enemy.level) {
            infoWindow.drawText(enemy.originalName() + " Lv" + enemy.level, 0, 0, 128, "left");
        }
        else {
            infoWindow.drawText(enemy.originalName(), 0, 0, 128, "left");
        }
        //生命值和蓝条
        for (let k in infoWindow._additionalSprites) {
            infoWindow._additionalSprites[k].hide();
        }
        const hpKey = "enemy%1-gauge-%2".format(enemy.name(), "hp");
        const hpSprite = infoWindow.createInnerSprite(hpKey, Sprite_Gauge);
        hpSprite.setup(enemy, "hp");
        hpSprite.move(0, infoWindow.lineHeight());
        hpSprite.show();
        let nextRowIndex = 2;
        if (Alderpaw.EnemyInfoDisplay.isMpShown) {
            const mpKey = "enemy%1-gauge-%2".format(enemy.name(), "mp");
            const mpSprite = infoWindow.createInnerSprite(mpKey, Sprite_Gauge);
            mpSprite.setup(enemy, "mp");
            mpSprite.move(0, infoWindow.lineHeight() * nextRowIndex);
            mpSprite.show();
            nextRowIndex++;
        }
        //弱点
        if (!Alderpaw.EnemyInfoDisplay.isMpShown) {
            nextRowIndex++;
        }
        infoWindow.drawTextEx("\\c[2]弱点\\c[0]", 0, infoWindow.lineHeight() * (nextRowIndex + 0.3), 100);
        let weakCount = 0;
        for (let i = 1; i <= Alderpaw.EnemyInfoDisplay.elementIconIds.length; i++) {
            if (enemy.elementRate(i) > 1) {
                let iconId = parseInt(Alderpaw.EnemyInfoDisplay.elementIconIds[i - 1]);
                infoWindow.drawTextEx(`\\i[${iconId}]`, 50 + 36 * weakCount, infoWindow.lineHeight() * nextRowIndex, 100);
                weakCount++;
            }
        }
        if (weakCount === 0) {
            infoWindow.drawTextEx("无", 50, infoWindow.lineHeight() * (nextRowIndex + 0.3), 100);
        }
        //掉落物品
        nextRowIndex += 1.5;
        infoWindow.changeTextColor(ColorManager.systemColor());
        infoWindow.drawText("掉落物品", 0, infoWindow.lineHeight() * nextRowIndex, 100, "left");
        infoWindow.resetTextColor();
        for (const dropItem of enemy.enemy().dropItems) {
            if (dropItem.dataId > 1) {
                nextRowIndex++;
                let kind = dropItem.kind;
                let itemDropRate = Math.floor(1 / dropItem.denominator * 100);
                let itemName = undefined;
                if (kind == 1) {
                    itemName = $dataItems[dropItem.dataId].name;
                }
                else if (kind == 2) {
                    itemName = $dataWeapons[dropItem.dataId].name;
                }
                else if (kind == 3) {
                    itemName = $dataArmors[dropItem.dataId].name;
                }
                infoWindow.drawText(`${itemName}(${itemDropRate}%)`, 0, infoWindow.lineHeight() * nextRowIndex, 200, "left");
            }
        }
        //按tab打开详细信息提示
        nextRowIndex++;
        if (Alderpaw.EnemyInfoDisplay.tabIconId == 0) {
            infoWindow.drawTextEx("Tab", 76, infoWindow.lineHeight() * 8.8, 100);
        }
        else {
            infoWindow.drawTextEx(`\\i[${Alderpaw.EnemyInfoDisplay.tabIconId}]`, 88, infoWindow.lineHeight() * 8.6, 100);
        }
        infoWindow.drawTextEx("详细信息", 124, infoWindow.lineHeight() * 8.8, 100);
        SceneManager._scene.refreshDetailedEnemyInfo();
        //刷新界面
        SceneManager._scene._enemySimpleInfoWindow.show();
        if (index != lastIndex) {
            SceneManager._scene._enemySimpleInfoWindow._stateBuffUpdateCount = 0;
            SceneManager._scene._enemySimpleInfoWindow.refreshStateBuffHud();
        }
    }
};

/**
 * ●关闭敌方选择
 */
const alderpaw_enemyInfoDisplay_windowBattleEnemy_hide = Window_BattleEnemy.prototype.hide;
Window_BattleEnemy.prototype.hide = function() {
    alderpaw_enemyInfoDisplay_windowBattleEnemy_hide.call(this);
    //左上角窗口隐藏
    if (SceneManager._scene._enemySimpleInfoWindow != null) {
        SceneManager._scene._enemySimpleInfoWindow.hide();
    }
};

//选择网格为目标时，只能显示一个敌人的信息，默认显示index靠前的
// const alderpaw_enemyInfoDisplay_windowBattleGridSelectNode_select = Window_BattleGridSelectNode.prototype.select;
// Window_BattleGridSelectNode.prototype.select = function(index) {
//     const lastIndex = this._index;
//     alderpaw_enemyInfoDisplay_windowBattleGridSelectNode_select.call(this, index);
// 	//左上角弹出窗口
//     if (SceneManager._scene._enemySimpleInfoWindow != null) {
//         const infoWindow = SceneManager._scene._enemySimpleInfoWindow;
//         let enemy = null;
//         for (const battler of $gameTroop.members()) {
//             if (battler._selected) {
//                 enemy = battler;
//                 break;
//             }
//         }
//         if (enemy == null) {
//             SceneManager._scene._enemySimpleInfoWindow.hide();
//             return;
//         }
//         //名字和等级
//         infoWindow.contents.clear();
//         infoWindow.drawText(enemy.originalName() + " Lv" + enemy.level, 0, 0, 128, "center");
//         //生命值和破防条
//         for (let k in infoWindow._additionalSprites) {
//             infoWindow._additionalSprites[k].hide();
//         }
//         const hpKey = "enemy%1-gauge-%2".format(enemy.name(), "hp");
//         const hpSprite = infoWindow.createInnerSprite(hpKey, Sprite_Gauge);
//         hpSprite.setup(enemy, "hp");
//         hpSprite.move(0, infoWindow.lineHeight());
//         hpSprite.show();
//         //弱点
//         infoWindow.drawTextEx("\\c[2]WEAK\\c[0]", 0, infoWindow.lineHeight() * 3.3, 100);
//         const element2icon = {
//             1: "\\i[66]",
//             2: "\\i[69]",
//             3: "\\i[65]",
//             4: "\\i[64]",
//             5: "\\i[68]",
//             6: "\\i[70]",
//             7: "\\i[71]"
//         };
//         let weakCount = 0;
//         for (let i = 1; i <= 7; i++) {
//             if (enemy.elementRate(i) > 1) {
//                 infoWindow.drawTextEx(element2icon[i], 68 + 36 * weakCount, infoWindow.lineHeight() * 3, 100);
//                 weakCount++;
//             }
//         }
//         if (weakCount === 0) {
//             infoWindow.drawTextEx("\\c[7]无弱点\\c[0]", 68, infoWindow.lineHeight() * 3.3, 100);
//         }
//         //详细信息提示
//         infoWindow.drawTextEx("\\i[2662]", 72, infoWindow.lineHeight() * 4.3, 100);
//         infoWindow.drawTextEx("详细信息", 108, infoWindow.lineHeight() * 4.5, 100);
//         SceneManager._scene.refreshDetailedEnemyInfo(enemy);
//         //刷新界面
//         SceneManager._scene._enemySimpleInfoWindow.show();
//         if (index != lastIndex) {
//             SceneManager._scene._enemySimpleInfoWindow._stateBuffUpdateCount = 0;
//             SceneManager._scene._enemySimpleInfoWindow.refreshStateBuffHud();
//         }
//     }
// };

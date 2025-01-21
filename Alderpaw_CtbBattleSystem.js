//=============================================================================
// RPG Maker MZ - CTB战斗系统
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [V 1.10] CTB战斗系统
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 * @author Alderpaw
 * @url https://github.com/alderpaw/rmmz_custom_plugins
 *
 * 
 * @param ctbPosX
 * @text ctb行动条的x轴偏移量
 * @type number
 * @desc 调整行动条在屏幕上的位置。
 * @default 0
 * 
 * @param ctbPosY
 * @text ctb行动条的y轴偏移量
 * @type number
 * @desc 调整行动条在屏幕上的位置。
 * @default 0
 * 
 * @param ctbGaugeAutoReposition
 * @text ctb行动条自动向下偏移
 * @type boolean
 * @desc 显示技能和物品的描述信息时，是否将行动条自动向下偏移，以免挡住屏幕上方的描述窗口。
 * @default true
 * 
 * @param ctbMaxShowNum
 * @text ctb行动条最大单位显示数
 * @type number
 * @desc ctb行动条中最多显示多少个单位？
 * @default 12
 * 
 * @param ctbCastAnimationId
 * @text 开始驱动时播放的动画
 * @type animation
 * @desc 当某名角色开始驱动魔法时，可以设定在角色身上播放的动画，比如魔法阵
 * 
 * @param ctbCastAnimationTime
 * @text 驱动动画的持续时长
 * @type number
 * @desc 播放驱动动画时，等待多少帧(60帧等于1秒)？
 * @default 120
 * 
 * @param ctbIdleSkillId
 * @text 无效行动的技能ID
 * @type skill
 * @desc ctb战斗系统中，在无法行动状态下轮到行动回合时会自动跳过回合，因此需要设定一个空技能。这个技能的类型一定要是“无”。
 * @default 8
 * 
 * @param ctbCurrentAnchorImg
 * @text 指示当前位置的指针
 * @type file
 * @dir img/system
 * @desc 若某名角色的AT将改变，则用此图片指示其当前的位置。
 * 建议使用向上的箭头。
 * 
 * @param ctbPredictAnchorImg
 * @text 指示未来位置的指针
 * @type file
 * @dir img/system
 * @desc 若某名角色的AT将改变，则用此图片指示其未来的位置。
 * 建议使用向下的箭头。
 * 
 * @param ctbDelayCancelAdvanceSettings
 * @text AT延迟/加速/解除驱动相关的设置
 * 
 * @param ctbDelaySkillTypesByEquip
 * @text 可触发装备附带的延迟特效的技能类型
 * @type number[]
 * @desc 哪些类型的技能可以触发装备的延迟效果？填写技能类型的ID号。
 * 普通攻击算0号技能类型
 * @default [0]
 * @parent ctbDelayCancelAdvanceSettings
 * 
 * @param ctbShowDelayPosition
 * @text 是否显示目标受延迟后的行动条位置
 * @type boolean
 * @desc 选择具有延迟效果的技能时，是否显示目标受影响后的行动条位置？
 * @default true
 * @parent ctbDelayCancelAdvanceSettings
 * 
 * @param ctbShowDelayPopup
 * @text 是否弹出DELAY
 * @type boolean
 * @desc 目标受到延迟效果时，是否在其身上弹出“DELAY”字样？
 * @default true
 * @parent ctbDelayCancelAdvanceSettings
 * 
 * @param ctbDelayStateId
 * @text 延迟状态ID
 * @type state
 * @desc 哪个状态用于表示AT延迟？
 * 可用于设定延迟抗性。
 * @default 0
 * @parent ctbDelayCancelAdvanceSettings
 * 
 * @param ctbShowCancelCastPopup
 * @text 是否弹出CANCEL
 * @type boolean
 * @desc 目标受到解除驱动效果时，是否在其身上弹出“CANCEL”字样？
 * @default true
 * @parent ctbDelayCancelAdvanceSettings
 * 
 * @param ctbShowAdvancePopup
 * @text 是否弹出ADVANCE
 * @type boolean
 * @desc 目标受到AT加速效果时，是否在其身上弹出“ADVANCE”字样？
 * @default true
 * @parent ctbDelayCancelAdvanceSettings
 * 
 * @param ctbMagicBannedStateIds
 * @text 封印魔法的状态ID
 * @type state[]
 * @desc 哪些状态下，会禁止使用需要驱动时间的技能(魔法)？
 * 当正在驱动的目标被施加了这些状态后，会自动解除驱动
 * @default []
 * @parent ctbDelayCancelAdvanceSettings
 * 
 * @param ctbGaugeBonusSetting
 * @text AT奖励相关设定
 * 
 * @param ctbStartBonusNum
 * @text 开局插入多少个AT奖励？
 * @desc 每次战斗开始时随机插入一定数量的AT奖励。
 * 插入概率和参数中设置的权重相同。
 * @type number
 * @default 4
 * @parent ctbGaugeBonusSetting
 *
 * @param ctbGaugeBonusAppearPossibility
 * @text 每次插入AT奖励的概率
 * @desc 每次ctb行动条流转(某角色行动结束)时，有多大的概率在行动条最后插入一个AT奖励？
 * @type number
 * @default 0.25
 * @parent ctbGaugeBonusSetting
 *
 * @param ctbGaugeBonusList
 * @text AT奖励列表
 * @desc 在此定义游戏中会出现的AT奖励。
 * @type struct<ctbBonus>[]
 * @default []
 * @parent ctbGaugeBonusSetting
 * 
 * @param ctbSBreakSetting
 * @text S爆发技相关设定
 * 
 * @param ctbSBreakTriggerSE
 * @text 发动S爆发技时播放的音效
 * @type file
 * @dir audio/se
 * @desc 发动S爆发技时播放的音效。
 * @parent ctbSBreakSetting
 * 
 * @param ctbSBreakMinTP
 * @text 发动S爆发技时所需的TP
 * @type number
 * @default 100
 * @desc 设定最少有多少TP才能发动S爆发技。
 * @parent ctbSBreakSetting
 * 
 * @help Alderpaw_CtbBattleSystem.js
 * 
 * 实现类似轨迹的CTB战斗系统，根据人物agi和不同行动的耗时来决定各角色的行动顺序。
 * 
 * *************** v1.10修改 ***************
 * ****** BUG修复和特性修改 ******
 * 1. 修复了有时按键盘1~4键无法爆S技的问题。
 * 2. 修复了角色正在释放技能动画时，对该角色爆S技会导致窗口卡住的问题。
 * 3. 删除了竖向行动条，只保留横向（理解一下，不想适配了）。
 * 4. 修复了回复/扣血类AT奖励触发时机不固定的问题。现在一定会在轮到角色行动回合
 * 时触发效果，不会在行动结束后再触发。并且，如果这个AT奖励已经对某名角色产生过
 * 效果了，那么爆S技的角色虽然会强制移动到该位置，但不会重复获得该AT奖励。
 * 5. 修复了某些异常状态下战斗系统可能会卡死的问题（还需验证是否完全修复）。
 * 6. 现在本插件将VisuMZ战斗核心指定为了必需的前置插件。
 * 7. 增加对魔石系统的适配。
 * 
 * ****** 新增功能 ******
 * 1. 新增选择技能/物品时行动条可往下移的选项，避免挡住上方的描述窗口。
 * 2. 新增开局直接插入一定量AT奖励的选项。
 * 3. 改变了状态和BUFF计算回合数的逻辑。现在状态和BUFF都是在
 * 4. 可指定敌人等级以及是否为Boss，用于实现你想要的功能。例如，DQ中只对等级为
 * 特定倍数的敌人才生效的即死魔法，闪之轨迹中Boss类敌人只会进入1回合异常状态等。
 * 具体用法请看下面的Notetags部分的说明。
 * 5. 新增很多轨迹系列里经常用到的人物属性，例如暴击增伤、低血增伤、护盾等。这些
 * 参数需要通过备注栏指定，并且一定要在VisuMZ战斗核心中做适当配置才能生效。具体
 * 请看下面的Notetags部分的说明。
 * 6. 本插件里还包含对VisuMZ_2_BattleGrid插件的一些兼容，但这个插件得额外付费20
 * 美刀，大部分人应该不用，所以此处不赘述。
 * 
 * *************** v1.01新增 ***************
 * 1. 获得零驱动AT奖励时，魔法预测的行动位置显示为硬直时间，而不是驱动时间。
 * 2. 增加插件参数，可选择竖向放置ctb行动条。
 * 3. 增加新功能：可为装备设定AT延迟效果，装备上后攻击就能延迟敌人。
 * 4. 增加新功能：S爆发技。类似空轨，按下键盘上的1~4数字键可无视行动顺序瞬发S技。
 * 此时会强制进入S技选择界面，只能使用S技，不能做其他任何操作。
 * 可以在插件参数中设置爆S技时的音效以及需要多少TP才能发动S技。
 * 另外，最好在人物栏创建一个标记，符合发动S技的条件时就亮起。
 * 但由于每个人的UI都不同，这里就不提供了，可以自己简单写一下。
 * 判断能否使用S技，可在脚本中使用以下语句：
 * if ($gameParty.members()[i].canUseSBreak())，i=0-3，对应1-4号位。
 * 
 * 
 * ********** 战斗系统介绍 **********
 * 每名敌我角色都有一个AT(Action Time)值，AT=0时该名角色就可以行动。
 * 战斗开始时，每名角色都有一个随机的AT值，agi越高则AT值小的概率就越大。
 * 战斗开始时以及每次行动结束时，都会同步减少所有角色的AT，直到有角色的AT减至0。
 * 不同的行动(技能、物品、普攻等)具有不同的耗时，称之为ST(Skill Time)。
 * 对于ST，可以分别设置驱动时间castST和硬直时间delayST。
 * -驱动时间：技能使用后需要读条才能释放，一般这种技能就是魔法。
 * -硬直时间：技能结束后，角色需要等待多久才能再次行动。
 * 每次行动后，根据ST和agi可以计算得知该名角色的AT会增加多少。
 * AT计算公式为ΔAT=100*ST/agi，向下取整。
 * 然后，根据AT重新对所有角色进行排队。
 * 行动结束的角色会插到相应的位置，从而实现CTB战斗系统的循环。
 * 
 * 此外，行动条上还会随机出现AT奖励，会使当前行动的角色受到一些增益或减益效果。
 * 你可以控制AT奖励的出现概率，并定义AT奖励的种类。
 * 
 * 在轨迹系列中，技能一般是分为战技和魔法。所有“命中类型”为物理攻击的技能就是战技，
 * 所有“命中类型”为魔法攻击的技能就是魔法。注意战技和魔法的区分只和命中类型相关，而
 * 与伤害的计算公式无关，例如部分战技也可以是魔法伤害，伤害公式考虑使用者的魔攻和目
 * 标的魔防。下文中所有的“战技”和“魔法”都遵循这里的定义。
 * 一般来说普通攻击也会设置为物理命中类型，所以普通攻击也属于战技。
 * 魔法需要驱动时间，战技不需要，本系统计算驱动时间时也只会考虑上面定义的“魔法”。
 * 
* ********** VisuMZ战斗核心设置 **********
 * 如果你希望本插件新增的人物属性能实际生效的话，必须在VisuMZ战斗核心中做以下设置。
 * 建议打开本插件的.js文件再复制，格式更好看。
 * 1. 把Damage Settings的Formulas的JS: Overall Formula改成以下内容：
const user = this.subject();
const target = arguments[0];
const critical = arguments[1];
const item = this.item();
const stunStateId = 13;
// Get Base Damage
const baseValue = this.evalDamageFormula(target);
// Calculate Element Modifiers
let value = baseValue * this.calcElementRate(target);
// Calculate Physical and Magical Modifiers
if (this.isPhysical()) {
    value *= target.pdr;
    value *= user.pdr_to_target;
    //计算残血和满血增伤
    value *= (1 + (user.low_hp_craft_damage_rate - 1) * (1 - user.hp / user.mhp));
    value *= (1 + (user.high_hp_craft_damage_rate - 1) * (user.hp / user.mhp));
}
if (this.isMagical()) {
    value *= target.mdr;
    value *= user.mdr_to_target;
    //计算残血和满血增伤
    value *= (1 + (user.low_hp_magic_damage_rate - 1) * (1 - user.hp / user.mhp));
    value *= (1 + (user.high_hp_magic_damage_rate - 1) * (user.hp / user.mhp));
}
// Apply Healing Modifiers
if (baseValue < 0) {
    value *= target.rec;
    if (item.isSkill()) {
        value *= user.extra_heal_rate;
    }
}
// Apply Critical Modifiers
if (critical) {
    value = this.applyCritical(value);
}
// Apply Variance and Guard Modifiers
value = this.applyVariance(value, item.damage.variance);
value = this.applyGuard(value, target);
//破防增伤
if (target.isStateAffected(stunStateId)) {
    value *= 1.2;
}
// 伤害取整后，减去护盾
value = Math.round(value);
if (target._shieldHp > 0) {
    const originalShieldHp = target._shieldHp;
    target._shieldHp = Math.max(0, target._shieldHp - value);
    value = Math.max(0, value - originalShieldHp);
    if (target._shieldHp === 0) {
        for (const state of target.states()) {
            if (state.meta["Shield Hp Value"]) {
                target.removeState(state.id);
                break;
            }
        }
    }
}
return value;
 * 
 * 2. 把Damage Settings的Critical Hits的JS: Damage Formula改成以下内容：
// Declare Constants
const user = this.subject();
let damage = arguments[0];
let multiplier = 1.5;
let bonusDamage = this.subject().luk * this.subject().cri;
if (this.isHpRecover() || this.isMpRecover()) {
    bonusDamage *= -1;
}
if (this.isPhysical()) {
    multiplier *= user.extra_critical_damage_rate;
}
// Apply Notetags
const note = this.item().note;
if (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\d+)([%％])>/i)) {
    multiplier = Number(RegExp.$1) / 100;
}
if (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\+\-]\d+)([%％])>/i)) {
    multiplier += Number(RegExp.$1) / 100;
}
if (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\d+)([%％])>/i)) {
    bonusDamage *= Number(RegExp.$1) / 100;
}
if (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\+\-]\d+)([%％])>/i)) {
    bonusDamage += bonusDamage * (RegExp.$1) / 100;
}
if (note.match(/<JS CRITICAL DAMAGE>\s*([\s\S]*)\s*<\/JS CRITICAL DAMAGE>/i)) {
    const code = String(RegExp.$1);
    try {
        eval(code);
    } catch (e) {
        if ($gameTemp.isPlaytest()) console.log(e);
    }
}
// Return Damage
return damage * multiplier;
 * 
 * 3. 把Mechanics Settings的JS: Action Related的JS: Post-Damage改成以下内容：
const value = arguments[0];
const target = arguments[1];
const user = this.subject();
const a = user;
const b = target;
const action = this;
const item = this.item();
const skill = this.item();
if (this.isMagical() && user.attack_mp_absorb_rate > 0) {
    user.gainMp(Math.floor(value * user.attack_mp_absorb_rate));
}
if (this.isPhysical() && user.attack_hp_absorb_rate > 0) {
    user.gainHp(Math.floor(value * user.attack_hp_absorb_rate));
}
if (value >= target.hp && user.kill_tp_absorb_value > 0) {
    user.gainTpReward(user.kill_tp_absorb_value);
}
return value;
 *
 * ********** Notetags **********
 * 扩展功能通过将特定标签写在备注栏来实现。注意，以下所有的冒号都是英文冒号。
 * 
 * 1. 设定技能的驱动时间和硬直时间
 * 填写位置：技能的备注栏
 * <castST:50> 该技能的驱动时间为50，若不设置则驱动时间默认为0(即不需要驱动)。
 * <delayST:120> 该技能的硬直时间为120，若不设置则硬直时间默认为100。
 * 
 * 2. 增加命中目标的AT，可用于实现具有延迟效果的技能或装备
 * 填写位置：技能、装备的备注栏
 * <AT Delay By Value:+x> 命中后固定将目标的AT增加x，这种延迟与agi无关。
 * <AT Delay By ST:+x> 命中后使目标的硬直增加x，实际AT延迟量为100*x/target.agi。
 * <AT Delay Chance:0.x> 有0.x的概率触发延迟，不写默认100%触发(若敌人有延迟抗性，会相应折算)。
 * 另外，可以在插件参数中指定哪些类型的技能会触发装备的延迟特效。比如轨迹系列中，
 * 一般魔法不会触发这类特效，只有普通攻击和战技可以。
 * 
 * 3. 减少命中目标的AT，可用于实现提行动条的技能
 * 填写位置：技能的备注栏
 * <AT Advance By Value:+x>表示技能命中后使目标的AT减少x，与agi无关。
 * <AT Advance By ST:+x>表示技能命中后使目标的硬直减少x，通过100*x/target.agi计算得到AT减少量。
 * 
 * 4. 设置本技能具有解除正在驱动的魔法的功能
 * 填写位置：技能的备注栏
 * <Cancel Cast>
 * 
 * 5. 特定状态下才能/不能使用的技能
 * 填写位置：技能的备注栏
 * <Disabled In State: x>表示该技能在x号状态下无法使用。
 * <Enabled In State: x>表示该技能只有在x号状态下才能使用。
 * 
 * 6. 指定技能为S爆发技
 * 填写位置：技能的备注栏
 * <奥义技>表示将此技能设定为S爆发技，可以设定多个，爆S时选择一个使用。
 * 
 * 7. 指定敌人的等级以及是否为Boss
 * 填写位置：敌人的备注栏
 * <Level: x> 表示将敌人等级设定为x
 * <Boss> 表示将该敌人设定为Boss
 * Game_Enemy类新增一个isBoss()方法，用于判断敌人是否为Boss。
 * 
 * 8. 人物新增属性
 * 填写位置：装备、状态的备注栏，角色佩戴该装备或拥有该状态时触发相应效果。
 * <Craft DelayST Rate: x.y> 
 * 角色所有行动的硬直时间（ST）变为x.y倍。多个装备·状态的该效果之间乘算。
 * <CastST Rate: x.y>
 * 角色使用魔法时的驱动时间变为x.y倍。多个装备·状态的该效果之间乘算。
 * <Magic Critical Rate: +0.x>
 * 轨迹系列里，魔法是无法暴击的，因此我推荐在数据库里把魔法的暴击设置为“无”。
 * 而这个标签可以使魔法有0.x的概率暴击。多个效果之间加算。
 * <Extra Critical Damage Rate: +0.x>
 * 角色的暴击伤害额外增加0.x，多个效果之间加算。内部加算后，和原始暴击伤害倍率
 * 之间则是乘算。比如原始暴击伤害1.5倍，有2个装备设置了这个标签，分别是+0.1和
 * +0.2，那么最终暴击伤害倍率为1.5*(1+0.2+0.1)=1.95。
 * <Extra Heal Rate: +0.x>
 * 角色使用回复技能时，对目标的治疗效果额外提升0.x倍。多个效果之间加算。
 * <Craft Damage Rate: +0.x>
 * 角色使用战技(命中类型为物理的技能)时，伤害增加0.x倍，多个效果之间加算。
 * <Magic Damage Rate: +0.x>
 * 角色使用魔法(命中类型为魔法的技能)时，伤害增加0.x倍，多个效果之间加算。
 * <Mp Absorb Rate: +0.x>
 * 角色使用魔法命中敌人时，按照伤害的0.x倍回复MP，多个效果之间加算。
 * <Hp Absorb Rate: +0.x>
 * 角色使用战技命中敌人时，按照伤害的0.x倍回复HP，多个效果之间加算。
 * <Kill Tp Absorb Value: +x>
 * 角色击杀敌人时，回复x点TP。多个效果之间加算。
 * <Low Hp Craft Damage Rate: +0.x>
 * 角色HP越低则战技伤害越高，1血时增加0.x倍，满血时不增伤(线性关系)，多个效果之间加算。
 * <Low Hp Magic Damage Rate: +0.x>
 * 角色HP越低则魔法伤害越高，1血时增加0.x倍，满血时不增伤(线性关系)，多个效果之间加算。
 * <High Hp Craft Damage Rate: +0.x>
 * 角色HP越高则战技伤害越高，满血时增加0.x倍，1血时不增伤(线性关系)，多个效果之间加算。
 * <High Hp Magic Damage Rate: +0.x>
 * 角色HP越高则魔法伤害越高，满血时增加0.x倍，1血时不增伤(线性关系)，多个效果之间加算。
 * 
 * 9. 护盾相关
 * 填写位置：状态的备注栏
 * <Shield Hp Value: x> 此状态提供护盾效果，护盾的承伤上限为x(x是正整数)。
 * 这个护盾是黎轨里的机制，而不是空零碧闪那样的按次数来完全防御，因为我一直
 * 觉得空轨的盾太强了，黎轨的平衡一点。对于护盾状态，需要将持续回合数设置为
 * 无效，护盾HP消耗完后会自动移除。另外，最好是给护盾做一个UI，用来显示角色
 * 当前的护盾值。本插件实现了一个Sprite_Gauge_Shield类，可以像HP那样显示一
 * 个类似血条的“护盾条”，但是需要一定的JS基础才能将其放到战斗UI上去。由于每
 * 个人使用的战斗UI都不同，本插件没有实现UI的修改，只是提供了护盾的机制。
 * 
 * 
*/
/*~struct~ctbBonus:
 * @param name
 * @text AT奖励名称
 * @type text
 * @desc 该AT奖励的名称，只是方便制作者记忆，不会出现在游戏中。
 *
 * @param iconId
 * @text AT奖励对应的图标ID
 * @type icon
 * @default 0
 * @desc 该AT奖励对应的图标ID，用于在行动条中显示。
 *
 * @param weight
 * @text AT奖励的出现权重
 * @type number
 * @default 1
 * @desc 插入新的AT奖励时，该AT奖励的出现权重。权重越大则相对出现概率也就越高。
 *
 * @param effectType
 * @text 可选的AT奖励种类
 * @type select
 * @option 本次攻击必定暴击
 * @option 本次魔法可瞬发
 * @option HP回复
 * @option MP回复
 * @option TP回复
 * @desc 可选的AT奖励效果。
 * @default 本次攻击必定暴击
 * 
 * @param effectValue
 * @text 回复类AT奖励的回复量
 * @type number
 * @desc 填小数就是比例，整数就是固定值，可填负数。仅在AT奖励种类为HP/MP/TP回复时有效
 * @default 0.1
 * 
 */


//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Alderpaw = Alderpaw || {}; 
var Imported = Imported || {};
Imported.Alderpaw_CtbBattleSystem = true;

const alderpawCtbParameters = PluginManager.parameters('Alderpaw_CtbBattleSystem');
Alderpaw.ctbPosX = Number(alderpawCtbParameters["ctbPosX"] || 0);
Alderpaw.ctbPosY = Number(alderpawCtbParameters["ctbPosY"] || 0);
Alderpaw.ctbMaxShowNum = Number(alderpawCtbParameters['ctbMaxShowNum'] || 15);
Alderpaw.ctbDelayStateId = Number(alderpawCtbParameters['ctbDelayStateId'] || 0);
Alderpaw.ctbMagicBannedStateIds = alderpawCtbParameters['ctbMagicBannedStateIds'] || [];
Alderpaw.ctbShowDelayPosition = alderpawCtbParameters["ctbShowDelayPosition"] === "false" ? false : true;
Alderpaw.ctbShowDelayPopup = alderpawCtbParameters["ctbShowDelayPopup"] === "false" ? false : true;
Alderpaw.ctbShowCancelCastPopup = alderpawCtbParameters["ctbShowCancelCastPopup"] === "false" ? false : true;
Alderpaw.ctbCastAnimationId = Number(alderpawCtbParameters["ctbCastAnimationId"] || 0);
Alderpaw.ctbCastAnimationTime = Number(alderpawCtbParameters["ctbCastAnimationTime"] || 120);
Alderpaw.ctbIdleSkillId = Number(alderpawCtbParameters["ctbIdleSkillId"] || 8);
Alderpaw.ctbGaugeBonusAppearPossibility = Number(alderpawCtbParameters["ctbGaugeBonusAppearPossibility"] || 0);
Alderpaw.ctbGaugeBonusList = alderpawCtbParameters["ctbGaugeBonusList"] || [];
Alderpaw.ctbShowAdvancePopup = alderpawCtbParameters["ctbShowAdvancePopup"] === "false" ? false : true;
Alderpaw.ctbGaugeAutoReposition = alderpawCtbParameters["ctbGaugeAutoReposition"] === "false" ? false : true;
Alderpaw.ctbCurrentAnchorImg = alderpawCtbParameters["ctbCurrentAnchorImg"] || "anchor_current";
Alderpaw.ctbPredictAnchorImg = alderpawCtbParameters["ctbPredictAnchorImg"] || "anchor_predict";
Alderpaw.ctbSBreakTriggerSE = alderpawCtbParameters["ctbSBreakTriggerSE"] || null;
Alderpaw.ctbSBreakMinTP = Number(alderpawCtbParameters["ctbSBreakMinTP"] || 100);
Alderpaw.ctbStartBonusNum = Number(alderpawCtbParameters["ctbStartBonusNum"] || 4);
Alderpaw.ctbDelaySkillTypesByEquip = alderpawCtbParameters["ctbDelaySkillTypesByEquip"] || [0];
//str转数字
for (let i = 0; i < Alderpaw.ctbMagicBannedStateIds.length; i++) {
    Alderpaw.ctbMagicBannedStateIds[i] = parseInt(Alderpaw.ctbMagicBannedStateIds[i]);
}
for (let i = 0; i < Alderpaw.ctbGaugeBonusList.length; i++) {
    Alderpaw.ctbGaugeBonusList[i] = parseInt(Alderpaw.ctbGaugeBonusList[i]);
}
for (let i = 0; i < Alderpaw.ctbDelaySkillTypesByEquip.length; i++) {
    Alderpaw.ctbDelaySkillTypesByEquip[i] = parseInt(Alderpaw.ctbDelaySkillTypesByEquip[i]);
}

const _alderpaw_ctb_gameTemp_init = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _alderpaw_ctb_gameTemp_init.call(this);
    this._currentActionDelay = 0;
    this._currentCastDelay = 0;
    this._castingBattler = null;
    this._currentTargets = [];
    this._isReceivedBonus = false;  //判断本回合是否已经有人拿过AT奖励了
}


//=============================================================================
// ■■■ 独立于类的函数 ■■■
//=============================================================================
function gainHpMpTpReward(battler) {
    if ($scene._ctbGauge && $scene._ctbGauge._globalBonusDict && $scene._ctbGauge._currentBonusList && $scene._ctbGauge._currentBonusList[0] >= 0) {
        const value = parseFloat($scene._ctbGauge._globalBonusDict[$scene._ctbGauge._currentBonusList[0]].effectValue);
        const atBonusType = $scene._ctbGauge._globalBonusDict[$scene._ctbGauge._currentBonusList[0]].effectType;
        if (atBonusType === "HP回复") {
            if (Number.isInteger(value)) {
                battler.gainHpReward(value);
            }
            else {
                battler.gainHpReward(Math.floor(value * battler.mhp));
            }
            $gameTemp._isReceivedBonus = true;
        }
        else if (atBonusType === "MP回复") {
            if (Number.isInteger(value)) {
                battler.gainMpReward(value);
            }
            else {
                battler.gainMpReward(Math.floor(value * battler.mmp));
            }
            $gameTemp._isReceivedBonus = true;
        }
        else if (atBonusType === "TP回复") {
            if (Number.isInteger(value)) {
                battler.gainTpReward(value);
            }
            else {
                battler.gainTpReward(Math.floor(value * battler.maxTp()));
            }
            $gameTemp._isReceivedBonus = true;
        }
    }
}


//=====================================
//画行动条
//=====================================

//=============================================================================
// ■■■ CTB Gauge ■■■
//=============================================================================

function CTB_Gauge() {
    this.initialize.apply(this, arguments);
};

CTB_Gauge.prototype = Object.create(Sprite.prototype);
CTB_Gauge.prototype.constructor = CTB_Gauge;

//==============================
// ♦ Initialize
//==============================
CTB_Gauge.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.x = Alderpaw.ctbPosX;
    this.y = Alderpaw.ctbPosY;
	this._iconImg = ImageManager.loadSystem("IconSet");
    this._layout = new Sprite(new Bitmap(Math.min(1200, (Alderpaw.ctbMaxShowNum + 2.7) * 48), 160));
    this._layout.x = 32;
    this._layout.y = 16;
    this.addChild(this._layout);
    //创建指示具体delay数值的文本
    this._delay_anchor_num = new Sprite(new Bitmap(160, 32));
    this._delay_anchor_num.bitmap.fontSize = 18;
	// if (FontManager._states["my-battle-hud-font"] !== "loaded") {
	// 	FontManager.load("my-battle-hud-font", "ZCOOL_KuaiLe2016.otf");
	// }
    // this._delay_anchor_num.bitmap.fontFace = "my-battle-hud-font";
    this._delay_anchor_num.visible = false;
    this._delay_anchor_num.x = 0;
    this._delay_anchor_num.y = -4;
	this.addChild(this._delay_anchor_num);
    //创建AT奖励
    this._currentBonusList = Array(Alderpaw.ctbMaxShowNum + 1).fill(-1);
    this._globalBonusDict = JSON.parse(Alderpaw.ctbGaugeBonusList).map(str => JSON.parse(str));
    //透明度和是否刷新
	this.opacity = 255;
    this._needRefresh = false;
};

CTB_Gauge.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._battlers != null && this._battlerFaces != null) {
        for (let i = 0; i < this._battlers.length; i++) {
            if (this._battlers[i] != null && this._battlerFaces[i] != null) {
                if (this._battlers[i]._selected) {
                    if (this._battlers[i].isEnemy()) {
                        this._battlerFaces[i].setBlendColor([255, 0, 0, 144]);
                    }
                    else {
                        this._battlerFaces[i].setBlendColor([0, 0, 255, 144]);
                    }
                }
                else {
                    this._battlerFaces[i].setBlendColor([0, 0, 0, 0]);
                }
            }
        }
    }
    this.updateAnchor();
    if ($scene._helpWindow.visible && Alderpaw.ctbGaugeAutoReposition) {
        this.y = Alderpaw.ctbPosY + 72;
    }
    else {
        this.y = Alderpaw.ctbPosY;
    }
}

//从0-N中取M个数
function ctbRandomNumbers(M, N) {
    const numbers = Array.from({ length: N + 1 }, (_, index) => index); // 创建包含0到N的数组
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 随机选择一个索引
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]]; // 交换元素位置
    }
    return numbers.slice(0, M); // 返回前M个元素
}

CTB_Gauge.prototype.initBonus = function() {
    const weights = this._globalBonusDict.map(({ weight }) => parseInt(weight));
    const pushedIndexs = ctbRandomNumbers(Alderpaw.ctbStartBonusNum, Alderpaw.ctbMaxShowNum);
    for (let i = 0; i < Alderpaw.ctbStartBonusNum; i++) {
        const bonusIndex = this.weightedRandom(weights);
        this._currentBonusList[pushedIndexs[i]] = bonusIndex;
    }
}

if (Imported.VisuMZ_2_BattleGridSystem) {
    //判断battler是否在当前技能所选的网格范围内
    function checkGridSelection(gridSelectWindowIndex, battlerRank, battlerFlank, aoeType, targetType, isEnemy) {
        if (targetType == null) {
            return false;
        }
        const gridSize = 3;
        switch (targetType) {
            //选择敌人时
            case "Enemy Grid Node":
                if (!isEnemy || gridSelectWindowIndex % (2 * gridSize) >= gridSize) {
                    return false;
                }
                const targetNodeFlank = Math.floor(gridSelectWindowIndex / (2 * gridSize)) + 1;
                const targetNodeRank = gridSize - (gridSelectWindowIndex % gridSize);
                //一列
                if (aoeType.includes("敌方一列")) {
                    return battlerRank === targetNodeRank;
                }
                //一行
                if (aoeType.includes("敌方一行")) {
                    return battlerFlank === targetNodeFlank;
                }
                /** 
                 * 中圆
                 * ●●●
                 * ●×●
                 * ●●●
                 */
                if (aoeType.includes("敌方中圆") || aoeType.includes("敌方方形")) {
                    return (battlerRank >= targetNodeRank - 1 && battlerRank <= targetNodeRank + 1) && (battlerFlank >= targetNodeFlank - 1 && battlerFlank <= targetNodeFlank + 1);
                }
                /** 
                 * 小圆范围
                 *  ●
                 * ●×●
                 *  ●
                 */
                else if (aoeType.includes("敌方小圆")) {
                    return (battlerFlank === targetNodeFlank - 1 && battlerRank === targetNodeRank) || (battlerFlank === targetNodeFlank + 1 && battlerRank === targetNodeRank)
                    || (battlerFlank === targetNodeFlank && battlerRank === targetNodeRank - 1) || (battlerFlank === targetNodeFlank && battlerRank === targetNodeRank + 1)
                    || (battlerFlank === targetNodeFlank && battlerRank === targetNodeRank);
                }
                /** 
                 * 大圆范围
                 *   ●
                 *  ●●●
                 * ●●×●●
                 *  ●●●
                 *   ●
                 */
                else if (aoeType.includes("敌方大圆")) {
                    return (battlerRank === targetNodeRank) || (battlerRank >= targetNodeRank - 1 && battlerRank <= targetNodeRank + 1 && battlerFlank >= targetNodeFlank - 1 && battlerFlank <= targetNodeFlank + 1)
                    || ((battlerRank === targetNodeRank - 2 || battlerRank === targetNodeRank + 2) && battlerFlank === targetNodeFlank);
                }
                break;
            //选择我方时
            case "Ally Grid Node":
                if (isEnemy || gridSelectWindowIndex % (2 * gridSize) < gridSize) {
                    return false;
                }
                const targetAllyNodeFlank = Math.floor(gridSelectWindowIndex / (2 * gridSize)) + 1;
                const targetAllyNodeRank = (gridSelectWindowIndex % gridSize) + 1;
                /** 
                 * 中圆范围
                 * ●●●
                 * ●×●
                 * ●●●
                 */
                if (aoeType.includes("我方中圆") || aoeType.includes("我方方形")) {
                    return (battlerRank >= targetAllyNodeRank - 1 && battlerRank <= targetAllyNodeRank + 1) && (battlerFlank >= targetAllyNodeFlank - 1 && battlerFlank <= targetAllyNodeFlank + 1);
                }
                /** 
                 * 小圆范围
                 *  ●
                 * ●×●
                 *  ●
                 */
                else if (aoeType.includes("我方小圆")) {
                    return (battlerFlank === targetAllyNodeFlank - 1 && battlerRank === targetAllyNodeRank) || (battlerFlank === targetAllyNodeFlank + 1 && battlerRank === targetAllyNodeRank)
                        || (battlerFlank === targetAllyNodeFlank && battlerRank === targetAllyNodeRank - 1) || (battlerFlank === targetAllyNodeFlank && battlerRank === targetAllyNodeRank + 1)
                        || (battlerFlank === targetAllyNodeFlank && battlerRank === targetAllyNodeRank);
                }
                /** 
                 * 大圆范围
                 *   ●
                 *  ●●●
                 * ●●×●●
                 *  ●●●
                 *   ●
                 */
                else if (aoeType.includes("我方大圆")) {
                    return (battlerRank === targetAllyNodeRank) || (battlerRank >= targetAllyNodeRank - 1 && battlerRank <= targetAllyNodeRank + 1 && battlerFlank >= targetAllyNodeFlank - 1 
                        && battlerFlank <= targetAllyNodeFlank + 1)
                        || ((battlerRank === targetAllyNodeRank - 2 || battlerRank === targetAllyNodeRank + 2) && battlerFlank === targetAllyNodeFlank);
                }
                break;
            default:
                break;
        }
        return false;
    }

    CTB_Gauge.prototype.updateGridSelection = function() {
        //选择网格的情形
        this._gridSelectedBattlers = [];
        let currentActor = BattleManager._currentActor;
        if (currentActor && currentActor._actions.length > 0 && $scene.isAnyGridWindowActive()) {
            let currentUsedItem = currentActor._actions[0]._item;
            if (currentUsedItem._itemId > 0 && currentUsedItem._dataClass === "skill") {
                let currentSkill = $dataSkills[currentUsedItem._itemId];
                // 使用正则表达式匹配标签之间的内容
                let aoeType = currentSkill.meta["技能范围"];
                let targetType = currentSkill.meta["Target"] == null ? null : currentSkill.meta["Target"].trim();
                if (aoeType != null && targetType != null) {
                    if (targetType.includes("Grid Flank")) {
                        for (let battler of this._battlers) {
                            battler._selected = checkGridSelection($scene._gridSelectFlankWindow.index(), battler._gridLocation["rank"], battler._gridLocation["flank"], 
                            aoeType, targetType, battler.isEnemy());
                        }
                    }
                    else if (targetType.includes("Grid Rank")) {
                        for (let battler of this._battlers) {
                            battler._selected = checkGridSelection($scene._gridSelectRankWindow.index(), battler._gridLocation["rank"], battler._gridLocation["flank"], 
                            aoeType, targetType, battler.isEnemy());
                        }
                    }
                    else if (targetType.includes("Grid Node")) {
                        for (let battler of this._battlers) {
                            battler._selected = checkGridSelection($scene._gridSelectNodeWindow.index(), battler._gridLocation["rank"], battler._gridLocation["flank"], 
                            aoeType, targetType, battler.isEnemy());
                        }
                    }
                }
            }
        }
    }

    const _alderpaw_sceneBattle_onGridSelectNodeCancel = Scene_Battle.prototype.onGridSelectNodeCancel;
    Scene_Battle.prototype.onGridSelectNodeCancel = function() {
        _alderpaw_sceneBattle_onGridSelectNodeCancel.call(this);
        if (this._ctbGauge && this._ctbGauge._battlers) {
            for (let battler of this._ctbGauge._battlers) {
                battler._selected = false;
            }
            //$scene._ctbGauge.refreshBattlers(null, false, BattleManager._currentActor);
        }
        //S爆发
        if (BattleManager._sBreakActors.length > 0) {
            this._specialSkillWindow.show();
            this._specialSkillWindow.activate();
            this._specialSkillWindow.select(0);
        }
        //关闭敌人信息窗口
        if ($scene._enemySimpleInfoWindow != null) {
            $scene._enemySimpleInfoWindow.hide();
        }
        if ($scene._enemyDetailedInfoWindow != null) {
            $scene._enemyDetailedInfoWindow.hide();
        }
        for (const actor of $gameParty.battleMembers()) {
            actor._anchorSelected = false;
        }
    }
    
    const _alderpaw_sceneBattle_onGridSelectNodeOk = Scene_Battle.prototype.onGridSelectNodeOk;
    Scene_Battle.prototype.onGridSelectNodeOk = function() {
        _alderpaw_sceneBattle_onGridSelectNodeOk.call(this);
        for (const actor of $gameParty.battleMembers()) {
            actor._anchorSelected = false;
        }
    }
}

CTB_Gauge.prototype.minDelay = function(allBattlers) {
    let minDelayValue = 99999;
    for (const battler of allBattlers) {
        if (battler.isAlive() && battler.isAppeared())
            minDelayValue = Math.min(battler._actionTime, minDelayValue);
    }
    return minDelayValue;
}

CTB_Gauge.prototype.weightedRandom = function(weights) {
    // 计算权重的总和
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const randomNumber = Math.randomInt(totalWeight);
    // 根据随机数选择元素
    let cumulativeWeight = 0;
    for (let i = 0; i < weights.length; i++) {
        cumulativeWeight += weights[i];
        if (randomNumber < cumulativeWeight) {
            return i; // 返回被选中的元素索引
        }
    }
}

/**
 * 
 * @param {*} tempBattler 临时创建的插队对象，用于显示当前角色在行动完后将要插到的位置
 * @param {*} isAction 本次更新ctb条时，是否执行行动。如果执行行动的话就要全局减所有角色的AT，否则只是单纯显示
 * @param {*} currentBattler 当前正在行动的角色，插队时相比同AT其他角色优先靠前
 * @param {*} showDelayNum 是否显示延迟的具体数字。在指令输入完毕、开始行动的阶段隐藏数字，避免干扰技能演出画面
 * @param {*} item 当前选择了的技能或物品
 * @param {*} targets 当前选中的目标
 * @param {*} isSBreak 是否为S爆发技插队，如果是的话AT奖励就不用额外轮转一次了
 * @returns 
 */
CTB_Gauge.prototype.refreshBattlers = function(tempBattler=null, isAction=false, currentBattler=null, showDelayNum=true, item=null, targets=[], isSBreak=false) {
    //console.log("=====================")
    //console.log(currentActor)
    let effectedBattlers = [];
    this._battlers = [];
    this._battlerFaces = [];
    this._battlerMagicHints = [];
    this._currentPosAnchors = [];
    this._predictPosAnchors = [];
    this._bonusIcons = [];
    //如果需要显示行动后的位置提示，则将tempBattler加入列表
    if (tempBattler != null) {
        this._battlers.push(tempBattler);
    }
	for (let i = 0; i < $gameParty.battleMembers().length; i++) {
        let battler = $gameParty.battleMembers()[i];
        if (battler.isAlive() && battler.isAppeared()) {
            this._battlers.push(battler);
        }
	};		
	for (let i = 0; i < $gameTroop.members().length; i++) {
        let battler = $gameTroop.members()[i];
        if (battler.isAlive() && battler.isAppeared()) {
            this._battlers.push(battler);
        }
	};
    //如果需要显示延迟/加速技能的位置提示，则先将受影响的battler复制并加入队列。若自身也受影响，则只显示tempBattler
    let needHighlightTarget = false;
    if (item != null && item.meta != null && (item.meta["AT Delay By Value"] || item.meta["AT Delay By ST"] || item.meta["AT Advance By Value"] || item.meta["AT Advance By ST"] || 
    (BattleManager._currentActor != null && BattleManager._currentActor.hasDelayEquipment() && Alderpaw.ctbDelaySkillTypesByEquip.includes(item.stypeId)))) {
        needHighlightTarget = true;
        for (const battler of this._battlers) {
            if ((battler._selected || targets.includes(battler)) && ((battler.isActor() && battler.actorId() !== tempBattler.actorId()) || (battler.isEnemy() && battler.index() !== tempBattler.index()))) {
                let effectedBattler = JsonEx.makeDeepCopy(battler);
                if (item.meta["AT Delay By Value"]) {
                    effectedBattler._actionTime += Math.floor(parseInt(item.meta["AT Delay By Value"]));
                }
                else if (item.meta["AT Delay By ST"]) {
                    effectedBattler._actionTime += Math.floor(100 * parseInt(item.meta["AT Delay By ST"]) / effectedBattler.agi);
                }
                else if (item.meta["AT Advance By Value"]) {
                    effectedBattler._actionTime -= Math.floor(parseInt(item.meta["AT Advance By Value"]));
                    effectedBattler._actionTime = Math.max(0, effectedBattler._actionTime);
                }
                else if (item.meta["AT Advance By ST"]) {
                    effectedBattler._actionTime -= Math.floor(100 * parseInt(item.meta["AT Advance By ST"]) / effectedBattler.agi);
                    effectedBattler._actionTime = Math.max(0, effectedBattler._actionTime);
                }
                //考虑装备
                if (BattleManager._currentActor != null && item.stypeId < 2) {
                    for (const equipment of BattleManager._currentActor.equips()) {
                        if (equipment != null && equipment.meta && equipment.meta["AT Delay By Value"]) {
                            effectedBattler._actionTime += Math.floor(parseInt(equipment.meta["AT Delay By Value"]));
                        }
                        if (equipment != null && equipment.meta && equipment.meta["AT Delay By ST"]) {
                            effectedBattler._actionTime += Math.floor(100 * parseInt(equipment.meta["AT Delay By ST"]) / effectedBattler.agi);
                        }
                    }
                }
                effectedBattlers.push(effectedBattler);
            }
            else if ((battler._selected || targets.includes(battler)) && ((battler.isActor() && battler.actorId() === tempBattler.actorId()) || (battler.isEnemy() && battler.index() === tempBattler.index()))) {
                if (item.meta["AT Delay By Value"]) {
                    battler._actionTime += Math.floor(parseInt(item.meta["AT Delay By Value"]));
                }
                else if (item.meta["AT Delay By ST"]) {
                    battler._actionTime += Math.floor(100 * parseInt(item.meta["AT Delay By ST"]) / battler.agi);
                }
                else if (item.meta["AT Advance By Value"]) {
                    battler._actionTime -= Math.floor(parseInt(item.meta["AT Advance By Value"]));
                    battler._actionTime = Math.max(0, battler._actionTime);
                }
                else if (item.meta["AT Advance By ST"]) {
                    battler._actionTime -= Math.floor(100 * parseInt(item.meta["AT Advance By ST"]) / battler.agi);
                    battler._actionTime = Math.max(0, battler._actionTime);
                }
                //考虑装备
                if (BattleManager._currentActor != null && item.stypeId < 2) {
                    for (const equipment of BattleManager._currentActor.equips()) {
                        if (equipment != null && equipment.meta && equipment.meta["AT Delay By Value"]) {
                            battler._actionTime += Math.floor(parseInt(equipment.meta["AT Delay By Value"]));
                        }
                        if (equipment != null && equipment.meta && equipment.meta["AT Delay By ST"]) {
                            battler._actionTime += Math.floor(100 * parseInt(equipment.meta["AT Delay By ST"]) / battler.agi);
                        }
                    }
                }
            }
        }
        for (const battler of effectedBattlers) {
            this._battlers.push(battler);
        }
    }
    //视情况让时间流动
    if (isAction) {
        let delayReduced = this.minDelay(this._battlers);
        //console.log("delay reduce: ", delayReduced);
        for (const battler of this._battlers) {
            battler._actionTime -= delayReduced;
            battler._actionTime = Math.max(0, battler._actionTime);
        }
    }
    //根据行动延迟排序
    this._battlers.sort((a, b) => {
        // 首先比较_actionTime
        if (a._actionTime < b._actionTime) {
            return -1;
        } else if (a._actionTime > b._actionTime) {
            return 1;
        } else {
            // 如果_actionTime相同，再根据currentBattler来决定排序顺序
            if (a === currentBattler) {
                return -1; // currentBattler排在前面
            } else if (b === currentBattler) {
                return 1; // currentBattler排在后面
            } else {
                if (a._tpbState === "casting" || a._tpbState === "acting") {
                    return -1; // a正在施法或行动，排在前面
                } else if (b._tpbState === "casting" || b._tpbState === "acting") {
                    return 1; // b正在施法或行动，排在后面
                }
                // 如果都不是currentBattler，则根据BattleManager._sBreakActors数组来决定排序顺序
                const aInBreakActors = BattleManager._sBreakActors.includes(a);
                const bInBreakActors = BattleManager._sBreakActors.includes(b);
                if (aInBreakActors && !bInBreakActors) {
                    return -1; // a在_sBreakActors里，排在前面
                } else if (!aInBreakActors && bInBreakActors) {
                    return 1; // b在_sBreakActors里，排在后面
                } else if (aInBreakActors && bInBreakActors) {
                    // 如果a和b都在_sBreakActors数组里，则比较它们在数组中的索引位置
                    const aIndex = BattleManager._sBreakActors.indexOf(a);
                    const bIndex = BattleManager._sBreakActors.indexOf(b);
                    return aIndex - bIndex; // 索引位置靠前的排在前面
                } else {
                    return 0; // 如果都不在_sBreakActors数组里，则维持原有顺序
                }
            }
        }
    });
    if (this._battlers.length === 0) {
        return;
    }

    //排完序后创建sprite
    for (let i = 0; i < this._battlers.length; i++) {
        if (this._battlers[i].isEnemy()) {
            this._battlerFaces.push(new Sprite(ImageManager.loadSvEnemy(this._battlers[i].battlerName())));
        }
        else {
            this._battlerFaces.push(new Sprite(ImageManager.loadFace(this._battlers[i].faceName())));
        }
        this._battlerMagicHints.push(new Sprite(new Bitmap(60, 84)));
        this._currentPosAnchors.push(new Sprite(ImageManager.loadSystem(Alderpaw.ctbCurrentAnchorImg)))
        this._predictPosAnchors.push(new Sprite(ImageManager.loadSystem(Alderpaw.ctbPredictAnchorImg)))
        this._battlerMagicHints[i].bitmap.fontSize = 20;
        if (BattleManager._sBreakActors.includes(this._battlers[i])) {
            this._battlerMagicHints[i].bitmap.textColor = "#FF0060";
        }
        else {
            this._battlerMagicHints[i].bitmap.textColor = "#00FF60";
        }
        this._currentPosAnchors[i].visible = false;
        this._predictPosAnchors[i].visible = false;
        this._currentPosAnchors[i].y = 16;
        this._predictPosAnchors[i].y = 16;
        //console.log(this._battlers[i].name(), this._battlers[i]._actionTime, this._battlers[i].canInput(), this._battlers[i]._tpbState);
    }
    //开始画ctb条
    //首先画背景色和矩形框
    this._layout.children = [];
    this._layout.bitmap.clear();
    this._layout.bitmap.fillRect(0, 36, Math.min(1200, (Alderpaw.ctbMaxShowNum + 2.7) * 48), 68, ColorManager.textColor(19));
    if (this._battlers[0].isEnemy()) {
        this._layout.bitmap.fillRect(0, 40, 60, 60, ColorManager.textColor(14));
        this._layout.bitmap.fillRect(4, 44, 52, 52, ColorManager.textColor(18));
        this._layout.bitmap.fillRect(6, 46, 48, 48, ColorManager.textColor(25));
    }
    else {
        this._layout.bitmap.fillRect(0, 40, 60, 60, ColorManager.textColor(14));
        this._layout.bitmap.fillRect(4, 44, 52, 52, ColorManager.textColor(22));
        this._layout.bitmap.fillRect(6, 46, 48, 48, ColorManager.textColor(16));
    }
    //画当前行动的角色
    if (this._battlers[0].isActor()) {
        this._battlerFaces[0].setFrame(24 + (this._battlers[0]._faceIndex % 4) * 144, 24 + Math.floor(this._battlers[0]._faceIndex / 4) * 144, 96, 96);
    }
    else {
        this._battlerFaces[0].setFrame(24, 0, 96, 96);
    }
    this._battlerFaces[0].scale.x = 0.5;
    this._battlerFaces[0].scale.y = 0.5;
    this._battlerFaces[0].x = 6;
    this._battlerFaces[0].y = 46;
    this._battlerMagicHints[0].x = 10;
    this._battlerMagicHints[0].y = 26;
    this._layout.addChild(this._battlerFaces[0]);
    this._layout.addChild(this._battlerMagicHints[0]);
    this._layout.addChild(this._currentPosAnchors[0]);
    this._layout.addChild(this._predictPosAnchors[0]);
    if (this._battlers[0]._tpbState === "casting") {
        this._battlerMagicHints[0].bitmap.drawText("M", 18, 42, 32, 32, "center");
    }
    else if (BattleManager._sBreakActors.includes(this._battlers[0])) {
        this._battlerMagicHints[0].bitmap.drawText("S", 18, 42, 32, 32, "center");
    }
    else {
        this._battlerMagicHints[0].bitmap.clear();
    }
    //画行动条后面的角色
    let isTempBattleShown = false;
    for (let i = 1; i < Math.min(this._battlers.length, Alderpaw.ctbMaxShowNum + 1); i++) {
        this._layout.addChild(this._battlerFaces[i]);
        this._layout.addChild(this._battlerMagicHints[i]);
        this._layout.addChild(this._currentPosAnchors[i]);
        this._layout.addChild(this._predictPosAnchors[i]);
        if (this._battlers[i]._tpbState === "casting") {
            this._battlerMagicHints[i].bitmap.drawText("M", 18, 42, 32, 32, "center");
        }
        else if (BattleManager._sBreakActors.includes(this._battlers[i])) {
            this._battlerMagicHints[i].bitmap.drawText("S", 18, 42, 32, 32, "center");
        }
        else {
            this._battlerMagicHints[i].bitmap.clear();
        }
        if (this._battlers[i].isEnemy()) {
            this._layout.bitmap.fillRect(76 + 52 * (i - 1), 44, 52, 52, ColorManager.textColor(18));
            this._layout.bitmap.fillRect(78 + 52 * (i - 1), 46, 48, 48, ColorManager.textColor(25));
        }
        else {
            this._layout.bitmap.fillRect(76 + 52 * (i - 1), 44, 52, 52, ColorManager.textColor(22));
            this._layout.bitmap.fillRect(78 + 52 * (i - 1), 46, 48, 48, ColorManager.textColor(16));
        }
        if (this._battlers[i].isActor()) {
            this._battlerFaces[i].setFrame(24 + (this._battlers[i]._faceIndex % 4) * 144, 24 + Math.floor(this._battlers[i]._faceIndex / 4) * 144, 96, 96);
        }
        else {
            this._battlerFaces[i].setFrame(24, 0, 96, 96);
        }
        this._battlerFaces[i].scale.x = 0.5;
        this._battlerFaces[i].scale.y = 0.5;
        this._battlerFaces[i].x = 78 + 52 * (i - 1);
        this._battlerFaces[i].y = 46;
        this._battlerMagicHints[i].x = 82 + 52 * (i - 1);
        this._battlerMagicHints[i].y = 26;
        if (tempBattler != null && ((this._battlers[i].isActor() && tempBattler.isActor() && this._battlers[i].actorId() === tempBattler.actorId()) ||
                                (this._battlers[i].isEnemy() && tempBattler.isEnemy() && this._battlers[i].index() === tempBattler.index()))) {
            const delayDelta = tempBattler._actionTime;
            this._currentPosAnchors[i].visible = true;
            this._predictPosAnchors[i].visible = true;
            this._currentPosAnchors[i].x = this._battlerFaces[0].x + 14;
            this._predictPosAnchors[i].x = this._battlerFaces[i].x + 14;
            //this._delay_anchor.visible = true;
            this._delay_anchor_num.visible = showDelayNum;
            //this._delay_anchor.x = this._battlerFaces[i].x + 46;
            this._delay_anchor_num.x = this._battlerFaces[i].x;
            this._delay_anchor_num.bitmap.clear();
            this._delay_anchor_num.bitmap.drawText("DELAY " + Math.round(delayDelta).toString(), -20, -8, 160, 32, "center");
            this._battlerFaces[i].opacity = 160;
            continue;
        }
        //如果当前的技能/物品带有延迟/加速效果，且遍历到的battler是被选中的目标，则显示被影响后的位置
        if (effectedBattlers.includes(this._battlers[i])) {
            this._predictPosAnchors[i].visible = true;
            this._predictPosAnchors[i].x = this._battlerFaces[i].x + 14;
            this._battlerFaces[i].opacity = 160;
            continue;
        }
        if (needHighlightTarget && (targets.includes(this._battlers[i]) || this._battlers[i]._selected)) {
            this._currentPosAnchors[i].visible = true;
            this._currentPosAnchors[i].x = this._battlerFaces[i].x + 14;
            continue;
        }
    }
    //如果tempBattler的位置超过了显示上限，那么在最后显示anchor
    if (!isTempBattleShown && tempBattler != null) {
        for (let i = Math.min(this._battlers.length, Alderpaw.ctbMaxShowNum + 1); i < this._battlers.length; i++) {
            if (tempBattler != null && ((this._battlers[i].isActor() && tempBattler.isActor() && this._battlers[i].actorId() === tempBattler.actorId()) ||
                                    (this._battlers[i].isEnemy() && tempBattler.isEnemy() && this._battlers[i].index() === tempBattler.index()))) {
                const delayDelta = tempBattler._actionTime;
                this._currentPosAnchors[i].visible = true;
                this._predictPosAnchors[i].visible = true;
                this._currentPosAnchors[i].x = this._battlerFaces[0].x + 14;
                this._predictPosAnchors[i].x = this._battlerFaces[Alderpaw.ctbMaxShowNum].x + 48;
                this._delay_anchor_num.visible = showDelayNum;
                this._delay_anchor_num.x = this._battlerFaces[Alderpaw.ctbMaxShowNum].x + 32;
                this._delay_anchor_num.bitmap.clear();
                this._delay_anchor_num.bitmap.drawText("DELAY " + delayDelta.toString(), -20, -8, 160, 32, "center");
                this._battlerFaces[i].opacity = 160;
                isTempBattleShown = true;
                this._layout.addChild(this._currentPosAnchors[i]);
                this._layout.addChild(this._predictPosAnchors[i]);
            }
        }
    }
    //画AT奖励
    //如果当前是action，则让AT奖励也发生流动
    if (isAction && !isSBreak) {
        this._currentBonusList.shift();
        if (Math.random() < Alderpaw.ctbGaugeBonusAppearPossibility) {
            const weights = this._globalBonusDict.map(({ weight }) => parseInt(weight));
            const selectedIndex = this.weightedRandom(weights);
            this._currentBonusList.push(selectedIndex);
        }
        else {
            this._currentBonusList.push(-1);
        }
    }
    for (let i = 0; i < Alderpaw.ctbMaxShowNum + 1; i++) {
        if (this._currentBonusList[i] === -1) {
            this._bonusIcons.push(new Sprite());
            this._bonusIcons[i].visible = false;
        }
        else {
            this._bonusIcons.push(new Sprite(this._iconImg));
            if (i === 0) {
                this._bonusIcons[i].x = 12;
            }
            else {
                this._bonusIcons[i].x = 86 + 52 * (i - 1);
            }
            this._bonusIcons[i].y = 98;
            let iconId = this._globalBonusDict[this._currentBonusList[i]].iconId;
            let sx = iconId % 16 * 32;
            let sy = Math.floor(iconId / 16) * 32;
            this._bonusIcons[i].setFrame(sx, sy, 32, 32);
            this._bonusIcons[i].visible = true;
        }
        this._layout.addChild(this._bonusIcons[i]);
    }

    //最后，更新这些battler的ctb状态
    if (isAction) {
        const battler = this._battlers[0];
        $gameTemp._isReceivedBonus = false;
        if (battler._tpbState === "charging") {
            if (battler._actionTime === 0) {
                battler.onTpbCharged();
            }
        }
        if (battler._tpbState === "casting") {
            if (battler._actionTime === 0) {
                gainHpMpTpReward(battler);
                battler._tpbState = "ready";
            }
        }
    }
    //console.log("=====================")
};

//结束时关闭ctb条
const _alderpaw_ctb_battleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    _alderpaw_ctb_battleManager_endBattle.call(this, result);
    if ($scene._ctbGauge) {
        $scene._ctbGauge.visible = false;
    }
};

//判断当前选中的物品
const _alderpaw_ctb_windowBattleItem_select = Window_BattleItem.prototype.select;
Window_BattleItem.prototype.select = function(index) {
	_alderpaw_ctb_windowBattleItem_select.call(this, index);
    let item = this.item();
	if (this.item() != null && this.item().meta != null) {
		let current_battle_scene = $scene;
		if (current_battle_scene._ctbGauge == null) {
			return;
		}
        let currentActor = BattleManager._currentActor;
        if (currentActor == null) {
            return;
        }
        let tempActor = JsonEx.makeDeepCopy(BattleManager._currentActor);
		//对于有驱动时间的魔法，显示驱动后的位置，否则显示行动完成后的位置
        //如果技能菜单不可见，则不显示，为了防止驱动魔法时显示重复了
        if (!this.active && !this.visible) {
			$scene._ctbGauge._delay_anchor_num.visible = false;
            return;
        }
        let isInstantMagic = false;
        if ($scene._ctbGauge && $scene._ctbGauge._globalBonusDict && $scene._ctbGauge._currentBonusList && $scene._ctbGauge._currentBonusList[0] >= 0 &&
            $scene._ctbGauge._globalBonusDict[$scene._ctbGauge._currentBonusList[0]].effectType === "本次魔法可瞬发") {
                isInstantMagic = true;
        }
		if (item.meta["castST"] != null && !isInstantMagic) {
            if ((this.active || this.visible)) {
                let castDelay = (100 * parseInt(item.meta["castST"]) * BattleManager._currentActor.castST_rate / BattleManager._currentActor.agi);
                tempActor._actionTime += castDelay;
                tempActor._actionTime = Math.floor(tempActor._actionTime)
                tempActor._tpbState = "casting";
                $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, true, item);
            }
		}
		else {
            if ((this.active || this.visible)) {
                let actionDelay = 100 * 100 / currentActor.agi;
                if (item.meta["delayST"] != null) {
                    actionDelay = 100 * parseInt(item.meta["delayST"]) / BattleManager._currentActor.agi;
                    if (item.stypeId == 1) {    //战技
                        actionDelay *= (BattleManager._currentActor.craft_delayST_rate);
                    }
                }
                tempActor._actionTime += actionDelay;
                tempActor._actionTime = Math.floor(tempActor._actionTime);
                $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, true, item);
            }
		}
	}
};

//判断当前选中的技能，并给予硬直或驱动后的AT位置提示
const _alderpaw_ctb_windowBattleSkill_select = Window_BattleSkill.prototype.select;
Window_BattleSkill.prototype.select = function(index) {
	_alderpaw_ctb_windowBattleSkill_select.call(this, index);
    let item = this.item();
	if (this.item() != null && this.item().meta != null) {
		let current_battle_scene = $scene;
		if (current_battle_scene._ctbGauge == null) {
			return;
		}
        let currentActor = BattleManager._currentActor;
        if (currentActor == null) {
            return;
        }
        let tempActor = JsonEx.makeDeepCopy(this._actor);
		//对于有驱动时间的魔法，显示驱动后的位置，否则显示行动完成后的位置
        //如果技能菜单不可见，则不显示，为了防止驱动魔法时显示重复了
        if (!this.active && !this.visible) {
			$scene._ctbGauge._delay_anchor_num.visible = false;
            return;
        }
        let isInstantMagic = false;
        if ($scene._ctbGauge && $scene._ctbGauge._globalBonusDict && $scene._ctbGauge._currentBonusList && $scene._ctbGauge._currentBonusList[0] >= 0 &&
            $scene._ctbGauge._globalBonusDict[$scene._ctbGauge._currentBonusList[0]].effectType === "本次魔法可瞬发") {
                isInstantMagic = true;
        }
		if (item.meta["castST"] != null && !isInstantMagic) {
            if ((this.active || this.visible)) {
                let castDelay = (100 * parseInt(item.meta["castST"]) * BattleManager._currentActor.castST_rate / BattleManager._currentActor.agi);
                tempActor._actionTime += castDelay;
                tempActor._actionTime = Math.floor(tempActor._actionTime);
                tempActor._tpbState = "casting";
                $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, true, item);
            }
		}
		else {
            if ((this.active || this.visible)) {
                let actionDelay = 100 * 100 / currentActor.agi;
                if (item.meta["delayST"] != null) {
                    actionDelay = 100 * parseInt(item.meta["delayST"]) / BattleManager._currentActor.agi;
                    if (item.stypeId == 1) {    //战技
                        actionDelay *= (BattleManager._currentActor.craft_delayST_rate);
                    }
                }
                tempActor._actionTime += actionDelay;
                tempActor._actionTime = Math.floor(tempActor._actionTime);
                $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, true, item);
            }
		}
	}
};

//若光标移动到攻击或防御指令，直接显示AT延迟位置
const _alderpaw_ctb_windowActorCommand_select = Window_ActorCommand.prototype.select;
Window_ActorCommand.prototype.select = function(index) {
	_alderpaw_ctb_windowActorCommand_select.call(this, index);
    if (index < 0 || this._actor == null) {
        return;
    }
    let tempActor = JsonEx.makeDeepCopy(this._actor);
    if (this._list[index].symbol === "attack") {
        if (this._actor._tpbState === "charged") {
            let actionDelay = (100 * 100 * this._actor.craft_delayST_rate / this._actor.agi);
            let attackSkill = $dataSkills[this._actor.attackSkillId()];
            if (attackSkill && attackSkill.meta && attackSkill.meta["delayST"]) {
                actionDelay = (100 * attackSkill.meta["delayST"] * this._actor.craft_delayST_rate / this._actor.agi);
            }
            tempActor._actionTime += actionDelay;
            tempActor._actionTime = Math.floor(tempActor._actionTime);
            $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor);
        }
    }
    else if (this._list[index].symbol === "guard") {
        if (this._actor._tpbState === "charged") {
            let actionDelay = (70 * 100 / this._actor.agi);
            let guardSkill = $dataSkills[this._actor.guardSkillId()];
            if (guardSkill && guardSkill.meta && guardSkill.meta["delayST"]) {
                actionDelay = (100 * guardSkill.meta["delayST"] / this._actor.agi);
            }
            tempActor._actionTime += actionDelay;
            tempActor._actionTime = Math.floor(tempActor._actionTime);
            $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor);
        }
    }
    else {
        if ($scene._ctbGauge && this._actor._tpbState === "charged") {
			for (let i = 0; i < $scene._ctbGauge._currentPosAnchors.length; i++) {
                $scene._ctbGauge._currentPosAnchors[i].visible = false;
                $scene._ctbGauge._predictPosAnchors[i].visible = false;
            }
			$scene._ctbGauge._delay_anchor_num.visible = false;
            $scene._ctbGauge.refreshBattlers(null, false, this._actor);
        }
    }
};

if (Imported.VisuMZ_2_BattleGridSystem) {
    const _alderpaw_ctb_sceneBattleOnSkillCancel= Scene_Battle.prototype.onSkillCancel;
    Scene_Battle.prototype.onSkillCancel = function() {
        _alderpaw_ctb_sceneBattleOnSkillCancel.call(this);
        if (this._ctbGauge && !this.isAnyGridWindowActive() && !this._actorWindow.active && !this._enemyWindow.active) {
            this._ctbGauge.refreshBattlers(null, false, this._actor);
            for (let i = 0; i < $scene._ctbGauge._currentPosAnchors.length; i++) {
                $scene._ctbGauge._currentPosAnchors[i].visible = false;
                $scene._ctbGauge._predictPosAnchors[i].visible = false;
            }
            $scene._ctbGauge._delay_anchor_num.visible = false;
        }
    }
}

//选择敌人为目标时
const _alderpaw_ctb_windowBattleEnemy_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    const lastIndex = this.index();
    if (index > 0 && index === lastIndex) {
        return;
    }
    _alderpaw_ctb_windowBattleEnemy_select.call(this, index);
    let item = null;
    if (BattleManager._currentActor && BattleManager._currentActor._actions.length > 0) {
        item = BattleManager._currentActor._actions[0].item();
    }
    let currentActor = BattleManager._currentActor;
	if (item != null && item.meta != null) {
		let current_battle_scene = $scene;
		if (current_battle_scene._ctbGauge == null) {
			return;
		}
        let tempActor = JsonEx.makeDeepCopy(BattleManager._currentActor);
		//对于有驱动时间的魔法，显示驱动后的位置，否则显示行动完成后的位置
        //如果技能菜单不可见，则不显示，为了防止驱动魔法时显示重复了
        if (!this.active && !this.visible) {
			$scene._ctbGauge._delay_anchor_num.visible = false;
            return;
        }
        let isInstantMagic = false;
        if ($scene._ctbGauge && $scene._ctbGauge._globalBonusDict && $scene._ctbGauge._currentBonusList && $scene._ctbGauge._currentBonusList[0] >= 0 &&
            $scene._ctbGauge._globalBonusDict[$scene._ctbGauge._currentBonusList[0]].effectType === "本次魔法可瞬发") {
                isInstantMagic = true;
        }
		if (item.meta["castST"] != null && !isInstantMagic) {
            if ((this.active || this.visible)) {
                let castDelay = (100 * parseInt(item.meta["castST"]) * BattleManager._currentActor.castST_rate / BattleManager._currentActor.agi);
                tempActor._actionTime += castDelay;
                tempActor._actionTime = Math.floor(tempActor._actionTime);
                tempActor._tpbState = "casting";
                $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, true, item);
            }
		}
		else {
            if ((this.active || this.visible)) {
                let actionDelay = 100 * 100 / currentActor.agi;
                if (item.meta["delayST"] != null) {
                    actionDelay = 100 * parseInt(item.meta["delayST"]) / BattleManager._currentActor.agi;
                    if (item.stypeId == 1) {    //战技
                        actionDelay *= (BattleManager._currentActor.craft_delayST_rate);
                    }
                }
                tempActor._actionTime += actionDelay;
                tempActor._actionTime = Math.floor(tempActor._actionTime);
                $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, true, item);
            }
		}
        //目标指定的技能范围
        if (Imported.VisuMZ_2_BattleGridSystem && item.meta["目标指定"]) {
            this.changeScopeTargetSelection(item);
        }
	}
}

//目标指定时，检查范围内是否有其他目标
if (Imported.VisuMZ_2_BattleGridSystem) {
    Window_BattleEnemy.prototype.changeScopeTargetSelection = function(item) {
        if (this.enemy() == null || item == null || item.meta["技能范围"] == null) {
            return;
        }
        const anchorEnemy = this.enemy();
        anchorEnemy._anchorSelected = true;
        for (const enemy of this._enemies) {
            if (enemy.index() === anchorEnemy.index()) {
                continue;
            }
            enemy._anchorSelected = false;
            if (checkScopeTarget(anchorEnemy, enemy, item)) {
                enemy._selected = true;
            }
        }
    }
}

const _alderpaw_ctb_Window_BattleEnemy_hide = Window_BattleEnemy.prototype.hide;
Window_BattleEnemy.prototype.hide = function() {
    _alderpaw_ctb_Window_BattleEnemy_hide.call(this);
    for (const enemy of this._enemies) {
        enemy._anchorSelected = false;
    }
}

//选择我方为目标时
const _alderpaw_ctb_windowBattleActor_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    const lastIndex = this.index();
    if (index > 0 && index === lastIndex) {
        return;
    }
    _alderpaw_ctb_windowBattleActor_select.call(this, index);
    let item = null;
    if (BattleManager._currentActor && BattleManager._currentActor._actions.length > 0) {
        item = BattleManager._currentActor._actions[0].item();
    }
    let currentActor = BattleManager._currentActor;
	if (item != null && item.meta != null) {
		let current_battle_scene = $scene;
		if (current_battle_scene._ctbGauge == null) {
			return;
		}
        let tempActor = JsonEx.makeDeepCopy(BattleManager._currentActor);
		//对于有驱动时间的魔法，显示驱动后的位置，否则显示行动完成后的位置
        //如果技能菜单不可见，则不显示，为了防止驱动魔法时显示重复了
        if (!this.active && !this.visible) {
			$scene._ctbGauge._delay_anchor_num.visible = false;
            return;
        }
        let isInstantMagic = false;
        if ($scene._ctbGauge && $scene._ctbGauge._globalBonusDict && $scene._ctbGauge._currentBonusList && $scene._ctbGauge._currentBonusList[0] >= 0 &&
            $scene._ctbGauge._globalBonusDict[$scene._ctbGauge._currentBonusList[0]].effectType === "本次魔法可瞬发") {
                isInstantMagic = true;
        }
		if (item.meta["castST"] != null && !isInstantMagic) {
            if ((this.active || this.visible)) {
                let castDelay = (100 * parseInt(item.meta["castST"]) * BattleManager._currentActor.castST_rate / BattleManager._currentActor.agi);
                tempActor._actionTime += castDelay;
                tempActor._actionTime = Math.floor(tempActor._actionTime);
                tempActor._tpbState = "casting";
                $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, true, item);
            }
		}
		else {
            if ((this.active || this.visible)) {
                let actionDelay = 100 * 100 / currentActor.agi;
                if (item.meta["delayST"] != null) {
                    actionDelay = 100 * parseInt(item.meta["delayST"]) / BattleManager._currentActor.agi;
                    if (item.stypeId == 1) {    //战技
                        actionDelay *= (BattleManager._currentActor.craft_delayST_rate);
                    }
                }
                tempActor._actionTime += actionDelay;
                tempActor._actionTime = Math.floor(tempActor._actionTime);
                $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, true, item);
            }
		}
        //目标指定的技能范围
        if (Imported.VisuMZ_2_BattleGridSystem && item.meta["目标指定"]) {
            this.changeScopeTargetSelection(item);
        }
	}
}

//目标指定时，检查范围内是否有其他目标
if (Imported.VisuMZ_2_BattleGridSystem) {
    Window_BattleActor.prototype.changeScopeTargetSelection = function(item) {
        if (this.actor(this.index()) == null || item == null || item.meta["技能范围"] == null) {
            return;
        }
        const anchorActor = this.actor(this.index());
        anchorActor._anchorSelected = true;
        for (const actor of $gameParty.battleMembers()) {
            if (actor.actorId() === anchorActor.actorId()) {
                continue;
            }
            actor._anchorSelected = false;
            if (checkScopeTarget(anchorActor, actor, item)) {
                actor._selected = true;
            }
        }
    }
}

const _alderpaw_ctb_Window_BattleActor_hide = Window_BattleActor.prototype.hide;
Window_BattleActor.prototype.hide = function() {
    _alderpaw_ctb_Window_BattleActor_hide.call(this);
    for (const actor of $gameParty.battleMembers()) {
        actor._anchorSelected = false;
    }
}


if (Imported.VisuMZ_2_BattleGridSystem) {
    /**
     * 
     * @param {*} anchorBattler 选中的目标，圆心
     * @param {*} battler 要判断是否在范围内的其他目标
     * @param {*} item 技能或物品
     * @returns 
     */
    function checkScopeTarget(anchorBattler, battler, item) {
        if (anchorBattler == null || battler == null || item == null || item.meta["技能范围"] == null) {
            return false;
        }
        const anchorPointRow = anchorBattler._gridLocation.flank;
        const anchorPointCol = anchorBattler._gridLocation.rank;
        const startRow = battler._gridLocation.flank;
        const endRow = battler.isEnemy() ? battler._gridLocation.flank + battler._gridSize.flank - 1 : startRow;
        const startCol = battler._gridLocation.rank;
        const endCol = battler.isEnemy() ? battler._gridLocation.rank + battler._gridSize.rank - 1 : startCol;
        if (item.meta["技能范围"].includes("小圆")) {
            const areaPoints = [
                {"row": anchorPointRow, "col": anchorPointCol},
                {"row": anchorPointRow + 1, "col": anchorPointCol},
                {"row": anchorPointRow, "col": anchorPointCol + 1},
                {"row": anchorPointRow - 1, "col": anchorPointCol},
                {"row": anchorPointRow, "col": anchorPointCol - 1}
            ];
            for (const point of areaPoints) {
                if (point.row >= startRow && point.row <= endRow && point.col >= startCol && point.col <= endCol) {
                    return true;
                }
            }
            return false;
        }
        else if (item.meta["技能范围"].includes("中圆")) {
            const areaPoints = [
                {"row": anchorPointRow, "col": anchorPointCol},
                {"row": anchorPointRow + 1, "col": anchorPointCol},
                {"row": anchorPointRow, "col": anchorPointCol + 1},
                {"row": anchorPointRow - 1, "col": anchorPointCol},
                {"row": anchorPointRow, "col": anchorPointCol - 1},
                {"row": anchorPointRow - 1, "col": anchorPointCol - 1},
                {"row": anchorPointRow - 1, "col": anchorPointCol + 1},
                {"row": anchorPointRow + 1, "col": anchorPointCol - 1},
                {"row": anchorPointRow + 1, "col": anchorPointCol + 1}
            ];
            for (const point of areaPoints) {
                if (point.row >= startRow && point.row <= endRow && point.col >= startCol && point.col <= endCol) {
                    return true;
                }
            }
            return false;
        }
        else if (item.meta["技能范围"].includes("大圆")) {
            const areaPoints = [
                {"row": anchorPointRow, "col": anchorPointCol},
                {"row": anchorPointRow + 1, "col": anchorPointCol},
                {"row": anchorPointRow, "col": anchorPointCol + 1},
                {"row": anchorPointRow - 1, "col": anchorPointCol},
                {"row": anchorPointRow, "col": anchorPointCol - 1},
                {"row": anchorPointRow - 1, "col": anchorPointCol - 1},
                {"row": anchorPointRow - 1, "col": anchorPointCol + 1},
                {"row": anchorPointRow + 1, "col": anchorPointCol - 1},
                {"row": anchorPointRow + 1, "col": anchorPointCol + 1},
                {"row": anchorPointRow + 2, "col": anchorPointCol},
                {"row": anchorPointRow - 2, "col": anchorPointCol},
                {"row": anchorPointRow, "col": anchorPointCol + 2},
                {"row": anchorPointRow, "col": anchorPointCol - 2}
            ];
            for (const point of areaPoints) {
                if (point.row >= startRow && point.row <= endRow && point.col >= startCol && point.col <= endCol) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    const _alderpaw_ctb_Game_Action_makeTargets = Game_Action.prototype.makeTargets;
    Game_Action.prototype.makeTargets = function() {
        const targets = _alderpaw_ctb_Game_Action_makeTargets.call(this);
        const item = this.item();
        const anchorBattler = targets[0];
        if (anchorBattler && item && item.meta["目标指定"] && item.meta["技能范围"]) {
            if (anchorBattler.isEnemy()) {
                for (const enemy of $gameTroop.aliveMembers()) {
                    if (enemy.index() === anchorBattler.index()) {
                        continue;
                    }
                    if (checkScopeTarget(anchorBattler, enemy, item)) {
                        targets.push(enemy);
                    }
                }
            }
            else {
                for (const actor of $gameParty.aliveMembers()) {
                    if (actor.index() === anchorBattler.index()) {
                        continue;
                    }
                    if (checkScopeTarget(anchorBattler, actor, item)) {
                        targets.push(actor);
                    }
                }
            }
        }
        return targets;
    }
}

const _alderpaw_ctb_Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    _alderpaw_ctb_Sprite_Battler_initMembers.call(this);
    this._anchorSelectionEffectCount = 0;
};

const _alderpaw_ctb_Sprite_Battler_updateSelectionEffect = Sprite_Battler.prototype.updateSelectionEffect;
Sprite_Battler.prototype.updateSelectionEffect = function() {
    _alderpaw_ctb_Sprite_Battler_updateSelectionEffect.call(this);
    const target = this.mainSprite();
    if (this._battler._anchorSelected) {
        this._anchorSelectionEffectCount++;
        if (this._anchorSelectionEffectCount % 30 < 15) {
            if (this._battler.isEnemy()) {
                target.setBlendColor([255, 0, 0, 64]);
            }
            else {
                target.setBlendColor([0, 0, 255, 64]);
            }
        } else {
            target.setBlendColor([0, 0, 0, 0]);
        }
    } else if (this._anchorSelectionEffectCount > 0) {
        this._anchorSelectionEffectCount = 0;
        target.setBlendColor([0, 0, 0, 0]);
    }
};

//选择网格为目标时
if (Imported.VisuMZ_2_BattleGridSystem) {
    const _alderpaw_ctb_windowBattleGridSelectNode_select = Window_BattleGridSelectNode.prototype.select;
    Window_BattleGridSelectNode.prototype.select = function(index) {
        _alderpaw_ctb_windowBattleGridSelectNode_select.call(this, index);
        let currentActor = BattleManager._currentActor;
        if (currentActor == null) {
            return;
        }
        if ($scene._skillWindow == null) {
            return;
        }
        const item = $scene._skillWindow.item();
        $scene._ctbGauge.updateGridSelection();
        if (item != null && item.meta != null) {
            let current_battle_scene = $scene;
            if (current_battle_scene._ctbGauge == null) {
                return;
            }
            let tempActor = JsonEx.makeDeepCopy(currentActor);
            //对于有驱动时间的魔法，显示驱动后的位置，否则显示行动完成后的位置
            if (!this.active && !this.visible) {
                return;
            }
            let isInstantMagic = false;
            if ($scene._ctbGauge && $scene._ctbGauge._globalBonusDict && $scene._ctbGauge._currentBonusList && $scene._ctbGauge._currentBonusList[0] >= 0 &&
                $scene._ctbGauge._globalBonusDict[$scene._ctbGauge._currentBonusList[0]].effectType === "本次魔法可瞬发") {
                    isInstantMagic = true;
            }
            if (item.meta["castST"] != null && !isInstantMagic) {
                if ((this.active || this.visible)) {
                    let castDelay = (100 * parseInt(item.meta["castST"]) * BattleManager._currentActor.castST_rate / BattleManager._currentActor.agi);
                    tempActor._actionTime += castDelay;
                    tempActor._actionTime = Math.floor(tempActor._actionTime);
                    tempActor._tpbState = "casting";
                    $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, true, item);
                }
            }
            else {
                let actionDelay = 100 * 100 / currentActor.agi;
                if (item.meta["delayST"] != null) {
                    actionDelay = 100 * parseInt(item.meta["delayST"]) / currentActor.agi;
                    if (item.stypeId == 1) {    //战技
                        actionDelay *= (BattleManager._currentActor.craft_delayST_rate);
                    }
                }
                tempActor._actionTime += actionDelay;
                tempActor._actionTime = Math.floor(tempActor._actionTime);
                $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, true, item);
            }
        }
    }

    const _alderpaw_ctb_Window_BattleGridSelectNode_update = Window_BattleGridSelectNode.prototype.update;
    Window_BattleGridSelectNode.prototype.update = function() {
        _alderpaw_ctb_Window_BattleGridSelectNode_update.call(this);
        const actor = BattleManager._currentActor;
        if (actor && actor.currentAction() && actor.currentAction().item()) {
            const item = actor.currentAction().item();
            const actorRow = actor._gridLocation.flank;
            const actorCol = actor._gridLocation.rank;
            const anchorIndex = (actorCol + 3) + 8 * (actorRow - 1);
            if (item.meta["自身中心"] && this._index !== anchorIndex && this.active) {
                this.select(anchorIndex);
                actor._anchorSelected = true;
            }
        }
    };
}


var gCountForCastAnchor = 0;
var gCountForDelayAnchor = 0;
CTB_Gauge.prototype.updateAnchor = function() {
	if (this._currentPosAnchors == null || this._predictPosAnchors == null) {
		return;
	}
    gCountForDelayAnchor++;
    for (let i = 0; i < this._currentPosAnchors.length; i++) {
        if (gCountForDelayAnchor >= 15 && gCountForDelayAnchor < 30) {
            this._currentPosAnchors[i].y = 16;
            this._predictPosAnchors[i].y = 14;
            this._delay_anchor_num.y = 20;
        }
        else if (gCountForDelayAnchor < 15) {
            this._currentPosAnchors[i].y = 14;
            this._predictPosAnchors[i].y = 16;
            this._delay_anchor_num.y = 22;
        }
    }
    if (gCountForDelayAnchor >= 30) {
        gCountForDelayAnchor = 0;
    }
};

const _alderpaw_ctb_sceneBattle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function() {
	_alderpaw_ctb_sceneBattle_createSpriteset.call(this);
	this._ctbGauge = new CTB_Gauge()
    this._ctbGauge.z = 125;
	this.addChild(this._ctbGauge);
};

const _alderpaw_ctb_sceneBattle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
    _alderpaw_ctb_sceneBattle_initialize.call(this);
    this._needRefreshBattleLogForCast = false;
    this._delayedSBreakActor = undefined;
}

const _alderpaw_ctb_gameSystem_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_alderpaw_ctb_gameSystem_initialize.call(this);
	this._bhud_visible = true;    //是否隐藏战斗面板
};

//开始驱动魔法后显示一下驱动提示，然后再继续
const _alderpaw_ctb_sceneBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _alderpaw_ctb_sceneBattle_update.call(this);
    if (this._needRefreshBattleLogForCast && this._logWindow._waitCount === 0) {
        this._needRefreshBattleLogForCast = false;
        this._logWindow.clear();
        if ($gameTemp._castingBattler != null && this._ctbGauge != null) {
            $gameTemp._castingBattler._actionTime += $gameTemp._currentCastDelay;
            $gameTemp._castingBattler._actionTime = Math.floor($gameTemp._castingBattler._actionTime);
            if ($gameTemp._castingBattler._actionTime === 0) {
                $gameTemp._castingBattler._tpbState = "ready";
            }
            this._ctbGauge.refreshBattlers(null, true, $gameTemp._castingBattler);
        }
    }
    if (this._ctbGauge) {
        this._ctbGauge.visible = !$gameMessage.isBusy();
    }
}

//==============================
//角色属性
//==============================
const _alderpaw_ctb_gameBattler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    _alderpaw_ctb_gameBattler_initMembers.call(this);
	this._actionTime = 0;
    this._isReceivedBonus = false;
    this._anchorSelected = false;
    this._shieldHp = 0;
};

//==============================
//覆盖原tpb战斗系统
//==============================
const _alderpaw_ctb_battleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    _alderpaw_ctb_battleManager_startBattle.call(this);
    if ($scene._ctbGauge != null) {
        $scene._ctbGauge.initBonus();
        $scene._ctbGauge.refreshBattlers(null, true);
    }
}

Game_Battler.prototype.clearTpbChargeTime = function() {
    this._tpbState = "charging";
};

Game_Battler.prototype.applyTpbPenalty = function() {
    this._tpbState = "charging";
    this._actionTime += Math.floor(100 * 100 / this.agi);
};

Game_Battler.prototype.initTpbChargeTime = function(advantageous) {
    this._tpbState = "charging";
    this._actionTime = advantageous ? 0 : Math.floor(Math.random() * 5000 / this.agi);
};

Game_Battler.prototype.tpbChargeTime = function() {
    return this._actionTime;
};

Game_Battler.prototype.startTpbCasting = function() {
    //对于无需驱动的技能，直接进入这个函数；对于需要驱动的魔法，是开始驱动后进入
    let isMagic = false;
    let delay = 0;
    const actions = this._actions.filter(action => action.isValid());
    //如果没有可用的action，直接ready，避免卡死
    // if (actions.length === 0) {
    //     this._tpbState = "ready";
    // }
    const items = actions.map(action => action.item());
    for (let i = 0; i < items.length; i++) {
        if (items[i] == null) {
            continue;
        }
        let notetag = items[i].meta;
        if (notetag && notetag["castST"] != null) {
            if ($scene._ctbGauge && $scene._ctbGauge._globalBonusDict && $scene._ctbGauge._currentBonusList && $scene._ctbGauge._currentBonusList[0] >= 0 &&
            $scene._ctbGauge._globalBonusDict[$scene._ctbGauge._currentBonusList[0]].effectType === "本次魔法可瞬发") {
                delay = 0;
                isMagic = false;
            }
            else {
                delay = Math.floor(100 * parseInt(notetag["castST"]) * this.castST_rate / this.agi);
                isMagic = true;
                this._isReceivedBonus = false;
            }
        }
    }
    this._tpbState = "casting";
    if (isMagic) {
        let tempActor = JsonEx.makeDeepCopy(this);
        $gameTemp._currentCastDelay = delay;
        tempActor._actionTime += delay;
        tempActor._actionTime = Math.floor(tempActor._actionTime);
        $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, false);
        $gameTemp.requestAnimation([this], Alderpaw.ctbCastAnimationId, false);
        //this._actionTime += delay;
        //this._actionTime = Math.floor(this._actionTime);
        $gameTemp._castingBattler = this;
        $scene._logWindow.clear();
        $scene._logWindow.addText(this.name() + "正在准备驱动魔法");
        $scene._logWindow._waitCount = Alderpaw.ctbCastAnimationTime;;
        $scene._needRefreshBattleLogForCast = true;
    }
    else {
        if (this._actionTime === 0) {
            this._tpbState = "ready";
        }
    }
};

Game_Battler.prototype.startTpbAction = function() {
    //正式流程
    let tempDelay = 0, isDelayUpdated = false, isMagic = false;
    const actions = this._actions.filter(action => action.isValid());
    //如果没有可用的action，直接ready，避免卡死
    // if (actions.length === 0) {
    //     this._tpbState = "ready";
    // }
    const items = actions.map(action => action.item());
    for (let i = 0; i < items.length; i++) {
        if (items[i] == null) {
            continue;
        }
        let notetag = items[i].meta;
        if (notetag && notetag["delayST"] != null) {
            tempDelay += parseInt(notetag["delayST"]) * this.craft_delayST_rate;
            isDelayUpdated = true;
        }
        if (notetag && notetag["castST"] != null) {
            isMagic = true;
        }
    }
    let delay = Math.floor((isDelayUpdated ? tempDelay : 100) * 100 / this.agi);
    $gameTemp._currentActionDelay = delay;
    this._tpbState = "acting";
    //这里把tempActor加到行动队列，这样在技能动画期间也能显示接下来插队的位置
    if ($scene._ctbGauge) {
        let tempActor = JsonEx.makeDeepCopy(this);
        tempActor._actionTime += $gameTemp._currentActionDelay;
        tempActor._actionTime = Math.floor(tempActor._actionTime);
        $scene._ctbGauge.refreshBattlers(tempActor, false, tempActor, false, items[0], actions[0] ? actions[0].makeTargets() : []);
    }
    //如果当前角色是在爆S技，将其移除队列
    if (BattleManager._sBreakActors.includes(this)) {
        BattleManager._sBreakActors.shift();
    }
};

Game_Battler.prototype.isTpbCharged = function() {
    return this._tpbState === "charged";
};

Game_Battler.prototype.isTpbReady = function() {
    return this._tpbState === "ready";
};

Game_Battler.prototype.isTpbTimeout = function() {
    return this._tpbIdleTime >= 1;
};

Game_Battler.prototype.updateTpb = function() {
    if (this.canMove()) {
        this.updateTpbChargeTime();
        this.updateTpbCastTime();
        this.updateTpbAutoBattle();
    }
    if (this.isAlive()) {
        this.updateTpbIdleTime();
    }
};

Game_Battler.prototype.updateTpbChargeTime = function() {
    //
};

Game_Battler.prototype.updateTpbCastTime = function() {
    //
};

Game_Battler.prototype.updateTpbIdleTime = function() {
    //
};

Game_Battler.prototype.updateTpbAutoBattle = function() {
    if (this.isTpbCharged() && !this.isTpbTurnEnd() && this.isAutoBattle()) {
        this.makeTpbActions();
    }
};

Game_Battler.prototype.tpbAcceleration = function() {
    const speed = this.tpbRelativeSpeed();
    const referenceTime = $gameParty.tpbReferenceTime();
    return speed / referenceTime;
};

Game_Battler.prototype.tpbRelativeSpeed = function() {
    return this.tpbSpeed() / $gameParty.tpbBaseSpeed();
};

Game_Battler.prototype.tpbSpeed = function() {
    return Math.sqrt(this.agi) + 1;
};

Game_Battler.prototype.tpbBaseSpeed = function() {
    const baseAgility = this.paramBasePlus(6);
    return Math.sqrt(baseAgility) + 1;
};

Game_Battler.prototype.tpbRequiredCastTime = function() {
	this._castST = 0;
    const actions = this._actions.filter(action => action.isValid());
    const items = actions.map(action => action.item());
	var tempCastTime = 0, isCastUpdated = false;
	for (var i = 0; i < items.length; i++) {
		var notetag = items[i].meta;
		if (notetag && notetag["castST"]) {
			tempCastTime += parseInt(notetag["castST"]);
			isCastUpdated = true;
		}
	}
	this._castST = isCastUpdated ? tempCastTime : 0;
	//特殊：爆魔buff，魔法驱动时间-50%
    return this._castST * 0.01 * this.castST_rate;
};

Game_Battler.prototype.onTpbCharged = function() {
    if (!this.shouldDelayTpbCharge()) {
        this.finishTpbCharge();
    }
    console.log("轮到行动:", this.name());
    gainHpMpTpReward(this);
};

Game_Battler.prototype.shouldDelayTpbCharge = function() {
    return !BattleManager.isActiveTpb() && $gameParty.canInput();
};

Game_Battler.prototype.finishTpbCharge = function() {
    this._tpbState = "charged";
    this._tpbTurnEnd = true;
    this._tpbIdleTime = 0;
};

Game_Battler.prototype.isTpbTurnEnd = function() {
    return this._tpbTurnEnd;
};

Game_Battler.prototype.initTpbTurn = function() {
    this._tpbTurnEnd = false;
    this._tpbTurnCount = 0;
    this._tpbIdleTime = 0;
};

Game_Battler.prototype.startTpbTurn = function() {
    this._tpbTurnEnd = false;
    this._tpbTurnCount++;
    this._tpbIdleTime = 0;
    if (this.numActions() === 0) {
        this.makeTpbActions();
    }
    if ($scene._skillWindow) {
        $scene._skillWindow.deselect();
    }
};

Game_Battler.prototype.makeTpbActions = function() {
    this.makeActions();
    if (this.canInput()) {
        this.setActionState("undecided");
    } else {
        this.startTpbCasting();
        this.setActionState("waiting");
    }
};

Game_Battler.prototype.onTpbTimeout = function() {
    this.onAllActionsEnd();
    this._tpbTurnEnd = true;
    this._tpbIdleTime = 0;
};

//防止提前让玩家输入
const _alderpaw_ctb_gameBattler_canInput = Game_Battler.prototype.canInput;
Game_Battler.prototype.canInput = function() {
    if ($scene._ctbGauge && $scene._ctbGauge._battlers && $scene._ctbGauge._battlers.length > 0 && $scene._ctbGauge._battlers[0].name() !== this.name()) {
        return false;
    }
    if ($scene._logWindow && $scene._logWindow.isBusy()) {
        return false;
    }
    return _alderpaw_ctb_gameBattler_canInput.call(this);
};

//行动结束时更新ctb条
const _alderpaw_ctb_battleManager_endBattlerActions = BattleManager.endBattlerActions;
BattleManager.endBattlerActions = function(battler) {
    _alderpaw_ctb_battleManager_endBattlerActions.call(this, battler);
    if ($scene._delayedSBreakActor != null) {
        $scene.addActorToRealSBreakList($scene._delayedSBreakActor);
        $scene._delayedSBreakActor = undefined;
    }
    else if ($scene._ctbGauge) {
        battler._actionTime += $gameTemp._currentActionDelay;
        battler._actionTime = Math.floor(battler._actionTime);
        $scene._ctbGauge.refreshBattlers(null, true, battler);
    }
}

//始终保持更新updateTpb
/*
BattleManager.updateTurn = function(timeActive) {
    $gameParty.requestMotionRefresh();
    if (this.isTpb()) {
        this.updateTpb();
    }
    if (!this._subject) {
        this._subject = this.getNextSubject();
    }
    if (this._subject) {
        this.processTurn();
    } else if (!this.isTpb()) {
        this.endTurn();
    }
};
*/

//===========================
//CTB相关机制实现
//===========================
//判断是否存在延迟的装备
Game_Actor.prototype.hasDelayEquipment = function() {
    for (const equipment of (this.equips())) {
        if (equipment != null && equipment.meta && (equipment.meta["AT Delay By Value"] || equipment.meta["AT Delay By ST"])) {
            return true;
        }
    }
    return false;
}

//解除驱动、延迟和拉人
const _alderpaw_ctb_gameAction_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
	_alderpaw_ctb_gameAction_apply.call(this, target);
    const result = target.result();
    let delayTriggered = false;
    let cancelCastTriggered = false;
    let advanceTriggered = false;
    //若本次没有命中，则不触发效果
    if (!result.isHit()) {
        target._lastTimeHit = false;
        return;
    }
    target._lastTimeHit = true;
    //解除驱动
	if (this.item() && this.item().meta && this.item().meta["Cancel Cast"]) {
		if (target._tpbState == "casting") {
            target._tpbState = "charging";
            target.setActionState("undecided");
            target.clearActions();
            cancelCastTriggered = true;
		}
	}
    //装备的延迟效果，每件装备单独判定
    if (this.subject().isActor() && this.item() && Alderpaw.ctbDelaySkillTypesByEquip.includes(this.item().stypeId) && target.isEnemy()) {
        for (const equipment of this.subject().equips()) {
            if (equipment != null && equipment.meta && equipment.meta["AT Delay By Value"]) {
                let delayChance = equipment.meta["AT Delay Chance"] ? parseFloat(equipment.meta["AT Delay Chance"]) : 1.0;
                let delayValue = parseInt(equipment.meta["AT Delay By Value"]);
                let delayEffectRate = Alderpaw.ctbDelayStateId > 0 ? target.stateRate(Alderpaw.ctbDelayStateId) : 1.0;    //AT延迟状态抗性
                if (Math.random() <= delayChance * delayEffectRate) {
                    target._actionTime += delayValue;
                    target._actionTime = Math.floor(target._actionTime);
                    delayTriggered = true;
                }
            }
            else if (equipment != null && equipment.meta && equipment.meta["AT Delay By ST"]) {
                let delayChance = equipment.meta["AT Delay Chance"] ? parseFloat(equipment.meta["AT Delay Chance"]) : 1.0;
                let delayValue = (100 * parseInt(equipment.meta["AT Delay By ST"]) / target.agi);
                let delayEffectRate = Alderpaw.ctbDelayStateId > 0 ? target.stateRate(Alderpaw.ctbDelayStateId) : 1.0;    //AT延迟状态抗性
                if (Math.random() <= delayChance * delayEffectRate) {
                    target._actionTime += delayValue;
                    target._actionTime = Math.floor(target._actionTime);
                    delayTriggered = true;
                }
            }
        }
    }
    //本技能的延迟效果
	if (this.item() && this.item().meta && this.item().meta["AT Delay By Value"]) {
        const item = this.item();
        let delayChance = item.meta["AT Delay Chance"] ? parseFloat(item.meta["AT Delay Chance"]) : 1.0;
        let delayValue = parseInt(item.meta["AT Delay By Value"]);
		let delayEffectRate = Alderpaw.ctbDelayStateId > 0 ? target.stateRate(Alderpaw.ctbDelayStateId) : 1.0;    //AT延迟状态抗性
		if (Math.random() <= delayChance * delayEffectRate) {
			target._actionTime += delayValue;
            target._actionTime = Math.floor(target._actionTime);
            delayTriggered = true;
		}
	}
	if (this.item() && this.item().meta && this.item().meta["AT Delay By ST"]) {
        const item = this.item();
        let delayChance = item.meta["AT Delay Chance"] ? parseFloat(item.meta["AT Delay Chance"]) : 1.0;
        let delayValue = (100 * parseInt(item.meta["AT Delay By ST"]) / target.agi);
		let delayEffectRate = Alderpaw.ctbDelayStateId > 0 ? target.stateRate(Alderpaw.ctbDelayStateId) : 1.0;    //AT延迟状态抗性
		if (Math.random() <= delayChance * delayEffectRate) {
			target._actionTime += delayValue;
            target._actionTime = Math.floor(target._actionTime);
            delayTriggered = true;
		}
	}
    //提AT
	if (this.item() && this.item().meta && this.item().meta["AT Advance By Value"]) {
        const item = this.item();
        //提AT直接减即可，不需要考虑概率
        target._actionTime -= parseInt(item.meta["AT Advance By Value"]);
        target._actionTime = Math.max(0, target._actionTime);
        advanceTriggered = true;
	}
	if (this.item() && this.item().meta && this.item().meta["AT Advance By ST"]) {
        const item = this.item();
        target._actionTime -= Math.floor(100 * parseInt(item.meta["AT Advance By ST"]) / target.agi);
        target._actionTime = Math.max(0, target._actionTime);
        advanceTriggered = true;
	}
    //触发弹出式文字
    if (delayTriggered && Alderpaw.ctbShowDelayPopup) {
        let popup = new Sprite_Damage();
        //寻找当前target的位置
        if (target.isActor()) {
            let targetSprite = $scene._spriteset._actorSprites[target.index()];
            if (targetSprite != null) {
                popup.x = targetSprite.x;
                popup.y = targetSprite.y - 60;
            }
        }
        else {
            let targetSprite = null;
            for (sprite of $scene._spriteset._enemySprites) {
                if (sprite._enemy != null && sprite._enemy.index() === target.index()) {
                    targetSprite = sprite;
                    break;
                }
            }
            if (targetSprite != null) {
                popup.x = targetSprite.x;
                popup.y = targetSprite.y - 60;
            }
        }
        popup.visible = true;
        popup.createDelay();
        $scene._ctbGauge.addChild(popup);
    }
    if (advanceTriggered && Alderpaw.ctbShowAdvancePopup) {
        let popup = new Sprite_Damage();
        //寻找当前target的位置
        if (target.isActor()) {
            let targetSprite = $scene._spriteset._actorSprites[target.index()];
            if (targetSprite != null) {
                popup.x = targetSprite.x;
                popup.y = targetSprite.y - 20;
            }
        }
        else {
            let targetSprite = null;
            for (sprite of $scene._spriteset._enemySprites) {
                if (sprite._enemy != null && sprite._enemy.index() === target.index()) {
                    targetSprite = sprite;
                    break;
                }
            }
            if (targetSprite != null) {
                popup.x = targetSprite.x;
                popup.y = targetSprite.y - 20;
            }
        }
        popup.visible = true;
        popup.createAdvance();
        $scene._ctbGauge.addChild(popup);
    }
    if (cancelCastTriggered && Alderpaw.ctbShowCancelCastPopup) {
        let popup = new Sprite_Damage();
        //寻找当前target的位置
        if (target.isActor()) {
            let targetSprite = $scene._spriteset._actorSprites[target.index()];
            if (targetSprite != null) {
                popup.x = targetSprite.x;
                popup.y = targetSprite.y - 40;
            }
        }
        else {
            let targetSprite = null;
            for (sprite of $scene._spriteset._enemySprites) {
                if (sprite._enemy != null && sprite._enemy.index() === target.index()) {
                    targetSprite = sprite;
                    break;
                }
            }
            if (targetSprite != null) {
                popup.x = targetSprite.x;
                popup.y = targetSprite.y - 40;
            }
        }
        popup.visible = true;
        popup.createCancelCast();
        $scene._ctbGauge.addChild(popup);
    }
}

Sprite_Damage.prototype.createCancelCast = function() {
    const h = this.fontSize();
    const w = Math.floor(h * 3);
    const sprite = this.createChildSprite(w, h);
    sprite.bitmap.fontBold = true;
    sprite.bitmap.textColor = "#BFBFBF";
    sprite.bitmap.drawText("CANCEL", 0, 0, w, h, "center");
    sprite.dy = 0;
};

Sprite_Damage.prototype.createDelay = function() {
    const h = this.fontSize();
    const w = Math.floor(h * 3);
    const sprite = this.createChildSprite(w, h);
    sprite.bitmap.fontBold = true;
    sprite.bitmap.textColor = "#BFBFBF";
    sprite.bitmap.drawText("DELAY", 0, 0, w, h, "center");
    sprite.dy = 0;
};

Sprite_Damage.prototype.createAdvance = function() {
    const h = this.fontSize();
    const w = Math.floor(h * 3);
    const sprite = this.createChildSprite(w, h);
    sprite.bitmap.fontBold = true;
    sprite.bitmap.textColor = "#FFCC66";
    sprite.bitmap.drawText("ADVANCE", 0, 0, w, h, "center");
    sprite.dy = 0;
};

Sprite_Damage.prototype.createHpDamage = function(value) {
    const h = this.fontSize();
    const w = Math.floor(h * 4);
    const sprite = this.createChildSprite(w, h);
    sprite.bitmap.fontBold = true;
    sprite.bitmap.textColor = "#FFFFFF";
    sprite.bitmap.drawText(value, 0, 0, w, h, "center");
    sprite.dy = 0;
};

Sprite_Damage.prototype.createHpRecovery = function(value) {
    const h = this.fontSize();
    const w = Math.floor(h * 4);
    const sprite = this.createChildSprite(w, h);
    sprite.bitmap.fontBold = true;
    sprite.bitmap.textColor = "#FFD700";
    sprite.bitmap.drawText(value, 0, 0, w, h, "center");
    sprite.dy = 0;
};

Sprite_Damage.prototype.createMpDamage = function(value) {
    const h = this.fontSize();
    const w = Math.floor(h * 4);
    const sprite = this.createChildSprite(w, h);
    sprite.bitmap.fontBold = true;
    sprite.bitmap.textColor = "#008B8B";
    sprite.bitmap.drawText(value, 0, 0, w, h, "center");
    sprite.dy = 0;
};

Sprite_Damage.prototype.createMpRecovery = function(value) {
    const h = this.fontSize();
    const w = Math.floor(h * 4);
    const sprite = this.createChildSprite(w, h);
    sprite.bitmap.fontBold = true;
    sprite.bitmap.textColor = "#80b0ff";
    sprite.bitmap.drawText(value, 0, 0, w, h, "center");
    sprite.dy = 0;
};

Sprite_Damage.prototype.createTpDamage = function(value) {
    const h = this.fontSize();
    const w = Math.floor(h * 4);
    const sprite = this.createChildSprite(w, h);
    sprite.bitmap.fontBold = true;
    sprite.bitmap.textColor = "#800080";
    sprite.bitmap.drawText(value, 0, 0, w, h, "center");
    sprite.dy = 0;
};

Sprite_Damage.prototype.createTpRecovery = function(value) {
    const h = this.fontSize();
    const w = Math.floor(h * 4);
    const sprite = this.createChildSprite(w, h);
    sprite.bitmap.fontBold = true;
    sprite.bitmap.textColor = "#B9FFB5";
    sprite.bitmap.drawText(value, 0, 0, w, h, "center");
    sprite.dy = 0;
};

//====================
//无法行动的状态下，轮到行动回合会自动跳过行动
//====================
Game_Action.prototype.setParalyzed = function() {
    this.setSkill(Alderpaw.ctbIdleSkillId);
};

Game_Action.prototype.prepare = function() {
    const user = this.subject();
    if (user.isAppeared() && user.restriction() === 4 && !this._forcing) {
        this.setParalyzed();
    }
};

Game_Battler.prototype.makeParalyzedActions = function() {
    for (let i = 0; i < this.numActions(); i++) {
        this.action(i).setParalyzed();
    }
    this.setActionState("waiting");
};

const _alderpaw_systemChange_gameActor_makeActions = Game_Actor.prototype.makeActions;
Game_Actor.prototype.makeActions = function() {
    _alderpaw_systemChange_gameActor_makeActions.call(this);
    if ((this.isAppeared() && this.restriction() === 4) || this._actions.length === 0) {
        this.makeParalyzedActions();
    }
};

const _alderpaw_systemChange_gameEnemy_makeActions = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    _alderpaw_systemChange_gameEnemy_makeActions.call(this);
    //若处于无法行动状态或者没技能可用的状态，直接跳过行动
    if ((this.isAppeared() && this.restriction() === 4) || (this._actions.length > 0 && this._actions[0].item() == null) || this._actions.length === 0) {
        this.makeParalyzedActions();
    }
};

Game_BattlerBase.prototype.canMove = function() {
    return this.isAppeared();
};

Game_Battler.prototype.onRestrict = function() {
    Game_BattlerBase.prototype.onRestrict.call(this);
    //this.clearTpbChargeTime();
    this.clearActions();
    for (const state of this.states()) {
        if (state.removeByRestriction) {
            this.removeState(state.id);
        }
    }
};

//特定状态下才能/无法使用的技能
const _alderpaw_ctb_gameBattlerBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
	if (skill.meta && skill.meta["Disabled In State"] && this.isActor()) {
		if (this._states.includes(parseInt(skill.meta["Disabled In State"]))) {
			return false;
		}
	}
	if (skill.meta && skill.meta["Enabled In State"] && this.isActor()) {
		if (!this._states.includes(parseInt(skill.meta["Enabled In State"]))) {
			return false;
		}
	}
	return _alderpaw_ctb_gameBattlerBase_meetsSkillConditions.call(this, skill);
};

const _alderpaw_ctb_gameBattler_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    //防护罩判定：如果本次试图添加的是不限次数、具有承伤上限的防护罩（黎轨的盾），则只有角色的_shieldHp小于这个防护罩提供的承伤上限时，才能添加成功
    const state = $dataStates[stateId];
    if (state.meta["Shield Hp Value"]) {
        const stateShieldValue = parseInt(state.meta["Shield Hp Value"]);
        if (stateShieldValue <= this._shieldHp) {
            return;
        }
        this._shieldHp = stateShieldValue;
    }
    _alderpaw_ctb_gameBattler_addState.call(this, stateId);
    //对正在驱动魔法的敌人施加了封魔或者任何被控制的状态，则需要直接触发cancel cast效果
    if (Alderpaw.ctbMagicBannedStateIds.includes(stateId) || Alderpaw.ctbMagicBannedStateIds.includes(stateId.toString()) || state.restriction > 0) {
        if (this._tpbState === "casting") {
            this._tpbState = "charging";
            this.setActionState("undecided");
            this.clearActions();
		}
    }
}

//=================================
//AT奖励
//=================================
//控制暴击
const _alderpaw_ctb_gameAction_itemCri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function(target) {
    const user = this.subject();
    if ($scene._ctbGauge && $scene._ctbGauge._globalBonusDict && $scene._ctbGauge._currentBonusList && $scene._ctbGauge._currentBonusList[0] >= 0) {
        if ($scene._ctbGauge._globalBonusDict[$scene._ctbGauge._currentBonusList[0]].effectType === "本次攻击必定暴击") {
            return 1.0;
        }
    }
    if (user && this.isMagical()) {
        return user.magic_critical;
    }
	return _alderpaw_ctb_gameAction_itemCri.call(this, target);
};

Game_Battler.prototype.gainHpReward = function(value) {
    this.setHp(this.hp + value);
    let popup = new Sprite_Damage();
    //寻找当前target的位置
    if (this.isActor()) {
        let targetSprite = $scene._spriteset._actorSprites[this.index()];
        if (targetSprite != null) {
            popup.x = targetSprite.x + targetSprite.damageOffsetX();
            popup.y = targetSprite.y + targetSprite.damageOffsetY();
        }
    }
    else {
        let targetSprite = null;
        for (sprite of $scene._spriteset._enemySprites) {
            if (sprite._enemy != null && sprite._enemy.index() === this.index()) {
                targetSprite = sprite;
                break;
            }
        }
        if (targetSprite != null) {
            popup.x = targetSprite.x;
            popup.y = targetSprite.y - 40;
        }
    }
    popup.visible = true;
    if (value >= 0) {
        popup.createHpRecovery("+" + Math.abs(value) + " HP");
    }
    else {
        popup.createHpDamage("-" + Math.abs(value) + " HP");
    }
    $scene._ctbGauge.addChild(popup);
};

Game_Battler.prototype.gainMpReward = function(value) {
    this.setMp(this.mp + value);
    let popup = new Sprite_Damage();
    //寻找当前target的位置
    if (this.isActor()) {
        let targetSprite = $scene._spriteset._actorSprites[this.index()];
        if (targetSprite != null) {
            popup.x = targetSprite.x + targetSprite.damageOffsetX();
            popup.y = targetSprite.y + targetSprite.damageOffsetY();
        }
    }
    else {
        let targetSprite = null;
        for (sprite of $scene._spriteset._enemySprites) {
            if (sprite._enemy != null && sprite._enemy.index() === this.index()) {
                targetSprite = sprite;
                break;
            }
        }
        if (targetSprite != null) {
            popup.x = targetSprite.x;
            popup.y = targetSprite.y - 40;
        }
    }
    popup.visible = true;
    if (value >= 0) {
        popup.createMpRecovery("+" + Math.abs(value) + " MP");
    }
    else {
        popup.createMpDamage("-" + Math.abs(value) + " MP");
    }
    $scene._ctbGauge.addChild(popup);
};

Game_Battler.prototype.gainTpReward = function(value) {
    this.setTp(this.tp + value);
    let popup = new Sprite_Damage();
    //寻找当前target的位置
    if (this.isActor()) {
        let targetSprite = $scene._spriteset._actorSprites[this.index()];
        if (targetSprite != null) {
            popup.x = targetSprite.x + targetSprite.damageOffsetX();
            popup.y = targetSprite.y + targetSprite.damageOffsetY();
        }
    }
    else {
        let targetSprite = null;
        for (sprite of $scene._spriteset._enemySprites) {
            if (sprite._enemy != null && sprite._enemy.index() === this.index()) {
                targetSprite = sprite;
                break;
            }
        }
        if (targetSprite != null) {
            popup.x = targetSprite.x;
            popup.y = targetSprite.y - 40;
        }
    }
    popup.visible = true;
    if (value >= 0) {
        popup.createTpRecovery("+" + Math.abs(value) + " TP");
    }
    else {
        popup.createTpDamage("-" + Math.abs(value) + " TP");
    }
    $scene._ctbGauge.addChild(popup);
};


//=========================
//S爆发技相关
//=========================
const _alderpaw_ctb_battleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _alderpaw_ctb_battleManager_initMembers.call(this);
    this._sBreakActors = [];    //存储当前正在爆S技的角色
    Input.keyMapper[49] = "s1";
    Input.keyMapper[50] = "s2";
    Input.keyMapper[51] = "s3";
    Input.keyMapper[52] = "s4";
}

Game_Actor.prototype.hasSBreak = function() {
    for (const skill of this.skills()) {
        if (skill.meta["奥义技"]) {
            return true;
        }
    }
    return false;
}

Game_Actor.prototype.canUseSBreak = function() {
    return this.hasSBreak() && this.tp >= Alderpaw.ctbSBreakMinTP && !BattleManager._sBreakActors.includes(this);
}

Scene_Battle.prototype.listenHitKeyForSBreak = function() {
    if ($gameParty.members()[0] != null && Input.isTriggered("s1") && $gameParty.members()[0].canUseSBreak()) {
        if (Alderpaw.ctbSBreakTriggerSE) {
            AudioManager.playSe({"name": Alderpaw.ctbSBreakTriggerSE, "pitch": 100, "volume": 100, "pan": 0});
        }
        this.readyForSBreak($gameParty.members()[0]);
    }
    else if ($gameParty.members()[1] != null && Input.isTriggered("s2") && $gameParty.members()[1].canUseSBreak()) {
        if (Alderpaw.ctbSBreakTriggerSE) {
            AudioManager.playSe({"name": Alderpaw.ctbSBreakTriggerSE, "pitch": 100, "volume": 100, "pan": 0});
        }
        this.readyForSBreak($gameParty.members()[1]);
    }
    else if ($gameParty.members()[2] != null && Input.isTriggered("s3") && $gameParty.members()[2].canUseSBreak()) {
        if (Alderpaw.ctbSBreakTriggerSE) {
            AudioManager.playSe({"name": Alderpaw.ctbSBreakTriggerSE, "pitch": 100, "volume": 100, "pan": 0});
        }
        this.readyForSBreak($gameParty.members()[2]);
    }
    else if ($gameParty.members()[3] != null && Input.isTriggered("s4") && $gameParty.members()[3].canUseSBreak()) {
        if (Alderpaw.ctbSBreakTriggerSE) {
            AudioManager.playSe({"name": Alderpaw.ctbSBreakTriggerSE, "pitch": 100, "volume": 100, "pan": 0});
        }
        this.readyForSBreak($gameParty.members()[3]);
    }
};

Scene_Battle.prototype.addActorToRealSBreakList = function(actor) {
    actor._actionTime = 0;
    actor._tpbState = "charging";
    this._ctbGauge.refreshBattlers(null, true, undefined, undefined, undefined, undefined, true);
    this._actorCommandWindow.close();
    if (!this.isTimeActive()) {
        this._actorCommandWindow.open();
    }
}

Scene_Battle.prototype.readyForSBreak = function(actor) {
    for (const battler of $gameParty.members().concat($gameTroop.members())) {
        if (battler._tpbState === "charged" && !BattleManager._sBreakActors.includes(battler)) {
            battler._tpbState = "charging";
        }
    }
    //如果爆S技的角色当前正在行动（acting状态），则不能直接将其状态改为charging，必须等待其结束。
    //因此此处的_sBreakActors是假队列，里面含有仍在执行上一次行动的角色
    BattleManager._sBreakActors.unshift(actor);
    if (actor._tpbState === "acting") {
        this._delayedSBreakActor = actor;
        actor._actionTime = 0;
        this._ctbGauge.refreshBattlers(null, false);
    }
    else {
        this.addActorToRealSBreakList(actor);
    }
}

const alderpaw_ctb_Window_ActorCommand_open = Window_ActorCommand.prototype.open;
Window_ActorCommand.prototype.open = function() {
    if (BattleManager._sBreakActors.length === 0) {
        alderpaw_ctb_Window_ActorCommand_open.call(this);
    }
    else if ($scene._specialSkillWindow) {
        $scene._ctbGauge.refreshBattlers(null, false);
        BattleManager._currentActor = BattleManager._sBreakActors[0];
        BattleManager.startActorInput();
        $scene._specialSkillWindow.setActor(BattleManager._sBreakActors[0]);
        $scene._specialSkillWindow.show();
        $scene._specialSkillWindow.activate();
        $scene._specialSkillWindow.select(0);
    }
};

const alderpaw_ctb_sceneBattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    alderpaw_ctb_sceneBattle_update.call(this);
    this.listenHitKeyForSBreak();
};

function Window_BattleSpecialSkill() {
    this.initialize(...arguments);
}

Window_BattleSpecialSkill.prototype = Object.create(Window_BattleSkill.prototype);
Window_BattleSpecialSkill.prototype.constructor = Window_BattleSkill;

Window_BattleSpecialSkill.prototype.initialize = function(rect) {
    Window_BattleSkill.prototype.initialize.call(this, rect);
};

Window_BattleSpecialSkill.prototype.makeItemList = function() {
    this._data = this._actor.skills();
	this._data = this._data.filter(item => item.meta["奥义技"]);
};

const _alderpaw_ctb_sceneBattle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    _alderpaw_ctb_sceneBattle_createAllWindows.call(this);
    this.createSpecialSkillWindow();
};

Scene_Battle.prototype.specialSkillWindowRect = function() {
    const ww = 400;
    const wh = this.windowAreaHeight();
    const wx = 480;
    const wy = (Graphics.boxHeight - wh) / 2;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Battle.prototype.createSpecialSkillWindow = function() {
    const rect = this.specialSkillWindowRect();
    this._specialSkillWindow = new Window_BattleSpecialSkill(rect);
    this._specialSkillWindow.hide();
    this._specialSkillWindow.setHelpWindow(this._helpWindow);
    this._specialSkillWindow.setHandler("ok", this.onSpecialSkillOk.bind(this));
    this.addWindow(this._specialSkillWindow);
};

Scene_Battle.prototype.onSpecialSkillOk = function() {
    const skill = this._specialSkillWindow.item();
    const action = BattleManager.inputtingAction();
    action.setSkill(skill.id);
    BattleManager.actor().setLastBattleSkill(skill);
    this.onSelectAction();
    this._specialSkillWindow.hide();
    this._specialSkillWindow.deactivate();
};

const _alderpaw_ctb_sceneBattle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    _alderpaw_ctb_sceneBattle_onEnemyCancel.call(this);
    if (BattleManager._sBreakActors.length > 0) {
        this._specialSkillWindow.show();
        this._specialSkillWindow.activate();
        this._specialSkillWindow.select(0);
    }
};

const _alderpaw_ctb_sceneBattle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    _alderpaw_ctb_sceneBattle_onActorCancel.call(this);
    if (BattleManager._sBreakActors.length > 0) {
        this._specialSkillWindow.show();
        this._specialSkillWindow.activate();
        this._specialSkillWindow.select(0);
    }
};


//=============================================================================
// ■■■ 以下是配合此套战斗系统的系统级更改 ■■■
//=============================================================================

/* 伤害计算公式的相关变动，写到战斗核心的插件设置里 */

// ==================== //
/*       自定义属性      */
// ==================== //
Object.defineProperties(Game_Battler.prototype, {
    // 战技硬直倍率，乘算
    craft_delayST_rate: {
        get: function() {
            return this.cparam(0);
        },
        configurable: true
    },
    // 魔法驱动时间倍率，乘算
    castST_rate: {
        get: function() {
            return this.cparam(1);
        },
        configurable: true
    },
    // 魔法暴击率，加算
    magic_critical: {
        get: function() {
            return this.cparam(2);
        },
        configurable: true
    },
    // 暴击伤害额外加成倍率，内部加算，和原有1.5倍暴击伤害乘算
    extra_critical_damage_rate: {
        get: function() {
            return this.cparam(3);
        },
        configurable: true
    },
    // 技能的额外回复倍率，加算
    extra_heal_rate: {
        get: function() {
            return this.cparam(4);
        },
        configurable: true
    },
    // 普通攻击·战技的伤害倍率
    pdr_to_target: {
        get: function() {
            return this.cparam(5);
        },
        configurable: true
    },
    // 攻击魔法的伤害倍率
    mdr_to_target: {
        get: function() {
            return this.cparam(6);
        },
        configurable: true
    },
    // 攻击时按照伤害回复MP的百分比，加算
    attack_mp_absorb_rate: {
        get: function() {
            return this.cparam(7);
        },
        configurable: true
    },
    // 攻击时按照伤害回复HP的百分比，加算
    attack_hp_absorb_rate: {
        get: function() {
            return this.cparam(8);
        },
        configurable: true
    },
    // 击杀敌人时回复的TP，加算
    kill_tp_absorb_value: {
        get: function() {
            return this.cparam(9);
        },
        configurable: true
    },
    // 受攻击时的TP回复倍率，加算
    hit_tp_charge_rate: {
        get: function() {
            return this.cparam(10);
        },
        configurable: true
    },
    // 残血伤害倍率
    low_hp_craft_damage_rate: {
        get: function() {
            return this.cparam(11);
        },
        configurable: true
    },
    low_hp_magic_damage_rate: {
        get: function() {
            return this.cparam(12);
        },
        configurable: true
    },
    // 满血伤害倍率
    high_hp_craft_damage_rate: {
        get: function() {
            return this.cparam(13);
        },
        configurable: true
    },
    high_hp_magic_damage_rate: {
        get: function() {
            return this.cparam(14);
        },
        configurable: true
    }
});

//自定义属性初值
Game_Battler.prototype.cparamBase = function(paramId) {
    if (paramId === 2 || paramId === 7 || paramId === 8 || paramId === 9) {
        return 0;
    }
    return 1;
};

Game_Battler.prototype.cparamPlus = function(paramId) {
    let value = 0;
    if (this.isActor()) {
        //装备
        let allItems;
        if (Imported.Alderpaw_MagicStone) {
            allItems = this.equips().concat(this.magicStones());
        }
        else {
            allItems = this.equips();
        }
        for (const item of allItems) {
            if (item && item.meta) {
                //处理每一类特性
                if (paramId === 2 && item.meta["Magic Critical Rate"]) {
                    value += parseFloat(eval(item.meta["Magic Critical Rate"]));  //魔法暴击注释里写+/-0.5这样的
                }
                if (paramId === 3 && item.meta["Extra Critical Damage Rate"]) {
                    value += parseFloat(eval(item.meta["Extra Critical Damage Rate"]));  //注释里写+/-0.5这样的
                }
                if (paramId === 4 && item.meta["Extra Heal Rate"]) {
                    value += parseFloat(eval(item.meta["Extra Heal Rate"]));  //注释里写+/-0.5这样的
                }
                if (paramId === 5 && item.meta["Craft Damage Rate"]) {
                    value += parseFloat(eval(item.meta["Craft Damage Rate"]));  //物理增伤倍率注释里写+/-0.5这样的
                }
                if (paramId === 6 && item.meta["Magic Damage Rate"]) {
                    value += parseFloat(eval(item.meta["Magic Damage Rate"]));  //魔法增伤倍率注释里写+/-0.5这样的
                }
                if (paramId === 7 && item.meta["Mp Absorb Rate"]) {
                    value += parseFloat(eval(item.meta["Mp Absorb Rate"]));
                }
                if (paramId === 8 && item.meta["Hp Absorb Rate"]) {
                    value += parseFloat(eval(item.meta["Hp Absorb Rate"]));
                }
                if (paramId === 9 && item.meta["Kill Tp Absorb Value"]) {
                    value += parseFloat(eval(item.meta["Kill Tp Absorb Value"]));
                }
                if (paramId === 10 && item.meta["Hit Tp Charge Rate"]) {
                    value += parseFloat(eval(item.meta["Hit Tp Charge Rate"]));
                }
                if (paramId === 11 && item.meta["Low Hp Craft Damage Rate"]) {
                    value += parseFloat(eval(item.meta["Low Hp Craft Damage Rate"]));
                }
                if (paramId === 12 && item.meta["Low Hp Magic Damage Rate"]) {
                    value += parseFloat(eval(item.meta["Low Hp Magic Damage Rate"]));
                }
                if (paramId === 13 && item.meta["High Hp Craft Damage Rate"]) {
                    value += parseFloat(eval(item.meta["High Hp Craft Damage Rate"]));
                }
                if (paramId === 14 && item.meta["High Hp Magic Damage Rate"]) {
                    value += parseFloat(eval(item.meta["High Hp Magic Damage Rate"]));
                }
            }
        }
    }
    //状态
    for (const stateId of this._states) {
        const item = $dataStates[stateId];
        if (item && item.meta) {
            //处理每一类特性
            if (paramId === 2 && item.meta["Magic Critical Rate"]) {
                value += parseFloat(eval(item.meta["Magic Critical Rate"]));  //魔法暴击注释里写+/-0.5这样的
            }
            if (paramId === 3 && item.meta["Extra Critical Damage Rate"]) {
                value += parseFloat(eval(item.meta["Extra Critical Damage Rate"]));  //注释里写+/-0.5这样的
            }
            if (paramId === 4 && item.meta["Extra Heal Rate"]) {
                value += parseFloat(eval(item.meta["Extra Heal Rate"]));  //注释里写+/-0.5这样的
            }
            if (paramId === 5 && item.meta["Craft Damage Rate"]) {
                value += parseFloat(eval(item.meta["Craft Damage Rate"]));  //物理增伤倍率注释里写+/-0.5这样的
            }
            if (paramId === 6 && item.meta["Magic Damage Rate"]) {
                value += parseFloat(eval(item.meta["Magic Damage Rate"]));  //魔法增伤倍率注释里写+/-0.5这样的
            }
            if (paramId === 7 && item.meta["Mp Absorb Rate"]) {
                value += parseFloat(eval(item.meta["Mp Absorb Rate"]));
            }
            if (paramId === 8 && item.meta["Hp Absorb Rate"]) {
                value += parseFloat(eval(item.meta["Hp Absorb Rate"]));
            }
            if (paramId === 9 && item.meta["Kill Tp Absorb Value"]) {
                value += parseFloat(eval(item.meta["Kill Tp Absorb Value"]));
            }
            if (paramId === 10 && item.meta["Hit Tp Charge Rate"]) {
                value += parseFloat(eval(item.meta["Hit Tp Charge Rate"]));
            }
            if (paramId === 11 && item.meta["Low Hp Craft Damage Rate"]) {
                value += parseFloat(eval(item.meta["Low Hp Craft Damage Rate"]));
            }
            if (paramId === 12 && item.meta["Low Hp Magic Damage Rate"]) {
                value += parseFloat(eval(item.meta["Low Hp Magic Damage Rate"]));
            }
            if (paramId === 13 && item.meta["High Hp Craft Damage Rate"]) {
                value += parseFloat(eval(item.meta["High Hp Craft Damage Rate"]));
            }
            if (paramId === 14 && item.meta["High Hp Magic Damage Rate"]) {
                value += parseFloat(eval(item.meta["High Hp Magic Damage Rate"]));
            }
        }
    }
    return value;
};

//对于伤害倍率等属性，通过加法累加，如1.0+0.2=1.2
Game_Battler.prototype.cparamBasePlus = function(paramId) {
    return Math.max(0, this.cparamBase(paramId) + this.cparamPlus(paramId));
};

Game_Battler.prototype.cparamRate = function(paramId) {
    let value = 1.0;
    if (this.isActor()) {
        //装备
        let allItems;
        if (Imported.Alderpaw_MagicStone) {
            allItems = this.equips().concat(this.magicStones());
        }
        else {
            allItems = this.equips();
        }
        for (const item of allItems) {
            if (item && item.meta) {
                if (paramId === 0 && item.meta["Craft DelayST Rate"]) {
                    value *= parseFloat(eval(item.meta["Craft DelayST Rate"]));  //减10%就在注释里写0.9，乘算，防止能降到0
                }
                if (paramId === 1 && item.meta["CastST Rate"]) {
                    value *= parseFloat(eval(item.meta["CastST Rate"]));
                }
            }
        }
        //状态
        for (const stateId of this._states) {
            const item = $dataStates[stateId];
            if (item && item.meta) {
                if (paramId === 0 && item.meta["Craft DelayST Rate"]) {
                    value *= parseFloat(eval(item.meta["Craft DelayST Rate"]));  //减10%就在注释里写0.9，乘算，防止能降到0
                }
                if (paramId === 1 && item.meta["CastST Rate"]) {
                    value *= parseFloat(eval(item.meta["CastST Rate"]));
                }
            }
        }
    }
    return value;
};

//对于硬直倍率等属性，通过乘法递减，如1.0*0.9=0.9
Game_Battler.prototype.cparamBaseRate = function(paramId) {
    return Math.max(0, this.cparamBase(paramId) * this.cparamRate(paramId));
};

Game_Battler.prototype.cparamMin = function(paramId) {
    return 0;
};

Game_Battler.prototype.cparamMax = function(/*paramId*/) {
    return 100;
};

Game_Battler.prototype.cparam = function(paramId) {
    let value = 0;
    //只有0和1两个自定义参数是乘算
    if (paramId <= 1) {
        value = this.cparamBaseRate(paramId);
    }
    else {
        value = this.cparamBasePlus(paramId);
    }
    const maxValue = this.cparamMax(paramId);
    const minValue = this.cparamMin(paramId);
    return value.clamp(minValue, maxValue);
};


// ==================== //
/*   状态和buff回合处理   */
// ==================== //

/* 统一在行动后结算回合数，而不是回合结束时 */
Game_Battler.prototype.updateStateTurns = function(timing) {
	for (const stateId of this._states) {
		if ($dataStates[stateId].autoRemovalTiming != timing)
			continue;
		if (this._stateTurns[stateId] > 0) {
			this._stateTurns[stateId]--;
		}
	}
};

//轮到行动回合时，额外判定的一些状态，如奥兹特性
Game_Battler.prototype.extraEffectOnTurnEnd = function() {
    //条件：奥兹获得了相应的特性技能，且在战斗中
    if (!$gameParty.inBattle()) {
        return;
    }
}

//角色行动结束后执行的函数
Game_Battler.prototype.onAllActionsEnd = function() {
    this.clearResult();
    this.updateStateTurns(1);    //只更新“行动计数”的状态，以及buff
    this.updateBuffTurns();
    this.removeStatesAuto(1);
    this.removeBuffsAuto();
};

//轮到角色行动时执行的函数，原本无论怎么设定，buff和状态都在此处更新，修改后只有设定为回合计数的状态才在此处更新
Game_Battler.prototype.onTurnEnd = function() {
    this.clearResult();
    this.regenerateAll();
	this.updateStateTurns(2);    //只更新“回合计数”的状态，用于无法行动的状态，防止死锁
    this.removeStatesAuto(2);
    this.extraEffectOnTurnEnd();
};


// ==================== //
/* 设定敌人等级及是否为Boss */
// ==================== //

const _alderpaw_ctb_gameEnemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
	_alderpaw_ctb_gameEnemy_initMembers.call(this);
	this._isBoss = false;
    this.level = 1;
}

const _alderpaw_ctb_gameEnemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_alderpaw_ctb_gameEnemy_setup.call(this, enemyId, x, y);
	if (this.enemy() && this.enemy().meta) {
        if (this.enemy().meta["Boss"]) {
            this._isBoss = true;
        }
		if (this.enemy().meta["Level"]) {
            this.level = parseInt(this.enemy().meta["Level"]);
        }
	}
}

Game_Enemy.prototype.isBoss = function() {
	return this._isBoss;
}


// ==================== //
/* 防护罩ui，功能写在VisuMZ插件配置里 */
// ==================== //
class Sprite_Gauge_Shield extends Sprite_Gauge {
    currentValue() {
        return this._battler._shieldHp;
    }

    currentMaxValue() {
        return 2000;
    }

    label() {
        return "HP护盾";
    }

    gaugeColor1() {
        return ColorManager.ctGaugeColor1();
    }

    gaugeColor2() {
        return ColorManager.ctGaugeColor2();
    }

    labelFontSize() {
        return $gameSystem.mainFontSize() - 6;
    }

    labelY() {
        return -3;
    }

    drawLabel() {
        const label = this.label();
        const x = 16 + this.labelOutlineWidth() / 2;
        const y = this.labelY();
        const width = this.bitmapWidth();
        const height = this.textHeight();
        this.setupLabelFont();
        this.bitmap.paintOpacity = this.labelOpacity();
        this.bitmap.drawText(label, x, y, width, height, "left");
        this.bitmap.paintOpacity = 255;
    }
}

// ==================== //
/* 技能后面的范围图标显示 */
// ==================== //
Window_SkillList.prototype.drawItem = function(index) {
    const skill = this.itemAt(index);
    if (skill) {
        const costWidth = this.costWidth();
        const rect = this.itemLineRect(index);
        this.changePaintOpacity(this.isEnabled(skill));
        this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
        this.drawSkillCost(skill, rect.x - 2 * ImageManager.iconWidth - 8, rect.y, rect.width);
        if (skill.meta["后缀图标"]) {
            const definedIcons = skill.meta["后缀图标"].split(",");
            const effectIconId = parseInt(definedIcons[0]) || 0;
            const rangeIconId = parseInt(definedIcons[1]) || 0;
            this.drawTextEx(`\\I[${effectIconId}]\\I[${rangeIconId}]`, rect.x + rect.width - 2 * ImageManager.iconWidth - 4, rect.y, ImageManager.iconWidth);
        }
        this.changePaintOpacity(1);
    }
};

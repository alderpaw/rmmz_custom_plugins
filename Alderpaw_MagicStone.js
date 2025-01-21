//=============================================================================
// RPG Maker MZ - 魔石系统
//=============================================================================

/*:
 * @target MZ
 * @plugindesc [Version 1.1] 类似于空零碧或者闪轨的回路系统
 * @author Alderpaw
 * @url https://github.com/alderpaw/rmmz_custom_plugins
 * 
 * @param magicEquipSettingParent
 * @text 魔石装备定义
 *
 * @param magicStoneEtypeId
 * @text 普通魔石的装备类型ID
 * @desc 普通魔石的装备类型ID
 * @default 5
 * @parent magicEquipSettingParent
 * 
 * @param coreMagicStoneEtypeId
 * @text 核心魔石的装备类型ID
 * @desc 核心魔石的装备类型ID（开启核心魔石选项时才有用）
 * @default 6
 * @parent magicEquipSettingParent
 * 
 * @param isCoreMagicStoneUsed
 * @text 是否启用核心魔石
 * @desc 若启用核心魔石，则0号魔石槽固定为“核心魔石”装备类型。这样可以允许在中心槽位装备更强大的独特魔石。
 * @type boolean
 * @default false
 * @parent magicEquipSettingParent
 *
 * @param magicSystemSettingParent
 * @text 魔石系统设置
 * 
 * 
 * @param magicStoneCommandName
 * @text 主菜单中魔石界面的名字
 * @desc 主菜单中魔石界面的名字
 * @type string
 * @default 魔石
 * @parent magicSystemSettingParent
 * 
 * @param isMagicSystemEnabled
 * @text 主菜单启用魔石系统
 * @desc 魔石系统是否启用。只影响开局时的可用性，后面可以使用插件指令随意开关。
 * @type boolean
 * @default true
 * @parent magicSystemSettingParent
 * 
 * @param magicSkillTypeId
 * @text 属于魔法的技能类型ID
 * @desc 将哪个技能类型ID视作魔法？只有填写的这个技能类型会出现在本系统的魔法列表里。
 * @type number
 * @default 2
 * @parent magicSystemSettingParent
 * 
 * @param isElementPointBasedMagic
 * @text 是否开启配魔法系统
 * @desc 开启配魔法系统时，会通过各魔石链上的属性点数之和来配出魔法表上定义的魔法；否则就是魔石上直接附带魔法的模式。
 * @type boolean
 * @default true
 * @parent magicSystemSettingParent
 * 
 * @param isInnerUnlockEnabled
 * @text 是否支持菜单内解锁魔石槽
 * @desc 是否支持直接在菜单内解锁魔石槽，消耗的材料在插件参数中指定。即使这一项选否，插件参数里的魔石解锁消耗也必须按要求填上。
 * @type boolean
 * @default true
 * @parent magicSystemSettingParent
 * 
 * @param isOrderUnlockRequired
 * @text 是否必须按顺序解锁魔石槽
 * @desc 选true时一条链上的魔石槽必须按从中心到最远处的顺序来解锁，否则无限制。仅适用于菜单内解锁的场景。
 * @type boolean
 * @default true
 * @parent magicSystemSettingParent
 * 
 * @param validElementItems
 * @text 参与本系统的元素
 * @desc 数据库中哪些元素会参与本系统的计算？例如有时游戏中会有不参与魔法系统的“物理”属性，需要排除。
 * @type struct<validElementItem>[]
 * @default []
 * @parent magicSystemSettingParent
 * 
 * @param magicTable
 * @text 魔法表设置
 * @desc 只有使用配魔法系统时需要填。
 * @type struct<magicIngredient>[]
 * @default []
 * @parent magicSystemSettingParent
 * 
 * @param magicSlotLineSettingParent
 * @text 魔石槽和链条设置
 * 
 * @param actorMagicSlotConfigs
 * @text 各角色的魔石槽和链条
 * @desc 在此处设置各角色的魔石链条，每名角色可设置一定数量的魔石槽位。设置时必须遵循一定的规则，参考帮助文档。
 * @type struct<magicSlotConfig>[]
 * @default []
 * @parent magicSlotLineSettingParent
 * 
 * @param magicSlotLockIconId
 * @text 未解锁魔石槽的图标
 * @desc 当魔石槽未解锁时，选择一个图标来表示此状态
 * @type icon
 * @default 83
 * @parent magicSlotLineSettingParent
 * 
 * @param magicSlotArrowIconId
 * @text 指向魔石槽的箭头图标
 * @desc 魔石界面中，为了清晰，会有箭头指向当前选中的魔石槽，请选择箭头的图标。
 * @type icon
 * @default 74
 * @parent magicSlotLineSettingParent
 * 
 * @param magicStoneTerms
 * @text 术语定义
 * 
 * @param openMagicTableText
 * @text 提示打开魔法表
 * @desc 魔石界面中用于提示玩家打开魔法表的文本内容。
 * @type string
 * @default 按Tab键查看魔法表
 * @parent magicStoneTerms
 * 
 * @param switchMagicListText
 * @text 提示查看当前魔法
 * @desc 魔石界面中用于提示玩家查看当前角色已有魔法的文本。
 * @type string
 * @default 按Ctrl键查看当前魔法
 * @parent magicStoneTerms
 * 
 * @param magicLineText
 * @text 魔石链界面的标题
 * @desc 魔石链界面的标题文本。
 * @type string
 * @default 魔石驱动器
 * @parent magicStoneTerms
 * 
 * @command equipMagicStone
 * @text 装备魔石
 * @desc 指定一名角色，在第x号魔石槽装备一块魔石。不满足条件时会装备失败。
 *
 * @arg actorId
 * @text 角色ID
 * @desc 角色在数据库中的ID。
 * @type number
 * @default 1
 * 
 * @arg slotId
 * @text 魔石槽ID
 * @desc 魔石槽ID，从0开始到N-1（N为魔石槽数量）。
 * @type number
 * @default 0
 * 
 * @arg magicStoneId
 * @text 魔石装备ID
 * @desc 要装备的那件魔石在数据库里的ID。
 * @type armor
 * @default 0
 * 
 * @command unequipMagicStone
 * @text 卸下魔石
 * @desc 指定一名角色，卸下第x号魔石槽所装备的魔石。
 *
 * @arg actorId
 * @text 角色ID
 * @desc 角色在数据库中的ID。
 * @type number
 * @default 1
 * 
 * @arg slotId
 * @text 魔石槽ID
 * @desc 魔石槽ID，从0开始到N-1（N为魔石槽数量）。
 * @type number
 * @default 0
 * 
 * @command unlockMagicSlot
 * @text 解锁一个魔石槽位
 * @desc 解锁第x号魔石槽。不需要材料，强制解锁，可用于在事件中根据自定义条件解锁魔石槽。
 *
 * @arg actorId
 * @text 角色ID
 * @desc 角色在数据库中的ID。
 * @type number
 * @default 1
 * 
 * @arg slotId
 * @text 魔石槽ID
 * @desc 魔石槽ID，从0开始到N-1（N为魔石槽数量）。
 * @type number
 * @default 0
 * 
 * @command enableMagicStoneMenu
 * @text 启用魔石界面菜单
 * @desc 使魔石系统在主菜单界面变得可用。
 *            
 * @command disableMagicStoneMenu
 * @text 禁用魔石界面菜单
 * @desc 使魔石系统在主菜单界面变得不可用。
 * 
 *
 * @help Alderpaw_MagicStone.js
 * 
 * 实现一套轨迹系列的导力器系统，这里称之为魔石系统（Magic Stone System）。
 * 支持空零碧的配魔法型和闪轨的回路直接附带魔法型。
 * 
 * ********** 系统简介 **********
 * 每名角色会拥有数个可装备“魔石”的新装备槽。以某个魔石槽为共同起点，这些魔石会组
 * 成1条或多条魔石链，如下所示，这名角色一共有3条魔石链，7个魔石槽，3条链起点相同。
 *       2
 *      /
 *     1
 *    /
 *   0 —— 3
 *    \
 *     4—— 5 —— 6
 * 基于魔石槽和魔石链，可以构建“配魔法”系统（空零碧，黎轨是配被动）或“魔法镶嵌”
 * （闪轨）系统。两种系统有以下共同点：
 * 1. 有一个魔石槽是所有链条的共同起点，称之为0号位置。可以选择将0号位置设定为“核心
 * 魔石”装备栏，让其提供更多的属性，甚至作为可成长装备（例如装备此核心魔石的角色随等
 * 级提升可学会更多的魔法）。当然0号位置也可以和其他位置一样，都使用普通魔石。
 * 2. 同一魔石在同一条链上只能装备1个，但是在不同链上则可以装备多个，这是多链的好处。
 * 3. 魔石槽解锁时增加角色的MP上限，且增加量与魔石槽所在的深度相关，这是长链的好处。
 * 4. 部分魔石槽会有属性限制，也就是只能装备特定元素属性的魔石，用于体现角色特点。
 * 
 * 在“配魔法”系统中，还有以下特点：
 * 每个魔石上会附带一定的“元素属性点”，例如“火×2”、“风×4”，同一链条上的属性点会进行
 * 累加，并根据一张魔法表来决定玩家能使用的魔法种类。链越长能配出的魔法越多。位于中
 * 间的0号魔石槽参与所有链的属性点累加计算，玩家最终能用的魔法是所有链条结果的并集。
 * 
 * 在“魔法镶嵌”系统中，还有以下特点：
 * 不再需要配魔法，部分魔石装备后可直接获得魔法。如果启用核心魔石，可以考虑为核心魔
 * 石设置多个附带的魔法，并且这些魔法需要随着人物等级提升来逐渐获得，体现可成长性。
 * 在这种系统下，链长的作用被大幅削减，只剩下提供MP上限；反倒是多链更有优势，能装备
 * 多个相同的强力魔石。
 * 
 * ********** 插件参数说明 **********
 * 1. 装备类型设定
 * 请在数据库中定义“魔石”这一装备类型，然后将其类型ID填写到插件参数里。这样该类型的
 * 装备就会被这个插件认为是魔石。如果启用核心魔石的话，也请同样设置，此时0号位置的魔
 * 石槽只能装备核心魔石。
 * 
 * 2. 魔石界面设定
 * 可以选择让魔石系统直接在主菜单中可用，也可以游戏中用插件指令启用。
 * 
 * 3. 魔石系统设定
 * （1）选择一种技能类型，本插件会将其视作魔法，其他类型的技能不会参与处理。例如，即
 * 使你将其他类型的技能写在了魔法合成表里，也无法配出该技能。
 * （2）若开启配魔法系统，需要填写一张魔法表，指定每种魔法需要多少属性点来配出来。系统
 * 会对角色的每条魔石链分别计算，任意一条链满足条件就能使用相应的魔法。如果不开启配魔
 * 法系统，则魔法的学习依赖于魔石上直接附带的魔法，此时魔石槽更像一个饰品栏。
 * （3）必须指定插件中使用哪些元素属性。因为数据库里定义的攻击属性有时包括物理属性，
 * 可能不希望魔石系统使用，所以这里可以选择你想要的那些属性来配魔法和构造属性限定槽。
 * 
 * 4. 需要在插件参数里配置角色的魔石槽和链形状。设置的时候必须遵循以下几点规则。如果
 * 没有按规则设定的话，会导致解析失败。虽然看起来复杂，但本质很简单，按照例子写就行：
 * （1）假设角色有N个魔石槽，则魔石槽从0开始编号，一直到N-1。设置魔石链形状时，用二维
 * 数组的方式书写，例如[[0,1,2],[0,3,4,5],[0,6]]，这代表了角色有3条魔石链，第1条链
 * 由0号魔石槽-1号魔石槽-2号魔石槽串联而成，第2条链由0号-3号-4号-5号魔石槽串联而成，
 * 第3条链则由0号-6号魔石槽串联而成。注意，每条链的起始点必须是0，其余的魔石槽ID需要
 * 按照顺序在上述的二维数组里出现，例如你不能写成[[0,3],[0,1,2]]，因为3必须在1和2之
 * 后出现。另外，每条链至少有2个魔石槽ID，也就是说最短的链是中心的0号魔石槽单独连一个
 * 其他槽位。最后请一定保证编号和设定的魔石槽数量能对应上，0以外的编号不要出现多次。
 * （2）需要为每一个魔石槽设置它的限制属性。设置为0表示无限制，设置为x表示只能装备所属
 * 元素属性的ID为x的魔石。注意设置时是和0~N-1号魔石槽一一对应的。
 * （3）需要为每一个魔石槽设置它初始是否已解锁。设置为1表示已解锁，设置为0表示需要在游
 * 戏里解锁。注意设置时是和0~N-1号魔石槽一一对应的。
 * （4）需要为每一个魔石槽设置它的解锁费用。依次填入解锁每个槽位所需的物品ID及其数量，
 * 一般来说越深的魔石槽所需的解锁材料应该越多。注意设置时是和0~N-1号魔石槽一一对应的。
 * （5）需要为每一个魔石槽设置解锁后它能提供给角色的MP上限加成。对于初始就已解锁的，其
 * 加成会直接生效。注意设置时是和0~N-1号魔石槽一一对应的。
 * （6）每名角色至少要有1个魔石槽，否则会报错。
 * 
 * ********** NOTETAG **********
 * 为了实现系统功能，提供了以下写在装备备注栏的标签。
 * 
 * ---
 * <Base Element Id: x>
 * 用法：填写在魔石装备的备注栏
 * 作用：将该装备指定为属于第x号(x≥1)元素的魔石。
 * 这样某些有属性限定的魔石槽就只能装备这种属性的魔石了。
 * 示例：<Base Element Id: 3>将这件装备指定为属于数据库3号属性的魔石。
 * ---
 * 
 * ---
 * <Element Points: {"x": a, "y": b, ......}>
 * 填写位置：魔石装备的备注栏
 * 作用：为该魔石设置属性点数，用于配魔法。x和y表示第x和y号元素，a和b是对应
 * 属性点的值。注意，x和y必须用英文双引号括起来。
 * 示例：<Element Points: {"3": 2, "4": 1, ......}>表示这件装备提供
 * 2点3号属性值，1点4号属性值。
 * ---
 * 
 * ---
 * <Attached Magics: id1, lv1, id2, lv2, ......>
 * 填写位置：魔石装备的备注栏
 * 作用：为该魔石设置附带的魔法。每一组id和lv连起来写，
 * 表示装备者达到lv时可以使用这个技能id对应的魔法。
 * 当你使用核心魔石时，可以利用这个备注实现其“可成长性”。
 * 如果希望无条件附带魔法，把每个lv都写成1就可以了。
 * 示例：<Attached Magics: 5, 3, 12, 8>表示装备这件魔石的时候，角色在3级时可使用
 * ID为5的技能，在8级时可使用ID为12的技能。
 * ---
 * 
 * ********** 插件指令 **********
 * 提供了以下几个插件指令，可在事件中调用：
 * 1. 装备魔石
 * 输入角色ID、魔石槽ID和装备ID，将指定的魔石装备到对应槽位。这一指令会检测魔石
 * 是否能装备到该槽位，如果不能的话就不会产生任何效果。
 * 
 * 2. 卸下魔石
 * 输入角色ID和魔石槽ID，将魔石槽上的魔石卸下。
 * 
 * 3. 解锁指定魔石槽
 * 输入角色ID和魔石槽ID，将对应魔石槽解锁。不消耗插件参数里指定的材料，无视任何
 * 限制条件，可配合事件实现自己控制的魔石槽解锁策略（比如在特定NPC处解锁）。
 * 
 * 4. 启用魔石界面
 * 使魔石系统在主菜单里变得可用。
 * 
 * 5. 禁用魔石界面
 * 使魔石系统在主菜单里变得不可用。
 * 
 */

/*~struct~magicSlotConfig:
 * @param actorId
 * @text 角色ID
 * @type number
 * @default 1
 * @desc 该角色在数据库中的ID。
 *
 * @param magicSlotNum
 * @text 魔石槽数量
 * @type number
 * @default 7
 * @desc 该角色拥有的魔石槽数量。
 *
 * @param magicLines
 * @text 魔石链条形状
 * @type text
 * @default [[0, 1, 2, 3], [0, 4, 5], [0, 6]]
 * @desc 设置魔石链条的形状，必须按规则写，否则无法解析。
 * 
 * @param magicSlotElementTypeList
 * @text 每个魔石槽的限制属性
 * @type number[]
 * @default []
 * @desc 每个魔石槽的限制属性，
 * 数量上必须和该角色拥有的魔石槽数量一致，并且按魔石槽ID顺序来填。
 * 
 * @param magicSlotEnabledList
 * @text 每个魔石槽初始是否开放
 * @type number[]
 * @default []
 * @desc 每个魔石槽初始是否开放，1表示开放0表示不开放。
 * 数量上必须和该角色拥有的魔石槽数量一致，并且按魔石槽ID顺序来填。
 * 
 * @param magicSlotCostList
 * @text 每个魔石槽的解锁费用
 * @type struct<unlockMagicSlotCost>[]
 * @default []
 * @desc 每个魔石槽的解锁费用，
 * 数量上必须和该角色拥有的魔石槽数量一致，并且按魔石槽ID顺序来填。
 * 
 * @param magicSlotMpIncreaseList
 * @text 每个魔石槽能提供的MP上限值
 * @type number[]
 * @default []
 * @desc 每个魔石槽能提供多少MP上限，
 * 数量上必须和该角色拥有的魔石槽数量一致，并且按魔石槽ID顺序来填。
 * 
 */

/*~struct~unlockMagicSlotCost:
 * @param itemId
 * @text 物品ID
 * @type number
 * @default 1
 * @desc 解锁槽位要消耗哪种物品。
 * 
 * @param itemNum
 * @text 物品数量
 * @type number
 * @default 1
 * @desc 解锁槽位要消耗多少个该种物品。
 */

/*~struct~validElementItem:
 * @param elementId
 * @text 元素属性ID
 * @type number
 * @default 1
 * @desc 元素在数据库里的属性ID
 * 
 * @param elementIconId
 * @text 元素图标ID
 * @type number
 * @default 1
 * @desc 元素对应的图标ID
 * 
 * @param elementColorId
 * @text 元素颜色十六进制码
 * @type string
 * @default #808080
 * @desc 元素对应的十六进制颜色码，需要包含#号，在画魔石槽边框时有用。
 */

/*~struct~magicIngredient:
 * @param skillId
 * @text 技能ID
 * @type number
 * @default 1
 * @desc 这个魔法对应的技能Id
 * 
 * @param simpleSkillDesc
 * @text 技能简单描述
 * @type string
 * @default 攻击敌方单体
 * @desc 简短地描述这个魔法。不要太长，否则展示魔法表的界面可能放不下。
 * 
 * @param elementPointList
 * @text 需要的元素属性点数
 * @type struct<elementPointRequirement>[]
 * @default []
 * @desc 配出这个魔法需要多少种元素属性，每种属性的点数要达到多少？
 */

/*~struct~elementPointRequirement:
 * @param elementId
 * @text 元素属性ID
 * @type number
 * @default 1
 * @desc 为了配出魔法，需要这种元素属性。
 * 
 * @param elementPoint
 * @text 元素属性点数
 * @type number
 * @default 1
 * @desc 为了配出魔法，需要这种元素属性的点数达到多少？
 */


//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Alderpaw = Alderpaw || {}; 
var Imported = Imported || {};
Imported.Alderpaw_MagicStone = true;

const magicStone_parameters = PluginManager.parameters('Alderpaw_MagicStone');
Alderpaw.magicStoneEtypeId = Number(magicStone_parameters['magicStoneEtypeId'] || 5);
Alderpaw.coreMagicStoneEtypeId = Number(magicStone_parameters['coreMagicStoneEtypeId'] || 6);
Alderpaw.magicStoneCommandName =  String(magicStone_parameters['magicStoneCommandName']);
Alderpaw.isMagicSystemEnabled = magicStone_parameters['isMagicSystemEnabled'] == "true" || false;
Alderpaw.isElementPointBasedMagic = magicStone_parameters['isElementPointBasedMagic'] == "true" || false;
Alderpaw.isCoreMagicStoneUsed = magicStone_parameters['isCoreMagicStoneUsed'] == "true" || false;
Alderpaw.actorMagicSlotConfigs = JSON.parse(magicStone_parameters['actorMagicSlotConfigs']) || [];
Alderpaw.validElementItems = JSON.parse(magicStone_parameters['validElementItems']) || [];
Alderpaw.magicSlotLockIconId = Number(magicStone_parameters['magicSlotLockIconId']);
Alderpaw.magicSlotArrowIconId = Number(magicStone_parameters['magicSlotArrowIconId']);
Alderpaw.magicSkillTypeId = Number(magicStone_parameters['magicSkillTypeId']);
Alderpaw.magicTable = JSON.parse(magicStone_parameters['magicTable']) || [];
Alderpaw.isInnerUnlockEnabled = magicStone_parameters["isInnerUnlockEnabled"] == "true" || false;
Alderpaw.isOrderUnlockRequired = magicStone_parameters["isOrderUnlockRequired"] == "true" || false;
Alderpaw.openMagicTableText = magicStone_parameters["openMagicTableText"];
Alderpaw.switchMagicListText = magicStone_parameters["switchMagicListText"];
Alderpaw.magicLineText = magicStone_parameters["magicLineText"];


//=============================================================================
// ** PLUGIN COMMANDS
//=============================================================================
PluginManager.registerCommand("Alderpaw_MagicStone", 'equipMagicStone', args => {
    const actor = $gameActors.actor(+args.actorId);
    const slotId = +args.slotId;
    const magicStoneId = +args.magicStoneId;
    const item = $dataArmors[magicStoneId];
    if (actor && slotId < actor._magicSlotNum && actor._magicSlotEnabledList[slotId] && actor.canEquipMagicStone(item, slotId)) {
        actor.changeMagicStone(slotId, item);
    }
});

PluginManager.registerCommand("Alderpaw_MagicStone", 'unequipMagicStone', args => {
    const actor = $gameActors.actor(+args.actorId);
    const slotId = +args.slotId;
    if (actor && slotId < actor._magicSlotNum) {
        actor.changeMagicStone(slotId, null);
    }
});

PluginManager.registerCommand("Alderpaw_MagicStone", 'enableMagicStoneMenu', args => {
    $gameSystem.setEnableMagicStoneMenu();
});

PluginManager.registerCommand("Alderpaw_MagicStone", 'disableMagicStoneMenu', args => {
    $gameSystem.setDisableMagicStoneMenu();
});

PluginManager.registerCommand("Alderpaw_MagicStone", 'unlockMagicSlot', args => {
    const actor = $gameActors.actor(+args.actorId);
    const slotId = +args.slotId;
    if (actor && slotId < actor._magicSlotNum) {
        const mpIncreased = actor._magicSlotMpIncreaseList[slotId];
        actor._magicSlotEnabledList[slotId] = 1;
        actor.addParam(1, mpIncreased);
        actor.gainMp(mpIncreased);
    }
});


//=============================================================================
// ** 系统级修改
//=============================================================================
const alderpaw_gameSystem_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    alderpaw_gameSystem_initialize.call(this);
    this._enableMagicStoneMenu = Alderpaw.isMagicSystemEnabled;
};

Game_System.prototype.setEnableMagicStoneMenu = function() {
    this._enableMagicStoneMenu = true;
};

Game_System.prototype.setDisableMagicStoneMenu = function() {
    this._enableMagicStoneMenu = false;
};

Game_System.prototype.isMagicStoneMenuEnabled = function() {
    return this._enableMagicStoneMenu;
};

if (!Imported.VisuMZ_1_MainMenuCore) {
    const _alerpaw_magicStone_windowMenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
    Window_MenuCommand.prototype.addMainCommands = function() {
        _alerpaw_magicStone_windowMenuCommand_addMainCommands.call(this);
        this.addCommand(Alderpaw.magicStoneCommandName, "magicStone", $gameSystem.isMagicStoneMenuEnabled());
    };
    
    const _alderpaw_magicStone_sceneMenu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _alderpaw_magicStone_sceneMenu_createCommandWindow.call(this);
        this._commandWindow.setHandler("magicStone", this.commandPersonal.bind(this));
    };
    
    const _alderpaw_magicStone_sceneMenu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function() {
        _alderpaw_magicStone_sceneMenu_onPersonalOk.call(this);
        if (this._commandWindow.currentSymbol() === "magicStone") {
            SceneManager.push(Scene_MagicStone);
        }
    };
}

//=============================================================================
// ** Game_Actor类的修改
//=============================================================================

Game_Actor = class extends Game_Actor {
    setup(actorId) {
        super.setup(actorId);
        /* 解析插件参数 */
        /* 独立于equipSlot，新建一批magicSlot */
        const allActorMagicSlotConfigList = Alderpaw.actorMagicSlotConfigs;
        for (const magicSlotConfig of allActorMagicSlotConfigList) {
            const magicSlotConfigItem = JSON.parse(magicSlotConfig);
            if (actorId == magicSlotConfigItem.actorId) {
                // console.log(JSON.parse(magicSlotConfigItem.magicLines));
                this._lineElementPoints = [];   //每条链的元素点数，每一项是一个元素ID->元素点数的字典
                this._magicSlotNum = parseInt(magicSlotConfigItem.magicSlotNum);
                this._magicLines = JSON.parse(magicSlotConfigItem.magicLines);
                this._magicSlotElementTypeList = JSON.parse(magicSlotConfigItem.magicSlotElementTypeList).map(Number);
                this._magicSlotEnabledList = JSON.parse(magicSlotConfigItem.magicSlotEnabledList).map(Number);
                this._magicSlotCostList = JSON.parse(magicSlotConfigItem.magicSlotCostList);
                this._magicSlotMpIncreaseList = JSON.parse(magicSlotConfigItem.magicSlotMpIncreaseList).map(Number);
                //初始的MP上限增加量
                for (let i = 0; i < this._magicSlotNum; i++) {
                    if (this._magicSlotEnabledList[i]) {
                        this.addParam(1, this._magicSlotMpIncreaseList[i]);
                        this.gainMp(this._magicSlotMpIncreaseList[i]);
                    }
                }
                for (let i = 0; i < this._magicLines.length; i++) {
                    let currentLineElementPointItem = {};
                    for (const strValidElementItem of Alderpaw.validElementItems) {
                        const validElementItem = JSON.parse(strValidElementItem);
                        currentLineElementPointItem[validElementItem.elementId.toString()] = 0;
                    }
                    this._lineElementPoints.push(currentLineElementPointItem);
                }
                this.initMagicStones(new Array(this._magicSlotNum).fill(0));
            }
        }
    }

    isMagicSlotChangeOk(slotId) {
        return (
            !this.isEquipTypeLocked(this.magicSlots()[slotId]) &&
            !this.isEquipTypeSealed(this.magicSlots()[slotId]) &&
            this._magicSlotEnabledList[slotId]
        );
    }

    canEquipMagicStone(item, slotId) {
        if (!item) {
            return false;
        }
        if ((slotId > 0 || (slotId === 0 && !Alderpaw.isCoreMagicStoneUsed)) && item.etypeId !== Alderpaw.magicStoneEtypeId) {
            return false;
        }
        if (slotId === 0 && Alderpaw.isCoreMagicStoneUsed && item.etypeId !== Alderpaw.coreMagicStoneEtypeId) {
            return false;
        }
        //不满足属性限定孔
        if (this._magicSlotElementTypeList[slotId] > 0 && this._magicSlotElementTypeList[slotId] != parseInt(item.meta["Base Element Id"])) {
            return false;
        }
        //一条链上不能装备2个相同的
        const magicStones = this.magicStones();
        let lineIndex = 0;
        for (let i = 0; i < this._magicLines.length; i++) {
            if (this._magicLines[i].includes(slotId)) {
                lineIndex = i;
                break;
            }
        }
        for (const lineSlotId of this._magicLines[lineIndex]) {
            if (lineSlotId !== slotId && magicStones[lineSlotId] != null && magicStones[lineSlotId].id === item.id) {
                return false;
            }
        }
        return this.canEquipArmor(item);
    }

    changeMagicStone(slotId, item) {
        const previousItem = this.equips()[slotId];
        if (
            this.tradeItemWithParty(item, this.magicStones()[slotId]) &&
            (!item || this.magicSlots()[slotId] === item.etypeId)
        ) {
            this._magicStones[slotId].setObject(item);
            this.refresh();
        }
        //遗忘之前装备上的魔法
        if (previousItem != null) {
            if (previousItem.meta["Attached Magics"]) {
                let skill_ids_and_levels = previousItem.meta["Attached Magics"].split(",");
                const actorClass = this.currentClass();
                for (let i = 0; i < skill_ids_and_levels.length; i += 2) {
                    let skill_id = parseInt(skill_ids_and_levels[i]);
                    let level = parseInt(skill_ids_and_levels[i + 1]);
                    if (this.level >= level) {
                        let shouldForget = true;
                        for (const learningSkillItem of actorClass.learnings) {
                            if (learningSkillItem.skillId === skill_id) {
                                shouldForget = false;
                                break;
                            }
                        }
                        if (shouldForget) {
                            this.forgetSkill(skill_id);
                        }
                    }
                }
            }
        }
        //学会新装备上的魔法
        if (item != null) {
            if (item.meta["Attached Magics"]) {
                let skill_ids_and_levels = item.meta["Attached Magics"].split(",");
                for (let i = 0; i < skill_ids_and_levels.length; i += 2) {
                    let skill_id = parseInt(skill_ids_and_levels[i]);
                    let level = parseInt(skill_ids_and_levels[i + 1]);
                    if (this.level >= level) {
                        this.learnSkill(skill_id);
                    }
                }
            }
        }
    }

    //升级时可能学会魔法
    levelUp() {
        super.levelUp();
        for (const item of this.magicStones()) {
            if (item != null) {
                if (item.meta["Attached Magics"]) {
                    let skill_ids_and_levels = item.meta["Attached Magics"].split(",");
                    for (let i = 0; i < skill_ids_and_levels.length; i += 2) {
                        let skill_id = parseInt(skill_ids_and_levels[i]);
                        let level = parseInt(skill_ids_and_levels[i + 1]);
                        if (this.level >= level) {
                            this.learnSkill(skill_id);
                        }
                    }
                }
            }
        }
    }

    forceChangeMagicStone(slotId, item) {
        this._magicStones[slotId].setObject(item);
        this.releaseUnequippableMagicStones(true);
        this.refresh();
    };

    releaseUnequippableMagicStones(forcing) {
        for (;;) {
            let slots = this.magicSlots();
            let magicStones = this.magicStones();
            let changed = false;
            for (let i = 0; i < magicStones.length; i++) {
                let item = magicStones[i];
                if (item && (!this.canEquip(item) || item.etypeId !== slots[i])) {
                    if (!forcing) {
                        this.tradeItemWithParty(null, item);
                    }
                    this._magicStones[i].setObject(null);
                    changed = true;
                }
            }
            if (!changed) {
                break;
            }
        }
    };

    initMagicStones(magicStones) {
        const slots = this.magicSlots();
        const maxSlots = slots.length;
        this._magicStones = [];
        for (let i = 0; i < maxSlots; i++) {
            this._magicStones[i] = new Game_Item();
        }
        for (let j = 0; j < magicStones.length; j++) {
            if (j < maxSlots) {
                this._magicStones[j].setEquip(slots[j] === 1, magicStones[j]);
            }
        }
        this.releaseUnequippableMagicStones(true);
        this.refresh();
    };

    magicStones() {
        if (this._magicStones) {
            return this._magicStones.map(item => item.object());
        }
        return [];
    };

    magicSlots() {
        let slots = [];
        for (let i = 0; i < this._magicSlotNum; i++) {
            if (i == 0 && Alderpaw.isCoreMagicStoneUsed) {
                slots.push(Alderpaw.coreMagicStoneEtypeId);
            }
            else {
                slots.push(Alderpaw.magicStoneEtypeId);
            }
        }
        return slots;
    };

    paramPlus(paramId) {
        let value = super.paramPlus(paramId);
        for (const item of this.magicStones()) {
            if (item) {
                value += item.params[paramId];
            }
        }
        return value;
    };

    traitObjects() {
        const objects = super.traitObjects();
        for (const item of this.magicStones()) {
            if (item) {
                objects.push(item);
            }
        }
        return objects;
    };
}


//=============================================================================
// ** 新增Scene_MagicStone
//=============================================================================
class Scene_MagicStone extends Scene_MenuBase {
    update() {
        super.update();
        if (Input.isTriggered("control")) {
            this.showOrHideMagicListWindow();
        }
        if (Alderpaw.isElementPointBasedMagic && Input.isTriggered("tab")) {
            if (this._slotWindow && this._slotWindow.active && !this._magicTableWindow.visible) {
                this.showMagicTable();
                SoundManager.playOk();
            }
            else if (this._slotWindow && !this._slotWindow.active && this._magicTableWindow.visible) {
                this.hideMagicTable();
                SoundManager.playCancel();
            }
        }
    }

    statusWindowRect() {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth * 0.3;
        const wh = this.mainAreaHeight();
        return new Rectangle(wx, wy, ww, wh);
    }

    createStatusWindow() {
        const rect = this.statusWindowRect();
        this._statusWindow = new Window_MagicStoneStatus(rect);
        this.addWindow(this._statusWindow);
    }

    lineValueWindowRect() {
        const wx = Graphics.boxWidth * 0.3;
        const wy = this.mainAreaTop() + this.mainAreaHeight() * 0.7;
        const ww = Graphics.boxWidth * 0.4;
        const wh = this.mainAreaHeight() * 0.3;
        return new Rectangle(wx, wy, ww, wh);
    }

    createLineValueWindow() {
        const rect = this.lineValueWindowRect();
        this._lineValueWindow = new Window_LineValue(rect);
        if (!Alderpaw.isElementPointBasedMagic) {
            this._lineValueWindow.hide();
        }
        this.addWindow(this._lineValueWindow);
    }

    orbmentWindowRect() {
        const wx = Graphics.boxWidth * 0.7;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth * 0.3;
        const wh = this.mainAreaHeight();
        return new Rectangle(wx, wy, ww, wh);
    }

    createOrbmentWindow() {
        const rect = this.orbmentWindowRect();
        this._orbmentWindow = new Window_Orbment(rect);
        this.addWindow(this._orbmentWindow);
    }

    magicTableWindowRect() {
        const wx = Graphics.boxWidth * 0.15;
        const wy = this.mainAreaTop() - this.helpAreaHeight() / 2;
        const ww = Graphics.boxWidth * 0.7;
        const wh = this.mainAreaHeight();
        return new Rectangle(wx, wy, ww, wh);
    }

    createMagicTableWindow() {
        const rect = this.magicTableWindowRect();
        this._magicTableWindow = new Window_MagicTable(rect);
        this._magicTableWindow.setHandler("cancel", this.hideMagicTable.bind(this));
        this._magicTableWindow.hide();
        this.addWindow(this._magicTableWindow);
    }

    createMagicListWindow() {
        const rect = this.statusWindowRect();
        this._magicListWindow = new Window_MagicList(rect);
        this._magicListWindow.hide();
        this.addWindow(this._magicListWindow);
    }
    
    createMagicSlotWindow() {
        const rect = this.magicSlotWindowRect();
        this._slotWindow = new Window_MagicSlot(rect);
        this._slotWindow.setHelpWindow(this._helpWindow);
        this._slotWindow.setStatusWindow(this._statusWindow);
        this._slotWindow.setHandler("ok", this.onSlotOk.bind(this));
        this._slotWindow.setHandler("cancel", this.popScene.bind(this));
        this._slotWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._slotWindow.setHandler("pageup", this.previousActor.bind(this));
        this._slotWindow.activate();
        this._slotWindow.select(0);
        this.addWindow(this._slotWindow);
    };
    
    magicSlotWindowRect() {
        let wx, wy, ww, wh;
        if (Alderpaw.isElementPointBasedMagic) {
            wx = Graphics.boxWidth * 0.3;
            wy = this.mainAreaTop();
            ww = Graphics.boxWidth * 0.4;
            wh = this.mainAreaHeight() * 0.7;
        }
        else {
            wx = Graphics.boxWidth * 0.3;
            wy = this.mainAreaTop();
            ww = Graphics.boxWidth * 0.4;
            wh = this.mainAreaHeight();
        }
        return new Rectangle(wx, wy, ww, wh);
    }
    
    createItemWindow() {
        const rect = this.itemWindowRect();
        this._itemWindow = new Window_MagicStoneItem(rect);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setStatusWindow(this._statusWindow);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this._itemWindow.hide();
        this._slotWindow.setItemWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };
    
    itemWindowRect() {
        return this.magicSlotWindowRect();
    };

    createUnlockSlotConfirmWindow() {
        const rect = this.unlockSlotConfirmWindowRect();
        this._unlockConfirmWindow = new Window_MagicSlotUnlock(rect);
        this._unlockConfirmWindow.setHandler("unlockConfirm", this.onUnlockConfirm.bind(this));
        this._unlockConfirmWindow.setHandler("unlockCancel", this.onUnlockCancel.bind(this));
        this._unlockConfirmWindow.setHandler("cancel", this.onUnlockCancel.bind(this));
        this._unlockConfirmWindow.hide();
        this.addWindow(this._unlockConfirmWindow);
    }

    showOrHideMagicListWindow() {
        if (this._magicListWindow.visible) {
            this._magicListWindow.hide();
            this._statusWindow.show();
        }
        else {
            this._magicListWindow.show();
            this._statusWindow.hide();
        }
    }

    unlockSlotConfirmWindowRect() {
        const wx = Graphics.boxWidth * 0.4;
        const wy = this.mainAreaTop() + this.mainAreaHeight() * 0.4;
        const ww = Graphics.boxWidth * 0.2;
        const wh = this.mainAreaHeight() * 0.12;
        return new Rectangle(wx, wy, ww, wh);
    }

    create() {
        super.create();
        this.createHelpWindow();
        this.createStatusWindow();
        this.createMagicSlotWindow();
        this.createLineValueWindow();
        this.createOrbmentWindow();
        this.createMagicListWindow();
        this.createItemWindow();
        this.createUnlockSlotConfirmWindow();
        this.createMagicTableWindow();
        this.refreshActor();
    }

    onSlotOk() {
        this._slotWindow.hide();
        this._itemWindow.show();
        this._itemWindow.activate();
        this._itemWindow.forceSelect(0);
    }

    hideItemWindow() {
        this._slotWindow.show();
        this._slotWindow.activate();
        this._itemWindow.hide();
        this._itemWindow.deselect();
    };

    onItemOk() {
        SoundManager.playEquip();
        this.executeMagicStoneChange();
        this.hideItemWindow();
        this._slotWindow.refresh();
        this._itemWindow.refresh();
        this._statusWindow.refresh();
        this._lineValueWindow.refresh();
        //新的魔石链点数计算完成
        this.refreshActorMagics();
        this._orbmentWindow.refresh();
        this._magicListWindow.refresh();
    }

    executeMagicStoneChange() {
        const actor = this.actor();
        const slotId = this._slotWindow.index();
        const item = this._itemWindow.item();
        actor.changeMagicStone(slotId, item);
    }
    
    onItemCancel() {
        this.hideItemWindow();
        this._lineValueWindow.refresh();
    }

    refreshActor() {
        const actor = this.actor();
        this._statusWindow.setActor(actor);
        this._slotWindow.setActor(actor);
        this._itemWindow.setActor(actor);
        this._lineValueWindow.setActor(actor);
        this.refreshActorMagics();
        this._magicListWindow.setActor(actor);
        this._orbmentWindow.setActor(actor);
    };

    nextActor() {
        $gameParty.makeMenuActorNext();
        this.updateActor();
        this.onActorChange();
    };
    
    previousActor() {
        $gameParty.makeMenuActorPrevious();
        this.updateActor();
        this.onActorChange();
    };
    
    onActorChange() {
        SoundManager.playCursor();
        this.refreshActor();
        this._slotWindow.activate();
        this._slotWindow.select(0);
        this._itemWindow.hide();
        this._itemWindow.deselect();
    };

    openUnlockWindow() {
        this._unlockConfirmWindow.show();
        this._unlockConfirmWindow.activate();
        //每次打开解锁界面的时候，把这个槽位解锁需要的材料和数量记下来
        const costItem = JSON.parse(this.actor()._magicSlotCostList[this._slotWindow.index()]);
        this._unlockItemId = parseInt(costItem.itemId);
        this._needUnlockItemNum = costItem.itemNum;
        this._unlockItemName = $dataItems[this._unlockItemId].name;
        this._currentUnlockItemNum = $gameParty.numItems($dataItems[this._unlockItemId]);
        this._unlockRequirementText = `解锁需要${this._needUnlockItemNum}个${this._unlockItemName}，目前持有${this._currentUnlockItemNum}个。`;
        this._helpWindow.setText(this._unlockRequirementText);
    }

    onUnlockConfirm() {
        const actor = this.actor();
        const slotId = this._slotWindow.index();
        const mpIncreased = actor._magicSlotMpIncreaseList[slotId];
        let isPreviousSlotUnlocked = true;
        if (Alderpaw.isOrderUnlockRequired) {
            for (let lineIndex = 0; lineIndex < actor._magicLines.length; lineIndex++) {
                for (let j = 1; j < actor._magicLines[lineIndex].length; j++) {
                    if (slotId === actor._magicLines[lineIndex][j] && !actor._magicSlotEnabledList[actor._magicLines[lineIndex][j - 1]]) {
                        isPreviousSlotUnlocked = false;
                        break;
                    }
                }
            }
            if (!isPreviousSlotUnlocked) {
                this._helpWindow.setText("必须按顺序解锁魔石槽，该条链的上一个魔石槽未解锁！");
                SoundManager.playBuzzer();
                this._unlockConfirmWindow.activate();
                return;
            }
        }
        if (this._currentUnlockItemNum >= this._needUnlockItemNum) {
            $gameParty.gainItem($dataItems[this._unlockItemId], -this._needUnlockItemNum);
            SoundManager.playEquip();
            //解锁槽位，增加MP上限
            actor._magicSlotEnabledList[slotId] = 1;
            actor.addParam(1, mpIncreased);
            actor.gainMp(mpIncreased);
            this._unlockConfirmWindow.hide();
            this._slotWindow.refresh();
            this._slotWindow.activate();
            this._orbmentWindow.refresh();
        }
        else {
            this._helpWindow.setText("材料不足，无法解锁！");
            SoundManager.playBuzzer();
            this._unlockConfirmWindow.activate();
        }
    }

    onUnlockCancel() {
        this._unlockConfirmWindow.hide();
        this._slotWindow.activate();
    }

    showMagicTable() {
        this._magicTableWindow.show();
        this._magicTableWindow.activate();
        this._magicTableWindow.select(0);
        this._magicTableWindow.refresh();
        this._slotWindow.deactivate();
    }

    hideMagicTable() {
        this._magicTableWindow.hide();
        this._magicTableWindow.deactivate();
        this._slotWindow.activate();
    }

    refreshActorMagics() {
        const actor = this.actor();
        if (Alderpaw.isElementPointBasedMagic) {
            //根据目前每条链的点数情况，判断角色可用的魔法
            const oldMagics = actor.skills().filter(item => item.stypeId === Alderpaw.magicSkillTypeId);
            let newMagicIds = new Set();

            for (let i = 0; i < actor._lineElementPoints.length; i++) {
                //当前链的点数情况
                const lineElementPointItem = actor._lineElementPoints[i];
                for (let j = 0; j < Alderpaw.magicTable.length; j++) {
                    const magicRecipe = JSON.parse(Alderpaw.magicTable[j]);
                    const skillId = parseInt(magicRecipe.skillId);
                    const elementRequirements = JSON.parse(magicRecipe.elementPointList);
                    let reachedNum = 0;
                    //当前魔法的每一条要求
                    for (let k = 0; k < elementRequirements.length; k++) {
                        const requirementJson = JSON.parse(elementRequirements[k]);
                        if (lineElementPointItem[requirementJson.elementId.toString()] >= parseInt(requirementJson.elementPoint)) {
                            reachedNum++;
                        }
                    }
                    if (reachedNum >= elementRequirements.length && $dataSkills[skillId].stypeId === Alderpaw.magicSkillTypeId) {
                        newMagicIds.add(skillId);
                    }
                }
            }

            //遗忘旧魔法，但角色职业固有的不会遗忘
            for (const oldMagicSkill of oldMagics) {
                const oldSkillId = oldMagicSkill.id;
                const actorClass = actor.currentClass();
                let shouldForget = true;
                for (const learningSkillItem of actorClass.learnings) {
                    if (learningSkillItem.skillId === oldSkillId) {
                        shouldForget = false;
                        break;
                    }
                }
                if (shouldForget) {
                    actor.forgetSkill(oldSkillId);
                }
            }
            //学会新配出的魔法
            for (const newSkillId of newMagicIds) {
                actor.learnSkill(newSkillId);
            }
            //学会目前装备上额外附带的魔法
            for (const item of actor.magicStones()) {
                if (item != null) {
                    if (item.meta["Attached Magics"]) {
                        let skill_ids_and_levels = item.meta["Attached Magics"].split(",");
                        for (let i = 0; i < skill_ids_and_levels.length; i += 2) {
                            let skill_id = parseInt(skill_ids_and_levels[i]);
                            let level = parseInt(skill_ids_and_levels[i + 1]);
                            if (actor.level >= level) {
                                actor.learnSkill(skill_id);
                            }
                        }
                    }
                }
            }
        }
    }
}


//=============================================================================
// ** Window级别的修改
//=============================================================================

//-----------------------------------------------------------------------------
// Window_MagicTable
//
class Window_MagicTable extends Window_Selectable {
    constructor(rect) {
        super(rect);
        //记录元素对应的图标
        this._data = [];
        this._elementId2IconIndex = {};
        for (const strValidElementItem of Alderpaw.validElementItems) {
            const validElementItem = JSON.parse(strValidElementItem);
            this._elementId2IconIndex[validElementItem.elementId.toString()] = parseInt(validElementItem.elementIconId);
        }
    }

    makeItemList() {
        this._data = [];
        for (let i = 0; i < Alderpaw.magicTable.length; i++) {
            const magicRecipe = JSON.parse(Alderpaw.magicTable[i]);
            const skillId = magicRecipe.skillId;
            const elementRequirements = JSON.parse(magicRecipe.elementPointList);
            let ingredientString = "";
            const magicName = $dataSkills[skillId].name;
            const magicSimpleDesc =  magicRecipe.simpleSkillDesc;
            for (let j = 0; j < elementRequirements.length; j++) {
                const requirementJson = JSON.parse(elementRequirements[j]);
                const elementId = requirementJson.elementId.toString();
                const elementPoint = parseInt(requirementJson.elementPoint);
                const elementIconIndex = this._elementId2IconIndex[elementId];
                ingredientString += `\\I[${elementIconIndex}]×${elementPoint}`;
            }
            this._data.push(ingredientString + "：" + magicName + `(${magicSimpleDesc})`);
        }
    }

    maxItems() {
        return this._data ? this._data.length : 1;
    };
    
    itemAt(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    drawItem(index) {
        const rect = this.itemLineRect(index);
        const textMargin = this.itemPadding();
        const itemWidth = Math.max(0, rect.width - textMargin);
        this.drawTextEx(this.itemAt(index), rect.x + textMargin, rect.y, itemWidth);
    }

    refresh() {
        this.makeItemList();
        super.refresh();
    }

    resetFontSettings() {
        super.resetFontSettings();
        this.contents.fontSize = Math.max(18, $gameSystem.mainFontSize() - 4);
    }
}

//-----------------------------------------------------------------------------
// Window_MagicList
//
class Window_MagicList extends Window_StatusBase {
    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    }

    colSpacing() {
        return 0;
    }

    refresh() {
        if (!this._actor) {
            return;
        }
        this.contents.clear();
        const nameRect = this.itemLineRect(0);
        const maxRows = Math.floor((this.innerHeight - 2 * this.lineHeight()) / this.lineHeight());
        const maxDisplayNum = maxRows * 2;
        this.drawActorName(this._actor, nameRect.x, 0, nameRect.width);
        const actorMagics = this._actor.skills().filter(item => item.stypeId === Alderpaw.magicSkillTypeId);
        for (let i = 0; i < Math.min(maxDisplayNum, actorMagics.length); i++) {
            const skill = actorMagics[i];
            const skillIconId = skill.iconIndex;
            const skillName = skill.name;
            if (i < maxDisplayNum - 2 || actorMagics.length <= maxDisplayNum) {
                this.drawTextEx(`\\I[${skillIconId}]${skillName}`, 
                    this.itemPadding() + (this.innerWidth / 2) * (i % 2), 
                    this.lineHeight() * (Math.floor(i / 2) + 1.5), 
                    (this.innerWidth - 2 * this.itemPadding()) / 2);
            }
            else {
                this.drawText("......", this.itemPadding() + (this.innerWidth / 2) * (i % 2), 
                                this.lineHeight() * (Math.floor(i / 2) + 1.5), 
                                (this.innerWidth - 2 * this.itemPadding()) / 2);
            }
        }
        this.changeTextColor(ColorManager.textColor(2));
        this.drawText("按Ctrl键查看角色状态", 0, this.innerHeight - this.lineHeight(), this.innerWidth - this.itemPadding(), "right");
        this.resetTextColor();
    }
}

//-----------------------------------------------------------------------------
// Window_LineValue
//
class Window_LineValue extends Window_Base {
    constructor(rect) {
        super(rect);
        this._lineColors = [14, 11, 9, 18];
    }

    //画直线，本质上是一个实心矩形
    drawLine(x, y, w, h, c) {
        this.contents.fillRect(x, y, w, h, c);
    }

    //画空心矩形，本质上是四条线，t为边框的厚度
    drawRectFrame(x, y, w, h, c, t=2) {
        //边框的直线宽度均为t
        this.contents.fillRect(x, y, w, t, c);
        this.contents.fillRect(x, y + h - t, w, t, c);
        this.contents.fillRect(x, y, t, h, c);
        this.contents.fillRect(x + w - t, y, t, h, c);
    }

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    }

    lineHeight() {
        return 24;
    }

    resetFontSettings() {
        super.resetFontSettings();
        this.contents.fontSize = Math.max(18, $gameSystem.mainFontSize() - 6);
    }

    //玩家在某个槽位选择某个想要装备的魔石时，展示装备后链条属性值会产生的变化
    //需要把每条链的情况记录下来，更新角色可用的魔法 [{"elementId": elementPoint, ......}, ......]
    refresh(selectedSlotId=undefined, selectedMagicStone=undefined) {
        if (!this._actor || !Alderpaw.isElementPointBasedMagic) {
            return;
        }

        this.contents.clear();
        this.drawTextEx("\\C[2]\\FS[24]Line", this.itemPadding() * 2, this.itemPadding() * 2, 100);
        for (let i = 0; i < Alderpaw.validElementItems.length; i++) {
            const elementItem = JSON.parse(Alderpaw.validElementItems[i]);
            const elementIconId = parseInt(elementItem.elementIconId);
            this.drawTextEx(`\\I[${elementIconId}]`, 100 + (36 + this.itemPadding()) * i, this.itemPadding(), 36);
        }
        for (let i = 0; i < this._actor._magicLines.length; i++) {
            this.drawLine(this.itemPadding(), this.itemPadding() + this.lineHeight() * (i + 2.2), 64, 4, ColorManager.textColor(this._lineColors[i]));
            //计算每条链的属性点数之和
            for (let j = 0; j < Alderpaw.validElementItems.length; j++) {
                const elementItem = JSON.parse(Alderpaw.validElementItems[j]);
                const elementId = parseInt(elementItem.elementId);
                const lineMagicSlots = this._actor._magicLines[i];
                //第i条链的第j个元素的点数总和
                let currentElementPointsOnLine = 0;
                //选中的这件装备的第j个元素点数
                let predictElementPointsOnLine = 0;
                for (const slotId of lineMagicSlots) {
                    const item = this._actor.magicStones()[slotId];
                    if (item && item.meta["Element Points"]) {
                        const elementPointMapping = JSON.parse(item.meta["Element Points"]);
                        for (const tempElementId in elementPointMapping) {
                            if (parseInt(tempElementId) === elementId) {
                                currentElementPointsOnLine += parseInt(elementPointMapping[tempElementId]);
                                if (slotId === selectedSlotId) {
                                    predictElementPointsOnLine -= currentElementPointsOnLine;
                                }
                            }
                        }
                    }
                }
                //选中的这件魔石，无论是否可装备，都显示其会带来的影响
                if (selectedMagicStone && selectedMagicStone.meta["Element Points"]) {
                    const elementPointMapping = JSON.parse(selectedMagicStone.meta["Element Points"]);
                    for (const selectedItemElementId in elementPointMapping) {
                        if (parseInt(selectedItemElementId) === elementId && lineMagicSlots.includes(selectedSlotId)) {
                            predictElementPointsOnLine += parseInt(elementPointMapping[selectedItemElementId]);
                        }
                    }
                }

                //设置玩家每条链上真实的属性点数
                this._actor._lineElementPoints[i][elementId.toString()] = currentElementPointsOnLine;
                //根据选中的魔石显示预测结果
                this.changeTextColor(ColorManager.paramchangeTextColor(predictElementPointsOnLine));
                this.drawText((currentElementPointsOnLine + predictElementPointsOnLine).toString(), 114 + (36 + this.itemPadding()) * j, this.itemPadding() + this.lineHeight() * (i + 1.7), 36);
                this.resetTextColor();
            }
        }
    }
}

//-----------------------------------------------------------------------------
// Window_Orbment
//
class Window_Orbment extends Window_Base {
    constructor(rect) {
        super(rect);
        this._lineColors = [14, 11, 9, 18];
        this._elementColorMapping = {};
        for (let j = 0; j < Alderpaw.validElementItems.length; j++) {
            const elementItem = JSON.parse(Alderpaw.validElementItems[j]);
            this._elementColorMapping[elementItem.elementId.toString()] = elementItem.elementColorId;
        }
    }

    //画空心矩形，本质上是四条线，t为边框的厚度
    drawRectFrame(x, y, w, h, c, t=2) {
        //边框的直线宽度均为t
        this.contents.fillRect(x, y, w, t, c);
        this.contents.fillRect(x, y + h - t, w, t, c);
        this.contents.fillRect(x, y, t, h, c);
        this.contents.fillRect(x + w - t, y, t, h, c);
    }

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    }

    drawLine(x1, y1, x2, y2, color) {
        // 获取绘制上下文
        const context = this.contents.context;
        // 设置线条颜色
        context.strokeStyle = color || 'black';
        context.lineWidth = 4; // 设置线条宽度
        // 开始路径
        context.beginPath();
        context.moveTo(x1, y1);  // 起点
        context.lineTo(x2, y2);  // 终点
        context.stroke();  // 绘制路径
    }

    getPosition(rect1, rect2) {
        if (rect1.x + rect1.w < rect2.x) {
          // 矩形1在矩形2的左边
          return 'left';
        } else if (rect1.x > rect2.x + rect2.w) {
          // 矩形1在矩形2的右边
          return 'right';
        } else if (rect1.y + rect1.h < rect2.y) {
          // 矩形1在矩形2的上边
          return 'top';
        } else if (rect1.y > rect2.y + rect2.h) {
          // 矩形1在矩形2的下边
          return 'bottom';
        } else {
          // 如果两个矩形没有完全符合上下左右关系（例如斜对角）
          return 'diagonal';
        }
    }

    refresh() {
        if (!this._actor) {
            return;
        }

        this.contents.clear();
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(Alderpaw.magicLineText, 0, this.itemPadding(), this.innerWidth, "center");
        this.resetTextColor();
        const slotHeight = 54;
        const slotWidth = 36;
        let slotColors = [];
        let slotXPosList = [];
        let slotYPosList = [];
        for (const elementId of this._actor._magicSlotElementTypeList) {
            if (elementId === 0) {
                slotColors.push("#808080");
            }
            else {
                slotColors.push(this._elementColorMapping[elementId.toString()]);
            }
        }

        const centerX = this.innerWidth / 2;
        const centerY = this.innerHeight / 2;
        // 设定椭圆的水平半径和垂直半径
        const radiusX = 120;  // 水平半径
        const radiusY = 180;  // 垂直半径
        // 绘制中心魔石槽矩形
        this.drawRectFrame(centerX - slotWidth / 2, centerY - slotHeight / 2, slotWidth, slotHeight, slotColors[0]);
        this.drawRectFrame(centerX - slotWidth / 2 + 2, centerY - slotHeight / 2 + 2, slotWidth - 4, slotHeight - 4, slotColors[0]);
        slotXPosList.push(centerX - slotWidth / 2);
        slotYPosList.push(centerY - slotHeight / 2);
        // 绘制外围的 N 个矩形，最中间是0号魔石槽，右边是1号魔石槽，然后顺时针排布编号
        for (let i = 0; i < this._actor._magicSlotNum - 1; i++) {
            const angle = (2 * Math.PI / (this._actor._magicSlotNum - 1)) * i;
            const x = centerX + radiusX * Math.cos(angle) - slotWidth / 2; 
            const y = centerY + radiusY * Math.sin(angle) - slotHeight / 2; 
            slotXPosList.push(x);
            slotYPosList.push(y);
            this.drawRectFrame(x, y, slotWidth, slotHeight, slotColors[i + 1]);
        }

        //画连接线
        for (let i = 0; i < this._actor._magicLines.length; i++) {
            const lineMagicSlots = this._actor._magicLines[i];
            for (let j = 0; j < lineMagicSlots.length - 1; j++) {
                const rect1 = {"x": slotXPosList[lineMagicSlots[j]], "y": slotYPosList[lineMagicSlots[j]], "w": slotWidth, "h": slotHeight};
                const rect2 = {"x": slotXPosList[lineMagicSlots[j + 1]], "y": slotYPosList[lineMagicSlots[j + 1]], "w": slotWidth, "h": slotHeight};
                const rect1Points = [
                    { x: rect1.x + rect1.w / 2, y: rect1.y }, // 上边中点
                    { x: rect1.x + rect1.w / 2, y: rect1.y + rect1.h }, // 下边中点
                    { x: rect1.x, y: rect1.y + rect1.h / 2 }, // 左边中点
                    { x: rect1.x + rect1.w, y: rect1.y + rect1.h / 2 }  // 右边中点
                ];
                // 计算矩形2的四个边的中点
                const rect2Points = [
                    { x: rect2.x + rect2.w / 2, y: rect2.y }, // 上边中点
                    { x: rect2.x + rect2.w / 2, y: rect2.y + rect2.h }, // 下边中点
                    { x: rect2.x, y: rect2.y + rect2.h / 2 }, // 左边中点
                    { x: rect2.x + rect2.w, y: rect2.y + rect2.h / 2 }  // 右边中点
                ];
                let minDist = Infinity;
                let lineStartX, lineStartY, lineEndX, lineEndY;
                // 遍历矩形1的每个中点和矩形2的每个中点，计算距离并找最短的连线
                for (let p1 of rect1Points) {
                    for (let p2 of rect2Points) {
                        const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
                        if (dist < minDist) {
                            minDist = dist;
                            lineStartX = p1.x;
                            lineStartY = p1.y;
                            lineEndX = p2.x;
                            lineEndY = p2.y;
                        }
                    }
                }
                this.drawLine(lineStartX, lineStartY, lineEndX, lineEndY, ColorManager.textColor(this._lineColors[i]));
            }
        }

        //根据当前玩家选中的slot，在相应槽位左边绘制箭头
        if (SceneManager._scene._slotWindow) {
            const slotId = SceneManager._scene._slotWindow.index();
            this.drawIcon(Alderpaw.magicSlotArrowIconId, slotXPosList[slotId] - ImageManager.iconWidth - 4, slotYPosList[slotId]);
        }
        //没解锁的魔石槽加锁图标，已装备的魔石槽加装备图标
        for (let i = 0; i < this._actor._magicSlotNum; i++) {
            if (!this._actor._magicSlotEnabledList[i]) {
                this.drawIcon(Alderpaw.magicSlotLockIconId, slotXPosList[i] + (slotWidth - ImageManager.iconWidth) / 2, slotYPosList[i] + (slotHeight - ImageManager.iconHeight) / 2);
            }
            else if (this._actor.magicStones()[i]) {
                const magicStone = this._actor.magicStones()[i];
                this.drawIcon(magicStone.iconIndex, slotXPosList[i] + (slotWidth - ImageManager.iconWidth) / 2, slotYPosList[i] + (slotHeight - ImageManager.iconHeight) / 2);
            }
        }
        if (Alderpaw.isElementPointBasedMagic) {
            this.changeTextColor(ColorManager.textColor(2));
            this.drawText(Alderpaw.openMagicTableText, 0, this.innerHeight - this.lineHeight(), this.innerWidth - this.itemPadding(), "right");
            this.resetTextColor();
        }
    }
}

//-----------------------------------------------------------------------------
// Window_MagicSlotUnlock
//
class Window_MagicSlotUnlock extends Window_HorzCommand {
    makeCommandList() {
        this.addCommand("解锁", "unlockConfirm");
        this.addCommand("取消", "unlockCancel");
    }

    maxCols() {
        return 2;
    }

    select(index) {
        if (index !== this.index() && SceneManager._scene._helpWindow && SceneManager._scene._unlockRequirementText) {
            SceneManager._scene._helpWindow.setText(SceneManager._scene._unlockRequirementText);
        }
        super.select(index);
    }
}

//-----------------------------------------------------------------------------
// Window_MagicStoneStatus
//
class Window_MagicStoneStatus extends Window_StatusBase {
    constructor(rect) {
        super(rect);
        this._actor = null;
        this._tempActor = null;
        this._hpSprite = null;
        this._mpSprite = null;
        this._tpSprite = null;
        this.refresh();
    }

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    }

    colSpacing() {
        return 0;
    }

    refresh() {
        this.contents.clear();
        if (this._actor) {
            const nameRect = this.itemLineRect(0);
            this.drawHpMpTp();
            this.drawActorName(this._actor, nameRect.x, 0, nameRect.width);
            this.drawActorFace(this._actor, nameRect.x, nameRect.height);
            this.drawAllParams();
        }
    }

    setTempActor(tempActor) {
        if (this._tempActor !== tempActor) {
            this._tempActor = tempActor;
            this.refresh();
        }
    }

    drawHpMpTp() {
        if (!this._hpSprite) {
            const hpKey = "magicStone-gauge-%1".format("hp");
            this._hpSprite = this.createInnerSprite(hpKey, Sprite_Gauge);
        }
        if (!this._mpSprite) {
            const mpKey = "magicStone-gauge-%1".format("mp");
            this._mpSprite = this.createInnerSprite(mpKey, Sprite_Gauge);
        }
        if (!this._tpSprite && $dataSystem.optDisplayTp) {
            const tpKey = "magicStone-gauge-%1".format("tp");
            this._tpSprite = this.createInnerSprite(tpKey, Sprite_Gauge);
        }

        this._hpSprite.setup(this._actor, "hp");
        this._hpSprite.move(ImageManager.faceWidth + 3 * this.itemPadding(), this.lineHeight());
        this._hpSprite.show();

        this._mpSprite.setup(this._actor, "mp");
        this._mpSprite.move(ImageManager.faceWidth + 3 * this.itemPadding(), this.lineHeight() * 2);
        this._mpSprite.show();

        if ($dataSystem.optDisplayTp) {
            this._tpSprite.setup(this._actor, "tp");
            this._tpSprite.move(ImageManager.faceWidth + 3 * this.itemPadding(), this.lineHeight() * 3);
            this._tpSprite.show();
        }
    }

    drawAllParams() {
        for (let i = 2; i < 7; i++) {
            const x = this.itemPadding();
            const y = this.paramY(i - 2);
            this.drawItem(x, y, i);
        }
        for (let i = 8; i < 11; i++) {
            const x = this.itemPadding();
            const y = this.paramY(i - 3);
            this.drawItem(x, y, i);
        }
        this.changeTextColor(ColorManager.textColor(2));
        this.drawText(Alderpaw.switchMagicListText, 0, this.innerHeight - this.lineHeight(), this.innerWidth - this.itemPadding(), "right");
        this.resetTextColor();
    }

    drawItem(x, y, paramId) {
        const paramX = this.paramX();
        const paramWidth = this.paramWidth();
        const rightArrowWidth = this.rightArrowWidth();
        this.drawParamName(x, y, paramId);
        if (this._actor) {
            this.drawCurrentParam(paramX, y, paramId);
        }
        this.drawRightArrow(paramX + paramWidth, y);
        if (this._tempActor) {
            this.drawNewParam(paramX + paramWidth + rightArrowWidth, y, paramId);
        }
    }

    drawParamName(x, y, paramId) {
        const width = this.paramX() - this.itemPadding() * 2;
        this.changeTextColor(ColorManager.systemColor());
        if (paramId < 8) {
            this.drawText(TextManager.param(paramId), x, y, width);
        }
        else if (paramId == 8) {
            this.drawText("命中率", x, y, width);
        }
        else if (paramId == 9) {
            this.drawText("回避率", x, y, width);
        }
        else if (paramId == 10) {
            this.drawText("暴击率", x, y, width);
        }
    }

    drawCurrentParam(x, y, paramId) {
        const paramWidth = this.paramWidth();
        this.resetTextColor();
        if (paramId < 8) {
            this.drawText(this._actor.param(paramId), x, y, paramWidth, "right");
        }
        else {
            this.drawText(parseInt(this._actor.xparam(paramId - 8) * 100).toString() + "%", x, y, paramWidth, "right");
        }
    }

    drawRightArrow(x, y) {
        const rightArrowWidth = this.rightArrowWidth();
        this.changeTextColor(ColorManager.systemColor());
        this.drawText("\u2192", x, y, rightArrowWidth, "center");
    }

    drawNewParam(x, y, paramId) {
        const paramWidth = this.paramWidth();
        let newValue, diffValue;
        if (paramId < 8) {
            newValue = this._tempActor.param(paramId);
            diffValue = newValue - this._actor.param(paramId);
        }
        else {
            newValue = parseInt(this._tempActor.xparam(paramId - 8) * 100).toString() + "%";
            diffValue = parseInt(parseInt(newValue) - parseInt(this._actor.xparam(paramId - 8) * 100)).toString() + "%";
        }
        this.changeTextColor(ColorManager.paramchangeTextColor(parseInt(diffValue)));
        this.drawText(newValue, x, y, paramWidth, "right");
    }

    rightArrowWidth() {
        return 32;
    }

    paramWidth() {
        return 48;
    }

    paramX() {
        const itemPadding = this.itemPadding();
        const rightArrowWidth = this.rightArrowWidth();
        const paramWidth = this.paramWidth();
        return this.innerWidth - itemPadding - paramWidth * 2 - rightArrowWidth;
    }

    paramY(index) {
        const faceHeight = ImageManager.faceHeight;
        return faceHeight + Math.floor(this.lineHeight() * (index + 1.5));
    }
}


//-----------------------------------------------------------------------------
// Window_MagicSlot
//

class Window_MagicSlot extends Window_StatusBase {
    constructor(rect) {
        super(rect);
        this._actor = null;
        this.refresh();
    }

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    }

    select(index) {
        let needRefreshArrow = false;
        if (index !== -1 && index !== this.index()) {
            needRefreshArrow = true;
        }
        super.select(index);
        if (needRefreshArrow && SceneManager._scene._orbmentWindow) {
            SceneManager._scene._orbmentWindow.refresh();
        }
    }

    update() {
        super.update();
        if (this._itemWindow) {
            this._itemWindow.setSlotId(this.index());
        }
    }

    maxItems() {
        return this._actor ? this._actor.magicSlots().length : 0;
    }

    item() {
        return this.itemAt(this.index());
    }

    itemAt(index) {
        return this._actor ? this._actor.magicStones()[index] : null;
    }

    actorSlotName(actor, index) {
        const slots = actor.magicSlots();
        return $dataSystem.equipTypes[slots[index]];
    }

    drawItem(index) {
        if (this._actor) {
            let slotName = this.actorSlotName(this._actor, index);
            let item = this.itemAt(index);
            let slotNameWidth = this.slotNameWidth();
            let rect = this.itemLineRect(index);
            let itemWidth = rect.width - slotNameWidth;
            this.changeTextColor(ColorManager.systemColor());
            this.changePaintOpacity(this.isEnabled(index));
            //限定孔
            if (this._actor._magicSlotElementTypeList[index] > 0) {
                const elementName = $dataSystem.elements[this._actor._magicSlotElementTypeList[index]];
                this.drawText(slotName, rect.x, rect.y, slotNameWidth, rect.height);
                this.drawTextEx(`${elementName}限定`, rect.x + rect.width - slotNameWidth, rect.y, slotNameWidth, rect.height);
            }
            else {
                this.drawText(slotName, rect.x, rect.y, slotNameWidth, rect.height);
            }
            //上锁的孔
            if (!this.isEnabled(index)) {
                this.drawTextEx("未解锁", rect.x + slotNameWidth + ImageManager.iconWidth, rect.y, slotNameWidth, rect.height);
            }
            this.drawItemName(item, rect.x + slotNameWidth, rect.y, itemWidth);
            this.changePaintOpacity(true);
        }
    }

    slotNameWidth() {
        return 138;
    }

    isEnabled(index) {
        return this._actor ? this._actor.isMagicSlotChangeOk(index) : false;
    }

    isCurrentItemEnabled() {
        return this.isEnabled(this.index());
    }

    processOk() {
        super.processOk();
        if (!this.isCurrentItemEnabled() && Alderpaw.isInnerUnlockEnabled) {
            this.updateInputData();
            this.deactivate();
            SceneManager._scene.openUnlockWindow();
        }
    }

    setStatusWindow(statusWindow) {
        this._statusWindow = statusWindow;
        this.callUpdateHelp();
    }

    setItemWindow(itemWindow) {
        this._itemWindow = itemWindow;
    }

    updateHelp() {
        super.updateHelp();
        this.setHelpWindowItem(this.item());
        if (this._statusWindow) {
            this._statusWindow.setTempActor(null);
        }
    }
}


//-----------------------------------------------------------------------------
// Window_MagicStoneItem
//

class Window_MagicStoneItem extends Window_ItemList {
    constructor(rect) {
        super(rect);
        this._actor = null;
        this._slotId = 0;
    }

    maxCols() {
        return 1;
    }

    colSpacing() {
        return 8;
    }

    setActor(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
            this.scrollTo(0, 0);
        }
    }

    setSlotId(slotId) {
        if (this._slotId !== slotId) {
            this._slotId = slotId;
            this.refresh();
            this.scrollTo(0, 0);
        }
    }

    includes(item) {
        if (item === null) {
            return true;
        }
        return item.etypeId === this.etypeId();
    }

    makeItemList() {
        this._data = $gameParty.allItems().filter(item => this.includes(item));
        if (this.includes(null)) {
            this._data.unshift(null);
        }
    };

    etypeId() {
        if (this._actor && this._slotId >= 0) {
            return this._actor.magicSlots()[this._slotId];
        } else {
            return 0;
        }
    }

    isEnabled(item) {
        if (!item) {
            return true;
        }
        return this._actor && this._actor.canEquipMagicStone(item, this._slotId);
    }

    select(index) {
        if (index !== -1 && index !== this.index()) {
            if (SceneManager._scene._lineValueWindow) {
                SceneManager._scene._lineValueWindow.refresh(this._slotId, this._data[index]);
            }
        }
        super.select(index);
    }

    selectLast() {
        //
    }

    drawItem(index) {
        let item = this.itemAt(index);
        if (item) {
            let numberWidth = this.numberWidth();
            let rect = this.itemLineRect(index);
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(1);
        }
        else {
            let numberWidth = this.numberWidth();
            let rect = this.itemLineRect(index);
            this.changePaintOpacity(true);
            this.drawTextEx("\\i[16]卸下", rect.x, rect.y, rect.width - numberWidth);
            this.changePaintOpacity(1);
        }
    }

    setStatusWindow(statusWindow) {
        this._statusWindow = statusWindow;
        this.callUpdateHelp();
    }

    updateHelp() {
        super.updateHelp();
        if (this._actor && this._statusWindow && this._slotId >= 0) {
            const actor = JsonEx.makeDeepCopy(this._actor);
            actor.forceChangeMagicStone(this._slotId, this.item());
            this._statusWindow.setTempActor(actor);
        }
    }

    playOkSound() {
        //
    }
}

//=============================================================================
// A XueYu Plugins - Enemy
// AXY_Enemy.js
// Version: 1.02
// License: MIT
//=============================================================================
/*:
 * @plugindesc v1.02 Allows add Enemy in battle.
 * @author A XueYu Plugins
 *
 * @help
 * Introduction
 * This plugin allows add Enemy in battle.
 *
 * Example: 
 * add one enemy on x=100,y=200 and enemy id is 1 in battle:
 * AXY.Enemy.add(1,100,200);
 * use Variables:
 * AXY.Enemy.add($gameVariables.value(1),$gameVariables.value(2),$gameVariables.value(3));
 * bulk add random 10 enemy on random (x,y), ennmy id random 1-10, x random 100-200, y random 300-400:
 * AXY.Enemy.bulkAdd(10,[1,10],[100,200],[300,400]);
 *
 * changelog
 * 1.02 2019.11.10
 * add: AXY.Enemy.Alias;
 * add: AXY.Enemy.Variables;
 * add: AXY.Enemy.bulkAdd();
 * modify: change License from BSD to MIT;
 * 1.01 2017.2.14
 * fix some bug that add if Troops and release Enemys when used;
 * 1.00 2017.2.9
 * first release;
 */

// Imported
var Imported = Imported || {};
Imported.AXY_Enemy = true;

// Parameter Variables
var AXY = AXY || {};
AXY.Enemy = AXY.Enemy || {};

AXY.Enemy.Parameters = PluginManager.parameters('AXY_Enemy');
AXY.Enemy.Param = AXY.Enemy.Param || {};
AXY.Enemy.Alias = AXY.Enemy.Alias || {};
AXY.Enemy.Variables = AXY.Enemy.Variables || {};

AXY.Enemy.Variables.enemys = [];
AXY.Enemy.Variables.troops = [];
//AXY.Enemy.Variables.ratio = 0;

// Main
AXY.Enemy.add = function (enemyId, x, y) {
	AXY.Enemy.Variables.enemys.push({
		enemyId: enemyId,
		hidden: false,
		x: x,
		y: y
	});
};

AXY.Enemy.bulkAdd = function (total, enemyIdr, xr, yr) {
	for (var i = 0; i < total; i++) {
		var enemyId = parseInt(Math.random() * (enemyIdr[1] - enemyIdr[0] + 1) + enemyIdr[0]);
		var x = parseInt(Math.random() * (xr[1] - xr[0] + 1) + xr[0]);
		var y = parseInt(Math.random() * (yr[1] - yr[0] + 1) + yr[0]);
		AXY.Enemy.add(enemyId, x, y);
	}
};

/*AXY.Enemy.setRatio = function (ratio) {
	AXY.Enemy.Variables.ratio = ratio;
};*/

/*AXY.Enemy.Alias.Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function (troopId) {
	if (!AXY.Enemy.Variables.troops[troopId]) {
		AXY.Enemy.Variables.enemys.forEach(function (member) {
			$dataTroops[troopId].members.push(member);
		});
		AXY.Enemy.Variables.troops[troopId] = true;
	}

	AXY.Enemy.Alias.Game_Troop_setup.call(this, troopId);
	console.log(AXY.Enemy.Variables.enemys);
	AXY.Enemy.Variables.enemys = [];
	console.log(AXY.Enemy.Variables.enemys);
};*/
AXY.Enemy.Alias.Game_Troop_setup = Game_Troop.prototype.setup;
Game_Troop.prototype.setup = function (troopId) {
	/*if (!AXY.Enemy.Variables.troops[troopId]) {
		AXY.Enemy.Variables.enemys.forEach(function (member) {
			$dataTroops[troopId].members.push(member);
		});
		AXY.Enemy.Variables.troops[troopId] = true;
	}

	AXY.Enemy.Alias.Game_Troop_setup.call(this, troopId);
	console.log(AXY.Enemy.Variables.enemys);
	AXY.Enemy.Variables.enemys = [];
	console.log(AXY.Enemy.Variables.enemys);*/

	/*this.clear();
	this._troopId = troopId;
	this._enemies = [];
	this.troop().members.forEach(function (member) {
		if ($dataEnemies[member.enemyId]) {
			var enemyId = member.enemyId;
			var x = member.x;
			var y = member.y;
			var enemy = new Game_Enemy(enemyId, x, y);
			if (member.hidden) {
				enemy.hide();
			}
			this._enemies.push(enemy);
		}
	}, this);*/
	AXY.Enemy.Alias.Game_Troop_setup.call(this, troopId);
	AXY.Enemy.Variables.enemys.forEach(function (member) {
		//$dataTroops[troopId].members.push(member);
		if ($dataEnemies[member.enemyId]) {
			var enemyId = member.enemyId;
			var x = member.x;
			var y = member.y;
			var enemy = new Game_Enemy(enemyId, x, y);
			if (member.hidden) {
				enemy.hide();
			}
			this._enemies.push(enemy);
		}
	}, this);
	AXY.Enemy.Variables.enemys = [];
	this.makeUniqueNames();
};

// ● お金の取得
/*AXY.Enemy.Alias.Game_Enemy_gold = Game_Enemy.prototype.gold;
Game_Enemy.prototype.gold = function () {
	var gold = AXY.Enemy.Alias.Game_Enemy_gold.call(this);
	var difficulty = $gameSystem.difficultyObject();
	if (difficulty) {
		gold *= difficulty.goldRate * ($gameVariables.value(Vitsuno.Difficulty.GlobalDifficultyVariableID) ? $gameVariables.value(Vitsuno.Difficulty.GlobalDifficultyVariableID) : 1);
	}
	return Math.floor(gold);
};*/

/*
todo 这段应该可以用来参考，以实现敌人被打死后变成8个子孙的效果；
技能分享：怪物召唤
说明：
敌人专用的召唤几个水平大概比你低的怪物。用于玩家的相关插件为私用插件，还在测试当中。
实现：
yep技能核心 yep敌人等级(可选)
<Before Eval>
var k = Math.floor(Math.random()*3+1);///召唤数量
for (var i = 0;i<=k;i++){
    var member = $gameTroop.troop().members[Math.floor(Math.random()*$gameTroop.troop().members.length)];
    if ($dataEnemies[member.enemyId] && $dataEnemies[member.enemyId].maxLevel<user.enemy().maxLevel) {  /////召唤条件可自由修改或者不使用
var enemyId = member.enemyId;///直接修改并使用enemyId也可，对应数据库敌人id
        var x = user.battler().x + Math.random()*200 -100;
        var y = user.battler().y + Math.random()*200 -100;
        var enemy = new Game_Enemy(enemyId, x, y);
        enemy.startAnimation(51);
$gameTroop._enemies.push(enemy);
enemy.refresh();
var sprite = new Sprite_Enemy(enemy);
BattleManager._spriteset._battleField.addChild(sprite);
BattleManager._spriteset._enemySprites.push(sprite);
    }
        $gameTroop.makeUniqueNames();
}
</Before Eval>
备注：
建议在使用条件里限制敌方数量，防止太多
如果有用yep的YEP_X_VisualStateFX.js，并且有持续性动画，建议修改以下函数为：
Game_Battler.prototype.refreshStateAnimation = function() {
  if (!this.battler() || this.isDead() || this._hp <= 0) return;
  this.battler().startStateAnimation(this.stateAnimationId());
};*/

//todo 增加合并几个敌群的方式来增加敌人；
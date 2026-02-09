let game
let currentOrbs = 0

function reset() {
    game = {
        money: 0,
        moneyMultiplier: 1,
        highestRarity: 0,
        raritiesDisplayed: 0,
        diamonds: 0,
        diamondChance: 0.01,
        spawnIntervals: [1000, 2000, 4000, 10000, 60000, 120000, 300000],
        baseLuck: 1,
        totalLuck: 1,
        bestLuck: 1,
        rebBaseCost: 5000,
        weatherpts: 0,
        rebScaling: 3.5,
        spawnerLuck: [1, 1.5, 2.5, 10, 100, 1000, 10000],
        numberFormat: "standard",
        upgradeCosts: [50, 100, 500, 250, 1500, 25000, 2000, 8000, 75000, 1e10, 1e9, 5e13, 2.5e13, 1e20, 1e22, 1e33, 1e34], // for spawners and first few ups
        newUpgCosts: [200], // for diamonds
        extUpgCosts: [1e33, 10000, 10], // for TPgain ups
        weatherUpCosts: [0.8,1,3], // ID 0: Roll for Weather (Round([X+2]/3)), ID 1: Unlock new weather (Base 1, X*2 for each, only 1 weather unlocked at base), ID 2: Money Boost (Base 3, round(X*1.5) for each)
        diamondLuck: 1,
        diamondMult: 1,
        weatherMoney: 1,
        weatherUnlocked: 1,
        weatherRolled: 0,
        PWU: 0,
        ttlOrbSpawn: 0,
        spawnersUnlocked: 1, 
        boostTimes: [0,0,0,0],
        weatherMult: [1,1,1],
        hideInfinity: false,
        boostsUnlocked: false,
        ORActive: false,
        rebirthUnlocked: false,
        tierUnlocked: false,
        orbsObtained: Array(99).fill(0),
        currentUpgrades: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        timePlayed: 0,
        timeSpentinTier: 0,
        timeSpentinReb: 0,
        mechanicsUnlocked: 0,
        rebirths: 0,
        weatherDuration: Array(10).fill(0),
        weatherRollCooldown: 0,
        weatherChances: [1,0,0,0,0,0,0,0,0,0],
        difficulty: "orig",
        tiers: 0,
        boostData: {
            1: { baseCost: 100, increment: 10, uses: 0 },
            2: { baseCost: 400, increment: 50, uses: 0 },
            3: { baseCost: 100, increment: 10, uses: 0 },
            4: { baseCost: 400, increment: 50, uses: 0 },
            5: { baseCost: 500, increment: 100, uses: 0 },
            6: { baseCost: 250, increment: 25, uses: 0 },
        },
        skillTreeUpgs: {
            max: { 
                name: "Max Buy",
                upgrades: [
                    { id: "MAX-1", name: "Buy Max Main", desc: "Add a button to Buy Max main Upgrades", cost: 1, req: null },
                    { id: "MAX-2", name: "Buy Max Spawner", desc: "Add a button to Buy Max Individual Spawner Upgrades", cost: 1, req: null },
                    { id: "MAX-3", name: "Buy Max Rebirth", desc: "Add a toggle to buy max Rebirths", cost: 3, req: ["MAX-1", "MAX-2"] },
                    { id: "MAX-4", name: "One button for all", desc: "Add a button to buy max all Spawner Upgrades", cost: 1, req: ["MAX-2"] }
                ],
                bought: [0,0,0,0], 
                unlocked:[true,true,true,true], 
            },
            rless: { 
                name: "Reset Less",
                upgrades: [
                    { id: "RL-1", name: "Keep Upgrades", desc: "Keep % of Upgrade Levels on Rebirth", levels: [25, 50, 70, 85], costs: [1, 1, 2, 2], req: null },
                    { id: "RL-2", name: "Faster Recovery", desc: "If your Current Luck is less than your Best Luck, increase Luck", levels: [1, 2, 3, 4, 6], costs: [1, 1, 1, 1, 3], req: null }, // levels multiply to the formula (log2(lg(Luck))*0.05)
                    { id: "RL-3", name: "Rebirth Keeper", desc: "Keep % of Rebirths on Tier", levels: [20, 40, 60, 80], costs: [2, 2, 3, 5], req: null },
                    { id: "RL-4", name: "Rebirth Booster", desc: "Allow you to keep your boost times on Rebirth", cost: 1, req: null }
                ],
                bought: [0,0,0,0], 
                unlocked:[true,true,true,true], 
            },
            boost: { 
                name: "Boosts++",
                upgrades: [
                    { id: "BST-1", name: "Efficient Boosts", desc: "1min Boosts are 40 Diamonds cheaper, the rest are 100 Diamonds cheaper (Doesn't affect boost price of BST-3's boost)", cost: 1, req: null },
                    { id: "BST-2", name: "Quick Dupe", desc: "Duplicate cooldown is halved", cost: 1, req: null },
                    { id: "BST-3", name: "Obstacle Remover", desc: "Unlock a new boost to remove some obstacles", cost: 1, req: null },
                    { id: "BST-4", name: "Auto-Potion", desc: "Auto-Money/Luck Potion when said potion ends (Toggleable)", cost: 3, req: ["BST-2", "BST-3"] }
                ],
                bought: [0,0,0,0], 
                unlocked:[true,true,true,true], 
            },
            main: { 
                name: "Main Multipliers",
                upgrades: [
                    { id: "MN-1", name: "Cash Flow", desc: "x1.05 Money", cost: 1, req: null, infinite: true },
                    { id: "MN-2", name: "Lucky Power", desc: "x1.1 Luck", cost: 1, req: null, infinite: true },
                    { id: "MN-3", name: "Gem Finder", desc: "x1.05 Diamonds", cost: 1, req: null, infinite: true },
                    { id: "MN-4", name: "Glimmering", desc: "+1% Shiny chance, unlock a new variant on 3rd buy", cost: 1, req: ["SPW-3"], infinite: true }
                ],
                bought: [0,0,0,0], 
                unlocked: [true, true, true, true], 
            },
            spawner: {
                name: "Spawner Upgrades",
                upgrades: [
                    { id: "SPW-1", name: "New Spawner", desc: "Unlock 1 new Spawner (max 2)", cost: 1, req: null, max: 2 },
                    { id: "SPW-2", name: "Orb Capacity", desc: "+25 Orb Cap (Max 2 upgrades)", cost: 1, req: null, max: 2 },
                    { id: "SPW-3", name: "Orb Variants", desc: "Unlock Orb Variants (money multiplier chance)", cost: 2, req: null },
                    { id: "SPW-4", name: "Double Drop", desc: "+5% Chance to double-drop (Max 10 ups)", cost: 1, req: null, max: 10 }
                ],
                bought: [0,0,0,0], 
                unlocked: [true,true,true,true], 
            },
        },
        inSkillTree: false,
        maxTP: 0,
        spentTP: 0,
        currentTP: 0,
    };
    document.getElementById("boosts").style.display = "none"
    document.getElementById("rebirth").style.display = "none"
    document.getElementById("tier").style.display = "none"
    document.getElementById("weather").style.display = "none";

    document.getElementById("unlockBoostsButton").style.display = "none"
    document.getElementById("unlockRebirthButton").style.display = "inline-block"
    document.getElementById("unlockTierButton").style.display = "none"
    document.getElementById("unlockRBM").style.display = "none"
    document.getElementById("unlockWeatherButton").style.display = "none"

}

function getSTUpAmt(id) {
    if (!game || !game.skillTreeUpgs) return 0;
    for (const cat in game.skillTreeUpgs) {
        const catData = game.skillTreeUpgs[cat];
        if (!catData.upgrades) continue;
        const index = catData.upgrades.findIndex(u => u.id === id);
        if (index !== -1) return catData.bought[index];
    }
    return 0;
}

// Initialize the object immediately so other files can see it
reset();

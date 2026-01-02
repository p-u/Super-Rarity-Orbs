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
        spawnIntervals: [1000, 2000, 4000, 10000, 60000],
        baseLuck: 1,
        spawnerLuck: [1, 1.5, 2.5, 10, 100],
        numberFormat: "standard",
        upgradeCosts: [50, 100, 500, 250, 1500, 25000, 2000, 8000, 75000, 1e10, 1e9, 5e13, 2.5e13],
        newUpgCosts: [200],
        diamondLuck: 1,
        spawnersUnlocked: 1, 
        boostTimes: [0,0,0],
        boostsUnlocked: false,
        rebirthUnlocked: false,
        tierUnlocked: false,
        orbsObtained: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        timePlayed: 0,
        timeSpentinTier: 0,
        timeSpentinReb: 0,
        mechanicsUnlocked: 0,
        rebirths: 0,
        tiers: 0,
        boostData: {
            1: { baseCost: 100, increment: 10, uses: 0 },
            2: { baseCost: 400, increment: 50, uses: 0 },
            3: { baseCost: 100, increment: 10, uses: 0 },
            4: { baseCost: 400, increment: 50, uses: 0 },
            5: { baseCost: 500, increment: 100, uses: 0 }
        }
    };
    document.getElementById("boosts").style.display = "none"
    document.getElementById("rebirth").style.display = "none"
    document.getElementById("tier").style.display = "none"

    document.getElementById("unlockBoostsButton").style.display = "inline-block"
    document.getElementById("unlockRebirthButton").style.display = "none"
    document.getElementById("unlockTierButton").style.display = "none"
    document.getElementById("unlockRBM").style.display = "none"

}

// Initialize the object immediately so other files can see it
reset();

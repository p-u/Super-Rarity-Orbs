const illions = ["thousand","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion","decillion","undecillion","duodecillion","tredecillion","quattuordecillion","quindecillion","sexdecillion","septendecillion","octodecillion","novemdecillion","vigintillion","unvigintillion","duovigintillion","trevigintillion","quattuorvigintillion","quinvigintillion","sexvigintillion","septenvigintillion","octovigintillion","novemvigintillion","trigintillion","untrigintillion","duotrigintillion","tretrigintillion","quattuortrigintillion","quintrigintillion","sextrigintillion","septentrigintillion","octotrigintillion","novemtrigintillion","quadragintillion","unquadragintillion","duoquadragintillion","trequadragintillion","quattuorquadragintillion","quinquadragintillion","sexquadragintillion","septenquadragintillion","octoquadragintillion","novemquadragintillion","quinquagintillion","unquinquagintillion","duoquinquagintillion","trequinquagintillion","quattuorquinquagintillion","quinquinquagintillion","sexquinquagintillion","septenquinquagintillion","octoquinquagintillion","novemquinquagintillion","sexagintillion","unsexagintillion","duosexagintillion","tresexagintillion","quattuorsexagintillion","quinsexagintillion","sexsexagintillion","septensexagintillion","octosexagintillion","novemsexagintillion","septuagintillion","unseptuagintillion","duoseptuagintillion","treseptuagintillion","quattuorseptuagintillion","quinseptuagintillion","sexseptuagintillion","septenseptuagintillion","octoseptuagintillion","novemseptuagintillion","octogintillion","unoctogintillion","duooctogintillion","treoctogintillion","quattuoroctogintillion","quinoctogintillion","sexoctogintillion","septenoctogintillion","octooctogintillion","novemoctogintillion","nonagintillion","unnonagintillion","duononagintillion","trenonagintillion","quattuornonagintillion","quinnonagintillion","sexnonagintillion","septennonagintillion","octononagintillion","novemnonagintillion","centillion","uncentillion"];
let lastVariantLevels = { spw3: -1, mn4: -1 };
const illionsShort = ["K","M","B","T","Qa","Qt","Sx","Sp","Oc","No","Dc","UDc","DDc","TDc","QaDc","QiDc","SxDc","SpDc","OcDc","NoDc","Vg","UVg","DVg","TVg","QaVg","QiVg","SxVg","SpVg","OcVg","NoVg","Tg","UTg","DTg","TTg","QaTg","QiTg","SxTg","SpTg","OcTg","NoTg","Qag","UQag","DQag","TQag","QaQag","QiQag","SxQag","SpQag","OcQag","NoQag","Qtg","UQtg","DQtg","TQtg","QaQtg","QiQtg","SxQtg","SpQtg","OcQtg","NoQtg","Sxg","USxg","DSxg","TSxg","QaSxg","QiSxg","SxSxg","SpSxg","OcSxg","NoSxg","Spg","USpg","DSpg","TSpg","QaSpg","QiSpg","SxSpg","SpSpg","OcSpg","NoSpg","Og","UOg","DOg","TOg","QaOg","QiOg","SxOg","SpOg","OcOg","NoOg","Ng","UNg","DNg","TNg","QaNg","QiNg","SxNg","SpNg","OcNg","NoNg","Ce","UCe"];
const rarities     = [1, 4, 15, 50, 250, 1200,7000, 30000,140000,750000,6e6, 2e7, 4.5e8, 7e9, 2.5e12, 7e13, 1.5e15, 3e16, 5.8e17, 8e19, 1.1e22, 1.4e24, 2.4e26, 7e27,  5e29, 5e30, 5e32, 1e34,    2.5e35, 1e38,   1.5e39, 2.25e40, 4e41, 1e43, 1e45];
const rarityNames = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythical', 'Exotic', 'Ethereal', 'Galactic', 'Divine', 'Transcendental', 'Angelic', 'Demonic', 'Void', 'Antimatter', 'Quantum', 'Extreme', 'Radiant', 'Celestial', 'Ascended', 'Forsaken', 'Astral', 'Supernova', 'Toxic', 'Nuclear', 'Lightning', 'Duke', 'Prince', 'King', 'Fusion', 'Fusion Mk. II', 'Fusion Mk. III', 'Fusion Mk. IV', 'Fusion Mk. V', 'Earth'];
const raritySizes = [6, 7, 7, 8, 8, 9, 9, 10, 10, 10, 11, 11, 11, 12, 13, 13, 13, 14, 14, 14, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
const rarityValues = [1, 3, 10, 25, 100, 300, 1000, 3000, 10000, 40000, 2.5e5, 5e5, 7e6, 4e7, 1e9, 1e10, 1e11, 1e12,      1e13,   5e14,  1e16,  2.5e17,  1e19, 1.5e20, 5e21, 2e22, 4e23, 2.5e24,  2.5e25, 1.5e27, 7.5e27, 4e28,    2e29, 2e30, 8e31]
const rarityColours = ['#bbbbbb', '#bbbbbb', '#45bb45', '#45bb45', '#4545bb', '#4545bb', '#8845bb', '#8845bb', '#ff8800', '#ff8800', '#ff0000', '#ff0000', '#ff7b00', '#bb24bb', '#4800ff', '#000000', '#8200ff', '#000042', '#00c8ff', '#0084ff','#82ff49', '#14c98d', '#ffffff', '#ffe500', '#ff0000', '#5c0000', '#333333', '#111111', '#c307eb', '#11053a', '#d946ff', "#ffffff", "#0ba67f", "#07fbdd", "#ef9a1f", "#fcf046", "#52e5f6", "#ffffff", "#0c1381", "#635cdd", "#9f0811", "#fb0102", "#fe4dfe", "#e167cf", "#ffa700", "#ff4000", "#1cd328","#03660f", "#ffd600", "#ffc800", "#f0e606", "#ebc808", "#118cc1", "#49b5e2", "#70bfff", "#709dff", "#f59540", "#f79947", "#1618ff", "#00efff", "#ffff00", "#00efff", "#ffa500", "#00efff", "#ffbf00", "#ff0062", "#e4c81b", "#66e799", "#6e5445", "#38ffe1"]
const weatherNames = ["Drizzle", "Rain", "Thunderstorm", "Snow", "Hail", "Avalanche", "Tornado", "Hurricane", "Asteroid Impact", "Meteor Shower"]
const weatherEff = [[0.5, 0, 0, 60], [0, 0.5, 0, 60], [0.5, 0.5, 0, 60], [1, 0.5, 0.1, 75], [1.25, 0.5, 0.25, 75], [1.75, 1, 0.25, 120], [2.5, 1, 0.25, 150], [2.5, 2, 0.25, 150], [2.5, 2, 2, 150], [5, 3, 2, 150]] // [[]] represents whole list, 1 weather is 1 list. 4 idx - Luck mult, Money mult, Diamonds mult (all additive), Weather duration (secs)
const weatherColours = ['#ADD8E6', '#4a90e2', '#4a4ae2', '#ffffff', '#87ABA5', '#e3f4ff', '#888888', '#555555', '#767676', '#242ab2']

setAutoSave()

//If the user confirms the hard reset, resets all variables, saves and refreshes the page
function hardReset() {
    if (confirm("Are you sure you want to reset? You will lose everything!")) {
        reset()
        save()
        location.reload()
    }
}
  
function save() {
    game.lastSave = Date.now();
    localStorage.setItem("BetaSROSave", JSON.stringify(game));
}
  
function setAutoSave() {
    setInterval(save, 5000);
    autosaveStarted = true;
}
  
function load() {
        reset()
        let loadgame = JSON.parse(localStorage.getItem("BetaSROSave"))
        if (loadgame != null) {loadGame(loadgame)}
        buildBoard()
}
  
load()
updateBoostButtons()
  
function exportGame() {
    save()
    navigator.clipboard.writeText(btoa(JSON.stringify(game))).then(function() {
        alert("Copied to clipboard!")
    }, function() {
        alert("Error copying to clipboard, try again...")
    });
}
  
function importGame() {
    loadgame = JSON.parse(atob(prompt("Input your save here:")))
    if (loadgame && loadgame != null && loadgame != "") {
        reset()
        loadGame(loadgame)
        save()
        location.reload()
    }
    else {
        alert("Invalid input.")
    }
}

function getBoostCost(id) {
  const b = game.boostData[id];
  return b.baseCost + b.uses * b.increment;
}
  
function loadGame(loadgame) {
    let loadKeys = Object.keys(loadgame);
    for (i=0; i<loadKeys.length; i++) {
        if (loadgame[loadKeys[i]] != "undefined") {
            let thisKey = loadKeys[i];
            if (Array.isArray(loadgame[thisKey])) {
                game[loadKeys[i]] = loadgame[thisKey].map((x) => {return x})
            }
            else if (thisKey === 'skillTreeUpgs') {
                for (const cat in loadgame.skillTreeUpgs) {
                    if (game.skillTreeUpgs[cat]) {
                        if (loadgame.skillTreeUpgs[cat].bought) {
                            // Ensure the array matches the current length of upgrades
                            loadgame.skillTreeUpgs[cat].bought.forEach((val, idx) => {
                                if (game.skillTreeUpgs[cat].bought[idx] !== undefined) {
                                    game.skillTreeUpgs[cat].bought[idx] = val;
                                }
                            });
                        }
                        if (loadgame.skillTreeUpgs[cat].unlocked) {
                            loadgame.skillTreeUpgs[cat].unlocked.forEach((val, idx) => {
                                if (game.skillTreeUpgs[cat].unlocked[idx] !== undefined) {
                                    game.skillTreeUpgs[cat].unlocked[idx] = val;
                                }
                            });
                        }
                    }
                }
            }
            else {game[loadKeys[i]] = loadgame[loadKeys[i]]}
        }
    }
    if (game.extUpgCosts[1] < 10000) {
        game.extUpgCosts[1] = 10000;
    }
    let val = Math.log(game.extUpgCosts[1] / 25000) / Math.log(4)
    if (Math.abs(val - Math.round(val)) < 0.001 && val >= 0) {
        let level = Math.round(val);
        game.extUpgCosts[1] = 10000 * (5 ** level);
    }
    if (game.orbsObtained.length < 99) {
        while (game.orbsObtained.length < 99) {
            game.orbsObtained.push(0);
        }
    }

    while (game.spawnIntervals.length < 7) {
        let i = game.spawnIntervals.length;
        if (i == 3) {
            game.spawnIntervals.push(10000)
            game.spawnerLuck.push(10)
            game.upgradeCosts.push(1e10)
            game.upgradeCosts.push(1e9)
        } else if (i == 4) {
            game.spawnIntervals.push(60000)
            game.spawnerLuck.push(100)
            game.upgradeCosts.push(5e13)
            game.upgradeCosts.push(2.5e13)
        } else if (i == 5) {
            game.spawnIntervals.push(120000)
            game.spawnerLuck.push(1000)
            game.upgradeCosts.push(1e20)
            game.upgradeCosts.push(1e22)
        } else if (i == 6) {
            game.spawnIntervals.push(300000)
            game.spawnerLuck.push(10000)
            game.upgradeCosts.push(1e33)
            game.upgradeCosts.push(1e34)
        }
    }
    
    if (game.mechanicsUnlocked == 0) {
        if (game.boostsUnlocked) game.mechanicsUnlocked = 1
        if (game.rebirthUnlocked) game.mechanicsUnlocked = 2
        if (game.tierUnlocked) game.mechanicsUnlocked = 4
    }
    if (game.boostData[6] == undefined) {
        game.boostData[6] = { baseCost: 250, increment: 25, uses: 0 }
    }

    if (game.boostTimes.length == 3) {
        game.boostTimes.push(0)
    }
    game.inSkillTree = false;
    document.getElementById("skillTree").style.display = "none";
    
    //Update upgrade text
    recalcCurrentUpgrades()
    updateAllUpgradeText()
    updateVisuals()

    //Boosts
    if (game.boostTimes[0] == 0) {
        document.getElementsByClassName("boostText")[0].style.color = "#bbb"
        document.getElementsByClassName("boostText")[0].innerText = "2x money gain - 0:00 (not active)"
    }
    else {
        document.getElementsByClassName("boostText")[0].style.color = "#8f8"
        document.getElementsByClassName("boostText")[0].innerText = "2x money gain - " + Math.floor(game.boostTimes[0]/60) + ":" + (game.boostTimes[0]%60).toString().padStart(2, "0")
    }
    if (game.boostTimes[1] == 0) {
        document.getElementsByClassName("boostText")[1].style.color = "#bbb"
        document.getElementsByClassName("boostText")[1].innerText = "2x luck - 0:00 (not active)"
    }
    else {
        document.getElementsByClassName("boostText")[1].style.color = "#8f8"
        document.getElementsByClassName("boostText")[1].innerText = "2x luck - " + Math.floor(game.boostTimes[1]/60) + ":" + (game.boostTimes[1]%60).toString().padStart(2, "0")
    }
    document.getElementsByClassName("boostText")[2].innerText = "Duplicate cooldown: " + game.boostTimes[2] + "s"
    document.getElementById("unlockWeatherButton").style.display = "none";
    document.getElementById("weather").style.display = "none";
    if (game.mechanicsUnlocked >= 1) {
        document.getElementById("rebirth").style.display = "inline-block";
        document.getElementById("unlockRebirthButton").style.display = "none";
        document.getElementById("unlockBoostsButton").style.display = "inline-block";
    }
    if (game.mechanicsUnlocked >= 2) {
        document.getElementById("boosts").style.display = "inline-block";
        document.getElementById("unlockBoostsButton").style.display = "none";
        document.getElementById("unlockRBM").style.display = "inline-block";
    }
    if (game.mechanicsUnlocked >= 3) {
        document.getElementById("unlockRBM").style.display = "none";
        document.getElementById("unlockTierButton").style.display = "inline-block";
    }
    if (game.mechanicsUnlocked >= 4) {
        document.getElementById("tier").style.display = "inline-block";
        document.getElementById("unlockTierButton").style.display = "none";
        document.getElementById("unlockWeatherButton").style.display = "inline-block";
    }
    if (game.mechanicsUnlocked >= 5) {
        document.getElementById("unlockWeatherButton").style.display = "none";
        document.getElementById("weather").style.display = "inline-block";
    }

    if (game.boostData[2].increment == 50) {
        game.boostData[2].increment = 75
        game.boostData[4].increment = 75
    }

    let add = Math.log(game.extUpgCosts[0] / 1e33)/Math.log(1e15) + Math.log(game.extUpgCosts[1] / 10000)/Math.log(5)
    game.maxTP = game.tiers + add
    game.currentTP = game.tiers + add - (game.spentTP || 0)
    if (game.tiers >= 1) {
        game.maxTP++
        game.currentTP++
    }
    
    //Rarity list
    game.raritiesDisplayed = 0
    updateRarityList()
    
    // Set difficulty selector
    if (game.difficulty) {
        document.getElementById("difficultySelect").value = game.difficulty;
    } else {
        game.difficulty = "orig"; // Default if missing
        document.getElementById("difficultySelect").value = "orig";
    }
    updateWeatherChance()
    game.ttlOrbSpawn = game.orbsObtained.reduce((acc, currentValue) => acc + currentValue, 0);
}

function spawn(id) {
    if (game.inSkillTree) {
        setTimeout(() => spawn(id), game.spawnIntervals[id-1]);
        return;
    }
    if (game.spawnersUnlocked >= id) {
        createOrb(id);
        if (Math.random() < getSTUpAmt("SPW-4")*0.05) createOrb(id); // double spawn
    }
    setTimeout(() => spawn(id), game.spawnIntervals[id-1]);
}

for (let i = 1; i <= 7; i++) {
    spawn(i)
}

function format(x,precision=0,forceLargeFormat=false) {
	if (x==Infinity) {return "Infinity"}
	else if (game.numberFormat == "standard" && (forceLargeFormat || x>=1e9)) {
		let exponent = Math.floor(Math.log10(x) / 3)
		return (x/(1000**exponent)).toFixed(2) + illionsShort[exponent-1]
	}
	else if (game.numberFormat == "standardLong" && (forceLargeFormat || x>=1e9)) {
		let exponent = Math.floor(Math.log10(x) / 3)
		return (x/(1000**exponent)).toFixed(2) + " " + illions[exponent-1]
	}
	else if (game.numberFormat == "scientific" && (forceLargeFormat || x>=1e9)) {
		let exponent = Math.floor(Math.log10(x))
		return (Math.floor(x/(10**exponent)*100)/100).toFixed(2) + "e" + exponent
	}
    else if (x >= 1000) {
		return Math.floor(x).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}
	else {
		let highestPrecision = 2-Math.floor(Math.log10(x))
		return x.toFixed(Math.min(precision, highestPrecision))
	}
}

function getRarity(spawner) {
    //Find the highest rarity smaller than totalLuck*1M
    let highestRarity = 0;
    while (rarities[highestRarity] < game.totalLuck * game.spawnerLuck[spawner-1]*1e6) {
        highestRarity++;
    }
    var rarity = Math.random();
    for (var i = highestRarity; i>0; i--) {
        if (rarity < 1/rarities[i]*game.totalLuck * game.spawnerLuck[spawner-1]) {
            return i + 1;
        }
    }
    return 1
}

function formatTime(x) {
    let hr = Math.floor(x/3600)
    let min = Math.floor(x/60) - hr*60
    let sec = x - hr*3600 - min*60
    return String(hr) + ":" + String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0")
}

function updateText() {
    if (game.inSkillTree) return;
    document.getElementById('money').innerText = "Money: $" + format(game.money);
    let moneyMult = game.moneyMultiplier * (game.boostTimes[0] ? 2 : 1) * game.weatherMoney
    if (game.mechanicsUnlocked>=3) moneyMult *= 1.06**game.highestRarity
    if (game.tiers >= 1) {
        moneyMult *= (1.05 ** getSTUpAmt("MN-1"))
    }
    if (game.mechanicsUnlocked>= 5) {
        moneyMult *= game.weatherMult[1]
    }
    document.getElementById("multiplier").innerText = "Total Money multiplier: x" + format(moneyMult,2);
    let diamondMult = 1
    if (game.difficulty === "baby") {
        diamondMult = 2
    }
    if (game.difficulty === "extreme") {
        diamondMult = 0.5
    }
    if (game.rebirths >= 50) {
        diamondMult *= (0.025 * game.rebirths) - 0.15
    }
    diamondMult *= (1.05 ** getSTUpAmt("MN-3")) * game.weatherMult[2]
    game.diamondMult = diamondMult
    document.getElementById("diamondMult").innerText = "Total Diamond multiplier: x" + format(diamondMult,2);
    
    game.totalLuck = game.baseLuck * (game.boostTimes[1] ? 2 : 1) * game.diamondLuck;
    if (game.tiers >= 1) {
        game.totalLuck *= (1.1 ** getSTUpAmt("MN-2"))
    }
    if (game.mechanicsUnlocked>= 5) {
        game.totalLuck *= game.weatherMult[0]
    }
    let RL2eff = 1 + (Math.log2(Math.log10(Math.max(game.totalLuck, 100)))/20*getSTUpAmt("RL-2"))
    if (game.totalLuck < game.bestLuck) {
        if ((game.totalLuck*RL2eff) < game.bestLuck) {
            game.totalLuck = game.totalLuck * RL2eff
        } else if ((game.totalLuck*RL2eff) > game.bestLuck) {
            game.totalLuck = game.bestLuck
        }
    }
    if (game.bestLuck < game.totalLuck) {
        game.bestLuck = game.totalLuck
    }
    document.getElementById("luck").innerText = "Total Luck: x" + format(game.totalLuck, 2);
    
    document.getElementById('diamonds').innerText = "Diamonds: " + format(Math.floor(game.diamonds));
    document.getElementById('diamondChance').innerText = "Diamond chance: " + format(game.diamondChance*100, 2) + "%";
    
    let maxOrbs = 100 + getSTUpAmt("SPW-2") * 25;
    document.getElementById("orbCapText").innerText = "Orbs: " + currentOrbs + " / " + maxOrbs;
    for (let i=0; i<=6; i++) {
        document.getElementsByClassName("spawnerInterval")[i].innerText = "Spawn interval: " + (game.spawnIntervals[i]/1000).toFixed(3) + "s";
        document.getElementsByClassName("spawnerLuck")[i].innerText = "Luck: x" + format(game.totalLuck*game.spawnerLuck[i], 2);
    }
    let norm = "Rebirthing will reset your money, upgrades and boost times! It will also halve your diamonds."
    let norming = "You have rebirthed " + format(game.rebirths) + " times\nRebirth luck multiplier: x" + format(2 ** game.rebirths)
    if (game.tiers >= 1) {
        if (game.rebirths >= 50) {
            document.getElementById('rebirthDesc').innerHTML = norm + "<br>After 100 Rebirths, Rebirths ?????."
        } else if (game.rebirths >= 25) {
            document.getElementById('rebirthDesc').innerHTML = norm + "<br>After 50 Rebirths, Rebirths give a small boost to Diamonds."
        } else {
            document.getElementById('rebirthDesc').innerHTML = norm + "<br>At 25 Rebirths, unlock a new Luck upgrade that costs Diamonds."
        }
    } else {
        document.getElementById('rebirthDesc').innerText = norm
    }
    if (game.tiers >= 1) {
        document.getElementById('rebirthText').innerText = norming + "\nRebirth Diamond multiplier: x" + format((0.025 * game.rebirths) - 0.15, 3)
    } else {
        document.getElementById('rebirthText').innerText = norming
    }
    document.getElementById('tierText').innerHTML = `Your Tier is ${game.tiers} >> ${game.tiers+1}<br>Tier Luck Multiplier x${3**game.tiers} >> x${3**(game.tiers+1)}<br>Tier Money Multiplier x${2**game.tiers} >> x${2**(game.tiers+1)}`
    document.getElementById('weatherText').innerHTML = `You have ${game.weatherpts} Weather Points (WP) (+1/orb) <br> You have a 1/${format((1/game.diamondChance)*250)} chance to gain a Weather Orb`
    document.getElementById('WBoost').innerHTML = `Weather boost: x${format(game.weatherMult[0],2)} Luck, x${format(game.weatherMult[1],2)} Money, x${format(game.weatherMult[2],2)} Diamonds`

    if (getSTUpAmt("BST-1")) {
        game.boostData[1].baseCost = 60, game.boostData[3].baseCost = 60
        game.boostData[2].baseCost = 400, game.boostData[4].baseCost = 400, game.boostData[5].baseCost = 400
    }
    if (document.getElementById("SWChance").checked) {
        ttT = ""
        for (let i=0; i<=game.weatherUnlocked-1; i++) {
            ttT += "<span style='color: " + weatherColours[i] + "'>" + weatherNames[i] + "</span>: " + format(game.weatherChances[i]*100, 2) + "% Chance"
            if (!game.weatherDuration || game.weatherDuration[i] == 0) {
                ttT += " (Not Activated)"
            } else {
                ttT += " (" + game.weatherDuration[i] + " seconds left)"
            }
            // Check for any effects
            if (weatherEff[i][0] > 0 || weatherEff[i][1] > 0 || weatherEff[i][2] > 0) {
                 ttT += " <br>Effect:"
                 if (weatherEff[i][0] > 0) ttT += " +x" + weatherEff[i][0] + " Luck";
                 if (weatherEff[i][1] > 0) ttT += " +x" + weatherEff[i][1] + " Money";
                 if (weatherEff[i][2] > 0) ttT += " +x" + weatherEff[i][2] + " Diamonds";
            }
            ttT += "<br><br>"
        }
        document.getElementById("weatherDTText").innerHTML = ttT
    } else {
        document.getElementById("weatherDTText").innerHTML = ""
    }
}
updateText()
setInterval(updateText, 100);

function updateBoosts() {
    if (game.inSkillTree) return;
    if (game.boostTimes[0] > 0) game.boostTimes[0]--
    if (game.boostTimes[1] > 0) game.boostTimes[1]--
    if (game.boostTimes[2] > 0) game.boostTimes[2]--
    
    // Weather Decay
    if (game.weatherDuration) {
        for (let i = 0; i < game.weatherDuration.length; i++) {
             if (game.weatherDuration[i] > 0) game.weatherDuration[i]--;
        }
    }
    // Weather Roll Cooldown
    if (game.weatherRollCooldown > 0) game.weatherRollCooldown--;
    updateWeatherBoosts()

    game.timePlayed ++
    game.timeSpentinTier ++
    game.timeSpentinReb ++
    if (game.boostTimes[0] == 0) {
        document.getElementById("moneyBoostText").style.color = "#bbb"
        document.getElementById("moneyBoostText").innerText = "2x money gain - 0:00 (not active)"
    }
    else {
        document.getElementById("moneyBoostText").style.color = "#8f8"
        document.getElementById("moneyBoostText").innerText = "2x money gain - " + Math.floor(game.boostTimes[0]/60) + ":" + (game.boostTimes[0]%60).toString().padStart(2, "0")
    }
    if (game.boostTimes[1] == 0) {
        document.getElementById("luckBoostText").style.color = "#bbb"
        document.getElementById("luckBoostText").innerText = "2x luck - 0:00 (not active)"
        updateRarityList()
    }
    else {
        document.getElementById("luckBoostText").style.color = "#8f8"
        document.getElementById("luckBoostText").innerText = "2x luck - " + Math.floor(game.boostTimes[1]/60) + ":" + (game.boostTimes[1]%60).toString().padStart(2, "0")
    }

    if (game.boostTimes[3] > 0) {
        game.boostTimes[3]--
        if (game.boostTimes[3] == 0) {
            document.getElementById("ruoBoostText").style.color = "#bbb"
            document.getElementById("ruoBoostText").innerText = "Obstacle Remover - 0:00 (not active)"
            buildBoard();
        } else if (game.boostTimes[3] == 15) {
            // Active phase ends, obstacles return
            document.getElementById("ruoBoostText").style.color = "#f88" // Red for cooldown
            document.getElementById("ruoBoostText").innerText = "Obstacle Remover - 0:15 (cooldown)"
            buildBoard();
        } else if (game.boostTimes[3] > 15) {
            document.getElementById("ruoBoostText").style.color = "#8f8"
            let activeTime = game.boostTimes[3] - 15;
            document.getElementById("ruoBoostText").innerText = "Obstacle Remover - " + Math.floor(activeTime/60) + ":" + (activeTime%60).toString().padStart(2, "0")
        } else {
            // Cooldown phase
            document.getElementById("ruoBoostText").style.color = "#f88"
            document.getElementById("ruoBoostText").innerText = "Obstacle Remover - " + Math.floor(game.boostTimes[3]/60) + ":" + (game.boostTimes[3]%60).toString().padStart(2, "0") + " (CD)"
        }
    }
    document.getElementById("dupeBoostText").innerText = "Duplicate cooldown: " + game.boostTimes[2] + "s"
}
updateBoosts()
setInterval(updateBoosts, 1000);
setInterval(updateRarityList, 200);
setInterval(updateAllUpgradeText, 1000);

function updateWeatherBoosts() {
    let luck = 1
    let cash = 1
    let dia = 1
    for (let i=0; i<game.weatherDuration.length; i++) {
        if (game.weatherDuration[i] > 0) {
            luck += weatherEff[i][0]
            cash += weatherEff[i][1]
            dia += weatherEff[i][2]
        }
    }
    game.weatherMult = [luck, cash, dia]
}

function updateAllUpgradeText() {
    document.getElementById("increaseMultiplierButton").innerHTML = "Increase money multiplier<br>x" + format(game.moneyMultiplier*game.weatherMoney,2) + " >> x" + format(game.moneyMultiplier*1.15*game.weatherMoney,2) + "<br>Costs $" + format(game.upgradeCosts[0])
    document.getElementById("increaseLuckButton").innerHTML = "Increase base luck<br>x" + format(game.baseLuck,2) + " >> x" + format(game.baseLuck*1.2,2) + "<br>Costs $" + format(game.upgradeCosts[1])
    document.getElementById("increaseDiamondChanceButton").innerHTML = "Increase diamond chance<br>" + format(game.diamondChance*100, 2) + "% >> " + format((game.diamondChance+0.001)*100, 2) + "%<br>Costs $" + format(game.upgradeCosts[2])
    document.getElementById("xLuckBODiamondButton").innerHTML = "Multiply luck further! (Keep on Tier)<br>x" + format(game.diamondLuck,2) + " >> x" + format(game.diamondLuck*1.1,2) + "<br>Costs " + format(game.newUpgCosts[0]) + " Diamonds"
    for (let i=1; i<=3; i++) {
        if (game.spawnIntervals[i-1]*0.95 < 100) {
            document.getElementsByClassName("decreaseIntervalButton")[i-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[i-1]/1000).toFixed(3) + "s >> " + "0.100s<br>Costs $" + format(game.upgradeCosts[2+i])
        } else {
            document.getElementsByClassName("decreaseIntervalButton")[i-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[i-1]/1000).toFixed(3) + "s >> " + (game.spawnIntervals[i-1]/1000*0.95).toFixed(3)  + "s<br>Costs $" + format(game.upgradeCosts[2+i])
        }
        document.getElementsByClassName("increaseSpawnerLuckButton")[i-1].innerHTML = "Increase luck<br>x" + format(game.spawnerLuck[i-1],2) + " >> x" + format(game.spawnerLuck[i-1]*1.1,2) + "<br>Costs $" + format(game.upgradeCosts[5+i])
    }
    document.getElementById("WPxMoney").innerHTML = "Multiply Money! (Resets on tier)<br>x" + format(game.weatherMoney,2) + " >> x" + format(game.weatherMoney*1.1,2) + "<br>Costs " + format(game.weatherUpCosts[2]) + " WP"
    for (let i=4; i<=7; i++) {
        if (game.spawnIntervals[i-1]*0.95 < 100) {
            document.getElementsByClassName("decreaseIntervalButton")[i-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[i-1]/1000).toFixed(3) + "s >> " + "0.100s<br>Costs $" + format(game.upgradeCosts[1+2*i])
        } else {
            document.getElementsByClassName("decreaseIntervalButton")[i-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[i-1]/1000).toFixed(3) + "s >> " + (game.spawnIntervals[i-1]/1000*0.95).toFixed(3)  + "s<br>Costs $" + format(game.upgradeCosts[1+2*i])
        }
        document.getElementsByClassName("increaseSpawnerLuckButton")[i-1].innerHTML = "Increase luck<br>x" + format(game.spawnerLuck[i-1],2) + " >> x" + format(game.spawnerLuck[i-1]*1.1,2) + "<br>Costs $" + format(game.upgradeCosts[2+2*i])
    }
    if (document.getElementById("bulkReb").checked) {
        if (getSTUpAmt("MAX-3") >= 1) {
            let projreb = Math.floor((Math.log(game.money / game.rebBaseCost) / Math.log(game.rebScaling)) + 1)
            let bulkreb = Math.max(projreb-game.rebirths, 1)
            let pricereb = game.rebScaling ** (game.rebirths + bulkreb - 1) * game.rebBaseCost
            let costColor = game.money >= pricereb ? "#8f8" : "#f00"
            document.getElementById('rebirthButton').innerHTML = "<b>Rebirth (BULK ON)</b><br><span style='color: " + costColor + "'>$" + format(game.money) + "/$" + format(pricereb) + "</span><br>Luck x" + format(2 ** game.rebirths) + " >> x" + format(2 ** (game.rebirths + bulkreb)) + "<br> +" + format(bulkreb) + " Rebirths on rebirth <br>" + "Next Rebirth costs $" + format(pricereb*game.rebScaling)
        } else {
            let cost = game.rebScaling ** game.rebirths * game.rebBaseCost
            let costColor = game.money >= cost ? "#8f8" : "#f00"
            document.getElementById('rebirthButton').innerHTML = "<b>Rebirth (BULK OFF)</b><br><span style='color: " + costColor + "'>$" + format(game.money) + "/$" + format(cost) + "</span><br>Luck x" + format(2 ** game.rebirths) + " >> x" + format(2 ** (game.rebirths + 1))
        }
    } else {
        let cost = game.rebScaling ** game.rebirths * game.rebBaseCost
        let costColor = game.money >= cost ? "#8f8" : "#f00"
        document.getElementById('rebirthButton').innerHTML = "<b>Rebirth</b><br><span style='color: " + costColor + "'>$" + format(game.money) + "/$" + format(cost) + "</span><br>Luck x" + format(2 ** game.rebirths) + " >> x" + format(2 ** (game.rebirths + 1))
    }
    if (game.tiers == 0) {
        document.getElementById('tierButton').innerHTML = "<b>Tier Up</b><br>Cost: 50 Void Orbs"
    } else if (game.tiers == 1) {
        document.getElementById('tierButton').innerHTML = "<b>Tier Up</b><br>Cost: 10 Forsaken Orbs"
    } else if (game.tiers == 2) {
        document.getElementById('tierButton').innerHTML = "<b>Tier Up</b><br>Cost: 5 Fusion Orbs"
    } else {
        document.getElementById('tierButton').innerHTML = "<b>Tier Up</b><br>(Maxed Tier Unlocked)"
    }
    if (game.weatherUnlocked == 9) {
        document.getElementById("newWeather").innerHTML = "Unlock a new Weather that is available to be rolled!<br>Currently: " + game.weatherUnlocked + " weathers available to be rolled<br>(Maxed)"
    } else {
        document.getElementById("newWeather").innerHTML = "Unlock a new Weather that is available to be rolled!<br>Currently: " + game.weatherUnlocked + " weathers available to be rolled<br>Costs " + format(game.weatherUpCosts[1]) + " WP"
    }
    if (game.weatherRollCooldown > 0) {
        document.getElementById("rollWeather").innerHTML = "Cooldown: " + game.weatherRollCooldown + "s"
    } else {
        document.getElementById("rollWeather").innerHTML = "Roll for a new Weather<br>Costs " + format(Math.round(game.weatherUpCosts[0])) + " WP"
    }
    document.getElementById('moneyTP').innerHTML = "Get 1 TP<br>Costs $" + format(game.extUpgCosts[0])
    document.getElementById('diamondTP').innerHTML = "Get 1 TP<br>Costs " + format(game.extUpgCosts[1]) + " Diamonds"
}

function updateVisuals() {
    if (game.money >= game.upgradeCosts[0]) {
        document.getElementById("increaseMultiplierButton").style.backgroundImage = "linear-gradient(#9e9, #7c7)";
        document.getElementById("increaseMultiplierButton").style.border = "2px solid #060";
    } else {
        document.getElementById("increaseMultiplierButton").style.backgroundImage = "linear-gradient(#fff, #bbb)";
        document.getElementById("increaseMultiplierButton").style.border = "2px solid #888";
    }
    if (game.money >= game.upgradeCosts[1]) {
        document.getElementById("increaseLuckButton").style.backgroundImage = "linear-gradient(#9e9, #7c7)";
        document.getElementById("increaseLuckButton").style.border = "2px solid #060";
    } else {
        document.getElementById("increaseLuckButton").style.backgroundImage = "linear-gradient(#fff, #bbb)";
        document.getElementById("increaseLuckButton").style.border = "2px solid #888";
    }
    if (game.money >= game.upgradeCosts[2]) {
        document.getElementById("increaseDiamondChanceButton").style.backgroundImage = "linear-gradient(#9e9, #7c7)";
        document.getElementById("increaseDiamondChanceButton").style.border = "2px solid #060";
    } else {
        document.getElementById("increaseDiamondChanceButton").style.backgroundImage = "linear-gradient(#fff, #bbb)";
        document.getElementById("increaseDiamondChanceButton").style.border = "2px solid #888";
    }
    for (let i=1; i<=3; i++) {
        if ((game.money >= game.upgradeCosts[2+i]) && (game.spawnIntervals[i-1] > 100)) {
            document.getElementsByClassName("decreaseIntervalButton")[i-1].style.backgroundImage = "linear-gradient(#9e9, #7c7)";
            document.getElementsByClassName("decreaseIntervalButton")[i-1].style.border = "2px solid #060";
        } else {
            document.getElementsByClassName("decreaseIntervalButton")[i-1].style.backgroundImage = "linear-gradient(#fff, #bbb)";
            document.getElementsByClassName("decreaseIntervalButton")[i-1].style.border = "2px solid #888";
        }
        if (game.money >= game.upgradeCosts[5+i]) {
            document.getElementsByClassName("increaseSpawnerLuckButton")[i-1].style.backgroundImage = "linear-gradient(#9e9, #7c7)";
            document.getElementsByClassName("increaseSpawnerLuckButton")[i-1].style.border = "2px solid #060";
        } else {
            document.getElementsByClassName("increaseSpawnerLuckButton")[i-1].style.backgroundImage = "linear-gradient(#fff, #bbb)";
            document.getElementsByClassName("increaseSpawnerLuckButton")[i-1].style.border = "2px solid #888";
        }
    }
    for (let i=4; i<=7; i++) {
        if (game.money >= game.upgradeCosts[1+2*i]) {
            document.getElementsByClassName("decreaseIntervalButton")[i-1].style.backgroundImage = "linear-gradient(#9e9, #7c7)";
            document.getElementsByClassName("decreaseIntervalButton")[i-1].style.border = "2px solid #060";
        } else {
            document.getElementsByClassName("decreaseIntervalButton")[i-1].style.backgroundImage = "linear-gradient(#fff, #bbb)";
            document.getElementsByClassName("decreaseIntervalButton")[i-1].style.border = "2px solid #888";
        }
        if (game.money >= game.upgradeCosts[2+2*i]) {
            document.getElementsByClassName("increaseSpawnerLuckButton")[i-1].style.backgroundImage = "linear-gradient(#9e9, #7c7)";
            document.getElementsByClassName("increaseSpawnerLuckButton")[i-1].style.border = "2px solid #060";
        } else {
            document.getElementsByClassName("increaseSpawnerLuckButton")[i-1].style.backgroundImage = "linear-gradient(#fff, #bbb)";
            document.getElementsByClassName("increaseSpawnerLuckButton")[i-1].style.border = "2px solid #888";
        }
    }
    if (game.diamonds >= game.newUpgCosts[0]) {
        document.getElementById("xLuckBODiamondButton").style.backgroundImage = "linear-gradient(#9e9, #7c7)";
        document.getElementById("xLuckBODiamondButton").style.border = "2px solid #060";
    } else {
        document.getElementById("xLuckBODiamondButton").style.backgroundImage = "linear-gradient(#fff, #bbb)";
        document.getElementById("xLuckBODiamondButton").style.border = "2px solid #888";
    }
    if (game.diamonds >= game.extUpgCosts[1]) {
        document.getElementById("diamondTP").style.backgroundImage = "linear-gradient(#9e9, #7c7)";
        document.getElementById("diamondTP").style.border = "2px solid #060";
    } else {
        document.getElementById("diamondTP").style.backgroundImage = "linear-gradient(#fff, #bbb)";
        document.getElementById("diamondTP").style.border = "2px solid #888";
    }
    if (game.money >= game.extUpgCosts[0]) {
        document.getElementById("moneyTP").style.backgroundImage = "linear-gradient(#9e9, #7c7)";
        document.getElementById("moneyTP").style.border = "2px solid #060";
    } else {
        document.getElementById("moneyTP").style.backgroundImage = "linear-gradient(#fff, #bbb)";
        document.getElementById("moneyTP").style.border = "2px solid #888";
    }
    if (game.weatherRollCooldown > 0) {
        document.getElementById("rollWeather").style.backgroundImage = "linear-gradient(#888, #555)";
        document.getElementById("rollWeather").style.border = "2px solid #444";
        document.getElementById("rollWeather").style.cursor = "not-allowed";
        document.getElementById("rollWeather").style.opacity = "0.7";
    } else if (game.weatherpts >= Math.round(game.weatherUpCosts[0])) {
        document.getElementById("rollWeather").style.backgroundImage = "linear-gradient(#9e9, #7c7)";
        document.getElementById("rollWeather").style.border = "2px solid #060";
        document.getElementById("rollWeather").style.cursor = "pointer";
        document.getElementById("rollWeather").style.opacity = "1";
    } else {
        document.getElementById("rollWeather").style.backgroundImage = "linear-gradient(#fff, #bbb)";
        document.getElementById("rollWeather").style.border = "2px solid #888";
        document.getElementById("rollWeather").style.cursor = "default";
        document.getElementById("rollWeather").style.opacity = "1";
    }
    if (game.weatherpts >= game.weatherUpCosts[1] && game.weatherUnlocked < 9) {
        document.getElementById("newWeather").style.backgroundImage = "linear-gradient(#9e9, #7c7)";
        document.getElementById("newWeather").style.border = "2px solid #060";
    } else {
        document.getElementById("newWeather").style.backgroundImage = "linear-gradient(#fff, #bbb)";
        document.getElementById("newWeather").style.border = "2px solid #888";
    }
    if (game.weatherpts >= game.weatherUpCosts[2]) {
        document.getElementById("WPxMoney").style.backgroundImage = "linear-gradient(#9e9, #7c7)";
        document.getElementById("WPxMoney").style.border = "2px solid #060";
    } else {
        document.getElementById("WPxMoney").style.backgroundImage = "linear-gradient(#fff, #bbb)";
        document.getElementById("WPxMoney").style.border = "2px solid #888";
    }
    if (canAffordTier()) {
        document.getElementById("tierButton").style.backgroundImage = "linear-gradient(#9e9, rgba(218, 178, 0, 1))";
        document.getElementById("tierButton").style.border = "2px solid rgba(161, 124, 0, 1)";
    } else {
        document.getElementById("tierButton").style.backgroundImage = "linear-gradient(#fff, #bbb)";
        document.getElementById("tierButton").style.border = "2px solid #888";
    }

    // Auto-unlock 6 and 7 if skills are met
    if (game.spawnersUnlocked == 5 && getSTUpAmt("SPW-1") >= 1) {
        game.spawnersUnlocked = 6;
        updateText();
    }
    if (game.spawnersUnlocked == 6 && getSTUpAmt("SPW-1") >= 2) {
        game.spawnersUnlocked = 7;
        updateText();
    }

    for (let i = 1; i <= 7; i++) {
        const tab = document.getElementsByClassName("spawnerTab")[i-1];
        const buyBtn = (i > 1) ? document.getElementsByClassName("spawnerTabBuyButton")[i-2] : null;
        let isUnlocked = (game.spawnersUnlocked >= i);
        if (isUnlocked) {
            if (tab) tab.style.display = "block";
            if (buyBtn) buyBtn.style.display = "none";
        } else {
            if (tab) tab.style.display = "none";
            if (buyBtn) {
                let canShow = (game.spawnersUnlocked == i - 1);
                buyBtn.style.display = canShow ? "block" : "none";
            }
        }
    }

    let rarUnl = "You unlocked " + game.highestRarity + " Rarities."
    if (game.mechanicsUnlocked >= 3) {
        rarUnl = rarUnl + " Total rarities unlocked boost Money by " + (1.06**game.highestRarity).toFixed(2) + "x"
    }
    document.getElementById("raritiesUnlocked").innerText = rarUnl
    
    if (game.tiers >= 1) {
        document.getElementById("skillTreeToggle").style.display = "inline-block"
    } else {
        document.getElementById("skillTreeToggle").style.display = "none"
    }
    if (game.mechanicsUnlocked >= 5) {
        document.getElementById("TPup").style.display = "inline-block"
    } else {
        document.getElementById("TPup").style.display = "none"
    }
    document.getElementById("TPdisplay").innerText = "Current TP: " + game.currentTP + "/" + game.maxTP;
    
    // Sync settings
    document.getElementById("hideInfinityButton").checked = game.hideInfinity;

    // Boosts
    document.getElementById("obstacleRemoverArea").style.display = getSTUpAmt("BST-3") ? "block" : "none";

    // Max Buy Buttons
    const max1 = getSTUpAmt("MAX-1");
    const max2 = getSTUpAmt("MAX-2");
    const max4 = getSTUpAmt("MAX-4");

    document.getElementById("maxBuyButtonsArea").style.display = (max1 || max4) ? "flex" : "none";
    document.getElementById("maxBuyMainButton").style.display = max1 ? "block" : "none";
    document.getElementById("maxBuyAllSpawnersButton").style.display = max4 ? "block" : "none";
    
    const maxBuySpawnerBtns = document.getElementsByClassName("maxBuySpawnerButton");
    for (let i = 0; i < maxBuySpawnerBtns.length; i++) {
        let isUnlocked = (game.spawnersUnlocked >= i + 1);
        if (i === 5) isUnlocked = (getSTUpAmt("SPW-1") >= 1);
        if (i === 6) isUnlocked = (getSTUpAmt("SPW-1") >= 2);
        maxBuySpawnerBtns[i].style.display = (max2 && isUnlocked) ? "block" : "none";
    }

    if (game.ORActive == true && game.boostTimes[3] < 15) {
        buildBoard()
        game.ORActive = false
    }

    updateVariantIndex();

    let values = ["x2.0", "x1.0", "x1.5", "x1.0", "x2.0"]
    let colors = ["#8f8", "#ccc", "#bdf", "#ccc", "#8f8"]

    if (game.tiers >= 1) {
        values = ["x1.0", "x1.0", "x5.0", "x1.0", "x1.0"]
        colors = ["#ccc", "#ccc", "#efbf04", "#ccc", "#ccc"]
    }
    if (game.tiers >= 2) {
        values = ["x2.0", "x2.0", "x2.0", "x2.0", "x2.0"]
        colors = ["#8f8", "#8f8", "#8f8", "#8f8", "#8f8"]
    }
    if (game.tiers >= 3) {
        values = ["x2.25", "x1.75", "x2.0", "x1.75", "x2.25"]
        colors = ["#dab1da", "#90d5ff", "#8f8", "#90d5ff", "#dab1da"]
    }
    values.forEach((v, i) => {
        const el = document.getElementById("mult" + (i + 1))
        if (!el) return
        el.textContent = v
        el.style.color = colors[i]
    })
    
    if (game.tiers >= 3) {
        document.getElementById("multLeft").style.display = "block";
        document.getElementById("multRight").style.display = "block";
    } else {
        document.getElementById("multLeft").style.display = "none";
        document.getElementById("multRight").style.display = "none";
    }
    if ((game.rebirths >= 25) && (game.tiers >= 1)) {
        document.getElementById("xLuckBODiamondButton").style.display = "inline-block"
    } else {
        document.getElementById("xLuckBODiamondButton").style.display = "none"
    }
    document.getElementById("timePlayed").innerHTML = `Your Time Played is ${formatTime(game.timePlayed)}<br> Your last Rebirth was ${formatTime(game.timeSpentinReb)} ago<br>You are in Tier ${game.tiers} for ${formatTime(game.timeSpentinTier)}<br>Your best Luck is x${format(game.bestLuck, 2)}<br>Total Orbs Spawned: ${format(game.ttlOrbSpawn)}`
    document.getElementById("notationButton").innerText = "Notation: " + game.numberFormat;
    document.getElementById("autoPotionContainer").style.display = (getSTUpAmt("BST-4") >= 1) ? "block" : "none";
    if (document.getElementById("autoPotion").checked) {
        if (game.boostTimes[0] == 0) {
            buyBoost(1)
        }
        if (game.boostTimes[1] == 0) {
            buyBoost(3)
        }
    }
    document.getElementById("bulkRebContainer").style.display = (getSTUpAmt("MAX-3") >= 1) ? "block" : "none";

    // Difficulty Select Locking
    if (game.rebirths > 0) {
        document.getElementById("difficultySelect").disabled = true;
        document.getElementById("difficultySelect").title = "Difficulty is locked after Rebirthing";
    } else {
        document.getElementById("difficultySelect").disabled = false;
        document.getElementById("difficultySelect").title = "Choose your difficulty";
    }
}
updateVisuals()
setInterval(updateVisuals, 100);

function increaseMultiplier(updateUI = true) {
    if (game.money >= game.upgradeCosts[0]) {
        game.money -= game.upgradeCosts[0];
        game.moneyMultiplier *= 1.15;
        game.upgradeCosts[0] = Math.floor(game.upgradeCosts[0]*1.7);
        game.currentUpgrades[0]++;
        if (updateUI) {
            updateText()
            updateVisuals()
        }
        document.getElementById("increaseMultiplierButton").innerHTML = "Increase money multiplier<br>x" + format(game.moneyMultiplier*game.weatherMoney,2) + " >> x" + format(game.moneyMultiplier*1.15*game.weatherMoney,2) + "<br>Costs $" + format(game.upgradeCosts[0])
    }
}

function increaseLuck(updateUI = true) {
    if (game.money >= game.upgradeCosts[1]) {
        game.money -= game.upgradeCosts[1];
        game.baseLuck *= 1.2;
        game.upgradeCosts[1] *= 2;
        game.currentUpgrades[1]++;
        if (updateUI) {
            updateRarityList()
            updateText()
            updateVisuals()
        }
        document.getElementById("increaseLuckButton").innerHTML = "Increase base luck<br>x" + format(game.baseLuck,2) + " >> x" + format(game.baseLuck*1.2,2) + "<br>Costs $" + format(game.upgradeCosts[1])
    }
}

function increaseDiamondChance(updateUI = true) {
    if (game.money >= game.upgradeCosts[2]) {
        game.money -= game.upgradeCosts[2];
        game.diamondChance += 0.001
        game.upgradeCosts[2] *= 5;
        game.currentUpgrades[2]++;
        if (updateUI) {
            updateText()
            updateVisuals()
        }
        document.getElementById("increaseDiamondChanceButton").innerHTML = "Increase diamond chance<br>" + format(game.diamondChance*100, 2) + "% >> " + format((game.diamondChance+0.001)*100, 2) + "%<br>Costs $" + format(game.upgradeCosts[2])
    }
}

function decreaseInterval(x, updateUI = true) {
    if (game.spawnIntervals[x-1] > 100) {
        if (x <= 3) {
            if (game.money >= game.upgradeCosts[2+x]) {
                game.money -= game.upgradeCosts[2+x];
                game.spawnIntervals[x-1] *= 0.95;
                if (game.spawnIntervals[x-1] < 100) game.spawnIntervals[x-1] = 100
                game.upgradeCosts[2+x] = Math.floor(game.upgradeCosts[2+x]*(2.5+x*0.25));
                game.currentUpgrades[2+x]++;
                if (updateUI) {
                    updateText()
                    updateVisuals()
                }
                if (game.spawnIntervals[x-1]*0.95 < 100) {
                    document.getElementsByClassName("decreaseIntervalButton")[x-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[x-1]/1000).toFixed(3) + "s >> " + "0.100s<br>Costs $" + format(game.upgradeCosts[2+x])
                } else {
                    document.getElementsByClassName("decreaseIntervalButton")[x-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[x-1]/1000).toFixed(3) + "s >> " + (game.spawnIntervals[x-1]/1000*0.95).toFixed(3)  + "s<br>Costs $" + format(game.upgradeCosts[2+x])
                }
            }
        } else {
            if (game.money >= game.upgradeCosts[1+2*x]) { // id10.
                game.money -= game.upgradeCosts[1+2*x]
                game.spawnIntervals[x-1] *= 0.95
                if (game.spawnIntervals[x-1] < 100) game.spawnIntervals[x-1] = 100
                game.upgradeCosts[1+2*x] = Math.floor(game.upgradeCosts[1+2*x]*(2.5+x*0.25))
                game.currentUpgrades[1+2*x]++;
                if (updateUI) {
                    updateText()
                    updateVisuals()
                }
                if (game.spawnIntervals[x-1]*0.95 < 100) {
                    document.getElementsByClassName("decreaseIntervalButton")[x-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[x-1]/1000).toFixed(3) + "s >> " + "0.100s<br>Costs $" + format(game.upgradeCosts[1+2*x])
                } else {
                    document.getElementsByClassName("decreaseIntervalButton")[x-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[x-1]/1000).toFixed(3) + "s >> " + (game.spawnIntervals[x-1]/1000*0.95).toFixed(3)  + "s<br>Costs $" + format(game.upgradeCosts[1+2*x])
                }
            }
        }
    }
}

function increaseSpawnerLuck(x, updateUI = true) {
    if (x <= 3) {
        if (game.money >= game.upgradeCosts[5+x]) {
            game.money -= game.upgradeCosts[5+x];
            game.spawnerLuck[x-1] *= 1.1;
            game.upgradeCosts[5+x] = Math.floor(game.upgradeCosts[5+x]*4);
            game.currentUpgrades[5+x]++;
            if (updateUI) {
                updateRarityList()
                updateText()
                updateVisuals()
            }
            document.getElementsByClassName("increaseSpawnerLuckButton")[x-1].innerHTML = "Increase luck<br>x" + format(game.spawnerLuck[x-1],2) + " >> x" + format(game.spawnerLuck[x-1]*1.1,2) + "<br>Costs $" + format(game.upgradeCosts[5+x])
        } 
    } else {
        if (game.money >= game.upgradeCosts[2+2*x]) { // id11.
            game.money -= game.upgradeCosts[2+2*x]
            game.spawnerLuck[x-1] *= 1.1;
            game.upgradeCosts[2+2*x] = Math.floor(game.upgradeCosts[2+2*x]*4);
            game.currentUpgrades[2+2*x]++;
            if (updateUI) {
                updateRarityList()
                updateText()
                updateVisuals()
            }
            document.getElementsByClassName("increaseSpawnerLuckButton")[x-1].innerHTML = "Increase luck<br>x" + format(game.spawnerLuck[x-1],2) + " >> x" + format(game.spawnerLuck[x-1]*1.1,2) + "<br>Costs $" + format(game.upgradeCosts[2+2*x])
        }
    }
}

function WPxMoney(updateUI = true) {
    if (game.weatherpts >= game.weatherUpCosts[2]) {
        game.weatherpts -= game.weatherUpCosts[2];
        game.weatherMoney *= 1.1;
        game.weatherUpCosts[2] = Math.round(game.weatherUpCosts[2]*1.5);
        if (updateUI) {
            updateRarityList()
            updateText()
            updateVisuals()
        }
        document.getElementById("WPxMoney").innerHTML = "Multiply Money! (Resets on tier)<br>x" + format(game.weatherMoney,2) + " >> x" + format(game.weatherMoney*1.1,2) + "<br>Costs " + format(game.weatherUpCosts[2]) + " WP"
    }
}

function newWeather() {
    if (game.weatherpts >= game.weatherUpCosts[1] && game.weatherUnlocked < 9) {
        game.weatherpts -= game.weatherUpCosts[1];
        game.weatherUnlocked++;
        game.weatherUpCosts[1] = Math.round(game.weatherUpCosts[1]*2);
        document.getElementById("newWeather").innerHTML = "Unlock a new Weather that is available to be rolled!<br>Currently: " + game.weatherUnlocked + " weathers available to be rolled<br>Costs " + format(game.weatherUpCosts[1]) + " WP"
    } else if (game.weatherUnlocked == 9) {
        document.getElementById("newWeather").innerHTML = "Unlock a new Weather that is available to be rolled!<br>Currently: " + game.weatherUnlocked + " weathers available to be rolled<br>(Maxed)"
    }
    updateWeatherChance()
}

function rollWeather(){
    if (game.weatherRollCooldown > 0) return;
    if (game.weatherpts >= Math.round(game.weatherUpCosts[0])) {
        game.weatherpts -= Math.round(game.weatherUpCosts[0]);
        game.weatherUpCosts[0] += 0.2
        game.weatherRollCooldown = 5;
        
        // Create Overlay and Animation
        let overlay = document.createElement("div");
        overlay.id = "weatherOverlay";
        Object.assign(overlay.style, {
            position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)", zIndex: "1000",
            display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
            color: "white", fontSize: "40px", fontFamily: "Lexend Deca, sans-serif"
        });
        
        let slot = document.createElement("div");
        slot.innerText = "Rolling...";
        overlay.appendChild(slot);
        document.body.appendChild(overlay);
        
        let animInterval = setInterval(() => {
            let idx = Math.floor(Math.random() * game.weatherUnlocked);
            slot.innerText = weatherNames[idx];
            slot.style.color = weatherColours[idx];
        }, 100);
        
        setTimeout(() => {
            clearInterval(animInterval);
            
            // Pick Winner
            let winnerIdx = -1;
            let rand = Math.random();
            let cumulative = 0;
            // Recalculate chances just in case
            updateWeatherChance(); 
            
            for (let i = 0; i < game.weatherUnlocked; i++) {
                cumulative += game.weatherChances[i];
                if (rand < cumulative) {
                    winnerIdx = i;
                    break;
                }
            }
            if (winnerIdx === -1) winnerIdx = game.weatherUnlocked - 1; // Fallback to last unlocked
            
            slot.innerText = weatherNames[winnerIdx];
            slot.style.color = weatherColours[winnerIdx];
            slot.style.transform = "scale(1.5)";
            slot.style.transition = "transform 0.5s";
            
            // Apply Effect
            let dur = weatherEff[winnerIdx][3];
            game.weatherDuration[winnerIdx] += dur;
            
            updateText();
            updateVisuals(); 
            
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            }, 1000); 
            
        }, 2000);
    }
}

function updateWeatherChance() {
    if (game.weatherUnlocked >= 2) {
        game.weatherChances[0] = 0.45
        game.weatherChances[1] = 0.55
    }
    if (game.weatherUnlocked >= 3) {
        game.weatherChances[1] = 0.25
        game.weatherChances[2] = 0.3
    }
    if (game.weatherUnlocked >= 4) {
        game.weatherChances[2] = 0.15
        game.weatherChances[3] = 0.15
    }
    if (game.weatherUnlocked >= 5) {
        game.weatherChances[3] = 0.08
        game.weatherChances[4] = 0.07
    }
    if (game.weatherUnlocked >= 6) {
        game.weatherChances[4] = 0.05
        game.weatherChances[5] = 0.02
    }
    if (game.weatherUnlocked >= 7) {
        game.weatherChances[5] = 0.011
        game.weatherChances[6] = 0.009
    }
    if (game.weatherUnlocked >= 8) {
        game.weatherChances[6] = 0.006
        game.weatherChances[7] = 0.003
    }
    if (game.weatherUnlocked >= 9) {
        game.weatherChances[7] = 0.0025
        game.weatherChances[8] = 0.0005
    }
    if (game.weatherUnlocked >= 10) {
        game.weatherChances[8] = 0.0003
        game.weatherChances[9] = 0.0002
    }
}

function buySpawner2() {
    if (game.money >= 1000 && game.spawnersUnlocked == 1) {
        game.money -= 1000;
        game.spawnersUnlocked = 2;
        updateText()
        updateVisuals()
        document.getElementsByClassName("spawnerTab")[1].style.display = "block";
        document.getElementsByClassName("spawnerTabBuyButton")[0].style.display = "none";
    }
}

function buySpawner3() {
    if (game.money >= 20000 && game.spawnersUnlocked == 2) {
        game.money -= 20000;
        game.spawnersUnlocked = 3;
        updateText()
        updateVisuals()
        document.getElementsByClassName("spawnerTab")[2].style.display = "block";
        document.getElementsByClassName("spawnerTabBuyButton")[1].style.display = "none";
    }
}

function buySpawner4() {
    if (game.money >= 1e9 && game.spawnersUnlocked == 3) {
        game.money -= 1e9;
        game.spawnersUnlocked = 4;
        updateText()
        updateVisuals()
        document.getElementsByClassName("spawnerTab")[3].style.display = "block";
        document.getElementsByClassName("spawnerTabBuyButton")[2].style.display = "none";
    }
}

function buySpawner5() {
    if (game.money >= 1e13 && game.spawnersUnlocked == 4) {
        game.money -= 1e13;
        game.spawnersUnlocked = 5;
        updateText()
        updateVisuals()
        document.getElementsByClassName("spawnerTab")[4].style.display = "block";
        document.getElementsByClassName("spawnerTabBuyButton")[3].style.display = "none";
    }
}

function maxBuyMain() {
    let boughtAny = true;
    while (boughtAny) {
        boughtAny = false;
        // Priority: Multiplier > Luck > Diamond Chance
        if (game.money >= game.upgradeCosts[0]) {
            increaseMultiplier(false);
            boughtAny = true;
        } else if (game.money >= game.upgradeCosts[1]) {
            increaseLuck(false);
            boughtAny = true;
        } else if (game.money >= game.upgradeCosts[2]) {
            increaseDiamondChance(false);
            boughtAny = true;
        }
    }
    updateText();
    updateVisuals();
    updateRarityList();
}

function maxBuySpawner(x) {
    let boughtAny = true;
    while (boughtAny) {
        boughtAny = false;
        // Interval > Luck
        let intervalCost = (x <= 3) ? game.upgradeCosts[2 + x] : game.upgradeCosts[1 + 2 * x];
        let luckCost = (x <= 3) ? game.upgradeCosts[5 + x] : game.upgradeCosts[2 + 2 * x];

        if (game.money >= intervalCost && game.spawnIntervals[x - 1] > 100) {
            decreaseInterval(x, false);
            boughtAny = true;
        } else if (game.money >= luckCost) {
            increaseSpawnerLuck(x, false);
            boughtAny = true;
        }
    }
    updateText();
    updateVisuals();
    updateRarityList();
}

function maxBuyAllSpawners() {
    let boughtAny = true;
    while (boughtAny) {
        boughtAny = false;
        let maxUnlocked = game.spawnersUnlocked;
        for (let i = 1; i <= maxUnlocked; i++) {
            let intervalCost = (i <= 3) ? game.upgradeCosts[2 + i] : game.upgradeCosts[1 + 2 * i];
            if (game.money >= intervalCost && game.spawnIntervals[i - 1] > 100) {
                decreaseInterval(i, false);
                boughtAny = true;
                break; 
            }
            let luckCost = (i <= 3) ? game.upgradeCosts[5 + i] : game.upgradeCosts[2 + 2 * i];
            if (game.money >= luckCost) {
                increaseSpawnerLuck(i, false);
                boughtAny = true;
                break; 
            }
        }
    }
    updateText();
    updateVisuals();
    updateRarityList();
}

function unlockBoosts() {
    if (game.diamonds >= 250 && game.mechanicsUnlocked==1) {
        game.diamonds -= 250
        game.mechanicsUnlocked = 2
        updateText()
        document.getElementById("boosts").style.display = "inline-block";
        document.getElementById("unlockBoostsButton").style.display = "none";
        document.getElementById("unlockRBM").style.display = "inline-block";
    }
}

function TPgain(idx) {
    if (idx == 0) {
        if (game.money >= game.extUpgCosts[0]) {
            game.money -= game.extUpgCosts[0];
            game.currentTP += 1;
            game.maxTP += 1;
            game.extUpgCosts[0] *= 1e15;
        }
    } else if (idx == 1) {
        if (game.diamonds >= game.extUpgCosts[1]) {
            game.diamonds -= game.extUpgCosts[1];
            game.currentTP += 1;
            game.maxTP += 1;
            game.extUpgCosts[1] *= 5;
        }
    }
    updateText();
    updateAllUpgradeText()
}

function updateBoostButtons() {
  document.getElementById("boost1").innerHTML =
    `Boost for 1m<br>Costs ${getBoostCost(1)} diamonds`;
  document.getElementById("boost2").innerHTML =
    `Boost for 5m<br>Costs ${getBoostCost(2)} diamonds`;
  document.getElementById("boost3").innerHTML =
    `Boost for 1m<br>Costs ${getBoostCost(3)} diamonds`;
  document.getElementById("boost4").innerHTML =
    `Boost for 5m<br>Costs ${getBoostCost(4)} diamonds`;
  document.getElementById("boost5").innerHTML =
    `Duplicate all current orbs!<br>Costs ${getBoostCost(5)} diamonds`;
  document.getElementById("boost6").innerHTML =
    `Remove useful obstacles for 45s!<br>Costs ${getBoostCost(6)} diamonds`;
}

function buyBoost(x) {
    const cost = getBoostCost(x)
    if (game.diamonds < cost) return
    if (x==5 && game.boostTimes[2] != 0) return
    if (x==6 && game.boostTimes[3] != 0) return
    game.diamonds -= cost
    game.boostData[x].uses++
    if (x==1) {
        game.boostTimes[0] += 60
        document.getElementById("moneyBoostText").style.color = "#8f8"
        document.getElementById("moneyBoostText").innerText = "2x money gain - " + Math.floor(game.boostTimes[0]/60) + ":" + (game.boostTimes[0]%60).toString().padStart(2, "0")
        updateText()
    }
    else if (x==2) {
        game.boostTimes[0] += 300
        document.getElementById("moneyBoostText").style.color = "#8f8"
        document.getElementById("moneyBoostText").innerText = "2x money gain - " + Math.floor(game.boostTimes[0]/60) + ":" + (game.boostTimes[0]%60).toString().padStart(2, "0")
        updateText()
    }
    else if (x==3) {
        game.boostTimes[1] += 60
        document.getElementById("luckBoostText").style.color = "#8f8"
        document.getElementById("luckBoostText").innerText = "2x luck - " + Math.floor(game.boostTimes[1]/60) + ":" + (game.boostTimes[1]%60).toString().padStart(2, "0")
        updateText()
        updateRarityList()
    }
    else if (x==4) {
        game.boostTimes[1] += 300
        document.getElementById("luckBoostText").style.color = "#8f8"
        document.getElementById("luckBoostText").innerText = "2x luck - " + Math.floor(game.boostTimes[1]/60) + ":" + (game.boostTimes[1]%60).toString().padStart(2, "0")
        updateText()
        updateRarityList()
    }
    else if (x==5) {
        let dupeCD = 60
        if (getSTUpAmt("BST-2")) dupeCD = 30
        game.boostTimes[2] = dupeCD
        duplicateOrbs()
        document.getElementById("dupeBoostText").innerText = "Duplicate cooldown: " + game.boostTimes[2] + "s"
        updateText()
    }
    else if (x==6) {
        game.boostTimes[3] = 60 // 45s active + 15s downtime
        document.getElementById("ruoBoostText").style.color = "#8f8"
        document.getElementById("ruoBoostText").innerText = "Obstacle Remover - 0:45"
        buildBoard()
        game.ORActive = true
        updateText()
    }
    updateBoostButtons()
}

function updateRarityList() {
    let moneyMult = game.moneyMultiplier * (game.boostTimes[0] ? 2 : 1) * game.weatherMoney
    if (game.mechanicsUnlocked>=3) moneyMult *= 1.06**game.highestRarity
    if (game.tiers >= 1) {
        moneyMult *= (1.05 ** getSTUpAmt("MN-1"))
    }

    function getOneIn(idx) {
        if (idx < 0 || idx >= rarities.length) return Infinity;
        const t = (i) => Math.min(1, game.totalLuck / rarities[i]);
        let p = 0;
        if (idx === rarities.length - 1) {
            p = t(idx);
        } else if (idx === 0) {
            p = Math.max(0, 1 - t(1));
        } else {
            p = Math.max(0, t(idx) - t(idx + 1));
        }
        return p > 0 ? 1 / p : Infinity;
    }

    function formatChance(oneIn) {
        if (oneIn === Infinity || isNaN(oneIn)) return "Infinity";
        return format(oneIn, 1);
    }

    //Update pre-existing rarity slot text
    const slots = document.getElementsByClassName("raritySlot");
    const slotsText = document.getElementsByClassName("raritySlotText");
    for (let i=0; i<slotsText.length; i++) {
        const oneIn = getOneIn(i);
        const formatOneIn = formatChance(oneIn);
        if (game.hideInfinity && formatOneIn === "Infinity") {
            slots[i].style.display = "none";
        } else {
            slots[i].style.display = "block";
        }

        slotsText[i].innerHTML = rarityNames[i] + "<br><span style='font-size: 17.5px'>$" + format(rarityValues[i]*moneyMult) + " • 1 in " + formatOneIn + " • Obtained: "+ game.orbsObtained[i] + "</span>";
    }
    while (game.raritiesDisplayed < game.highestRarity || game.raritiesDisplayed < 4) {
        //Create a div with the class 'raritySlot'
        let newSlot = document.createElement("div");
        newSlot.className = "raritySlot";
        newSlot.style.backgroundImage = "linear-gradient(" + rarityColours[game.raritiesDisplayed*2] + ", " + rarityColours[game.raritiesDisplayed*2+1] + ")";
        const oneIn = getOneIn(game.raritiesDisplayed);
        const formatOneIn = formatChance(oneIn);
        
        newSlot.innerHTML = "<img src='img/ball" + (game.raritiesDisplayed+1) + ".png' class='raritySlotImage'><p class='raritySlotText'>" + rarityNames[game.raritiesDisplayed] + "<br><span style='font-size: 20px'>$" + format(rarityValues[game.raritiesDisplayed]*moneyMult) + " • 1 in " + formatOneIn + "</span></p>";
        
        if (game.hideInfinity && formatOneIn === "Infinity") {
            newSlot.style.display = "none";
        }

        document.getElementById("raritiesList").appendChild(newSlot);
        game.raritiesDisplayed++
    }
    let raritiesLeft = rarities.length - game.highestRarity
    if (raritiesLeft > 3) raritiesLeft = 3
    
    const nextRarityContainers = document.getElementsByClassName("nextRarity");
    for (let i = 0; i < 3; i++) {
        if (i < raritiesLeft) {
            nextRarityContainers[i].style.display = "block";
            const currentRarityIdx = game.raritiesDisplayed + i;
            if (currentRarityIdx < rarities.length) {
                const oneIn = getOneIn(currentRarityIdx);
                document.getElementsByClassName("nextRarityText")[i].innerHTML = "To be discovered...<br><span style='font-size: 20px'>$" + format(rarityValues[currentRarityIdx]*moneyMult) + " • 1 in " + formatChance(oneIn) + "</span>";
            }
        } else {
            nextRarityContainers[i].style.display = "none";
        }
    }
}
updateRarityList()

function toggleHideInfinity() {
    game.hideInfinity = !game.hideInfinity;
    updateRarityList();
    document.getElementById("hideInfinityButton").classList.toggle("settingOn"); // Optional: for visual feedback if we used a button, but it's a checkbox
}

function unlockRebirth() {
    if (game.diamonds >= 50 && game.mechanicsUnlocked==0) {
        game.diamonds -= 50
        game.mechanicsUnlocked = 1
        updateText()
        document.getElementById("rebirth").style.display = "inline-block";
        document.getElementById("unlockRebirthButton").style.display = "none";
        document.getElementById("unlockBoostsButton").style.display = "inline-block";
    }
}

function unlockRBM() {
    if (game.diamonds >= 1000 && game.mechanicsUnlocked==2) {
        game.diamonds -= 1000
        game.mechanicsUnlocked = 3
        updateText()
        document.getElementById("unlockRBM").style.display = "none";
        document.getElementById("unlockTierButton").style.display = "inline-block";
    }
}

function unlockTier() {
    if (game.diamonds >= 2500 && game.mechanicsUnlocked==3 && game.rebirths >= 15) {
        game.diamonds -= 2500
        game.mechanicsUnlocked = 4
        updateText()
        document.getElementById("tier").style.display = "inline-block";
        document.getElementById("unlockTierButton").style.display = "none";
        document.getElementById("unlockWeatherButton").style.display = "inline-block";
    }
}

function unlockWeather() {
    if (game.diamonds >= 20000 && game.mechanicsUnlocked==4 && game.tiers >= 2) {
        game.diamonds -= 20000
        game.mechanicsUnlocked = 5
        updateText()
        document.getElementById("unlockWeatherButton").style.display = "none";
    }
}

function rebirth() {
    let bulk = false
    if (document.getElementById("bulkReb").checked) {
        if (getSTUpAmt("MAX-3") >= 1) {
            bulk = true
            let projreb = Math.floor((Math.log(game.money / game.rebBaseCost) / Math.log(game.rebScaling)) + 1)
            let bulkreb = Math.max(projreb-game.rebirths, 1)
            let pricereb = game.rebScaling ** (game.rebirths + bulkreb - 1) * game.rebBaseCost
            document.getElementById('rebirthButton').innerHTML = "<b>Rebirth (BULK ON)</b><br>Costs $" + format(pricereb) + "<br>Luck x" + format(2 ** game.rebirths) + " >> x" + format(2 ** (game.rebirths + bulkreb)) + "<br> +" + format(bulkreb) + " Rebirths on rebirth <br>" + "Next Rebirth costs $" + format(pricereb*3.5)
        }
    } else {
        document.getElementById('rebirthButton').innerHTML = "<b>Rebirth</b><br>Costs $" + format(game.rebScaling ** game.rebirths * game.rebBaseCost) + "<br>Luck x" + format(2 ** game.rebirths) + " >> x" + format(2 ** (game.rebirths + 1))
    }
    let rebirthreq = game.rebScaling ** game.rebirths * game.rebBaseCost
    if (bulk) {
        let projreb = Math.floor((Math.log(game.money / game.rebBaseCost) / Math.log(game.rebScaling)) + 1)
        let bulkreb = Math.max(projreb-game.rebirths, 1)
        rebirthreq = game.rebScaling ** (game.rebirths + bulkreb - 1) * game.rebBaseCost
    }
    if (game.money > rebirthreq) {
        if (bulk) {
            let projreb = Math.floor((Math.log(game.money / game.rebBaseCost) / Math.log(game.rebScaling)) + 1)
            let bulkreb = Math.max(projreb-game.rebirths, 1)
            game.rebirths = game.rebirths + bulkreb
        } else {
            game.rebirths++
        }
        game.money = 0
        game.moneyMultiplier = 2 ** game.tiers
        game.baseLuck = (2 ** game.rebirths) * (3 ** game.tiers)
        game.diamonds = Math.floor(game.diamonds / 10 * 9)
        game.diamondChance = 0.01
        game.timeSpentinReb = 0
        game.spawnIntervals = [1000, 2000, 4000, 10000, 60000, 120000, 300000];
        game.spawnerLuck = [1, 1.5, 2.5, 10, 100, 1000, 10000];
        
        let keptPct = 0;
        if (getSTUpAmt("RL-1") >= 1) {
             keptPct = game.skillTreeUpgs['rless']['upgrades'][0]['levels'][getSTUpAmt("RL-1")-1] / 100;
        }
        
        const baseCosts = [50, 100, 500, 250, 1500, 25000, 2000, 8000, 75000, 1e10, 1e9, 5e13, 2.5e13, 1e20, 1e22, 1e33, 1e34];
        game.upgradeCosts = [...baseCosts];

        for (let i = 0; i < game.currentUpgrades.length; i++) {
             let kept = Math.floor(game.currentUpgrades[i] * keptPct);
             game.currentUpgrades[i] = kept;
             let mult = 1;
             if (i == 0) mult = 1.7; 
             else if (i == 1) mult = 2; 
             else if (i == 2) mult = 5; 
             else {
                 if (i >= 3 && i <= 6) mult = 2.5 + (i-2)*0.25; 
                 else if (i == 11) mult = 3.75; 
                 else if (i == 12) mult = 4.0;  
                 else if (i == 15) mult = 4.25; 
                 else mult = 4; 
             }
             if (kept > 0) {
                 game.upgradeCosts[i] = Math.floor(baseCosts[i] * (mult ** kept));
             }
             
             // Re-apply effects (Multipliers, Intervals, etc)
             if (kept > 0) {
                  if (i == 0) game.moneyMultiplier *= (1.15 ** kept);
                  else if (i == 1) game.baseLuck *= (1.2 ** kept);
                  else if (i == 2) game.diamondChance += (0.001 * kept);
                  else {
                       let sId = 0;
                       let isInt = false;
                       
                       if (i >= 3 && i <= 6) { sId = i - 2; isInt = true; }
                       else if (i == 11) { sId = 5; isInt = true; }
                       else if (i == 12) { sId = 6; isInt = true; }
                       else if (i == 15) { sId = 7; isInt = true; }
                       else if (i >= 7 && i <= 10) { sId = i - 6; }
                       else if (i == 13) { sId = 5; }
                       else if (i == 14) { sId = 6; }
                       else if (i == 16) { sId = 7; }
                       
                       if (sId > 0) {
                           if (isInt) {
                               game.spawnIntervals[sId-1] *= (0.95 ** kept); 
                               if (game.spawnIntervals[sId-1] < 100) game.spawnIntervals[sId-1] = 100;
                           } else {
                               game.spawnerLuck[sId-1] *= (1.1 ** kept);
                           }
                       }
                  }
             }
        }
        if (getSTUpAmt("RL-4") < 1) {
            game.boostTimes = [0, 0, 0, 0];
        }
        document.getElementsByClassName("boostText")[0].style.color = "#bbb"
        document.getElementsByClassName("boostText")[0].innerText = "2x money gain - 0:00 (not active)"
        document.getElementsByClassName("boostText")[1].style.color = "#bbb"
        document.getElementsByClassName("boostText")[1].innerText = "2x luck - 0:00 (not active)"
        document.getElementsByClassName("boostText")[2].innerText = "Duplicate cooldown: " + game.boostTimes[2] + "s"
        updateRarityList()
        deleteAllOrbs()
        updateText()
        updateAllUpgradeText()
        updateVisuals()
        updateRarityList()
    }
}

function xLuckBODiamondUp() {
    if (game.diamonds >= game.newUpgCosts[0]) {
        game.diamonds -= game.newUpgCosts[0]
        game.newUpgCosts[0] *= 2
        game.diamondLuck *= 1.1
        updateAllUpgradeText()
        updateText()
        updateVisuals()
    }
}

function canAffordTier() {
    if (game.tiers == 0 && game.orbsObtained[13] >= 50) {
        return true
    } else if (game.tiers == 1 && game.orbsObtained[20] >= 10) {
        return true
    } else if (game.tiers == 2 && game.orbsObtained[29] >= 5) {
        return true
    } else {
        return false
    }
}

function tier() {
    if (canAffordTier()) {
        game.tiers++
        game.money = 0
        if (getSTUpAmt("RL-3") >= 1) {
            game.rebirths = Math.floor(game.rebirths * game.skillTreeUpgs['rless']['upgrades'][2]['levels'][getSTUpAmt("RL-3")-1]/100)
        } else {
            game.rebirths = 0
        }
        game.moneyMultiplier = 2 ** game.tiers
        game.baseLuck = (3 ** game.tiers) * (2 ** game.rebirths)
        game.diamonds = 0
        game.diamondChance = 0.01
        game.spawnersUnlocked = 1
        game.timeSpentinTier = 0
        for (let i=1; i<=6; i++) {
            game.boostData[i]['uses'] = 0
        }
        game.timeSpentinReb = 0
        game.spawnIntervals = [1000, 2000, 4000, 10000, 60000, 120000, 300000];
        game.spawnerLuck = [1, 1.5, 2.5, 10, 100, 1000, 10000];
        game.upgradeCosts = [50, 100, 500, 250, 1500, 25000, 2000, 8000, 75000, 1e10, 1e9, 5e13, 2.5e13, 1e20, 1e22, 1e33, 1e34];
        game.boostTimes = [0, 0, 0, 0];
        game.maxTP++;
        if (game.tiers == 1) {
            game.maxTP++;
            game.currentTP++;
        }
        game.weatherUpCosts[2] = 3
        game.weatherMoney = 1
        game.currentTP++;
        document.getElementsByClassName("boostText")[0].style.color = "#bbb"
        document.getElementsByClassName("boostText")[0].innerText = "2x money gain - 0:00 (not active)"
        document.getElementsByClassName("boostText")[1].style.color = "#bbb"
        document.getElementsByClassName("boostText")[1].innerText = "2x luck - 0:00 (not active)"
        document.getElementsByClassName("boostText")[2].innerText = "Duplicate cooldown: " + game.boostTimes[2] + "s"
        updateRarityList()
        deleteAllOrbs()
        updateText()
        buildBoard()
        updateAllUpgradeText()
        updateVisuals()
        updateRarityList()
        updateBoostButtons()
    }
}

function updateSkillTree() {
    renderSkillTree();
    document.getElementById("skillPtsText").innerText = "You have " + game.currentTP + "/" + game.maxTP + " Tier Points (TP). You can spend TP on Upgrades to aid your progression!"
}

function checkUpgradeUnlocked(reqs) {
    if (!reqs) return true;
    for (const req of reqs) {
        let found = false;
        for (const cat in game.skillTreeUpgs) {
            const catData = game.skillTreeUpgs[cat];
            if (!catData || !catData.upgrades) continue;
            const upgrades = catData.upgrades;
            const index = upgrades.findIndex(u => u.id === req);
            if (index !== -1 && catData.bought[index] > 0) {
                found = true;
                break;
            }
        }
        if (!found) return false;
    }
    return true;
}

function renderSkillTree() {
    const categories = ['main', 'spawner', 'boost', 'rless', 'max'];
    categories.forEach(cat => {
        const column = document.getElementById(`column-${cat}`);
        if (!column) return;
        const list = column.querySelector('.upgradeList');
        if (!list) return;
        list.innerHTML = '';
        
        const catData = game.skillTreeUpgs[cat];
        if (!catData || !catData.upgrades) return;
        catData.upgrades.forEach((upg, index) => {
            const card = document.createElement('div');
            card.className = 'upgradeCard';
            const boughtCount = catData.bought[index];
            
            let isMaxed = false;
            if (upg.infinite) isMaxed = false;
            else if (upg.max) isMaxed = boughtCount >= upg.max;
            else if (upg.levels) isMaxed = boughtCount >= upg.levels.length;
            else isMaxed = boughtCount > 0;

            const isUnlocked = checkUpgradeUnlocked(upg.req);
            
            if (isMaxed) card.classList.add('bought');
            if (!isUnlocked) card.classList.add('locked');
            
            let statusText = '';
            let effectText = '';
            let variantCount = 0;
            if (getSTUpAmt("SPW-3") > 0) variantCount++;
            if (getSTUpAmt("MN-4") > 1) variantCount++;
            if (getSTUpAmt("MN-4") > 4) variantCount++;
            if (upg.id === "MN-1") effectText = `Current: x${(1.05 ** boughtCount).toFixed(2)} Money`;
            else if (upg.id === "MN-2") effectText = `Current: x${(1.10 ** boughtCount).toFixed(2)} Luck`;
            else if (upg.id === "MN-3") effectText = `Current: x${(1.05 ** boughtCount).toFixed(2)} Diamonds`;
            else if (upg.id === "MN-4") effectText = `Current: +${boughtCount}% Shiny`;
            else if (upg.id === "RL-1") effectText = `Current: ${upg.levels[boughtCount-1] || 0}% Upgrades Kept`;
            else if (upg.id === "RL-2") effectText = `Current: ${format(1 + (Math.log2(Math.log10(Math.max(game.totalLuck, 100)))/20*boughtCount), 4)}x Luck if Current Luck below Best Luck (Effect increases when Best Luck is higher)`; 
            else if (upg.id === "RL-3") effectText = `Current: ${upg.levels[boughtCount-1] || 0}% Rebirths Kept`;
            else if (upg.id === "BST-2") effectText = `Current: ${boughtCount > 0 ? '30s' : '60s'} Cooldown`;
            else if (upg.id === "SPW-1") effectText = `Current: +${boughtCount} Spawners`;
            else if (upg.id === "SPW-2") effectText = `Current: +${boughtCount * 25} Capacity`;
            else if (upg.id === "SPW-3") effectText = `Current: ${variantCount} Variants Unlocked`;
            else if (upg.id === "SPW-4") effectText = `Current: +${boughtCount * 5}% Chance`;

            if (isMaxed) {
                statusText = `<p class="upgradeStatus boughtText">Bought!</p>`;
            } else if (!isUnlocked) {
                statusText = `<p class="upgradeStatus lockedText">Locked<br>(Requires ${upg.req.join(', ')})</p>`;
            } else {
                let cost = upg.costs ? upg.costs[boughtCount] : upg.cost;
                if (upg.infinite && upg.id !== "MN-1" && upg.id !== "MN-2" && upg.id !== "MN-3" && upg.id !== "MN-4") cost = upg.cost * (2 ** boughtCount);
                
                statusText = `<p class="upgradeStatus costText">Cost: ${cost} TP</p>`;
                
                let progressText = '';
                if (upg.infinite) progressText = `Bought: ${boughtCount}`;
                else if (upg.max) progressText = `Bought: ${boughtCount}/${upg.max}`;
                else if (upg.levels) progressText = `Bought: ${boughtCount}/${upg.levels.length}`;
                else progressText = boughtCount > 0 ? 'Bought' : 'Not Bought';
                
                statusText += `<p class="upgradeStatus costText" style="font-size:14px">${progressText}</p>`;
            }

            card.innerHTML = `
                <div class="upgradeId">${upg.id}</div>
                <div class="upgradeTitle">${isUnlocked ? upg.name : 'Locked'}</div>
                <div class="upgradeDesc">${isUnlocked ? upg.desc : ''}</div>
                <div class="upgradeDesc" style="color: #8f8; font-size: 14px; margin-top: 5px;">${isUnlocked ? effectText : ''}</div>
                ${statusText}
            `;
            
            if (isUnlocked && !isMaxed) {
                card.onclick = () => buySkillTreeUpg(cat, index);
            }
            
            list.appendChild(card);
        });
    });
}

function buySkillTreeUpg(cat, index) {
    const catData = game.skillTreeUpgs[cat];
    const upg = catData.upgrades[index];
    const currentLevel = catData.bought[index];
    
    let cost = upg.costs ? upg.costs[currentLevel] : upg.cost;
    if (upg.infinite && upg.id !== "MN-1" && upg.id !== "MN-2" && upg.id !== "MN-3" && upg.id !== "MN-4") cost = upg.cost * (2 ** currentLevel);
    
    if (game.currentTP >= cost) {
        game.currentTP -= cost;
        game.spentTP += cost;
        catData.bought[index]++;
        updateSkillTree();
        save();
    }
}

function respecSkillTree() {
    if (confirm("Are you sure? This will reduce your Rebirths by 5, and perform a Rebirth reset but diamonds are reset!")) {
        // Refund TP
        for (const cat in game.skillTreeUpgs) {
            if (game.skillTreeUpgs[cat].bought) {
                game.skillTreeUpgs[cat].bought.fill(0);
            }
        }
        game.spentTP = 0;
        game.currentTP = game.maxTP;

        // Force Tier Reset (without incrementing Tier)
        game.money = 0;
        game.rebirths = Math.max(game.rebirths - 2, 0);
        game.moneyMultiplier = 2 ** game.tiers;
        game.baseLuck = (3 ** game.tiers) * (2 ** game.rebirths);
        game.diamonds = 0;
        game.diamondChance = 0.01;
        game.spawnersUnlocked = 1;
        game.boostTimes = [0, 0, 0, 0];
        
        game.spawnIntervals = [1000, 2000, 4000, 10000, 60000, 120000, 300000];
        game.spawnerLuck = [1, 1.5, 2.5, 10, 100, 1000, 10000];
        game.upgradeCosts = [50, 100, 500, 250, 1500, 25000, 2000, 8000, 75000, 1e10, 1e9, 5e13, 2.5e13, 1e20, 1e22, 1e33, 1e34];
        
        // Explicitly reset current upgrades count as we are wiping the costs
        if (!game.currentUpgrades) game.currentUpgrades = new Array(17).fill(0);
        else game.currentUpgrades.fill(0);

        document.getElementsByClassName("boostText")[0].style.color = "#bbb";
        document.getElementsByClassName("boostText")[0].innerText = "2x money gain - 0:00 (not active)";
        document.getElementsByClassName("boostText")[1].style.color = "#bbb";
        document.getElementsByClassName("boostText")[1].innerText = "2x luck - 0:00 (not active)";
        document.getElementsByClassName("boostText")[2].innerText = "Duplicate cooldown: " + game.boostTimes[2] + "s";

        updateRarityList();
        deleteAllOrbs();
        updateText();
        buildBoard();
        updateAllUpgradeText();
        updateVisuals();
        updateRarityList();
        updateBoostButtons();
        updateSkillTree();
        save();
    }
}

function skillTreeToggle() {
    game.inSkillTree = true;
    updateSkillTree()
    document.getElementById("skillTree").style.display = "block";
}

function closeSkillTree() {
    game.inSkillTree = false;
    document.getElementById("skillTree").style.display = "none";
}

function updateVariantIndex() {
    const variantIndex = document.getElementById("variantIndex");
    const variantList = document.getElementById("variantList");
    if (!variantIndex || !variantList) return;

    const spw3 = getSTUpAmt("SPW-3");
    const mn4 = getSTUpAmt("MN-4");

    if (spw3 === lastVariantLevels.spw3 && mn4 === lastVariantLevels.mn4) return;
    lastVariantLevels = { spw3, mn4 };

    if (spw3 > 0) {
        variantIndex.style.display = "flex";
        variantList.innerHTML = "";

        let shinyProb = (0.1 + mn4 * 0.01) * 100;
        addVariantItem("Shiny", "x2 Money", shinyProb.toFixed(2) + "%", "shiny");
        addVariantItem("Glowing", "x5 Money", "1.00%", "glowing");
        if (mn4 >= 3) {
            addVariantItem("Rainbow", "x10 Money", "0.10%", "rainbow");
        }
    } else {
        variantIndex.style.display = "none";
    }
}

function addVariantItem(name, multiplier, probability, variantType) {
    const variantList = document.getElementById("variantList");
    const slot = document.createElement("div");
    slot.className = "variantSlot";
    
    const canvas = document.createElement("canvas");
    canvas.className = "variantSlotIcon";
    canvas.width = 64;
    canvas.height = 64;
    
    const info = document.createElement("div");
    info.className = "variantSlotInfo";
    
    const nameEl = document.createElement("p");
    nameEl.className = "variantSlotName";
    nameEl.innerText = name;
    
    const descEl = document.createElement("p");
    descEl.className = "variantSlotDesc";
    descEl.innerText = `${multiplier} (${probability})`;
    
    info.appendChild(nameEl);
    info.appendChild(descEl);
    slot.appendChild(canvas);
    slot.appendChild(info);
    variantList.appendChild(slot);

    drawVariantPreview(canvas, variantType);
}

function drawVariantPreview(canvas, variant) {
    const ctx = canvas.getContext('2d');
    const centerX = 32;
    const centerY = 32;
    const radius = 15;

    function renderFrame() {
        if (!document.body.contains(canvas)) return; 
        
        ctx.clearRect(0, 0, 64, 64);
        ctx.save();
        ctx.translate(centerX, centerY);

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#bbbbbb";
        ctx.fill();
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 1;
        ctx.stroke();

        if (variant === "shiny") {
                let gradient = ctx.createRadialGradient(0, 0, radius * 0.5, 0, 0, radius * 1.5);
                gradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
                gradient.addColorStop(0.2, "rgba(255, 255, 150, 0.25)");
                gradient.addColorStop(1, "rgba(255, 255, 200, 0)");
                
                ctx.fillStyle = gradient;
                ctx.globalCompositeOperation = 'lighter';
                ctx.beginPath();
                ctx.arc(0, 0, radius * 2, 0, 2 * Math.PI);
                ctx.fill();
                ctx.fillStyle = "white";
                ctx.globalCompositeOperation = 'source-over';
        } else if (variant === "glowing") {
            let pulse = Math.sin(Date.now() / 300) * 3;
            ctx.globalCompositeOperation = 'lighter';
            ctx.shadowBlur = 15 + pulse;
            ctx.shadowColor = "rgba(0, 100, 255, 1)";
            ctx.strokeStyle = "rgba(0, 150, 255, 0.8)";
            ctx.lineWidth = 3;
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(0, 0, radius + 3 + pulse, 0, 2 * Math.PI);
            ctx.strokeStyle = "rgba(0, 150, 255, 0.5)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
        } else if (variant === "rainbow") {
            let time = Date.now() / 1000;
            let hue = (Date.now() / 5) % 360;
            ctx.globalCompositeOperation = 'lighter';

            let innerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            innerGrad.addColorStop(0, `hsla(${hue}, 100%, 80%, 0.5)`);
            innerGrad.addColorStop(1, `hsla(${(hue + 240) % 360}, 100%, 50%, 0.1)`);
            ctx.fillStyle = innerGrad;
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.fill();
            
            let outerGrad = ctx.createRadialGradient(0, 0, radius, 0, 0, radius * 2);
            outerGrad.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.4)`);
            outerGrad.addColorStop(1, "transparent");
            ctx.fillStyle = outerGrad;
            ctx.beginPath();
            ctx.arc(0, 0, radius * 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
        requestAnimationFrame(renderFrame);
    }
    renderFrame();
}

function changeNotation() {
    let formats = ["standard", "scientific", "standardLong"];
    let index = formats.indexOf(game.numberFormat);
    game.numberFormat = formats[(index + 1) % formats.length];
    updateVisuals();
    updateText();
}

function recalcCurrentUpgrades() {
    // If currentUpgrades contains any non-zero value, assume it's already set (or partially set).
    // But to be safe for existing saves that might have 0s, we check if all are 0.
    // However, a new player also has all 0s. 
    // We can just forcefully recalc based on costs. The costs are the source of truth.
    
    // Indexes:
    // 0: Money (x1.7)
    // 1: Luck (x2)
    // 2: Diamond Chance (x5)
    // 3,4,5,6: Interval 1-4
    // 7,8,9,10: Luck 1-4
    // 11,12,13: Interval 5-7
    // 14,15,16: Luck 5-7

    const baseCosts = [50, 100, 500, 250, 1500, 25000, 2000, 8000, 75000, 1e10, 1e9, 5e13, 2.5e13, 1e20, 1e22, 1e33, 1e34];
    
    // Helper for log base
    const getLevels = (current, base, mult) => Math.round(Math.log(current/base) / Math.log(mult));
    if (game.upgradeCosts[0] > baseCosts[0]) game.currentUpgrades[0] = getLevels(game.upgradeCosts[0], baseCosts[0], 1.7);
    if (game.upgradeCosts[1] > baseCosts[1]) game.currentUpgrades[1] = getLevels(game.upgradeCosts[1], baseCosts[1], 2);
    if (game.upgradeCosts[2] > baseCosts[2]) game.currentUpgrades[2] = getLevels(game.upgradeCosts[2], baseCosts[2], 5);
    for (let i = 1; i <= 7; i++) {
        // Interval Index mapping:
        // Spawner 1: 3
        // Spawner 2: 4
        // Spawner 3: 5
        // Spawner 4: 6
        // Spawner 5: 11
        // Spawner 6: 12
        // Spawner 7: 15
        let intIdx = (i <= 4) ? (2 + i) : (i == 5 ? 11 : (i == 6 ? 12 : 15));
        let intMult = 2.5 + i * 0.25;
        if (game.upgradeCosts[intIdx] > baseCosts[intIdx]) {
            game.currentUpgrades[intIdx] = getLevels(game.upgradeCosts[intIdx], baseCosts[intIdx], intMult);
        }

        // Luck Index mapping:
        // Spawner 1: 7
        // Spawner 2: 8
        // Spawner 3: 9
        // Spawner 4: 10
        // Spawner 5: 13
        // Spawner 6: 14
        // Spawner 7: 16
        let luckIdx = (i <= 4) ? (6 + i) : (i == 5 ? 13 : (i == 6 ? 14 : 16));
        if (game.upgradeCosts[luckIdx] > baseCosts[luckIdx]) {
            game.currentUpgrades[luckIdx] = getLevels(game.upgradeCosts[luckIdx], baseCosts[luckIdx], 4);
        }
    }
}

function changeDifficulty() {
    let val = document.getElementById("difficultySelect").value;
    game.difficulty = val;
    game.rebBaseCost = 2500
    game.rebScaling = 3.5
    if (game.difficulty == "orig") {
        game.rebBaseCost = 5000
    }
    if (game.difficulty == "easy") {
        game.rebScaling = 3.46
    }
    if (game.difficulty == "baby") {
        game.rebScaling = 3.37
    }
    if (game.difficulty == "hard") {
        game.rebBaseCost = 10000
        game.rebScaling = 3.53
    }
    if (game.difficulty == "extreme") {
        game.rebBaseCost = 25000
        game.rebScaling = 3.56
    }
}

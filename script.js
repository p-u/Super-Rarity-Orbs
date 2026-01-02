const illions = ["thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion", "undecillion", "duodecillion", "tredecillion", "quattuordecillion", "quindecillion", "sexdecillion", "septendecillion", "octodecillion", "novemdecillion", "vigintillion"]
const illionsShort = ["K", "M", "B", "T", "Qa", "Qt", "Sx", "Sp", "Oc", "No", "Dc", "UDc", "DDc", "TDc", "QaDc", "QiDc", "SxDc", "SpDc", "OcDc", "NoDc", "Vg", "UVg", "DVg", "TVg", "QdVg", "QtVg", "SxVg", "SpVg", "OcVg", "NoVg", "Tg", "UTg", "DTg"]
const rarities     = [1, 4, 15, 50, 250, 1200,7000, 30000,140000,750000,6e6, 2e7, 4.5e8, 7e9, 3e12, 8.5e13, 1.8e15, 3.6e16, 7e17, 1e20, 1.25e22];
const rarityNames = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Mythical', 'Exotic', 'Ethereal', 'Galactic', 'Transcendental', 'Angelic', 'Demonic', 'Void', 'Antimatter', 'Quantum', 'Extreme', 'Radiant', 'Celestial', 'Ascended', 'Forsaken', 'Astral', 'Sacred', 'Ultima'];
const raritySizes = [6, 7, 7, 8, 8, 9, 9, 10, 10, 10, 11, 11, 11, 13, 14, 14, 15, 15, 15, 16, 16, 16, 17, 17, 17, 18, 18, 19]
const rarityValues = [1, 3, 10, 25, 100, 300, 1000, 3000, 10000, 40000, 2.5e5, 5e5, 7e6, 4e7, 1e9, 1e10, 1e11, 1e12, 1e13, 5e14, 1e16, 2.5e17, 1e19, 4e20, 1.5e22, 5e23]
const rarityColours = ['#bbbbbb', '#bbbbbb', '#45bb45', '#45bb45', '#4545bb', '#4545bb', '#8845bb', '#8845bb', '#ff8800', '#ff8800', '#ff0000', '#ff0000', '#ff7b00', '#bb24bb', '#4800ff', '#000000', '#8200ff', '#000042', '#82ff49', '#14c98d', '#ffffff', '#ffe500', '#ff0000', '#5c0000', '#333333', '#111111', '#c307eb', '#11053a', '#d946ff', "#ffffff", "#0ba67f", "#07fbdd", "#ef9a1f", "#fcf046", "#52e5f6", "#ffffff", "#0c1381", "#635cdd", "#9f0811", "#fb0102", "#fe4dfe", "#e167cf","#367f97", "#1d111f", "#b452fd", "#c6f2ff"]

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
    //console.log("saving")
    game.lastSave = Date.now();
    localStorage.setItem("rarityOrbsSXLSave", JSON.stringify(game));
}
  
function setAutoSave() {
    setInterval(save, 5000);
    autosaveStarted = true;
}
  
function load() {
        reset()
        let loadgame = JSON.parse(localStorage.getItem("rarityOrbsSXLSave"))
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
    //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
    let loadKeys = Object.keys(loadgame);
    for (i=0; i<loadKeys.length; i++) {
        if (loadgame[loadKeys[i]] != "undefined") {
            let thisKey = loadKeys[i];
            if (Array.isArray(loadgame[thisKey])) {
                game[loadKeys[i]] = loadgame[thisKey].map((x) => {return x})
            }
            //else {game[Object.keys(game)[i]] = loadgame[loadKeys[i]]}
            else {game[loadKeys[i]] = loadgame[loadKeys[i]]}
        }
    }
    if (game.spawnIntervals.length == 3) {
        game.spawnIntervals.push(10000)
    }

    if (game.spawnerLuck.length == 3) {
        game.spawnerLuck.push(10)
    }

    if (game.upgradeCosts.length == 9) {
        game.upgradeCosts.push(1e10)
        game.upgradeCosts.push(1e9)
    }

    if (game.spawnIntervals.length == 4) {
        game.spawnIntervals.push(60000)
    }

    if (game.spawnerLuck.length == 4) {
        game.spawnerLuck.push(100)
    }

    if (game.upgradeCosts.length == 11) {
        game.upgradeCosts.push(5e13)
        game.upgradeCosts.push(2.5e13)
    }

    if (game.mechanicsUnlocked == 0) {
        if (game.boostsUnlocked) game.mechanicsUnlocked = 1
        if (game.rebirthUnlocked) game.mechanicsUnlocked = 2
        if (game.tierUnlocked) game.mechanicsUnlocked = 4
    }

    //Update upgrade text
    updateAllUpgradeText()

    //Spawner 2
    if (game.spawnersUnlocked >= 2) {
        document.getElementsByClassName("spawnerTab")[1].style.display = "block";
        document.getElementsByClassName("spawnerTabBuyButton")[0].style.display = "none";
        setTimeout(spawn2, game.spawnIntervals[1])
    }
    //Spawne 3
    if (game.spawnersUnlocked >= 3) {
        document.getElementsByClassName("spawnerTab")[2].style.display = "block";
        document.getElementsByClassName("spawnerTabBuyButton")[1].style.display = "none";
        setTimeout(spawn3, game.spawnIntervals[2])
    }
    //Spawner 4
    if (game.spawnersUnlocked >= 4) {
        document.getElementsByClassName("spawnerTab")[3].style.display = "block";
        document.getElementsByClassName("spawnerTabBuyButton")[2].style.display = "none";
        setTimeout(spawn4, game.spawnIntervals[3])
    }
    //Spawner 5
    if (game.spawnersUnlocked >= 5) {
        document.getElementsByClassName("spawnerTab")[4].style.display = "block";
        document.getElementsByClassName("spawnerTabBuyButton")[3].style.display = "none";
        setTimeout(spawn5, game.spawnIntervals[4])
    }

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
    if (game.mechanicsUnlocked >= 1) {
        document.getElementById("boosts").style.display = "inline-block";
        document.getElementById("unlockBoostsButton").style.display = "none";
        document.getElementById("unlockRebirthButton").style.display = "inline-block";
    }
    if (game.mechanicsUnlocked >= 2) {
        document.getElementById("rebirth").style.display = "inline-block";
        document.getElementById("unlockRebirthButton").style.display = "none";
        document.getElementById("unlockRBM").style.display = "inline-block";
    }
    if (game.mechanicsUnlocked >= 3) {
        document.getElementById("unlockRBM").style.display = "none";
        document.getElementById("unlockTierButton").style.display = "inline-block";
    }
    if (game.mechanicsUnlocked >= 4) {
        document.getElementById("tier").style.display = "inline-block";
        document.getElementById("unlockTierButton").style.display = "none";
    }

    //Rarity list
    game.raritiesDisplayed = 0
    updateRarityList()
}

function spawn5() {
    if (game.spawnersUnlocked >= 5) if (currentOrbs < 100) createOrb(5);
    setTimeout(spawn5, game.spawnIntervals[4])
}

function spawn4() {
    if (game.spawnersUnlocked >= 4) if (currentOrbs < 100) createOrb(4);
    setTimeout(spawn4, game.spawnIntervals[3])
}

function spawn3() {
    if (game.spawnersUnlocked >= 3) if (currentOrbs < 100) createOrb(3);
    setTimeout(spawn3, game.spawnIntervals[2])
}

function spawn2() {
    if (game.spawnersUnlocked >= 2) if (currentOrbs < 100) createOrb(2)
    setTimeout(spawn2, game.spawnIntervals[1])
}

function spawn1() {
    if (currentOrbs < 100) createOrb(1);
    setTimeout(spawn1, game.spawnIntervals[0]);
}
setTimeout(spawn1, game.spawnIntervals[0])

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
    let totalLuck = game.baseLuck * game.spawnerLuck[spawner-1] * (game.boostTimes[1] ? 2 : 1) * game.diamondLuck;
    //Find the highest rarity smaller than totalLuck*100000
    let highestRarity = 0;
    while (rarities[highestRarity] < totalLuck*100000) {
        highestRarity++;
    }
    var rarity = Math.random();
    for (var i = highestRarity; i>0; i--) {
        if (rarity < 1/rarities[i]*totalLuck) {
            return i + 1;
        }
    }
    return 1
}

function formatTime(x) {
    let hr = Math.floor(x/3600)
    let min = Math.floor(x/60) - hr*60
    let sec = x - hr*3600 - min*60
    return hr + ":" + min + ":" + sec
}

function updateText() {
    document.getElementById('money').innerText = "Money: $" + format(game.money);
    document.getElementById("multiplier").innerText = "Money multiplier: x" + format(game.moneyMultiplier * (game.boostTimes[0] ? 2 : 1),2);
    document.getElementById("luck").innerText = "Luck: x" + format(game.baseLuck * (game.boostTimes[1] ? 2 : 1) * game.diamondLuck,2);
    document.getElementById('diamonds').innerText = "Diamonds: " + format(game.diamonds);
    document.getElementById('diamondChance').innerText = "Diamond chance: " + format(game.diamondChance*100, 2) + "%";
    for (let i=0; i<=4; i++) {
        document.getElementsByClassName("spawnerInterval")[i].innerText = "Spawn interval: " + (game.spawnIntervals[i]/1000).toFixed(3) + "s";
        document.getElementsByClassName("spawnerLuck")[i].innerText = "Luck: x" + format(game.spawnerLuck[i]*game.baseLuck*2,2);
    }
    document.getElementById('rebirthText').innerText = "You have rebirthed " + format(game.rebirths) + " times\nRebirth luck multiplier: x" + format(2 ** game.rebirths)
    document.getElementById('tierText').innerHTML = `Your Tier is ${game.tiers} >> ${game.tiers+1}<br>Tier Luck Multiplier x${3**game.tiers} >> x${3**(game.tiers+1)}<br>Tier Money Multiplier x${2**game.tiers} >> x${2**(game.tiers+1)}`
}
updateText()
setInterval(updateText, 100);

function updateBoosts() {
    if (game.boostTimes[0] > 0) game.boostTimes[0]--
    if (game.boostTimes[1] > 0) game.boostTimes[1]--
    if (game.boostTimes[2] > 0) game.boostTimes[2]--
    game.timePlayed ++
    game.timeSpentinTier ++
    game.timeSpentinReb ++
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
        updateRarityList()
    }
    else {
        document.getElementsByClassName("boostText")[1].style.color = "#8f8"
        document.getElementsByClassName("boostText")[1].innerText = "2x luck - " + Math.floor(game.boostTimes[1]/60) + ":" + (game.boostTimes[1]%60).toString().padStart(2, "0")
    }
    document.getElementsByClassName("boostText")[2].innerText = "Duplicate cooldown: " + game.boostTimes[2] + "s"
}
updateBoosts()
setInterval(updateBoosts, 1000);
setInterval(updateRarityList, 200);

function updateAllUpgradeText() {
    document.getElementById("increaseMultiplierButton").innerHTML = "Increase money multiplier<br>x" + format(game.moneyMultiplier,2) + " >> x" + format(game.moneyMultiplier*1.15,2) + "<br>Costs $" + format(game.upgradeCosts[0])
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
    for (let i=4; i<=5; i++) {
        if (game.spawnIntervals[i-1]*0.95 < 100) {
            document.getElementsByClassName("decreaseIntervalButton")[i-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[i-1]/1000).toFixed(3) + "s >> " + "0.100s<br>Costs $" + format(game.upgradeCosts[1+2*i])
        } else {
            document.getElementsByClassName("decreaseIntervalButton")[i-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[i-1]/1000).toFixed(3) + "s >> " + (game.spawnIntervals[i-1]/1000*0.95).toFixed(3)  + "s<br>Costs $" + format(game.upgradeCosts[1+2*i])
        }
        document.getElementsByClassName("increaseSpawnerLuckButton")[i-1].innerHTML = "Increase luck<br>x" + format(game.spawnerLuck[i-1],2) + " >> x" + format(game.spawnerLuck[i-1]*1.1,2) + "<br>Costs $" + format(game.upgradeCosts[2+2*i])
    }
    document.getElementById('rebirthButton').innerHTML = "<b>Rebirth</b><br>Costs $" + format(3.5 ** game.rebirths * 5000) + "<br>Luck x" + format(2 ** game.rebirths) + " >> x" + format(2 ** (game.rebirths + 1))
    if (game.tiers == 0) {
        document.getElementById('tierButton').innerHTML = "<b>Tier Up</b><br>Cost: 100 Antimatter Orbs"
    } else {
        document.getElementById('tierButton').innerHTML = "<b>Tier Up</b><br>(Maxed Tier Unlocked)"
    }
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
    for (let i=4; i<=5; i++) {
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
    let rarUnl = "You unlocked " + game.highestRarity + " Rarities."
    if (game.mechanicsUnlocked >= 3) {
        rarUnl = rarUnl + " Total rarities unlocked boost Money by " + (1.06**game.highestRarity).toFixed(2) + "x"
    }
    document.getElementById("raritiesUnlocked").innerText = rarUnl

    let values = ["x2.0", "x1.0", "x1.5", "x1.0", "x2.0"]
    let colors = ["#8f8", "#ccc", "#bdf", "#ccc", "#8f8"]

    if (game.tiers >= 1) {
        values = ["x1.0", "x1.0", "x7.0", "x1.0", "x1.0"]
        colors = ["#ccc", "#ccc", "#efbf04", "#ccc", "#ccc"]
    }
    values.forEach((v, i) => {
        const el = document.getElementById("mult" + (i + 1))
        if (!el) return
        el.textContent = v
        el.style.color = colors[i]
    })
    document.getElementById("timePlayed").innerHTML = `Your Time Played is ${formatTime(game.timePlayed)}<br> Your last Rebirth was ${formatTime(game.timeSpentinReb)} ago<br>You are in Tier ${game.tiers} for ${formatTime(game.timeSpentinTier)}`
}
updateVisuals()
setInterval(updateVisuals, 100);

function increaseMultiplier() {
    if (game.money >= game.upgradeCosts[0]) {
        game.money -= game.upgradeCosts[0];
        game.moneyMultiplier *= 1.15;
        game.upgradeCosts[0] = Math.floor(game.upgradeCosts[0]*1.7);
        updateText()
        updateVisuals()
        document.getElementById("increaseMultiplierButton").innerHTML = "Increase money multiplier<br>x" + format(game.moneyMultiplier,2) + " >> x" + format(game.moneyMultiplier*1.15,2) + "<br>Costs $" + format(game.upgradeCosts[0])
    }
}

function increaseLuck() {
    if (game.money >= game.upgradeCosts[1]) {
        game.money -= game.upgradeCosts[1];
        game.baseLuck *= 1.2;
        game.upgradeCosts[1] *= 2;
        updateRarityList()
        updateText()
        updateVisuals()
        document.getElementById("increaseLuckButton").innerHTML = "Increase base luck<br>x" + format(game.baseLuck,2) + " >> x" + format(game.baseLuck*1.2,2) + "<br>Costs $" + format(game.upgradeCosts[1])
    }
}

function increaseDiamondChance() {
    if (game.money >= game.upgradeCosts[2]) {
        game.money -= game.upgradeCosts[2];
        game.diamondChance += 0.001
        game.upgradeCosts[2] *= 5;
        updateText()
        updateVisuals()
        document.getElementById("increaseDiamondChanceButton").innerHTML = "Increase diamond chance<br>" + format(game.diamondChance*100, 2) + "% >> " + format((game.diamondChance+0.001)*100, 2) + "%<br>Costs $" + format(game.upgradeCosts[2])
    }
}

function decreaseInterval(x) {
    if (game.spawnIntervals[x-1] > 100) {
        if (x <= 3) {
            if (game.money >= game.upgradeCosts[2+x]) {
                game.money -= game.upgradeCosts[2+x];
                game.spawnIntervals[x-1] *= 0.95;
                if (game.spawnIntervals[x-1] < 100) game.spawnIntervals[x-1] = 100
                game.upgradeCosts[2+x] = Math.floor(game.upgradeCosts[2+x]*(2.5+x*0.25));
                updateText()
                updateVisuals()
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
                updateText()
                updateVisuals()
                if (game.spawnIntervals[x-1]*0.95 < 100) {
                    document.getElementsByClassName("decreaseIntervalButton")[x-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[x-1]/1000).toFixed(3) + "s >> " + "0.100s<br>Costs $" + format(game.upgradeCosts[1+2*x])
                } else {
                    document.getElementsByClassName("decreaseIntervalButton")[x-1].innerHTML = "Decrease interval<br>" + (game.spawnIntervals[x-1]/1000).toFixed(3) + "s >> " + (game.spawnIntervals[x-1]/1000*0.95).toFixed(3)  + "s<br>Costs $" + format(game.upgradeCosts[1+2*x])
                }
            }
        }
    }
}

function increaseSpawnerLuck(x) {
    if (x <= 3) {
        if (game.money >= game.upgradeCosts[5+x]) {
            game.money -= game.upgradeCosts[5+x];
            game.spawnerLuck[x-1] *= 1.1;
            game.upgradeCosts[5+x] = Math.floor(game.upgradeCosts[5+x]*4);
            updateRarityList()
            updateText()
            updateVisuals()
            document.getElementsByClassName("increaseSpawnerLuckButton")[x-1].innerHTML = "Increase luck<br>x" + format(game.spawnerLuck[x-1],2) + " >> x" + format(game.spawnerLuck[x-1]*1.1,2) + "<br>Costs $" + format(game.upgradeCosts[5+x])
        } 
    } else {
        if (game.money >= game.upgradeCosts[2+2*x]) { // id11.
            game.money -= game.upgradeCosts[2+2*x]
            game.spawnerLuck[x-1] *= 1.1;
            game.upgradeCosts[2+2*x] = Math.floor(game.upgradeCosts[2+2*x]*4);
            updateRarityList()
            updateText()
            updateVisuals()
            document.getElementsByClassName("increaseSpawnerLuckButton")[x-1].innerHTML = "Increase luck<br>x" + format(game.spawnerLuck[x-1],2) + " >> x" + format(game.spawnerLuck[x-1]*1.1,2) + "<br>Costs $" + format(game.upgradeCosts[2+2*x])
        }
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
        setTimeout(spawn2, game.spawnIntervals[1])
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
        setTimeout(spawn3, game.spawnIntervals[2])
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
        setTimeout(spawn4, game.spawnIntervals[3])
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
        setTimeout(spawn5, game.spawnIntervals[4])
    }
}

function unlockBoosts() {
    if (game.diamonds >= 20 && game.mechanicsUnlocked==0) {
        game.diamonds -= 20
        game.mechanicsUnlocked = 1
        updateText()
        document.getElementById("boosts").style.display = "inline-block";
        document.getElementById("unlockBoostsButton").style.display = "none";
        document.getElementById("unlockRebirthButton").style.display = "inline-block";
    }
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
}

function buyBoost(x) {
    const cost = getBoostCost(x)
    if (game.diamonds < cost) return
    if (x==5 && game.boostTimes[2] != 0) return
    game.diamonds -= cost
    game.boostData[x].uses++
    if (x==1) {
        game.boostTimes[0] += 60
        document.getElementsByClassName("boostText")[0].style.color = "#8f8"
        document.getElementsByClassName("boostText")[0].innerText = "2x money gain - " + Math.floor(game.boostTimes[0]/60) + ":" + (game.boostTimes[0]%60).toString().padStart(2, "0")
        updateText()
    }
    else if (x==2) {
        game.boostTimes[0] += 300
        document.getElementsByClassName("boostText")[0].style.color = "#8f8"
        document.getElementsByClassName("boostText")[0].innerText = "2x money gain - " + Math.floor(game.boostTimes[0]/60) + ":" + (game.boostTimes[0]%60).toString().padStart(2, "0")
        updateText()
    }
    else if (x==3) {
        game.boostTimes[1] += 60
        document.getElementsByClassName("boostText")[1].style.color = "#8f8"
        document.getElementsByClassName("boostText")[1].innerText = "2x luck - " + Math.floor(game.boostTimes[1]/60) + ":" + (game.boostTimes[1]%60).toString().padStart(2, "0")
        updateText()
        updateRarityList()
    }
    else if (x==4) {
        game.boostTimes[1] += 300
        document.getElementsByClassName("boostText")[1].style.color = "#8f8"
        document.getElementsByClassName("boostText")[1].innerText = "2x luck - " + Math.floor(game.boostTimes[1]/60) + ":" + (game.boostTimes[1]%60).toString().padStart(2, "0")
        updateText()
        updateRarityList()
    }
    else if (x==5) {
        game.boostTimes[2] = 60
        duplicateOrbs()
        document.getElementsByClassName("boostText")[2].innerText = "Duplicate cooldown: " + game.boostTimes[2] + "s"
        updateText()
    }
    updateBoostButtons()
}

function updateRarityList() {
    //Update pre-existing rarity slot text
    for (let i=0; i<game.raritiesDisplayed; i++) {
        document.getElementsByClassName("raritySlotText")[i].innerHTML = rarityNames[i] + "<br><span style='font-size: 17.5px'>$" + format(rarityValues[i]) + " • 1 in " + format(Math.max(rarities[i] / game.baseLuck / (game.boostTimes[1] ? 2 : 1) / game.diamondLuck, 1), 1) + " • Obtained: "+ game.orbsObtained[i] + "</span>";
    }
    while (game.raritiesDisplayed < game.highestRarity || game.raritiesDisplayed < 4) {
        //Create a div with the class 'raritySlot'
        let newSlot = document.createElement("div");
        newSlot.className = "raritySlot";
        newSlot.style.backgroundImage = "linear-gradient(" + rarityColours[game.raritiesDisplayed*2] + ", " + rarityColours[game.raritiesDisplayed*2+1] + ")";
        newSlot.innerHTML = "<img src='img/ball" + (game.raritiesDisplayed+1) + ".png' class='raritySlotImage'><p class='raritySlotText'>" + rarityNames[game.raritiesDisplayed] + "<br><span style='font-size: 20px'>$" + format(rarityValues[game.raritiesDisplayed]) + " • 1 in " + format(Math.max(rarities[game.raritiesDisplayed]/game.baseLuck/game.diamondLuck/ (game.boostTimes[1] ? 2 : 1), 1), 1) + "</span></p>";
        document.getElementById("raritiesList").appendChild(newSlot);
        game.raritiesDisplayed++
    }
    //Update the next rarity text
    let cap = rarities.length - game.raritiesDisplayed
    for (let i=0; i<3; i++) {
        document.getElementsByClassName("nextRarityText")[i].innerHTML = "To be discovered...<br><span style='font-size: 20px'>$" + format(rarityValues[game.raritiesDisplayed+i]) + " • 1 in " + format(Math.max(rarities[game.raritiesDisplayed+i] / game.baseLuck / (game.boostTimes[1] ? 2 : 1) / game.diamondLuck, 1), 1) + "</span>";
    }
}
updateRarityList()

function unlockRebirth() {
    if (game.diamonds >= 50 && game.mechanicsUnlocked==1) {
        game.diamonds -= 50
        game.mechanicsUnlocked = 2
        updateText()
        document.getElementById("rebirth").style.display = "inline-block";
        document.getElementById("unlockRebirthButton").style.display = "none";
        document.getElementById("unlockRBM").style.display = "inline-block";
    }
}

function unlockRBM() {
    if (game.diamonds >= 250 && game.mechanicsUnlocked==2) {
        game.diamonds -= 250
        game.mechanicsUnlocked = 3
        updateText()
        document.getElementById("unlockRBM").style.display = "none";
        document.getElementById("unlockTierButton").style.display = "inline-block";
    }
}

function unlockTier() {
    if (game.diamonds >= 800 && game.mechanicsUnlocked==3 && game.rebirths >= 16) {
        game.diamonds -= 800
        game.mechanicsUnlocked = 4
        updateText()
        document.getElementById("tier").style.display = "inline-block";
        document.getElementById("unlockTierButton").style.display = "none";
    }
}

function rebirth() {
    if (game.money > 3.5 ** game.rebirths * 5000) {
        game.rebirths++
        game.money = 0
        game.moneyMultiplier = 2 ** game.tiers
        game.baseLuck = (2 ** game.rebirths) * (3 ** game.tiers)
        game.diamonds = Math.floor(game.diamonds / 10)*5
        game.diamondChance = 0.01
        game.timeSpentinReb = 0
        game.spawnIntervals = [1000, 2000, 4000, 10000, 60000]
        game.spawnerLuck = [1, 1.5, 2.5, 10, 100]
        game.upgradeCosts = [50, 100, 500, 250, 1500, 25000, 2000, 8000, 75000, 1e10, 1e9, 5e13, 2.5e13]
        game.boostTimes = [0, 0, 0]
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

function tier() {
    if (game.tiers == 0 && game.orbsObtained[13] >= 100) {
        game.tiers++
        game.money = 0
        game.rebirths = 0
        game.moneyMultiplier = 2 ** game.tiers
        game.baseLuck = 3 ** game.tiers
        game.diamonds = 0
        game.diamondChance = 0.01
        game.spawnersUnlocked = 1
        game.timeSpentinTier = 0
        for (let i=1; i<=5; i++) {
            game.boostData[i]['uses'] = 0
        }
        game.timeSpentinReb = 0
        game.spawnIntervals = [1000, 2000, 4000, 10000, 60000]
        game.spawnerLuck = [1, 1.5, 2.5, 10, 100]
        game.upgradeCosts = [50, 100, 500, 250, 1500, 25000, 2000, 8000, 75000, 1e10, 1e9, 5e13, 2.5e13]
        game.boostTimes = [0, 0, 0]
        document.getElementsByClassName("boostText")[0].style.color = "#bbb"
        document.getElementsByClassName("boostText")[0].innerText = "2x money gain - 0:00 (not active)"
        document.getElementsByClassName("boostText")[1].style.color = "#bbb"
        document.getElementsByClassName("boostText")[1].innerText = "2x luck - 0:00 (not active)"
        document.getElementsByClassName("boostText")[2].innerText = "Duplicate cooldown: " + game.boostTimes[2] + "s"
        document.getElementsByClassName("spawnerTab")[1].style.display = "none";
        document.getElementsByClassName("spawnerTab")[2].style.display = "none";
        document.getElementsByClassName("spawnerTab")[3].style.display = "none";
        document.getElementsByClassName("spawnerTab")[4].style.display = "none";
        document.getElementsByClassName("spawnerTabBuyButton")[0].style.display = "";
        document.getElementsByClassName("spawnerTabBuyButton")[1].style.display = "";
        document.getElementsByClassName("spawnerTabBuyButton")[2].style.display = "";
        document.getElementsByClassName("spawnerTabBuyButton")[3].style.display = "";
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
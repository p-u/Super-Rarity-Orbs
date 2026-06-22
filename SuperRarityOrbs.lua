--[[
    Super Rarity Orbs - Roblox Lua Port
    Place as LocalScript in StarterPlayerScripts
    Original by randim82 / Demonin. Ported to Roblox Lua.
]]

-- SERVICES
local Players          = game:GetService("Players")
local RunService       = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local player    = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

-- Network Events
local network = ReplicatedStorage:WaitForChild("SRO_Network")
local saveEvent = network:WaitForChild("SaveData")
local reqLoadEvent = network:WaitForChild("RequestLoadData")
local loadEvent = network:WaitForChild("LoadData")

-- ============================================================
-- CONSTANTS
-- ============================================================
local illionsShort = {
    "K","M","B","T","Qa","Qt","Sx","Sp","Oc","No","Dc",
    "UDc","DDc","TDc","QaDc","QiDc","SxDc","SpDc","OcDc","NoDc",
    "Vg","UVg","DVg","TVg","QaVg","QiVg","SxVg","SpVg","OcVg","NoVg",
    "Tg","UTg","DTg","TTg","QaTg","QiTg","SxTg","SpTg","OcTg","NoTg",
    "Qag","UQag","DQag","TQag","QaQag","QiQag","SxQag","SpQag","OcQag","NoQag",
    "Qtg","UQtg","DQtg","TQtg","QaQtg","QiQtg","SxQtg","SpQtg","OcQtg","NoQtg",
    "Sxg","USxg","DSxg","TSxg","QaSxg","QiSxg","SxSxg","SpSxg","OcSxg","NoSxg",
    "Spg","USpg","DSpg","TSpg","QaSpg","QiSpg","SxSpg","SpSpg","OcSpg","NoSpg",
    "Og","UOg","DOg","TOg","QaOg","QiOg","SxOg","SpOg","OcOg","NoOg",
    "Ng","UNg","DNg","TNg","QaNg","QiNg","SxNg","SpNg","OcNg","NoNg",
    "Ce","UCe"
}

local rarities = {
    1,4,15,50,250,1200,7000,30000,140000,750000,
    6e6,2e7,4.5e8,7e9,2.5e12,7e13,1.5e15,3e16,5.8e17,1e20,
    8e21,7.5e23,1.6e26,5.5e27,4e29,3.2e30,2.4e32,5e33,1.5e35,5e37,
    8e38,1.5e40,2e41,6e42,5e44,1e46,1e47,5e48,1e50,2.8e51,
    2.8e53,1.7e54,5e55,1e57,5e58,2.5e60,2.5e62,5e64,2.5e67,2.5e70
}

local rarityNames = {
    "Common","Uncommon","Rare","Epic","Legendary","Mythical","Exotic","Ethereal",
    "Galactic","Divine","Transcendental","Angelic","Demonic","Void","Antimatter",
    "Quantum","Extreme","Radiant","Celestial","Ascended","Forsaken","Astral",
    "Supernova","Toxic","Nuclear","Lightning","Duke","Prince","King","Fusion",
    "Fusion Mk. II","Fusion Mk. III","Fusion Mk. IV","Fusion Mk. V","Earth",
    "City","Magma","Volcano","Earthquake","Country","Space","Planet",
    "Solar System","Nebula","Galaxy","Universal","Timeless","Infinity",
    "Absolute Infinity","Finality"
}

local rarityValues = {
    1,4,14,35,145,450,1600,4800,16000,60000,
    4e5,8.25e5,1.1e7,6.7e7,1.57e9,1.62e10,1.64e11,1.72e12,
    1.78e13,9e14,1.85e16,4e17,1.7e19,2.9e20,7.9e21,3e22,6e23,
    3.5e24,3.3e25,1.9e27,9e27,5e28,2.7e29,2.6e30,1e32,7e32,
    4e33,8e34,8e35,1e37,5e38,1.2e39,1.5e40,1.2e41,1.8e42,
    1.8e43,1.8e44,1.8e45,1.8e46,1.8e49
}

local raritySizes = {
    0.6,0.7,0.7,0.8,0.8,0.9,0.9,1.0,1.0,1.0,
    1.1,1.1,1.1,1.1,1.2,1.2,1.2,1.2,1.3,1.3,
    1.3,1.3,1.4,1.4,1.4,1.4,1.4,1.4,1.4,1.5,
    1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,
    1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5,1.5
}

local rarityColors = {
    Color3.fromHex("bbbbbb"),Color3.fromHex("bbbbbb"),
    Color3.fromHex("45bb45"),Color3.fromHex("45bb45"),
    Color3.fromHex("4545bb"),Color3.fromHex("4545bb"),
    Color3.fromHex("8845bb"),Color3.fromHex("8845bb"),
    Color3.fromHex("ff8800"),Color3.fromHex("ff8800"),
    Color3.fromHex("ff0000"),Color3.fromHex("ff0000"),
    Color3.fromHex("ff7b00"),Color3.fromHex("bb24bb"),
    Color3.fromHex("4800ff"),Color3.fromHex("111111"),
    Color3.fromHex("8200ff"),Color3.fromHex("000042"),
    Color3.fromHex("00c8ff"),Color3.fromHex("0084ff"),
    Color3.fromHex("82ff49"),Color3.fromHex("14c98d"),
    Color3.fromHex("ffffff"),Color3.fromHex("ffe500"),
    Color3.fromHex("ff0000"),Color3.fromHex("5c0000"),
    Color3.fromHex("333333"),Color3.fromHex("222222"),
    Color3.fromHex("c307eb"),Color3.fromHex("11053a"),
    Color3.fromHex("d946ff"),Color3.fromHex("ffffff"),
    Color3.fromHex("0ba67f"),Color3.fromHex("07fbdd"),
    Color3.fromHex("ef9a1f"),Color3.fromHex("fcf046"),
    Color3.fromHex("52e5f6"),Color3.fromHex("ffffff"),
    Color3.fromHex("0c1381"),Color3.fromHex("635cdd"),
    Color3.fromHex("9f0811"),Color3.fromHex("fb0102"),
    Color3.fromHex("fe4dfe"),Color3.fromHex("e167cf"),
    Color3.fromHex("ffa700"),Color3.fromHex("ff4000"),
    Color3.fromHex("1cd328"),Color3.fromHex("03660f"),
    Color3.fromHex("ffd600"),Color3.fromHex("ffc800"),
}

local weatherNames = {"Drizzle","Rain","Thunderstorm","Snow","Hail","Avalanche","Tornado","Hurricane","Asteroid Impact","Meteor Shower"}
local weatherEff = {
    {0.5,0,0,60},{0,0.5,0,60},{0.5,0.5,0,60},{1,0.5,0.1,75},{1.25,0.5,0.25,75},
    {1.75,1,0.25,120},{2.5,1,0.25,150},{2.5,2,0.25,150},{2.5,2,2,150},{5,3,2,150},
}
local weatherColors = {
    Color3.fromHex("ADD8E6"),Color3.fromHex("4a90e2"),Color3.fromHex("4a4ae2"),
    Color3.fromHex("ffffff"),Color3.fromHex("87ABA5"),Color3.fromHex("e3f4ff"),
    Color3.fromHex("888888"),Color3.fromHex("555555"),Color3.fromHex("767676"),Color3.fromHex("242ab2"),
}

local MAX_TIER = 3

-- ============================================================
-- GAME STATE
-- ============================================================
local G = {} -- Game data table

local function resetGame()
    G = {
        money=0, moneyMultiplier=1, highestRarity=0, raritiesDisplayed=0,
        diamonds=0, diamondChance=0.01,
        spawnIntervals={1.0,2.0,4.0,10.0,60.0,120.0,250.0},
        baseLuck=1, totalLuck=1, bestLuck=1,
        rebBaseCost=4000, rebScaling=3.5, weatherpts=0,
        spawnerLuck={1,1.5,2.5,10,100,1000,10000},
        numberFormat="standard",
        upgradeCosts={50,100,500,250,1500,25000,2000,8000,75000,1e10,1e9,5e13,2.5e13,1e20,1e22,1e33,1e34},
        newUpgCosts={200},
        extUpgCosts={1e33,10000,10,500000},
        weatherUpCosts={0.8,1,3},
        diamondLuck=1, diamondMult=1, weatherMoney=1,
        weatherUnlocked=1, weatherRolled=0,
        ttlOrbSpawn=0, spawnersUnlocked=1,
        boostTimes={0,0,0,0},
        weatherMult={1,1,1},
        hideInfinity=false, showBaseRarity=false, ORActive=false,
        orbsObtained={}, currentUpgrades={},
        timePlayed=0, timeSpentinTier=0, timeSpentinReb=0,
        mechanicsUnlocked=0, rebirths=0,
        weatherDuration={}, weatherRollCooldown=0,
        weatherChances={1,0,0,0,0,0,0,0,0,0},
        difficulty="orig", tiers=0,
        boostData={
            [1]={baseCost=50,increment=15,uses=0},
            [2]={baseCost=250,increment=100,uses=0},
            [3]={baseCost=50,increment=15,uses=0},
            [4]={baseCost=250,increment=100,uses=0},
            [5]={baseCost=500,increment=100,uses=0},
            [6]={baseCost=250,increment=25,uses=0},
        },
        skillTreeUpgs={
            max={
                name="Max Buy",
                upgrades={
                    {id="MAX-1",name="Buy Max Main",desc="Max buy main upgrades",cost=1,req=nil},
                    {id="MAX-2",name="Buy Max Spawner",desc="Max buy spawner upgrades",cost=1,req=nil},
                    {id="MAX-3",name="Buy Max Rebirth",desc="Toggle bulk rebirths",cost=3,req={"MAX-1","MAX-2"}},
                    {id="MAX-4",name="One button for all",desc="Max buy all spawners",cost=1,req={"MAX-2"}},
                },
                bought={0,0,0,0}, unlocked={true,true,true,true},
            },
            rless={
                name="Reset Less",
                upgrades={
                    {id="RL-1",name="Keep Upgrades",desc="Keep % of upgrade levels on Rebirth",levels={25,50,70,80,88},costs={1,1,2,2,3},req=nil},
                    {id="RL-2",name="Faster Recovery",desc="Boost luck if below best luck",levels={1,2,3,4,6},costs={1,1,1,1,3},req=nil},
                    {id="RL-3",name="Rebirth Keeper",desc="Keep % of rebirths on Tier",levels={25,40,55,70,80,90},costs={1,1,2,3,2,5},req=nil},
                    {id="RL-4",name="Rebirth Booster",desc="Keep boost times on Rebirth",cost=1,req=nil},
                },
                bought={0,0,0,0}, unlocked={true,true,true,true},
            },
            boost={
                name="Boosts++",
                upgrades={
                    {id="BST-1",name="Efficient Boosts",desc="All boosts 50 diamonds cheaper",cost=1,req=nil},
                    {id="BST-2",name="Quick Dupe",desc="Halve duplicate cooldown",cost=1,req=nil},
                    {id="BST-3",name="Obstacle Remover",desc="Unlock obstacle remover boost",cost=1,req=nil},
                    {id="BST-4",name="Auto-Potion",desc="Auto buy 1min potions on expire",cost=3,req={"BST-2","BST-3"}},
                },
                bought={0,0,0,0}, unlocked={true,true,true,true},
            },
            main={
                name="Main Multipliers",
                upgrades={
                    {id="MN-1",name="Cash Flow",desc="x1.05 Money",cost=1,req=nil,infinite=true},
                    {id="MN-2",name="Lucky Power",desc="x1.1 Luck",cost=1,req=nil,infinite=true},
                    {id="MN-3",name="Gem Finder",desc="x1.05 Diamonds",cost=1,req=nil,infinite=true},
                    {id="MN-4",name="Glimmering",desc="+1% Shiny, +0.5% Glowing, Rainbow at 4",cost=1,req={"SPW-3"},infinite=true},
                },
                bought={0,0,0,0}, unlocked={true,true,true,true},
            },
            spawner={
                name="Spawner Upgrades",
                upgrades={
                    {id="SPW-1",name="New Spawner",desc="Unlock 1 new Spawner",cost=1,req=nil,max=2},
                    {id="SPW-2",name="Orb Capacity",desc="+25 Orb Cap",levels={25,50,75,100},costs={1,1,2,5},req=nil,max=4},
                    {id="SPW-3",name="Orb Variants",desc="Unlock Shiny/Glowing/Rainbow variants",cost=2,req=nil},
                    {id="SPW-4",name="Double Drop",desc="+10% double-drop chance",cost=1,req=nil,max=10},
                },
                bought={0,0,0,0}, unlocked={true,true,true,true},
            },
        },
        inSkillTree=false, maxTP=0, spentTP=0, currentTP=0, maxQP=0, currentQP=0,
        qpRefunded=false, weatherPower=0, weatherChance=0, spawnCap=100, automationpts=0,
        automation={levels={0,0,0,0},timers={0,0},scales={1.85,1.85},enabled={true,true}},
        tutorialStep=0, lastSave=0, resetlog={}, newraritylog={},
    }
    for i=1,99  do G.orbsObtained[i]=0 end
    for i=1,17  do G.currentUpgrades[i]=0 end
    for i=1,10  do G.weatherDuration[i]=0 end
end
resetGame()

-- ============================================================
-- UTILITY
-- ============================================================
local function format(x, precision, forceLarge)
    precision = precision or 0
    if x == math.huge or x ~= x then return "Infinity" end
    if x <= 0 then return tostring(math.floor(x)) end
    local fmt = G.numberFormat or "standard"
    if (forceLarge or x >= 1e9) and (fmt == "standard" or fmt == "standardLong") then
        local e = math.floor(math.log10(x)/3)
        e = math.max(1, math.min(e, #illionsShort))
        local v = x/(1000^e)
        return fmt == "standardLong" and string.format("%.2f %s",v,illionsShort[e])
                                     or string.format("%.2f%s",v,illionsShort[e])
    elseif (forceLarge or x >= 1e9) and fmt == "scientific" then
        local e = math.floor(math.log10(x))
        return string.format("%.2fe%d", x/(10^e), e)
    elseif x >= 1000 then
        local s,r = tostring(math.floor(x)),""
        for i=1,#s do
            if i>1 and (#s-i+1)%3==0 then r=r.."," end
            r=r..s:sub(i,i)
        end
        return r
    else
        return precision>0 and string.format("%."..precision.."f",x) or tostring(math.floor(x))
    end
end

local function formatTime(x)
    x=math.floor(x)
    local h=math.floor(x/3600)
    local m=math.floor(x/60)-h*60
    local s=x-h*3600-m*60
    return string.format("%d:%02d:%02d",h,m,s)
end

local function getSTUpAmt(id)
    if not G or not G.skillTreeUpgs then return 0 end
    for _,cat in pairs(G.skillTreeUpgs) do
        if cat.upgrades then
            for i,u in ipairs(cat.upgrades) do
                if u.id==id then return cat.bought[i] or 0 end
            end
        end
    end
    return 0
end

local function checkReqs(reqs)
    if not reqs then return true end
    for _,r in ipairs(reqs) do
        if getSTUpAmt(r)<=0 then return false end
    end
    return true
end

local function getBoostCost(id)
    local b=G.boostData[id]
    return b and (b.baseCost+b.uses*b.increment) or 999999
end

-- ============================================================
-- RARITY LOGIC
-- ============================================================
local function getRarity(spawnerID)
    local tLuck = G.totalLuck*(G.spawnerLuck[spawnerID] or 1)
    local hi=0
    for i=1,#rarities do
        if rarities[i]<tLuck*1e6 then hi=i else break end
    end
    local r=math.random()
    for i=hi,1,-1 do
        if r<(1/rarities[i])*tLuck then return i+1 end
    end
    return 1
end

local function recalcLuck()
    G.totalLuck = G.baseLuck*(G.boostTimes[2]>0 and 2 or 1)*G.diamondLuck
    if G.tiers>=1 then G.totalLuck=G.totalLuck*(1.1^getSTUpAmt("MN-2")) end
    if G.mechanicsUnlocked>=5 then G.totalLuck=G.totalLuck*G.weatherMult[1] end
    local RL2=getSTUpAmt("RL-2")
    if RL2>0 then
        local eff=1+(math.log(math.max(G.totalLuck,100))/math.log(2)/math.log10(math.max(G.totalLuck,100))/20*RL2)
        if G.totalLuck<G.bestLuck then
            G.totalLuck=math.min(G.totalLuck*eff, G.bestLuck)
        end
    end
    if G.bestLuck<G.totalLuck then G.bestLuck=G.totalLuck end
end

-- ============================================================
-- WEATHER
-- ============================================================
local function updateWeatherBoosts()
    local l,c,d=1,1,1
    for i=1,#G.weatherDuration do
        if (G.weatherDuration[i] or 0)>0 then
            l=l+weatherEff[i][1]; c=c+weatherEff[i][2]; d=d+weatherEff[i][3]
        end
    end
    G.weatherMult={l,c,d}
end

local function updateWeatherChance()
    local wc=G.weatherChances
    if G.weatherUnlocked>=2  then wc[1]=0.45;  wc[2]=0.55 end
    if G.weatherUnlocked>=3  then wc[2]=0.25;  wc[3]=0.30 end
    if G.weatherUnlocked>=4  then wc[3]=0.15;  wc[4]=0.15 end
    if G.weatherUnlocked>=5  then wc[4]=0.08;  wc[5]=0.07 end
    if G.weatherUnlocked>=6  then wc[5]=0.05;  wc[6]=0.02 end
    if G.weatherUnlocked>=7  then wc[6]=0.011; wc[7]=0.009 end
    if G.weatherUnlocked>=8  then wc[7]=0.006; wc[8]=0.003 end
    if G.weatherUnlocked>=9  then wc[8]=0.0025;wc[9]=0.0005 end
    if G.weatherUnlocked>=10 then wc[9]=0.0003;wc[10]=0.0002 end
end

local function updateWeatherStats()
    G.weatherChance = (G.diamondChance/250)*(1+0.1*math.log(G.weatherPower+1)/math.log(2))
    G.spawnCap = 100+getSTUpAmt("SPW-2")*25+math.floor(math.log(G.weatherPower+1)/math.log(3)*2)
end

local function doRollWeather()
    if G.weatherRollCooldown>0 then return nil end
    local cost=math.floor(G.weatherUpCosts[1]+0.5)
    if G.weatherpts<cost then return nil end
    G.weatherpts=G.weatherpts-cost
    G.weatherUpCosts[1]=G.weatherUpCosts[1]+0.2
    G.weatherRollCooldown=5; G.weatherRolled=G.weatherRolled+1
    updateWeatherChance()
    local r,cum=math.random(),0
    local wi=G.weatherUnlocked
    for i=1,G.weatherUnlocked do
        cum=cum+(G.weatherChances[i] or 0)
        if r<cum then wi=i; break end
    end
    G.weatherDuration[wi]=(G.weatherDuration[wi] or 0)+weatherEff[wi][4]
    G.weatherPower=G.weatherPower+(2^(wi-1))
    updateWeatherBoosts(); updateWeatherStats()
    return wi
end

local function doNewWeather()
    if G.weatherpts>=G.weatherUpCosts[2] and G.weatherUnlocked<9 then
        G.weatherpts=G.weatherpts-G.weatherUpCosts[2]
        G.weatherUnlocked=G.weatherUnlocked+1
        G.weatherUpCosts[2]=math.floor(G.weatherUpCosts[2]*2+0.5)
        updateWeatherChance(); return true
    end
    return false
end

local function doWPxMoney()
    if G.weatherpts>=G.weatherUpCosts[3] then
        G.weatherpts=G.weatherpts-G.weatherUpCosts[3]
        G.weatherMoney=G.weatherMoney*1.1
        G.weatherUpCosts[3]=math.floor(G.weatherUpCosts[3]*1.5+0.5)
        return true
    end
    return false
end

-- ============================================================
-- UPGRADES
-- ============================================================
local function incMult()
    if G.money>=G.upgradeCosts[1] then
        G.money=G.money-G.upgradeCosts[1]; G.moneyMultiplier=G.moneyMultiplier*1.15
        G.upgradeCosts[1]=math.floor(G.upgradeCosts[1]*1.7)
        G.currentUpgrades[1]=G.currentUpgrades[1]+1; return true
    end; return false
end

local function incLuck()
    if G.money>=G.upgradeCosts[2] then
        G.money=G.money-G.upgradeCosts[2]; G.baseLuck=G.baseLuck*1.2
        G.upgradeCosts[2]=G.upgradeCosts[2]*2
        G.currentUpgrades[2]=G.currentUpgrades[2]+1; return true
    end; return false
end

local function incDiaCh()
    if G.money>=G.upgradeCosts[3] then
        G.money=G.money-G.upgradeCosts[3]; G.diamondChance=G.diamondChance+0.001
        G.upgradeCosts[3]=G.upgradeCosts[3]*5
        G.currentUpgrades[3]=G.currentUpgrades[3]+1; return true
    end; return false
end

local function decInterval(s)
    if (G.spawnIntervals[s] or 1)*1000<=100 then return false end
    local ci = s<=3 and (2+s) or (1+2*s)
    if G.money>=G.upgradeCosts[ci] then
        G.money=G.money-G.upgradeCosts[ci]
        G.spawnIntervals[s]=math.max(G.spawnIntervals[s]*0.95,0.1)
        G.upgradeCosts[ci]=math.floor(G.upgradeCosts[ci]*(2.5+s*0.25))
        G.currentUpgrades[ci]=G.currentUpgrades[ci]+1; return true
    end; return false
end

local function incSpawnLuck(s)
    local ci = s<=3 and (5+s) or (2+2*s)
    if G.money>=G.upgradeCosts[ci] then
        G.money=G.money-G.upgradeCosts[ci]
        G.spawnerLuck[s]=G.spawnerLuck[s]*1.1
        G.upgradeCosts[ci]=math.floor(G.upgradeCosts[ci]*4)
        G.currentUpgrades[ci]=G.currentUpgrades[ci]+1; return true
    end; return false
end

local function doDiaLuck()
    if G.diamonds>=G.newUpgCosts[1] then
        G.diamonds=G.diamonds-G.newUpgCosts[1]
        G.newUpgCosts[1]=G.newUpgCosts[1]*2; G.diamondLuck=G.diamondLuck*1.1; return true
    end; return false
end

local function buySpawner(n)
    local costs={0,0,1000,20000,1e9,1e13}
    if G.money>=(costs[n] or 0) and G.spawnersUnlocked==n-1 then
        G.money=G.money-(costs[n] or 0); G.spawnersUnlocked=n; return true
    end; return false
end

-- ============================================================
-- REBIRTH / TIER
-- ============================================================
local function CurrencyReset(rb)
    G.money=0; G.moneyMultiplier=2^G.tiers
    G.baseLuck=(2^G.rebirths)*(3^G.tiers); G.diamondChance=0.01; G.timeSpentinReb=0
    G.spawnIntervals={1,2,4,10,60,120,250}; G.spawnerLuck={1,1.5,2.5,10,100,1000,10000}
    if rb then G.boostTimes={0,0,0,0} end
end

local function keepUpLevels()
    local RL1=getSTUpAmt("RL-1")
    local kpct=RL1>=1 and (({25,50,70,80,88})[RL1] or 0)/100 or 0
    local base={50,100,500,250,1500,25000,2000,8000,75000,1e10,1e9,5e13,2.5e13,1e20,1e22,1e33,1e34}
    G.upgradeCosts={}; for i=1,#base do G.upgradeCosts[i]=base[i] end
    for i=1,#G.currentUpgrades do
        local k=math.floor(G.currentUpgrades[i]*kpct)
        G.currentUpgrades[i]=k
        local m=i==2 and 2 or i==3 and 5 or (i>=4 and i<=6) and 2.5+(i-3)*0.25 or 4
        if k>0 then
            G.upgradeCosts[i]=math.floor(base[i]*(m^k))
            if i==1 then G.moneyMultiplier=G.moneyMultiplier*(1.15^k)
            elseif i==2 then G.baseLuck=G.baseLuck*(1.2^k)
            elseif i==3 then G.diamondChance=G.diamondChance+0.001*k
            else
                local si,isI=0,false
                if i>=4 and i<=6 then si=i-3;isI=true
                elseif i==10 then si=4;isI=true elseif i==12 then si=5;isI=true
                elseif i==14 then si=6;isI=true elseif i==16 then si=7;isI=true
                elseif i>=7 and i<=9 then si=i-6
                elseif i==11 then si=4 elseif i==13 then si=5
                elseif i==15 then si=6 elseif i==17 then si=7 end
                if si>0 then
                    if isI then G.spawnIntervals[si]=math.max(G.spawnIntervals[si]*(0.95^k),0.1)
                    else G.spawnerLuck[si]=(({1,1.5,2.5,10,100,1000,10000})[si] or 1)*(1.1^k) end
                end
            end
        end
    end
end

local function doRebirth()
    local req=G.rebScaling^G.rebirths*G.rebBaseCost
    if G.money<=req then return false end
    G.rebirths=G.rebirths+1
    G.diamonds=math.floor(G.diamonds*0.9)
    CurrencyReset(getSTUpAmt("RL-4")<1)
    keepUpLevels(); return true
end

local function canAffordTier()
    if G.tiers==0 and (G.orbsObtained[14] or 0)>=50 then return true end
    if G.tiers==1 and (G.orbsObtained[21] or 0)>=10  then return true end
    if G.tiers==2 and (G.orbsObtained[30] or 0)>=5   then return true end
    return false
end

local function doTierUp()
    if not canAffordTier() then return false end
    G.tiers=G.tiers+1
    local RL3=getSTUpAmt("RL-3")
    if RL3>=1 then
        G.rebirths=math.floor(G.rebirths*(({25,40,55,70,80,90})[RL3] or 0)/100)
    else G.rebirths=0 end
    G.diamonds=0; G.weatherpts=0; G.automationpts=0
    G.weatherPower=math.floor(G.weatherPower/2)
    G.weatherUpCosts={0.8,1,3}; G.spawnersUnlocked=1; G.timeSpentinTier=0
    for i=1,6 do if G.boostData[i] then G.boostData[i].uses=0 end end
    G.upgradeCosts={50,100,500,250,1500,25000,2000,8000,75000,1e10,1e9,5e13,2.5e13,1e20,1e22,1e33,1e34}
    for i=1,17 do G.currentUpgrades[i]=0 end
    G.maxTP=G.maxTP+1
    if G.tiers==1 then G.maxTP=G.maxTP+1; G.currentTP=G.currentTP+1 end
    G.weatherMoney=1; G.currentTP=G.currentTP+1
    G.maxQP=(G.maxQP or 0)+1; G.currentQP=(G.currentQP or 0)+1
    CurrencyReset(true); return true
end

-- ============================================================
-- UNLOCKS
-- ============================================================
local function doUnlockRebirth()
    if G.diamonds>=50 and G.mechanicsUnlocked==0 then G.diamonds=G.diamonds-50;G.mechanicsUnlocked=1;return true end; return false
end
local function doUnlockBoosts()
    if G.diamonds>=250 and G.mechanicsUnlocked==1 then G.diamonds=G.diamonds-250;G.mechanicsUnlocked=2;return true end; return false
end
local function doUnlockRBM()
    if G.diamonds>=800 and G.mechanicsUnlocked==2 then G.diamonds=G.diamonds-800;G.mechanicsUnlocked=3;return true end; return false
end
local function doUnlockTier()
    if G.diamonds>=1600 and G.mechanicsUnlocked==3 and G.rebirths>=15 then G.diamonds=G.diamonds-1600;G.mechanicsUnlocked=4;return true end; return false
end
local function doUnlockWeather()
    if G.diamonds>=8000 and G.mechanicsUnlocked==4 and G.tiers>=2 then G.diamonds=G.diamonds-8000;G.mechanicsUnlocked=5;return true end; return false
end

-- ============================================================
-- BOOSTS
-- ============================================================
local function doBuyBoost(x)
    local c=getBoostCost(x)
    if G.diamonds<c then return false end
    if x==5 and G.boostTimes[3]~=0 then return false end
    if x==6 and G.boostTimes[4]~=0 then return false end
    G.diamonds=G.diamonds-c; G.boostData[x].uses=G.boostData[x].uses+1
    if x==1 then G.boostTimes[1]=G.boostTimes[1]+60
    elseif x==2 then G.boostTimes[1]=G.boostTimes[1]+300
    elseif x==3 then G.boostTimes[2]=G.boostTimes[2]+60
    elseif x==4 then G.boostTimes[2]=G.boostTimes[2]+300
    elseif x==5 then G.boostTimes[3]=getSTUpAmt("BST-2")>0 and 30 or 60
    elseif x==6 then G.boostTimes[4]=60; G.ORActive=true end
    return true
end

-- ============================================================
-- SKILL TREE
-- ============================================================
local function recalcPoints()
    local stP,qP=0,0
    for cat,cd in pairs(G.skillTreeUpgs) do
        if cd.bought and cd.upgrades then
            local isQP=(cat=="rless" or cat=="max")
            for i,lv in ipairs(cd.bought) do
                if lv>0 then
                    local u=cd.upgrades[i]; local tot=0
                    for j=1,lv do
                        local c=u.costs and (u.costs[j] or u.cost) or u.cost
                        if u.infinite then c=u.cost*(2^(j-1)) end
                        tot=tot+(c or 0)
                    end
                    if isQP then qP=qP+tot else stP=stP+tot end
                end
            end
        end
    end
    G.spentTP=stP
    local e=G.extUpgCosts
    local add=math.log(e[1]/1e33)/math.log(1e15)
            +math.log(e[2]/10000)/math.log(5)
            +math.log(e[3]/10)/math.log(5)
            +math.log(e[4]/500000)/math.log(4)
    G.maxTP=G.tiers+add
    if G.tiers>=1 then G.maxTP=G.maxTP+1 end
    G.maxQP=G.tiers+math.floor(G.maxTP/5)
    G.currentTP=G.maxTP-stP; G.currentQP=G.maxQP-qP
end

local function buySTUpg(cat,idx)
    local cd=G.skillTreeUpgs[cat]; if not cd then return false end
    local u=cd.upgrades[idx]; if not u then return false end
    if not checkReqs(u.req) then return false end
    local lv=cd.bought[idx] or 0
    local maxed=(u.infinite and false) or (u.max and lv>=u.max) or (u.levels and lv>=#u.levels) or (not u.infinite and not u.max and not u.levels and lv>0)
    if maxed then return false end
    local c=u.costs and (u.costs[lv+1] or u.cost) or u.cost
    if u.infinite then c=u.cost*(2^lv) end
    local isQP=(cat=="rless" or cat=="max")
    if isQP and (G.currentQP or 0)>=c then
        cd.bought[idx]=lv+1; recalcPoints(); return true
    elseif not isQP and (G.currentTP or 0)>=c then
        cd.bought[idx]=lv+1; recalcPoints(); return true
    end
    return false
end

local function respecST()
    for cat,cd in pairs(G.skillTreeUpgs) do
        if cat~="rless" and cat~="max" and cd.bought then
            for i=1,#cd.bought do cd.bought[i]=0 end
        end
    end
    G.rebirths=math.max(G.rebirths-2,0); G.diamonds=0; G.spawnersUnlocked=1
    G.upgradeCosts={50,100,500,250,1500,25000,2000,8000,75000,1e10,1e9,5e13,2.5e13,1e20,1e22,1e33,1e34}
    for i=1,17 do G.currentUpgrades[i]=0 end
    CurrencyReset(true); recalcPoints()
end

-- ============================================================
-- TP GAIN
-- ============================================================
local function doTPgain(i)
    local e=G.extUpgCosts
    if i==1 and G.money>=e[1] then
        G.money=G.money-e[1]; G.currentTP=G.currentTP+1; G.maxTP=G.maxTP+1; e[1]=e[1]*1e15; return true
    elseif i==2 and G.diamonds>=e[2] then
        G.diamonds=G.diamonds-e[2]; G.currentTP=G.currentTP+1; G.maxTP=G.maxTP+1; e[2]=e[2]*5; return true
    elseif i==3 and G.weatherRolled>=e[3] then
        G.currentTP=G.currentTP+1; G.maxTP=G.maxTP+1; e[3]=e[3]*5; return true
    elseif i==4 and G.ttlOrbSpawn>=e[4] then
        G.currentTP=G.currentTP+1; G.maxTP=G.maxTP+1; e[4]=e[4]*4; return true
    end
    return false
end

-- ============================================================
-- AUTOMATION
-- ============================================================
local function maxMain()
    local go=true; while go do go=false
        if incMult() then go=true elseif incLuck() then go=true elseif incDiaCh() then go=true end
    end
end
local function maxAllSpawners()
    local go=true; while go do go=false
        for i=1,G.spawnersUnlocked do
            if decInterval(i) then go=true; break end
            if incSpawnLuck(i) then go=true; break end
        end
    end
end
local function doAutomation(idx)
    if idx==1 then
        if G.automation.levels[3]>=1 and getSTUpAmt("MAX-1")>=1 then maxMain()
        else incMult(); incLuck(); incDiaCh() end
    elseif idx==2 then
        if G.automation.levels[4]>=1 and getSTUpAmt("MAX-2")>=1 then maxAllSpawners()
        else for i=1,G.spawnersUnlocked do decInterval(i);incSpawnLuck(i) end end
    end
end
local function doBuyAutomation(idx)
    local costs={1000,2500,500000,700000}
    local c=costs[idx]
    if idx<=2 then c=math.floor(costs[idx]*(G.automation.scales[idx]^G.automation.levels[idx])) end
    if G.automationpts>=c then
        if idx==3 and getSTUpAmt("MAX-1")<1 then return false end
        if idx==4 and getSTUpAmt("MAX-2")<1 then return false end
        if idx>=3 and G.automation.levels[idx]>=1 then return false end
        G.automationpts=G.automationpts-c; G.automation.levels[idx]=G.automation.levels[idx]+1; return true
    end; return false
end

-- ============================================================
-- SAVE / LOAD
-- ============================================================
local function saveGame()
    saveEvent:FireServer(G)
end

loadEvent.OnClientEvent:Connect(function(decoded)
    if type(decoded) == "table" then
        for k,v in pairs(decoded) do G[k]=v end
        while #G.orbsObtained<99 do G.orbsObtained[#G.orbsObtained+1]=0 end
        while #G.weatherDuration<10 do G.weatherDuration[#G.weatherDuration+1]=0 end
        recalcPoints(); updateWeatherChance(); updateWeatherBoosts(); updateWeatherStats(); recalcLuck()
    end
end)

local function loadGame()
    reqLoadEvent:FireServer()
end

-- ============================================================
-- PHYSICS BOARD
-- ============================================================
local BO=Vector3.new(0,50,0) -- board origin
local BW,BH,BD=40,80,4
local bFolder,oFolder
local orbList={}
local orbCount=0

local function getBF()
    if bFolder and bFolder.Parent then return bFolder end
    local ws=workspace
    bFolder=ws:FindFirstChild("SRO_Board") or Instance.new("Folder")
    bFolder.Name="SRO_Board"; bFolder.Parent=ws; return bFolder
end
local function getOF()
    if oFolder and oFolder.Parent then return oFolder end
    local ws=workspace
    oFolder=ws:FindFirstChild("SRO_Orbs") or Instance.new("Folder")
    oFolder.Name="SRO_Orbs"; oFolder.Parent=ws; return oFolder
end

local function mkStatic(cx,cy,sx,sy,sz,col)
    local p=Instance.new("Part")
    p.Anchored=true; p.CanCollide=true; p.Size=Vector3.new(sx,sy,sz or BD)
    p.CFrame=CFrame.new(BO+Vector3.new(cx-BW/2,BH/2-cy,0))
    p.Color=col or Color3.fromRGB(90,90,90)
    p.Material=Enum.Material.SmoothPlastic; p.Parent=getBF(); return p
end
local function mkPeg(cx,cy,r,col)
    local p=Instance.new("Part")
    p.Anchored=true; p.CanCollide=true; p.Shape=Enum.PartType.Ball
    p.Size=Vector3.new(r*2,r*2,r*2)
    p.CFrame=CFrame.new(BO+Vector3.new(cx-BW/2,BH/2-cy,0))
    p.Color=col or Color3.fromRGB(90,90,90)
    p.Material=Enum.Material.SmoothPlastic; p.Elasticity=0.75
    p.Parent=getBF(); return p
end

local function buildBoard()
    for _,c in ipairs(getBF():GetChildren()) do c:Destroy() end
    
    -- Background part to make it 2D
    local bg = Instance.new("Part")
    bg.Name = "SRO_Background"
    bg.Anchored = true
    bg.CanCollide = false
    bg.Size = Vector3.new(BW + 20, BH + 20, 2)
    bg.CFrame = CFrame.new(BO.X, BO.Y, BO.Z - 3)
    bg.Color = Color3.fromRGB(12, 12, 24)
    bg.Material = Enum.Material.SmoothPlastic
    bg.Parent = getBF()

    -- walls & floor
    mkStatic(20,82.5,BW+6,5,BD,Color3.fromRGB(40,40,40)) -- floor
    mkStatic(20,-2.5,BW+6,5,BD,Color3.fromRGB(40,40,40)) -- ceiling
    mkStatic(-3,40,5,BH+10,BD,Color3.fromRGB(40,40,40))  -- left
    mkStatic(43,40,5,BH+10,BD,Color3.fromRGB(40,40,40))  -- right
    -- slot dividers at bottom
    for _,x in ipairs({9.5,16.1,22.7,29.3}) do
        mkStatic(x,78,0.4,6,BD,Color3.fromRGB(60,60,80))
    end
    -- bottom pegs
    for col=0,3 do mkPeg(6+col*6.6,77.5,1.05) end

    local t=G.tiers
    if t==0 then
        -- Board 1
        local rows=(G.boostTimes[4] or 0)>15 and 4 or 6
        for row=0,rows-1 do
            for col=0,4 do mkPeg(1+col*6.6,22+row*8,1.2) end
            for col=0,3 do mkPeg(5.4+col*6.6,16.7+row*8,1.2) end
        end
    elseif t==1 then
        -- Board 2
        if (G.boostTimes[4] or 0)<=15 then
            local fL=mkStatic(8,12.5,20,2,BD); fL.CFrame=fL.CFrame*CFrame.Angles(0,0,math.pi/4)
            local fR=mkStatic(32,12.5,20,2,BD); fR.CFrame=fR.CFrame*CFrame.Angles(0,0,-math.pi/4)
        end
        mkPeg(20,26.7,2.5,Color3.fromRGB(140,140,140))
        for row=0,3 do
            for col=0,4 do mkPeg(1+col*6.6,32.5+row*10,1.2) end
            for col=0,4 do mkPeg(5.4+col*6.6,38.5+row*10,1.2) end
        end
    elseif t==2 then
        -- Board 3
        local function af(cx,cy,a)
            local f=mkStatic(cx,cy,12.5,1.5,BD); f.CFrame=f.CFrame*CFrame.Angles(0,0,a)
        end
        af(8,12.5,math.pi/4); af(32,12.5,-math.pi/4)
        if (G.boostTimes[4] or 0)<=15 then
            af(4,30,math.pi/3); af(17.5,30,-math.pi/3)
            af(23,30,math.pi/3); af(36,30,-math.pi/3)
            af(8,45,math.pi/4); af(32,45,-math.pi/4)
        end
        af(4,62.5,math.pi/3); af(17.5,62.5,-math.pi/3)
        af(23,62.5,math.pi/3); af(36,62.5,-math.pi/3)
    elseif t==3 then
        -- Board 4
        local function af(cx,cy,a)
            local f=mkStatic(cx,cy,12.5,1.5,BD); f.CFrame=f.CFrame*CFrame.Angles(0,0,a)
        end
        af(8,12.5,math.pi/4); af(32,12.5,-math.pi/4)
        mkPeg(20,35,2.5,Color3.fromRGB(140,140,140))
        mkStatic(6.6,40,17.5,1.5,BD); mkStatic(33.4,40,17.5,1.5,BD)
        mkStatic(4.4,49.5,4,1.5,BD); mkStatic(35.6,49.5,4,1.5,BD)
        for col=0,1 do mkPeg(14+col*6.6,46.5,1.05) end
        for row=0,1 do for col=0,3 do mkPeg(5+col*6.6,58.5+row*10,1.05) end end
        local n=(G.boostTimes[4] or 0)>=15 and 1 or 2
        for row=0,n-1 do for col=0,4 do mkPeg(1.5+col*6.6,52.5+row*10,1.05) end end
    end
end

local function slotMult(p)
    local bx=p.Position.X-(BO.X-BW/2)
    local by=BO.Y+BH/2-p.Position.Y
    local t=G.tiers
    if t<1 then
        if bx<6.6 then return 2 elseif bx>15.5 and bx<24.4 then return 1.5 elseif bx>33.3 then return 2 end
        return 1
    elseif t<2 then
        return (bx>15.5 and bx<24.4) and 5 or 1
    elseif t<3 then
        return 2
    else
        if (bx<=5.6 or bx>=34.4) and by>=45 and by<=50.5 then return 10 end
        if bx<6.6 then return 2.25 elseif bx>15.5 and bx<24.4 then return 2 elseif bx>33.3 then return 2.25 end
        return 1.75
    end
end

local function collectOrb(od)
    local vm=({nil,2,5,50})[od.variant=="shiny" and 2 or od.variant=="glowing" and 3 or od.variant=="rainbow" and 4 or 1] or 1
    local sm=slotMult(od.part.Position)
    if od.orbType=="ball" then
        local r=od.rarity
        local mg=rarityValues[r]*G.moneyMultiplier*G.weatherMoney*sm*vm*(G.boostTimes[1]>0 and 2 or 1)
        if G.mechanicsUnlocked>=3 then mg=mg*(1.06^(G.highestRarity or 0)) end
        if G.tiers>=1 then mg=mg*(1.05^getSTUpAmt("MN-1")) end
        G.money=G.money+mg
        G.orbsObtained[r]=(G.orbsObtained[r] or 0)+1
        if G.tiers>=2 and math.random()<0.1 then G.automationpts=G.automationpts+r end
    elseif od.orbType=="diamond" then
        local m=G.difficulty=="baby" and 2 or G.difficulty=="extreme" and 0.5 or 1
        if G.rebirths>=50 then m=m*((0.025*G.rebirths)-0.15) end
        if G.rebirths>=80 then m=m*(1.01^(G.rebirths-80)) end
        local tb=1+(15*G.tiers/100)
        G.diamonds=math.floor(G.diamonds+10*m*vm*(G.tiers>=2 and sm or 1)*tb)
    elseif od.orbType=="weather" then
        G.weatherpts=G.weatherpts+vm
    end
end

local function rollVariant()
    if getSTUpAmt("SPW-3")<=0 then return nil end
    local mn4=getSTUpAmt("MN-4"); local r=math.random()
    if mn4>=4 and r<0.0014 then return "rainbow" end
    if r<(mn4*0.005+0.01) then return "glowing" end
    if r<(0.01*mn4+0.1) then return "shiny" end
    return nil
end

local function spawnOrbPart(otype,rarity,variant)
    if orbCount>=(G.spawnCap or 100) then return end
    local rad=1.0; local col=Color3.fromRGB(200,200,200)
    if otype=="ball" then
        rad=raritySizes[rarity] or 1.0
        col=rarityColors[rarity] or Color3.fromRGB(200,200,200)
    elseif otype=="diamond" then
        rad=1.5; col=Color3.fromRGB(180,230,255)
    elseif otype=="weather" then
        rad=1.5; col=weatherColors[1]
    end
    local p=Instance.new("Part")
    p.Shape=Enum.PartType.Ball
    p.Size=Vector3.new(rad*2,rad*2,rad*2)
    p.CanCollide=true; p.Elasticity=0.85; p.Friction=0.05
    local sx=BO.X-BW/2+5+math.random()*(BW-10)
    p.CFrame=CFrame.new(sx,BO.Y+BH/2-3,BO.Z)
    -- Variant visuals
    if variant=="glowing" then
        p.Color=Color3.fromRGB(0,150,255); p.Material=Enum.Material.Neon
    elseif variant=="rainbow" then
        p.Color=Color3.fromHSV(0,1,1); p.Material=Enum.Material.Neon
        task.spawn(function()
            local h=0
            while p and p.Parent do
                h=(h+2)%360; p.Color=Color3.fromHSV(h/360,1,1); task.wait(0.05)
            end
        end)
    elseif variant=="shiny" then
        p.Color=col; p.Material=Enum.Material.Neon
    else
        p.Color=col; p.Material=Enum.Material.SmoothPlastic
    end
    p.Parent=getOF()
    -- Label
    local bg=Instance.new("BillboardGui")
    bg.Size=UDim2.new(0,70,0,18); bg.StudsOffset=Vector3.new(0,rad+0.5,0)
    bg.AlwaysOnTop=false
    local lb=Instance.new("TextLabel")
    lb.BackgroundTransparency=1; lb.Size=UDim2.new(1,0,1,0)
    lb.Font=Enum.Font.GothamBold; lb.TextScaled=true
    lb.TextColor3=Color3.fromRGB(255,255,255); lb.TextStrokeTransparency=0.4
    lb.Text=otype=="ball" and (rarityNames[rarity] or "Orb") or (otype=="diamond" and "Diamond" or "Weather")
    lb.Parent=bg; bg.Parent=p
    table.insert(orbList,{part=p,orbType=otype,rarity=rarity,variant=variant})
    orbCount=orbCount+1
end

local function checkOrbs()
    local gY=BO.Y+BH/2-77.5
    local rem={}
    for i,od in ipairs(orbList) do
        local part=od.part
        if not part or not part.Parent then
            table.insert(rem,i)
        else
            local py=part.Position.Y
            local bx=part.Position.X-(BO.X-BW/2)
            local by=BO.Y+BH/2-py
            local collect=false
            if py<=gY then collect=true end
            if G.tiers==3 and (bx<=5.5 or bx>=34.5) and by>=45 and by<=50 then collect=true end
            if collect then
                collectOrb(od); part:Destroy(); table.insert(rem,i)
            end
        end
    end
    for i=#rem,1,-1 do table.remove(orbList,rem[i]) end
    orbCount=#orbList
end

local function deleteAllOrbs()
    for _,od in ipairs(orbList) do if od.part and od.part.Parent then od.part:Destroy() end end
    orbList={}; orbCount=0
end

local function duplicateOrbs()
    local snap={}
    for _,od in ipairs(orbList) do
        if od.part and od.part.Parent then
            table.insert(snap,{orbType=od.orbType,rarity=od.rarity,variant=od.variant})
        end
    end
    for _,d in ipairs(snap) do spawnOrbPart(d.orbType,d.rarity,d.variant) end
end

-- ============================================================
-- SPAWNER LOOP
-- ============================================================
local spawnerActive={}

local function startSpawner(id)
    if spawnerActive[id] then return end
    spawnerActive[id]=true
    task.spawn(function()
        while spawnerActive[id] do
            task.wait(G.spawnIntervals[id] or 1)
            if G.inSkillTree then continue end
            if G.spawnersUnlocked<id then continue end
            if orbCount>=(G.spawnCap or 100) then continue end
            if G.mechanicsUnlocked>=5 and math.random()<G.weatherChance then
                spawnOrbPart("weather",nil,rollVariant()); continue
            end
            if math.random()<G.diamondChance then
                spawnOrbPart("diamond",nil,rollVariant()); continue
            end
            local cr=getRarity(id)
            if (G.highestRarity or 0)<cr then
                G.highestRarity=cr
                G.newraritylog[tostring(cr)]=formatTime(G.timePlayed)
            end
            G.ttlOrbSpawn=G.ttlOrbSpawn+1
            spawnOrbPart("ball",cr,rollVariant())
            if math.random()<getSTUpAmt("SPW-4")*0.1 then
                spawnOrbPart("ball",cr,rollVariant())
            end
        end
    end)
end

local function startAllSpawners()
    for i=1,7 do startSpawner(i) end
end

-- ============================================================
-- GUI
-- ============================================================
local SG=Instance.new("ScreenGui")
SG.Name="SRO"; SG.ResetOnSpawn=false; SG.ZIndexBehavior=Enum.ZIndexBehavior.Sibling
SG.Parent=playerGui

local main=Instance.new("Frame")
main.Size=UDim2.new(0,430,1,0); main.Position=UDim2.new(0,0,0,0)
main.BackgroundColor3=Color3.fromRGB(14,14,28); main.BorderSizePixel=0
main.Parent=SG

-- Stat bar
local sb=Instance.new("Frame")
sb.Size=UDim2.new(1,0,0,105); sb.BackgroundColor3=Color3.fromRGB(8,8,18)
sb.BorderSizePixel=0; sb.Parent=main

local function mkLbl(par,txt,pos,sz,fs,col)
    local l=Instance.new("TextLabel")
    l.Size=sz or UDim2.new(1,0,0,22); l.Position=pos or UDim2.new(0,0,0,0)
    l.BackgroundTransparency=1; l.TextColor3=col or Color3.fromRGB(255,255,255)
    l.Font=Enum.Font.Gotham; l.TextSize=fs or 15; l.Text=txt
    l.TextXAlignment=Enum.TextXAlignment.Left; l.TextWrapped=true; l.Parent=par; return l
end
local function mkBtn(par,txt,pos,sz,bg)
    local b=Instance.new("TextButton")
    b.Size=sz or UDim2.new(0,200,0,40); b.Position=pos or UDim2.new(0,0,0,0)
    b.BackgroundColor3=bg or Color3.fromRGB(55,55,90); b.BorderSizePixel=0
    b.TextColor3=Color3.fromRGB(255,255,255); b.Font=Enum.Font.GothamBold
    b.TextSize=12; b.Text=txt; b.TextWrapped=true; b.Parent=par
    local c=Instance.new("UICorner"); c.CornerRadius=UDim.new(0,5); c.Parent=b
    return b
end
local function addSep(par)
    local s=Instance.new("Frame")
    s.Size=UDim2.new(1,0,0,2); s.BackgroundColor3=Color3.fromRGB(55,55,75); s.BorderSizePixel=0
    s.Parent=par; return s
end

local lMoney=mkLbl(sb,"Money: $0",UDim2.new(0,5,0,3),UDim2.new(1,-10,0,26),20,Color3.fromRGB(255,220,60))
local lMult =mkLbl(sb,"Money Mult: x1.00",UDim2.new(0,5,0,29),UDim2.new(1,-10,0,17),13,Color3.fromRGB(190,190,190))
local lLuck =mkLbl(sb,"Luck: x1.00",UDim2.new(0,5,0,46),UDim2.new(1,-10,0,17),13,Color3.fromRGB(130,255,130))
local lDia  =mkLbl(sb,"Diamonds: 0",UDim2.new(0,5,0,63),UDim2.new(1,-10,0,17),13,Color3.fromRGB(130,200,255))
local lOrbs =mkLbl(sb,"Orbs: 0 / 100",UDim2.new(0,5,0,80),UDim2.new(1,-10,0,17),13,Color3.fromRGB(170,170,170))

-- Tabs
local TABnames={"Info","Spawners","Rebirth","Tier","Weather","Skills","Rarities","Settings"}
local tabRow=Instance.new("Frame")
tabRow.Size=UDim2.new(1,0,0,30); tabRow.Position=UDim2.new(0,0,0,105)
tabRow.BackgroundColor3=Color3.fromRGB(6,6,14); tabRow.BorderSizePixel=0; tabRow.Parent=main

local content=Instance.new("ScrollingFrame")
content.Size=UDim2.new(1,0,1,-(105+30)); content.Position=UDim2.new(0,0,0,135)
content.BackgroundColor3=Color3.fromRGB(14,14,28); content.BorderSizePixel=0
content.ScrollBarThickness=5; content.AutomaticCanvasSize=Enum.AutomaticSize.Y
content.Parent=main

local tabBtns,tabFrames={},{}
local activeTab=1
local function switchTab(i)
    activeTab=i
    for j,f in ipairs(tabFrames) do f.Visible=(j==i) end
    for j,b in ipairs(tabBtns) do b.BackgroundColor3=(j==i) and Color3.fromRGB(55,80,150) or Color3.fromRGB(20,20,45) end
end

local tw=1/#TABnames
for i,name in ipairs(TABnames) do
    local b=Instance.new("TextButton")
    b.Size=UDim2.new(tw,-2,1,-4); b.Position=UDim2.new(tw*(i-1),1,0,2)
    b.BackgroundColor3=Color3.fromRGB(20,20,45); b.TextColor3=Color3.fromRGB(210,210,210)
    b.Font=Enum.Font.GothamBold; b.TextSize=9; b.Text=name; b.BorderSizePixel=0
    b.Parent=tabRow; tabBtns[i]=b
    local co=Instance.new("UICorner"); co.CornerRadius=UDim.new(0,3); co.Parent=b
    local fr=Instance.new("Frame")
    fr.Size=UDim2.new(1,0,0,0); fr.AutomaticSize=Enum.AutomaticSize.Y
    fr.BackgroundTransparency=1; fr.Visible=(i==1); fr.Parent=content
    tabFrames[i]=fr
    local ul=Instance.new("UIListLayout")
    ul.SortOrder=Enum.SortOrder.LayoutOrder; ul.Padding=UDim.new(0,3); ul.Parent=fr
    local up=Instance.new("UIPadding")
    up.PaddingLeft=UDim.new(0,7); up.PaddingRight=UDim.new(0,7); up.PaddingTop=UDim.new(0,6); up.Parent=fr
    b.MouseButton1Click:Connect(function() switchTab(i) end)
end

-- ── TAB 1: INFO ─────────────────────────────────────────────
local T1=tabFrames[1]
addSep(T1)
local bIncMult=mkBtn(T1,"Increase Money Mult\nx1.00>>x1.15\n$50",nil,UDim2.new(1,0,0,48))
local bIncLuck=mkBtn(T1,"Increase Base Luck\nx1.00>>x1.20\n$100",nil,UDim2.new(1,0,0,48))
local bIncDia =mkBtn(T1,"Increase Diamond Chance\n1%>>1.1%\n$500",nil,UDim2.new(1,0,0,48))
local bDiaL   =mkBtn(T1,"Multiply Luck (keep on Tier)\nx1.00>>x1.10\n200 Diamonds",nil,UDim2.new(1,0,0,48))
bDiaL.Visible=false; addSep(T1)
local bUlkReb  =mkBtn(T1,"Unlock Rebirth\n50 Diamonds",nil,UDim2.new(1,0,0,40),Color3.fromRGB(90,40,140))
local bUlkBoost=mkBtn(T1,"Unlock Boosts\n250 Diamonds",nil,UDim2.new(1,0,0,40),Color3.fromRGB(90,60,10))
local bUlkRBM  =mkBtn(T1,"Rarities Boost Money\n800 Diamonds",nil,UDim2.new(1,0,0,40),Color3.fromRGB(70,70,10))
local bUlkTier =mkBtn(T1,"Unlock Tiers\n1600 Diamonds + Reb 15",nil,UDim2.new(1,0,0,40),Color3.fromRGB(50,80,120))
local bUlkWeath=mkBtn(T1,"Unlock Weather\n8000 Diamonds + Tier 2",nil,UDim2.new(1,0,0,40),Color3.fromRGB(40,110,70))
bUlkBoost.Visible=false; bUlkRBM.Visible=false; bUlkTier.Visible=false; bUlkWeath.Visible=false

bIncMult.MouseButton1Click:Connect(incMult)
bIncLuck.MouseButton1Click:Connect(function() incLuck(); recalcLuck() end)
bIncDia.MouseButton1Click:Connect(function() incDiaCh(); updateWeatherStats() end)
bDiaL.MouseButton1Click:Connect(doDiaLuck)
bUlkReb.MouseButton1Click:Connect(function() if doUnlockRebirth() then bUlkReb.Visible=false; bUlkBoost.Visible=true end end)
bUlkBoost.MouseButton1Click:Connect(function() if doUnlockBoosts() then bUlkBoost.Visible=false; bUlkRBM.Visible=true end end)
bUlkRBM.MouseButton1Click:Connect(function() if doUnlockRBM() then bUlkRBM.Visible=false; bUlkTier.Visible=true end end)
bUlkTier.MouseButton1Click:Connect(function() if doUnlockTier() then bUlkTier.Visible=false; bUlkWeath.Visible=true end end)
bUlkWeath.MouseButton1Click:Connect(function() if doUnlockWeather() then bUlkWeath.Visible=false end end)

-- ── TAB 2: SPAWNERS ─────────────────────────────────────────
local T2=tabFrames[2]
local spBtns={}
for s=1,7 do
    local sf=Instance.new("Frame")
    sf.Size=UDim2.new(1,0,0,0); sf.AutomaticSize=Enum.AutomaticSize.Y
    sf.BackgroundColor3=Color3.fromRGB(20,20,40); sf.BorderSizePixel=0; sf.Parent=T2
    local sc=Instance.new("UICorner"); sc.CornerRadius=UDim.new(0,5); sc.Parent=sf
    local sp2=Instance.new("UIPadding")
    sp2.PaddingLeft=UDim.new(0,5); sp2.PaddingRight=UDim.new(0,5)
    sp2.PaddingTop=UDim.new(0,3); sp2.PaddingBottom=UDim.new(0,3); sp2.Parent=sf
    local sl=Instance.new("UIListLayout"); sl.Padding=UDim.new(0,2); sl.Parent=sf
    local lT=mkLbl(sf,"Spawner "..s,nil,UDim2.new(1,0,0,18),14,Color3.fromRGB(220,190,70))
    local lI=mkLbl(sf,"Interval: 1.000s",nil,UDim2.new(1,0,0,15),12)
    local lL=mkLbl(sf,"Luck: x1.00",nil,UDim2.new(1,0,0,15),12)
    local bI=mkBtn(sf,"Decrease Interval",nil,UDim2.new(1,0,0,34))
    local bL=mkBtn(sf,"Increase Luck",nil,UDim2.new(1,0,0,34))
    local bB=mkBtn(sf,"Buy Spawner "..s,nil,UDim2.new(1,0,0,34),Color3.fromRGB(70,110,40))
    bI.MouseButton1Click:Connect(function() decInterval(s) end)
    bL.MouseButton1Click:Connect(function() incSpawnLuck(s) end)
    bB.MouseButton1Click:Connect(function() if buySpawner(s) then bB.Visible=false; startSpawner(s) end end)
    spBtns[s]={fr=sf,lI=lI,lL=lL,bI=bI,bL=bL,bB=bB}
end

-- ── TAB 3: REBIRTH + BOOSTS ─────────────────────────────────
local T3=tabFrames[3]
mkLbl(T3,"⚡ BOOSTS",nil,UDim2.new(1,0,0,20),15,Color3.fromRGB(255,200,50))
local lMB=mkLbl(T3,"2x Money - 0:00 (Inactive)",nil,UDim2.new(1,0,0,17),12,Color3.fromRGB(150,150,150))
local bBt={}
for i,t in ipairs({"2x Money 1m","2x Money 5m","2x Luck 1m","2x Luck 5m","Duplicate Orbs!","Remove Obstacles 45s"}) do
    bBt[i]=mkBtn(T3,t.."\n? Diamonds",nil,UDim2.new(1,0,0,38))
    bBt[i].Visible=false
    bBt[i].MouseButton1Click:Connect(function()
        if i==5 and doBuyBoost(5) then duplicateOrbs()
        else doBuyBoost(i) end
    end)
end
local lLB=mkLbl(T3,"2x Luck - 0:00 (Inactive)",nil,UDim2.new(1,0,0,17),12,Color3.fromRGB(150,150,150))
local lDB=mkLbl(T3,"Duplicate Cooldown: 0s",nil,UDim2.new(1,0,0,17),12,Color3.fromRGB(150,150,150))
addSep(T3)
mkLbl(T3,"♻ REBIRTH",nil,UDim2.new(1,0,0,20),15,Color3.fromRGB(180,100,255))
local lRI=mkLbl(T3,"Rebirths: 0\nRebirth Luck: x1",nil,UDim2.new(1,0,0,34),12,Color3.fromRGB(200,175,230))
local bReb=mkBtn(T3,"Rebirth\n$4,000",nil,UDim2.new(1,0,0,50),Color3.fromRGB(95,25,145))
bReb.MouseButton1Click:Connect(function()
    if doRebirth() then deleteAllOrbs(); buildBoard(); updateWeatherStats(); recalcLuck() end
end)
addSep(T3)
mkLbl(T3,"⚙ AUTOMATION (Tier 2+)",nil,UDim2.new(1,0,0,20),14,Color3.fromRGB(200,200,200))
local lAP=mkLbl(T3,"AP: 0",nil,UDim2.new(1,0,0,17),12)
local bAt={}
for i,t in ipairs({"AUTO-1: Automate Main","AUTO-2: Automate Spawners","AUTO-3: Max Main (500k AP)","AUTO-4: Max Spawners (700k AP)"}) do
    bAt[i]=mkBtn(T3,t,nil,UDim2.new(1,0,0,38)); bAt[i].Visible=false
    bAt[i].MouseButton1Click:Connect(function() doBuyAutomation(i) end)
end

-- ── TAB 4: TIER ─────────────────────────────────────────────
local T4=tabFrames[4]
mkLbl(T4,"🔺 TIER",nil,UDim2.new(1,0,0,20),15,Color3.fromRGB(107,124,147))
local lTI=mkLbl(T4,"Tier 0 >> 1 | Luck x1>>x3 | Money x1>>x2",nil,UDim2.new(1,0,0,50),12,Color3.fromRGB(200,200,200))
local bTier=mkBtn(T4,"Tier Up\n50 Void Orbs [ID 14]",nil,UDim2.new(1,0,0,50),Color3.fromRGB(60,85,125))
bTier.Visible=false
bTier.MouseButton1Click:Connect(function()
    if doTierUp() then deleteAllOrbs(); buildBoard(); updateWeatherStats(); recalcLuck() end
end)
addSep(T4)
local lTPD=mkLbl(T4,"TP: 0/0",nil,UDim2.new(1,0,0,17),12,Color3.fromRGB(200,220,255))
local bTP={}
for i,t in ipairs({"1 TP: $1 Dc","1 TP: 10k Diamonds","1 TP: 10 Weather","1 TP: 500k Orbs"}) do
    bTP[i]=mkBtn(T4,"Get "..t,nil,UDim2.new(1,0,0,38)); bTP[i].Visible=false
    bTP[i].MouseButton1Click:Connect(function() doTPgain(i) end)
end

-- ── TAB 5: WEATHER ──────────────────────────────────────────
local T5=tabFrames[5]
mkLbl(T5,"🌩 WEATHER",nil,UDim2.new(1,0,0,20),15,Color3.fromRGB(255,213,0))
local lWS=mkLbl(T5,"WP: 0 | Chance: 1/25000",nil,UDim2.new(1,0,0,34),12)
local lWB=mkLbl(T5,"Boost: x1 Luck, x1 Money, x1 Diamonds",nil,UDim2.new(1,0,0,17),12,Color3.fromRGB(180,255,180))
local lWP=mkLbl(T5,"Power: 0",nil,UDim2.new(1,0,0,17),12)
addSep(T5)
local bRW =mkBtn(T5,"Roll Weather!\n1 WP",nil,UDim2.new(1,0,0,42),Color3.fromRGB(45,90,140))
local bNW =mkBtn(T5,"Unlock new Weather\n1 WP",nil,UDim2.new(1,0,0,42))
local bWPM=mkBtn(T5,"Multiply Money (resets on Tier)\nx1>>x1.1\n3 WP",nil,UDim2.new(1,0,0,48))
local lWLog=mkLbl(T5,"No weather active.",nil,UDim2.new(1,0,0,80),11,Color3.fromRGB(190,190,210))
bRW.MouseButton1Click:Connect(function()
    local i=doRollWeather()
    if i then lWLog.Text="Rolled: "..weatherNames[i].." (+"..weatherEff[i][4].."s)" end
end)
bNW.MouseButton1Click:Connect(doNewWeather)
bWPM.MouseButton1Click:Connect(doWPxMoney)

-- ── TAB 6: SKILL TREE ───────────────────────────────────────
local T6=tabFrames[6]
mkLbl(T6,"🌳 SKILL TREE",nil,UDim2.new(1,0,0,20),15,Color3.fromRGB(255,255,255))
local lSTP=mkLbl(T6,"TP: 0/0 | QP: 0/0",nil,UDim2.new(1,0,0,17),12,Color3.fromRGB(200,220,255))
addSep(T6)

local catOrder={"main","spawner","boost","max","rless"}
local sBtns={}
for _,cat in ipairs(catOrder) do
    local cd=G.skillTreeUpgs[cat]; if not cd then continue end
    mkLbl(T6,"── "..cd.name.." ──",nil,UDim2.new(1,0,0,17),12,Color3.fromRGB(200,200,70))
    sBtns[cat]={}
    for idx,u in ipairs(cd.upgrades) do
        local isQP=(cat=="rless" or cat=="max")
        local btn=mkBtn(T6,u.id..": "..u.name.."\n"..u.desc.."\nCost: "..tostring(u.cost)..(isQP and " QP" or " TP"),nil,UDim2.new(1,0,0,52))
        btn.Visible=false
        btn.MouseButton1Click:Connect(function() buySTUpg(cat,idx) end)
        sBtns[cat][idx]=btn
    end
    addSep(T6)
end
local bRespec=mkBtn(T6,"Respec Skill Tree\n(-2 Rebirths, reset diamonds)",nil,UDim2.new(1,0,0,40),Color3.fromRGB(140,20,20))
bRespec.Visible=false
bRespec.MouseButton1Click:Connect(function() respecST(); deleteAllOrbs(); buildBoard() end)

-- ── TAB 7: RARITY LIST ──────────────────────────────────────
local T7=tabFrames[7]
mkLbl(T7,"📋 RARITY INDEX",nil,UDim2.new(1,0,0,20),15)
local rEntries={}
for i=1,#rarityNames do
    local e=Instance.new("Frame")
    e.Size=UDim2.new(1,0,0,38); e.BackgroundColor3=rarityColors[i] or Color3.fromRGB(180,180,180)
    e.BackgroundTransparency=0.55; e.BorderSizePixel=0; e.Name="R"..i; e.Parent=T7
    local ec=Instance.new("UICorner"); ec.CornerRadius=UDim.new(0,4); ec.Parent=e
    local el=mkLbl(e,rarityNames[i].." | ID:"..i.."\n$"..format(rarityValues[i]).." • 1/"..format(rarities[i]).." • Obtained: 0",UDim2.new(0,4,0,2),UDim2.new(1,-8,1,-4),10)
    el.Name="L"; rEntries[i]=e
end
local lRU=mkLbl(T7,"Unlocked 0 rarities.",nil,UDim2.new(1,0,0,18),12,Color3.fromRGB(200,200,200))

-- ── TAB 8: SETTINGS ─────────────────────────────────────────
local T8=tabFrames[8]
mkLbl(T8,"⚙ SETTINGS",nil,UDim2.new(1,0,0,20),15)
local bSave=mkBtn(T8,"Save Game",nil,UDim2.new(1,0,0,34),Color3.fromRGB(25,90,45))
local bLoad=mkBtn(T8,"Load Game",nil,UDim2.new(1,0,0,34),Color3.fromRGB(25,45,110))
local bReset=mkBtn(T8,"Hard Reset (lose everything!)",nil,UDim2.new(1,0,0,34),Color3.fromRGB(140,18,18))
addSep(T8)
local lTI2=mkLbl(T8,"Time: 0:00:00 | Best Luck: x1",nil,UDim2.new(1,0,0,50),11,Color3.fromRGB(190,190,190))
local diffs={"baby","easy","orig","hard","extreme"}; local dIdx=3
local bDiff=mkBtn(T8,"Difficulty: orig",nil,UDim2.new(1,0,0,34))
bSave.MouseButton1Click:Connect(saveGame)
bLoad.MouseButton1Click:Connect(function() loadGame(); buildBoard(); startAllSpawners() end)
bReset.MouseButton1Click:Connect(function() resetGame(); deleteAllOrbs(); buildBoard(); startAllSpawners() end)
bDiff.MouseButton1Click:Connect(function()
    if G.rebirths>0 then return end
    dIdx=(dIdx%#diffs)+1; local d=diffs[dIdx]; G.difficulty=d
    G.rebBaseCost=d=="orig" and 4000 or d=="hard" and 10000 or d=="extreme" and 25000 or 2000
    G.rebScaling=d=="easy" and 3.46 or d=="baby" and 3.37 or d=="hard" and 3.53 or d=="extreme" and 3.56 or 3.5
    bDiff.Text="Difficulty: "..d
end)

-- ============================================================
-- GUI UPDATE
-- ============================================================
local function updateGUI()
    recalcLuck(); updateWeatherBoosts(); updateWeatherStats()
    local g=G
    local mm=g.moneyMultiplier*(g.boostTimes[1]>0 and 2 or 1)*g.weatherMoney
    if g.mechanicsUnlocked>=3 then mm=mm*(1.06^(g.highestRarity or 0)) end
    if g.tiers>=1 then mm=mm*(1.05^getSTUpAmt("MN-1")) end
    if g.mechanicsUnlocked>=5 then mm=mm*g.weatherMult[2] end

    lMoney.Text="Money: $"..format(g.money)
    lMult.Text="Money Mult: x"..format(mm,2)
    lLuck.Text="Luck: x"..format(g.totalLuck,2)
    lDia.Text="Diamonds: "..format(math.floor(g.diamonds)).." | DiaChance: "..format(g.diamondChance*100,2).."%"
    lOrbs.Text="Orbs: "..orbCount.." / "..(g.spawnCap or 100)

    -- Info tab
    bIncMult.Text="Increase Money Mult\nx"..format(g.moneyMultiplier,2)..">>x"..format(g.moneyMultiplier*1.15,2).."\n$"..format(g.upgradeCosts[1])
    bIncLuck.Text="Increase Base Luck\nx"..format(g.baseLuck,2)..">>x"..format(g.baseLuck*1.2,2).."\n$"..format(g.upgradeCosts[2])
    bIncDia.Text="Increase Diamond Chance\n"..format(g.diamondChance*100,2).."% >> "..format((g.diamondChance+0.001)*100,2).."%\n$"..format(g.upgradeCosts[3])
    bDiaL.Text="Multiply Luck (keep Tier)\nx"..format(g.diamondLuck,2)..">>x"..format(g.diamondLuck*1.1,2).."\n"..format(g.newUpgCosts[1]).." Diamonds"
    bDiaL.Visible=(g.rebirths>=25 and g.tiers>=1)
    bUlkReb.Visible=(g.mechanicsUnlocked==0)
    bUlkBoost.Visible=(g.mechanicsUnlocked==1)
    bUlkRBM.Visible=(g.mechanicsUnlocked==2)
    bUlkTier.Visible=(g.mechanicsUnlocked==3)
    bUlkWeath.Visible=(g.mechanicsUnlocked==4)

    -- Spawners tab
    for s=1,7 do
        local sb2=spBtns[s]
        local unlocked=g.spawnersUnlocked>=s
        sb2.bI.Visible=unlocked; sb2.bL.Visible=unlocked
        sb2.lI.Text="Interval: "..string.format("%.3f",g.spawnIntervals[s]).."|s"
        sb2.lL.Text="Luck: x"..format(g.totalLuck*(g.spawnerLuck[s] or 1),2)
        local ic=s<=3 and g.upgradeCosts[2+s] or g.upgradeCosts[1+2*s]
        local lc=s<=3 and g.upgradeCosts[5+s] or g.upgradeCosts[2+2*s]
        sb2.bI.Text="Decrease Interval\n"..string.format("%.3f",g.spawnIntervals[s]).."s>>"..string.format("%.3f",math.max(g.spawnIntervals[s]*0.95,0.1)).."s\n$"..format(ic)
        sb2.bL.Text="Increase Luck\nx"..format(g.spawnerLuck[s],2)..">>x"..format(g.spawnerLuck[s]*1.1,2).."\n$"..format(lc)
        sb2.bB.Visible=(not unlocked and g.spawnersUnlocked==s-1 and s>1 and s<=5)
    end

    -- Rebirth tab
    lMB.Text=g.boostTimes[1]>0 and ("2x Money - "..math.floor(g.boostTimes[1]/60)..":"..string.format("%02d",g.boostTimes[1]%60)) or "2x Money - Inactive"
    lMB.TextColor3=g.boostTimes[1]>0 and Color3.fromRGB(100,255,100) or Color3.fromRGB(150,150,150)
    lLB.Text=g.boostTimes[2]>0 and ("2x Luck - "..math.floor(g.boostTimes[2]/60)..":"..string.format("%02d",g.boostTimes[2]%60)) or "2x Luck - Inactive"
    lLB.TextColor3=g.boostTimes[2]>0 and Color3.fromRGB(100,255,100) or Color3.fromRGB(150,150,150)
    lDB.Text="Duplicate CD: "..g.boostTimes[3].."s"
    local vis=g.mechanicsUnlocked>=2
    for i=1,5 do bBt[i].Visible=vis end
    bBt[6].Visible=(getSTUpAmt("BST-3")>0)
    for i=1,6 do
        if bBt[i].Visible then
            local costs={
                "2x Money 1m\n"..getBoostCost(1).." Diamonds",
                "2x Money 5m\n"..getBoostCost(2).." Diamonds",
                "2x Luck 1m\n"..getBoostCost(3).." Diamonds",
                "2x Luck 5m\n"..getBoostCost(4).." Diamonds",
                "Duplicate Orbs!\n"..getBoostCost(5).." Diamonds",
                "Remove Obstacles 45s\n"..getBoostCost(6).." Diamonds",
            }
            bBt[i].Text=costs[i]
        end
    end
    local rc=g.rebScaling^g.rebirths*g.rebBaseCost
    lRI.Text="Rebirths: "..format(g.rebirths).."\nRebirth Luck: x"..format(2^g.rebirths,2)
    bReb.Text="Rebirth\n$"..format(rc).."\nLuck x"..format(2^g.rebirths,2)..">>x"..format(2^(g.rebirths+1),2)
    lAP.Text="Automation Points: "..format(g.automationpts)
    for i=1,4 do
        bAt[i].Visible=(g.tiers>=2)
        if g.tiers>=2 then
            local costs={1000,2500,500000,700000}
            local c=costs[i]
            if i<=2 then c=math.floor(costs[i]*(g.automation.scales[i]^g.automation.levels[i])) end
            bAt[i].Text="AUTO-"..i.." | Level:"..g.automation.levels[i].."\nCost: "..format(c).." AP"
        end
    end

    -- Tier tab
    if g.tiers<MAX_TIER then
        lTI.Text="Tier "..g.tiers..">>"..(g.tiers+1).." | Luck x"..(3^g.tiers)..">>x"..(3^(g.tiers+1)).." | Money x"..(2^g.tiers)..">>x"..(2^(g.tiers+1))
    else lTI.Text="Tier "..g.tiers.." (MAXED)" end
    bTier.Visible=(g.mechanicsUnlocked>=4)
    if g.tiers==0 then bTier.Text="Tier Up\n50 Void Orbs [ID 14]"
    elseif g.tiers==1 then bTier.Text="Tier Up\n10 Forsaken Orbs [ID 21]"
    elseif g.tiers==2 then bTier.Text="Tier Up\n5 Fusion Orbs [ID 30]"
    else bTier.Text="Tier Up (Maxed)" end
    recalcPoints()
    lTPD.Text="TP: "..g.currentTP.."/"..g.maxTP.." | QP: "..(g.currentQP or 0).."/"..(g.maxQP or 0)
    local e=g.extUpgCosts
    bTP[1].Text="1 TP | $"..format(e[1]); bTP[2].Text="1 TP | "..format(e[2]).." Diamonds"
    bTP[3].Text="1 TP | "..format(e[3]).." Weather Rolled"; bTP[4].Text="1 TP | "..format(e[4]).." Orbs"
    local tpVis=g.mechanicsUnlocked>=5
    bTP[1].Visible=tpVis; bTP[2].Visible=tpVis
    bTP[3].Visible=(tpVis and g.maxTP>=7); bTP[4].Visible=(tpVis and g.maxTP>=14)

    -- Weather tab
    local wc=G.weatherChance or 0
    lWS.Text="WP: "..format(g.weatherpts).." | Chance: 1/"..format(wc>0 and 1/wc or math.huge,0,true)
    lWB.Text="Boost: x"..format(g.weatherMult[1],2).." Luck, x"..format(g.weatherMult[2],2).." Money, x"..format(g.weatherMult[3],2).." Diamonds"
    lWP.Text="Power: "..format(g.weatherPower).." | +"..string.format("%.1f",10*math.log(g.weatherPower+1)/math.log(2)).."% Chance"
    bRW.Text=g.weatherRollCooldown>0 and ("Cooldown: "..g.weatherRollCooldown.."s") or "Roll Weather!\n"..math.floor(g.weatherUpCosts[1]+0.5).." WP"
    bNW.Text=g.weatherUnlocked>=9 and "Unlock Weather (Maxed)" or "Unlock Weather\n"..math.floor(g.weatherUpCosts[2]+0.5).." WP ("..g.weatherUnlocked.." unlocked)"
    bWPM.Text="Multiply Money (Resets on Tier)\nx"..format(g.weatherMoney,2)..">>x"..format(g.weatherMoney*1.1,2).."\n"..format(g.weatherUpCosts[3]).." WP"
    local wlog=""
    for i=1,g.weatherUnlocked do
        if (g.weatherDuration[i] or 0)>0 then wlog=wlog..weatherNames[i]..": "..g.weatherDuration[i].."s\n" end
    end
    lWLog.Text=wlog~="" and wlog or "No weather active."

    -- Skill tree tab
    lSTP.Text="TP: "..g.currentTP.."/"..g.maxTP.." | QP: "..(g.currentQP or 0).."/"..(g.maxQP or 0)
    for _,cat in ipairs(catOrder) do
        local cd=g.skillTreeUpgs[cat]; if not cd or not sBtns[cat] then continue end
        for idx,u in ipairs(cd.upgrades) do
            local btn=sBtns[cat][idx]; if not btn then continue end
            btn.Visible=(g.tiers>=1)
            if g.tiers>=1 then
                local lv=cd.bought[idx] or 0
                local isQP=(cat=="rless" or cat=="max")
                local maxed=(u.infinite and false) or (u.max and lv>=u.max) or (u.levels and lv>=#u.levels) or (not u.infinite and not u.max and not u.levels and lv>0)
                local locked=not checkReqs(u.req)
                local c=u.costs and (u.costs[lv+1] or u.cost) or u.cost
                if u.infinite then c=u.cost*(2^lv) end
                local st=maxed and "(BOUGHT)" or locked and "(LOCKED)" or "Cost: "..tostring(c)..(isQP and " QP" or " TP")
                btn.Text=u.id..": "..u.name.."\n"..u.desc.."\n"..st.." | Lv: "..lv
                btn.BackgroundColor3=maxed and Color3.fromRGB(35,80,35) or locked and Color3.fromRGB(55,25,25) or Color3.fromRGB(55,55,90)
            end
        end
    end
    bRespec.Visible=(g.tiers>=1)

    -- Rarity tab
    for i=1,#rarityNames do
        local e=rEntries[i]; if not e then continue end
        local obtained=g.orbsObtained[i] or 0
        local mv=rarityValues[i]*mm
        local el=e:FindFirstChild("L")
        if el then el.Text=rarityNames[i].." | ID:"..i.."\n$"..format(mv).." • 1/"..format(rarities[i]).." • Obtained: "..obtained end
        e.Visible=(i<=(g.highestRarity or 0)+3)
    end
    lRU.Text="Unlocked "..(g.highestRarity or 0).." rarities."
    if g.mechanicsUnlocked>=3 then
        lRU.Text=lRU.Text.." | Money boost: x"..string.format("%.2f",1.06^(g.highestRarity or 0))
    end

    -- Settings tab
    lTI2.Text="Time: "..formatTime(g.timePlayed).." | Best Luck: x"..format(g.bestLuck,2).."\nTotal Orbs: "..format(g.ttlOrbSpawn).." | Weather Rolled: "..format(g.weatherRolled)
end

-- ============================================================
-- TICK (per second)
-- ============================================================
local function tickSec()
    local g=G
    for i=1,4 do if g.boostTimes[i]>0 then g.boostTimes[i]=g.boostTimes[i]-1 end end
    for i=1,#g.weatherDuration do if (g.weatherDuration[i] or 0)>0 then g.weatherDuration[i]=g.weatherDuration[i]-1 end end
    if (g.weatherRollCooldown or 0)>0 then g.weatherRollCooldown=g.weatherRollCooldown-1 end
    updateWeatherBoosts()
    g.timePlayed=(g.timePlayed or 0)+1
    g.timeSpentinTier=(g.timeSpentinTier or 0)+1
    g.timeSpentinReb=(g.timeSpentinReb or 0)+1
    if getSTUpAmt("BST-4")>=1 then
        if g.boostTimes[1]==0 then doBuyBoost(1) end
        if g.boostTimes[2]==0 then doBuyBoost(3) end
    end
    updateWeatherStats()
end

local function tickAuto()
    local g=G
    for i=1,2 do
        local en=g.automation.enabled and g.automation.enabled[i]
        if (g.automation.levels[i] or 0)>0 and en then
            local mt=60*(0.95^g.automation.levels[i])
            if (g.automation.timers[i] or 0)<=0 then
                doAutomation(i); g.automation.timers[i]=mt
            else g.automation.timers[i]=g.automation.timers[i]-0.1 end
        end
    end
end

-- ============================================================
-- STARTUP
-- ============================================================
local function setupCamera()
    local camera = workspace.CurrentCamera
    camera.CameraType = Enum.CameraType.Scriptable
    camera.CFrame = CFrame.new(BO.X, BO.Y, BO.Z + 80)
    RunService.RenderStepped:Connect(function()
        camera.CameraType = Enum.CameraType.Scriptable
        camera.CFrame = CFrame.new(BO.X, BO.Y, BO.Z + 80)
    end)
end

local function setupPlayerCharacter()
    local function hideChar(char)
        task.wait(0.1)
        local hrp = char:WaitForChild("HumanoidRootPart", 5)
        if hrp then
            hrp.Anchored = true
            hrp.CFrame = CFrame.new(0, -100, 0)
        end
        for _, part in ipairs(char:GetChildren()) do
            if part:IsA("BasePart") then
                part.Transparency = 1
            elseif part:IsA("Accessory") then
                local handle = part:FindFirstChild("Handle")
                if handle then handle.Transparency = 1 end
            end
        end
    end
    if player.Character then
        hideChar(player.Character)
    end
    player.CharacterAdded:Connect(hideChar)
end

setupCamera()
setupPlayerCharacter()
buildBoard()
loadGame()
buildBoard() -- rebuild after potential tier load
startAllSpawners()

local lastSec,lastGUI,lastSave=0,0,0
RunService.Heartbeat:Connect(function()
    local now=tick()
    if now-lastSec>=1 then lastSec=now; tickSec() end
    if now-lastGUI>=0.1 then lastGUI=now; updateGUI(); tickAuto(); checkOrbs() end
    if now-lastSave>=5 then lastSave=now; saveGame() end
end)

--[[
    ─────────────────────────────────────────────────
    PORTING NOTES
    ─────────────────────────────────────────────────
    Physics:    Matter.js 2D → Roblox 3D Part spheres
    Rendering:  HTML Canvas → BillboardGui labels +
                Part.Material=Neon for variant effects
    Save:       localStorage → DataStoreService JSON
    UI:         HTML/CSS panels → ScreenGui 8-tab system
    Audio:      Upload Upgrade.mp3 as Roblox Audio asset
                and call Sound:Play() on purchase events
    Analytics:  Google Analytics removed (not applicable)
    ─────────────────────────────────────────────────
--]]
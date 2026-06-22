--[[
    Super Rarity Orbs - Roblox Server Save/Load Handler
    Place in a Script inside ServerScriptService.
]]

local DataStoreService = game:GetService("DataStoreService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local HttpService      = game:GetService("HttpService")

local DS = nil
local successDS, errDS = pcall(function()
    DS = DataStoreService:GetDataStore("SRO_v1")
end)

if not successDS then
    warn("Failed to initialize DataStore: " .. tostring(errDS))
end

-- Create Network Event folder dynamically in ReplicatedStorage
local networkFolder = ReplicatedStorage:FindFirstChild("SRO_Network")
if not networkFolder then
    networkFolder = Instance.new("Folder")
    networkFolder.Name = "SRO_Network"
    networkFolder.Parent = ReplicatedStorage
end

local saveEvent = networkFolder:FindFirstChild("SaveData")
if not saveEvent then
    saveEvent = Instance.new("RemoteEvent")
    saveEvent.Name = "SaveData"
    saveEvent.Parent = networkFolder
end

local reqLoadEvent = networkFolder:FindFirstChild("RequestLoadData")
if not reqLoadEvent then
    reqLoadEvent = Instance.new("RemoteEvent")
    reqLoadEvent.Name = "RequestLoadData"
    reqLoadEvent.Parent = networkFolder
end

local loadEvent = networkFolder:FindFirstChild("LoadData")
if not loadEvent then
    loadEvent = Instance.new("RemoteEvent")
    loadEvent.Name = "LoadData"
    loadEvent.Parent = networkFolder
end

-- Save Handler (saves client's serialized state)
saveEvent.OnServerEvent:Connect(function(player, clientState)
    if not DS then return end
    if type(clientState) ~= "table" then return end
    
    local key = "Player_" .. player.UserId
    local success, err = pcall(function()
        local dataString = HttpService:JSONEncode(clientState)
        DS:SetAsync(key, dataString)
    end)
    if not success then
        warn("Failed to save data for player " .. player.Name .. ": " .. tostring(err))
    end
end)

-- Load Handler (loads data and fires back to client)
reqLoadEvent.OnServerEvent:Connect(function(player)
    if not DS then 
        warn("Cannot load: DataStore not initialized.")
        return 
    end
    
    local key = "Player_" .. player.UserId
    local success, data = pcall(function()
        return DS:GetAsync(key)
    end)
    
    if success and data and type(data) == "string" then
        local successDec, decoded = pcall(function()
            return HttpService:JSONDecode(data)
        end)
        if successDec and decoded then
            loadEvent:FireClient(player, decoded)
        else
            warn("Failed to decode data for player " .. player.Name)
        end
    elseif not success then
        warn("Failed to read DataStore for player " .. player.Name)
    end
end)

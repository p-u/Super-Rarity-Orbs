// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    Composite = Matter.Composite;

// create an engine
var engine = Engine.create();
world = engine.world;

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 400,
        height: 800,
        wireframes: false,
        background: 'linear-gradient(#111144, #331144)',
    }
});

var ground, ceiling, wall1, wall2;
var pegs, pegs2, pegs3, pegs4, pegs5, funnelL, funnelR, upgradedPegs;

function buildBoard() {
    // Clear current world to prepare for new board
    Composite.clear(engine.world, true);

    var ground = Bodies.rectangle(200, 825, 410, 60, { isStatic: true });
    var ceiling = Bodies.rectangle(200, -10, 410, 60, { isStatic: true });
    var wall1 = Bodies.rectangle(410, 400, 60, 800, { isStatic: true });
    var wall2 = Bodies.rectangle(-10, 400, 60, 800, { isStatic: true });
    
    let boardElements = [ground, ceiling, wall1, wall2];

    if (game.tiers == 0) { // Board 1
        pegs = Composites.stack(10, 220, 5, 6, 66, 80, (x, y) => Bodies.circle(x, y, 12, { isStatic: true, render: { fillStyle: '#6a6a6aff' } }));
        pegs2 = Composites.stack(54, 167, 4, 6, 66, 80, (x, y) => Bodies.circle(x, y, 12, { isStatic: true, render: { fillStyle: '#6a6a6aff' } }));
        pegs3 = Composites.stack(54, 775, 4, 1, 66, 80, (x, y) => Bodies.circle(x, y, 12, { isStatic: true, render: { fillStyle: '#6a6a6aff' }  })); 
        boardElements.push(pegs, pegs2, pegs3);
    } else {
        // Board 2 (1 Prestige, later)
        funnelL = Bodies.rectangle(80, 125, 200, 20, { isStatic: true, angle: Math.PI / 4 });
        funnelR = Bodies.rectangle(320, 125, 200, 20, { isStatic: true, angle: -Math.PI / 4 });
        deflectorBall = Bodies.circle(200, 267, 25, { 
            isStatic: true, 
            restitution: 1.2, 
            render: { fillStyle: '#8e8e8eff' } 
        });
        pegs4 = Composites.stack(10, 325, 5, 4, 66, 100, (x, y) => Bodies.circle(x, y, 12, { isStatic: true, render: { fillStyle: '#6a6a6aff' } }));
        pegs5 = Composites.stack(54, 385, 5, 4, 66, 100, (x, y) => Bodies.circle(x, y, 12, { isStatic: true, render: { fillStyle: '#6a6a6aff' } }));
        boardElements.push(funnelL, funnelR, pegs4, pegs5, deflectorBall);
    }
    const finalElements = boardElements.filter(item => item != null);
    Composite.add(engine.world, finalElements);
}
buildBoard();

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create({ fps: 60 });

// run the engine
Runner.run(runner, engine);

function createBox() {
    var box = Bodies.rectangle(200, 200, 80, 80);
    Composite.add(engine.world, [box]);
}

function createOrb(spawner) {
    if (Math.random() < game.diamondChance) {createDiamond(); return}
    let chosenRarity = getRarity(spawner);
    if (game.highestRarity < chosenRarity) {
        game.highestRarity = chosenRarity;
        updateRarityList();
    }
    var circle = Bodies.circle(Math.random() * 300 + 50, 30, raritySizes[chosenRarity - 1], { category: 'ball', rarity: chosenRarity, restitution: 0.9, render: {
        //strokeStyle: 'white',
        //fillStyle: rarityColours[chosenRarity - 1],
        sprite: {
            texture: "img/ball" + chosenRarity + ".png",
            xScale: 0.025 * raritySizes[chosenRarity - 1],
            yScale: 0.025 * raritySizes[chosenRarity - 1],
        }
    }});
    Composite.add(engine.world, [circle]);
    currentOrbs = countOrbs()
}

function countOrbs() {
    var bodies = Composite.allBodies(engine.world);
    var count = 0;
    for (var i = 0; i < bodies.length; i++) {
        if (bodies[i].category === 'ball') {
            count++;
        }
    }
    return count;
}

function createDiamond() {
    var circle = Bodies.circle(Math.random() * 300 + 50, 30, 15, { category: 'diamond', restitution: 0.6, render: {
        //strokeStyle: 'white',
        //fillStyle: rarityColours[chosenRarity - 1],
        sprite: {
            texture: "img/diamond.png",
            xScale: 0.052,
            yScale: 0.052,
        }
    }});
    Composite.add(engine.world, [circle]);
}

function checkCollisions() {
    var bodies = Composite.allBodies(engine.world);
    for (var i = 0; i < bodies.length; i++) {
        let slotMultiplier = 1;
        if (game.tiers < 1) {
            if (bodies[i].position.x < 66) {slotMultiplier = 2;}
            else if (bodies[i].position.x > 155 && bodies[i].position.x < 244) {slotMultiplier = 1.5;}
            else if (bodies[i].position.x > 333) {slotMultiplier = 2;}
        } else {
            if (bodies[i].position.x > 155 && bodies[i].position.x < 244) {slotMultiplier = 7;}     
        }
        if (bodies[i].category === 'ball' && bodies[i].position.y > 775) {
            let moneyGain = rarityValues[bodies[i].rarity - 1] * game.moneyMultiplier * slotMultiplier * (game.boostTimes[0] ? 2 : 1);
            if (game.mechanicsUnlocked >= 3) {
                moneyGain *= (1.06**game.highestRarity)
            }
            game.orbsObtained[bodies[i].rarity - 1] += 1
            game.money += moneyGain
            updateText()
            updateVisuals()
            Composite.remove(engine.world, bodies[i]);
            currentOrbs = countOrbs()
        }
        else if (bodies[i].category === 'diamond' && bodies[i].position.y > 775) {
            game.diamonds += 10 * slotMultiplier;
            updateText()
            updateVisuals()
            Composite.remove(engine.world, bodies[i]);
            currentOrbs = countOrbs()
        }
    }
}

setInterval(checkCollisions, 30);

function duplicateOrbs() {
    var bodies = Composite.allBodies(engine.world);
    for (var i = 0; i < bodies.length; i++) {
        if (bodies[i].category === 'ball') {
            //Create a new orb with the same rarity
            let chosenRarity = bodies[i].rarity;
            var circle = Bodies.circle(bodies[i].position.x, bodies[i].position.y, raritySizes[chosenRarity - 1], { category: 'ball', rarity: chosenRarity, restitution: 0.9, render: {
                sprite: {
                    texture: "img/ball" + chosenRarity + ".png",
                    xScale: 0.025 * raritySizes[chosenRarity - 1],
                    yScale: 0.025 * raritySizes[chosenRarity - 1],
                }
            }});
            Composite.add(engine.world, [circle]);
            currentOrbs = countOrbs()
        }
        else if (bodies[i].category === 'diamond') {
            var circle = Bodies.circle(bodies[i].position.x, bodies[i].position.y, 15, { category: 'diamond', restitution: 0.6, render: {
                sprite: {
                    texture: "img/diamond.png",
                    xScale: 0.052,
                    yScale: 0.052,
                }
            }});
            Composite.add(engine.world, [circle]);
            currentOrbs = countOrbs()
        }
    }
}

function deleteAllOrbs() {
    var bodies = Composite.allBodies(engine.world);
    for (var i = 0; i < bodies.length; i++) {
        if (bodies[i].category === 'ball' || bodies[i].category === 'diamond') {
            Composite.remove(engine.world, bodies[i]);
        }
    }
    currentOrbs = countOrbs()
}
// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    Composite = Matter.Composite,
    Events = Matter.Events;

// create an engine
var engine = Engine.create();
world = engine.world;

// create a renderer
var render = Render.create({
    element: document.getElementById('field'),
    engine: engine,
    options: {
        width: 400,
        height: 800,
        wireframes: false,
        background: 'linear-gradient(#111144, #331144)',
    }
});

var ground, ceiling, wall1, wall2;
var pegs, pegs2, pegs3, pegs4, pegs5, funnelL, funnelR, funnel2L, funnel2R, funnel3L, funnel3R, funnel4L, funnel4R, funnel5L, funnel5R, funnel6L, funnel6R, upgradedPegs;

function buildBoard() {
    // Save current orbs
    let currentBodies = Composite.allBodies(engine.world);
    let savedOrbs = currentBodies.filter(b => b.category === 'ball' || b.category === 'diamond' || b.category === 'weather');
    Composite.clear(engine.world, false);

    var ground = Bodies.rectangle(200, 825, 410, 60, { isStatic: true });
    var ceiling = Bodies.rectangle(200, -10, 410, 60, { isStatic: true });
    var wall1 = Bodies.rectangle(410, 400, 60, 800, { isStatic: true });
    var wall2 = Bodies.rectangle(-10, 400, 60, 800, { isStatic: true });
    
    let boardElements = [ground, ceiling, wall1, wall2];
    funnelL = Bodies.rectangle(80, 125, 200, 20, { isStatic: true, angle: Math.PI / 4 });
    funnelR = Bodies.rectangle(320, 125, 200, 20, { isStatic: true, angle: -Math.PI / 4 });
    pegs3 = Composites.stack(60, 775, 4, 1, 66, 80, (x, y) => Bodies.circle(x, y, 10.5, { isStatic: true, render: { fillStyle: '#6a6a6aff' }  })); 

    if (game.tiers == 0) { // Board 1
        let rows = game.boostTimes[3] > 15 ? 4 : 6;
        pegs = Composites.stack(10, 220, 5, rows, 66, 80, (x, y) => Bodies.circle(x, y, 12, { isStatic: true, render: { fillStyle: '#6a6a6aff' } }));
        pegs2 = Composites.stack(54, 167, 4, rows, 66, 80, (x, y) => Bodies.circle(x, y, 12, { isStatic: true, render: { fillStyle: '#6a6a6aff' } }));
        boardElements.push(pegs, pegs2, pegs3);
    } else if (game.tiers == 1) {
        // Board 2
        deflectorBall = Bodies.circle(200, 267, 25, { 
            isStatic: true, 
            restitution: 1.2, 
            render: { fillStyle: '#8e8e8eff' } 
        });
        pegs4 = Composites.stack(10, 325, 5, 4, 66, 100, (x, y) => Bodies.circle(x, y, 12, { isStatic: true, render: { fillStyle: '#6a6a6aff' } }));
        pegs5 = Composites.stack(54, 385, 5, 4, 66, 100, (x, y) => Bodies.circle(x, y, 12, { isStatic: true, render: { fillStyle: '#6a6a6aff' } }));
        
        if (game.boostTimes[3] < 15) {
            boardElements.push(funnelL, funnelR);
        }
        boardElements.push(pegs4, pegs5, deflectorBall);
    } else if (game.tiers == 2) {
        // Board 3
        funnel2L = Bodies.rectangle(40, 300, 125, 15, { isStatic: true, angle: Math.PI / 3 });
        funnel2R = Bodies.rectangle(175, 300, 125, 15, { isStatic: true, angle: -Math.PI / 3 });
        funnel3L = Bodies.rectangle(230, 300, 125, 15, { isStatic: true, angle: Math.PI / 3 });
        funnel3R = Bodies.rectangle(360, 300, 125, 15, { isStatic: true, angle: -Math.PI / 3 });
        funnel4L = Bodies.rectangle(80, 450, 200, 20, { isStatic: true, angle: Math.PI / 4 });
        funnel4R = Bodies.rectangle(320, 450, 200, 20, { isStatic: true, angle: -Math.PI / 4 });
        funnel5L = Bodies.rectangle(40, 625, 125, 15, { isStatic: true, angle: Math.PI / 3 });
        funnel5R = Bodies.rectangle(175, 625, 125, 15, { isStatic: true, angle: -Math.PI / 3 });
        funnel6L = Bodies.rectangle(230, 625, 125, 15, { isStatic: true, angle: Math.PI / 3 });
        funnel6R = Bodies.rectangle(360, 625, 125, 15, { isStatic: true, angle: -Math.PI / 3 });
        
        boardElements.push(funnelL, funnelR);
        if (game.boostTimes[3] < 15) {
            boardElements.push(funnel2L, funnel2R, funnel3L, funnel3R, funnel4L, funnel4R);
        }
        boardElements.push(funnel5L, funnel5R, funnel6L, funnel6R);
    } else if (game.tiers == 3) {
        deflectorBall = Bodies.circle(200, 350, 25, { 
            isStatic: true, 
            restitution: 1.2, 
            render: { fillStyle: '#8e8e8eff' } 
        });
        innerL = Bodies.rectangle(66, 400, 175, 15, { isStatic: true, angle: -Math.PI / 2 });
        innerR = Bodies.rectangle(334, 400, 175, 15, { isStatic: true, angle: Math.PI / 2 });
        borderL = Bodies.rectangle(44, 495, 40, 15, { isStatic: true, angle: 0 });
        borderR = Bodies.rectangle(356, 495, 40, 15, { isStatic: true, angle: 0 });
        // if: game.tiers == 3, y val > 350-500 AND (x val >= 345 OR x val <= 55): x5 Multiplier.
        pegs2 = Composites.stack(140, 465, 2, 1, 66, 100, (x, y) => Bodies.circle(x, y, 10.5, { isStatic: true, render: { fillStyle: '#6a6a6aff' } }));
        pegs4 = Composites.stack(50, 585, 4, 2, 66, 100, (x, y) => Bodies.circle(x, y, 10.5, { isStatic: true, render: { fillStyle: '#6a6a6aff' } }));
        pegs5 = Composites.stack(15, 525, 5, 2, 66, 100, (x, y) => Bodies.circle(x, y, 10.5, { isStatic: true, render: { fillStyle: '#6a6a6aff' } }));
        
        boardElements.push(funnelL, funnelR, deflectorBall, borderL, borderR, pegs2, pegs3, pegs4, pegs5);
        if (game.boostTimes[3] < 15) {

        }
        boardElements.push(innerL, innerR);
    }
    const finalElements = boardElements.filter(item => item != null);
    Composite.add(engine.world, finalElements);
    
    if (savedOrbs.length > 0) {
        Composite.add(engine.world, savedOrbs);
    }
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
    if (currentOrbs >= 100 + getSTUpAmt("SPW-2") * 25) return;
    if (game.mechanicsUnlocked >= 5) {
        if (Math.random() < (game.diamondChance/250)) {createWeather(); return}
    }
    if (Math.random() < game.diamondChance) {createDiamond(); return}
    let chosenRarity = getRarity(spawner);
    if (game.highestRarity < chosenRarity) {
        game.highestRarity = chosenRarity;
        updateRarityList();
    }
    game.ttlOrbSpawn++;
    
    let variant = null;
    if (getSTUpAmt("SPW-3") > 0) {
        let mn4Level = getSTUpAmt("MN-4");
        let rand = Math.random();
        
        if (mn4Level >= 3 && rand < 0.001) {
            variant = "rainbow";
        } else if (rand < 0.01) {
            variant = "glowing";
        } else if (rand < ((0.01 * mn4Level) + 0.1)) {
            variant = "shiny";
        }
    }

    var circle = Bodies.circle(Math.random() * 300 + 50, 30, raritySizes[chosenRarity - 1], { 
        category: 'ball', 
        rarity: chosenRarity, 
        variant: variant,
        restitution: 0.9, 
        frictionStatic: 0,

        render: {
            sprite: {
                texture: "img/ball" + chosenRarity + ".png",
                xScale: 0.025 * raritySizes[chosenRarity - 1],
                yScale: 0.025 * raritySizes[chosenRarity - 1],
            }
        }
    });
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
    if (currentOrbs >= 100 + getSTUpAmt("SPW-2") * 25) return;
    let variant = null;
    if (getSTUpAmt("SPW-3") > 0) {
        let mn4Level = getSTUpAmt("MN-4");
        let rand = Math.random();
        
        if (mn4Level >= 3 && rand < 0.001) {
            variant = "rainbow";
        } else if (rand < 0.01) {
            variant = "glowing";
        } else if (rand < ((0.01 * mn4Level) + 0.1)) {
            variant = "shiny";
        }
    }
    var circle = Bodies.circle(Math.random() * 300 + 50, 30, 15, { category: 'diamond', restitution: 0.6, variant: variant, render: {
        sprite: {
            texture: "img/diamond.png",
            xScale: 0.052,
            yScale: 0.052,
        }
    }});
    Composite.add(engine.world, [circle]);
}
function createWeather() {
    if (currentOrbs >= 100 + getSTUpAmt("SPW-2") * 25) return;
    let variant = null;
    if (getSTUpAmt("SPW-3") > 0) {
        let mn4Level = getSTUpAmt("MN-4");
        let rand = Math.random();
        
        if (mn4Level >= 3 && rand < 0.001) {
            variant = "rainbow";
        } else if (rand < 0.01) {
            variant = "glowing";
        } else if (rand < ((0.01 * mn4Level) + 0.1)) {
            variant = "shiny";
        }
    }
    var circle = Bodies.circle(Math.random() * 300 + 50, 30, 15, { category: 'weather', restitution: 0.7, variant: variant, render: {
        sprite: {
            texture: "img/weather.png",
            xScale: 0.425,
            yScale: 0.425,
        }
    }});
    Composite.add(engine.world, [circle]);
}

function checkCollisions() {
    var bodies = Composite.allBodies(engine.world);
    for (var i = 0; i < bodies.length; i++) {
        let disappear = false;
        if (bodies[i].position.y > 775) disappear = true
        if (game.tiers == 3) {
            if (bodies[i].position.x <= 55 && bodies[i].position.y >= 460 && bodies[i].position.y <= 500) disappear = true
            if (bodies[i].position.x >= 345 && bodies[i].position.y >= 460 && bodies[i].position.y <= 500) disappear = true
        }
        let slotMultiplier = 1;
        if (game.tiers < 1) {
            if (bodies[i].position.x < 66) {slotMultiplier = 2;}
            else if (bodies[i].position.x > 155 && bodies[i].position.x < 244) {slotMultiplier = 1.5;}
            else if (bodies[i].position.x > 333) {slotMultiplier = 2;}
        } else if (game.tiers < 2) {
            if (bodies[i].position.x > 155 && bodies[i].position.x < 244) {slotMultiplier = 5;}     
        } else if (game.tiers < 3) {
            slotMultiplier = 2;
        } else {
            if (bodies[i].position.x <= 55 && bodies[i].position.y >= 450 && bodies[i].position.y <= 500) {slotMultiplier = 10;}
            if (bodies[i].position.x >= 345 && bodies[i].position.y >= 450 && bodies[i].position.y <= 500) {slotMultiplier = 10;}
            else if (bodies[i].position.x < 66) {slotMultiplier = 2.25;}
            else if (bodies[i].position.x > 155 && bodies[i].position.x < 244) {slotMultiplier = 2;}
            else if (bodies[i].position.x > 333) {slotMultiplier = 2.25;}
            else {slotMultiplier = 1.75;}
        }
        let variantMult = 1;
        if (bodies[i].variant === "shiny") variantMult = 2;
        else if (bodies[i].variant === "glowing") variantMult = 5;
        else if (bodies[i].variant === "rainbow") variantMult = 10;
        if (bodies[i].category === 'ball' && disappear) {
            let moneyGain = rarityValues[bodies[i].rarity - 1] * game.moneyMultiplier * game.weatherMoney * slotMultiplier * variantMult * (game.boostTimes[0] ? 2 : 1);
            if (game.mechanicsUnlocked >= 3) {
                moneyGain *= (1.06**game.highestRarity)
            }
            if (game.tiers >= 1) {
                moneyGain *= (1.05 ** getSTUpAmt("MN-1"))
            }
            game.orbsObtained[bodies[i].rarity - 1] += 1
            game.money += moneyGain
            updateText()
            updateVisuals()
            Composite.remove(engine.world, bodies[i]);
            currentOrbs = countOrbs()
        }
        else if (bodies[i].category === 'diamond' && disappear) {
            let mult = 1
            if (game.difficulty === "baby") {
                mult = 2
            }
            if (game.difficulty === "extreme") {
                mult = 0.5
            }
            if (game.rebirths >= 50) {
                mult *= (0.025 * game.rebirths) - 0.15
            }
            game.diamonds += 10 * game.diamondMult * variantMult;
            updateText()
            updateVisuals()
            Composite.remove(engine.world, bodies[i]);
            currentOrbs = countOrbs()
        }
        else if (bodies[i].category === 'weather' && disappear) {
            game.weatherpts += variantMult;
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
            let chosenRarity = bodies[i].rarity;
            let variant = bodies[i].variant;
            var circle = Bodies.circle(bodies[i].position.x, bodies[i].position.y, raritySizes[chosenRarity - 1], { 
                category: 'ball', 
                rarity: chosenRarity, 
                variant: variant,
                restitution: 0.9, 
                render: {
                    sprite: {
                        texture: "img/ball" + chosenRarity + ".png",
                        xScale: 0.025 * raritySizes[chosenRarity - 1],
                        yScale: 0.025 * raritySizes[chosenRarity - 1],
                    }
                }
            });
            Composite.add(engine.world, [circle]);
            currentOrbs = countOrbs()
        }
        else if (bodies[i].category === 'diamond') {
            var circle = Bodies.circle(bodies[i].position.x, bodies[i].position.y, 15, { 
                category: 'diamond', 
                restitution: 0.6, 
                variant: bodies[i].variant,
                render: {
                sprite: {
                    texture: "img/diamond.png",
                    xScale: 0.052,
                    yScale: 0.052,
                }
            }});
            Composite.add(engine.world, [circle]);
            currentOrbs = countOrbs()
        }
        else if (bodies[i].category === 'weather') {
            var circle = Bodies.circle(bodies[i].position.x, bodies[i].position.y, 15, { 
                category: 'weather', 
                restitution: 0.7, 
                variant: bodies[i].variant,
                render: {
                sprite: {
                    texture: "img/weather.png",
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
        if (bodies[i].category === 'ball' || bodies[i].category === 'diamond' || bodies[i].category === 'weather') {
            Composite.remove(engine.world, bodies[i]);
        }
    }
    currentOrbs = countOrbs()
}

Events.on(render, 'afterRender', function() {
    var context = render.context,
        bodies = Composite.allBodies(engine.world);

    for (var i = 0; i < bodies.length; i++) {
        var body = bodies[i];

        if (body.variant) {
            context.save();
            context.translate(body.position.x, body.position.y);
            context.rotate(body.angle);
            
            context.beginPath();
            let radius = (body.category === 'diamond' || body.category === 'weather' ? 15 : raritySizes[body.rarity - 1]) + 2;
            context.arc(0, 0, radius, 0, 2 * Math.PI);
            
            if (body.variant === "shiny") {
                let gradient = context.createRadialGradient(0, 0, radius * 0.5, 0, 0, radius * 1.5);
                gradient.addColorStop(0, "rgba(255, 255, 255, 0.33)");
                gradient.addColorStop(0.2, "rgba(255, 255, 150, 0.16)");
                gradient.addColorStop(1, "rgba(255, 255, 200, 0)");
                
                context.fillStyle = gradient;
                context.globalCompositeOperation = 'lighter';
                context.beginPath();
                context.arc(0, 0, radius * 2, 0, 2 * Math.PI);
                context.fill();
                context.fillStyle = "white";
                context.globalCompositeOperation = 'source-over';
            } else if (body.variant === "glowing") {
                let pulse = Math.sin(Date.now() / 300) * 5;
                context.globalCompositeOperation = 'lighter';
                
                context.shadowBlur = 25 + pulse;
                context.shadowColor = "rgba(0, 100, 255, 1)";
                context.strokeStyle = "rgba(0, 150, 255, 0.8)";
                context.lineWidth = 4;
                context.stroke();
                
                context.beginPath();
                context.arc(0, 0, radius + 5 + pulse, 0, 2 * Math.PI);
                context.strokeStyle = "rgba(0, 150, 255, 0.5)";
                context.lineWidth = 2;
                context.stroke();
                
                context.globalCompositeOperation = 'source-over';
            } else if (body.variant === "rainbow") {
                let hue = (Date.now() / 5) % 360;
                context.globalCompositeOperation =  'lighter';
                
                let innerGrad = context.createRadialGradient(0, 0, 0, 0, 0, radius);
                innerGrad.addColorStop(0, `hsla(${hue}, 100%, 80%, 0.5)`);
                innerGrad.addColorStop(0.5, `hsla(${(hue + 120) % 360}, 100%, 60%, 0.3)`);
                innerGrad.addColorStop(1, `hsla(${(hue + 240) % 360}, 100%, 50%, 0.1)`);
                context.fillStyle = innerGrad;
                context.beginPath();
                context.arc(0, 0, radius, 0, Math.PI * 2);
                context.fill();

                let outerGrad = context.createRadialGradient(0, 0, radius, 0, 0, radius * 2.5);
                outerGrad.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.4)`);
                outerGrad.addColorStop(0.5, `hsla(${(hue + 180) % 360}, 100%, 50%, 0.2)`);
                outerGrad.addColorStop(1, "transparent");
                context.fillStyle = outerGrad;
                context.beginPath();
                context.arc(0, 0, radius * 2.5, 0, Math.PI * 2);
                context.fill();
            }
            
            context.restore();
        }
    }
});


// prevent ball being stuck
let lastPos = new Map();
Events.on(engine, "afterUpdate", () => {
    const bodies = Composite.allBodies(engine.world);
    for (const body of bodies) {
        if (body.category !== 'ball' && body.category !== 'diamond' && body.category !== 'weather') continue;
        const prev = lastPos.get(body.id);
        if (prev) {
            const dx = body.position.x - prev.x;
            const dy = body.position.y - prev.y;
            if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05 && body.speed < 0.1) {
                Matter.Body.applyForce(body, body.position, {
                    x: (Math.random() - 0.5) * 0.00002,
                    y: -0.00002
                });
            }
        }
        lastPos.set(body.id, {
            x: body.position.x,
            y: body.position.y
        });
    }
});

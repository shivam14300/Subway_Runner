main();

var camx,camy,camz;
var texture;
var texture1;
var shaderProgram;
var programInfo;
var shade;

var railroad;
var walls;
var sph,cyl,cu;
var cn,jet_coin;
var trains;
var leg,body,head;
var dog_leg,dog_body,dog_head;
var police_leg,police_body,police_head;
var above_train;
var jets,fly_jet;
var brake;
var sneakers,jump_sneaker;

var score = 0;
var follow_cam;
var fwd_vel,initial_v;
var jumpit,jump_time;
var jetpack,jet_time;
var sneakerit,sneaker_time;
var moveit,move_time,prev_lane = 2;
var slow_time,slow_speed;
var sc;
var coin_sound;

function main() 
{
    sc = 0;
    slow_time = 0.0;
    slow_speed = 2;
    fwd_vel = 0.5;
    follow_cam = 0;
    jumpit = 0;
    jump_time = 0;
    above_train = 0;
    moveit = 0;
    jetpack = 0;
    sneakerit = 0;
    jet_time = 0;
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) 
    {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }
    
    shade = new shader(gl,0); 
    coin_sound = new Audio('./sound/coin.wav');
    objectInit(gl);

    shaderProgram = shade.initShaderProgram(gl);

    programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
          vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
          textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
          normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
          uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        },
    };

    var then = 0;

    function render(now) 
    {
        // if(slow_speed == 0)
        // {
        //     police_dog_position();
        //     alert('Game Over!');
        // }
        now *= 0.001;    // convert to seconds
        const deltaTime = now - then;
        then = now;
        drawScene(gl, programInfo, deltaTime);
        requestAnimationFrame(render);
        TickInput(gl);
        move_fwd();
        move_side();
        jump();
        collision();
        // console.log(body.pos[1]);
        camx = 0;camy = body.pos[1]+8;camz = body.pos[2]+35;
        for(var i=0;i<trains.length;i++)
        {
            trains[i].pos[2] += 1;
        }
        police_dog_position();
        game_generator();
        if(slow_speed != 0)
            sc += 1;

        document.getElementById('score').innerHTML = "score:" + sc;
        document.getElementById('coin').innerHTML = "coins:" + score;
        if(slow_speed == 0)
            document.getElementById('over').innerHTML = "Game Over";
    } 
    requestAnimationFrame(render);

}
function game_generator()
{
    for(var i=0;i<railroad.length;i++)
    {
        if(railroad[i].pos[2] - body.pos[2] > 15)
        {
            railroad[i].pos[2] -= 400;
        }
    }
    for(var i=0;i<walls.length;i++)
    {
        if(walls[i].pos[2] - body.pos[2] > 15)
        {
            walls[i].pos[2] -= 400;
        }
    }
    if(trains[0].pos[2] - body.pos[2] > 25)
    {
        var r = Math.random();
        if(r<0.33)
        {
            trains[0].pos[0] = -8.0;
            trains[0].pos[1] = 4.5;
            trains[0].pos[2] = body.pos[2] - 150;

            trains[1].pos[0] = 0.0;
            trains[1].pos[1] = 4.5;
            trains[1].pos[2] = body.pos[2] - 150;

        }
        else if(r>0.33 && r<0.66)
        {
            trains[0].pos[0] = -8.0;
            trains[0].pos[1] = 4.5;
            trains[0].pos[2] = body.pos[2] - 250;

            trains[1].pos[0] = 8.0;
            trains[1].pos[1] = 4.5;
            trains[1].pos[2] = body.pos[2] - 250;

        }
        else
        {
            trains[0].pos[0] = 8.0;
            trains[0].pos[1] = 4.5;
            trains[0].pos[2] = body.pos[2] - 250;

            trains[1].pos[0] = 0.0;
            trains[1].pos[1] = 4.5;
            trains[1].pos[2] = body.pos[2] - 250;

        }
    }
    r = Math.random();
    if(jets[0].pos[0] == 1000 && jets[0].pos[1] == 1000 && jets[0].pos[2] == 1000 && jetpack == 0)
    {
        if(r>0.2 && r<0.25)
        {
            jets[0].pos[0] = (prev_lane-2)*8;
            jets[0].pos[1] = body.pos[1];
            jets[0].pos[2] = body.pos[2] - 250;
        }
    }
    if(jets[0].pos[2] - body.pos[2] > 20)
    {
        jets[0].pos[0] = 1000;
        jets[0].pos[1] = 1000;
        jets[0].pos[2] = 1000;
    }

    r = Math.random();
    if(sneakers[0].pos[0] == 1000 && sneakers[0].pos[1] == 1000 && sneakers[0].pos[2] == 1000 && sneakerit == 0)
    {
        if(r>0.5 && r<0.55)
        {
            sneakers[0].pos[0] = (prev_lane-2)*8;
            sneakers[0].pos[1] = body.pos[1];
            sneakers[0].pos[2] = body.pos[2] - 100;
        }
    }
    if(sneakers[0].pos[2] - body.pos[2] > 20)
    {
        sneakers[0].pos[0] = 1000;
        sneakers[0].pos[1] = 1000;
        sneakers[0].pos[2] = 1000;
    }

    for(var i=0;i<brake.length;i++)
    {
        r = Math.random();
        if(brake[i].pos[0] == 1000 && brake[i].pos[1] == 1000 && brake[i].pos[2] == 1000)
        {
            if(r>0.8 && r<0.85)
            {
                brake[i].pos[0] = (prev_lane-2)*8;
                brake[i].pos[2] = body.pos[2] - 150;
                if(brake[i].flag == 0)brake[i].pos[1] = 2;
                if(brake[i].flag == 1)brake[i].pos[1] = 5;
            }
        }
        if(brake[i].pos[2] - body.pos[2] > 20)
        {
            brake[i].pos[0] = 1000;
            brake[i].pos[1] = 1000;
            brake[i].pos[2] = 1000;
        }
    }
    for(var i=0;i<cn.length;i++)
    {
        r = Math.random();
        var r1 = Math.random();
        if(cn[i].pos[0] == 1000 || cn[i].pos[2] - body.pos[2] > 15)
        {
            l = r;
            if(r>0.6 && r<0.7)
            {
                cn[i].pos[0] = (prev_lane-2)*8;
                cn[i].pos[1] = (prev_lane)*l*2;
                cn[i].pos[2] = body.pos[2] - r1*500;
            }
        }
    }
}
function collision()
{
    for(var i=0;i<cn.length;i++)
    {
        if(leg[0].pos[0]-cn[i].pos[0]>=-2.5&&leg[0].pos[0]-cn[i].pos[0]<=2.5&&leg[0].pos[1]-cn[i].pos[1]>=-4.5&&leg[0].pos[1]-cn[i].pos[1]<=4.5&&leg[0].pos[2]-cn[i].pos[2]>=-2.5&&leg[0].pos[2]-cn[i].pos[2]<=2.5)  
        {
            cn[i].pos[0] = 1000;
            cn[i].pos[1] = 1000;
            cn[i].pos[2] = 1000;
            score += 1;
            coin_sound.play();
        }
    }
    for(var i=0;i<jet_coin.length;i++)
    {
        if(leg[0].pos[0]-jet_coin[i].pos[0]>=-2.5&&leg[0].pos[0]-jet_coin[i].pos[0]<=2.5&&leg[0].pos[1]-jet_coin[i].pos[1]>=-2.5&&leg[0].pos[1]-jet_coin[i].pos[1]<=2.5&&leg[0].pos[2]-jet_coin[i].pos[2]>=-2.5&&leg[0].pos[2]-jet_coin[i].pos[2]<=2.5)  
        {
            jet_coin[i].pos[0] = 1000;
            jet_coin[i].pos[1] = 1000;
            jet_coin[i].pos[2] = 1000;
            score += 1;
            coin_sound.play();
        }
    }
    for(var i=0;i<trains.length;i++)
    {
        if(trains[i].pos[0]-body.pos[0]>=-3.5&&trains[i].pos[0]-body.pos[0]<=3.5&&trains[i].pos[2]-body.pos[2]>=(-trains[i].depth-1)&&trains[i].pos[2]-body.pos[2]<=(-trains[i].depth+1)&&trains[i].pos[1]-body.pos[1]>=-4.0&&trains[i].pos[1]-body.pos[1]<=4.0)
        {
            slow_speed = 0;
            break;
        }
    }
    for(var i=0;i<trains.length;i++)
    {
        if(trains[i].pos[0]-body.pos[0]>=3.8&&trains[i].pos[0]-body.pos[0]<=4.2&&trains[i].pos[2]-body.pos[2]>=(-trains[i].depth-1)&&trains[i].pos[2]-body.pos[2]<=+1&&trains[i].pos[1]-body.pos[1]>=-4.0&&trains[i].pos[1]-body.pos[1]<=4.0)
        {
            // console.log('bt');
            if(slow_speed == 2)
            {
                slow_speed = 1;
                slow_time = 10.0;
                for(var i=0;i<leg.length;i++)
                {
                    leg[i].rot = 1;
                }
                prev_lane += 1;
                moveit = -1;
                break;
            }
            else
            {
                slow_speed = 0;
                break;
            }
        }
    }
    for(var i=0;i<trains.length;i++)
    {
        if(trains[i].pos[0]-body.pos[0]>=-4.2&&trains[i].pos[0]-body.pos[0]<=-3.8&&trains[i].pos[2]-body.pos[2]>=(-trains[i].depth-1)&&trains[i].pos[2]-body.pos[2]<=+1&&trains[i].pos[1]-body.pos[1]>=-4.0&&trains[i].pos[1]-body.pos[1]<=4.0)
        {
            // console.log('bt');
            if(slow_speed == 2)
            {
                slow_speed = 1;
                slow_time = 10.0;
                for(var i=0;i<leg.length;i++)
                {
                    leg[i].rot = 1;
                }
                prev_lane -= 1;
                moveit = 1;
                break;
            }
            else
            {
                slow_speed = 0;
                break;
            }
        }
    }

    for(var i=0;i<jets.length;i++)
    {
        if(jets[i].pos[0]-body.pos[0]>=-2&&jets[i].pos[0]-body.pos[0]<=2 && jets[i].pos[2] - body.pos[2] >= -3 && jets[i].pos[2] - body.pos[2] <= 3 && jets[i].pos[1] - body.pos[1] <= 5 && jets[i].pos[1] - body.pos[1] >= -5)
        {
            jetpack = 1;
            jet_time = 6.0;
            jets[i].pos[0] = 1000;
            jets[i].pos[1] = 1000;
            jets[i].pos[2] = 1000;
            for(var j=0;j<jet_coin.length;j++)
            {
                var r = Math.random();
                jet_coin[j].pos[1] = 50;
                jet_coin[j].pos[2] = body.pos[2] - 150 - 15*j;
                if(r<0.33)jet_coin[j].pos[0] = (-1)*8;
                if(r>0.33&&r<0.66)jet_coin[j].pos[0] = (0)*8;
                if(r>0.66)jet_coin[j].pos[0] = (1)*8;
            }
            break;
        }
    }

    for(var i=0;i<sneakers.length;i++)
    {
        if(sneakers[i].pos[0]-body.pos[0]>=-2&&sneakers[i].pos[0]-body.pos[0]<=2 && sneakers[i].pos[2] - body.pos[2] >= -3 && sneakers[i].pos[2] - body.pos[2] <= 3 && sneakers[i].pos[1] - body.pos[1] <= 5 && sneakers[i].pos[1] - body.pos[1] >= -5)
        {
            sneakerit = 1;
            sneaker_time = 6.0;
            sneakers[i].pos[0] = 1000;
            sneakers[i].pos[1] = 1000;
            sneakers[i].pos[2] = 1000;
            break;
        }
    }

    for(var i=0;i<brake.length;i++) 
    {
        if(brake[i].pos[0]-body.pos[0]>=-2&&brake[i].pos[0]-body.pos[0]<=2 && brake[i].pos[2] - body.pos[2] >= -2.5 && brake[i].pos[2] - body.pos[2] <= 2.5 && brake[i].pos[1] - body.pos[1] <= 5 && brake[i].pos[1] - body.pos[1] >= -5)
        {
            if(brake[i].flag == 0)
            {
                slow_speed = 1;
                slow_time = 10.0;
                for(var i=0;i<leg.length;i++)
                {
                    leg[i].rot = 1;
                }
            }
            if(brake[i].flag == 1)
            {
                slow_speed = 0;
            }
        }
    }

    var flag = 0;
    for(var i=0;i<trains.length;i++)
    {
        if(trains[i].pos[0]-body.pos[0]>=-2.0&&trains[i].pos[0]-body.pos[0]<=2.0&& body.pos[1]-trains[i].pos[1] >= 4.0 && body.pos[1]-trains[i].pos[1] <= 8.5 && trains[i].pos[2] - body.pos[2] <= 1 && trains[i].pos[2] - body.pos[2] >= -trains[i].depth-1 )
        {
            flag = 1;
            break;
        }   
    }
    if(flag == 1)
    {
        above_train = 1;
        initial_v = 0;
    }
    else
        above_train = 0;
}
function TickInput(gl)
{
    Mousetrap.bind('up', function() { 
        // console.log('up');g
    });
    Mousetrap.bind('left', function() {
        // console.log("bt");
        if(prev_lane != 1)
            moveit = -1;
        else
        {
            if(slow_speed == 2)
            {
                slow_speed = 1;
                slow_time = 10.0;
                for(var i=0;i<leg.length;i++)
                {
                    leg[i].rot = 1;
                }
            }
            else if(slow_speed == 1)slow_speed = 0;
        }
    });
    Mousetrap.bind('right', function() {
        if(prev_lane != 3)
            moveit = 1;
        else
        {
            if(slow_speed == 2)
            {
                slow_speed = 1;
                slow_time = 10.0;
                for(var i=0;i<leg.length;i++)
                {
                    leg[i].rot = 1;
                }
            }
            else if(slow_speed == 1)slow_speed = 0;
        }
    });
    Mousetrap.bind('space', function() {
        // console.log("bt");
        if(jumpit == 0 && jetpack == 0)
        {
            if(sneakerit == 0)
                initial_v = 1.5;
            else
                initial_v = 2.5;
            jumpit = 1;
            jump_time = 0;
        }
    });
    Mousetrap.bind('g', function() {
        // console.log("bt");
        shade = new shader(gl,1); 
        shaderProgram = shade.initShaderProgram(gl);

        programInfo = {
            program: shaderProgram,
            attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
            textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
            },
            uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
            uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
            },
        };
    });
    Mousetrap.bind('c', function() {
        // console.log("bt");
        shade = new shader(gl,0); 
        shaderProgram = shade.initShaderProgram(gl);

        programInfo = {
            program: shaderProgram,
            attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
            textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
            },
            uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
            uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
            },
        };
    
    });
}
function objectInit(gl)
{
    railroad = [];
    walls = [];
    leg = [];
    dog_leg = [];
    police_leg = [];
    trains = [];
    brake = [];
    cn = [];
    jet_coin = [];
    
    texture = loadTexture(gl, './texture/train.jpg');
    trains.push(new train(gl,[-8.0 ,4.5,-200.0],texture,6.5,6.5,25.0));
    trains.push(new train(gl,[ 0.0 ,4.5,-200.0],texture,6.5,6.5,25.0));
    
    texture = loadTexture(gl, './texture/track.jpeg')
    for(var i=0;i<180;i++)
    {
        railroad.push(new track(gl, [-8.0 ,0.0,-4*i],texture,8.0,0.0,4.0));
        railroad.push(new track(gl, [ 0.0 ,0.0,-4*i],texture,8.0,0.0,4.0));
        railroad.push(new track(gl, [ 8.0 ,0.0,-4*i],texture,8.0,0.0,4.0));
    }
    
    for(var i=0;i<60;i++)
    {
        var r = Math.random();
        if(r<0.33)texture = loadTexture(gl, './texture/walls.jpeg')
        if(r>0.33&&r<0.66)texture = loadTexture(gl, './texture/cong.png')
        if(r>0.66)texture = loadTexture(gl, './texture/aap.jpeg')
        walls.push(new wall(gl,[-12.0 ,10.0,-20*i],texture,0.0,20.0,20.0));
        walls.push(new wall(gl,[ 12.0 ,10.0,-20*i],texture,0.0,20.0,20.0));
    }

    texture = loadTexture(gl, './texture/coin.jpg')
    for(var i=0;i<50;i++)
    {
        cn.push(new coin(gl,[ 0.0 ,2.0,-30.0-20*i],texture,1.0));
    }
    for(var i=0;i<120;i++)
    {
        jet_coin.push(new coin(gl,[ 1000.0 ,1000.0,1000],texture,1.0));
    }

    //player
    texture = loadTexture(gl, './texture/color.png')
    head = new Head(gl,[0.0,4.2,0.0],texture,1.0);
    texture = loadTexture(gl, './texture/red.png')
    body = new Body(gl,0, [ 0.0 ,3.0,0.0], texture, 0.6, 2.0);
    texture = loadTexture(gl, './texture/blue.jpeg')
    leg.push(new Leg(gl,[ -0.3 ,1.0,0.0],0, texture, 0.1, 1.0, 0));
    leg.push(new Leg(gl,[  0.3 ,1.0,0.0],0, texture, 0.1, 1.0, 1));
    texture = loadTexture(gl, './texture/red.png')
    leg.push(new Leg(gl,[-0.9 ,2.9,0.0],0, texture, 0.1, 1.3, 1));
    leg.push(new Leg(gl,[ 0.9 ,2.9,0.0],0, texture, 0.1, 1.3, 0));
    texture = loadTexture(gl, './texture/skin.png')
    leg.push(new Leg(gl,[ 0.0 ,4.0,0.0],0, texture, 0.2, 1.0, 2));
    
    //dog
    texture = loadTexture(gl, './texture/yellow.jpeg')
    dog_head = new Head(gl, [ 2.5, 2.5,8.0],texture,0.7);
    dog_body =new Body(gl,1,[ 2.5, 1.5,10.0], texture, 0.7, 2.0);
    dog_leg.push(new Leg(gl,[ 1.5, 1.5,5.0],0, texture, 0.2, 1.0, 0));
    dog_leg.push(new Leg(gl,[ 3.5, 1.5,5.0],0, texture, 0.2, 1.0, 0));
    dog_leg.push(new Leg(gl,[ 1.5, 1.5,10.0],0, texture, 0.2, 1.3, 1));
    dog_leg.push(new Leg(gl,[ 3.5, 1.5,10.0],0, texture, 0.2, 1.3, 1));
    dog_leg.push(new Leg(gl,[ 2.5, 2.0,10.0],0, texture, 0.1, -1.0, 0));
    
    //police
    texture = loadTexture(gl, './texture/skin.png');
    police_head = new Head(gl,[0.0,4.2,10.0],texture,1.0);
    texture = loadTexture(gl, './texture/blue.jpeg');
    police_body =new Body(gl,0,[ 0.0 ,3.0,10.0], texture, 1.0, 2.0);
    police_leg.push(new Leg(gl,[-0.4 ,1.0,10.0],0, texture, 0.4, 1.0, 0));
    police_leg.push(new Leg(gl,[ 0.4 ,1.0,10.0],0, texture, 0.4, 1.0, 1));
    police_leg.push(new Leg(gl,[-1.2 ,2.9,10.0],0, texture, 0.2, 1.3, 1));
    police_leg.push(new Leg(gl,[ 1.2 ,2.9,10.0],0, texture, 0.2, 1.3, 0));
    

    jets = [];
    texture = loadTexture(gl, './texture/jet.png');
    jets.push(new Jet(gl,[ 0.0 ,2.0,-100.0],texture,0.5));
    fly_jet = new Jet(gl,[ 1000.0 ,1000.0,1000.0],texture,0.5);

    sneakers = [];
    texture = loadTexture(gl, './texture/coin.jpg');
    sneakers.push(new Sneaker(gl,[ 1000,1000,1000],texture,0.5));
    jump_sneaker = new Sneaker(gl,[ 1000 ,1000,1000],texture,0.5);
    
    brake = [];
    texture = loadTexture(gl, './texture/barrier.jpeg');
    brake.push(new Brake(gl,0,[ 1000 ,1000,1000],texture,5,4,0.1));
    texture = loadTexture(gl, './texture/barr.jpeg');
    brake.push(new Brake(gl,1,[ 1000 ,1000,1000],texture,5,10,0.1));
}
function drawScene(gl, programInfo,deltaTime) 
{
    gl.clearColor(135.0/256.0, 206.0/256.0, 235.0/256.0, 1.0);    // Clear to black, fully opaque
    gl.clearDepth(1.0);                                 // Clear everything
    gl.enable(gl.DEPTH_TEST);                     // Enable depth testing
    gl.depthFunc(gl.LEQUAL);                        // Near things obscure far things

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 45 * Math.PI / 180;     // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 1000.0;
    const projectionMatrix = mat4.create();

    mat4.perspective(projectionMatrix,fieldOfView,aspect,zNear,zFar);

    var cameraMatrix = mat4.create();
    mat4.translate(cameraMatrix, cameraMatrix, [camx, camy, camz]);
    // camz -= 0.5;
    var cameraPosition = [camx, camy, camz];
    var up = [0, 1, 0];

    mat4.lookAt(cameraMatrix, cameraPosition, [camx,camy,body.pos[2]-1], up);

    var viewMatrix = cameraMatrix;//mat4.create();

    var viewProjectionMatrix = mat4.create();

    mat4.multiply(viewProjectionMatrix, projectionMatrix, viewMatrix);
    
    for(var i=0;i<cn.length;i++)
    {
        cn[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }
    for(var i=0;i<jet_coin.length;i++)
    {
        jet_coin[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }
    for(var i=0;i<walls.length;i++)
    {
        walls[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }
    for(var i=0;i<railroad.length;i++)
    {
        railroad[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }
    for(var i=0;i<trains.length;i++)
    {
        trains[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }
    
    head.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    body.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    for(var i=0;i<leg.length;i++)
    {
        leg[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }

    dog_head.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    dog_body.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    for(var i=0;i<dog_leg.length;i++)
    {
        dog_leg[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }

    police_head.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    police_body.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    for(var i=0;i<police_leg.length;i++)
    {
        police_leg[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }

    for(var i=0;i<brake.length;i++)
    {
        brake[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }
    for(var i=0;i<jets.length;i++)
    {
        jets[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }
    fly_jet.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);

    for(var i=0;i<sneakers.length;i++)
    {
        sneakers[i].drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);
    }
    jump_sneaker.drawObject(gl, viewProjectionMatrix, programInfo, deltaTime);

}

function loadTexture(gl, url) 
{
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel);
  
    const image = new Image();
    image.onload = function() {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                    srcFormat, srcType, image);
  
      if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
         gl.generateMipmap(gl.TEXTURE_2D);
      } else {
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
    };
    image.src = url;
  
    return texture;
}
  
function isPowerOf2(value) 
{
    return (value & (value - 1)) == 0;
}

function jump()
{
    if(jumpit == 1 && above_train == 0)
    {
        var x = initial_v*jump_time - 1.0*jump_time*jump_time;
        body.pos[1] += x;
        head.pos[1] += x;
        for(var i=0;i<leg.length;i++)
            leg[i].pos[1] += x;
        jump_time += 0.1;
        if(leg[0].pos[1] < 1)
        {
            jumpit = 0;
            jump_time = 0;
            body.pos[1] = 3.0;
            head.pos[1] = 4.2;
            leg[0].pos[1] = 1.0;
            leg[1].pos[1] = 1.0;
            leg[2].pos[1] = 2.9;
            leg[3].pos[1] = 2.9;
            leg[4].pos[1] = 4.0;
        }
    }
}
function move_fwd()
{
    if(jetpack == 0)
    {
        body.pos[2] -= fwd_vel;
        head.pos[2] -= fwd_vel;
        for(var i=0;i<leg.length;i++)
        {
            leg[i].pos[2] -= fwd_vel;
            if(leg[i].flag == 0)
            {
                leg[i].rotation -= 0.1;
                if(leg[i].rotation < -0.8)
                {
                    leg[i].flag = 1;
                }
            }
            if(leg[i].flag == 1)
            {
                leg[i].rotation += 0.1;
                if(leg[i].rotation > 0.8)
                {
                    leg[i].flag = 0;
                }
            }
        }

        dog_body.pos[2] -= fwd_vel;
        dog_head.pos[2] -= fwd_vel;
        for(var i=0;i<dog_leg.length;i++)
        {
            dog_leg[i].pos[2] -= fwd_vel;
            if(dog_leg[i].flag == 0)
            {
                dog_leg[i].rotation -= 0.3;
                if(dog_leg[i].rotation < -1.2)
                {
                    dog_leg[i].flag = 1;
                }
            }
            if(dog_leg[i].flag == 1)
            {
                dog_leg[i].rotation += 0.3;
                if(dog_leg[i].rotation > 1.2)
                {
                    dog_leg[i].flag = 0;
                }
            }
        }

    }
    else if(jetpack == 1)
    {
        
        body.pos[2] -= fwd_vel*4;
        head.pos[2] -= fwd_vel*4;
        for(var i=0;i<leg.length;i++)
        {
            leg[i].pos[2] -= fwd_vel*4;
        }
        if(body.pos[1] < 50)
        {
            body.pos[1] += fwd_vel;
            head.pos[1] += fwd_vel;
            for(var i=0;i<leg.length;i++)
            {
                leg[i].pos[1] += fwd_vel;
            }
        }

        dog_body.pos[2] -= 4*fwd_vel;
        dog_head.pos[2] -= 4*fwd_vel;
        for(var i=0;i<dog_leg.length;i++)
        {
            dog_leg[i].pos[2] -= 4*fwd_vel;
            if(dog_leg[i].flag == 0)
            {
                dog_leg[i].rotation -= 0.3;
                if(dog_leg[i].rotation < -1.2)
                {
                    dog_leg[i].flag = 1;
                }
            }
            if(dog_leg[i].flag == 1)
            {
                dog_leg[i].rotation += 0.3;
                if(dog_leg[i].rotation > 1.2)
                {
                    dog_leg[i].flag = 0;
                }
            }
        }
        
    }
}
function move_side()
{
    if(moveit == 1 && prev_lane != 3)
    {
        body.pos[0] += 0.5;
        head.pos[0] += 0.5;
        for(var i=0;i<leg.length;i++)
        {
            leg[i].pos[0] += 0.5;
        }
        if(prev_lane == 1)
        {
            if(body.pos[0] == 0)
            {
                moveit = 0;
                prev_lane = 2;
            }
        }
        if(prev_lane == 2)
        {
            if(body.pos[0] == 7.5)
            {
                moveit = 0;
                prev_lane = 3;
            }
        }
    
    
    }
    if(moveit == -1 && prev_lane != 1)
    {
        body.pos[0] -= 0.5;
        head.pos[0] -= 0.5;
        for(var i=0;i<leg.length;i++)
        {
            leg[i].pos[0] -= 0.5;
        }
        if(prev_lane == 3)
        {
            if(body.pos[0] == 0)
            {
                moveit = 0;
                prev_lane = 2;
            }
        }
        if(prev_lane == 2)
        {
            if(body.pos[0] == -7.5)
            {
                moveit = 0;
                prev_lane = 1;
            }
        }
    }
}
function police_dog_position()
{
    var dist;
    if(slow_speed == 1)
    {
        dist = 10;
        slow_time -= 0.1;
        fwd_vel = 0.2;
        if(slow_time < 0)
        {
            slow_time = 0;
            slow_speed = 2;
            for(var i=0;i<leg.length;i++)
            {
                leg[i].rot = 0;
            }
        }
    }
    else if(slow_speed == 2)
    {
        dist = 0;
        fwd_vel = 0.8;
    }
    else
    {
        dist = 20;
        fwd_vel = 0.0;
    }
    dog_head.pos[0] = head.pos[0] + 2.5;
    dog_head.pos[2] = head.pos[2] + 12.0 - dist;

    dog_body.pos[0] = dog_head.pos[0] ;
    dog_body.pos[2] = dog_head.pos[2]+2.0 ;
    
    dog_leg[0].pos[0] = dog_body.pos[0] -0.5;
    dog_leg[0].pos[2] = dog_body.pos[2] -4;

    dog_leg[1].pos[0] = dog_body.pos[0] +0.5;
    dog_leg[1].pos[2] = dog_body.pos[2] -4;

    dog_leg[2].pos[0] = dog_body.pos[0] -1;
    dog_leg[2].pos[2] = dog_body.pos[2] ;

    dog_leg[3].pos[0] = dog_body.pos[0] +1;
    dog_leg[3].pos[2] = dog_body.pos[2] ;

    dog_leg[4].pos[0] = dog_body.pos[0] ;
    dog_leg[4].pos[2] = dog_body.pos[2] ;

    police_head.pos[0] = head.pos[0] ;
    police_head.pos[2] = head.pos[2] + 23.0 - dist;

    police_body.pos[0] = police_head.pos[0] ;
    police_body.pos[2] = police_head.pos[2];
    
    police_leg[0].pos[0] = police_body.pos[0] -0.4;
    police_leg[0].pos[2] = police_body.pos[2] ;

    police_leg[1].pos[0] = police_body.pos[0] +0.4;
    police_leg[1].pos[2] = police_body.pos[2] ;

    police_leg[2].pos[0] = police_body.pos[0] -1.2;
    police_leg[2].pos[2] = police_body.pos[2] ;

    police_leg[3].pos[0] = police_body.pos[0] +1.2;
    police_leg[3].pos[2] = police_body.pos[2] ;

    if(jetpack == 1)
    {
        jet_time -= 0.01;
        if(jet_time <= 0)
        {
            jetpack = 0;  
            jet_time = 0;
            jumpit = 1;
            jump_time = 0;
            initial_v = 0;
        }
        fly_jet.pos[0] = body.pos[0];
        fly_jet.pos[1] = body.pos[1] - 2.0;
        fly_jet.pos[2] = body.pos[2] + 0.5;
    }
    if(sneakerit == 1)
    {
        sneaker_time -= 0.01;
        if(sneaker_time <= 0)
        {
            sneakerit = 0;
            sneaker_time = 0;
        }
        jump_sneaker.pos[0] = body.pos[0];
        jump_sneaker.pos[1] = body.pos[1] - 2.5;
        jump_sneaker.pos[2] = body.pos[2] ;
    }
}
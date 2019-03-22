let Head = class {
    constructor(gl,pos,texture,r) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        this.texture = texture
        this.positions = [];
        var pos_buffer = [];
        // var r = 3.0;
        var M_PI = 3.141592653;
        for(var j=0;j<18;j++)
        {
            for(var i=0;i<72;i++)
            {
                this.positions.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.cos((10.0*M_PI*i)/180));
                this.positions.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.sin((10.0*M_PI*i)/180));
                this.positions.push(r*Math.cos(10.0*j*M_PI/180.0));
                
                this.positions.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.cos((10.0*M_PI*(i+1))/180));
                this.positions.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.sin((10.0*M_PI*(i+1))/180));
                this.positions.push(r*Math.cos(10.0*j*M_PI/180.0));
                
                this.positions.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.cos((10.0*M_PI*(i))/180));
                this.positions.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.sin((10.0*M_PI*(i))/180));
                this.positions.push(r*Math.cos(10.0*(j+1.0)*M_PI/180.0));
             
                this.positions.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.cos((10.0*M_PI*i)/180));
                this.positions.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.sin((10.0*M_PI*i)/180));
                this.positions.push(r*Math.cos(10.0*(j+1.0)*M_PI/180.0));
                
                this.positions.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.cos((10.0*M_PI*(i+1))/180));
                this.positions.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.sin((10.0*M_PI*(i+1))/180));
                this.positions.push(r*Math.cos(10.0*(j+1.0)*M_PI/180.0));
                
                this.positions.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.cos((10.0*M_PI*(i+1))/180));
                this.positions.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.sin((10.0*M_PI*(i+1))/180));
                this.positions.push(r*Math.cos(10.0*j*M_PI/180.0));
            }
        }
        this.position = pos_buffer;

        this.rotation = -0.9;
        
        this.pos = pos;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

        this.normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);

        this.vertexNormals = [];
        for(var j=0;j<18;j++)
        {
            for(var i=0;i<72;i++)
            {
                this.vertexNormals.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.cos((10.0*M_PI*i)/180));
                this.vertexNormals.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.sin((10.0*M_PI*i)/180));
                this.vertexNormals.push(r*Math.cos(10.0*j*M_PI/180.0));
                this.vertexNormals.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.cos((10.0*M_PI*(i+1))/180));
                this.vertexNormals.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.sin((10.0*M_PI*(i+1))/180));
                this.vertexNormals.push(r*Math.cos(10.0*j*M_PI/180.0));
                this.vertexNormals.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.cos((10.0*M_PI*(i))/180));
                this.vertexNormals.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.sin((10.0*M_PI*(i))/180));
                this.vertexNormals.push(r*Math.cos(10.0*(j+1.0)*M_PI/180.0));
                this.vertexNormals.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.cos((10.0*M_PI*i)/180));
                this.vertexNormals.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.sin((10.0*M_PI*i)/180));
                this.vertexNormals.push(r*Math.cos(10.0*(j+1.0)*M_PI/180.0));
                this.vertexNormals.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.cos((10.0*M_PI*(i+1))/180));
                this.vertexNormals.push(r*Math.sin(10.0*(j+1.0)*M_PI/180.0)*Math.sin((10.0*M_PI*(i+1))/180));
                this.vertexNormals.push(r*Math.cos(10.0*(j+1.0)*M_PI/180.0));
                this.vertexNormals.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.cos((10.0*M_PI*(i+1))/180));
                this.vertexNormals.push(r*Math.sin(10.0*j*M_PI/180.0)*Math.sin((10.0*M_PI*(i+1))/180));
                this.vertexNormals.push(r*Math.cos(10.0*j*M_PI/180.0));
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals),
                        gl.STATIC_DRAW);



        this.textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
      
        this.textureCoordinates = [];
        for(var j=0;j<18;j++)
        {
            for(var i=0;i<72;i++)
            {
                if(j%2)
                {
                    this.textureCoordinates.push(1.0);
                    this.textureCoordinates.push(1.0);
                    
                    this.textureCoordinates.push(1.0);
                    this.textureCoordinates.push(1.0);
                    
                    this.textureCoordinates.push(1.0);
                    this.textureCoordinates.push(1.0);
                    
                    this.textureCoordinates.push(1.0);
                    this.textureCoordinates.push(1.0);

                    this.textureCoordinates.push(1.0);
                    this.textureCoordinates.push(1.0);

                    this.textureCoordinates.push(1.0);
                    this.textureCoordinates.push(1.0);
                }
                else
                {
                    this.textureCoordinates.push(0.0);
                    this.textureCoordinates.push(0.0);
                    
                    this.textureCoordinates.push(0.0);
                    this.textureCoordinates.push(0.0);
                    
                    this.textureCoordinates.push(0.0);
                    this.textureCoordinates.push(0.0);
                    
                    this.textureCoordinates.push(0.0);
                    this.textureCoordinates.push(0.0);

                    this.textureCoordinates.push(0.0);
                    this.textureCoordinates.push(0.0);

                    this.textureCoordinates.push(0.0);
                    this.textureCoordinates.push(0.0);
                }
            
            }
        }
      
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates),
                      gl.STATIC_DRAW);

        // this.indexBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        // This array defines each face as two triangles, uMath.sing the
        // indices into the vertex array to specify each triangle's
        // position.

        // this.indices = [];
        // var ind_buffer = [];
        // for(var j=0;j<18;j++)
        // {
        //     for(var i=0;i<72;i++)
        //     {
        //         ind_buffer.push(18*j+i)
        //     }
        // }

        //     0,  1,  2,  3,  1,  2,        // front
        //     4,  5,  6,  7,  5,  6,        // front
        //     8,  9,  10, 11, 9,  10,        // front
        //     12, 13, 14, 15, 13, 14,        // front
        //     16, 17, 18, 19, 17, 18,        // front
        //     20, 21, 22, 23, 21, 22,        // front
        // ];

        // Now send the element array to GL

        // gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
        //         new Uint16Array(this.indices), gl.STATIC_DRAW);

        this.buffers = {
            position: this.positionBuffer,
            tex : this.textureCoordBuffer,
            indices: this.indexBuffer,
            normal: this.normalBuffer,
        }

    }

    drawObject(gl, projectionMatrix, programInfo,deltaTime) {
        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);

        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture);

        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        const modelViewMatrix = mat4.create();
        mat4.translate(
            modelViewMatrix,         // destination matrix
            modelViewMatrix,         // matrix to translate
            this.pos
        );    // amount to translate



        mat4.rotate(modelViewMatrix,
            modelViewMatrix,
            this.rotation,
            [1,0,0]);

        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
            gl.vertexAttribPointer(
                    programInfo.attribLocations.vertexPosition,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
            gl.enableVertexAttribArray(
                    programInfo.attribLocations.vertexPosition);
        }
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            // gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexNormal,
                numComponents,
                type,
                normalize,
                stride,
                offset);
            gl.enableVertexAttribArray(
                programInfo.attribLocations.vertexNormal);
        }
        {
            const numComponents = 2;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.tex);
            gl.vertexAttribPointer(
                    programInfo.attribLocations.textureCoord,
                    numComponents,
                    type,
                    normalize,
                    stride,
                    offset);
            gl.enableVertexAttribArray(
                    programInfo.attribLocations.textureCoord);
        }

        // Tell WebGL which indices to use to index the vertices
        // gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);

        // Tell WebGL to use our program when drawing
        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);


        gl.useProgram(programInfo.program);

        // Set the shader uniforms

        gl.uniformMatrix4fv(
                programInfo.uniformLocations.projectionMatrix,
                false,
                projectionMatrix);
        gl.uniformMatrix4fv(
                programInfo.uniformLocations.modelViewMatrix,
                false,
                modelViewMatrix);
        gl.uniformMatrix4fv(
                programInfo.uniformLocations.normalMatrix,
                false,
                normalMatrix);

        {
            const vertexCount = 18*72*3;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawArrays(gl.TRIANGLES, 0,this.positions.length/3);
            // gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
        // this.rotation += 0.1;
    }
};
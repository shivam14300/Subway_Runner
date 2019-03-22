let cylinder = class {
    constructor(gl,pos,texture,l,w,d) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        this.texture = texture
        this.length = l;
        this.width = w;
        this.depth = d;
        this.positions = [];
        var M_PI = 3.141592653;
        for(var i=0;i<36;i++)
        {
            this.positions.push(1.0*Math.cos((10.0*M_PI*i)/180));
            this.positions.push(1.0*Math.sin((10.0*M_PI*i)/180));
            this.positions.push(0.125);
            
            this.positions.push(1.0*Math.cos((10.0*M_PI*(i+1))/180));
            this.positions.push(1.0*Math.sin((10.0*M_PI*(i+1))/180));
            this.positions.push(0.125);
            
            this.positions.push(1.0*Math.cos((10.0*M_PI*(i))/180));
            this.positions.push(1.0*Math.sin((10.0*M_PI*(i))/180));
            this.positions.push(-0.125);
        }
        for(var i=0;i<36;i++)
        {
            this.positions.push(1.0*Math.cos((10.0*M_PI*i)/180));
            this.positions.push(1.0*Math.sin((10.0*M_PI*i)/180));
            this.positions.push(-0.125);
            
            this.positions.push(1.0*Math.cos((10.0*M_PI*(i+1))/180));
            this.positions.push(1.0*Math.sin((10.0*M_PI*(i+1))/180));
            this.positions.push(-0.125);
            
            this.positions.push(1.0*Math.cos((10.0*M_PI*(i+1))/180));
            this.positions.push(1.0*Math.sin((10.0*M_PI*(i+1))/180));
            this.positions.push(0.125);
        }
        for(var i=0;i<36;i++)
        {
            this.positions.push(0.0);
            this.positions.push(0.0);
            this.positions.push(-0.125);
            
            this.positions.push(1.0*Math.cos((10.0*M_PI*(i))/180));
            this.positions.push(1.0*Math.sin((10.0*M_PI*(i))/180));
            this.positions.push(-0.125);
            
            this.positions.push(1.0*Math.cos((10.0*M_PI*(i+1))/180));
            this.positions.push(1.0*Math.sin((10.0*M_PI*(i+1))/180));
            this.positions.push(-0.125);
        }
        for(var i=0;i<36;i++)
        {
            this.positions.push(0.0);
            this.positions.push(0.0);
            this.positions.push(0.125);
            
            this.positions.push(1.0*Math.cos((10.0*M_PI*(i))/180));
            this.positions.push(1.0*Math.sin((10.0*M_PI*(i))/180));
            this.positions.push(0.125);
            
            this.positions.push(1.0*Math.cos((10.0*M_PI*(i+1))/180));
            this.positions.push(1.0*Math.sin((10.0*M_PI*(i+1))/180));
            this.positions.push(0.125);
        }

        this.rotation = 0;
        
        this.pos = pos;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

        this.textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
      
        this.textureCoordinates = [];
        for(var j=0;j<36;j++)
        {
            this.textureCoordinates.push(0.5);
            this.textureCoordinates.push(0.5);

            this.textureCoordinates.push(0.5);
            this.textureCoordinates.push(0.5);
            
            this.textureCoordinates.push(0.5);
            this.textureCoordinates.push(0.5);
        }
        for(var j=0;j<36;j++)
        {
            this.textureCoordinates.push(0.5);
            this.textureCoordinates.push(0.5);
            
            this.textureCoordinates.push(0.5);
            this.textureCoordinates.push(0.5);
            
            this.textureCoordinates.push(0.5);
            this.textureCoordinates.push(0.5);
        }
        for(var i=0;i<36;i++)
        {
            this.textureCoordinates.push(0.5);
            this.textureCoordinates.push(0.5);
        
            this.textureCoordinates.push(0.5-0.45*Math.cos((10.0*M_PI*(i))/180));
            this.textureCoordinates.push(0.5-0.45*Math.sin((10.0*M_PI*(i))/180));
        
            this.textureCoordinates.push(0.5-0.45*Math.cos((10.0*M_PI*(i+1))/180));
            this.textureCoordinates.push(0.5-0.45*Math.sin((10.0*M_PI*(i+1))/180));
        }
        for(var i=0;i<36;i++)
        {
            this.textureCoordinates.push(0.5);
            this.textureCoordinates.push(0.5);
        
            this.textureCoordinates.push(0.5-0.45*Math.cos((10.0*M_PI*(i))/180));
            this.textureCoordinates.push(0.5-0.45*Math.sin((10.0*M_PI*(i))/180));
        
            this.textureCoordinates.push(0.5-0.45*Math.cos((10.0*M_PI*(i+1))/180));
            this.textureCoordinates.push(0.5-0.45*Math.sin((10.0*M_PI*(i+1))/180));
        }
      
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates),
                      gl.STATIC_DRAW);


        this.buffers = {
            position: this.positionBuffer,
            tex : this.textureCoordBuffer,
            indices: this.indexBuffer,
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
            [0,1,0]);

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

        {
            const vertexCount = 18*72*3;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawArrays(gl.TRIANGLES, 0,this.positions.length/3);
            // gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }
        this.rotation += 0.05;
    }
};
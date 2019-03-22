let train = class {
    constructor(gl,pos,texture,l,w,d) {
        this.positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
        this.texture = texture
        this.length = l;
        this.width = w;
        this.depth = d;
        this.positions = [];
        var M_PI = 3.141592653;
        var r = l;
        var r1 = w;
        var len = d;
        for(var i=0;i<4;i++)
        {
            this.positions.push(0.0);
            this.positions.push(0.0);
            this.positions.push(0.0);
            
            this.positions.push(r1*Math.cos(((90.0*i+45.0)*M_PI)/180));
            this.positions.push(r1*Math.sin(((90.0*i+45.0)*M_PI)/180));
            this.positions.push(0.0);
            
            this.positions.push(r1*Math.cos(((90.0*(i+1)+45.0)*M_PI)/180));
            this.positions.push(r1*Math.sin(((90.0*(i+1)+45.0)*M_PI)/180));
            this.positions.push(0.0);
        }
        for(var i=0;i<4;i++)
        {
            this.positions.push(0.0);
            this.positions.push(0.0);
            this.positions.push(len);
            
            this.positions.push(r1*Math.cos(((90.0*(i)+45.0)*M_PI)/180));
            this.positions.push(r1*Math.sin(((90.0*(i)+45.0)*M_PI)/180));
            this.positions.push(len);
            
            this.positions.push(r1*Math.cos(((90.0*(i+1)+45.0)*M_PI)/180));
            this.positions.push(r1*Math.sin(((90.0*(i+1)+45.0)*M_PI)/180));
            this.positions.push(len);
        }
        for(var i=0;i<4;i++)
        {
            this.positions.push(r*Math.cos(((90.0*i+45.0)*M_PI)/180));
            this.positions.push(r*Math.sin(((90.0*i+45.0)*M_PI)/180));
            this.positions.push(len);
            
            this.positions.push(r*Math.cos(((90.0*(i+1)+45.0)*M_PI)/180));
            this.positions.push(r*Math.sin(((90.0*(i+1)+45.0)*M_PI)/180));
            this.positions.push(len);
            
            this.positions.push(r*Math.cos(((90.0*i+45.0)*M_PI)/180));
            this.positions.push(r*Math.sin(((90.0*i+45.0)*M_PI)/180));
            this.positions.push(0.0);
        }
        for(var i=0;i<4;i++)
        {
            this.positions.push(r*Math.cos(((90.0*i+45.0)*M_PI)/180));
            this.positions.push(r*Math.sin(((90.0*i+45.0)*M_PI)/180));
            this.positions.push(0.0);
            
            this.positions.push(r*Math.cos(((90.0*(i+1)+45.0)*M_PI)/180));
            this.positions.push(r*Math.sin(((90.0*(i+1)+45.0)*M_PI)/180));
            this.positions.push(0.0);
            
            this.positions.push(r*Math.cos(((90.0*(i+1)+45.0)*M_PI)/180));
            this.positions.push(r*Math.sin(((90.0*(i+1)+45.0)*M_PI)/180));
            this.positions.push(len);
        }

        this.rotation = 0;
        
        this.pos = pos;

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.positions), gl.STATIC_DRAW);

        this.textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureCoordBuffer);
      
        this.textureCoordinates = [];
        for(var i=0;i<4;i++)
        {
            this.textureCoordinates.push(0.2);
            this.textureCoordinates.push(0.5);
        
            this.textureCoordinates.push(0.2-0.6*Math.cos(((90.0*(i)+45.0)*M_PI)/180));
            this.textureCoordinates.push(0.5-0.6*Math.sin(((90.0*(i)+45.0)*M_PI)/180));
        
            this.textureCoordinates.push(0.2-0.6*Math.cos(((90.0*(i+1)+45.0)*M_PI)/180));
            this.textureCoordinates.push(0.5-0.6*Math.sin(((90.0*(i+1)+45.0)*M_PI)/180));
        }
        for(var i=0;i<4;i++)
        {
            this.textureCoordinates.push(0.5);
            this.textureCoordinates.push(0.5);
        
            this.textureCoordinates.push(0.5-0.6*Math.cos(((90.0*(i)+45.0)*M_PI)/180));
            this.textureCoordinates.push(0.5-0.6*Math.sin(((90.0*(i)+45.0)*M_PI)/180));
        
            this.textureCoordinates.push(0.5-0.6*Math.cos(((90.0*(i+1)+45.0)*M_PI)/180));
            this.textureCoordinates.push(0.5-0.6*Math.sin(((90.0*(i+1)+45.0)*M_PI)/180));
        }
        for(var j=0;j<4;j++)
        {
            this.textureCoordinates.push(0.2);
            this.textureCoordinates.push(0.2);
            this.textureCoordinates.push(0.2);
            this.textureCoordinates.push(0.2);
            this.textureCoordinates.push(0.2);
            this.textureCoordinates.push(0.2);
        }
        for(var j=0;j<4;j++)
        {
            this.textureCoordinates.push(0.2);
            this.textureCoordinates.push(0.2);
            this.textureCoordinates.push(0.2);
            this.textureCoordinates.push(0.2);
            this.textureCoordinates.push(0.2);
            this.textureCoordinates.push(0.2);
        }
      
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates),
                      gl.STATIC_DRAW);

        this.normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    
        this.vertexNormals = [];
        for(var i=0;i<4;i++)
        {
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(-1.0);
        
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(-1.0);

            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(-1.0);
        }
        for(var i=0;i<4;i++)
        {
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(1.0);
        
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(1.0);

            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(1.0);
        }
        for(var i=0;i<4;i++)
        {
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(-1.0);
        
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(-1.0);

            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(-1.0);
        }
        for(var i=0;i<4;i++)
        {
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(-1.0);
        
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(-1.0);

            this.vertexNormals.push(0.0);
            this.vertexNormals.push(0.0);
            this.vertexNormals.push(-1.0);
        }
    
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexNormals),
                    gl.STATIC_DRAW);
                    

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
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = false;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.normal);
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

        const normalMatrix = mat4.create();
        mat4.invert(normalMatrix, modelViewMatrix);
        mat4.transpose(normalMatrix, normalMatrix);
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
        // this.rotation += 0.05;
    }
};
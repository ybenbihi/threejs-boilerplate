import * as THREE from 'three';
import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'

export default class Sketch{
    constructor(){
        /* SETTING UP THE CAMERA, SCENE AND RENDERED */
        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
        this.camera.position.z = 1;

        this.scene = new THREE.Scene();


        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.querySelector(".container").appendChild( this.renderer.domElement );

        /* SETTING UP TIME AND MESH */
        this.time = 0;
        this.addMesh();

        /* LAUNCHING THE RENDERING */
        this.render();
    }

    addMesh(){
        this.geometry = new THREE.PlaneGeometry( 1, 1 );
        this.material = new THREE.MeshNormalMaterial({side:THREE.DoubleSide});
        
        this.material = new THREE.ShaderMaterial({
            uniforms:{
                progress: {type: "f", value: 0}
            },
            fragmentShader:fragment,
            vertexShader:vertex,
            side:THREE.DoubleSide
        })
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
    }

    render(){
        this.time++;
        this.mesh.rotation.x += 0.01;
        // this.mesh.rotation.y += 0.01;
        this.renderer.render( this.scene, this.camera );
        window.requestAnimationFrame( this.render.bind(this) );
    }
}

new Sketch();


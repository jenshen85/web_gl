'use strict'

import * as THREE from 'three';
import {TimelineMax} from 'gsap';
var OrbitControls = require('three-orbit-controls')(THREE);

import VTKLoader from '../lib/vtkloader';

let loader = new THREE.VTKLoader();

var camera, pos, controls, scene, renderer, geometry, geometry1, material;




function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  renderer = new THREE.WebGLRenderer();

  let images = ['/assets/img/HTML.vtk', '/assets/img/CSS.vtk', '/assets/img/JS.vtk']

  images.forEach((item)=>{
    loader.load(item, function(mesh) {
      console.log(mesh);
    
      let geometry = new THREE.BufferGeometry();
    

      let numVertices =  mesh.vertices.length;
    
      let sources = new Float32Array(numVertices*3);
      let target = new Float32Array(numVertices*3);
      let positions = new Float32Array(numVertices*3);
    
    
      geometry.addAttribute('position', new THREE.BufferAttribute(positions,3));
      geometry.attributes.position.copyVector3sArray(mesh.vertices);
    
  
      // let temp = new THREE.BufferAttribute(positions,3);
      // states.push(temp.copy.copyVector3sArray(mesh.vertices));
  
  
      material = new THREE.RawShaderMaterial( {
        uniforms: {
          blend: { type: 'f', value: 0 },
          size: { type: 'f', value: 2.1 }
        },
        vertexShader: document.getElementById( 'particle-vs' ).textContent,
        fragmentShader: document.getElementById( 'particle-fs' ).textContent,
      });
    
      let points = new THREE.Points(geometry,material);
      scene.add(points);
    
  
      let tl = new TimelineMax({paused:true});
      tl
        .to(material.uniforms.blend,3,{value:1},0);
      $('body').on('click',() => {
        
        if($('body').hasClass('done')) {
          tl.reverse();
          $('body').removeClass('done');
        } else{
          tl.play();
          $('body').addClass('done');
        }
      });
    })
  })

  let states = [];





  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerWidth);

  var container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.001, 100
  );
  camera.position.set( 0, 0, 1 );


  controls = new OrbitControls(camera, renderer.domElement);



  resize();
    

 
}


function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.setSize( w, h );
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

let time = 0;
function animate() {
  time++;
  
  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

init();
animate();
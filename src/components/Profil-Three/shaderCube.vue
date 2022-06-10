<template>
    <div id="container"></div>
</template>

<script>
import * as Three from "three"

export default {
  name: 'shaderCube',

create() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null
    };
  },
  methods: {
    init: function() {
      let container = document.getElementById("container");

      this.camera = new Three.PerspectiveCamera(
        30,
        container.clientWidth / container.clientHeight,
        0.1,
        20
      );
      this.camera.position.z = 1.4;

      this.scene = new Three.Scene();

      let geometry = new Three.BoxGeometry(0.3, 0.3, 0.3);
      // let material = new Three.MeshNormalMaterial();
      var material = new Three.MeshBasicMaterial( {color: 0x00ff00} );

      this.mesh = new Three.Mesh(geometry, material);
      this.scene.add(this.mesh);

      this.renderer = new Three.WebGLRenderer({
        antialias: true,
        alpha: true
      })

      this.renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(this.renderer.domElement);
    },
    animate: function() {
      requestAnimationFrame(this.animate);
      this.mesh.rotation.x += 0.002;
      this.mesh.rotation.y += 0.002;
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.init();
    this.animate();
  }
}
</script>

<style>
  #container {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
  }
</style>
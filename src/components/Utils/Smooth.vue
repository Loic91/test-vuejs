<template>
    
</template>

<script>
import Lenis from '@studio-freight/lenis'

export default {
    name: 'smooth',

    setup() {

        // Smooth scrolling initialization (using Lenis https://github.com/studio-freight/lenis)
        // Installation : npm i @studio-freight/lenis
        const lenis = new Lenis({
            lerp: 0.1,
            smooth: true,
        });
        const scrollFn = () => {
            lenis.raf();
            requestAnimationFrame(scrollFn);
        };
        requestAnimationFrame(scrollFn);
    }
    
}
</script>
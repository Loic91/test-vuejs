<template>
    <div class="parent">
        <div class="div1"> TITRE DU SITE </div>
        <div class="div2"> 
            <div class="dib oh">
                <a href="#" class="dib">
                    Email
                </a>
            </div>
            <div class="dib oh">
                <a href="#" class="dib">
                    Twitter
                </a>
            </div>	
            <div class="dib oh">
                <a href="#" class="dib">
                    Dribbble
                </a>
            </div>
        </div>
        <div class="div3">
            <!-- "Transition" permet d'appliquer des animations lorsqu'un élément ou un composant entre et sort du DOM -->
            <!-- L'attribut "appear" applique une transition sur le rendu initial -->
            <!-- On dit ce qu'il doit se passer "before-enter" et une fois 'enter' en définissat cela égal à une fonction -->
            <transition appear v-on:before-enter="beforeEnter" v-on:enter="enter" >
                <h1>CREATIVE<br/>DEVELOPER</h1>
            </transition>
        </div>

        <div class="div4">
            <h3 class="div4__year">2022</h3>
        </div>

        <div class="div5"> 
            <transition appear v-on:before-enter="beforeEnter2" v-on:enter="enter2">
                <h3 class="div5__gps">
                    48° 51' 23.81" N 2° 21' 7.999" E <br/>
                    Paris, FR 
                </h3>
            </transition>
        </div>

    </div>

    <threeSphere />
    <smooth />

</template>

<script>
import threeSphere from '@/components/Profil/threeSphere.vue'
import Smooth from '@/components/Utils/Smooth.vue'
import gsap from 'gsap';

export default {
    name: 'ProfilView',
    components: {
        threeSphere,
        Smooth,
    },

    setup() {
        // * On crée la fonction "beforeEnter"
        const beforeEnter = (el) => {
            // console.log('before enter - set initial state')
            el.style.transform = 'translateY(-60px)'
            el.style.opacity = 0
        }
        // * On crée la fonction "enter"
        const enter = (el) => {
            // console.log('starting to enter - make transition')
            gsap.to(el, {
                duration: 1,
                y: 0,
                opacity: 1,
            })
        }


        // * On crée la fonction "beforeEnter2"
        const beforeEnter2 = (el) => {
            el.style.transform = 'translateY(60px)'
            el.style.opacity = 0
        }
        // * On crée la fonction "enter2"
        const enter2 = (el) => {
            gsap.to(el, {
                duration: 1,
                y: 0,
                opacity: 1,
            })
        }

        return { beforeEnter, enter, beforeEnter2, enter2 }
    }

}
</script>

<style>
    .parent {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 0.2fr repeat(4, 1fr);
        grid-column-gap: 0px;
        grid-row-gap: 0px;

        height: 100vh;
    }

    .div1 { 
        grid-area: 1 / 1 / 6 / 2; 
        /* background-color: rgb(183, 175, 175); */
         z-index: 2;
    }

    .div2 { 
        grid-area: 1 / 2 / 2 / 6; 
        /* background-color: rgb(141, 136, 136); */
        display: flex;
        justify-content: space-around;
         z-index: 2;
    }
    .div2 a {
        color: white;
        text-decoration: none;
    }

    .div3 { 
        grid-area: 2 / 2 / 4 / 6; 
        /* background-color: rgb(227, 181, 181); */
        font-size: 4vw;
        text-align: left;
        z-index: 2;
    }

    .div4 { 
        grid-area: 4 / 1 / 6 / 2; 
        /* background-color: rgb(165, 124, 124); */
         z-index: 2;
    }
    .div4__year { 
        transform: rotate(-90deg);
        font-size: 7vw;
    }

    .div5 { 
        grid-area: 4 / 2 / 6 / 6; 
        /* background-color: rgb(255, 227, 227); */
        z-index: 2;
    }
    .div5__gps{
        text-align: left;
        font-size: 2vw;
    }
</style>
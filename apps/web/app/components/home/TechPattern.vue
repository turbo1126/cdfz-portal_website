<script setup lang="ts">
defineProps<{
  variant: 'platform' | 'products' | 'capability' | 'trust' | 'news'
}>()
</script>

<template>
  <div class="tech-pattern" :class="`tech-pattern--${variant}`" aria-hidden="true">
    <span class="tech-grid" />
    <span class="tech-orbit tech-orbit--outer" />
    <span class="tech-orbit tech-orbit--middle" />
    <span class="tech-orbit tech-orbit--inner" />
    <span class="tech-axis tech-axis--horizontal" />
    <span class="tech-axis tech-axis--vertical" />
    <i class="tech-node tech-node--one" />
    <i class="tech-node tech-node--two" />
    <i class="tech-node tech-node--three" />
    <i class="tech-node tech-node--four" />
  </div>
</template>

<style scoped>
.tech-pattern {
  --tech-line: rgba(23, 105, 224, .085);
  --tech-line-strong: rgba(23, 105, 224, .16);
  --tech-node: rgba(23, 105, 224, .55);
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.tech-grid {
  position: absolute;
  width: 620px;
  height: 620px;
  background-image:
    linear-gradient(var(--tech-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--tech-line) 1px, transparent 1px);
  background-size: 44px 44px;
  -webkit-mask-image: radial-gradient(circle, #000 10%, rgba(0, 0, 0, .85) 42%, transparent 74%);
  mask-image: radial-gradient(circle, #000 10%, rgba(0, 0, 0, .85) 42%, transparent 74%);
  transform: rotate(8deg);
}

.tech-orbit {
  position: absolute;
  border: 1px solid var(--tech-line);
  border-radius: 50%;
}

.tech-orbit--outer { width: 760px; height: 760px; }
.tech-orbit--middle { width: 520px; height: 520px; border-color: var(--tech-line-strong); }
.tech-orbit--inner { width: 270px; height: 270px; }

.tech-axis {
  position: absolute;
  background: linear-gradient(90deg, transparent, var(--tech-line-strong), transparent);
}

.tech-axis--horizontal { width: 650px; height: 1px; }
.tech-axis--vertical { width: 1px; height: 430px; background: linear-gradient(transparent, var(--tech-line-strong), transparent); }

.tech-node {
  position: absolute;
  width: 6px;
  height: 6px;
  border: 1px solid rgba(255, 255, 255, .75);
  border-radius: 50%;
  background: var(--tech-node);
  box-shadow: 0 0 0 5px var(--tech-line), 0 0 22px var(--tech-line-strong);
}

.tech-node::after {
  position: absolute;
  top: 50%;
  left: 12px;
  width: 72px;
  height: 1px;
  content: '';
  background: linear-gradient(90deg, var(--tech-line-strong), transparent);
}

.tech-pattern--platform .tech-grid { bottom: -230px; left: -170px; }
.tech-pattern--platform .tech-orbit--outer { top: -480px; right: -210px; }
.tech-pattern--platform .tech-orbit--middle { top: -325px; right: -90px; }
.tech-pattern--platform .tech-orbit--inner { top: -145px; right: 35px; }
.tech-pattern--platform .tech-axis--horizontal { top: 205px; right: -110px; }
.tech-pattern--platform .tech-axis--vertical { top: 25px; right: 260px; }
.tech-pattern--platform .tech-node--one { top: 202px; right: 257px; }
.tech-pattern--platform .tech-node--two { right: 8%; bottom: 15%; }
.tech-pattern--platform .tech-node--three { bottom: 9%; left: 16%; }
.tech-pattern--platform .tech-node--four { top: 27%; left: 4%; }

.tech-pattern--products .tech-grid { top: -220px; right: -90px; }
.tech-pattern--products .tech-orbit--outer { right: -180px; bottom: -570px; }
.tech-pattern--products .tech-orbit--middle { right: -45px; bottom: -405px; }
.tech-pattern--products .tech-orbit--inner { right: 105px; bottom: -220px; }
.tech-pattern--products .tech-axis--horizontal { top: 225px; right: -50px; }
.tech-pattern--products .tech-axis--vertical { top: 58px; right: 315px; }
.tech-pattern--products .tech-node--one { top: 222px; right: 312px; }
.tech-pattern--products .tech-node--two { top: 14%; left: 6%; }
.tech-pattern--products .tech-node--three { right: 12%; bottom: 23%; }
.tech-pattern--products .tech-node--four { bottom: 9%; left: 42%; }

.tech-pattern--capability {
  --tech-line: rgba(101, 158, 255, .075);
  --tech-line-strong: rgba(101, 158, 255, .18);
  --tech-node: rgba(101, 158, 255, .75);
}
.tech-pattern--capability .tech-grid { top: -170px; left: -180px; width: 820px; height: 820px; background-size: 54px 54px; }
.tech-pattern--capability .tech-orbit--outer { top: -390px; left: -260px; }
.tech-pattern--capability .tech-orbit--middle { top: -235px; left: -110px; }
.tech-pattern--capability .tech-orbit--inner { top: -65px; left: 55px; }
.tech-pattern--capability .tech-axis--horizontal { right: 4%; bottom: 24%; width: 760px; }
.tech-pattern--capability .tech-axis--vertical { top: 8%; right: 34%; height: 620px; }
.tech-pattern--capability .tech-node--one { top: 22%; right: 34%; }
.tech-pattern--capability .tech-node--two { top: 12%; right: 8%; }
.tech-pattern--capability .tech-node--three { right: 18%; bottom: 24%; }
.tech-pattern--capability .tech-node--four { bottom: 13%; left: 9%; }

.tech-pattern--trust .tech-grid { top: -255px; right: 2%; }
.tech-pattern--trust .tech-orbit--outer { top: -600px; left: 19%; }
.tech-pattern--trust .tech-orbit--middle { top: -440px; left: 27%; }
.tech-pattern--trust .tech-orbit--inner { top: -255px; left: 36%; }
.tech-pattern--trust .tech-axis--horizontal { right: 0; bottom: 62px; }
.tech-pattern--trust .tech-axis--vertical { top: -100px; right: 17%; }
.tech-pattern--trust .tech-node--one { right: 17%; bottom: 59px; }
.tech-pattern--trust .tech-node--two { top: 19%; left: 5%; }
.tech-pattern--trust .tech-node--three { right: 4%; bottom: 25%; }
.tech-pattern--trust .tech-node--four { bottom: 11%; left: 31%; }

.tech-pattern--news .tech-grid { top: 70px; left: -240px; }
.tech-pattern--news .tech-orbit--outer { top: -510px; right: -180px; }
.tech-pattern--news .tech-orbit--middle { top: -350px; right: -40px; }
.tech-pattern--news .tech-orbit--inner { top: -165px; right: 95px; }
.tech-pattern--news .tech-axis--horizontal { top: 235px; right: -80px; }
.tech-pattern--news .tech-axis--vertical { top: 40px; right: 310px; }
.tech-pattern--news .tech-node--one { top: 232px; right: 307px; }
.tech-pattern--news .tech-node--two { top: 35%; left: 7%; }
.tech-pattern--news .tech-node--three { right: 9%; bottom: 21%; }
.tech-pattern--news .tech-node--four { bottom: 8%; left: 45%; }

@media (max-width: 767px) {
  .tech-pattern { opacity: .72; }
  .tech-grid { width: 430px; height: 430px; background-size: 36px 36px; }
  .tech-orbit--outer { width: 480px; height: 480px; }
  .tech-orbit--middle { width: 330px; height: 330px; }
  .tech-orbit--inner { width: 170px; height: 170px; }
  .tech-axis--horizontal { width: 360px; }
  .tech-axis--vertical { height: 300px; }
  .tech-node--four { display: none; }
  .tech-pattern--platform .tech-grid { bottom: -120px; left: -210px; }
  .tech-pattern--products .tech-grid { top: -145px; right: -230px; }
  .tech-pattern--products .tech-orbit--outer { right: -300px; bottom: -305px; }
  .tech-pattern--products .tech-orbit--middle { right: -190px; bottom: -205px; }
  .tech-pattern--products .tech-orbit--inner { right: -75px; bottom: -100px; }
  .tech-pattern--capability .tech-grid { top: -80px; left: -250px; width: 560px; height: 560px; }
  .tech-pattern--trust .tech-grid { top: -190px; right: -230px; }
  .tech-pattern--news .tech-grid { top: 180px; left: -270px; }
}
</style>

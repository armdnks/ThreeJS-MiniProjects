import gsap, { ScrollTrigger } from "gsap";

export default function scrollAnimationMobile(position, target) {
  /**
   * ### Reset Scroll Position
   * @url https://greensock.com/forums/topic/30154-reset-scrolltrigger-on-refresh/#comment-150522
   * @note invoke before gsap register plugin
   */

  ScrollTrigger.clearScrollMemory();
  window.history.scrollRestoration = "manual";

  gsap.registerPlugin(ScrollTrigger);

  const timeline = gsap.timeline();

  timeline
    // Scene 1
    .to(position, {
      x: 5,
      y: 0.5,
      z: 5,
      ease: "power3.linear",
      scrollTrigger: {
        trigger: ".section-one",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
    })
    .to(target, {
      x: 0,
      y: 0,
      z: 0.25,
      ease: "power3.linear",
      scrollTrigger: {
        trigger: ".section-one",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
    })
    .to(".section-zero-info", {
      opacity: 0,
      ease: "power3.linear",
      scrollTrigger: {
        trigger: ".section-one",
        start: "top 95%",
        end: "top 90%",
        scrub: true,
        immediateRender: false,
      },
    })
    // Scene 2
    .to(position, {
      x: 2,
      y: 0.25,
      z: -5,
      ease: "power3.linear",
      scrollTrigger: {
        trigger: ".section-two",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
    })
    .to(target, {
      x: -0.25,
      y: 0,
      z: 0,
      ease: "power3.linear",
      scrollTrigger: {
        trigger: ".section-two",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
    })
    // Scene 3
    .to(position, {
      x: -6,
      y: 0.5,
      z: -4,
      ease: "power3.linear",
      scrollTrigger: {
        trigger: ".section-three",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
    })
    .to(target, {
      x: 0,
      y: 0,
      z: 0,
      ease: "power3.linear",
      scrollTrigger: {
        trigger: ".section-three",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
    })
    // Scene 4
    .to(position, {
      x: 0,
      y: 0.25,
      z: 7,
      ease: "power3.linear",
      scrollTrigger: {
        trigger: ".section-four",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
    })
    .to(target, {
      x: 0,
      y: 0,
      z: 0,
      ease: "power3.linear",
      scrollTrigger: {
        trigger: ".section-four",
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false,
      },
    });
}

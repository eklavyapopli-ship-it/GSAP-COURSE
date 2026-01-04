"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Cinzel } from "next/font/google";
const cinzel = Cinzel({
  subsets: ['latin'], 
  weight: ['400', '700'], 
  variable: '--font-cinzel', 
});
const Hero = () => {
 const videoRef = useRef();
 const isMobile = useMediaQuery({ maxWidth: 767 });

 useGSAP(() => {
	const heroSplit = new SplitText(".title", {
	 type: "chars, words",
	});
	
	const paragraphSplit = new SplitText(".subtitle", {
	 type: "lines",
	});
	
	// Apply text-gradient class once before animating
	heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
	
	gsap.from(heroSplit.chars, {
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	});
	
	gsap.from(paragraphSplit.lines, {
	 opacity: 0,
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	 delay: 1,
	});
	
	gsap
	.timeline({
	 scrollTrigger: {
		trigger: "#hero",
		start: "top top",
		end: "bottom top",
		scrub: true,
	 },
	})
	.to(".right-leaf", { y: 200 }, 0)
	.to(".left-leaf", { y: -200 }, 0)
	.to(".arrow", { y: 100 }, 0);
	
	const startValue = isMobile ? "top 50%" : "center 60%";
	const endValue = isMobile ? "120% top" : "bottom top";
	
	let tl = gsap.timeline({
	 scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true,
		pin: true,
	 },
	});
	
	videoRef.current.onloadedmetadata = () => {
	 tl.to(videoRef.current, {
		currentTime: videoRef.current.duration,
	 });
	};
 }, []);
 return (
	<>
	 <section id="hero" >
		<h1 className={`${cinzel.className} text-[60px] md:text-[120px] text-center font-semibold `}>CodeFest</h1>
		
		
		
		<div className="body">
		 
		 <div className="content">
			<div className="space-y-5 hidden md:block">
			 <p>Cool. Crisp. Classic.</p>
			 <p className="subtitle">
				Grab your Coffees and<br /> Code
			 </p>
			</div>
			
			<div className="view-cocktails">
			 <p className="subtitle">
				CodeFest 2.0 brings together ideas, innovation, and code — a playground for thinkers, builders, and future tech leaders.
			 </p>
			</div>
		 </div>
		</div>
	 </section>
	 
 <div className="video absolute inset-0">
		<video
		 ref={videoRef}
		 muted
		 playsInline
		 preload="auto" className="w-full object-cover h-full"
		 src="/videos/tes.mp4"
		/>
	 </div>
	</>
 );
 
};

export default Hero;
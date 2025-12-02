import {useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";


const FONT_WEIGHTS = {
    subtitle: {min: 100, max: 400, default: 100},
    title: {min: 400, max: 900, default: 400},
}

const renderText = (text: string, className: string | undefined, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span key={i} className={className} style={{fontVariationSettings: `'wght' ${baseWeight}`}}>
            {char === " " ? "\u00A0" : char}
        </span>
    ))
}

const setupTextHover = (
    container: HTMLElement | null,
    type: keyof typeof FONT_WEIGHTS
): (() => void) | undefined => {
    if (!container) return undefined;

    const letters = container.querySelectorAll("span") as NodeListOf<HTMLElement>;

    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (letter: HTMLElement, weight: number, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `'wght' ${weight}`,
        });
    };

    const handleMouseMove = (e: MouseEvent) => {
        const { left } = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l, width: w } = letter.getBoundingClientRect();
            const distance = Math.abs(mouseX - (l - left + w / 2));
            const intensity = Math.exp(-(distance ** 2) / 20000);

            animateLetter(letter, min + (max - min) * intensity);
        });
    };

    const handleMouseLeave = () =>
        letters.forEach((letter) => animateLetter(letter, base, 0.3));

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
}

const Welcome = () => {
    const titleRef = useRef<HTMLElement | null>(null)
    const subtitleRef = useRef<HTMLElement | null>(null)

    useGSAP(()=> {
        
        const titleCleanup = setupTextHover(titleRef.current, 'title');
        const subtitleCleanup = setupTextHover(subtitleRef.current, 'subtitle')

        return () => {
            if (subtitleCleanup) subtitleCleanup();
            if (titleCleanup) titleCleanup();
        }
    })

    return (
        <section id="welcome">
            <p ref={subtitleRef}>{renderText("Hello user! Welcome to",'text-3xl font-georama', 100)}</p>
            <h1 ref={titleRef} className="mt-7">{renderText("Akshith's PC", 'text-8xl italic font-georama')}</h1>
            <div className="small-screen">
                <p>
                    This website is designed for desktop/tablet screens only.
                </p>
            </div>
        </section>
    )
}
export default Welcome

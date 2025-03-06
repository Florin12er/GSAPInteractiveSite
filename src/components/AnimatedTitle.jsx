import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import clsx from "clsx";

const AnimatedTitle = ({title, containerClass}) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "100 bottom",
                    end: "center bottom",
                    toggleActions: "play none none reverse",
                },
            });
            titleAnimation.to(".animated-word", {
                opacity: 1,
                transform: "translate3d(0,0,0) rotateX(0deg) rotateY(0deg)",
                ease: "power2.inOut",
                stagger: 0.02,
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={clsx("animated-title", containerClass)}>
            {title.split("<br/>").map((line, index) => (
                <div
                    key={index}
                    className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
                >
                    {line.split().map((word, i) => {
                        // Corrected line.split(" ")
                        return (
                            // Added return here to render the span element
                            <span
                                key={i}
                                className="animated-word"
                                dangerouslySetInnerHTML={{__html: word}}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

import PropTypes from "prop-types";

AnimatedTitle.propTypes = {
    title: PropTypes.string.isRequired,
    containerClass: PropTypes.string,
};

export default AnimatedTitle;

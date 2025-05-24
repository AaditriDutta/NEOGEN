import React from 'react' // import React
import { AnimatePresence, motion as m } from "framer-motion" // import framer-motion

// Animation wrapper component
const AnimationWrapper = ({ children }) => {
    return (
        <AnimatePresence mode='wait' initial={true}> {/* handle exit animations */}
            <m.div
                initial={{ opacity: 0, y: 25 }} // start hidden + offset
                animate={{ opacity: 1, y: 0 }} // animate to visible
                exit={{ opacity: 1, y: 25 }} // exit animation
                transition={{
                    delay: 0.30, // slight delay
                    type: "easeInOut", // smooth easing
                    duration: 0.7 // animation duration
                }}
            >
                {children} {/* render child components */}
            </m.div>
        </AnimatePresence>
    )
}

export default AnimationWrapper; // export component
/**
 * AnimationWrapper.jsx
 * ---------------------
 * This React component wraps its children with entry/exit animations using Framer Motion.
 * 
 * ✅ Imports React and Framer Motion (AnimatePresence + motion)
 * ✅ Uses <AnimatePresence> to allow exit animations on route change
 * ✅ Applies motion to a <div> with:
 *    - initial: fade-in with vertical offset
 *    - animate: fade to visible + slide into position
 *    - exit: maintain opacity but slide out
 * ✅ Adds smooth transition (easeInOut, 0.7s, with 0.3s delay)
 * ✅ Designed to be reusable for animating page transitions or sections
 */


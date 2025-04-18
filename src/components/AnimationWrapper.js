import React from 'react'
import { AnimatePresence, motion as m } from "framer-motion"
const AnimationWrapper = ({ children }) => {
    return (
        <AnimatePresence mode='wait' initial={true}>
            <m.div
                initial={{opacity: 0, y:25}}
                animate={{opacity:1, y:0}}
                exit={{opacity: 1, y: 25}}
                transition={{delay: 0.30, type: "easeInOut", duration:0.7}}
            >
                {children}
            </m.div>
        </AnimatePresence>
    )
}

export default AnimationWrapper;
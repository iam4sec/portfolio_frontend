"use client"

import { motion } from "framer-motion"

const SectionWrapper = (Component: React.ComponentType<any>, idName: string) =>
  function HOC(props: any) {
    return (
      <motion.section
        id={idName}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              duration: 1.25,
            },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative"
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>
        <Component {...props} />
      </motion.section>
    )
  }

export default SectionWrapper

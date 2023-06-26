import { motion, useMotionValue, useTransform } from 'framer-motion'

const App: React.FC = function () {
  const borderRadius = useMotionValue('0%')
  const backgroundColor = useTransform(borderRadius, latest => {
    return `hsl(${10 + +latest.slice(0, -1) * 2}, ${latest}, ${
      10 + +latest.slice(0, -1)
    }%)`
  })
  return (
    <motion.div
      animate={{
        scale: [1, 2, 2, 1, 2],
        rotate: [0, 180, 270, 180, 360],
        borderRadius: ['0%', '50%', '30%', '50%', '0%'],
        transition: {
          duration: 2,
          times: [0, 0.2, 0.4, 0.8, 1],
          repeat: Infinity,
          repeatType: 'reverse',
        },
      }}
      style={{ borderRadius, backgroundColor }}
      className="shape"
    ></motion.div>
  )
}

export default App

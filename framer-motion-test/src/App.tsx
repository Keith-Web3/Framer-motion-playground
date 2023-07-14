import { motion, useMotionValue, useTransform, Reorder } from 'framer-motion'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'

// const App: React.FC = function () {
//   const borderRadius = useMotionValue('0%')
//   const backgroundColor = useTransform(borderRadius, latest => {
//     return `hsl(${10 + +latest.slice(0, -1) * 2}, ${latest}, ${
//       10 + +latest.slice(0, -1)
//     }%)`
//   })
//   return (
//     <motion.div
//       key={uuid()}
//       animate={{
//         scale: [1, 1.3, 1.3, 1, 1.3],
//         rotate: [0, 180, 270, 180, 360],
//         borderRadius: ['0%', '50%', '30%', '50%', '0%'],
//         transition: {
//           duration: 2,
//           times: [0, 0.2, 0.4, 0.8, 1],
//           repeat: Infinity,
//           repeatType: 'reverse',
//         },
//       }}
//       style={{ borderRadius, backgroundColor }}
//       className="shape"
//     ></motion.div>
//   )
// }
const arr = [1]
console.log(arr.slice(0, -1))
const data = {
  one: ['one1', 'one2', 'one3'],
  two: ['two1', 'two2', 'two3'],
  three: ['three1', 'three2', 'three3'],
}
const App: React.FC = function () {
  const [values, setValues] = useState<(string | false)[]>([
    ...data.one,
    false,
    ...data.two,
    false,
    ...data.three,
  ])

  const compValues = values.map((el, idx) =>
    el === false ? 'reorder-separator' + idx : el
  )
  function setReorder(vals: (string | false)[]) {
    console.log(vals)
    setValues(vals)
  }

  return (
    <Reorder.Group
      values={compValues}
      onReorder={setReorder}
      as="div"
      className="group"
    >
      {compValues
        .reduce((acc: string[][], curr) => {
          if (curr.slice(0, 17) !== 'reorder-separator') {
            return [
              ...acc.slice(0, -1),
              [
                ...(acc.at(-1) || []),
                <Reorder.Item drag as="p" value={curr} key={curr}>
                  {curr}
                </Reorder.Item>,
              ],
            ]
          }
          return [...(acc.length > 1 ? acc : [acc[0]]), [curr], []]
        }, [])
        .map((el, idx) => (
          <div
            key={idx}
            className={typeof el[0] === 'string' ? `${el}` : 'reorder'}
          >
            {typeof el[0] === 'string' ? (
              <Reorder.Item drag={false} as="p" value={el[0]} key={el[0]}>
                {el[0]}
              </Reorder.Item>
            ) : (
              el
            )}
          </div>
        ))}
    </Reorder.Group>
  )
}

export default App

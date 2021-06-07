import React from "react"
import { BounceLoader } from "react-spinners"

interface Props {
  style?: React.CSSProperties
}

const Spinner = ({ style }: Props) => {
  return (
    <div style={style}>
      <BounceLoader size={60} loading color="#152e4d" />
    </div>
  )
}

export default Spinner
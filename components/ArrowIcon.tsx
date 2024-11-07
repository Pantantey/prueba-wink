import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ArrowIcon(props: any) {
  return (
    <Svg
      width={7}
      height={12}
      viewBox="0 0 7 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M.875 11.125A.72.72 0 01.65 10.6c0-.2.075-.375.225-.525L4.95 6 .875 1.925A.72.72 0 01.65 1.4c0-.2.075-.375.225-.525A.72.72 0 011.4.65c.2 0 .375.075.525.225l4.5 4.5a.825.825 0 01.188.287.943.943 0 010 .675.823.823 0 01-.188.288l-4.5 4.5a.72.72 0 01-.525.225.72.72 0 01-.525-.225z"
        fill="#4C51F7"
      />
    </Svg>
  )
}

export default ArrowIcon
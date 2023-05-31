import { FC } from "react"
import useWindowDimensions from "../../hook/useWindowDimension"


interface ThreadPointsBarProps {
      points: number
      responseCount?: number
}

const ThreadPointsBar: FC<ThreadPointsBarProps> = ({ points, responseCount }) => {
      const { width } = useWindowDimensions()
      
}
import React, { FC, memo } from 'react'
import {
  TargetContent,
  CornersTopContent,
  CornersBottomContent,
  LeftTopCorner,
  RightTopCorner,
  LeftBottomCorner,
  RightBottomCorner
} from './styles'

const Target: FC = () => {
  return (
    <TargetContent>
      <CornersTopContent>
        <LeftTopCorner />
        <RightTopCorner />
      </CornersTopContent>
      <CornersBottomContent>
        <LeftBottomCorner />
        <RightBottomCorner />
      </CornersBottomContent>
    </TargetContent>
  )
}

export default memo(Target)
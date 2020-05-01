import React from 'react'
import { SliderItem, GetTrackProps } from 'react-compound-slider'
interface ITrackProps {
  source: SliderItem
  target: SliderItem
  getTrackProps: GetTrackProps
}
export const Track: React.FC<ITrackProps> = ({ source, target, getTrackProps }) => {
  return (
    <div
      style={{
        position: 'absolute',
        height: 14,
        zIndex: 1,
        backgroundColor: '#7aa0c4',
        borderRadius: 7,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

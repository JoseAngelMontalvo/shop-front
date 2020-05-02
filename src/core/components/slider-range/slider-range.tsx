import React, { useState } from 'react'
import { bind } from '../../utils/bind'
import styles from './slider-range.module.css'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { Handle } from './handle'
import { Track } from './track'
import { Tick } from './tick'
import { QueryContext } from '../main-template/main-template'

const cx = bind(styles)
const sliderStyle: React.CSSProperties = {
  margin: '5%',
  position: 'relative',
  width: '90%',
}

const railStyle: React.CSSProperties = {
  position: 'absolute',
  width: '100%',
  height: 14,
  borderRadius: 7,
  cursor: 'pointer',
  backgroundColor: 'rgb(155,155,155)',
}
interface Props {
  changeRange(range: number[]): void
}
const domain: number[] = [0, 5000]
export const SliderRange: React.FC<Props> = ({ changeRange }) => {
  const [state, setState] = useState([0, 5000])

  const onChange: any = (values: number[]) => {
    if (isNaN(values[1])) {
      setState([state[0], 0])
      changeRange([state[0], 0])
    } else if (isNaN(values[0])) {
      setState([0, state[1]])
      changeRange([0, state[1]])
    } else {
      setState(values)
      changeRange(values)
    }
  }

  return (
    <QueryContext.Consumer>
      {({ setRangePrice, rangePrice }) => (
        <>
          <div style={{ height: 100, width: '100%' }}>
            <Slider
              mode={1}
              step={1}
              domain={domain}
              rootStyle={sliderStyle}
              onChange={onChange}
              values={rangePrice}
            >
              <Rail>{({ getRailProps }) => <div style={railStyle} {...getRailProps()} />}</Rail>
              <Handles>
                {({ handles, getHandleProps }) => (
                  <div className="slider-handles">
                    {handles.map((handle) => (
                      <Handle
                        key={handle.id}
                        handle={handle}
                        domain={domain}
                        getHandleProps={getHandleProps}
                      />
                    ))}
                  </div>
                )}
              </Handles>
              <Tracks left={false} right={false}>
                {({ tracks, getTrackProps }) => (
                  <div className="slider-tracks">
                    {tracks.map(({ id, source, target }) => (
                      <Track
                        key={id}
                        source={source}
                        target={target}
                        getTrackProps={getTrackProps}
                      />
                    ))}
                  </div>
                )}
              </Tracks>
              <Ticks count={10}>
                {({ ticks }) => (
                  <div className="slider-ticks">
                    {ticks.map((tick) => (
                      <Tick key={tick.id} tick={tick} count={ticks.length} />
                    ))}
                  </div>
                )}
              </Ticks>
            </Slider>
          </div>
          <div className={cx('fields-range')}>
            <div className={cx('input-range-content')}>
              <label className={cx('label-input-range')} htmlFor={'min-range'}>
                Desde
              </label>
              <input
                className={cx('input-range')}
                type="text"
                value={rangePrice[0]}
                name={'min-range'}
                id={'min-range'}
                onChange={(event) => {
                  onChange([parseInt(event.target.value), rangePrice[1]])
                }}
              />
            </div>
            <div className={cx('input-range-content')}>
              <label className={cx('label-input-range')} htmlFor={'max-range'}>
                Hasta
              </label>
              <input
                className={cx('input-range')}
                type={'text'}
                value={rangePrice[1]}
                name={'max-range'}
                id={'max-range'}
                onChange={(event) => {
                  onChange([rangePrice[0], parseInt(event.target.value)])
                }}
              />
            </div>
          </div>
        </>
      )}
    </QueryContext.Consumer>
  )
}

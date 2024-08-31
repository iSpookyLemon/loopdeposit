import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import WaveSurfer from 'wavesurfer.js';
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa'
import styled from 'styled-components'
import { Box, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useWaveform } from 'hooks/posts';

export default function Waveform({ audio }) {
  const containerRef = useRef()
  const waveSurferRef = useRef()

  const [isPlaying, toggleIsPlaying] = useState(false)
  const [isLoading, setLoading] = useState(true)

  //console.log(audio);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      cursorWidth: 0,
      progressColor: "teal",
      height: "auto"
    })
    waveSurfer.load(audio)
    waveSurfer.on('ready', () => {
      waveSurferRef.current = waveSurfer
      setLoading(false);
    })
    waveSurfer.on('finish', () => {
      toggleIsPlaying(false);
    })

    return () => {
      waveSurfer.destroy()
    }
  }, [audio])

  return (
    <Grid h="80px" templateColumns="60px 1fr">
      {!isLoading &&
        <Flex>
          <button
            onClick={() => {
              waveSurferRef.current.playPause()
              toggleIsPlaying(!isPlaying)
            }}
            type="button"
          >
            
            {isPlaying ? <FaPauseCircle size="3em" /> : <FaPlayCircle size="3em" />}
          </button>
        </Flex>
      }
      <div ref={containerRef}/>
    </Grid>
  )
}

Waveform.propTypes = {
    audio: PropTypes.string.isRequired,
}

/*
export default function Waveform({ audio }) {


  const waveSurferRef = useRef({
    isPlaying: () => false,
  })

  const { containerRef, waveSurferRef, isPlaying, toggleIsPlaying } = useWaveform(audio);

  //console.log(audio);

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: containerRef.current,
      responsive: true,
      cursorWidth: 0,
      progressColor: "teal",
    })
    waveSurfer.load(audio)
    waveSurfer.on('ready', () => {
      waveSurferRef.current = waveSurfer
    })
    waveSurfer.on('finish', () => {
      toggleIsPlaying(!isPlaying)
    })

    return () => {
      waveSurfer.destroy()
    }
  }, [audio])


  return (
    <Grid templateColumns="60px 1fr">
      <Flex>
        <button
          onClick={() => {
            waveSurferRef.current.playPause()
            toggleIsPlaying(!isPlaying)
          }}
          type="button"
        >

          {isPlaying ? <FaPauseCircle size="3em" /> : <FaPlayCircle size="3em" />}
        </button>
      </Flex>
      <div ref={containerRef}/>
    </Grid>
  )
}

Waveform.propTypes = {
    audio: PropTypes.string.isRequired,
}
*/
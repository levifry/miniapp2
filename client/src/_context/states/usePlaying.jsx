import { useState } from 'react'

const usePlaying = () => {

  const [playing, setPlayingState] = useState(false)

  const setPlaying = (bool) => {
    setPlayingState(bool)
  }

  return { playing, setPlaying }

}

export default usePlaying
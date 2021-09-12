<script>

import { audio_src, audio_paused } from '../stores/audio';

let audio
let currentTime
let duration
let presetVolume = 0.8

function audioEnded() {return};

</script>

<audio
  style="display:none;"
  bind:this="{audio}"
  src="{$audio_src}"
  on:timeupdate="{(e) => (currentTime = e.currentTarget.currentTime)}"
  on:durationchange="{(e) => (duration = e.currentTarget.duration)}"
  on:ended="{audioEnded}"
  bind:paused="{$audio_paused}"
  volume="{presetVolume}"
  controls
><track kind="captions" /></audio>
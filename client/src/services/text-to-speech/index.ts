const synth = window.speechSynthesis;

let voice: SpeechSynthesisVoice;

function textToSpeech(text: string) {
  // FIXME: improve the way to obtain the voice
  voice = voice
    || synth.getVoices().find(voice => voice.voiceURI.includes('English United Kingdom'))
    || synth.getVoices().find(voice => voice.voiceURI.includes('UK English Female'))
    || synth.getVoices().find(voice => voice.lang === 'en_GB')
    || synth.getVoices().find(voice => voice.lang === 'en-GB')
    || synth.getVoices().find(voice => voice.lang.includes('en-'))
    || synth.getVoices().find(voice => voice.lang.includes('en_'))

  if (!voice) {
    console.error('No voice found')
    return
  }

  if (synth.speaking) synth.cancel()

  if (!text.length) return

  const speechInstance = new SpeechSynthesisUtterance(text);
  speechInstance.voice = voice!
  synth.speak(speechInstance)
}

export default textToSpeech
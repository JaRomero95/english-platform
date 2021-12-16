const synth = window.speechSynthesis;

const voice = synth.getVoices().find(voice => voice.voiceURI.includes('UK English Female'))

function textToSpeech(text: string) {
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
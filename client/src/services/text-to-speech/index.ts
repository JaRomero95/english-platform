const synth = window.speechSynthesis;

let voice: SpeechSynthesisVoice;

function textToSpeech(text: string) {
  voice = voice || synth.getVoices().find(voice => voice.voiceURI.includes('UK English Female'))

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
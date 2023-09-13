"use client"
import React, { useState, useEffect } from 'react'
import 'regenerator-runtime/runtime'
import axios from "axios";
import SpeechRecognition, {
    useSpeechRecognition
} from 'react-speech-recognition'

export default function Home() {
  const [isSend, setIsSend] = useState(false);
  const [response, setResponse] = useState("");
  const [speechRecognitionSupported, setSpeechRecognitionSupported] =
    useState(null) // null or boolean

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  useEffect(() => {
    // sets to true or false after component has been mounted
    setSpeechRecognitionSupported(browserSupportsSpeechRecognition) 
  }, [browserSupportsSpeechRecognition])

  useEffect(() => {
    if (isSend) {
      console.log({ transcript });
      axios
        .post("http://localhost:3000/api/gpt", {
          text: transcript,
        })
        .then((response) => {
          // Lida com a resposta da requisição aqui
          const textresponse = response.data;
          console.log("Resposta do servidor:", textresponse);
          setResponse(textresponse);
        })
        .catch((error) => {
          // Lida com erros da requisição aqui
          console.error("Erro na requisição:", error);
        });
      setIsSend(false);
    }
  }, [isSend])

  if (speechRecognitionSupported === null) return null // return null on first render, can be a loading indicator

  if (!speechRecognitionSupported) {
    return <span>Browser does not support speech recognition.</span>
  }

  const startListening = () => {
    SpeechRecognition.startListening({
      language: "pt-BR",
      continuous: true,
    })
  }

  const stopListening = () => {
    SpeechRecognition.stopListening()
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <button onClick={() => {
        setIsSend(true)
        setResponse("")
      }}>
        Formatar Texto
      </button>
      <p>{transcript}</p>
      {response && <p>Texto formatado: {response}</p>}
    </div>
  )
}
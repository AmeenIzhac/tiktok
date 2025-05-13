import React, { useState, useRef } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';

const recorder = new MicRecorder({ bitRate: 128 });

const Transcriber: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const socketRef = useRef<WebSocket | null>(null);

  const startRecording = async () => {
    await recorder.start();
    setIsRecording(true);

    socketRef.current = new WebSocket('ws://localhost:3001'); // backend WebSocket

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.transcript) {
        setTranscript(prev => prev + ' ' + data.transcript);
      }
    };

    const interval = setInterval(async () => {
      const [buffer, blob] = await recorder.stop().getMp3();
      recorder.start(); // immediately restart for next chunk

      const arrayBuffer = await blob.arrayBuffer();
      socketRef.current?.send(arrayBuffer);
    }, 5000); // Send every 5s

    (socketRef.current as any).interval = interval;
  };

  const stopRecording = () => {
    clearInterval((socketRef.current as any)?.interval);
    recorder.stop();
    setIsRecording(false);
    socketRef.current?.close();
  };

  return (
    <div>
      <h2>Whisper Live Transcriber</h2>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? 'Stop' : 'Start'} Recording
      </button>
      <p><strong>Transcript:</strong> {transcript}</p>
    </div>
  );
};

export default Transcriber;

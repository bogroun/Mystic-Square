// This utility uses the Web Audio API to generate a simple sound effect
// without needing to load an external audio file.

let audioCtx: AudioContext | null = null;

// Initialize the AudioContext. This must be done after a user interaction
// (like a click or keypress) to comply with browser autoplay policies.
export const initializeAudio = () => {
    if (window.AudioContext || (window as any).webkitAudioContext) {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }
};

// Plays a short, clicking sound effect for when a tile is moved.
export const playTileMoveSound = () => {
    if (!audioCtx) {
        return; 
    }

    // Create an oscillator and a gain node
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Connect the nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Configure the sound
    oscillator.type = 'sine'; // A simple wave type
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

    // Create a short decay for the "click" effect
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
    
    // Play and then stop the sound
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + 0.2);
};

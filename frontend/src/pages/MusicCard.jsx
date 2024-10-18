import React, { useState, useRef, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';

const MusicCard = ({ music }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [isLiked, setIsLiked] = useState(false); 
    const audioRef = useRef(null);

    const handlePlay = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleSeek = (e) => {
        const seekTime = (e.nativeEvent.offsetX / e.target.clientWidth) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
    };

    const toggleLike = () => {
        setIsLiked(!isLiked);
    };

    useEffect(() => {
        const updateTime = () => {
            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
            }
        };

        const audio = audioRef.current;
        audio.addEventListener('timeupdate', updateTime);
        return () => {
            audio.removeEventListener('timeupdate', updateTime);
        };
    }, [audioRef]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl relative">
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{music.title}</h3>
            <p className="text-gray-600"><strong>Composer:</strong> {music.composer}</p>
            <p className="text-gray-600"><strong>Record Label:</strong> {music.rLabel}</p>
            <p className="text-gray-600"><strong>Genre:</strong> {music.genre}</p>

            {/* Heart icon */}
            <FaHeart
                onClick={toggleLike}
                className={`absolute top-4 right-4 cursor-pointer transition-all ${
                    isLiked ? 'text-red-500' : 'text-gray-300'
                }`}
                size={24}
            />

            <div className="mt-4 relative">
                <audio
                    ref={audioRef}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    className="hidden"
                >
                    <source src={`/${music.audioTrack}`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>

                <button
                    onClick={handlePlay}
                    className={`flex items-center justify-center w-full py-2 text-white rounded-lg transition-all duration-300 ${
                        isPlaying ? 'bg-purple-500 hover:bg-purple-600' : 'bg-pink-500 hover:bg-pink-600'
                    }`}
                >
                    {isPlaying ? <span>Pause</span> : <span>Play</span>}
                </button>

                <div className="mt-2 flex justify-between text-gray-600">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(audioRef.current ? audioRef.current.duration : 0)}</span>
                </div>

                <div
                    className="mt-2 h-2 bg-gray-300 rounded cursor-pointer"
                    onClick={handleSeek}
                >
                    <div
                        className="h-full bg-black rounded"
                        style={{
                            width: `${(currentTime / (audioRef.current ? audioRef.current.duration : 1)) * 100}%`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default MusicCard;

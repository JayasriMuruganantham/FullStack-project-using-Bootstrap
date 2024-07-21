import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import './MusicHall.css';

const socket = io.connect("http://localhost:3001");

function MusicHall() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showMusicHall, setShowMusicHall] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("");
  const [playlist] = useState([
    "https://soundcloud.com/iebxdwg3hwgq/sets/sad-tamil",
    "https://soundcloud.com/insanegowtham/enakenna-yarum-ila",
    "https://soundcloud.com/user-871491427/ennai-kollathey",
    "https://soundcloud.com/abul-anirudh-fan/netru-naan-parthathum-jeeva-by",
    "https://soundcloud.com/maheshprasad/thalli-pogathe-full-song-a-r-rahman-achcham-yenbathu-madamaiyada",
    "https://soundcloud.com/ardrasree/kanavae-yun-hi-re-david-tamil",
    "https://soundcloud.com/game-fest-81112716/kadhal-oru-aagayam"
  ]);
  const [selectedTrack, setSelectedTrack] = useState("");

  const navigate = useNavigate();

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowMusicHall(true);
    }
  };

  const playMusic = (trackUrl) => {
    if (trackUrl !== "") {
      const musicData = {
        room: room,
        track: trackUrl,
      };

      socket.emit("play_music", musicData);
      setCurrentTrack(trackUrl);
      setSelectedTrack(trackUrl); // Update the selected track state
    }
  };

  useEffect(() => {
    socket.on("receive_music", (data) => {
      setCurrentTrack(data.track);
    });
  }, []);

  return (
    <div className="App">
      {!showMusicHall ? (
        <div className="joinRoomContainer">
          <h3>Join Music Room</h3>
          <input
            type="text"
            placeholder="Your Name"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room ID"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div className="musicHall">
          <h3>Room ID: {room}</h3>
          <div className="playlist">
            <h4>Playlist</h4>
            <ul>
              {playlist.map((track, index) => (
                <li key={index}>
                  <button onClick={() => playMusic(track)}>
                    Play {`Song ${index + 1}`}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="musicPlayer">
            <h4>Selected Track: {selectedTrack}</h4>
            {currentTrack && (
              <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                title={`SoundCloud player for ${selectedTrack}`} // Added title attribute
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(currentTrack)}&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
              ></iframe>
            )}
          </div>
          <br />
          <br />
          <button className="btn btn-secondary" onClick={() => navigate('/')}>
            Back to Homepage
          </button>
        </div>
      )}
    </div>
  );
}

export default MusicHall;




import { Route, Routes } from "react-router-dom";
import "./App.css";
import Forms from "./components/Forms";
import RoomPage from "./pages/RoomPage/RoomPage";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  // const [peers, setPeers] = useState({});
  // const [myPeer, setMyPeer] = useState(null);
  // const [openVideo, setOpenVideo] = useState(true);

  // const videoGrid = useRef(null);

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if (data.success) {
        console.log("userJoined");
        setUsers(data.users);
      } else {
        console.log("userJoined error");
      }
    });

    socket.on("allUsers", (data) => {
      setUsers(data);
    });

    socket.on("userJoinedMessageBroadcasted", (data) => {
      // console.log(`${data.name}  left the room`);
      toast.info(`${data.name} joined the room`);
      // if (peers[data.userId]) peers[data.userId].close();
    });

    socket.on("userLeftMessageBroadcasted", (data) => {
      toast.info(`${data.name} left the room`);
      // if (peers[data.userId]) peers[data.userId].close();
    });
  }, []);

  const uuid = () => {
    let S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  return (
    <div className="container">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={<Forms uuid={uuid} socket={socket} setUser={setUser} />}
        />
        <Route
          path="/:id"
          element={<RoomPage socket={socket} user={user} users={users} />}
        />
      </Routes>
    </div>
  );
};

export default App;

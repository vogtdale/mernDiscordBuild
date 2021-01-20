import { Avatar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CallIcon from "@material-ui/icons/Call";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import HeadsetIcon from "@material-ui/icons/Headset";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import MicIcon from "@material-ui/icons/Mic";
import SettingsIcon from "@material-ui/icons/Settings";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "./axios";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import "./Sidebar.css";
import SidebarChannel from "./SidebarChannel";

const pusher = new Pusher("45021814527a91c8a95f", {
  cluster: "eu",
});

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  const getChannelsName = () => {
    axios.get("/api/allchannels").then((res) => {
      console.log(res.data);
      setChannels(res.data);
    });
  };

  useEffect(() => {
    getChannelsName();

    const channel = pusher.subscribe('channels');
    channel.bind('newChannel', function(data) {
      getChannelsName()
    });

  }, []);

  const handleAddChannel = (e) => {
    e.preventDefault();

    const channelName = prompt("Enter a new channel name");

    if(channelName) {
        axios.post("/api/newchannel", {
            channelName: channelName,
          });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h3>Mern discord</h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Text Channels</h4>
          </div>

          <AddIcon onClick={handleAddChannel} className="sidebar__addChannel" />
        </div>
        <div className="sidebar__channelsList">
          {channels.map((channel) => (
            <SidebarChannel
              key={channel.id}
              id={channel.id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcons"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar src={user.photo} onClick={() => auth.signOut()} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

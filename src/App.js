import './App.css';
import React, {useState} from 'react';
function App() {
  const [privateIP, setPrivateIP] = useState(null);

  React.useEffect(() => {
    const getPrivateIP = () => {
      const RTCPeerConnection =
        window.RTCPeerConnection ||
        window.mozRTCPeerConnection ||
        window.webkitRTCPeerConnection;

      if (!RTCPeerConnection) {
        console.error("WebRTC not supported by this browser.");
        return;
      }

      const pc = new RTCPeerConnection({ iceServers: [] });
      const noop = () => {};

      pc.createDataChannel(""); // create a bogus data channel
      pc.createOffer()
        .then(offer => pc.setLocalDescription(offer))
        .catch(noop); // create offer and set local description

      pc.onicecandidate = (ice) => {
        if (ice && ice.candidate && ice.candidate.candidate) {
          const candidate = ice.candidate.candidate;
          console.log(candidate)
          const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
          const ipMatch = candidate.match(ipRegex);

          if (ipMatch) {
            const ip = ipMatch[1];
            setPrivateIP(ip);
          } else if (candidate.includes('.local')) {
            setPrivateIP("mDNS protection in place: Private IP hidden");
          }

          pc.onicecandidate = noop;
        }
      };
    };

    getPrivateIP();
  }, []);

  return (
    <div>
      <h3>Your Private IP Address: {privateIP ? privateIP : "Fetching..."}</h3>
    </div>
  );
};
export default App;

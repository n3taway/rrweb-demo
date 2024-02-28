import { useEffect, useRef } from 'react';
import { useSearchParams } from 'umi';
import axios from 'axios';
import rrwebPlayer from 'rrweb-player';
import 'rrweb-player/dist/style.css';

import eventsJson from './events.json';

const REFRESH_CYCLE = 5;

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get('userName');

  const domRef = useRef<HTMLDivElement>(null);
  let eventDataRef = useRef<any>({});
  let rrwebPlayerRef = useRef<any>(null);

  const loopPlay = async () => {
    if (userName) {
      const response = await axios.get('http://localhost:3000/getUserLatestEventList', { params: { userName } });
      if (response.data.data.events) {
        const events = JSON.parse(decodeURIComponent(response.data.data.events));
        const newTimestamp = response.data.data.timestamp;
        const oldTimestamp = eventDataRef.current.timestamp;
        if (events.length && newTimestamp !== oldTimestamp) {
          rrwebPlayerRef.current.addEvent(events);
          eventDataRef.current = response.data.data;
        }
        setTimeout(loopPlay, REFRESH_CYCLE * 1000);
      }
    }
  }

  const getUserEvent = async () => {
    if (userName) {
      const response = await axios.get('http://localhost:3000/getUserLatestEventList', { params: { userName } });
      if (response.data.data.events) {
        const events = JSON.parse(decodeURIComponent(response.data.data.events));
        if (events.length) {
          eventDataRef.current = response.data.data;
          rrwebPlayerRef.current = new rrwebPlayer({
            target: (domRef.current as HTMLDivElement), // 可以自定义 DOM 元素
            props: {
              events,
              // events: ejson.events,
              // https://github.com/rrweb-io/rrweb/issues/379#issuecomment-844635335
              UNSAFE_replayCanvas: true,
              liveMode: true,
            },
          });
          setTimeout(loopPlay, REFRESH_CYCLE * 1000);
        }
      }
    }
  }

  useEffect(() => {
    getUserEvent();
    return () => {
      rrwebPlayerRef.current?.pause();
    };
  }, []);

  const handleAdd = async () => {
    // const obj = { a: 1 };
    const obj = eventsJson;
    const body = JSON.stringify({ events: obj, id: 1, timestamp: new Date().getTime(), userName: '321' });
    fetch('http://localhost:3000/reportEvents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    }).then(() => { }).catch(() => { });
  }

  const handleGet = async () => {
    const response = await axios.get('http://localhost:3000/getUserLatestEventList', { params: { userName } });
    const events = response.data.data.events;
    console.log('🚧 -> file: event.tsx。 events: ', events);
    console.log('🚧 -> file: event.tsx。 events: ', JSON.parse(events));
  }

  const handleOGR = () => {
    console.log(eventsJson);
  }

  return (
    <div>
      <div ref={domRef} />
      {/* <button onClick={handleAdd}>add</button> */}
      {/* <button onClick={handleGet}>get</button> */}
      {/* <button onClick={handleOGR}>ORG</button> */}
    </div>
  );
}

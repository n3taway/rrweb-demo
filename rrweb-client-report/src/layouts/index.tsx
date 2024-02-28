import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'umi';
import axios from 'axios';
import { encode } from 'js-base64';
const rrweb = require('rrweb');
import './index.css';


let timer: any = null;

let events: any = [];


export default function Layout() {
  const location = useLocation();
  const [showBack, setShowBack] = useState(false);

  // chrome://flags/#document-transition chrome开启位置变换动画
  // https://developer.chrome.com/blog/shared-element-transitions-for-spas/
  const handleBack = () => {
    // @ts-ignore
    const transition = document.createDocumentTransition();
    transition.start(() => {
      history.back();
    });
  }

  useEffect(() => {
    setShowBack(location.pathname !== '/');
  }, [location.pathname]);


  useEffect(() => {
    rrweb.record({
      emit(event: any) {
        // 将 event 存入 events 数组中
        events.push(event);
      },
    });

    function save() {
      if (events.length > 0) {
        const eventsString = encodeURIComponent(JSON.stringify(events));
        const payload = { events: eventsString, id: 1, timestamp: new Date().getTime(), userName: '321' }
        axios.post('http://localhost:3000/reportEvents', payload);
      }
    }

    // timer = setInterval(save, 10 * 1000);
    timer = setTimeout(save, 5 * 1000);
    return () => {
      // timer && clearInterval(timer);
      timer && clearTimeout(timer);
    }
  }, []);

  return (
    <div>
      <div className="main-header">
        <div>
          {showBack ? <button onClick={handleBack}>back</button> : null}
          导航栏
        </div>
      </div>
      <Outlet />
    </div>
  );
}

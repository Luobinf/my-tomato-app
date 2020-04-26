import React, {useState, useEffect, FunctionComponent} from 'react';

interface CountDownHookProps {
  timer: number,
  onFinish: () => void
}

let timerID: NodeJS.Timeout;

const CountDownHook: FunctionComponent<CountDownHookProps> = (props) => {
  const [countDown, setCountDown] = useState(props.timer);

  let minutes = Math.floor(countDown / 1000 / 60);
  let seconds = Math.floor(countDown / 1000 % 60);

  useEffect(() => {
    document.title = `${minutes} : ${seconds}—番茄时间`;
    timerID = setInterval(
      () => {
        setCountDown(countDown - 1000);
        if (countDown < 1000) {
          document.title = `番茄时间`;
          props.onFinish();
          clearInterval(timerID);
        }
      }, 1000);
    return function clearup() {
      clearInterval(timerID);
    };
  });
  return (
    <div className='countdown'>
      {minutes} : {seconds}
    </div>
  );
};

export default CountDownHook;

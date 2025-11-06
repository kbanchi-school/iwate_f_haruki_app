import React, { useState, useEffect, useContext, useMemo } from 'react';
import { PetContext } from '../context/PetContext';

const WAKE_UP_TIMES = ['05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00'];
const BED_TIMES = ['21:00', '21:30', '22:00', '22:30', '23:00'];

interface TimeSetterProps {
    title: string;
    icon: string;
    currentTime: string | null;
    inputValue: string;
    onInputChange: (value: string) => void;
    onSet: () => void;
    onClear: () => void;
    timeOptions: string[];
}

const TimeSetter: React.FC<TimeSetterProps> = ({ title, icon, currentTime, inputValue, onInputChange, onSet, onClear, timeOptions }) => (
  <div className="w-full p-4 bg-brand-pink-100 rounded-lg space-y-3">
      <h2 className="text-lg font-bold text-brand-pink-800 text-center">{icon} {title}</h2>
      {currentTime ? (
          <div className="text-center">
              <p className="font-semibold text-brand-pink-700">セット中の時間</p>
              <p className="text-2xl font-bold text-brand-pink-900">{currentTime}</p>
               <button onClick={onClear} className="mt-2 text-sm text-red-500 hover:underline">かいじょ</button>
          </div>
      ) : (
           <div className="flex items-center justify-center space-x-2">
              <select
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                className="p-2 border-2 border-brand-pink-300 rounded-lg text-lg bg-white"
              >
                {timeOptions.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              <button onClick={onSet} className="px-4 py-2 bg-brand-pink-500 text-white font-bold rounded-lg hover:bg-brand-pink-600 transition">セット</button>
          </div>
      )}
  </div>
);

const AlarmClock: React.FC = () => {
  const context = useContext(PetContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [wakeUpInput, setWakeUpInput] = useState('07:00');
  const [bedTimeInput, setBedTimeInput] = useState('21:00');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);
  
  if (!context) return null;
  const { navigateTo, wakeUpTime, bedTime, setWakeUpTime, setBedTime, reportWakeUp, reportBedTime } = context;

  const sleepDuration = useMemo(() => {
    if (!wakeUpTime || !bedTime) {
      return null;
    }

    const [bedHours, bedMinutes] = bedTime.split(':').map(Number);
    const [wakeHours, wakeMinutes] = wakeUpTime.split(':').map(Number);

    const bedDate = new Date();
    bedDate.setHours(bedHours, bedMinutes, 0, 0);

    const wakeDate = new Date();
    wakeDate.setHours(wakeHours, wakeMinutes, 0, 0);

    // Wake up time is on the next day
    if (wakeDate.getTime() <= bedDate.getTime()) {
      wakeDate.setDate(wakeDate.getDate() + 1);
    }

    const diffMs = wakeDate.getTime() - bedDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return { hours: diffHours, minutes: diffMinutes };
  }, [wakeUpTime, bedTime]);

  const handleReportWakeUp = () => {
    const resultMessage = reportWakeUp();
    setMessage(resultMessage);
    setTimeout(() => setMessage(''), 3000);
  };
  
  const handleReportBedTime = () => {
    const resultMessage = reportBedTime();
    setMessage(resultMessage);
    setTimeout(() => setMessage(''), 3000);
  };
  
  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-bold text-brand-pink-700">おやすみ & おはよう</h1>
      
      <div className="text-4xl font-mono font-bold text-brand-pink-800 p-3 bg-brand-pink-100 rounded-lg shadow-inner w-full text-center">
        {currentTime.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
      </div>

      {message && <div className="text-center p-2 rounded-lg bg-green-100 text-green-800 font-semibold w-full">{message}</div>}

      <div className="w-full grid grid-cols-2 gap-3">
        <button onClick={handleReportWakeUp} className="w-full p-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg hover:bg-yellow-500 transition text-lg">☀️ 起きたよ！</button>
        <button onClick={handleReportBedTime} className="w-full p-3 bg-indigo-400 text-white font-bold rounded-lg hover:bg-indigo-500 transition text-lg">🌙 寝るね！</button>
      </div>

      <div className="w-full space-y-3">
        <TimeSetter 
            title="起きる時間"
            icon="⏰"
            currentTime={wakeUpTime}
            inputValue={wakeUpInput}
            onInputChange={setWakeUpInput}
            onSet={() => setWakeUpTime(wakeUpInput)}
            onClear={() => setWakeUpTime(null)}
            timeOptions={WAKE_UP_TIMES}
        />
        
        {sleepDuration && (
          <div className="text-center p-3 rounded-lg bg-indigo-100 text-indigo-800 font-semibold w-full">
              <span>💤 </span>
              {sleepDuration.minutes > 0
                  ? `${sleepDuration.hours}時間${sleepDuration.minutes}分`
                  : `${sleepDuration.hours}時間`}
              <span> ねむれるよ！</span>
          </div>
        )}

        <TimeSetter 
            title="寝る時間"
            icon="😴"
            currentTime={bedTime}
            inputValue={bedTimeInput}
            onInputChange={setBedTimeInput}
            onSet={() => setBedTime(bedTimeInput)}
            onClear={() => setBedTime(null)}
            timeOptions={BED_TIMES}
        />
      </div>

       <button
        onClick={() => navigateTo('main')}
        className="w-full mt-2 p-3 bg-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-400 transition"
      >
        もどる
      </button>
    </div>
  );
};

export default AlarmClock;
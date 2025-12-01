import React, { useState, useRef, useEffect } from 'react';
import { GameStage, STAGE_CONFIG, PUZZLE_SOLUTIONS } from './constants';
import { StageContent } from './components/StageContent';
import { Sidebar } from './components/Sidebar';
import { Search, Globe, Clock, Menu } from 'lucide-react';

const App: React.FC = () => {
  const [stage, setStage] = useState<GameStage>(GameStage.NORMAL);
  const [query, setQuery] = useState('');
  const [shake, setShake] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const config = STAGE_CONFIG[stage];

  // Welcome log
  useEffect(() => {
    console.log("%cTHCS HÀM NGHI - WEBSITE PORTAL", "font-weight: bold; font-size: 16px; color: blue;");
    console.log("%cMake sure to inspect everything...", "color: #ccc; font-style: italic;");
  }, []);

  // Random glitch effect for later stages
  useEffect(() => {
    if (stage >= GameStage.CLASS_LIST && stage !== GameStage.ENDING) {
      const interval = setInterval(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 150);
      }, 5000 + Math.random() * 5000);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.toUpperCase().trim();
    // @ts-ignore
    const correctAnswers = PUZZLE_SOLUTIONS[stage];

    if (correctAnswers && correctAnswers.includes(cleanQuery)) {
      // Success
      setShake(true);
      setTimeout(() => setShake(false), 1000);
      setStage(prev => prev + 1);
      setQuery('');
      // Log success
      console.log("%cACCESS GRANTED", "color: green; font-weight: bold;");
    } else {
      // Failure
      inputRef.current?.classList.add('bg-red-200');
      setTimeout(() => inputRef.current?.classList.remove('bg-red-200'), 300);
    }
  };

  const handleHiddenFooterClick = () => {
    if (stage === GameStage.NORMAL) {
       console.log("Nothing happens.");
    } else {
       setGlitch(true);
       setTimeout(() => setGlitch(false), 500);
    }
  }

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${config.bg} ${config.text} ${config.font} relative overflow-x-hidden flex flex-col`}>
      
      {/* Global CSS for CRT/Glitch effects */}
      {(glitch || stage === GameStage.DARK_ROOM) && (
        <div className="fixed inset-0 pointer-events-none z-50 mix-blend-exclusion bg-white opacity-10"></div>
      )}
      {stage >= GameStage.CLASS_LIST && stage !== GameStage.ENDING && (
        <div className="scanline fixed inset-0 pointer-events-none z-40 opacity-10"></div>
      )}
      
      {/* Header Info Bar */}
      {stage !== GameStage.ENDING && (
        <div className="bg-gray-100 border-b border-gray-300 py-1 px-4 text-xs flex justify-between items-center text-gray-600 font-sans z-10 relative">
          <div className="flex gap-4">
             <span className="flex items-center gap-1"><Globe className="w-3 h-3"/> {stage < GameStage.DARK_ROOM ? 'thcs-hamnghi.hue.edu.vn' : 'ERROR_HOST_UNKNOWN'}</span>
             <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {stage === GameStage.NORMAL ? '01/12/2025' : '24/11/1998'}</span>
          </div>
          <div className="hidden md:block">
            <span className="cursor-pointer hover:underline">Đăng nhập</span> | <span className="cursor-pointer hover:underline">Liên hệ</span>
          </div>
        </div>
      )}

      {/* Main Header Banner */}
      {stage !== GameStage.ENDING && (
      <header className={`${config.headerBg} text-white py-6 shadow-md transition-colors duration-700 relative z-10`}>
        <div className={`container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 ${shake ? 'shake-constant' : ''}`}>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10 shrink-0 ${stage >= GameStage.CLASS_LIST ? 'animate-spin-slow' : ''}`}>
               {stage < GameStage.CLASS_LIST ? (
                 <span className="font-serif font-bold text-2xl">HN</span>
               ) : (
                 <span className="font-mono font-bold text-2xl text-red-500">†</span>
               )}
            </div>
            <div>
              <h1 className={`font-bold uppercase text-lg md:text-2xl leading-tight ${stage >= GameStage.CLASS_LIST ? 'blur-[1px]' : ''}`}>
                {config.title}
              </h1>
              <p className="text-xs md:text-sm opacity-80 font-serif italic mt-1">
                {stage === GameStage.NORMAL && "Tiên học lễ - Hậu học văn"}
                {stage === GameStage.LIBRARY && "Lưu trữ hồ sơ - Bảo mật thông tin"}
                {stage >= GameStage.CLASS_LIST && "C Ứ U   T Ô I   -   C Ứ U   T Ô I"}
              </p>
            </div>
          </div>

          {/* THE PUZZLE INPUT (Search Bar) */}
          <form onSubmit={handleSubmit} className="w-full md:w-80 relative">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={stage >= GameStage.CLASS_LIST ? "NHẬP MÃ..." : "Tìm kiếm thông tin..."}
              className={`w-full py-2 pl-4 pr-10 outline-none transition-all
                ${stage >= GameStage.CLASS_LIST 
                  ? 'bg-black border-2 border-red-800 text-red-500 placeholder-red-900 font-mono' 
                  : 'bg-white/90 border-none text-gray-800 placeholder-gray-500 rounded-sm shadow-inner'}`}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600">
               <Search className={`w-5 h-5 ${stage >= GameStage.CLASS_LIST ? 'text-red-700' : ''}`} />
            </button>
          </form>

        </div>
      </header>
      )}

      {/* Navigation Bar */}
      {stage !== GameStage.ENDING && (
        <nav className={`${stage >= GameStage.CLASS_LIST ? 'bg-black border-b border-red-900' : 'bg-white border-b border-gray-200'} shadow-sm relative z-10`}>
          <div className="container mx-auto px-4">
             <ul className={`flex overflow-x-auto gap-6 md:gap-8 text-sm font-bold uppercase py-3 whitespace-nowrap
                ${stage >= GameStage.CLASS_LIST ? 'text-red-800 font-mono justify-end' : 'text-gray-600 font-sans'}`}>
                {['Trang chủ', 'Giới thiệu', 'Tin tức', 'Tuyển sinh', 'Thư viện', 'Liên hệ'].map((item, i) => (
                   <li key={i} className={`cursor-pointer transition-colors ${stage >= GameStage.CLASS_LIST ? 'hover:text-red-500' : 'hover:text-blue-600'}`}>
                      {stage === GameStage.CLASS_LIST ? item.split('').reverse().join('') : item}
                   </li>
                ))}
             </ul>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 relative z-0 flex-1">
        <div className="flex-1">
           <StageContent stage={stage} />
        </div>
        
        <div className="w-full md:w-80 shrink-0">
           <Sidebar stage={stage} />
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-6 text-center text-xs border-t mt-auto relative
        ${stage >= GameStage.CLASS_LIST ? 'bg-black text-red-900 border-red-900' : 'bg-gray-100 text-gray-500 border-gray-300'}`}>
         <div className="container mx-auto">
            <p className="font-bold mb-2">TRƯỜNG TRUNG HỌC CƠ SỞ HÀM NGHI</p>
            <p>Địa chỉ: Số 123 Đường Lê Lợi, Thành phố Huế</p>
            <p className="mt-4 opacity-50">&copy; {stage === GameStage.NORMAL ? '2025' : '1998'} All Rights Reserved.</p>
         </div>
         {/* Hidden Trigger */}
         <div onClick={handleHiddenFooterClick} className="absolute bottom-0 right-0 w-4 h-4 cursor-default z-50"></div>
      </footer>
    </div>
  );
};

export default App;
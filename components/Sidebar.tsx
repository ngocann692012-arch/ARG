import React from 'react';
import { GameStage } from '../constants';
import { ChevronRight, Calendar, AlertTriangle } from 'lucide-react';

interface SidebarProps {
  stage: GameStage;
}

export const Sidebar: React.FC<SidebarProps> = ({ stage }) => {
  // Dynamic links based on creepy factor
  const getLinks = () => {
    switch (stage) {
      case GameStage.NORMAL:
        return [
          'Giới thiệu chung',
          'Cơ cấu tổ chức',
          'Công đoàn giáo dục',
          'Đoàn Đội',
          'Thư viện ảnh',
          'Tài nguyên số'
        ];
      case GameStage.LIBRARY:
        return [
          'Văn phòng Đội',
          'Báo cáo thi đua',
          'Sổ đầu bài',
          'Hồ sơ kỷ luật',
          'Liên hệ phụ huynh'
        ];
      case GameStage.CLASS_LIST:
        return [
          'null',
          'undefined',
          'ERROR_404',
          'SYSTEM_FAILURE',
          'HELP_ME'
        ];
      case GameStage.DARK_ROOM:
      case GameStage.JOURNAL:
        return [
          '01001000',
          '01000101',
          '01001100',
          '01010000',
          '01001101',
          '01000101'
        ];
      default:
        return [];
    }
  };

  const links = getLinks();
  const isCreepy = stage >= GameStage.CLASS_LIST;

  if (stage === GameStage.ENDING) return null;

  return (
    <div className={`space-y-6 ${stage >= GameStage.DARK_ROOM ? 'opacity-60' : ''}`}>
      
      {/* REALISTIC WIDGET: School Calendar (Replaces the "Hint" box) */}
      {stage < GameStage.CLASS_LIST && (
        <div className={`border shadow-sm p-4 ${stage === GameStage.LIBRARY ? 'bg-[#fffdf5] border-[#d7ccc8]' : 'bg-white border-blue-200'}`}>
          <h3 className={`font-bold text-sm uppercase mb-3 flex items-center gap-2 pb-2 border-b
            ${stage === GameStage.LIBRARY ? 'text-[#3e2723] border-[#d7ccc8]' : 'text-blue-800 border-blue-100'}`}>
             <Calendar className="w-4 h-4" /> Lịch Công Tác Tuần
          </h3>
          <ul className={`text-xs space-y-2 font-serif ${stage === GameStage.LIBRARY ? 'text-[#5d4037]' : 'text-gray-600'}`}>
            <li className="flex justify-between">
              <span>Thứ 2:</span> <span>Chào cờ đầu tuần</span>
            </li>
            <li className="flex justify-between">
              <span>Thứ 3:</span> <span>Họp tổ chuyên môn</span>
            </li>
            <li className="flex justify-between">
              <span>Thứ 5:</span> <span>Thi giáo viên giỏi</span>
            </li>
            <li className="flex justify-between text-red-500">
              <span>CN:</span> <span>Nghỉ</span>
            </li>
          </ul>
        </div>
      )}

      {/* Categories */}
      <div className={`border shadow-sm ${isCreepy ? 'bg-black border-red-900' : 'bg-white border-blue-200'}`}>
        <div className={`px-4 py-2 font-bold text-sm uppercase flex items-center justify-between
          ${isCreepy ? 'bg-red-900 text-black' : 'bg-blue-600 text-white'}`}>
          <span>{isCreepy ? 'SYSTEM_LINKS' : 'Liên kết website'}</span>
          <ChevronRight className="w-4 h-4" />
        </div>
        <ul>
          {links.map((link, idx) => (
            <li key={idx} className={`text-sm px-4 py-2 border-b border-dashed flex items-center cursor-not-allowed
               ${isCreepy 
                 ? 'border-red-900 text-red-700 font-mono hover:text-red-500' 
                 : 'border-gray-200 text-gray-700 hover:bg-blue-50'}`}>
               <span className="mr-2 text-xs">▸</span>
               {link}
            </li>
          ))}
        </ul>
      </div>

      {/* Creepy Visitor Counter */}
      <div className={`${isCreepy ? 'bg-black border-red-900' : 'bg-white border-gray-300'} border p-3 text-center`}>
        <p className={`text-xs mb-1 font-serif ${isCreepy ? 'text-red-800' : 'text-gray-500'}`}>Số lượt truy cập</p>
        <div className={`text-2xl font-mono tracking-[0.5em] font-bold ${isCreepy ? 'text-red-600 animate-pulse' : 'text-blue-800'}`}>
          {isCreepy ? 'ERR' : '10852'}
        </div>
      </div>

      {/* Ad / Glitch Image */}
      <div className="border border-gray-300 overflow-hidden h-40 bg-gray-100 flex items-center justify-center relative group">
         {stage < GameStage.CLASS_LIST ? (
             <div className="text-center p-4">
                <p className="text-blue-800 font-bold text-sm">HỘI THI<br/>GIÁO VIÊN GIỎI</p>
                <p className="text-xs text-gray-500 mt-2">Năm học 2024 - 2025</p>
             </div>
         ) : (
             <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZtYXg1Zm55eGZ5eGZ5eGZ5eGZ5eGZ5eGZ5eGZ5eGZ5eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L4db3o8yF8opW/giphy.gif')] opacity-20 bg-cover"></div>
                <AlertTriangle className="w-12 h-12 text-red-600 animate-bounce" />
             </div>
         )}
      </div>
    </div>
  );
};
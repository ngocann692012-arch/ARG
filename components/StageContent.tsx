import React, { useState, useEffect } from 'react';
import { GameStage, NEWS_ITEMS, MISSING_PERSONS, CLASS_LIST_DATA } from '../constants';
import { FileText, AlertOctagon, Terminal, Lock, Eye, UserX, ImageOff } from 'lucide-react';

interface StageContentProps {
  stage: GameStage;
}

export const StageContent: React.FC<StageContentProps> = ({ stage }) => {
  const [revealed, setRevealed] = useState(false);

  // LOGIC FOR HIDDEN CONSOLE CLUE (STAGE 2)
  useEffect(() => {
    if (stage === GameStage.CLASS_LIST) {
      // Small delay to ensure it appears after other logs
      const timer = setTimeout(() => {
        console.warn("%cSYSTEM_ALERT_304: Data corruption detected in sector 8/3.", "color: red; font-size: 14px;");
        console.log("%c.... . .-.. .--.", "color: #b91c1c; font-weight: bold; font-size: 20px; background: black; padding: 10px;");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // --- STAGE 0: NORMAL ---
  if (stage === GameStage.NORMAL) {
    return (
      <div className="bg-white p-6 border border-blue-200 shadow-md">
        <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-500 mb-6 pb-2 uppercase flex items-center gap-2">
          <FileText className="w-5 h-5" /> Tin tức sự kiện
        </h2>
        <div className="space-y-4">
          {NEWS_ITEMS.map((news) => (
            <div key={news.id} className="flex gap-4 border-b border-gray-100 pb-4 group cursor-pointer hover:bg-blue-50 transition p-2 rounded">
              <div className="w-24 h-24 bg-gray-200 flex-shrink-0 overflow-hidden border border-gray-300">
                <img 
                  src={`https://picsum.photos/seed/${news.id + 10}/200`} 
                  alt="thumbnail" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-blue-900 text-base mb-1 group-hover:underline group-hover:text-blue-700">
                  {/* Acrostic is still here, but no hints */}
                  <span className="text-red-600 font-serif opacity-80">{news.title.charAt(0)}</span>
                  {news.title.slice(1)}
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                   📅 {news.date} | 👁️ {Math.floor(Math.random() * 500)} lượt xem
                </p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2 font-serif">
                  Nhà trường trân trọng thông báo đến toàn thể phụ huynh và học sinh về nội dung chi tiết...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- STAGE 1: ARCHIVE (Invisible Text Base64 Puzzle) ---
  if (stage === GameStage.LIBRARY) {
    return (
      <div className="bg-[#f5f5dc] p-8 border-2 border-[#5d4037] shadow-xl relative min-h-[600px]">
        {/* Old paper texture effect */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-50 pointer-events-none"></div>
        
        <div className="flex justify-between items-end mb-8 border-b-4 border-double border-[#3e2723] pb-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-[#3e2723] uppercase tracking-wider">
              Lưu Trữ Học Vụ
            </h2>
            <p className="text-sm italic text-[#5d4037] mt-1">Niên khóa: 1998 - 1999 | Phân loại: Hồ sơ giấy</p>
          </div>
          <UserX className="w-12 h-12 text-[#3e2723] opacity-80" />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {MISSING_PERSONS.map((person, idx) => (
            <div key={idx} className="flex bg-[#fffdf5] border border-[#d7ccc8] p-3 shadow-sm hover:shadow-md transition-shadow items-center relative overflow-hidden group">
               {/* Photo */}
               <div className="w-24 h-32 bg-gray-300 border-2 border-gray-400 mr-4 flex-shrink-0 relative overflow-hidden">
                 <img 
                   src={person.image} 
                   alt="Portrait" 
                   className={`w-full h-full object-cover sepia contrast-125 transition-all duration-700 
                     ${person.status.includes('Vắng') ? 'blur-[1px] brightness-75' : ''}`}
                 />
               </div>

               {/* Info */}
               <div className="flex-1 font-serif">
                 <div className="grid grid-cols-2 gap-y-2 text-sm text-[#4e342e]">
                    <div className="col-span-2 text-lg font-bold border-b border-[#d7ccc8] mb-1 pb-1">
                      {person.name}
                    </div>
                    
                    <span className="opacity-70">Mã Hồ Sơ:</span>
                    {/* THE CLUE: White text on white background (text-[#fffdf5]). Only visible when selected. */}
                    <span className={`font-mono font-bold select-all tracking-wider ${person.id === 'S0hPMTk5OA==' ? 'text-[#fffdf5]' : 'text-[#3e2723]'}`}>
                      {person.id}
                    </span>
                    
                    <span className="opacity-70">Lớp/Chức vụ:</span>
                    <span>{person.class}</span>

                    <span className="opacity-70">Ngày cập nhật:</span>
                    <span>{person.date}</span>
                 </div>
               </div>

               {/* Status Stamp */}
               <div className="absolute right-4 top-1/2 -translate-y-1/2 rotate-[-15deg] border-4 border-double p-1 opacity-70 mask-image">
                  <span className={`text-lg font-bold uppercase tracking-widest px-2
                    ${person.status.includes('Vắng') ? 'text-red-900 border-red-900' : 'text-[#2e7d32] border-[#2e7d32]'}`}>
                    {person.status}
                  </span>
               </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-[10px] text-[#8d6e63] text-center font-mono opacity-60">
           ARCHIVE_SYSTEM_V1.0.2 | DỮ LIỆU ĐÃ ĐƯỢC SỐ HÓA
        </div>
      </div>
    );
  }

  // --- STAGE 2: CLASS_LIST (Console Log Puzzle) ---
  if (stage === GameStage.CLASS_LIST) {
    return (
      <div className="bg-gray-900 p-6 border-2 border-red-900 shadow-2xl relative overflow-hidden h-full">
        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-5 mix-blend-overlay pointer-events-none"></div>

        <h2 className="text-3xl font-mono font-bold text-red-600 mb-8 border-b border-red-800 pb-4 animate-pulse flex items-center justify-between">
          <span>CSDL HỌC SINH 1998</span>
          <AlertOctagon className="w-8 h-8" />
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-sm text-red-400">
            <thead className="bg-red-950 text-red-200">
              <tr>
                <th className="p-4">STT</th>
                <th className="p-4">HỌ VÀ TÊN</th>
                <th className="p-4">NGÀY SINH</th>
                <th className="p-4">GHI CHÚ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-900">
              {CLASS_LIST_DATA.map((student) => (
                <tr key={student.id} className="hover:bg-red-900/20 transition-colors">
                  <td className="p-4">{student.id}</td>
                  <td className={`p-4 ${student.name.includes('Nam') ? 'text-red-600 font-bold' : ''}`}>
                    {student.name}
                  </td>
                  <td className="p-4">{student.dob}</td>
                  <td className="p-4 tracking-widest opacity-70">
                    {student.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 p-4 bg-black border border-red-800 font-mono text-xs text-red-700">
          <p>&gt; KẾT NỐI SERVER THẤT BẠI...</p>
          <p>&gt; ĐANG TẢI LOG HỆ THỐNG...</p>
          <p className="animate-pulse">&gt; Vui lòng kiểm tra Console (F12) để xem chi tiết lỗi.</p>
        </div>
      </div>
    );
  }

  // --- STAGE 3: DARK ROOM (Alt Text Puzzle) ---
  if (stage === GameStage.DARK_ROOM) {
    return (
      <div className="bg-black p-8 border border-green-900 h-[600px] flex flex-col items-center justify-center relative">
        <Terminal className="w-16 h-16 text-green-700 mb-6 animate-bounce" />
        
        <h1 className="text-4xl font-mono text-green-600 tracking-[0.5em] mb-2 uppercase text-center">
          Tài Liệu Mật
        </h1>
        <p className="text-green-800 font-mono text-xs mb-12">Khu vực cấm - Quyền truy cập: ADMIN</p>

        <div className="border border-green-900 p-2 bg-green-950/20">
           {/* THE CLUE: The Hex code is in the ALT tag. The image itself is broken. */}
           <img 
             src="/invalid_path_to_evidence.jpg" 
             alt="43 48 49 41 4B 48 4F 41" 
             title="Lỗi tải hình ảnh: 0x4B4559"
             className="w-48 h-48 object-cover opacity-50 border border-green-800 p-8"
           />
           <div className="flex items-center justify-center mt-2 gap-2 text-green-700 text-xs font-mono">
              <ImageOff className="w-4 h-4" />
              <span>Image Load Error</span>
           </div>
        </div>

        <div className="mt-12 text-green-900 font-mono text-xs animate-pulse text-center">
          "Hình ảnh không hiển thị? Hãy kiểm tra thuộc tính của nó."
        </div>
      </div>
    );
  }

  // --- STAGE 4: JOURNAL (Logic/Truth) ---
  if (stage === GameStage.JOURNAL) {
    return (
      <div className="bg-black p-10 border border-gray-800 max-w-2xl mx-auto min-h-[500px] flex flex-col justify-center">
        <h2 className="text-white font-serif text-2xl italic mb-8 border-b border-gray-700 pb-4">
          Nhật ký: 24/11/1998
        </h2>
        
        <div className="space-y-6 text-gray-400 font-mono leading-loose text-lg">
          <p>
            Trời mưa to quá. Mọi người đều ở trên hội trường xem văn nghệ.
          </p>
          <p>
            Mình chỉ muốn lấy quyển sách bỏ quên. Nhưng cánh cửa <span className="text-white font-bold decoration-wavy underline decoration-red-900">KHO</span> bỗng dưng đóng sầm lại.
          </p>
          <p>
            Có tiếng cười bên ngoài. Là bọn họ.
          </p>
          <p>
            Mình gào thét đến khản cổ. "Cứu tôi với!". Nhưng tiếng nhạc ồn quá.
          </p>
          <p className="animate-pulse text-white">
            Lạnh quá. Tối quá...
          </p>
        </div>
      </div>
    );
  }

  // --- STAGE 5: ENDING ---
  if (stage === GameStage.ENDING) {
     return (
        <div className="flex flex-col items-center justify-center h-full text-center p-10 space-y-6 animate-fade-in">
           <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
              <Eye className="w-12 h-12 text-gray-400" />
           </div>
           <h1 className="text-3xl font-serif font-bold text-gray-800">Cảm ơn bạn đã tìm thấy tôi.</h1>
           <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              Sự thật về ngày 24/11/1998 đã được phơi bày.
           </p>
           <button 
             onClick={() => window.location.reload()}
             className="mt-8 px-6 py-2 border border-black hover:bg-black hover:text-white transition-all uppercase text-sm tracking-widest"
           >
             Trở về
           </button>
        </div>
     )
  }

  return null;
};
export enum GameStage {
  NORMAL = 0,
  LIBRARY = 1,
  CLASS_LIST = 2,
  DARK_ROOM = 3,
  JOURNAL = 4,
  ENDING = 5
}

export const STAGE_CONFIG = {
  [GameStage.NORMAL]: {
    theme: 'retro-blue',
    title: 'Trường THCS Hàm Nghi - Huế',
    bg: 'bg-[#f0f9ff]', // Light blue
    headerBg: 'bg-gradient-to-r from-blue-700 to-blue-500',
    text: 'text-gray-900',
    accent: 'blue',
    font: 'font-serif'
  },
  [GameStage.LIBRARY]: {
    theme: 'retro-sepia',
    title: 'Phòng Công Tác Học Sinh (Lưu Trữ)',
    bg: 'bg-[#f5f5dc]', // Beige/Sepia
    headerBg: 'bg-[#5d4037]', // Brown
    text: 'text-[#3e2723]',
    accent: 'brown',
    font: 'font-serif'
  },
  [GameStage.CLASS_LIST]: {
    theme: 'glitch',
    title: 'E̵R̴R̴O̴R̵: DỮ LIỆU HỎNG',
    bg: 'bg-gray-900',
    headerBg: 'bg-red-900',
    text: 'text-red-500',
    accent: 'red',
    font: 'font-mono'
  },
  [GameStage.DARK_ROOM]: {
    theme: 'terminal',
    title: 'C:/SYSTEM/ROOT/1998',
    bg: 'bg-black',
    headerBg: 'bg-black',
    text: 'text-green-500',
    accent: 'green',
    font: 'font-mono'
  },
  [GameStage.JOURNAL]: {
    theme: 'void',
    title: '',
    bg: 'bg-black',
    headerBg: 'bg-black',
    text: 'text-white',
    accent: 'white',
    font: 'font-mono'
  },
  [GameStage.ENDING]: {
    theme: 'peace',
    title: 'Cảm ơn',
    bg: 'bg-white',
    headerBg: 'bg-white',
    text: 'text-black',
    accent: 'gray',
    font: 'font-sans'
  }
};

export const PUZZLE_SOLUTIONS = {
  [GameStage.NORMAL]: ['THUVIEN', 'THƯ VIỆN', 'THU VIEN'],
  [GameStage.LIBRARY]: ['KHO1998', 'KHO 1998'],
  [GameStage.CLASS_LIST]: ['HELP', 'CUU', 'CỨU', 'SOS', 'CUU TOI'],
  [GameStage.DARK_ROOM]: ['CHIAKHOA', 'CHÌA KHÓA', 'KEY'],
  [GameStage.JOURNAL]: ['NAM', 'NGUYEN VAN NAM', 'NAM OI'],
};

// Stage 0 Data
export const NEWS_ITEMS = [
  { id: 1, title: 'Thông báo tuyển sinh lớp 6 năm học 2025-2026', date: '01/05/2025' },
  { id: 2, title: 'Hội khỏe Phù Đổng cấp trường thành công tốt đẹp', date: '28/04/2025' },
  { id: 3, title: 'Ươm mầm tài năng trẻ: Cuộc thi KHKT', date: '15/04/2025' },
  { id: 4, title: 'Văn nghệ chào mừng ngày 26/3', date: '26/03/2025' },
  { id: 5, title: 'In ấn tài liệu ôn thi cuối kỳ II', date: '20/03/2025' },
  { id: 6, title: 'Êm đềm dòng sông quê hương - Cuộc thi viết', date: '10/03/2025' },
  { id: 7, title: 'Ngày hội đọc sách toàn trường', date: '01/03/2025' }
];

// Stage 1 Data: Missing Persons / Archives
// HIDDEN CLUE: The ID for the missing student is the Base64 code.
// It will be rendered as invisible text in the UI.
export const MISSING_PERSONS = [
  { 
    id: 'HS-98-012', 
    name: 'Nguyễn Thị Mai', 
    class: '9/2', 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&grayscale', 
    status: 'Đã tốt nghiệp',
    date: '20/05/1999' 
  },
  { 
    id: 'HS-98-045', 
    name: 'Trần Văn Hùng', 
    class: '8/1', 
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&grayscale', 
    status: 'Chuyển trường',
    date: '15/01/1999' 
  },
  { 
    id: 'S0hPMTk5OA==', // The clue: KHO1998
    name: 'Phạm Văn Nam', 
    class: '8/3', 
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&grayscale&blur=2', 
    status: 'Vắng (K.P)', // Absent without permission
    date: '24/11/1998' 
  },
  { 
    id: 'GV-98-003', 
    name: 'Lê Thu Hà', 
    class: 'GVCN', 
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&grayscale', 
    status: 'Công tác',
    date: '20/11/1998' 
  },
];

// Stage 2 Data
// The Morse code is NOT in the data to be rendered. It will be in the console.
export const CLASS_LIST_DATA = [
  { id: 1, name: 'Lê Văn A', dob: '12/01/1984', note: 'Tốt' },
  { id: 2, name: 'Trần Thị B', dob: '05/03/1984', note: 'Khá' },
  { id: 3, name: 'Phạm Văn Nam', dob: '24/11/1984', note: 'Vắng' },
  { id: 4, name: 'Phạm Q', dob: '19/08/1984', note: 'Tốt' },
];
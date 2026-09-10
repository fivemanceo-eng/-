import React, { useState } from 'react';
import { X, Lock, ShieldCheck, ArrowRight, User } from 'lucide-react';
import { StaffMember } from '../../types';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (partnerName: string) => void;
  staffMembers?: StaffMember[];
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  staffMembers = [],
}) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const activeStaff = staffMembers.filter((s) => s.status === 'active');

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!account.trim()) {
      setError('請輸入夥伴帳號或電子信箱');
      return;
    }
    // Check if account matches any staff member
    const matchedStaff = staffMembers.find(
      (s) => s.email.toLowerCase() === account.trim().toLowerCase() || s.name.includes(account.trim())
    );

    // Simple password check for tea house demo
    if (password === 'qiyun888' || password === 'admin' || password === '123456' || password === '') {
      const displayName = matchedStaff ? `${matchedStaff.name}（${matchedStaff.roleTitle}）` : (account.trim() || '郭雅雯（茶務總監）');
      onLoginSuccess(displayName);
      onClose();
    } else {
      setError('密碼不正確，預設體驗密碼為 qiyun888 或點選上方團隊成員快捷登入');
    }
  };

  const handleQuickLogin = (staff: StaffMember) => {
    onLoginSuccess(`${staff.name}（${staff.roleTitle}）`);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 sm:p-8 space-y-6 relative border border-[#D9D0C3] shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#F2EDE5] text-[#736B5E] hover:text-[#1F2421] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#2A312B] text-white flex items-center justify-center mx-auto shadow-md">
            <Lock className="w-6 h-6 text-[#C59B6D]" />
          </div>
          <h3 className="font-serif-tc text-2xl font-bold text-[#1F2421]">
            夥伴管理後台登入
          </h3>
          <p className="text-xs text-[#6B6356] leading-relaxed">
            棲雲茶事內部團隊專用通道。可發布部落格專題、管理團隊人員、檢視操作日誌與維護庫存。
          </p>
        </div>

        {/* Quick Partner One-Click Login */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-[#8C5B3E] uppercase tracking-wider block">
            選擇團隊成員快速登入：
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {activeStaff.slice(0, 4).map((staff) => (
              <button
                key={staff.id}
                onClick={() => handleQuickLogin(staff)}
                className="p-2.5 rounded border border-[#DDD5C7] bg-[#FAF8F5] hover:bg-[#F2EDE5] text-[#3D372E] font-medium text-left flex items-center justify-between transition-colors cursor-pointer group"
              >
                <div className="truncate pr-1">
                  <div className="font-semibold text-[#1F2421] truncate">{staff.name}</div>
                  <div className="text-[10px] text-[#7A7365] truncate">{staff.roleTitle}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#8C5B3E] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            ))}
          </div>
        </div>

        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-[#E5E0D6]"></div>
          <span className="flex-shrink mx-3 text-[11px] text-[#A39B8E]">或輸入帳號密碼</span>
          <div className="flex-grow border-t border-[#E5E0D6]"></div>
        </div>

        {/* Manual Login Form */}
        <form onSubmit={handleManualLogin} className="space-y-3 text-xs">
          <div>
            <label className="block text-[#474034] font-medium mb-1">夥伴帳號／電子信箱：</label>
            <input
              type="text"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              placeholder="例如：master.chen@qiyun-tea.tw 或 admin"
              className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
            />
          </div>

          <div>
            <label className="block text-[#474034] font-medium mb-1">登入密碼：</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="預設體驗密碼：qiyun888"
              className="w-full p-2.5 bg-[#FAF8F5] border border-[#D9D0C3] rounded text-xs focus:outline-none focus:border-[#8C5B3E]"
            />
          </div>

          {error && (
            <div className="text-red-600 text-[11px] bg-red-50 p-2 rounded border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 bg-[#2A312B] hover:bg-[#8C5B3E] text-white font-medium rounded transition-colors text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>登入後台管理工作台</span>
          </button>
        </form>
      </div>
    </div>
  );
};

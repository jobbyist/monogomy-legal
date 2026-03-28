import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bot, X, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'monogamy_ai_notif_dismissed';

const NotificationBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="relative bg-gradient-to-r from-violet-600 via-violet-500 to-primary text-white text-sm py-2.5 px-4 flex items-center justify-center gap-3 z-[60]">
      <Bot className="w-4 h-4 flex-shrink-0 opacity-90" />
      <p className="text-center leading-snug">
        <span className="font-semibold">New:</span> AI-Powered Client Support &amp; Intake Tools + Workflow Automation — now available for law firms.{' '}
        <Link
          to="/ai-services"
          className="underline underline-offset-2 font-semibold hover:text-white/80 transition-colors inline-flex items-center gap-1"
        >
          Learn more <ArrowRight className="w-3 h-3 inline" />
        </Link>
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss notification"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default NotificationBar;

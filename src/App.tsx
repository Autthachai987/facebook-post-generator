import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Clock,
  Hash,
  Sparkles,
  Copy,
  Check,
  Instagram,
  Sun,
  Moon,
  ClipboardCopy,
  Lightning
} from 'lucide-react';

interface PostData {
  topic: string;
  tone: string;
  mood: string;
  date: string;
  time: string;
  extra?: string;
}

const tones = [
  { value: 'casual', label: '😊 สบายๆ ไม่เป็นทางการ' },
  { value: 'professional', label: '💼 เป็นทางการ มืออาชีพ' },
  { value: 'friendly', label: '🤝 เป็นกันเอง อบอุ่น' },
  { value: 'humorous', label: '😄 ตลก สนุกสนาน' },
  { value: 'inspirational', label: '✨ สร้างแรงบันดาลใจ' },
  { value: 'informative', label: '📚 ให้ข้อมูล การศึกษา' }
];

const moods = [
  { value: 'positive', label: '😊 เชิงบวก มีความสุข', emoji: '😊' },
  { value: 'excited', label: '🎉 ตื่นเต้น กระตือรือร้น', emoji: '🎉' },
  { value: 'thoughtful', label: '🤔 ใคร่ครวญ ลึกซึ้ง', emoji: '🤔' },
  { value: 'grateful', label: '🙏 ขอบคุณ รู้สึกซาบซึ้ง', emoji: '🙏' },
  { value: 'motivational', label: '💪 กระตุ้นใจ เร้าใจ', emoji: '💪' },
  { value: 'calm', label: '😌 สงบ ผ่อนคลาย', emoji: '😌' }
];

const initial: PostData = {
  topic: '',
  tone: 'casual',
  mood: 'positive',
  date: '',
  time: '',
  extra: ''
};

const App: React.FC = () => {
  const [formData, setFormData] = useState<PostData>(initial);
  const [generatedPost, setGeneratedPost] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Respect OS preference on first load
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePost = () => {
    if (!formData.topic.trim()) {
      window.alert('กรุณาระบุหัวข้อโพสต์');
      return;
    }

    setIsGenerating(true);
    setGeneratedPost('');
    setHashtags([]);

    // Simulate AI call
    setTimeout(() => {
      const moodEmoji = moods.find(m => m.value === formData.mood)?.emoji || '😊';
      const topic = formData.topic.trim();
      let post = '';

      switch (formData.tone) {
        case 'professional':
          post = `📢 ${topic}\n\nเรายินดีที่จะแบ่งปันข้อมูลเกี่ยวกับ ${topic} ซึ่งเป็นเรื่องที่สำคัญและมีประโยชน์ต่อทุกท่าน\n\nหากต้องการรายละเอียดเพิ่มเติม ติดต่อเราได้เสมอครับ/ค่ะ ${moodEmoji}`;
          break;
        case 'humorous':
          post = `555+ มาฟังเรื่อง ${topic} กันหน่อย! 😄\n\nวันนี้มีเรื่องขำๆ เกี่ยวกับ ${topic} มาแชร์ให้ฮากัน ใครเคยเจอแบบนี้บ้าง แชร์เลย! ${moodEmoji}`;
          break;
        case 'inspirational':
          post = `✨ ${topic} - บทเรียนแห่งความสำเร็จ\n\nเมื่อเราพูดถึง ${topic} เราจะนึกถึงโอกาสใหม่ๆ และการเติบโตเสมอ\n\nเชื่อในตัวเองและลงมือทำวันนี้ ${moodEmoji}\n\n#อย่ายอมแพ้ #สู้ต่อไป`;
          break;
        case 'informative':
          post = `📚 ข้อมูลน่าสนใจ: ${topic}\n\nข้อมูลสำคัญเกี่ยวกับ ${topic}:\n\n✅ สิ่งที่ควรรู้\n✅ ประโยชน์\n✅ วิธีใช้ในชีวิตประจำวัน\n\nหวังว่าจะเป็นประโยชน์นะครับ ${moodEmoji}`;
          break;
        case 'friendly':
          post = `สวัสดีครับ/ค่ะ! 🤗\n\nวันนี้อยากชวนคุยเรื่อง ${topic} ครับ เป็นเรื่องที่น่าสนใจมากและอยากฟังความคิดเห็นจากทุกคน ${moodEmoji}\n\nใครมีประสบการณ์มาแชร์กันได้นะครับ`;
          break;
        default:
          post = `เฮ้ย! มาคุยเรื่อง ${topic} กันหน่อย 😊\n\nวันนี้เจอเรื่องน่าสนใจเกี่ยวกับ ${topic} เลยอยากมาแชร์กัน มาคุยกันครับ! ${moodEmoji}`;
      }

      // allow user extra custom text appended
      if (formData.extra && formData.extra.trim()) {
        post += `\n\n${formData.extra.trim()}`;
      }

      setGeneratedPost(post);

      // Build hashtags
      const baseHashtags = [
        `#${topic.replace(/\s+/g, '')}`,
        '#FacebookThailand',
        '#ThaiContent',
        '#SocialMedia'
      ];

      if (formData.mood === 'positive') {
        baseHashtags.push('#PositiveVibes', '#HappyMoments');
      } else if (formData.mood === 'excited') {
        baseHashtags.push('#Exciting', '#LetsGo');
      } else if (formData.mood === 'motivational') {
        baseHashtags.push('#Motivation', '#Inspiration');
      }

      if (formData.tone === 'professional') {
        baseHashtags.push('#Business', '#Professional');
      } else if (formData.tone === 'humorous') {
        baseHashtags.push('#Funny', '#LOL');
      }

      setHashtags(baseHashtags);
      setIsGenerating(false);

    }, 900);
  };

  const copyToClipboard = async () => {
    if (!generatedPost) return;
    const fullPost = `${generatedPost}\n\n${hashtags.join(' ')}`;
    try {
      await navigator.clipboard.writeText(fullPost);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('copy failed', err);
      window.alert('ไม่สามารถคัดลอกได้ ลองอีกครั้ง');
    }
  };

  const copyHashtag = async (tag: string) => {
    try {
      await navigator.clipboard.writeText(tag);
      // small visual feedback could be added per-tag (not implemented to keep code concise)
    } catch (err) {
      console.error(err);
    }
  };

  const downloadTextFile = () => {
    if (!generatedPost) return;
    const blob = new Blob([`${generatedPost}\n\n${hashtags.join(' ')}`], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.topic.replace(/\s+/g, '_') || 'post'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formattedDate = () => {
    if (!formData.date) return '';
    try {
      return new Date(formData.date).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return formData.date;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-5xl mx-auto">

        {/* Top bar */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100">AI Facebook Post Generator</h1>
              <p className="text-sm text-gray-500 dark:text-gray-300">สร้างโพสต์คุณภาพสูง สวย ถูกใจ และใช้งานจริง</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-md bg-white dark:bg-slate-700 shadow-sm hover:shadow-md transition"
            >
              {theme === 'light' ? <Moon className="w-5 h-5 text-yellow-500" /> : <Sun className="w-5 h-5 text-yellow-300" />}
            </button>

            <div className="text-xs text-gray-500 dark:text-gray-300">Powered by Claude AI</div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: Form */}
          <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-slate-700">
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">ตั้งค่าการสร้างโพสต์</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">หัวข้อโพสต์ *</label>
                <input
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-gradient-to-r from-purple-50 to-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="เช่น: เทคนิคการตลาดออนไลน์"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">โทนการเขียน</label>
                  <select name="tone" value={formData.tone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none">
                    {tones.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">อารมณ์ของโพสต์</label>
                  <select name="mood" value={formData.mood} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none">
                    {moods.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">ข้อความเพิ่มเติม (ถ้ามี)</label>
                <textarea name="extra" value={formData.extra} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none" placeholder="เพิ่มรายละเอียดหรือ CTA, ลิงก์สั้น, หรือข้อความเฉพาะ"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"><Calendar className="inline mr-1 w-4 h-4"/> วันที่โพสต์</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"><Clock className="inline mr-1 w-4 h-4"/> เวลาโพสต์</label>
                  <input type="time" name="time" value={formData.time} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none" />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={generatePost} disabled={isGenerating} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow hover:scale-[1.01] transition disabled:opacity-60">
                  {isGenerating ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"/> กำลังสร้าง...</> : <><Sparkles className="w-5 h-5"/> สร้างโพสต์ด้วย AI</>}
                </button>

                <button onClick={() => { setFormData(initial); setGeneratedPost(''); setHashtags([]); }} className="px-4 py-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-100">รีเซ็ต</button>
              </div>

            </div>
          </section>

          {/* Right: Preview & Actions */}
          <aside className="space-y-4">

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-5 shadow-lg border border-purple-100 dark:border-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-900 p-2 shadow-sm flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-pink-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">ตัวอย่างโพสต์</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">ดูตัวอย่างก่อนโพสต์บน Facebook</div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">Realtime Preview</div>
                  </div>

                  <div className="mt-4 bg-white dark:bg-slate-900 rounded-lg p-4 border border-gray-100 dark:border-slate-700">
                    {generatedPost ? (
                      <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-100 leading-relaxed">{generatedPost}</div>
                    ) : (
                      <div className="text-gray-400 dark:text-gray-400">ยังไม่ได้สร้างโพสต์ — คลิก "สร้างโพสต์ด้วย AI" เพื่อดูตัวอย่าง</div>
                    )}
                  </div>

                  {/* Hashtag chips */}
                  {hashtags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {hashtags.map((tag, i) => (
                        <button key={i} onClick={() => copyHashtag(tag)} className="text-sm px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-sm hover:scale-[1.02] transition">{tag}</button>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
                    <button onClick={copyToClipboard} disabled={!generatedPost} className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-orange-500 text-white font-medium">
                      <ClipboardCopy className="w-4 h-4"/> {copied ? 'คัดลอกแล้ว' : 'คัดลอกโพสต์'}
                    </button>
                    <button onClick={downloadTextFile} disabled={!generatedPost} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-700">ดาวน์โหลด</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule card */}
            {(formData.date || formData.time) && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow border border-gray-100 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5 text-purple-600"/>
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-100">กำหนดการโพสต์</div>
                </div>
                <div className="text-gray-700 dark:text-gray-300 text-sm">
                  {formData.date && <div className="flex items-center gap-2 mb-1"><span className="font-medium">วันที่:</span> {formattedDate()}</div>}
                  {formData.time && <div className="flex items-center gap-2"><span className="font-medium">เวลา:</span> {formData.time} น.</div>}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-slate-800 dark:to-slate-800 rounded-2xl p-4 shadow border border-orange-100 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-2">
                <Lightning className="w-5 h-5 text-yellow-500" />
                <div className="text-sm font-medium text-gray-800 dark:text-gray-100">เคล็ดลับการโพสต์</div>
              </div>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• ใส่ CTA ชัดเจน เช่น “อ่านเพิ่มเติม”, “ติดต่อเรา”</li>
                <li>• ระบุวันที่/เวลาโพสต์ให้ชัด เพื่อการจัดการคอนเทนต์</li>
                <li>• ทดสอบโทนและอารมณ์เพื่อดูผลตอบรับจากผู้ติดตาม</li>
              </ul>
            </div>

          </aside>

        </main>

        <footer className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} — AI Facebook Post Generator</footer>
      </div>
    </div>
  );
};

export default App;

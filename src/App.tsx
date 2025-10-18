import React, { useState } from 'react';
import { Calendar, Clock, Hash, Sparkles, Copy, Check, Instagram, Zap, Menu, X } from 'lucide-react';

interface PostData {
  topic: string;
  tone: string;
  mood: string;
  date: string;
  time: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<PostData>({
    topic: '',
    tone: 'casual',
    mood: 'positive',
    date: '',
    time: ''
  });
  
  const [generatedPost, setGeneratedPost] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const generatePost = () => {
    if (!formData.topic.trim()) {
      alert('กรุณาระบุหัวข้อโพสต์');
      return;
    }

    setIsGenerating(true);
    
    setTimeout(() => {
      const moodEmoji = moods.find(m => m.value === formData.mood)?.emoji || '😊';
      
      let post = '';
      
      if (formData.tone === 'professional') {
        post = `📢 ${formData.topic}\n\nเรายินดีที่จะแบ่งปันข้อมูลเกี่ยวกับ ${formData.topic} กับทุกท่าน ซึ่งเป็นสิ่งสำคัญที่จะช่วยให้เราเติบโตและพัฒนาไปด้วยกัน\n\nหากท่านสนใจข้อมูลเพิ่มเติม สามารถติดต่อสอบถามได้เสมอครับ/ค่ะ ${moodEmoji}`;
      } else if (formData.tone === 'humorous') {
        post = `555+ มาฟังเรื่อง ${formData.topic} กันหน่อย! 😄\n\nวันนี้มีเรื่องสนุกๆ มาฝากกันค่ะ เกี่ยวกับ ${formData.topic} ซึ่งถ้าพูดตรงๆ... มันสนุกมากจริงๆ! ${moodEmoji}\n\nใครเคยเจอแบบนี้บ้าง แชร์ประสบการณ์กันหน่อยสิ 😆`;
      } else if (formData.tone === 'inspirational') {
        post = `✨ ${formData.topic} - บทเรียนแห่งความสำเร็จ\n\nทุกครั้งที่เราพูดถึง ${formData.topic} เราจะนึกถึงโอกาสและความเป็นไปได้ใหม่ๆ เสมอ\n\nเชื่อในตัวเอง เชื่อในกระบวนการ และเชื่อว่าทุกวันนี้คือจุดเริ่มต้นที่ดีที่สุด ${moodEmoji}\n\n#อย่ายอมแพ้ #สู้ต่อไป`;
      } else if (formData.tone === 'informative') {
        post = `📚 ข้อมูลน่าสนใจ: ${formData.topic}\n\nวันนี้มีข้อมูลดีๆ เกี่ยวกับ ${formData.topic} มาแชร์ให้เพื่อนๆ ได้รับทราบกัน\n\n✅ สิ่งที่ควรรู้\n✅ ประโยชน์ที่ได้รับ\n✅ วิธีการนำไปใช้ในชีวิตประจำวัน\n\nหวังว่าข้อมูลเหล่านี้จะมีประโยชน์นะคะ ${moodEmoji}`;
      } else if (formData.tone === 'friendly') {
        post = `สวัสดีค่า! 🤗\n\nวันนี้อยากมาพูดคุยเรื่อง ${formData.topic} กับทุกคนค่ะ เป็นเรื่องที่น่าสนใจมากๆ เลยอยากมาแชร์กัน ${moodEmoji}\n\nใครมีประสบการณ์หรือความเห็นเกี่ยวกับเรื่องนี้ มาแชร์กันได้นะคะ ยินดีรับฟังทุกความคิดเห็นเลยค่า 💕`;
      } else {
        post = `เฮ้ย! มาคุยเรื่อง ${formData.topic} กันหน่อย 😊\n\nวันนี้เจอเรื่องน่าสนใจเกี่ยวกับ ${formData.topic} เลยอยากมาแชร์กัน รู้สึกว่าหลายคนน่าจะชอบนะ ${moodEmoji}\n\nลองมาดูกันว่าทุกคนคิดยังไงบ้าง มาคุยกันได้เลย!`;
      }

      setGeneratedPost(post);
      
      const baseHashtags = [
        `#${formData.topic.replace(/\s+/g, '')}`,
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
    }, 1500);
  };

  const copyToClipboard = () => {
    const fullPost = `${generatedPost}\n\n${hashtags.join(' ')}`;
    navigator.clipboard.writeText(fullPost);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Instagram className="w-8 h-8 text-white" />
              <span className="text-white text-xl font-bold">AI Post Generator</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-white hover:text-yellow-200 font-medium transition-colors">หน้าหลัก</a>
              <a href="#features" className="text-white hover:text-yellow-200 font-medium transition-colors">ฟีเจอร์</a>
              <a href="#about" className="text-white hover:text-yellow-200 font-medium transition-colors">เกี่ยวกับเรา</a>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-100 transition-all shadow-md">
                ติดต่อเรา
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3 border-t border-white/20">
              <a href="#" className="block text-white hover:text-yellow-200 font-medium py-2">หน้าหลัก</a>
              <a href="#features" className="block text-white hover:text-yellow-200 font-medium py-2">ฟีเจอร์</a>
              <a href="#about" className="block text-white hover:text-yellow-200 font-medium py-2">เกี่ยวกับเรา</a>
              <button className="w-full bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-100 transition-all">
                ติดต่อเรา
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="#" className="hover:text-purple-600">Home</a>
            <span>-</span>
            <a href="#" className="hover:text-purple-600">AI Tools</a>
            <span>-</span>
            <span className="text-purple-600 font-medium">Facebook Post Generator</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Page Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              AI Facebook Post Generator - สร้างโพสต์ที่ช่วยให้ทำ SEO ได้ดียิ่งขึ้น!
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
              <span>เขียนโดย Claude AI</span>
              <span>•</span>
              <span>อัพเดทล่าสุด {new Date().toLocaleDateString('th-TH')}</span>
            </div>

            {/* Featured Image */}
            <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 p-12 flex items-center justify-center">
                <div className="text-center text-white">
                  <Instagram className="w-24 h-24 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-2">AI Post Generator</h2>
                  <p className="text-xl">สร้างโพสต์คุณภาพสูงในไม่กี่วินาที</p>
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-pink-500" />
                    หัวข้อโพสต์ *
                  </label>
                  <input
                    type="text"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    placeholder="เช่น: เทคนิคการตลาดออนไลน์, สูตรอาหารเช้าแสนอร่อย"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      🎨 เลือกโทนการเขียน
                    </label>
                    <select
                      name="tone"
                      value={formData.tone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition-all"
                    >
                      {tones.map(tone => (
                        <option key={tone.value} value={tone.value}>
                          {tone.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-800 mb-2">
                      💭 เลือกอารมณ์ของโพสต์
                    </label>
                    <select
                      name="mood"
                      value={formData.mood}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-all"
                    >
                      {moods.map(mood => (
                        <option key={mood.value} value={mood.value}>
                          {mood.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-pink-200">
                  <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-pink-500" />
                    กำหนดเวลาโพสต์ (ไม่บังคับ)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">วันที่</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">เวลา</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={generatePost}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>กำลังสร้างโพสต์...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6" />
                      <span>สร้างโพสต์ด้วย AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Post */}
            {generatedPost && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-pink-500" />
                      โพสต์ที่สร้างขึ้น
                    </h3>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg hover:shadow-lg font-semibold"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>คัดลอกแล้ว!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>คัดลอก</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {generatedPost}
                    </p>
                  </div>
                </div>

                {hashtags.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Hash className="w-5 h-5 text-yellow-600" />
                      <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-pink-600 bg-clip-text text-transparent">
                        แฮชแท็กแนะนำ
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hashtags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-pink-700 rounded-full text-sm font-bold border border-pink-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* CTA Card */}
              <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-yellow-500 rounded-2xl p-6 text-white shadow-xl">
                <div className="text-center mb-4">
                  <Instagram className="w-16 h-16 mx-auto mb-3" />
                  <h3 className="text-2xl font-bold mb-2">รับทำ SEO</h3>
                  <p className="text-white/90">ติดหน้าแรกที่ไร้ผลลัพธ์</p>
                </div>
                <button className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold hover:bg-yellow-50 transition-all shadow-md">
                  ปรึกษาฟรี
                </button>
              </div>

              {/* Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h4 className="font-bold text-lg mb-4 text-gray-900">ทำไมต้องใช้ AI?</h4>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">✓</span>
                    <span>ประหยัดเวลาในการคิดเนื้อหา</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">✓</span>
                    <span>โพสต์มีคุณภาพสูง</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">✓</span>
                    <span>เพิ่ม Engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 mt-1">✓</span>
                    <span>ใช้งานง่าย ไม่ซับซ้อน</span>
                  </li>
                </ul>
              </div>

              {/* Feature List */}
              <div className="bg-gradient-to-br from-yellow-50 to-pink-50 rounded-2xl shadow-md p-6 border border-pink-200">
                <h4 className="font-bold text-lg mb-4 text-gray-900">ฟีเจอร์เด่น</h4>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    <span>สร้างโพสต์อัตโนมัติ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-pink-500" />
                    <span>แนะนำแฮชแท็ก</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-pink-500" />
                    <span>กำหนดเวลาโพสต์</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Copy className="w-4 h-4 text-pink-500" />
                    <span>คัดลอกได้ง่าย</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Instagram className="w-5 h-5 text-pink-400" />
            <span className="font-bold">AI Post Generator</span>
          </div>
          <p className="text-gray-400 text-sm">
            Powered by Claude AI • สร้างโพสต์คุณภาพสูงในไม่กี่วินาที
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
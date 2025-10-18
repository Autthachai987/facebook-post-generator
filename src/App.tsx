import React, { useState } from 'react';
import { Calendar, Clock, Hash, Sparkles, Copy, Check, Instagram, Zap, Heart } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-4 md:p-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-300 to-pink-300 rounded-full filter blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          
          {/* Header - Instagram Gradient */}
          <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 p-10 overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-white/10"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                    <Instagram className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-1 tracking-tight">
                      AI Post Generator
                    </h1>
                    <p className="text-white/90 text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      สร้างโพสต์สุดปังด้วย AI
                    </p>
                  </div>
                </div>
                <Heart className="w-12 h-12 text-white/30 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="p-8 md:p-10">
            {/* Form Section */}
            <div className="space-y-6">
              
              {/* Topic Input */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-pink-500" />
                  หัวข้อโพสต์ *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="topic"
                    value={formData.topic}
                    onChange={handleInputChange}
                    placeholder="เช่น: เทคนิคการตลาดออนไลน์, สูตรอาหารเช้าแสนอร่อย"
                    className="w-full px-5 py-4 border-2 border-transparent rounded-2xl focus:border-pink-400 focus:outline-none transition-all bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 text-gray-800 font-medium placeholder-gray-400 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tone Selection */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    🎨 เลือกโทนการเขียน
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-transparent rounded-2xl focus:border-purple-400 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md cursor-pointer text-gray-800 font-medium"
                  >
                    {tones.map(tone => (
                      <option key={tone.value} value={tone.value}>
                        {tone.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mood Selection */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-800 mb-3">
                    💭 เลือกอารมณ์ของโพสต์
                  </label>
                  <select
                    name="mood"
                    value={formData.mood}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-transparent rounded-2xl focus:border-yellow-400 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md cursor-pointer text-gray-800 font-medium"
                  >
                    {moods.map(mood => (
                      <option key={mood.value} value={mood.value}>
                        {mood.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date and Time */}
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50 rounded-2xl p-6 border border-pink-200/50">
                <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pink-500" />
                  กำหนดเวลาโพสต์ (ไม่บังคับ)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">
                      วันที่
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-transparent rounded-xl focus:border-pink-400 focus:outline-none transition-all bg-white shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-2">
                      เวลา
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-transparent rounded-xl focus:border-pink-400 focus:outline-none transition-all bg-white shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generatePost}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white relative z-10"></div>
                    <span className="relative z-10">กำลังสร้างโพสต์...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 relative z-10 animate-pulse" />
                    <span className="relative z-10">สร้างโพสต์ด้วย AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Generated Post Section */}
            {generatedPost && (
              <div className="mt-10 space-y-6 animate-fade-in">
                
                {/* Post Card */}
                <div className="relative bg-gradient-to-br from-white to-purple-50/50 rounded-3xl p-8 border-2 border-pink-200/50 shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-300 to-yellow-300 rounded-full filter blur-3xl opacity-20"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-pink-500" />
                        โพสต์ที่สร้างขึ้น
                      </h3>
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-xl hover:from-pink-600 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 font-semibold"
                      >
                        {copied ? (
                          <>
                            <Check className="w-5 h-5" />
                            <span>คัดลอกแล้ว!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-5 h-5" />
                            <span>คัดลอก</span>
                          </>
                        )}
                      </button>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-md border border-pink-100">
                      <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base">
                        {generatedPost}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hashtags Card */}
                {hashtags.length > 0 && (
                  <div className="relative bg-gradient-to-br from-white to-yellow-50/50 rounded-3xl p-8 border-2 border-yellow-200/50 shadow-xl hover:shadow-2xl transition-shadow">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-300 to-pink-300 rounded-full filter blur-3xl opacity-20"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-5">
                        <Hash className="w-6 h-6 text-yellow-600" />
                        <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                          แฮชแท็กแนะนำ
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {hashtags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-5 py-2.5 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 text-pink-700 rounded-full text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-default border border-pink-200/50 hover:scale-105 transform"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Schedule Info Card */}
                {(formData.date || formData.time) && (
                  <div className="relative bg-gradient-to-br from-white to-pink-50/50 rounded-3xl p-8 border-2 border-purple-200/50 shadow-xl">
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full filter blur-3xl opacity-20"></div>
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-5 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-purple-500" />
                        กำหนดการโพสต์
                      </h3>
                      <div className="space-y-3">
                        {formData.date && (
                          <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-purple-200/50 shadow-sm">
                            <div className="p-2 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg">
                              <Calendar className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="font-semibold text-gray-700">
                              วันที่: {new Date(formData.date).toLocaleDateString('th-TH', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        )}
                        {formData.time && (
                          <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-purple-200/50 shadow-sm">
                            <div className="p-2 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-lg">
                              <Clock className="w-5 h-5 text-pink-600" />
                            </div>
                            <span className="font-semibold text-gray-700">
                              เวลา: {formData.time} น.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 space-y-2">
          <p className="flex items-center justify-center gap-2 text-gray-700 font-medium">
            <span>Powered by</span>
            <span className="font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-yellow-600 bg-clip-text text-transparent">
              Claude AI
            </span>
            <Instagram className="w-5 h-5 text-pink-500" />
          </p>
          <p className="text-gray-500 text-sm">สร้างโพสต์คุณภาพสูงในไม่กี่วินาที 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default App;
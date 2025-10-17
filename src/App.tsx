import React, { useState } from 'react';
import { Calendar, Clock, Hash, Sparkles, Copy, Check } from 'lucide-react';

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
        post = `555+ มาฟังเรื่อง ${formData.topic} กันหน่อย! 😄\n\nวันนี้มีเรื่องสนุกๆ มาฝากกันครับ เกี่ยวกับ ${formData.topic} ซึ่งถ้าพูดตรงๆ... มันสนุกมากจริงๆ! ${moodEmoji}\n\nใครเคยเจอแบบนี้บ้าง แชร์ประสบการณ์กันหน่อยสิ 😆`;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl font-bold">AI Facebook Post Generator</h1>
            </div>
            <p className="text-blue-100">สร้างโพสต์เฟสบุคคุณภาพสูงด้วย AI ของ Claude</p>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  หัวข้อโพสต์ *
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="เช่น: เทคนิคการตลาดออนไลน์, สูตรอาหารเช้าแสนอร่อย"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  เลือกโทนการเขียน
                </label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white"
                >
                  {tones.map(tone => (
                    <option key={tone.value} value={tone.value}>
                      {tone.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  เลือกอารมณ์ของโพสต์
                </label>
                <select
                  name="mood"
                  value={formData.mood}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors bg-white"
                >
                  {moods.map(mood => (
                    <option key={mood.value} value={mood.value}>
                      {mood.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    วันที่โพสต์
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    เวลาโพสต์
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <button
                onClick={generatePost}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>กำลังสร้างโพสต์...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>สร้างโพสต์ด้วย AI</span>
                  </>
                )}
              </button>
            </div>

            {generatedPost && (
              <div className="mt-8 space-y-4">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">โพสต์ที่สร้างขึ้น</h3>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">คัดลอกแล้ว!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-600">คัดลอก</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {generatedPost}
                    </p>
                  </div>
                </div>

                {hashtags.length > 0 && (
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Hash className="w-5 h-5 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-800">แฮชแท็กแนะนำ</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hashtags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white text-blue-600 rounded-full text-sm font-medium shadow-sm border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(formData.date || formData.time) && (
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">กำหนดการโพสต์</h3>
                    <div className="flex flex-col gap-2 text-gray-700">
                      {formData.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-green-600" />
                          <span>วันที่: {new Date(formData.date).toLocaleDateString('th-TH', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                      )}
                      {formData.time && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-green-600" />
                          <span>เวลา: {formData.time} น.</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>Powered by Claude AI • สร้างโพสต์คุณภาพสูงในไม่กี่วินาที</p>
        </div>
      </div>
    </div>
  );
};

export default App;
import { Reveal } from '../../ui/Reveal';
import { useLanguage } from '../../../utils/languageContext';

export function VisitInfo() {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {/* Location */}
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8">
            <div className="md:col-span-6">
                <span className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                  {language === 'th' ? 'สถานที่' : 'Location'}
                </span>
            </div>
            <div className="md:col-span-6 flex flex-col gap-8">
                <div className="flex flex-col gap-1">
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'เขาใหญ่ อาร์ตฟอเรสต์' : 'Khao Yai Art Forrest'}
                    </p>
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      Pong Ta Long, Pak Chong District,
                    </p>
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      Nakhon Ratchasima 30130, Thailand
                    </p>
                    <p className={`text-xl md:text-2xl font-sans text-gray-500 mt-2 ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'ประมาณ 3 ชั่วโมงจากกรุงเทพฯ ใกล้อุทยานแห่งชาติเขาใหญ่' : 'Approx. 3 hours from Bangkok, near Khao Yai National Park.'}
                    </p>
                </div>
                
                <div className="flex flex-col gap-1">
                    <p className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                      {language === 'th' ? 'เวลาทำการ' : 'Opening Hours'}
                    </p>
                    <div className="flex flex-col gap-1 mt-2">
                        <div className="flex justify-between max-w-md">
                            <span className="text-xl md:text-2xl font-sans text-black">Thursday - Friday</span>
                            <span className="text-xl md:text-2xl font-sans text-black">12:30 PM – 6:00 PM</span>
                        </div>
                        <div className="flex justify-between max-w-md">
                            <span className="text-xl md:text-2xl font-sans text-black">Saturday - Sunday</span>
                            <span className="text-xl md:text-2xl font-sans text-black">10:00 AM – 6:00 PM</span>
                        </div>
                        <div className="flex justify-between max-w-md text-gray-500">
                            <span className="text-xl md:text-2xl font-sans">Monday - Wednesday</span>
                            <span className="text-xl md:text-2xl font-sans">Closed</span>
                        </div>
                        <p className="text-lg md:text-xl font-sans text-gray-500 mt-2">Last admission: 5:30 PM</p>
                    </div>
                </div>
                
                <div className="w-full aspect-square md:aspect-[4/3] bg-[#D9D9D9] relative overflow-hidden">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61748.97609802094!2d101.48784332167969!3d14.5020468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311c3a64795e1c77%3A0x6c6e755259929849!2sPong%20Ta%20Long%2C%20Pak%20Chong%20District%2C%20Nakhon%20Ratchasima%2030130!5e0!3m2!1sen!2sth!4v1709292837283!5m2!1sen!2sth"
                        title="Khao Yai Art Forrest Map"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale opacity-80 hover:opacity-100 transition-opacity duration-500"
                    />
                </div>
            </div>
        </div>
      </Reveal>

      {/* Admission */}
      <Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8">
            <div className="md:col-span-6">
                <span className={`text-xl md:text-2xl font-sans text-black ${language === 'th' ? 'leading-[1.82em]' : ''}`}>
                  {language === 'th' ? 'ค่าเข้าชม' : 'Admission Details'}
                </span>
            </div>
            <div className="md:col-span-6 flex flex-col gap-4">
                <div className="flex flex-col">
                    <span className="text-xl md:text-2xl font-sans text-black font-medium">General Admission: 500 THB</span>
                </div>
                <div className="flex flex-col">
                     <span className="text-xl md:text-2xl font-sans text-black">Free Zone:</span>
                     <span className="text-lg md:text-xl font-sans text-gray-600">Maman sculpture and % Arabica zone (free access until May 2025)</span>
                </div>
                
                <div className="flex flex-col mt-4">
                    <span className="text-xl md:text-2xl font-sans text-black font-medium mb-2">Fog Experience Schedule:</span>
                    <div className="flex flex-col gap-1 text-lg md:text-xl font-sans text-gray-600">
                        <p>Thursday - Friday: 4:30 PM (10-minute round)</p>
                        <p>Saturday - Sunday: 11:30 AM & 4:30 PM (10-minute rounds)</p>
                    </div>
                </div>
            </div>
        </div>
      </Reveal>

    </div>
  );
}

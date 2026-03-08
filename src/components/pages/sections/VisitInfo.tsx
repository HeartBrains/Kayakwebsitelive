import { useLanguage } from '../../../utils/languageContext';

export function VisitInfo() {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col gap-12 md:gap-16">
      {/* Visit Info */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-8">
            <div className="md:col-span-6">
                <span className="text-xl md:text-2xl font-sans text-black">
                  {language === 'th' ? 'เยี่ยมชม' : 'Visit'}
                </span>
            </div>
            <div className="md:col-span-6 flex flex-col gap-8">
                {/* Title */}
                <div className="flex flex-col gap-1">
                    {language !== 'th' && (
                        <p className="text-xl md:text-2xl font-sans text-black">
                          Khao Yai Art Forest
                        </p>
                    )}
                    {language === 'th' && (
                        <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">
                          Khao Yai Art Forest
                        </p>
                    )}
                </div>
                
                {/* Opening Hour */}
                <div className="flex flex-col gap-4">
                    <p className="text-xl md:text-2xl font-sans text-black font-medium">
                      {language === 'th' ? 'วันเปิดบริการ' : 'Opening Hours'}
                    </p>
                    
                    <div className="flex flex-col gap-4">
                        {/* Thu-Fri */}
                        <div className="flex flex-col gap-1">
                             <div className="flex flex-col">
                                 {language !== 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-black">
                                        Thursday - Friday | 12:30 - 18:00
                                     </p>
                                 )}
                                 {language === 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">
                                        วันพฤหัสบดี - วันศุกร์ | 12:30 - 18:00
                                     </p>
                                 )}
                             </div>
                             <div className="flex flex-col">
                                 {language !== 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-gray-500">
                                        Fog Forest Experience: 16:00 (10 minutes)
                                     </p>
                                 )}
                                 {language === 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                        เวลาชมผลงาน Fog forest: 16:00 (10 นาที)
                                     </p>
                                 )}
                             </div>
                        </div>

                        {/* Sat-Sun */}
                        <div className="flex flex-col gap-1">
                             <div className="flex flex-col">
                                 {language !== 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-black">
                                        Saturday - Sunday | 10:00 - 18:00
                                     </p>
                                 )}
                                 {language === 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">
                                        วันเสาร์ - วันอาทิตย์ | 10:00 - 18:00
                                     </p>
                                 )}
                             </div>
                             <div className="flex flex-col">
                                 {language !== 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-gray-500">
                                        Fog Forest Experience: 11:30 and 16:30 (10 minutes)
                                     </p>
                                 )}
                                 {language === 'th' && (
                                     <p className="text-xl md:text-2xl font-sans text-gray-500 leading-[1.82em]">
                                        เวลาชมผลงาน Fog forest: 11:30 และ 16:30 (10 นาที)
                                     </p>
                                 )}
                             </div>
                        </div>
                    </div>
                </div>

                {/* Closed */}
                <div className="flex flex-col gap-1">
                    <p className="text-xl md:text-2xl font-sans text-black font-medium">
                      {language === 'th' ? 'วันปิดทำการ' : 'Closed'}
                    </p>
                    <div className="flex flex-col">
                        {language !== 'th' && (
                            <p className="text-xl md:text-2xl font-sans text-black">
                                Monday - Wednesday
                            </p>
                        )}
                        {language === 'th' && (
                            <p className="text-xl md:text-2xl font-sans text-black leading-[1.82em]">
                                วันจันทร์ - วันพุธ
                            </p>
                        )}
                    </div>
                </div>
                
                {/* Map */}
                <div className="w-full aspect-square md:aspect-[4/3] bg-[#D9D9D9] relative overflow-hidden mt-4">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61748.97609802094!2d101.48784332167969!3d14.5020468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311c3a64795e1c77%3A0x6c6e755259929849!2sPong%20Ta%20Long%2C%20Pak%20Chong%20District%2C%20Nakhon%20Ratchasima%2030130!5e0!3m2!1sen!2sth!4v1709292837283!5m2!1sen!2sth"
                        title="Khao Yai Art Forest Map"
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
    </div>
  );
}
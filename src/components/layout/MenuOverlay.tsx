import { X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ASSETS } from '../../utils/assets';
import { ExpandingSearch } from '../search/ExpandingSearch';
import { useLanguage } from '../../utils/languageContext';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
  activePage: string;
}

interface MenuItem {
    label: string;
    page: string;
    children?: MenuItem[];
}

export function MenuOverlay({ isOpen, onClose, onNavigate, activePage }: MenuOverlayProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const { language, setLanguage, t } = useLanguage();

  const toggleExpand = (label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  // Dynamic sitemap based on current language
  const sitemap: MenuItem[] = [
    { label: t('nav.home'), page: 'home' },
    { label: t('nav.visit'), page: 'visit' },
    { 
      label: t('nav.exhibitions'), 
      page: 'exhibitions',
      children: [
          { label: t('exhibitions.current'), page: 'exhibitions' },
          { label: t('exhibitions.upcoming'), page: 'exhibitions' },
          { label: 'Moving Image Program', page: 'exhibitions' },
      ]
    },
    {
        label: t('nav.activities'),
        page: 'activities',
        children: [
            { label: 'Public Program', page: 'activities' },
            { label: t('activities.screenings'), page: 'activities' },
        ]
    },
    {
        label: t('nav.residency'),
        page: 'residency',
        children: [
            { label: t('residency.currentArtists'), page: 'residency' },
            { label: t('residency.pastArtists'), page: 'residency' },
        ]
    },
    { label: t('nav.blog'), page: 'blog' },
    { label: t('nav.aboutUs'), page: 'about' },
    { label: t('nav.team'), page: 'team' },
    {
        label: t('nav.shop'),
        page: 'shop',
        children: [
            { label: 'Bookings', page: 'shop' },
            { label: 'Products', page: 'shop' },
        ]
    },
    {
        label: t('nav.archives'),
        page: 'archives',
        children: [
            { label: t('exhibitions.past'), page: 'archives' },
            { label: 'Past Activities', page: 'archives' },
        ]
    },
    { label: t('nav.contact'), page: 'contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex text-white font-sans"
        >
          {/* Left Image Side - Hidden on Mobile */}
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="hidden md:block w-1/2 h-full relative overflow-hidden"
          >
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${ASSETS.BUILDING})` }}
            />

          </motion.div>

          {/* Right Content Side */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full md:w-1/2 h-full bg-black flex flex-col relative overflow-y-auto"
          >
             {/* Close Button */}
             <div className="absolute top-6 right-6 z-20">
                <button onClick={onClose} className="hover:opacity-70 transition-opacity duration-300">
                    <X className="w-6 h-6 text-white" />
                </button>
             </div>

             {/* Navigation Links Container */}
             <motion.div 
                className="flex-1 flex flex-col px-8 md:px-16 pt-20 pb-8"
                initial="hidden"
                animate="show"
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.05,
                            delayChildren: 0.3
                        }
                    }
                }}
             >
                <div className="flex flex-col gap-2 -mt-14 px-[0px] py-[0.18px] pt-[15px] pr-[0px] pb-[0px] pl-[0px]">
                    {sitemap.map((item) => {
                        const isExpanded = expandedItems.includes(item.label);
                        const hasChildren = item.children && item.children.length > 0;
                        const isActive = activePage === item.page;

                        return (
                            <motion.div 
                                key={item.label}
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    show: { opacity: 1, x: 0 }
                                }}
                                className="flex flex-col"
                            >
                                <div className="flex items-center justify-between group">
                                    <button
                                        onClick={() => {
                                            onNavigate(item.page);
                                            onClose();
                                        }}
                                        className={`text-left text-xl md:text-2xl font-normal transition-colors duration-300 tracking-wide ${
                                            isActive ? 'text-gray-300' : 'text-white group-hover:text-gray-300'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                    
                                    {hasChildren && (
                                        <button 
                                            onClick={(e) => toggleExpand(item.label, e)}
                                            className="p-2 text-gray-400 hover:text-white transition-colors"
                                        >
                                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                </div>

                                <AnimatePresence>
                                    {hasChildren && isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden pl-4 md:pl-6 border-l border-white/10 ml-2 mt-2 space-y-2"
                                        >
                                            {item.children!.map((child) => {
                                                // Translate specific child labels
                                                let displayLabel = child.label;
                                                if (language === 'th') {
                                                    switch (child.label) {
                                                        case 'Bookings': displayLabel = 'การจอง'; break;
                                                        case 'Products': displayLabel = 'สินค้า'; break;
                                                        case 'Moving Image Program': displayLabel = 'โปรแกรมภาพเคลื่อนไหว'; break;
                                                        case 'Public Program': displayLabel = 'โปรแกรมสาธารณะ'; break;
                                                        case 'Past Activities': displayLabel = 'กิจกรรมที่ผ่านมา'; break;
                                                    }
                                                }

                                                return (
                                                    <button
                                                        key={child.label}
                                                        onClick={() => {
                                                            onNavigate(child.page);
                                                            onClose();
                                                        }}
                                                        className="block w-full text-left text-lg text-gray-500 hover:text-white transition-colors py-1"
                                                    >
                                                        {displayLabel}
                                                    </button>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}

                    {/* Footer Section */}
                </div>

                <motion.div 
                    className="mt-auto flex justify-between items-end w-full pt-8"
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                    }}
                >
                    <div className="flex items-center gap-6">
                        <ExpandingSearch 
                            onNavigate={(page) => {
                                onNavigate(page);
                                onClose();
                            }}
                            className="gap-2"
                            iconClassName="w-6 h-6 text-white"
                            inputClassName="w-40 text-lg text-white placeholder:text-gray-500"
                        />
                        <a 
                            href="https://bkk.thaicms.com"
                            className="text-xl md:text-2xl text-white font-normal hover:text-gray-300 transition-colors uppercase tracking-wide cursor-pointer"
                        >
                            BKKK
                        </a>
                    </div>

                    <div className="text-xl md:text-2xl font-normal text-gray-500 select-none tracking-wide flex items-center">
                        <button 
                            className={`cursor-pointer transition-colors ${language === 'en' ? 'text-white' : 'hover:text-white'}`}
                            onClick={() => setLanguage('en')}
                        >
                            EN
                        </button>
                        <span className="mx-2">|</span>
                        <button 
                            className={`cursor-pointer transition-colors ${language === 'th' ? 'text-white' : 'hover:text-white'}`}
                            onClick={() => setLanguage('th')}
                        >
                            TH
                        </button>
                    </div>
                </motion.div>

             </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
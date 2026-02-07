import { useState, useEffect } from 'react';
import { LanguageProvider } from './utils/languageContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MenuOverlay } from './components/layout/MenuOverlay';
import { BackToTop } from './components/ui/BackToTop';
import { HomePage } from './components/pages/HomePage';
import { KhaoYaiPage } from './components/pages/KhaoYaiPage';
import { AboutPage } from './components/pages/AboutPage';
import { TeamPage } from './components/pages/TeamPage';
import { SupportPage } from './components/pages/SupportPage';
import { VisitPage } from './components/pages/VisitPage';
import { PostPage } from './components/pages/PostPage';
import { ActivitiesPage } from './components/pages/ActivitiesPage';
import { BlogPage } from './components/pages/BlogPage';
import { BlogDetailPage } from './components/pages/BlogDetailPage';
import { ExhibitionsPage } from './components/pages/ExhibitionsPage';
import { ExhibitionDetailPage } from './components/pages/ExhibitionDetailPage';
import { ActivityDetailPage } from './components/pages/ActivityDetailPage';
import { ArchivesPage } from './components/pages/ArchivesPage';
import { ResidencyPage } from './components/pages/ResidencyPage';
import { ShopPage } from './components/pages/ShopPage';
import { PressPage } from './components/pages/PressPage';
import { ContactPage } from './components/pages/ContactPage';
import { HiddenAssetsPage } from './components/pages/HiddenAssetsPage';
import { ArtistDetailPage } from './components/pages/ArtistDetailPage';

export type Page = 'home' | 'khaoyai' | 'about' | 'vision' | 'history' | 'founder' | 'team' | 'support' | 'visit' | 'news' | 'activities' | 'activity-detail' | 'blog' | 'blog-detail' | 'exhibitions' | 'exhibition-detail' | 'archives' | 'residency' | 'artist-detail' | 'shop' | 'press' | 'contact' | 'hidden-assets';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // New state for navigation history and detail pages
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>();
  const [backPage, setBackPage] = useState<Page | undefined>();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: string, slug?: string, backTo?: Page) => {
      // If navigating to a detail page, set the slug and back reference
      if (slug) {
          setSelectedSlug(slug);
      }
      if (backTo) {
          setBackPage(backTo);
      } else {
          // If simply navigating top-level, reset backPage unless we want to keep history?
          // Usually we want to reset it so default "Back" works.
          setBackPage(undefined);
      }

      setCurrentPage(page as Page);
      window.scrollTo(0, 0);
      setIsMenuOpen(false);
  };

  // Header is transparent on all pages when at the top
  // Exception: TeamPage (founder/team) always has black text (isTransparent=false)
  const isTransparent = !scrolled && !['founder', 'team'].includes(currentPage);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
        <Header 
          onMenuClick={() => setIsMenuOpen(true)} 
          onLogoClick={() => handleNavigate('home')}
          isTransparent={isTransparent}
        />

        <MenuOverlay 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)}
          onNavigate={handleNavigate}
          activePage={currentPage}
        />

        <main>
          {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
          {currentPage === 'khaoyai' && <KhaoYaiPage onNavigate={handleNavigate} />}
          {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} activePage="about" />}
          {currentPage === 'vision' && <AboutPage onNavigate={handleNavigate} activePage="vision" />}
          {currentPage === 'history' && <AboutPage onNavigate={handleNavigate} activePage="history" />}
          
          {currentPage === 'founder' && <TeamPage onNavigate={handleNavigate} activePage="founder" />}
          {currentPage === 'team' && <TeamPage onNavigate={handleNavigate} activePage="founder" />}
          
          {currentPage === 'support' && <SupportPage />}
          {currentPage === 'visit' && <VisitPage />}
          {currentPage === 'news' && <PostPage onNavigate={handleNavigate} />}
          {currentPage === 'activities' && <ActivitiesPage onNavigate={handleNavigate} />}
          {currentPage === 'activity-detail' && <ActivityDetailPage onNavigate={handleNavigate} slug={selectedSlug || "neon-reveries"} backPage={backPage} />}
          {currentPage === 'blog' && <BlogPage onNavigate={handleNavigate} />}
          {currentPage === 'blog-detail' && <BlogDetailPage onNavigate={handleNavigate} slug={selectedSlug || "art-as-reflection"} />}
          {currentPage === 'exhibitions' && <ExhibitionsPage onNavigate={handleNavigate} />}
          {currentPage === 'exhibition-detail' && <ExhibitionDetailPage onNavigate={handleNavigate} slug={selectedSlug || "unwinding-architecture"} backPage={backPage} />}
          {currentPage === 'archives' && <ArchivesPage onNavigate={handleNavigate} />}
          {currentPage === 'residency' && <ResidencyPage onNavigate={handleNavigate} />}
          {currentPage === 'artist-detail' && <ArtistDetailPage onNavigate={handleNavigate} slug={selectedSlug} backPage={backPage} />}
          {currentPage === 'shop' && <ShopPage onNavigate={handleNavigate} />}
          {currentPage === 'press' && <PressPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'hidden-assets' && <HiddenAssetsPage />}
        </main>

        <Footer onNavigate={handleNavigate} />
        <BackToTop />
      </div>
    </LanguageProvider>
  );
}

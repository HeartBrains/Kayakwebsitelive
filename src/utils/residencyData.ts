export interface ArtistDetail {
  id: number;
  slug: string;
  name: string;
  nameTH: string;
  period: string; // Used for "date" in ResidencyPage
  periodTH: string;
  image: string;
  category: 'current' | 'previous';
  bio: string;
  bioTH: string;
  statement: string;
  statementTH: string;
  gallery: string[];
}

export const ARTISTS_DATA: ArtistDetail[] = [
  {
    id: 1,
    slug: 'cole-lu',
    name: "Cole Lu",
    nameTH: "โคล ลู",
    period: "October 2024",
    periodTH: "ตุลาคม 2567",
    image: "https://images.unsplash.com/photo-1700896019740-50219bc94ab0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBpbnN0YWxsYXRpb24lMjB3b29kZW58ZW58MXx8fHwxNzY4MTM4Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: 'previous',
    bio: "Cole Lu (b. 1984, Taipei) is an artist whose work explores the intricate relationships between history, text, and materiality. Through a practice that spans writing, sculpture, and installation, Lu examines how narratives are constructed and how they shape our understanding of the world. Her work often references classical mythology and literature, recontextualizing these sources to address contemporary issues of identity and belonging.",
    bioTH: "โคล ลู (เกิดปี 2527, ไทเป) เป็นศิลปินที่มีผลงานสำรวจความสัมพันธ์ที่ซับซ้อนระหว่างประวัติศาสตร์ ข้อความ และความเป็นวัตถุ ผ่านการปฏิบัติที่ครอบคลุมทั้งงานเขียน ประติมากรรม และศิลปะจัดวาง ลูตรวจสอบว่าเรื่องเล่าถูกสร้างขึ้นอย่างไรและหล่อหลอมความเข้าใจโลกของเราอย่างไร ผลงานของเธอมักอ้างอิงตำนานและวรรณกรรมคลาสสิก โดยนำแหล่งข้อมูลเหล่านี้มาปรับบริบทใหม่เพื่อแก้ไขปัญหาเกี่ยวกับอัตลักษณ์และความเป็นเจ้าของในยุคปัจจุบัน",
    statement: "In her residency at Khao Yai Art Forest, Lu focused on a new body of work that investigates the intersection of language and objecthood. Using burnt wood as a primary medium, she created a series of relief sculptures that function as both image and text. The process of burning, for Lu, is a way of inscribing memory and loss into the material itself. The resulting works are haunting and evocative, inviting viewers to decipher the hidden meanings embedded within the charred surfaces.",
    statementTH: "ในระหว่างการพำนักที่เขาใหญ่ อาร์ตฟอเรสต์ ลูมุ่งเน้นไปที่ผลงานชุดใหม่ที่ตรวจสอบจุดตัดของภาษาและความเป็นวัตถุ โดยใช้ไม้เผาเป็นสื่อหลัก เธอสร้างชุดประติมากรรมนูนต่ำที่ทำหน้าที่เป็นทั้งภาพและข้อความ กระบวนการเผาสำหรับลูเป็นวิธีจารึกความทรงจำและการสูญเสียลงในวัสดุ ผลงานที่ได้นั้นน่าขนลุกและกระตุ้นความรู้สึก เชิญชวนให้ผู้ชมถอดรหัสความหมายที่ซ่อนอยู่ภายในพื้นผิวที่ไหม้เกรียม",
    gallery: [
      "https://images.unsplash.com/photo-1700896019740-50219bc94ab0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBpbnN0YWxsYXRpb24lMjB3b29kZW58ZW58MXx8fHwxNzY4MTM4Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1767294274527-5a73444d6b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBpbnN0YWxsYXRpb24lMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2ODE1MTE0NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1641766860997-53f4b4a68d23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBzdHVkaW8lMjBjb250ZW1wb3JhcnklMjBhcnR8ZW58MXx8fHwxNzY4MTUxMTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: 2,
    slug: 'nicolas-amato',
    name: "Nicolas Amato",
    nameTH: "นิโกลาส อามาโต",
    period: "January–February 2025",
    periodTH: "มกราคม–กุมภาพันธ์ 2568",
    image: "https://images.unsplash.com/photo-1663192070720-c0828beeb284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYmFuZG9uZWQlMjBzdGFpcmNhc2UlMjBhcnQlMjBpbnN0YWxsYXRpb24lMjB3b29kZW58ZW58MXx8fHwxNzY4MTM4Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: 'previous',
    bio: "Nicolas Amato is a French-Italian artist known for his immersive installations that manipulate light and space. His work challenges perception, creating environments that disorient and engage the viewer's sensory experience. Amato draws inspiration from architectural theory and the phenomenology of perception.",
    bioTH: "นิโกลาส อามาโต เป็นศิลปินชาวฝรั่งเศส-อิตาลี ที่รู้จักกันในงานติดตั้งแบบดื่มด่ำที่จัดการกับแสงและพื้นที่ ผลงานของเขาท้าทายการรับรู้ สร้างสภาพแวดล้อมที่ทำให้สับสนและดึงดูดประสบการณ์ทางประสาทสัมผัสของผู้ชม อามาโตได้รับแรงบันดาลใจจากทฤษฎีสถาปัตยกรรมและปรากฏการณ์วิทยาของการรับรู้",
    statement: "During his time at the residency, Amato developed a site-specific installation responding to the unique light conditions of Bangkok. He experimented with reflective materials and programmed lighting sequences to transform the gallery space into a shifting landscape of color and shadow. The work invites the audience to become active participants, as their movements and perspectives alter the visual composition of the piece.",
    statementTH: "ในช่วงเวลาที่เขาพำนัก อามาโตได้พัฒนาการติดตั้งเฉพาะพื้นที่ที่ตอบสนองต่อสภาพแสงที่เป็นเอกลักษณ์ของกรุงเทพฯ เขาได้ทดลองกับวัสดุสะท้อนแสงและลำดับแสงที่ตั้งโปรแกรมไว้เพื่อเปลี่ยนพื้นที่แกลเลอรีให้เป็นภูมิทัศน์ของสีและเงาที่เปลี่ยนแปลงตลอดเวลา ผลงานเชิญชวนให้ผู้ชมกลายเป็นผู้มีส่วนร่วมที่กระตือรือร้น เนื่องจากการเคลื่อนไหวและมุมมองของพวกเขาเปลี่ยนองค์ประกอบภาพของชิ้นงาน",
    gallery: [
      "https://images.unsplash.com/photo-1663192070720-c0828beeb284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYmFuZG9uZWQlMjBzdGFpcmNhc2UlMjBhcnQlMjBpbnN0YWxsYXRpb24lMjB3b29kZW58ZW58MXx8fHwxNzY4MTM4Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1767294274527-5a73444d6b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBpbnN0YWxsYXRpb24lMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2ODE1MTE0NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1641766860997-53f4b4a68d23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBzdHVkaW8lMjBjb250ZW1wb3JhcnklMjBhcnR8ZW58MXx8fHwxNzY4MTUxMTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: 3,
    slug: 'spencer-sweeney',
    name: "Spencer Sweeney",
    nameTH: "สเปนเซอร์ สวีนีย์",
    period: "July–December 2025",
    periodTH: "กรกฎาคม–ธันวาคม 2568",
    image: "https://images.unsplash.com/photo-1637761566180-9dbde4fdab77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBpbiUyMHN0dWRpbyUyMHdvcmtpbmclMjBjb250ZW1wb3Jhcnl8ZW58MXx8fHwxNzY4MTM4Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: 'previous',
    bio: "Spencer Sweeney is a New York-based artist whose energetic and eclectic practice encompasses painting, performance, and music. A central figure in the downtown New York art scene, Sweeney's work is characterized by its raw energy, humor, and collaborative spirit. He often uses the portrait format to explore psychological states and social dynamics.",
    bioTH: "สเปนเซอร์ สวีนีย์ เป็นศิลปินจากนิวยอร์กที่มีการปฏิบัติที่เต็มไปด้วยพลังและหลากหลาย ครอบคลุมทั้งจิตรกรรม การแสดง และดนตรี ในฐานะบุคคลสำคัญในวงการศิลปะดาวน์ทาวน์นิวยอร์ก ผลงานของสวีนีย์มีลักษณะเด่นที่พลังดิบ อารมณ์ขัน และจิตวิญญาณแห่งการทำงานร่วมกัน เขามักใช้รูปแบบภาพบุคคลเพื่อสำรวจสภาวะทางจิตวิทยาและพลวัตทางสังคม",
    statement: "For his Bangkok residency, Sweeney set up an open studio, collaborating with local musicians and performers. His project focused on the chaos and vibrancy of the city, translating its rhythm into a series of large-scale paintings. The works are chaotic and colorful, layering abstraction with figuration to capture the pulse of urban life.",
    statementTH: "สำหรับการพำนักในกรุงเทพฯ สวีนีย์ได้ตั้งสตูดิโอแบบเปิด โดยร่วมมือกับนักดนตรีและนักแสดงท้องถิ่น โครงการของเขามุ่งเน้นไปที่ความวุ่นวายและความมีชีวิตชีวาของเมือง โดยแปลจังหวะของมันเป็นชุดภาพวาดขนาดใหญ่ ผลงานมีความวุ่นวายและเต็มไปด้วยสีสัน โดยซ้อนทับความเป็นนามธรรมกับรูปร่างเพื่อจับจังหวะชีพจรของชีวิตในเมือง",
    gallery: [
      "https://images.unsplash.com/photo-1637761566180-9dbde4fdab77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBpbiUyMHN0dWRpbyUyMHdvcmtpbmclMjBjb250ZW1wb3Jhcnl8ZW58MXx8fHwxNzY4MTM4Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1767294274527-5a73444d6b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBpbnN0YWxsYXRpb24lMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2ODE1MTE0NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1641766860997-53f4b4a68d23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBzdHVkaW8lMjBjb250ZW1wb3JhcnklMjBhcnR8ZW58MXx8fHwxNzY4MTUxMTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: 4,
    slug: 'sarah-chen',
    name: "Sarah Chen",
    nameTH: "ซาร่าห์ เฉิน",
    period: "January–June 2026",
    periodTH: "มกราคม–มิถุนายน 2569",
    image: "https://images.unsplash.com/photo-1760260623945-07314e790eeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBsb29raW5nJTIwYXQlMjBjYW1lcmElMjBwb3J0cmFpdCUyMGFydGlzdGljfGVufDF8fHx8MTc2ODE1MTAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: 'current',
    bio: "Sarah Chen is a multidisciplinary artist working at the intersection of technology and nature. Her practice involves the collection of data from natural environments, which she translates into digital visualizations and soundscapes. Chen's work raises questions about our relationship with the natural world in an increasingly digital age.",
    bioTH: "ซาร่าห์ เฉิน เป็นศิลปินสหสาขาวิชาที่ทำงานในจุดตัดของเทคโนโลยีและธรรมชาติ การปฏิบัติของเธอเกี่ยวข้องกับการรวบรวมข้อมูลจากสภาพแวดล้อมทางธรรมชาติ ซึ่งเธอแปลเป็นภาพดิจิทัลและภูมิทัศน์เสียง ผลงานของเฉินตั้งคำถามเกี่ยวกับความสัมพันธ์ของเรากับโลกธรรมชาติในยุคดิจิทัลที่เพิ่มขึ้น",
    statement: "Chen's current residency project, 'Digital Flora', involves mapping the plant life within the Art Forest's vicinity using 3D scanning technology. She is creating a virtual garden that mirrors the physical one, but with surreal, data-driven modifications. This project aims to highlight the hidden complexity of urban ecosystems and the potential for technology to reveal unseen dimensions of our environment.",
    statementTH: "โครงการพำนักปัจจุบันของเฉิน 'Digital Flora' เกี่ยวข้องกับการทำแผนที่พืชพันธุ์ในบริเวณใกล้เคียงอาร์ตฟอเรสต์โดยใช้เทคโนโลยีสแกน 3 มิติ เธอกำลังสร้างสวนเสมือนจริงที่สะท้อนสวนจริง แต่มีการปรับเปลี่ยนที่ขับเคลื่อนด้วยข้อมูลและเหนือจริง โครงการนี้มีจุดมุ่งหมายเพื่อเน้นความซับซ้อนที่ซ่อนอยู่ของระบบนิเวศในเมืองและศักยภาพของเทคโนโลยีในการเปิดเผยมิติที่มองไม่เห็นของสภาพแวดล้อมของเรา",
    gallery: [
      "https://images.unsplash.com/photo-1760260623945-07314e790eeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBsb29raW5nJTIwYXQlMjBjYW1lcmElMjBwb3J0cmFpdCUyMGFydGlzdGljfGVufDF8fHx8MTc2ODE1MTAyOXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1767294274527-5a73444d6b48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBpbnN0YWxsYXRpb24lMjBtaW5pbWFsaXN0fGVufDF8fHx8MTc2ODE1MTE0NHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1641766860997-53f4b4a68d23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc3QlMjBzdHVkaW8lMjBjb250ZW1wb3JhcnklMjBhcnR8ZW58MXx8fHwxNzY4MTUxMTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  }
];

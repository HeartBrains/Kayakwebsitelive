export interface Director {
    name: string;
    role: string;
    roleTH: string;
    bio: string[];
    bioTH: string[];
    image?: string;
    email?: string;
}

export interface TeamGroup {
    role: string;
    roleTH: string;
    members: string[];
    membersTH?: string[]; 
}

export const FOUNDER: Director = {
    name: 'Marisa Chearavanont',
    role: 'Founder / President',
    roleTH: 'ผู้ก่อตั้ง / ประธาน',
    email: 'marisa.c@khaoyaiart.com',
    bio: [
        "Founded by philanthropist and art patron Marisa Chearavanont, Khao Yai Art Forest (known in Thai as 'Silpa Pa') is a contemporary art institution where site-specific installations are designed to 'heal the land through art.' Spanning 210 acres (850,000 sq. m.) in the lush landscape of Pak Chong, the project serves as a sanctuary that blends art, ecology, and education. It operates alongside its sister institution, Bangkok Kunsthalle, to create a dialogue between the urban jungle and the natural forest."
    ],
    bioTH: [
        "ก่อตั้งโดยนักการกุศลและผู้อุปถัมภ์ศิลปะ มาริษา เจียรวนนท์ เขาใหญ่ อาร์ตฟอเรสต์ (หรือที่รู้จักในชื่อภาษาไทยว่า 'ศิลปะ ป่า') เป็นสถาบันศิลปะร่วมสมัยที่การติดตั้งงานศิลปะเฉพาะพื้นถูกออกแบบมาเพื่อ 'เยียวยาผืนดินด้วยศิลปะ' ครอบคลุมพื้นที่ 210 เอเคอร์ (850,000 ตร.ม.) ในภูมิทัศน์อันเขียวชอุ่มของปากช่อง โครงการนี้ทำหน้าที่เป็นสถานที่ศักดิ์สิทธิ์ที่ผสมผสานศิลปะ นิเวศวิทยา และการศึกษา ดำเนินงานควบคู่ไปกับสถาบันพี่น้องอย่าง Bangkok Kunsthalle เพื่อสร้างบทสนทนาระหว่างป่าคอนกรีตและป่าธรรมชาติ"
    ]
};

export const DIRECTORS: Director[] = [
    {
        name: 'Stefano Rabolli Pansera',
        role: 'Director',
        roleTH: 'ผู้อำนวยการ',
        email: 'stefano.rp@khaoyaiart.com',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMGdsYXNzZXN8ZW58MXx8fHwxNzY1MDA1MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        bio: [
            "Stefano Rabolli Pansera is the Director of Khao Yai Art Forest."
        ],
        bioTH: [
            "สเตฟาโน ราโบลลี พันเซรา เป็นผู้อำนวยการของเขาใหญ่ อาร์ตฟอเรสต์"
        ]
    },
    {
        name: 'Ratsiree Rattanawan',
        role: 'Assistant Curator',
        roleTH: 'ผู้ช่วยภัณฑารักษ์',
        email: 'ratsiree.r@khaoyaiart.com',
        bio: ["Assistant Curator at Khao Yai Art Forest."],
        bioTH: ["ผู้ช่วยภัณฑารักษ์ที่เขาใหญ่ อาร์ตฟอเรสต์"]
    },
    {
        name: 'Phakjira Pattapong',
        role: 'Project Manager',
        roleTH: 'ผู้จัดการโครงการ',
        email: 'phakjira.p@khaoyaiart.com',
        bio: ["Project Manager at Khao Yai Art Forest."],
        bioTH: ["ผู้จัดการโครงการที่เขาใหญ่ อาร์ตฟอเรสต์"]
    }
];

export const TEAM_GROUPS: TeamGroup[] = [
    {
        role: 'Financial Sustainability & Donor Relations',
        roleTH: 'ความยั่งยืนทางการเงินและความสัมพันธ์กับผู้บริจาค',
        members: ['Claudia Ko']
    },
    {
        role: 'Food & Gastronomy',
        roleTH: 'อาหารและศาสตร์การทำอาหาร',
        members: ['Poonperm Paitayawat']
    },
    {
        role: 'Advisory Board',
        roleTH: 'คณะกรรมการที่ปรึกษา',
        members: [
            "Jessica Morgan (Director of Dia Art Foundation)",
            "Manuela Luca-Dazio (Executive Director Pritzker Architecture Prize)",
            "Rita and Uli Sigg (Founders/Donors of M+)",
            "Taizo Son (Founder of Mistletoe, Inc.)",
            "Juan Carlos Verme (President of Proyectoamil)",
            "Alan Lau (Vice Chairman of M+)"
        ]
    }
];

export interface TeamMember {
    name: string;
    role: string;
    roleTH: string;
    email?: string;
}

export interface AdvisoryMember {
    name: string;
    title?: string;
    titleTH?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
    {
        name: 'Marisa Chearavanont',
        role: 'Founder / President',
        roleTH: 'ผู้ก่อตั้ง / ประธาน',
        email: 'marisa.c@khaoyaiart.com'
    },
    {
        name: 'Stefano Rabolli Pansera',
        role: 'Director',
        roleTH: 'ผู้อำนวยการ',
        email: 'stefano.rp@khaoyaiart.com'
    },
    {
        name: 'Ratsiree Rattanawan',
        role: 'Assistant Curator',
        roleTH: 'ผู้ช่วยภัณฑารักษ์',
        email: 'ratsiree.r@khaoyaiart.com'
    },
    {
        name: 'Phakjira Pattapong',
        role: 'Project Manager',
        roleTH: 'ผู้จัดการโครงการ',
        email: 'phakjira.p@khaoyaiart.com'
    },
    {
        name: 'Claudia Ko',
        role: 'Financial Sustainability & Donor Relations',
        roleTH: 'ความยั่งยืนทางการเงินและความสัมพันธ์กับผู้บริจาค',
        email: 'claudia.k@khaoyaiart.com'
    },
    {
        name: 'Poonperm Paitayawat',
        role: 'Food & Gastronomy',
        roleTH: 'อาหารและศาสตร์การทำอาหาร',
        email: 'perm.p@khaoyaiart.com'
    }
];

export const ADVISORY_BOARD_WITH_TITLES: AdvisoryMember[] = [
    { name: "Jessica Morgan", title: "Director of Dia Art Foundation", titleTH: "ผู้อำนวยการมูลนิธิ Dia Art" },
    { name: "Manuela Luca-Dazio", title: "Executive Director Pritzker Architecture Prize", titleTH: "ผู้อำนวยการบริหารรางวัล Pritzker Architecture" },
    { name: "Rita and Uli Sigg", title: "Founders and Donors of M+", titleTH: "ผู้ก่อตั้งและผู้บริจาค M+" },
    { name: "Taizo Son", title: "Founder of Mistletoe, Inc.", titleTH: "ผู้ก่อตั้ง Mistletoe, Inc." },
    { name: "Juan Carlos Verme", title: "President of Proyectoamil", titleTH: "ประธาน Proyectoamil" },
    { name: "Alan Lau", title: "Vice Chairman of M+", titleTH: "รองประธาน M+" }
];

export const ADVISORY_BOARD_MEMBERS: string[] = [
    "Anna Guggenbuehl",
    "Shu Jin",
    "Dominique Petite-Frer",
    "Ralph Segreti",
    "Victor Wang",
    "Shala Monroque"
];

<?php
/**
 * One-click Database Updater for LinkedIn Profile Data
 * Updates MySQL about_data table directly with Aufa Rafii' Hadibrata's complete LinkedIn profile.
 * 
 * URL: /admin/update_about_linkedin.php
 */

require_once __DIR__ . '/db.php';
handleCORS();

// Ensure columns exist
$db = Database::getInstance()->getConnection();

$stmt = $db->query("SHOW COLUMNS FROM about_data");
$columns = $stmt->fetchAll(PDO::FETCH_COLUMN);

$newCols = [
    'experience' => 'LONGTEXT',
    'education' => 'LONGTEXT',
    'details' => 'LONGTEXT',
    'portfolio_links' => 'LONGTEXT',
    'achievements' => 'LONGTEXT',
    'section_order' => 'LONGTEXT',
    'custom_skills' => 'LONGTEXT',
    'contact_menu_target' => 'VARCHAR(50)'
];

foreach ($newCols as $col => $type) {
    if (!in_array($col, $columns)) {
        $db->exec("ALTER TABLE about_data ADD COLUMN `$col` $type DEFAULT NULL");
    }
}

// Complete LinkedIn Dataset
$name = "Aufa Rafii' Hadibrata";
$title = "Business Development @HOTs_Trading | Business Growth Consultant | Digital Marketing";
$bio = "Hi, I’m Aufa Rafii Hadibrata (Pai), a business graduate from IPB University with hands-on experience in business development, digital marketing, and operational improvement.\n\nI specialize in helping businesses grow by building better systems — from strategy, market research, and digital execution to workflow optimization and performance tracking.\n\nMy background spans across content management, branding execution, growth strategy, and process improvement, which allows me to connect business goals with real execution on the ground.\n\nI’m particularly interested in Business Process Improvement, Digital Transformation, and AI/Automation tools to improve efficiency and scalability for SMEs and growing companies.\n\nCore strengths:\n• Business Development & Strategic Planning\n• Market Research & Competitor Analysis\n• Digital Marketing & Content Strategy\n• Workflow Optimization & System Building\n• Cross-functional Execution (Business x Creative x Tech)\n\nCurrently open to opportunities in Business Analyst, Business Development, Growth, or Digital Transformation roles.";

$skills = json_encode([
    "Business Development",
    "Sales",
    "Customer Relationship Management (CRM)",
    "Digital Marketing",
    "Growth Strategy",
    "Workflow Optimization",
    "Graphic Design",
    "Business Process Improvement"
], JSON_UNESCAPED_UNICODE);

$social = json_encode([
    "instagram" => "@aufapai",
    "email" => "aufatea1@gmail.com",
    "linkedin" => "https://www.linkedin.com/in/aufa-hadibrata/",
    "blog" => "https://aufatea.my.id/",
    "linktree" => "https://linktr.ee/aufarh"
], JSON_UNESCAPED_UNICODE);

$experience = json_encode([
    [
        "role" => "Business Development Manager",
        "company" => "Hots Trading",
        "period" => "January 2026 - Present",
        "location" => "Kelurahan Penjaringan",
        "details" => [
            "Research market trends and competitor movements.",
            "Build partnerships with traders, communities, affiliates, and strategic partners.",
            "Handle outreach, pitching, and deal negotiations.",
            "Collaborate with marketing and product teams on growth initiatives.",
            "Track performance metrics and optimize strategies based on data."
        ]
    ],
    [
        "role" => "Business Growth Consultant",
        "company" => "Freelance (Self employed)",
        "period" => "January 2024 - July 2026",
        "location" => "Kota Bogor, Jawa Barat, Indonesia",
        "details" => [
            "Help businesses identify growth opportunities through market research, customer analysis, and competitor benchmarking.",
            "Design and execute data-driven growth strategies to increase revenue, customer acquisition, and market reach.",
            "Advise founders and management teams on business models, pricing strategies, go-to-market plans, and process optimization.",
            "Support partnership development and strategic collaborations.",
            "Monitor key performance indicators (KPIs) and provide actionable recommendations based on performance insights."
        ]
    ],
    [
        "role" => "Digital Strategist",
        "company" => "PT Bayarkilat Apps Indonesia",
        "period" => "June 2025 - December 2025",
        "location" => "Kota Bogor, Jawa Barat, Indonesia",
        "details" => [
            "Developed and implemented performance-driven digital marketing campaigns across Meta Ads and Google Ads.",
            "Built a cohesive content strategy for multi-channel presence (Instagram, Tiktok, Blog, WhatsApp Broadcast), improving brand awareness and organic engagement.",
            "Conducted market and competitor analysis to fine-tune product positioning and user targeting.",
            "Collaborated with cross-functional teams (design, tech, CS) to optimize user journey from ad to onboarding.",
            "Introduced data dashboards and simple funnel tracking to monitor and improve campaign effectiveness.",
            "Initiated user education content to reduce bounce rates and increase app conversion (1 content for youtube reach 1% conversion).",
            "Make more 10% conversion sales with Organic Social Media, in 2 months."
        ]
    ],
    [
        "role" => "Desainer Grafis",
        "company" => "Freelance",
        "period" => "January 2018 - June 2025",
        "location" => "Bogor, West Java, Indonesia",
        "details" => [
            "Designed visual identities and brand logos tailored to client needs across diverse industries.",
            "Created custom merchandise designs, including apparel, stickers, packaging, and promotional items.",
            "Collaborated with clients to develop consistent visual branding and enhance brand recognition.",
            "Delivered production-ready assets with attention to print specifications and scalability.",
            "Managed end-to-end design process, from concept development to final execution, while maintaining brand consistency."
        ]
    ],
    [
        "role" => "Business Owner",
        "company" => "Zero Cost Shop",
        "period" => "October 2016 - June 2025",
        "location" => "Kota Bogor, Jawa Barat, Indonesia",
        "details" => [
            "Oversaw day-to-day operations of an online store on Tokopedia, including product listings, pricing, and descriptions.",
            "Developed promotional strategies and discount campaigns to increase sales and product visibility.",
            "Handled inventory management, shipping logistics, and customer service.",
            "Analyzed store performance using Tokopedia's analytics tools and optimized product keywords for search ranking.",
            "Designed promotional materials including thumbnails, banners, and campaign visuals."
        ]
    ],
    [
        "role" => "Manajer Pengembangan Bisnis",
        "company" => "Loekis.in",
        "period" => "June 2021 - July 2024",
        "location" => "Bogor",
        "details" => [
            "Developed business systems and growth strategies to support brand expansion.",
            "Conducted market research and trend analysis to design targeted marketing strategies.",
            "Initiated B2B discussions and negotiated with partners, vendors, and collaborators to drive business opportunities.",
            "Created detailed customer segmentation and proposed frameworks for new product launches.",
            "Designed and implemented operational SOPs to improve internal efficiency and workflow.",
            "Collaborated with content, design, and production teams to align business goals with marketing execution."
        ]
    ],
    [
        "role" => "Liaison Officer Pertukaran Mahasiswa Merdeka 2",
        "company" => "Kampus Merdeka",
        "period" => "August 2022 - December 2022",
        "location" => "Bogor, West Java, Indonesia",
        "details" => [
            "Assisted inbound exchange students from various regions across Indonesia during their academic and cultural immersion at IPB University.",
            "Coordinated academic schedules, student logistics, and communication with lecturers and university staff.",
            "Acted as a bridge between students and university stakeholders to ensure smooth execution of both academic and extracurricular activities.",
            "Supported cultural exchange initiatives, including batik workshops and local heritage exploration.",
            "Compiled periodic reports and provided feedback for program improvement."
        ]
    ],
    [
        "role" => "Content Manager",
        "company" => "Puffin Store ID",
        "period" => "June 2018 - March 2020",
        "location" => "Bogor, West Java, Indonesia",
        "details" => [
            "Managed content distribution to online channels and social media platforms.",
            "Used content management system to analyze user engagement and website traffic metrics.",
            "Edited and sourced images and videos using Adobe Premiere and Adobe Photoshop.",
            "Conceptualized, planned and executed original designs for Social Media."
        ]
    ],
    [
        "role" => "Staff Intern",
        "company" => "HepiPop",
        "period" => "March 2018 - July 2018",
        "location" => "Bogor, West Java, Indonesia",
        "details" => [
            "Supported promotional and operational activities for retail streetwear merchandise."
        ]
    ],
    [
        "role" => "Packaging Intern",
        "company" => "CV. Multigrafika",
        "period" => "August 2016 - October 2016",
        "location" => "Bogor, West Java, Indonesia",
        "details" => [
            "Minimized waste and reduced volume of packaging materials used to prepare shipments.",
            "Inspected incoming and outgoing shipments to verify accuracy and prevent errors.",
            "Completed daily orders with expert picking and packing of shipments.",
            "Reviewed orders by inspecting labeling, packaging and contents.",
            "Measured product sizes, packaging equipment needed and packing options."
        ]
    ]
], JSON_UNESCAPED_UNICODE);

$education = json_encode([
    [
        "degree" => "Bachelor of Business Administration - BBA",
        "major" => "Business/Commerce, General",
        "school" => "Institut Pertanian Bogor (IPB)",
        "period" => "2018 - January 2025"
    ],
    [
        "degree" => "SMK (Vocational High School)",
        "major" => "Intermedia / Multimedia",
        "school" => "SMK TARUNA TERPADU 1",
        "period" => "2016 - 2018"
    ]
], JSON_UNESCAPED_UNICODE);

$details = json_encode([
    "age" => "25 years",
    "website" => "aufarafii.id",
    "email1" => "aufatea1@gmail.com",
    "email2" => "me@aufarafii.id",
    "phone" => "+6287770050793",
    "location" => "Jakarta Metropolitan Area / Bogor, Indonesia"
], JSON_UNESCAPED_UNICODE);

$portfolio_links = json_encode([
    ["label" => "LinkedIn Profile", "url" => "https://www.linkedin.com/in/aufa-hadibrata/"],
    ["label" => "Personal Linktree", "url" => "https://linktr.ee/aufarh"],
    ["label" => "Personal Blog", "url" => "https://aufatea.my.id/"],
    ["label" => "Instagram", "url" => "https://www.instagram.com/aufapai/"],
    ["label" => "Zero Cost Shop (Tokopedia)", "url" => "https://www.tokopedia.com/zerocostshop"]
], JSON_UNESCAPED_UNICODE);

$achievements = json_encode([
    "Make more 10% conversion sales with Organic Social Media in 2 months at PT Bayarkilat Apps Indonesia",
    "Educational YouTube video content reached 1% app conversion rate",
    "Built and operated Zero Cost Shop on Tokopedia for 8+ years (2016-2025)",
    "Grew Instagram brand reach from 500 to 8,000+ followers in <1 year",
    "Liaison Officer Pertukaran Mahasiswa Merdeka 2 di IPB University"
], JSON_UNESCAPED_UNICODE);

$section_order = json_encode([
    "profile",
    "experience",
    "education",
    "skills",
    "portfolio",
    "details",
    "achievements"
], JSON_UNESCAPED_UNICODE);

$custom_skills = json_encode([
    [
        "category" => "Core Strengths",
        "items" => [
            ["name" => "Sales & CRM", "text" => "CRM", "bg" => "#0D9488"],
            ["name" => "Business Development", "text" => "BD", "bg" => "#7C3AED"],
            ["name" => "Growth Strategy", "text" => "GS", "bg" => "#2563EB"],
            ["name" => "Workflow Optimization", "text" => "WO", "bg" => "#EA580C"]
        ]
    ],
    [
        "category" => "Marketing & Growth",
        "items" => [
            ["name" => "Meta Ads (FB/IG)", "text" => "Meta", "bg" => "#0081FB"],
            ["name" => "Google Ads", "text" => "GAds", "bg" => "#4285F4"],
            ["name" => "TikTok Marketing", "text" => "TT", "bg" => "#010101"],
            ["name" => "WhatsApp Marketing", "text" => "WA", "bg" => "#25D366"],
            ["name" => "Tokopedia Marketplace", "text" => "TP", "bg" => "#03AC0E"]
        ]
    ],
    [
        "category" => "Design & Multimedia",
        "items" => [
            ["name" => "Adobe Photoshop", "text" => "Ps", "bg" => "#31A8FF"],
            ["name" => "Adobe Illustrator", "text" => "Ai", "bg" => "#FF9A00"],
            ["name" => "Adobe InDesign", "text" => "Id", "bg" => "#FF3366"],
            ["name" => "Adobe Premiere Pro", "text" => "Pr", "bg" => "#9999FF"],
            ["name" => "Adobe After Effects", "text" => "Ae", "bg" => "#9999FF"],
            ["name" => "Canva", "text" => "Cn", "bg" => "#00D4AA"]
        ]
    ],
    [
        "category" => "Languages",
        "items" => [
            ["name" => "Indonesian (Native or Bilingual)", "text" => "ID", "bg" => "#DC2626"],
            ["name" => "English (Professional Working)", "text" => "EN", "bg" => "#1D4ED8"]
        ]
    ]
], JSON_UNESCAPED_UNICODE);

$contact_menu_target = 'section';

// Update or Insert into about_data
$stmt = $db->query("SELECT id FROM about_data LIMIT 1");
$existing = $stmt->fetch();

if ($existing) {
    $stmt = $db->prepare("UPDATE about_data SET name = ?, title = ?, bio = ?, skills = ?, social = ?, experience = ?, education = ?, details = ?, portfolio_links = ?, achievements = ?, section_order = ?, custom_skills = ?, contact_menu_target = ? WHERE id = ?");
    $stmt->execute([
        $name, $title, $bio, $skills, $social, $experience, $education, $details, $portfolio_links, $achievements, $section_order, $custom_skills, $contact_menu_target, $existing['id']
    ]);
} else {
    $stmt = $db->prepare("INSERT INTO about_data (name, title, bio, skills, social, experience, education, details, portfolio_links, achievements, section_order, custom_skills, contact_menu_target) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $name, $title, $bio, $skills, $social, $experience, $education, $details, $portfolio_links, $achievements, $section_order, $custom_skills, $contact_menu_target
    ]);
}

if (php_sapi_name() === 'cli' || isset($_GET['json'])) {
    jsonResponse(['success' => true, 'message' => 'Database successfully populated with LinkedIn profile data!']);
} else {
    header('Content-Type: text/html; charset=utf-8');
    echo "<!DOCTYPE html><html><head><title>LinkedIn Data Updated</title><style>body{font-family:sans-serif;background:#0a0a1a;color:#fff;padding:40px;text-align:center;}a{color:#8b5cf6;}</style></head><body>";
    echo "<h1>✅ Database Updated Successfully!</h1>";
    echo "<p>Semua data profil LinkedIn (10 Work Experience, IPB University, Skills Badges, Kontak, dan Portofolio) sudah berhasil dimasukkan ke tabel <code>about_data</code> di MySQL!</p>";
    echo "<p><a href='/about'>👉 Buka Halaman About</a> | <a href='/z8admin'>👉 Buka Admin Panel</a></p>";
    echo "</body></html>";
}

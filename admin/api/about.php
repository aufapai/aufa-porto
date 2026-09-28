<?php
/**
 * About Me API
 * GET  /api/about.php       - Get about data (Public)
 * PUT  /api/about.php       - Update about data (auth required)
 */

require_once __DIR__ . '/../db.php';
handleCORS();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    Case 'GET':
        HandleGet();
        Break;
    Case 'PUT':
        RequireAuth();
        HandleUpdate();
        Break;
    Default:
        JsonResponse(['error' => 'Method not allowed'], 405);
}

function ensureAboutDataColumns() {
    $db = Database::getInstance()->getConnection();
    
    // Check existing columns
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
    
    Foreach ($newCols as $col => $type) {
        If (!in_array($col, $columns)) {
            $db->exec("ALTER TABLE about_data ADD COLUMN `$col` $type DEFAULT NULL");
        }
    }
}

function getLinkedInProfileDefault() {
    return [
        'name' => "Aufa Rafii' Hadibrata",
        'title' => 'Business Development @HOTs_Trading | Business Growth Consultant | Digital Marketing',
        'bio' => "Hi, I’m Aufa Rafii Hadibrata (Pai), a business graduate from IPB University with hands-on experience in business development, digital marketing, and operational improvement.\n\nI specialize in helping businesses grow by building better systems — from strategy, market research, and digital execution to workflow optimization and performance tracking.\n\nMy background spans across content management, branding execution, growth strategy, and process improvement, which allows me to connect business goals with real execution on the ground.\n\nI’m particularly interested in Business Process Improvement, Digital Transformation, and AI/Automation tools to improve efficiency and scalability for SMEs and growing companies.\n\nCore strengths:\n• Business Development & Strategic Planning\n• Market Research & Competitor Analysis\n• Digital Marketing & Content Strategy\n• Workflow Optimization & System Building\n• Cross-functional Execution (Business x Creative x Tech)\n\nCurrently open to opportunities in Business Analyst, Business Development, Growth, or Digital Transformation roles.",
        'skills' => [
            "Business Development", "Sales", "Customer Relationship Management (CRM)", "Digital Marketing", "Growth Strategy", "Workflow Optimization", "Graphic Design", "Business Process Improvement"
        ],
        'social' => [
            "instagram" => "@aufapai",
            "email" => "aufatea1@gmail.com",
            "linkedin" => "https://www.linkedin.com/in/aufa-hadibrata/",
            "blog" => "https://aufatea.my.id/",
            "linktree" => "https://linktr.ee/aufarh"
        ],
        'experience' => [
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
                    "Supported operational and promotional activities for retail streetwear merchandise."
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
        ],
        'education' => [
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
        ],
        'details' => [
            "age" => "25 years",
            "website" => "aufarafii.id",
            "email1" => "aufatea1@gmail.com",
            "email2" => "me@aufarafii.id",
            "phone" => "+6287770050793",
            "location" => "Jakarta Metropolitan Area / Bogor, Indonesia"
        ],
        'portfolio_links' => [
            ["label" => "LinkedIn Profile", "url" => "https://www.linkedin.com/in/aufa-hadibrata/"],
            ["label" => "Personal Linktree", "url" => "https://linktr.ee/aufarh"],
            ["label" => "Personal Blog", "url" => "https://aufatea.my.id/"],
            ["label" => "Instagram", "url" => "https://www.instagram.com/aufapai/"],
            ["label" => "Zero Cost Shop (Tokopedia)", "url" => "https://www.tokopedia.com/zerocostshop"]
        ],
        'achievements' => [
            "Make more 10% conversion sales with Organic Social Media in 2 months at PT Bayarkilat Apps Indonesia",
            "Educational YouTube video content reached 1% app conversion rate",
            "Built and operated Zero Cost Shop on Tokopedia for 8+ years (2016-2025)",
            "Grew Instagram brand reach from 500 to 8,000+ followers in <1 year",
            "Liaison Officer Pertukaran Mahasiswa Merdeka 2 di IPB University"
        ],
        'section_order' => [
            "profile", "experience", "education", "skills", "portfolio", "details", "achievements"
        ],
        'custom_skills' => [
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
        ],
        'contact_menu_target' => 'section'
    ];
}

function handleGet() {
    ensureAboutDataColumns();
    $db = Database::getInstance()->getConnection();
    $stmt = $db->query("SELECT * FROM about_data ORDER BY id DESC LIMIT 1");
    $about = $stmt->fetch();
    $default = getLinkedInProfileDefault();

    if (!$about) {
        // Auto-seed into DB
        $stmt = $db->prepare("INSERT INTO about_data (name, title, bio, skills, social, experience, education, details, portfolio_links, achievements, section_order, custom_skills, contact_menu_target) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $default['name'], $default['title'], $default['bio'],
            json_encode($default['skills'], JSON_UNESCAPED_UNICODE),
            json_encode($default['social'], JSON_UNESCAPED_UNICODE),
            json_encode($default['experience'], JSON_UNESCAPED_UNICODE),
            json_encode($default['education'], JSON_UNESCAPED_UNICODE),
            json_encode($default['details'], JSON_UNESCAPED_UNICODE),
            json_encode($default['portfolio_links'], JSON_UNESCAPED_UNICODE),
            json_encode($default['achievements'], JSON_UNESCAPED_UNICODE),
            json_encode($default['section_order'], JSON_UNESCAPED_UNICODE),
            json_encode($default['custom_skills'], JSON_UNESCAPED_UNICODE),
            $default['contact_menu_target']
        ]);
        jsonResponse($default);
    }

    // Parse JSON fields
    $parsedExp = json_decode($about['experience'] ?? '[]', true);
    $parsedEdu = json_decode($about['education'] ?? '[]', true);
    $parsedDetails = json_decode($about['details'] ?? '{}', true);
    $parsedLinks = json_decode($about['portfolio_links'] ?? '[]', true);
    $parsedAch = json_decode($about['achievements'] ?? '[]', true);
    $parsedOrder = json_decode($about['section_order'] ?? '[]', true);
    $parsedSkills = json_decode($about['skills'] ?? '[]', true);
    $parsedCustomSkills = json_decode($about['custom_skills'] ?? '[]', true);

    // If existing row has empty experience or legacy empty fields, merge with LinkedIn default
    $about['name'] = !empty($about['name']) ? $about['name'] : $default['name'];
    $about['title'] = !empty($about['title']) ? $about['title'] : $default['title'];
    $about['bio'] = !empty($about['bio']) ? $about['bio'] : $default['bio'];
    $about['skills'] = !empty($parsedSkills) ? $parsedSkills : $default['skills'];
    $about['social'] = json_decode($about['social'] ?? '{}', true) ?: $default['social'];
    $about['experience'] = !empty($parsedExp) ? $parsedExp : $default['experience'];
    $about['education'] = !empty($parsedEdu) ? $parsedEdu : $default['education'];
    $about['details'] = !empty($parsedDetails) ? $parsedDetails : $default['details'];
    $about['portfolio_links'] = !empty($parsedLinks) ? $parsedLinks : $default['portfolio_links'];
    $about['achievements'] = !empty($parsedAch) ? $parsedAch : $default['achievements'];
    $about['section_order'] = !empty($parsedOrder) ? $parsedOrder : $default['section_order'];
    $about['custom_skills'] = !empty($parsedCustomSkills) ? $parsedCustomSkills : $default['custom_skills'];
    $about['contact_menu_target'] = $about['contact_menu_target'] ?? 'section';

    jsonResponse($about);
}

function handleUpdate() {
    EnsureAboutDataColumns();
    $body = getJsonBody();
    $db = Database::getInstance()->getConnection();

    $skills = json_encode($body['skills'] ?? [], JSON_UNESCAPED_UNICODE);
    $social = json_encode($body['social'] ?? (object)[], JSON_UNESCAPED_UNICODE);
    $experience = json_encode($body['experience'] ?? [], JSON_UNESCAPED_UNICODE);
    $education = json_encode($body['education'] ?? [], JSON_UNESCAPED_UNICODE);
    $details = json_encode($body['details'] ?? (object)[], JSON_UNESCAPED_UNICODE);
    $portfolio_links = json_encode($body['portfolio_links'] ?? [], JSON_UNESCAPED_UNICODE);
    $achievements = json_encode($body['achievements'] ?? [], JSON_UNESCAPED_UNICODE);
    $section_order = json_encode($body['section_order'] ?? [], JSON_UNESCAPED_UNICODE);
    $custom_skills = json_encode($body['custom_skills'] ?? [], JSON_UNESCAPED_UNICODE);
    $contact_menu_target = $body['contact_menu_target'] ?? 'section';

    // Check if exists
    $stmt = $db->query("SELECT id FROM about_data LIMIT 1");
    $existing = $stmt->fetch();

    If ($existing) {
        $stmt = $db->prepare("UPDATE about_data SET name = ?, title = ?, bio = ?, skills = ?, social = ?, experience = ?, education = ?, details = ?, portfolio_links = ?, achievements = ?, section_order = ?, custom_skills = ?, contact_menu_target = ? WHERE id = ?");
        $stmt->execute([
            $body['name'] ?? 'Aufa Rafii Hadibrata',
            $body['title'] ?? '',
            $body['bio'] ?? '',
            $skills,
            $social,
            $experience,
            $education,
            $details,
            $portfolio_links,
            $achievements,
            $section_order,
            $custom_skills,
            $contact_menu_target,
            $existing['id'],
        ]);
    } else {
        $stmt = $db->prepare("INSERT INTO about_data (name, title, bio, skills, social, experience, education, details, portfolio_links, achievements, section_order, custom_skills, contact_menu_target) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $body['name'] ?? 'Aufa Rafii Hadibrata',
            $body['title'] ?? '',
            $body['bio'] ?? '',
            $skills,
            $social,
            $experience,
            $education,
            $details,
            $portfolio_links,
            $achievements,
            $section_order,
            $custom_skills,
            $contact_menu_target,
        ]);
    }

    JsonResponse(['success' => true, 'message' => 'About updated']);
}

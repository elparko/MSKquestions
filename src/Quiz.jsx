import { useState, useCallback, useMemo } from "react";

const QUESTIONS = [
  // ===== HISTOLOGY OF BONE & CARTILAGE =====
  {
    id: 1, cat: "Histology – Cartilage",
    stem: "A histology slide shows a tissue with lacunae containing clusters of chondrocytes (isogenous groups), a surrounding basophilic territorial matrix, and a perichondrium on the outer surface. The matrix is rich in type II collagen. Which cartilage type is this?",
    opts: ["Hyaline cartilage", "Elastic cartilage", "Fibrocartilage", "Dense regular connective tissue"],
    ans: 0,
    exp: "Hyaline cartilage: type II collagen, perichondrium present, isogenous groups in lacunae. Elastic cartilage also has perichondrium but contains elastic fibers. Fibrocartilage has type I collagen and NO perichondrium."
  },
  {
    id: 2, cat: "Histology – Cartilage",
    stem: "A pathologist examines tissue from the intervertebral disc. The slide shows chondrocytes in lacunae with prominent thick bundles of type I collagen visible between them. No perichondrium is identified. Which cartilage type is this?",
    opts: ["Hyaline cartilage", "Elastic cartilage", "Fibrocartilage", "Woven bone"],
    ans: 2,
    exp: "Fibrocartilage: type I collagen bundles, NO perichondrium, found in intervertebral discs, pubic symphysis, menisci, and TMJ. It combines tensile strength with shock absorption."
  },
  {
    id: 3, cat: "Histology – Cartilage",
    stem: "Which of the following cells is responsible for actively secreting new cartilage matrix during growth?",
    opts: ["Chondrocyte", "Chondroblast", "Osteoblast", "Fibroblast"],
    ans: 1,
    exp: "Chondroblasts actively secrete new cartilage matrix. Once surrounded by matrix and trapped in lacunae, they become chondrocytes (mature, maintenance cells)."
  },
  {
    id: 4, cat: "Histology – Bone",
    stem: "A biopsy of a fracture callus at 2 weeks shows disorganized bone with randomly oriented collagen fibers and irregular osteocyte distribution. Which type of bone is this?",
    opts: ["Lamellar bone", "Woven bone", "Hyaline cartilage", "Compact cortical bone"],
    ans: 1,
    exp: "Woven bone: rapidly formed, disorganized collagen fibers, seen in fracture repair, fetal skeleton, and pathologic states (Paget disease). It is later remodeled into organized lamellar bone."
  },
  {
    id: 5, cat: "Histology – Bone Cells",
    stem: "A large multinucleated cell is seen in a Howship lacuna (resorption pit) on the surface of a bone spicule. It stains positive for tartrate-resistant acid phosphatase (TRAP). This cell is derived from which lineage?",
    opts: ["Mesenchymal stem cells", "Monocyte/macrophage (hematopoietic) lineage", "Chondroblast precursors", "Neural crest cells"],
    ans: 1,
    exp: "Osteoclasts: large, multinucleated, TRAP-positive, found in Howship lacunae. Derived from monocyte-macrophage lineage (hematopoietic). Osteoblasts and osteocytes are from mesenchymal stem cells."
  },
  // ===== BONE FORMATION =====
  {
    id: 6, cat: "Bone Formation",
    stem: "The flat bones of the skull form by direct differentiation of mesenchymal cells into osteoblasts without a cartilage intermediate. This process is called:",
    opts: ["Endochondral ossification", "Intramembranous ossification", "Appositional growth", "Interstitial growth"],
    ans: 1,
    exp: "Intramembranous ossification: mesenchyme → osteoblasts directly. Forms flat bones (skull, clavicle, mandible). Endochondral ossification uses a hyaline cartilage template (long bones, vertebrae, pelvis)."
  },
  {
    id: 7, cat: "Bone Formation",
    stem: "In endochondral ossification at the growth plate, chondrocytes undergo a specific sequence of zones. In which zone do chondrocytes undergo hypertrophy, secrete alkaline phosphatase, and promote matrix calcification?",
    opts: ["Reserve (resting) zone", "Proliferative zone", "Hypertrophic zone", "Zone of ossification"],
    ans: 2,
    exp: "Growth plate zones (from epiphysis to diaphysis): Reserve → Proliferative (columns of dividing chondrocytes) → Hypertrophic (enlarged cells, alkaline phosphatase, calcification) → Ossification (chondrocyte apoptosis, osteoblasts deposit bone)."
  },
  {
    id: 8, cat: "Bone Formation",
    stem: "A 6-year-old child has a fracture through the growth plate (physis) of the distal femur classified as Salter-Harris type II. Damage to which zone of the growth plate would most likely impair future longitudinal bone growth?",
    opts: ["Reserve zone", "Proliferative zone", "Hypertrophic zone", "Zone of ossification"],
    ans: 1,
    exp: "The proliferative (germinal) zone contains actively dividing chondrocytes responsible for longitudinal growth. Damage here leads to growth arrest. Salter-Harris fractures that involve the germinal layer (types III, IV, V) carry worst prognosis."
  },
  // ===== BONE & MUSCLE STRUCTURE =====
  {
    id: 9, cat: "Muscle Structure",
    stem: "On histology, a tissue shows long, multinucleated fibers with peripherally located nuclei and visible cross-striations (A bands, I bands, Z lines). Which muscle type is this?",
    opts: ["Skeletal muscle", "Cardiac muscle", "Smooth muscle", "Myoepithelial cells"],
    ans: 0,
    exp: "Skeletal muscle: multinucleated, peripheral nuclei, striated. Cardiac: single central nucleus, striated, intercalated discs. Smooth: single central nucleus, NO striations, spindle-shaped."
  },
  {
    id: 10, cat: "Muscle Structure",
    stem: "During skeletal muscle contraction, which of the following bands/zones decreases in width?",
    opts: ["A band", "I band", "Z line thickness", "M line"],
    ans: 1,
    exp: "Sliding filament model: during contraction, the I band (thin filaments only) and H zone (thick filaments only) shorten. The A band (length of thick filaments) stays CONSTANT. Sarcomere overall shortens."
  },
  {
    id: 11, cat: "Muscle Structure",
    stem: "A cardiac muscle biopsy shows branching fibers with central nuclei and step-like junctions connecting adjacent cells that contain gap junctions and desmosomes. These junctions are called:",
    opts: ["Neuromuscular junctions", "Intercalated discs", "Z lines", "Tight junctions"],
    ans: 1,
    exp: "Intercalated discs are unique to cardiac muscle. They contain gap junctions (electrical coupling for synchronized contraction), desmosomes (mechanical attachment), and fascia adherens (anchor actin)."
  },
  // ===== HISTOLOGY OF SKIN =====
  {
    id: 12, cat: "Histology – Skin",
    stem: "A biopsy of the palm shows an epidermis with a very thick stratum corneum and all 5 epidermal layers clearly visible, including a prominent stratum lucidum. Which skin type is this?",
    opts: ["Thick skin", "Thin skin", "Mucous membrane", "Transitional epithelium"],
    ans: 0,
    exp: "Thick skin (palms, soles): has all 5 epidermal layers including stratum lucidum. No hair follicles or sebaceous glands. Thin skin (rest of body): lacks stratum lucidum, has hair follicles and sebaceous glands."
  },
  {
    id: 13, cat: "Histology – Skin",
    stem: "Which layer of the epidermis contains the stem cells responsible for constant renewal of the skin?",
    opts: ["Stratum corneum", "Stratum granulosum", "Stratum spinosum", "Stratum basale"],
    ans: 3,
    exp: "Stratum basale (germinativum): single layer of mitotically active stem cells attached to basement membrane. Layers from deep to superficial: Basale → Spinosum → Granulosum → (Lucidum) → Corneum."
  },
  {
    id: 14, cat: "Histology – Skin",
    stem: "A pathologist identifies dendritic cells in the stratum spinosum of the epidermis that stain positive for CD1a and S-100. These cells function primarily in:",
    opts: ["Melanin production", "Antigen presentation to T cells", "Tactile sensation (Merkel cells)", "Keratin production"],
    ans: 1,
    exp: "Langerhans cells: dendritic antigen-presenting cells in the stratum spinosum. CD1a+, S-100+, Birbeck granules on EM. They capture antigens and migrate to lymph nodes. Melanocytes are in stratum basale."
  },
  {
    id: 15, cat: "Histology – Skin Receptors",
    stem: "A biopsy of the fingertip dermis shows an encapsulated receptor with a lamellated (onion-like) appearance located deep in the dermis and subcutis. This receptor primarily detects:",
    opts: ["Light touch", "Deep pressure and vibration", "Temperature", "Pain"],
    ans: 1,
    exp: "Pacinian corpuscles: large, lamellated, deep dermis/subcutis, detect deep pressure and vibration. Meissner corpuscles: small, in dermal papillae, detect light/discriminative touch (abundant in fingertips, lips)."
  },
  {
    id: 16, cat: "Histology – Skin Adnexa",
    stem: "A sweat gland that is distributed throughout the body, opens directly onto the skin surface via a duct, and produces a watery secretion important for thermoregulation is classified as:",
    opts: ["Apocrine sweat gland", "Eccrine sweat gland", "Sebaceous gland", "Ceruminous gland"],
    ans: 1,
    exp: "Eccrine glands: throughout body, open onto skin surface, watery secretion, thermoregulation, innervated by sympathetic cholinergic fibers. Apocrine: axillae/groin, open into hair follicles, thicker secretion, activated at puberty."
  },
  // ===== MMR =====
  {
    id: 17, cat: "MMR – Measles",
    stem: "A 4-year-old unvaccinated child presents with high fever, cough, coryza, conjunctivitis, and small blue-white spots on the buccal mucosa opposite the molars. Two days later a maculopapular rash appears starting at the face and spreading downward. Which finding is pathognomonic?",
    opts: ["Koplik spots", "Pastia lines", "Forchheimer spots", "Strawberry tongue"],
    ans: 0,
    exp: "Koplik spots (blue-white on buccal mucosa) are pathognomonic for measles. They appear 1-2 days before the rash. Measles (Paramyxovirus, Morbillivirus): the 3 C's (cough, coryza, conjunctivitis) + rash spreading head → toe."
  },
  {
    id: 18, cat: "MMR – Measles",
    stem: "A 10-year-old boy who had measles at age 2 now presents with progressive intellectual decline, myoclonus, and seizures. MRI shows white matter changes. What is the most likely diagnosis?",
    opts: ["Acute disseminated encephalomyelitis", "Subacute sclerosing panencephalitis (SSPE)", "Guillain-Barré syndrome", "Progressive multifocal leukoencephalopathy"],
    ans: 1,
    exp: "SSPE: rare late complication of measles occurring 7-10 years after infection. Caused by persistent defective measles virus in the CNS. Progressive, fatal. Elevated measles antibodies in CSF. Highlights importance of vaccination."
  },
  {
    id: 19, cat: "MMR – Mumps",
    stem: "A 12-year-old unvaccinated boy presents with bilateral painful parotid gland swelling, fever, and headache. Which complication is most common in post-pubertal males with this infection?",
    opts: ["Pancreatitis", "Orchitis", "Aseptic meningitis", "Deafness"],
    ans: 1,
    exp: "Mumps (Paramyxovirus, Rubulavirus): parotitis is most common. Orchitis occurs in ~20-30% of post-pubertal males (usually unilateral, rarely causes sterility). Aseptic meningitis is actually the most common extrasalivary complication overall."
  },
  {
    id: 20, cat: "MMR – Rubella",
    stem: "A pregnant woman in her first trimester is found to be non-immune to rubella and is exposed to an infected child. If the fetus is infected, which congenital abnormality is MOST classically associated?",
    opts: ["Neural tube defect", "Patent ductus arteriosus, cataracts, and sensorineural deafness", "Limb reduction defects", "Hydrocephalus"],
    ans: 1,
    exp: "Congenital rubella syndrome (CRS): classic triad of sensorineural deafness (most common), cardiac defects (PDA most common, also pulmonary stenosis), and cataracts. Also: blueberry muffin rash, intellectual disability. Greatest risk in 1st trimester."
  },
  {
    id: 21, cat: "MMR – Vaccination",
    stem: "The MMR vaccine is a live attenuated vaccine. It is contraindicated in which of the following patients?",
    opts: ["A 13-month-old healthy child", "A 30-year-old pregnant woman", "A 25-year-old healthcare worker with no prior immunization", "A 5-year-old with a mild URI and low-grade fever"],
    ans: 1,
    exp: "MMR (live attenuated) is contraindicated in pregnancy (theoretical teratogenic risk), severe immunodeficiency, and anaphylaxis to vaccine components. Mild illness is NOT a contraindication. Given at 12-15 months and 4-6 years."
  },
  // ===== RHEUMATOLOGY INTRO =====
  {
    id: 22, cat: "Rheumatology Principles",
    stem: "A 40-year-old woman presents with joint swelling, warmth, and prolonged morning stiffness lasting >1 hour. Which feature best distinguishes inflammatory arthritis from osteoarthritis?",
    opts: ["Joint crepitus", "Prolonged morning stiffness (>1 hour)", "Heberden nodes", "Worsening with activity"],
    ans: 1,
    exp: "Inflammatory arthritis: morning stiffness >1 hour, improves with use, systemic symptoms, elevated ESR/CRP. OA: mechanical pain, brief stiffness (<30 min), worsens with use, no systemic features."
  },
  {
    id: 23, cat: "Rheumatology Principles",
    stem: "A rheumatologist evaluating a patient with suspected autoimmune connective tissue disease uses a systematic pattern. Which diagnostic approach is most accurate?",
    opts: ["Order ANA; if positive, diagnose SLE", "Rely on a single highly specific antibody", "Integrate clinical features, physical exam, labs, and imaging together", "Treat empirically and see if the patient responds"],
    ans: 2,
    exp: "No single blood test diagnoses any rheumatologic disease. The pattern includes: clinical presentation + joint distribution + serologies + inflammatory markers + imaging. ANA alone is positive in ~20% of healthy women."
  },
  // ===== RHEUMATOID ARTHRITIS =====
  {
    id: 24, cat: "Rheumatoid Arthritis",
    stem: "A 48-year-old woman presents with 4 months of symmetric MCP, PIP, and wrist joint swelling with morning stiffness lasting 2 hours. Labs: RF+, anti-CCP+, ESR 62. X-rays show periarticular osteopenia and marginal erosions. Which joints are classically SPARED in RA?",
    opts: ["MCP joints", "PIP joints", "DIP joints", "Wrist joints"],
    ans: 2,
    exp: "RA spares DIP joints (DIP involvement = think OA or psoriatic arthritis). RA affects MCP, PIP, wrists, and MTP joints symmetrically. Also can affect C1-C2 (atlantoaxial subluxation)."
  },
  {
    id: 25, cat: "Rheumatoid Arthritis",
    stem: "Which antibody is MOST SPECIFIC for rheumatoid arthritis?",
    opts: ["Rheumatoid factor (RF)", "Anti-cyclic citrullinated peptide (anti-CCP)", "Antinuclear antibody (ANA)", "Anti-dsDNA"],
    ans: 1,
    exp: "Anti-CCP: ~95% specific for RA (vs RF ~80% specific). RF is an IgM against the Fc portion of IgG — also positive in SLE, Sjögren, hepatitis C, endocarditis, and healthy elderly."
  },
  {
    id: 26, cat: "Rheumatoid Arthritis",
    stem: "A patient with RA develops subcutaneous nodules on the extensor surface of the forearm. Biopsy shows central fibrinoid necrosis surrounded by palisading histiocytes. These nodules are most associated with which lab finding?",
    opts: ["Positive ANA", "High-titer RF positivity", "Elevated uric acid", "Positive HLA-B27"],
    ans: 1,
    exp: "Rheumatoid nodules occur in ~25% of RA patients and are associated with high RF titers (seropositive disease). Histology: central fibrinoid necrosis + palisading macrophages. Found on extensor surfaces, lungs, heart."
  },
  // ===== DMARDs =====
  {
    id: 27, cat: "DMARDs",
    stem: "Methotrexate's primary mechanism of action in RA involves inhibition of which enzyme?",
    opts: ["Cyclooxygenase-2", "Dihydrofolate reductase", "Xanthine oxidase", "Calcineurin"],
    ans: 1,
    exp: "Methotrexate inhibits dihydrofolate reductase → decreased purine/pyrimidine synthesis → anti-proliferative and anti-inflammatory effects. Supplemental folic acid reduces side effects (stomatitis, cytopenias) without reducing efficacy."
  },
  {
    id: 28, cat: "DMARDs",
    stem: "A patient on a TNF-alpha inhibitor for RA develops reactivation tuberculosis. Which cell-mediated immune function is most directly impaired by TNF-alpha blockade?",
    opts: ["B-cell antibody production", "Granuloma formation and maintenance", "Complement activation", "Mast cell degranulation"],
    ans: 1,
    exp: "TNF-alpha is critical for granuloma formation/maintenance, which contains Mycobacterium tuberculosis. TNF blockade disrupts granulomas → reactivation TB. This is why TB screening (PPD/IGRA) is mandatory before starting anti-TNF therapy."
  },
  {
    id: 29, cat: "DMARDs",
    stem: "Which traditional DMARD used in RA and SLE can cause retinal toxicity (bull's eye maculopathy) requiring regular ophthalmologic screening?",
    opts: ["Methotrexate", "Sulfasalazine", "Hydroxychloroquine", "Leflunomide"],
    ans: 2,
    exp: "Hydroxychloroquine: antimalarial used in RA and SLE. Risk of irreversible retinal toxicity (bull's-eye maculopathy) with prolonged use. Annual eye exams recommended after 5 years of use (or sooner with risk factors)."
  },
  // ===== LUPUS =====
  {
    id: 30, cat: "Lupus",
    stem: "A 24-year-old woman presents with malar rash sparing the nasolabial folds, oral ulcers, arthritis, pleurisy, proteinuria with RBC casts, and pancytopenia. ANA is positive at 1:640. Which additional antibody is most specific for SLE and correlates with nephritis activity?",
    opts: ["Anti-Smith (anti-Sm)", "Anti-dsDNA", "Anti-histone", "Anti-Ro (SSA)"],
    ans: 1,
    exp: "Anti-dsDNA: highly specific for SLE, correlates with disease activity and lupus nephritis (levels rise with flares, fall with treatment). Anti-Smith is MOST specific but doesn't correlate with activity. Anti-histone = drug-induced lupus."
  },
  {
    id: 31, cat: "Lupus",
    stem: "A woman with SLE has recurrent spontaneous abortions, DVT, and thrombocytopenia. Her aPTT is prolonged but does not correct with mixing study. Which antibody is responsible?",
    opts: ["Anti-dsDNA", "Antiphospholipid antibodies (lupus anticoagulant)", "Anti-Ro (SSA)", "Anti-RNP"],
    ans: 1,
    exp: "Antiphospholipid syndrome: recurrent pregnancy loss, arterial/venous thrombosis, thrombocytopenia. Lupus anticoagulant prolongs aPTT in vitro (paradoxically prothrombotic in vivo). Doesn't correct with mixing study. Also check anti-cardiolipin and anti-β2-glycoprotein I."
  },
  {
    id: 32, cat: "Lupus",
    stem: "Which medication should ALL patients with SLE be on unless contraindicated, as it reduces flares, organ damage, and mortality?",
    opts: ["Cyclophosphamide", "Hydroxychloroquine", "Mycophenolate mofetil", "Rituximab"],
    ans: 1,
    exp: "Hydroxychloroquine is recommended for ALL SLE patients. It reduces flares, prevents organ damage, decreases thrombotic risk, improves survival, and is safe in pregnancy. It is the backbone of SLE therapy."
  },
  // ===== SCLERODERMA =====
  {
    id: 33, cat: "Scleroderma",
    stem: "A 52-year-old woman with longstanding Raynaud phenomenon develops skin thickening limited to her face and distal extremities, dysphagia, and telangiectasias. Anti-centromere antibody is positive. Which subtype of scleroderma does she have?",
    opts: ["Diffuse cutaneous systemic sclerosis", "Limited cutaneous systemic sclerosis (CREST)", "Morphea", "Eosinophilic fasciitis"],
    ans: 1,
    exp: "Limited scleroderma (CREST): Calcinosis, Raynaud, Esophageal dysmotility, Sclerodactyly, Telangiectasia. Anti-centromere Ab. Skin thickening distal to elbows/knees and face. Main risk: pulmonary arterial hypertension."
  },
  {
    id: 34, cat: "Scleroderma",
    stem: "A 45-year-old woman with diffuse scleroderma (anti-Scl-70+) presents with acute hypertension (BP 230/130), headache, and creatinine rising from 1.0 to 4.2 over 3 days. Peripheral smear shows schistocytes. Which is the most appropriate treatment?",
    opts: ["High-dose corticosteroids", "ACE inhibitor (captopril)", "Cyclophosphamide", "Plasma exchange"],
    ans: 1,
    exp: "Scleroderma renal crisis: hypertensive emergency + AKI + microangiopathic hemolytic anemia. Treat with ACE inhibitors (captopril). Steroids are a RISK FACTOR for renal crisis and should be avoided. Anti-Scl-70 (topoisomerase I) = diffuse disease."
  },
  {
    id: 35, cat: "Scleroderma",
    stem: "Which pulmonary complication is the leading cause of death in patients with LIMITED scleroderma?",
    opts: ["Pulmonary arterial hypertension", "Interstitial lung disease", "Pulmonary embolism", "Aspiration pneumonia"],
    ans: 0,
    exp: "Limited scleroderma → PAH is #1 killer. Diffuse scleroderma → ILD is #1 killer. Screen limited scleroderma patients with annual echocardiography for PAH. Diffuse patients need PFTs and HRCT for ILD."
  },
  // ===== MYOSITIS =====
  {
    id: 36, cat: "Myositis",
    stem: "A 50-year-old woman presents with progressive proximal muscle weakness, heliotrope rash of the eyelids, Gottron papules over the knuckles, and CK of 8,000 U/L. EMG shows myopathic changes. Which malignancy screening is most important in this patient?",
    opts: ["No screening needed", "Age-appropriate cancer screening plus CT chest/abdomen/pelvis", "Brain MRI only", "Bone marrow biopsy"],
    ans: 1,
    exp: "Dermatomyositis has a strong association with underlying malignancy (ovarian, lung, GI, breast, lymphoma), especially in adults >40. Comprehensive cancer screening is indicated at diagnosis and during follow-up."
  },
  {
    id: 37, cat: "Myositis",
    stem: "A patient with inflammatory myopathy has interstitial lung disease, mechanic's hands (cracked, fissured skin on fingers), arthritis, fever, and Raynaud phenomenon. Which antibody is most likely positive?",
    opts: ["Anti-Mi-2", "Anti-Jo-1", "Anti-SRP", "Anti-centromere"],
    ans: 1,
    exp: "Anti-Jo-1 (anti-histidyl-tRNA synthetase): antisynthetase syndrome — ILD, mechanic's hands, arthritis, fever, Raynaud. Worst prognosis due to ILD. Anti-Mi-2 = classic DM with good prognosis. Anti-SRP = necrotizing myopathy, severe."
  },
  {
    id: 38, cat: "Myositis",
    stem: "A 65-year-old man presents with slowly progressive weakness of finger flexors and quadriceps over 2 years. CK is only mildly elevated. Biopsy shows rimmed vacuoles and endomysial CD8+ T-cell infiltration. He has not responded to prednisone. The diagnosis is:",
    opts: ["Polymyositis", "Dermatomyositis", "Inclusion body myositis", "Polymyalgia rheumatica"],
    ans: 2,
    exp: "IBM: most common inflammatory myopathy >50. Insidious, asymmetric, affects finger flexors + knee extensors. Rimmed vacuoles on biopsy. Refractory to immunosuppression. PM shows perifascicular atrophy is absent (that's DM)."
  },
  // ===== VASCULITIS =====
  {
    id: 39, cat: "Vasculitis – Large Vessel",
    stem: "A 72-year-old woman presents with new-onset severe headache, jaw claudication, and scalp tenderness. ESR is 105 mm/hr. What is the MOST URGENT concern if untreated?",
    opts: ["Stroke", "Irreversible vision loss", "Aortic aneurysm rupture", "Renal failure"],
    ans: 1,
    exp: "Giant cell arteritis (GCA): vision loss from anterior ischemic optic neuropathy (ophthalmic artery involvement) is the most feared acute complication. Start high-dose steroids IMMEDIATELY — do not wait for biopsy."
  },
  {
    id: 40, cat: "Vasculitis – Large Vessel",
    stem: "A 24-year-old Asian woman has arm claudication, diminished left radial pulse, and a BP discrepancy of 40 mmHg between arms. Arteriography shows stenosis of the aortic arch branches. The diagnosis is:",
    opts: ["Giant cell arteritis", "Takayasu arteritis", "Polyarteritis nodosa", "Fibromuscular dysplasia"],
    ans: 1,
    exp: "Takayasu arteritis (\"pulseless disease\"): granulomatous vasculitis of the aorta and its major branches. Young women (<40), classically Asian. Symptoms from vascular stenosis: limb claudication, absent pulses, BP discrepancies."
  },
  {
    id: 41, cat: "Vasculitis – Medium Vessel",
    stem: "A 48-year-old man with hepatitis B presents with fever, weight loss, hypertension, abdominal pain, and mononeuritis multiplex. Angiography shows multiple renal and mesenteric microaneurysms. This vasculitis is typically ANCA-negative and spares the:",
    opts: ["Kidneys", "GI tract", "Lungs (pulmonary vessels)", "Peripheral nerves"],
    ans: 2,
    exp: "Polyarteritis nodosa (PAN): medium-vessel vasculitis, ANCA-negative, Hep B associated. Spares lungs and glomeruli (distinguishes from MPA/GPA). Affects kidneys (renal artery, not glomeruli), GI, skin, nerves, heart."
  },
  {
    id: 42, cat: "Vasculitis – ANCA-Associated",
    stem: "A 55-year-old man presents with sinusitis with nasal septal perforation, pulmonary nodules with cavitation, and rapidly progressive glomerulonephritis. c-ANCA (PR3) is positive. Biopsy shows necrotizing granulomatous inflammation. The diagnosis is:",
    opts: ["Microscopic polyangiitis", "Granulomatosis with polyangiitis (GPA)", "Eosinophilic granulomatosis with polyangiitis", "Goodpasture syndrome"],
    ans: 1,
    exp: "GPA (Wegener): upper airway + lungs + kidneys triad. c-ANCA/PR3+. Necrotizing granulomatous vasculitis. MPA: similar but NO granulomas, p-ANCA/MPO+. EGPA: asthma + eosinophilia + vasculitis."
  },
  {
    id: 43, cat: "Vasculitis – ANCA-Associated",
    stem: "A 42-year-old asthmatic man develops peripheral eosinophilia (22%), migratory pulmonary infiltrates, palpable purpura, and mononeuritis multiplex of the foot. p-ANCA is positive. The diagnosis is:",
    opts: ["GPA", "EGPA (Churg-Strauss)", "PAN", "Hypereosinophilic syndrome"],
    ans: 1,
    exp: "EGPA: late-onset asthma → eosinophilia → vasculitis (three phases). p-ANCA/MPO+ in ~40%. Neuropathy (mononeuritis multiplex) is very common. Cardiac involvement is leading cause of death."
  },
  {
    id: 44, cat: "Vasculitis – Small Vessel",
    stem: "A 5-year-old boy develops palpable purpura on buttocks and legs, abdominal pain, arthralgia, and hematuria after an upper respiratory infection. Skin biopsy shows leukocytoclastic vasculitis with IgA deposits. The diagnosis is:",
    opts: ["Kawasaki disease", "IgA vasculitis (HSP)", "Meningococcemia", "HUS"],
    ans: 1,
    exp: "IgA vasculitis (HSP): most common childhood vasculitis. Tetrad: palpable purpura (legs/buttocks), arthralgias, abdominal pain (intussusception risk), renal (IgA nephropathy). IgA immune complex deposition. Usually self-limited."
  },
  {
    id: 45, cat: "Vasculitis – Medium Vessel",
    stem: "A 3-year-old Japanese boy has high fever for 6 days, bilateral nonexudative conjunctivitis, strawberry tongue, cervical lymphadenopathy, erythema of palms/soles with desquamation, and a polymorphous rash. What is the most serious complication?",
    opts: ["Renal failure", "Coronary artery aneurysm", "Stroke", "Pulmonary hemorrhage"],
    ans: 1,
    exp: "Kawasaki disease: medium-vessel vasculitis in children <5. Diagnosed clinically (fever ≥5 days + 4/5 criteria). Coronary artery aneurysms are the most feared complication. Treat with IVIG + high-dose aspirin."
  },
  // ===== SERONEGATIVE SPONDYLOARTHROPATHIES =====
  {
    id: 46, cat: "Seronegative Spondyloarthropathies",
    stem: "A 23-year-old man has inflammatory low back pain for 8 months that improves with exercise. X-ray shows bilateral sacroiliitis and \"bamboo spine\" with syndesmophytes. HLA-B27 is positive. RF and ANA are negative. The diagnosis is:",
    opts: ["Rheumatoid arthritis", "Ankylosing spondylitis", "Reactive arthritis", "Psoriatic arthritis"],
    ans: 1,
    exp: "Ankylosing spondylitis: bilateral sacroiliitis, bamboo spine (fused vertebrae via syndesmophytes), HLA-B27+ (~90%). Inflammatory back pain: onset <40, insidious, improves with exercise, worsens with rest, morning stiffness >30 min."
  },
  {
    id: 47, cat: "Seronegative Spondyloarthropathies",
    stem: "A 30-year-old man develops asymmetric oligoarthritis of the knee and ankle, conjunctivitis, and circinate balanitis 3 weeks after a Chlamydia urethritis episode. The diagnosis is:",
    opts: ["Gonococcal arthritis", "Reactive arthritis", "Psoriatic arthritis", "Behçet disease"],
    ans: 1,
    exp: "Reactive arthritis: \"can't see, can't pee, can't climb a tree.\" Triggered by GU (Chlamydia) or GI (Shigella, Salmonella, Yersinia, Campylobacter) infections. HLA-B27 associated. Asymmetric oligoarthritis, enthesitis."
  },
  {
    id: 48, cat: "Seronegative Spondyloarthropathies",
    stem: "A 35-year-old woman with extensive psoriatic plaques develops swelling of an entire finger (\"sausage digit\") and asymmetric joint involvement including the DIP joints. X-ray shows \"pencil-in-cup\" deformity. The diagnosis is:",
    opts: ["Rheumatoid arthritis", "Psoriatic arthritis", "Gout", "Reactive arthritis"],
    ans: 1,
    exp: "Psoriatic arthritis: DIP joint involvement (unlike RA), dactylitis (sausage digits), pencil-in-cup deformity, enthesitis. Can precede or follow skin psoriasis. Five patterns: asymmetric oligoarthritis (most common), symmetric polyarthritis, DIP-predominant, spondylitis, arthritis mutilans."
  },
  // ===== CRYSTALLINE ARTHROPATHY =====
  {
    id: 49, cat: "Gout",
    stem: "A 58-year-old obese man on thiazide diuretics presents with acute severe pain and swelling of the first MTP joint. Joint aspiration under polarized light shows needle-shaped crystals that are yellow when parallel to the compensator axis (negatively birefringent). What is the crystal composition?",
    opts: ["Calcium pyrophosphate dihydrate", "Monosodium urate", "Calcium oxalate", "Hydroxyapatite"],
    ans: 1,
    exp: "Gout: monosodium urate (MSU) crystals — needle-shaped, negatively birefringent (yellow when parallel to slow ray of compensator). Pseudogout: CPPD — rhomboid, weakly positively birefringent (blue when parallel)."
  },
  {
    id: 50, cat: "Gout",
    stem: "During an acute gout attack, which medication should NOT be initiated as it may worsen or prolong the flare?",
    opts: ["Colchicine", "Indomethacin", "Allopurinol", "Prednisone"],
    ans: 2,
    exp: "NEVER start or adjust urate-lowering therapy (allopurinol, febuxostat, probenecid) during an acute flare — it can worsen the attack by mobilizing urate. Treat acute flare with NSAIDs, colchicine, or corticosteroids first."
  },
  {
    id: 51, cat: "Pseudogout",
    stem: "A 74-year-old woman presents with acute knee swelling. X-ray shows linear calcification in the menisci (chondrocalcinosis). Aspirate shows weakly positively birefringent rhomboid crystals. Which underlying condition should be screened for?",
    opts: ["Diabetes mellitus", "Hemochromatosis", "Hepatitis C", "HIV"],
    ans: 1,
    exp: "CPPD/pseudogout associations: hemochromatosis, hyperparathyroidism, hypomagnesemia, hypothyroidism, Wilson disease (\"Hyper-H's\"). Hemochromatosis: CPPD + hepatomegaly + bronze skin + diabetes."
  },
  // ===== PEDIATRIC RHEUMATOLOGY & MSK =====
  {
    id: 52, cat: "Pediatric MSK",
    stem: "A 4-year-old boy presents with a limp and refusal to bear weight on his right leg. He is afebrile. Hip X-ray shows flattening and fragmentation of the right femoral head with a crescent sign. What is the diagnosis?",
    opts: ["Septic arthritis", "Legg-Calvé-Perthes disease", "Slipped capital femoral epiphysis", "Transient synovitis"],
    ans: 1,
    exp: "Legg-Calvé-Perthes: idiopathic avascular necrosis of the femoral head in children ages 4-10 (peak 5-7). Boys >> girls. Insidious limp, limited hip ROM (especially abduction/internal rotation). X-ray: femoral head fragmentation."
  },
  {
    id: 53, cat: "Pediatric MSK",
    stem: "An obese 13-year-old boy presents with gradually worsening left hip pain and a limp. On exam, obligatory external rotation occurs with hip flexion (Drehmann sign). X-ray shows posterior displacement of the femoral epiphysis. The diagnosis is:",
    opts: ["Legg-Calvé-Perthes disease", "Slipped capital femoral epiphysis (SCFE)", "Osgood-Schlatter disease", "Developmental dysplasia of the hip"],
    ans: 1,
    exp: "SCFE: displacement of femoral epiphysis through the growth plate. Overweight adolescents (10-16). \"Ice cream falling off the cone.\" Bilateral in 20-40%. Treated surgically with in situ screw fixation. Obligatory ER with flexion is classic."
  },
  {
    id: 54, cat: "Pediatric MSK",
    stem: "A newborn has asymmetric gluteal folds and limited hip abduction on the left. The Ortolani maneuver produces a palpable \"clunk\" as the femoral head reduces into the acetabulum. What is the diagnosis?",
    opts: ["Legg-Calvé-Perthes disease", "SCFE", "Developmental dysplasia of the hip (DDH)", "Congenital femur deficiency"],
    ans: 2,
    exp: "DDH: spectrum from subluxation to dislocation. Risk factors: breech, female, firstborn, family history. Ortolani (reduces dislocated hip) and Barlow (dislocates unstable hip) tests. Ultrasound <6 months; X-ray after. Treat with Pavlik harness."
  },
  // ===== SPINE =====
  {
    id: 55, cat: "Spine",
    stem: "A 45-year-old man presents with low back pain radiating down the posterior leg to the lateral foot, with numbness on the lateral foot and weakness of plantarflexion. Ankle jerk is diminished. Which nerve root is most likely compressed?",
    opts: ["L3", "L4", "L5", "S1"],
    ans: 3,
    exp: "S1 radiculopathy: pain radiating to posterior leg → lateral foot, weakness of plantarflexion (can't toe walk), decreased ankle reflex. L5: foot drop (can't heel walk), dorsal foot numbness, no reflex change. L4: knee extension weakness, decreased patellar reflex."
  },
  {
    id: 56, cat: "Spine",
    stem: "A 60-year-old man presents with bilateral leg pain, numbness, and weakness that worsen with walking and standing (neurogenic claudication) and improve with sitting or leaning forward. What is the most likely diagnosis?",
    opts: ["Lumbar disc herniation", "Lumbar spinal stenosis", "Peripheral vascular disease", "Cauda equina syndrome"],
    ans: 1,
    exp: "Lumbar spinal stenosis: neurogenic claudication — bilateral symptoms worse with extension (standing/walking), relieved by flexion (sitting, pushing shopping cart). Due to degenerative narrowing of spinal canal. Distinguished from vascular claudication by relief with flexion (not just rest)."
  },
  {
    id: 57, cat: "Spine",
    stem: "A 35-year-old woman presents acutely with severe back pain, bilateral leg weakness, saddle anesthesia, and urinary retention. On exam she has decreased rectal tone. What is the most important next step?",
    opts: ["Outpatient MRI in 2 weeks", "Start oral NSAIDs and physical therapy", "Emergent MRI and surgical decompression consultation", "Epidural steroid injection"],
    ans: 2,
    exp: "Cauda equina syndrome: surgical EMERGENCY. Saddle anesthesia, urinary retention/incontinence, bilateral leg weakness, decreased rectal tone. Requires emergent MRI and decompression within 24-48 hours to prevent permanent neurologic damage."
  },
  // ===== UPPER EXTREMITY / BRACHIAL PLEXUS =====
  {
    id: 58, cat: "Upper Extremity – Brachial Plexus",
    stem: "A newborn delivered with shoulder dystocia has the right arm hanging limply at the side, internally rotated and adducted, with the forearm pronated (\"waiter's tip\" position). Grasp reflex is intact. Which nerve roots are injured?",
    opts: ["C5-C6 (Erb-Duchenne palsy)", "C8-T1 (Klumpke palsy)", "C5-T1 (total plexus)", "Long thoracic nerve only"],
    ans: 0,
    exp: "Erb-Duchenne palsy (C5-C6): upper trunk injury from lateral traction during delivery. Loss of shoulder abduction, external rotation, elbow flexion, and forearm supination → waiter's tip position. Grasp intact (C8-T1). Klumpke (C8-T1): claw hand, Horner syndrome."
  },
  {
    id: 59, cat: "Upper Extremity – Humerus",
    stem: "A 30-year-old man fractures the midshaft of his humerus in a fall. On exam, he has wrist drop and sensory loss over the dorsal first web space. Which nerve is injured?",
    opts: ["Median nerve", "Ulnar nerve", "Radial nerve", "Musculocutaneous nerve"],
    ans: 2,
    exp: "Radial nerve runs in the spiral groove of the humerus — vulnerable in midshaft fractures. Injury causes wrist drop (loss of wrist/finger extension), loss of sensation over dorsal first web space (anatomical snuffbox area)."
  },
  {
    id: 60, cat: "Upper Extremity – Humerus",
    stem: "A patient with a supracondylar humerus fracture develops inability to flex the DIP joints of digits 2-3, weakness of thumb opposition, and loss of sensation over the thenar eminence and palmar digits 1-3. Which nerve is injured?",
    opts: ["Radial nerve", "Ulnar nerve", "Anterior interosseous nerve", "Median nerve"],
    ans: 3,
    exp: "Median nerve: injured in supracondylar fractures. Loss of forearm pronation, wrist flexion (radial side), thumb opposition, and sensation over palmar digits 1-3.5. \"Hand of benediction\" when making a fist (can't flex digits 1-3)."
  },
  // ===== NERVES OF LIMBS =====
  {
    id: 61, cat: "Nerves of Limbs",
    stem: "A patient has difficulty unlocking a door (weak finger abduction) and sensory loss over the medial 1.5 digits. On exam, there is clawing of digits 4-5. Which nerve is injured?",
    opts: ["Median nerve", "Radial nerve", "Ulnar nerve", "Musculocutaneous nerve"],
    ans: 2,
    exp: "Ulnar nerve: innervates interossei (finger abduction/adduction), medial 2 lumbricals, hypothenar muscles. Injury → claw hand (digits 4-5), weak finger abduction (can't spread fingers), sensory loss medial 1.5 digits. Common at medial epicondyle or Guyon canal."
  },
  {
    id: 62, cat: "Nerves of Limbs",
    stem: "After prolonged sitting with legs crossed, a patient develops foot drop and numbness over the dorsum of the foot and lateral leg. Which nerve is injured?",
    opts: ["Tibial nerve", "Common peroneal (fibular) nerve", "Femoral nerve", "Obturator nerve"],
    ans: 1,
    exp: "Common peroneal nerve wraps around the fibular neck — vulnerable to compression. Deep peroneal branch: foot drop (can't dorsiflex/evert). Superficial peroneal: eversion weakness, lateral leg sensation. Dorsal foot numbness (deep peroneal = web space between toes 1-2)."
  },
  {
    id: 63, cat: "Nerves of Limbs",
    stem: "A patient has weakness of knee extension, loss of patellar reflex, and numbness over the anterior thigh and medial leg. Which nerve is injured?",
    opts: ["Femoral nerve (L2-L4)", "Obturator nerve", "Sciatic nerve", "Superior gluteal nerve"],
    ans: 0,
    exp: "Femoral nerve (L2-L4): quadriceps (knee extension), patellar reflex, sensation to anterior thigh (anterior cutaneous) and medial leg (saphenous branch). Can be injured in pelvic surgery, psoas abscess, or femoral catheterization."
  },
  // ===== LOWER EXTREMITY FRACTURES =====
  {
    id: 64, cat: "Lower Extremity Fractures",
    stem: "A 78-year-old woman with osteoporosis falls and presents with a shortened, externally rotated right leg. X-ray shows a displaced femoral neck fracture. Which artery, if disrupted, most increases the risk of avascular necrosis of the femoral head?",
    opts: ["Obturator artery", "Medial circumflex femoral artery", "Lateral circumflex femoral artery", "Superior gluteal artery"],
    ans: 1,
    exp: "Medial circumflex femoral artery (MCFA) is the primary blood supply to the femoral head via retinacular vessels. Disruption in displaced femoral neck fractures → high risk of AVN. This is why displaced femoral neck fractures in elderly often require arthroplasty rather than fixation."
  },
  {
    id: 65, cat: "Lower Extremity Fractures",
    stem: "A 25-year-old man sustains a tibial shaft fracture in a motorcycle accident. Six hours later, he develops severe leg pain out of proportion to injury, pain with passive toe extension, paresthesias, and a tense anterior compartment. Pulses are still palpable. What is the next step?",
    opts: ["Elevate the leg and observe", "Measure compartment pressures and/or emergent fasciotomy", "CT angiography", "Apply a compression bandage"],
    ans: 1,
    exp: "Acute compartment syndrome: pain out of proportion, pain with passive stretch, paresthesias, pressure (tense compartment). Pulses are often PRESERVED until late. Emergent fasciotomy is required to prevent muscle necrosis and nerve damage. Tibial fractures are the most common cause."
  },
  // ===== OA vs RA =====
  {
    id: 66, cat: "OA vs RA",
    stem: "A 65-year-old overweight woman has bilateral knee pain that worsens with activity and improves with rest. She has brief morning stiffness (<30 min), bony enlargement of the DIP joints, and crepitus. X-rays show joint space narrowing, osteophytes, and subchondral sclerosis. Which diagnosis is most likely?",
    opts: ["Rheumatoid arthritis", "Osteoarthritis", "Psoriatic arthritis", "Gout"],
    ans: 1,
    exp: "OA: \"wear and tear\" degenerative arthritis. Mechanical pain (worse with use), brief stiffness, DIP involvement (Heberden nodes), PIP (Bouchard nodes), knees, hips, spine. X-ray: joint space narrowing, osteophytes, subchondral sclerosis/cysts. No systemic inflammation."
  },
  {
    id: 67, cat: "OA vs RA",
    stem: "Which of the following X-ray findings is characteristic of rheumatoid arthritis but NOT osteoarthritis?",
    opts: ["Osteophytes", "Subchondral sclerosis", "Periarticular erosions with periarticular osteopenia", "Subchondral cysts"],
    ans: 2,
    exp: "RA X-ray: periarticular osteopenia, marginal erosions, joint space narrowing (symmetric), soft tissue swelling. OA X-ray: osteophytes, subchondral sclerosis, subchondral cysts, asymmetric joint space narrowing. No periarticular osteopenia in OA."
  },
  // ===== BONE TUMORS =====
  {
    id: 68, cat: "Bone Tumors",
    stem: "A 15-year-old boy presents with knee pain and a mass in the distal femoral metaphysis. X-ray shows a \"sunburst\" periosteal reaction and Codman triangle. Biopsy shows malignant osteoid production by tumor cells. The diagnosis is:",
    opts: ["Ewing sarcoma", "Osteosarcoma", "Giant cell tumor", "Chondrosarcoma"],
    ans: 1,
    exp: "Osteosarcoma: most common primary malignant bone tumor in adolescents. Distal femur/proximal tibia (around the knee). Sunburst pattern, Codman triangle, osteoid production by malignant cells. Associated with Rb mutations, Paget disease, radiation."
  },
  {
    id: 69, cat: "Bone Tumors",
    stem: "An 8-year-old boy has a painful diaphyseal lytic lesion of the femur with lamellated (\"onion-skin\") periosteal reaction. Biopsy shows small round blue cells arranged in rosettes that are CD99 (MIC-2) positive. Diagnosis?",
    opts: ["Osteosarcoma", "Ewing sarcoma", "Osteochondroma", "Lymphoma"],
    ans: 1,
    exp: "Ewing sarcoma: children 5-15, diaphysis of long bones (or flat bones). Onion-skin periosteal reaction, small round blue cells, CD99+. Translocation t(11;22) — EWS-FLI1 fusion. Can mimic osteomyelitis clinically."
  },
  {
    id: 70, cat: "Bone Tumors",
    stem: "A 30-year-old woman has a lytic lesion of the distal femoral epiphysis with a \"soap bubble\" appearance on X-ray. Biopsy shows multinucleated giant cells with uniform nuclei resembling stromal cell nuclei. The diagnosis is:",
    opts: ["Osteosarcoma", "Giant cell tumor (osteoclastoma)", "Aneurysmal bone cyst", "Osteoblastoma"],
    ans: 1,
    exp: "Giant cell tumor: benign but locally aggressive. Ages 20-40, epiphysis of long bones (typically around the knee). Soap bubble appearance. Multinucleated giant cells (osteoclast-like). Can recur after curettage."
  },
  // ===== SKIN CANCERS =====
  {
    id: 71, cat: "Skin Cancer",
    stem: "An elderly farmer has a pearly, translucent papule with rolled borders and telangiectasias on his nose. Biopsy shows nests of basaloid cells with peripheral palisading. Which is the most likely diagnosis?",
    opts: ["Squamous cell carcinoma", "Basal cell carcinoma", "Melanoma", "Merkel cell carcinoma"],
    ans: 1,
    exp: "BCC: most common skin cancer. Pearly papule, rolled borders, telangiectasias, central ulceration possible. Locally invasive, rarely metastasizes. UV exposure is #1 risk factor. Hedgehog signaling pathway (PTCH mutations)."
  },
  {
    id: 72, cat: "Skin Cancer",
    stem: "A 70-year-old man has a firm, ulcerated nodule with heaped-up borders on his lower lip. Biopsy shows atypical squamous cells with keratin pearls invading the dermis. Which premalignant lesion most commonly precedes this cancer?",
    opts: ["Seborrheic keratosis", "Actinic keratosis", "Melanocytic nevus", "Dermatofibroma"],
    ans: 1,
    exp: "SCC: second most common skin cancer. Arises from actinic (solar) keratosis in sun-exposed areas. Keratin pearls on histology. Can metastasize (unlike BCC). Risk factors: UV, immunosuppression, chronic wounds (Marjolin ulcer), arsenic."
  },
  {
    id: 73, cat: "Skin Cancer",
    stem: "A 45-year-old woman has an asymmetric, irregularly bordered, darkly pigmented lesion on her back that has been growing and changing color. Biopsy shows atypical melanocytes invading the dermis to a depth of 2.1 mm (Breslow depth). Which factor is the single most important prognostic indicator?",
    opts: ["Tumor diameter", "Breslow depth (thickness)", "Color variegation", "Patient age"],
    ans: 1,
    exp: "Melanoma prognosis: Breslow depth is the #1 prognostic factor. Deeper invasion = worse prognosis. ABCDE criteria for screening: Asymmetry, Border irregularity, Color variation, Diameter >6mm, Evolution."
  },
  {
    id: 74, cat: "Skin Cancer – Paraneoplastic",
    stem: "A 55-year-old man presents with sudden onset of multiple pruritic seborrheic keratoses. This paraneoplastic sign is called:",
    opts: ["Acanthosis nigricans", "Sign of Leser-Trélat", "Dermatomyositis", "Erythema nodosum"],
    ans: 1,
    exp: "Sign of Leser-Trélat: sudden eruption of multiple seborrheic keratoses, associated with internal malignancy (especially GI adenocarcinoma). Acanthosis nigricans (velvety hyperpigmentation in skin folds) is also paraneoplastic when sudden onset — associated with gastric carcinoma."
  },
  // ===== RASHES / DERM FUNDAMENTALS =====
  {
    id: 75, cat: "Dermatology – Rashes",
    stem: "A primary skin lesion that is flat, <1 cm, and differs in color from surrounding skin is termed a:",
    opts: ["Papule", "Macule", "Patch", "Plaque"],
    ans: 1,
    exp: "Macule: flat, <1 cm, color change only (no elevation). Patch: flat, >1 cm. Papule: elevated, <1 cm. Plaque: elevated, >1 cm. Nodule: elevated, >1 cm, deeper (extends into dermis/subcutis). Vesicle: fluid-filled, <1 cm. Bulla: fluid-filled, >1 cm."
  },
  {
    id: 76, cat: "Dermatology – Rashes",
    stem: "A patient presents with target-shaped (targetoid) lesions on the palms and soles. Recent history of herpes labialis outbreak. The most likely diagnosis is:",
    opts: ["Stevens-Johnson syndrome", "Erythema multiforme", "Psoriasis", "Urticaria"],
    ans: 1,
    exp: "Erythema multiforme: target lesions (3 concentric zones of color), most commonly triggered by HSV infection. Palms/soles involvement common. EM minor = skin only. Distinguished from SJS/TEN which is more often drug-induced and involves mucous membranes with skin detachment."
  },
  // ===== STAPHYLOCOCCUS =====
  {
    id: 77, cat: "Staphylococcus",
    stem: "A patient develops rapid-onset vomiting and watery diarrhea 2-4 hours after eating potato salad at a picnic. Which Staphylococcus aureus virulence factor is responsible?",
    opts: ["TSST-1", "Exfoliative toxin", "Preformed enterotoxin (heat-stable)", "Protein A"],
    ans: 2,
    exp: "S. aureus food poisoning: preformed heat-stable enterotoxins in food → rapid onset (1-6 hours), prominent vomiting. Self-limited. The toxin is a superantigen. Reheating food does NOT destroy the toxin since it's heat-stable."
  },
  {
    id: 78, cat: "Staphylococcus",
    stem: "A 2-year-old child presents with diffuse, tender erythema followed by widespread flaccid blisters and desquamation of the skin. Nikolsky sign is positive. Mucous membranes are SPARED. Cultures grow S. aureus from the nasopharynx. The diagnosis is:",
    opts: ["Toxic epidermal necrolysis", "Staphylococcal scalded skin syndrome (SSSS)", "Bullous impetigo", "Stevens-Johnson syndrome"],
    ans: 1,
    exp: "SSSS: caused by S. aureus exfoliative toxin (serine protease targeting desmoglein 1). Cleavage within the granular layer. Mucous membranes SPARED (unlike SJS/TEN which involves mucosa). Nikolsky+. Mostly in children <5 (adults have anti-toxin antibodies)."
  },
  {
    id: 79, cat: "Staphylococcus",
    stem: "Which virulence factor of S. aureus binds the Fc region of IgG, preventing opsonization and phagocytosis?",
    opts: ["Coagulase", "Protein A", "Catalase", "Panton-Valentine leukocidin"],
    ans: 1,
    exp: "Protein A: binds Fc portion of IgG → prevents opsonization/complement activation → immune evasion. Coagulase: converts fibrinogen to fibrin (clot). Catalase: breaks down H₂O₂ (distinguishes Staph from Strep). PVL: associated with skin infections and necrotizing pneumonia in CA-MRSA."
  },
  // ===== STREP A/B =====
  {
    id: 80, cat: "Streptococcus – Group A",
    stem: "A 7-year-old boy presents 2 weeks after pharyngitis with periorbital edema, dark (\"cola-colored\") urine, and hypertension. Urinalysis shows RBC casts and proteinuria. ASO titer is elevated. Which post-streptococcal complication is this?",
    opts: ["Rheumatic fever", "Post-streptococcal glomerulonephritis", "Scarlet fever", "Streptococcal toxic shock"],
    ans: 1,
    exp: "Post-streptococcal GN (PSGN): nephritic syndrome 1-3 weeks after GAS pharyngitis (or 3-6 weeks after skin infection). Type III hypersensitivity (immune complex deposition). Elevated ASO, low C3. Self-limited in children. Distinct from rheumatic fever (which follows pharyngitis ONLY)."
  },
  {
    id: 81, cat: "Streptococcus – Group A",
    stem: "A 10-year-old girl presents with migratory polyarthritis, new heart murmur, subcutaneous nodules, and erythema marginatum 3 weeks after untreated strep pharyngitis. Which cardiac valve is most commonly affected in rheumatic heart disease?",
    opts: ["Aortic valve", "Mitral valve", "Tricuspid valve", "Pulmonic valve"],
    ans: 1,
    exp: "Rheumatic fever (Jones criteria): migratory polyarthritis, carditis, subcutaneous nodules, erythema marginatum, Sydenham chorea. Mitral valve most commonly affected (mitral stenosis in chronic disease). Type II hypersensitivity (molecular mimicry with M protein). Follows pharyngitis only."
  },
  {
    id: 82, cat: "Streptococcus – Group B",
    stem: "A newborn develops signs of sepsis, pneumonia, and meningitis within the first 24 hours of life. Blood culture grows beta-hemolytic, catalase-negative, bacitracin-resistant gram-positive cocci. Which organism is most likely?",
    opts: ["Group A Streptococcus", "Group B Streptococcus (S. agalactiae)", "S. pneumoniae", "Listeria monocytogenes"],
    ans: 1,
    exp: "GBS (S. agalactiae): #1 cause of neonatal meningitis/sepsis. Colonizes vaginal/rectal flora. Screen pregnant women at 36-37 weeks; give intrapartum penicillin prophylaxis if positive. Beta-hemolytic, catalase-negative, bacitracin-resistant (vs GAS = bacitracin-sensitive), CAMP test positive."
  },
  // ===== SPIROCHETES =====
  {
    id: 83, cat: "Spirochetes",
    stem: "A patient develops a painless chancre on the genitalia that resolves spontaneously. Six weeks later, he develops a diffuse maculopapular rash including palms and soles, condylomata lata, and lymphadenopathy. Darkfield microscopy is positive. The causative organism is:",
    opts: ["Borrelia burgdorferi", "Treponema pallidum", "Leptospira interrogans", "Chlamydia trachomatis"],
    ans: 1,
    exp: "Syphilis (T. pallidum): Primary = painless chancre. Secondary (weeks later) = diffuse rash (including palms/soles), condylomata lata, lymphadenopathy. Tertiary = gummas, tabes dorsalis, aortic aneurysm. Diagnosed by darkfield microscopy, RPR/VDRL (screening), FTA-ABS (confirmatory)."
  },
  {
    id: 84, cat: "Spirochetes",
    stem: "A hiker in Connecticut develops an expanding erythematous ring-shaped lesion (erythema migrans) at the site of a tick bite, followed weeks later by bilateral facial nerve palsy and heart block. Which organism is responsible?",
    opts: ["Treponema pallidum", "Borrelia burgdorferi", "Rickettsia rickettsii", "Francisella tularensis"],
    ans: 1,
    exp: "Lyme disease (B. burgdorferi, Ixodes tick): Stage 1 = erythema migrans (bull's eye). Stage 2 (weeks-months) = cranial nerve palsy (especially CN VII bilateral), AV block, migratory arthritis. Stage 3 = chronic arthritis (knee), encephalopathy. Treat with doxycycline (early), ceftriaxone (late/neuro)."
  },
  {
    id: 85, cat: "Spirochetes",
    stem: "A sewer worker develops sudden high fever, headache, myalgias, conjunctival suffusion (redness without exudate), and jaundice with renal failure. The causative organism is:",
    opts: ["Treponema pallidum", "Borrelia burgdorferi", "Leptospira interrogans", "Bartonella henselae"],
    ans: 2,
    exp: "Leptospirosis (L. interrogans): transmitted through contact with water contaminated by animal (rat) urine. Biphasic: initial flu-like illness → severe Weil disease (jaundice, renal failure, hemorrhage). Conjunctival suffusion is characteristic. Occupational risk: sewer/farm workers."
  },
  // ===== CANDIDA =====
  {
    id: 86, cat: "Candida",
    stem: "A hospitalized patient on broad-spectrum antibiotics develops white, curd-like plaques on the oral mucosa that can be scraped off to reveal an erythematous base. KOH prep shows pseudohyphae and budding yeast. The organism is:",
    opts: ["Aspergillus fumigatus", "Candida albicans", "Cryptococcus neoformans", "Histoplasma capsulatum"],
    ans: 1,
    exp: "Oral candidiasis (thrush): Candida albicans. Risk factors: antibiotics, immunosuppression (HIV, steroids), diabetes. Forms pseudohyphae at 37°C (body temp), budding yeast at 20°C. Germ tube test positive. Treat with nystatin (topical) or fluconazole (systemic)."
  },
  {
    id: 87, cat: "Candida",
    stem: "Which Candida virulence mechanism involves transitioning from yeast form to filamentous pseudohyphae/hyphae, facilitating tissue invasion?",
    opts: ["Capsule formation", "Dimorphic switching (yeast-to-hypha transition)", "Melanin production", "Urease production"],
    ans: 1,
    exp: "Candida albicans: dimorphic — yeast form for dissemination, hyphal/pseudohyphal form for tissue invasion and biofilm formation. This morphologic switching is a key virulence factor. Also forms biofilms on catheters/prosthetics."
  },
  // ===== LEISHMANIA =====
  {
    id: 88, cat: "Leishmania",
    stem: "A soldier returning from the Middle East has a painless ulcer on his arm with raised borders that has been present for 2 months. Biopsy of the ulcer edge shows macrophages filled with amastigotes (intracellular oval bodies with a kinetoplast). The vector for this disease is:",
    opts: ["Aedes mosquito", "Sandfly (Phlebotomus/Lutzomyia)", "Tsetse fly", "Ixodes tick"],
    ans: 1,
    exp: "Leishmaniasis: transmitted by sandflies. Cutaneous (most common) = painless ulcer. Visceral (kala-azar, L. donovani) = fever, hepatosplenomegaly, pancytopenia. Mucocutaneous (L. braziliensis) = destructive nasal/oral lesions. Amastigotes in macrophages on biopsy."
  },
  {
    id: 89, cat: "Leishmania",
    stem: "A patient from India presents with fever, massive splenomegaly, hepatomegaly, pancytopenia, and hypergammaglobulinemia. Bone marrow biopsy shows macrophages laden with amastigotes. Which form of leishmaniasis is this?",
    opts: ["Cutaneous", "Mucocutaneous", "Visceral (kala-azar)", "Post-kala-azar dermal"],
    ans: 2,
    exp: "Visceral leishmaniasis (kala-azar): L. donovani. \"Black fever\" — darkening of skin. Parasitizes reticuloendothelial system → massive hepatosplenomegaly, pancytopenia (marrow infiltration + hypersplenism). Fatal if untreated. Diagnose by splenic/marrow aspirate. Treat: amphotericin B or miltefosine."
  },
  // ===== BONE/JOINT INFECTIONS =====
  {
    id: 90, cat: "Bone & Joint Infections",
    stem: "A 10-year-old boy presents with fever, refusal to bear weight, and point tenderness over the tibial metaphysis. MRI shows bone marrow edema and periosteal elevation. Blood cultures are pending. What is the most likely causative organism?",
    opts: ["S. aureus", "Group B Streptococcus", "Salmonella", "Pseudomonas"],
    ans: 0,
    exp: "S. aureus is the #1 cause of osteomyelitis in ALL age groups (except neonates where GBS also common, and sickle cell patients where Salmonella is classically tested). Hematogenous spread to metaphysis in children (rich blood supply). MRI is most sensitive imaging."
  },
  {
    id: 91, cat: "Bone & Joint Infections",
    stem: "A patient with sickle cell disease develops osteomyelitis. While S. aureus remains most common overall, which organism is classically associated with osteomyelitis in sickle cell patients?",
    opts: ["Pseudomonas aeruginosa", "Salmonella species", "E. coli", "Neisseria gonorrhoeae"],
    ans: 1,
    exp: "Sickle cell + osteomyelitis: Salmonella is the classic board answer (due to functional asplenia → susceptibility to encapsulated/GI organisms, plus bone infarcts provide a nidus). However, S. aureus is still the most common even in SCD patients."
  },
  // ===== NON-NEOPLASTIC BONE DISEASE =====
  {
    id: 92, cat: "Non-Neoplastic Bone Disease",
    stem: "A 70-year-old man is found to have markedly elevated alkaline phosphatase with normal calcium and phosphorus. X-ray shows thickened, disorganized cortical bone in the pelvis with mixed lytic and sclerotic changes. Biopsy shows a \"mosaic\" pattern of lamellar bone with prominent cement lines. The diagnosis is:",
    opts: ["Osteoporosis", "Paget disease of bone", "Osteopetrosis", "Rickets"],
    ans: 1,
    exp: "Paget disease: excessive disordered bone remodeling. Three phases: lytic → mixed → sclerotic. Markedly elevated ALP (bone turnover), normal Ca/Phos. Mosaic pattern (jigsaw-like cement lines) is pathognomonic. Complications: bone pain, fractures, high-output heart failure, osteosarcoma (rare)."
  },
  {
    id: 93, cat: "Non-Neoplastic Bone Disease",
    stem: "A 60-year-old woman with a T-score of -3.0 on DEXA scan has had two vertebral compression fractures. Which statement about her condition is most accurate?",
    opts: ["This is osteomalacia", "This is osteoporosis — reduced bone MASS with normal mineralization", "This is Paget disease", "T-score of -3.0 indicates osteopenia"],
    ans: 1,
    exp: "Osteoporosis: T-score ≤ -2.5. Reduced bone mass and density with normal mineralization (unlike osteomalacia which has defective mineralization). Risk factors: postmenopausal, age, low BMI, steroids, smoking, alcohol. Treat: bisphosphonates, denosumab, teriparatide."
  },
  // ===== SPORTS MEDICINE =====
  {
    id: 94, cat: "Sports Medicine",
    stem: "A 22-year-old basketball player lands awkwardly and hears a \"pop\" in her knee. She develops immediate swelling. On exam, Lachman test and anterior drawer test are positive. Which structure is most likely torn?",
    opts: ["Posterior cruciate ligament", "Anterior cruciate ligament", "Medial meniscus", "Lateral collateral ligament"],
    ans: 1,
    exp: "ACL tear: noncontact pivoting/deceleration injury, audible pop, immediate hemarthrosis. Lachman test (most sensitive) and anterior drawer test positive. Often associated with O'Donoghue's unhappy triad: ACL + MCL + medial meniscus. MRI for diagnosis, surgical reconstruction in active patients."
  },
  // ===== HIP PATHOLOGY =====
  {
    id: 95, cat: "Lower Extremity – Hip",
    stem: "A 55-year-old man with a history of chronic corticosteroid use for asthma presents with progressive hip pain. MRI shows a crescent sign in the femoral head with subchondral collapse. The diagnosis is:",
    opts: ["Osteoarthritis", "Avascular necrosis of the femoral head", "Trochanteric bursitis", "Stress fracture"],
    ans: 1,
    exp: "AVN of femoral head: risk factors include corticosteroids (most common), alcohol, SLE, sickle cell, Gaucher disease. Crescent sign on X-ray = subchondral fracture. MRI is most sensitive for early detection. Advanced cases require total hip arthroplasty."
  },
  // ===== ANKLE/FOOT =====
  {
    id: 96, cat: "Lower Extremity – Ankle/Foot",
    stem: "A 40-year-old runner presents with plantar heel pain that is worst with the first steps in the morning and improves with activity. Tenderness is localized to the medial calcaneal tuberosity. The diagnosis is:",
    opts: ["Achilles tendinitis", "Plantar fasciitis", "Tarsal tunnel syndrome", "Calcaneal stress fracture"],
    ans: 1,
    exp: "Plantar fasciitis: most common cause of heel pain. Classic: \"first-step\" pain in the morning that improves with activity but worsens with prolonged standing. Tenderness at medial calcaneal insertion. Risk: obesity, pes planus, overuse. Treat: stretching, orthotics, NSAIDs."
  },
  // ===== MSK IMAGING =====
  {
    id: 97, cat: "MSK Imaging",
    stem: "For suspected osteomyelitis, which imaging modality is the most sensitive for early detection of bone marrow edema and soft tissue involvement?",
    opts: ["Plain radiograph (X-ray)", "CT scan", "MRI", "Ultrasound"],
    ans: 2,
    exp: "MRI: most sensitive for osteomyelitis (detects marrow edema within 1-2 days). X-rays may be normal for 10-14 days. CT good for cortical detail/sequestrum. Bone scan sensitive but less specific. MRI also best for soft tissue extension, abscesses."
  },
  // ===== DERMATOLOGY NEOPLASMS - BENIGN =====
  {
    id: 98, cat: "Derm Neoplasms – Benign",
    stem: "A 60-year-old man has multiple well-demarcated, waxy, \"stuck-on\" appearing brown papules on his trunk. They are non-tender. Biopsy shows horn cysts (pseudo-horn cysts) and a broad-based connection to the epidermis. The diagnosis is:",
    opts: ["Actinic keratosis", "Seborrheic keratosis", "Melanoma", "Basal cell carcinoma"],
    ans: 1,
    exp: "Seborrheic keratosis: most common benign epithelial tumor in older adults. \"Stuck-on\" waxy appearance, horn cysts histologically. Benign, no malignant potential. Sudden eruption of multiple SK = sign of Leser-Trélat (paraneoplastic)."
  },
  {
    id: 99, cat: "Derm Neoplasms – Vascular",
    stem: "An HIV-positive patient presents with multiple violaceous (purple-red) plaques and nodules on the skin and oral mucosa. Biopsy shows spindle-shaped cells forming vascular slits with extravasated RBCs. Which virus is associated?",
    opts: ["HPV", "EBV", "HHV-8 (KSHV)", "CMV"],
    ans: 2,
    exp: "Kaposi sarcoma: caused by HHV-8. Most common in AIDS patients (also organ transplant, elderly Mediterranean men). Violaceous lesions on skin, mucosa, viscera. Histology: spindle cells, vascular slits, RBC extravasation. Treat underlying HIV with ART."
  },
  {
    id: 100, cat: "Derm Neoplasms – Melanocytic",
    stem: "A pathologist reviews a biopsy of a pigmented lesion and notes melanocytes with architectural disorder confined to the epidermis, with irregular nesting and cytologic atypia. There is NO invasion into the dermis. This lesion is best classified as:",
    opts: ["Melanoma in situ", "Invasive melanoma", "Compound nevus", "Blue nevus"],
    ans: 0,
    exp: "Melanoma in situ: atypical melanocytes confined to the epidermis (have not crossed the basement membrane). Excellent prognosis if completely excised. Once melanocytes invade the dermis = invasive melanoma, and Breslow depth becomes the key prognostic factor."
  },
];

const CATEGORIES = [...new Set(QUESTIONS.map(q => q.cat))];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function USMLEQuiz() {
  const [mode, setMode] = useState("menu");
  const [selectedCats, setSelectedCats] = useState(new Set(CATEGORIES));
  const [questions, setQuestions] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [reviewList, setReviewList] = useState([]);
  const [flagged, setFlagged] = useState(new Set());
  const [showReview, setShowReview] = useState(false);
  const [history, setHistory] = useState([]);

  const startQuiz = useCallback((shuffle = true) => {
    const filtered = QUESTIONS.filter(q => selectedCats.has(q.cat));
    setQuestions(shuffle ? shuffleArray(filtered) : filtered);
    setIdx(0); setSelected(null); setShowExp(false);
    setScore(0); setAnswered(0); setReviewList([]); setFlagged(new Set());
    setHistory([]); setShowReview(false); setMode("quiz");
  }, [selectedCats]);

  const handleSelect = (i) => {
    if (showExp) return;
    setSelected(i);
    setShowExp(true);
    const correct = i === questions[idx].ans;
    if (correct) setScore(s => s + 1);
    setAnswered(a => a + 1);
    setHistory(h => [...h, { qId: questions[idx].id, selected: i, correct }]);
    if (!correct) setReviewList(r => [...r, { ...questions[idx], userAnswer: i }]);
  };

  const next = () => {
    if (idx < questions.length - 1) {
      setIdx(idx + 1); setSelected(null); setShowExp(false);
    } else {
      setMode("results");
    }
  };

  const prev = () => {
    if (idx > 0) { setIdx(idx - 1); setSelected(null); setShowExp(false); }
  };

  const toggleFlag = () => {
    setFlagged(f => {
      const n = new Set(f);
      n.has(questions[idx].id) ? n.delete(questions[idx].id) : n.add(questions[idx].id);
      return n;
    });
  };

  const toggleCat = (c) => {
    setSelectedCats(s => {
      const n = new Set(s);
      n.has(c) ? n.delete(c) : n.add(c);
      return n;
    });
  };

  const pct = answered > 0 ? Math.round((score / answered) * 100) : 0;
  const q = questions[idx];

  if (mode === "menu") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e6e1", fontFamily: "'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#6c63ff", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>USMLE Step 1 Practice</div>
            <h1 style={{ fontSize: 32, fontWeight: 800, margin: 0, lineHeight: 1.2, color: "#f0ece4" }}>MSK, Rheum & Derm</h1>
            <p style={{ color: "#888", fontSize: 14, marginTop: 8 }}>{QUESTIONS.length} questions across {CATEGORIES.length} categories</p>
          </div>

          <div style={{ marginBottom: 30 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: 1 }}>Select Topics</span>
              <button onClick={() => setSelectedCats(s => s.size === CATEGORIES.length ? new Set() : new Set(CATEGORIES))}
                style={{ background: "none", border: "1px solid #333", color: "#6c63ff", padding: "4px 12px", borderRadius: 4, fontSize: 12, cursor: "pointer" }}>
                {selectedCats.size === CATEGORIES.length ? "Deselect All" : "Select All"}
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {CATEGORIES.map(c => {
                const active = selectedCats.has(c);
                const count = QUESTIONS.filter(q => q.cat === c).length;
                return (
                  <button key={c} onClick={() => toggleCat(c)}
                    style={{
                      padding: "6px 14px", borderRadius: 20, fontSize: 12, cursor: "pointer", transition: "all .15s",
                      background: active ? "#6c63ff22" : "transparent",
                      border: active ? "1px solid #6c63ff" : "1px solid #2a2a35",
                      color: active ? "#a59bff" : "#666",
                      fontWeight: active ? 600 : 400,
                    }}>
                    {c} <span style={{ opacity: 0.5 }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button onClick={() => startQuiz(true)} disabled={selectedCats.size === 0}
            style={{
              width: "100%", padding: "16px", background: selectedCats.size === 0 ? "#222" : "#6c63ff", color: selectedCats.size === 0 ? "#555" : "#fff",
              border: "none", borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: selectedCats.size === 0 ? "not-allowed" : "pointer", transition: "all .2s",
              letterSpacing: 0.5,
            }}>
            Start — {QUESTIONS.filter(q => selectedCats.has(q.cat)).length} Questions (Shuffled)
          </button>
        </div>
      </div>
    );
  }

  if (mode === "results") {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e6e1", fontFamily: "'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px" }}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: "#6c63ff", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>Complete</div>
          <h1 style={{ fontSize: 36, fontWeight: 800, margin: "0 0 6px", color: "#f0ece4" }}>{pct}%</h1>
          <p style={{ color: "#888", fontSize: 15, marginBottom: 30 }}>{score} / {answered} correct</p>

          <div style={{ background: "#12121a", border: "1px solid #1e1e2a", borderRadius: 10, padding: 24, marginBottom: 24 }}>
            <div style={{ height: 8, background: "#1e1e2a", borderRadius: 4, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ height: "100%", width: `${pct}%`, background: pct >= 70 ? "#22c55e" : pct >= 50 ? "#eab308" : "#ef4444", borderRadius: 4, transition: "width .5s" }} />
            </div>
            <div style={{ display: "flex", gap: 20, fontSize: 13, color: "#888" }}>
              <span>✓ {score} correct</span>
              <span>✗ {answered - score} incorrect</span>
              {flagged.size > 0 && <span>🚩 {flagged.size} flagged</span>}
            </div>
          </div>

          {reviewList.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <button onClick={() => setShowReview(!showReview)}
                style={{ background: "none", border: "1px solid #2a2a35", color: "#a59bff", padding: "10px 20px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 600, width: "100%" }}>
                {showReview ? "Hide" : "Review"} Missed Questions ({reviewList.length})
              </button>
              {showReview && (
                <div style={{ marginTop: 16 }}>
                  {reviewList.map((r, i) => (
                    <div key={i} style={{ background: "#12121a", border: "1px solid #1e1e2a", borderRadius: 8, padding: 16, marginBottom: 12 }}>
                      <div style={{ fontSize: 10, color: "#6c63ff", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{r.cat}</div>
                      <p style={{ fontSize: 13, lineHeight: 1.5, margin: "0 0 10px", color: "#ccc" }}>{r.stem}</p>
                      <div style={{ fontSize: 12 }}>
                        <div style={{ color: "#ef4444", marginBottom: 4 }}>Your answer: {r.opts[r.userAnswer]}</div>
                        <div style={{ color: "#22c55e", marginBottom: 8 }}>Correct: {r.opts[r.ans]}</div>
                        <div style={{ color: "#999", fontStyle: "italic", fontSize: 11, lineHeight: 1.5 }}>{r.exp}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setMode("menu")}
              style={{ flex: 1, padding: "14px", background: "#1a1a25", color: "#ccc", border: "1px solid #2a2a35", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Back to Menu
            </button>
            <button onClick={() => startQuiz(true)}
              style={{ flex: 1, padding: "14px", background: "#6c63ff", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // QUIZ MODE
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0f", color: "#e8e6e1", fontFamily: "'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 20px 40px" }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, fontSize: 12, color: "#666" }}>
          <button onClick={() => setMode("menu")} style={{ background: "none", border: "none", color: "#6c63ff", cursor: "pointer", fontSize: 12, padding: 0, fontWeight: 600 }}>← Menu</button>
          <span>{score}/{answered} correct ({pct}%)</span>
        </div>

        {/* Progress */}
        <div style={{ height: 3, background: "#1e1e2a", borderRadius: 2, marginBottom: 24, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((idx + 1) / questions.length) * 100}%`, background: "#6c63ff", borderRadius: 2, transition: "width .3s" }} />
        </div>

        {/* Category + counter */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#6c63ff", textTransform: "uppercase", letterSpacing: 2 }}>{q.cat}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={toggleFlag} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, padding: 0, color: flagged.has(q.id) ? "#eab308" : "#444" }} title="Flag for review">
              {flagged.has(q.id) ? "🚩" : "⚑"}
            </button>
            <span style={{ fontSize: 12, color: "#555" }}>{idx + 1} / {questions.length}</span>
          </div>
        </div>

        {/* Question */}
        <p style={{ fontSize: 15, lineHeight: 1.7, margin: "0 0 24px", color: "#d4d0c8" }}>{q.stem}</p>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
          {q.opts.map((opt, i) => {
            const isSelected = selected === i;
            const isCorrect = i === q.ans;
            let bg = "#12121a";
            let border = "#1e1e2a";
            let col = "#ccc";
            if (showExp) {
              if (isCorrect) { bg = "#22c55e15"; border = "#22c55e55"; col = "#4ade80"; }
              else if (isSelected && !isCorrect) { bg = "#ef444415"; border = "#ef444455"; col = "#f87171"; }
            } else if (isSelected) {
              bg = "#6c63ff15"; border = "#6c63ff55"; col = "#a59bff";
            }
            return (
              <button key={i} onClick={() => handleSelect(i)}
                style={{
                  display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px",
                  background: bg, border: `1px solid ${border}`, borderRadius: 8,
                  color: col, fontSize: 14, lineHeight: 1.5, cursor: showExp ? "default" : "pointer",
                  textAlign: "left", transition: "all .15s", fontFamily: "inherit",
                }}>
                <span style={{ fontWeight: 700, minWidth: 20, opacity: 0.6 }}>{String.fromCharCode(65 + i)}.</span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExp && (
          <div style={{ background: "#12121a", border: "1px solid #1e1e2a", borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: selected === q.ans ? "#22c55e" : "#ef4444", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
              {selected === q.ans ? "✓ Correct" : "✗ Incorrect"}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.65, margin: 0, color: "#999" }}>{q.exp}</p>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={prev} disabled={idx === 0}
            style={{ flex: 1, padding: "12px", background: "#1a1a25", color: idx === 0 ? "#333" : "#aaa", border: "1px solid #2a2a35", borderRadius: 8, fontSize: 14, cursor: idx === 0 ? "not-allowed" : "pointer", fontWeight: 600 }}>
            ← Prev
          </button>
          {showExp && (
            <button onClick={next}
              style={{ flex: 2, padding: "12px", background: "#6c63ff", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              {idx === questions.length - 1 ? "See Results" : "Next →"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

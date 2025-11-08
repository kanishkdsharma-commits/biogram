"""
Sample patient visit notes from different specialties for Biogram demo
These are realistic, de-identified medical notes that can be used for the app
"""

VISIT_NOTES = [
    {
        "specialty": "Cardiology",
        "visit_date": "2025-10-15",
        "provider": "Dr. Sarah Chen, MD",
        "chief_complaint": "Follow-up for hypertension and atrial fibrillation",
        "subjective": "62-year-old male with history of hypertension and paroxysmal atrial fibrillation returns for follow-up. Reports good compliance with medications. Denies chest pain, palpitations, or shortness of breath. Occasional lightheadedness when standing quickly. Home BP readings averaging 128/78.",
        "objective": {
            "vitals": {
                "BP": "132/82 mmHg",
                "HR": "76 bpm (regular)",
                "Weight": "185 lbs",
                "BMI": "27.3"
            },
            "physical_exam": "Cardiovascular: Regular rate and rhythm, no murmurs. Lungs: Clear bilaterally. Extremities: No edema.",
            "labs": "INR 2.3 (therapeutic range 2-3)"
        },
        "assessment": [
            "Hypertension - well controlled on current regimen",
            "Paroxysmal atrial fibrillation - stable, on anticoagulation",
            "Orthostatic hypotension - mild"
        ],
        "plan": [
            "Continue Lisinopril 20mg daily",
            "Continue Metoprolol 50mg BID",
            "Continue Warfarin 5mg daily, INR monitoring q4 weeks",
            "Increase fluid intake, rise slowly from sitting/lying",
            "Follow-up in 3 months",
            "Consider home BP monitor"
        ],
        "medications": [
            {"name": "Lisinopril", "dose": "20mg", "frequency": "Once daily", "purpose": "Blood pressure control"},
            {"name": "Metoprolol", "dose": "50mg", "frequency": "Twice daily", "purpose": "Heart rate/rhythm control"},
            {"name": "Warfarin", "dose": "5mg", "frequency": "Once daily", "purpose": "Blood thinner for AFib"},
            {"name": "Atorvastatin", "dose": "40mg", "frequency": "Once daily at bedtime", "purpose": "Cholesterol management"}
        ]
    },
    {
        "specialty": "Endocrinology",
        "visit_date": "2025-10-20",
        "provider": "Dr. Michael Rodriguez, MD",
        "chief_complaint": "Type 2 Diabetes management and thyroid follow-up",
        "subjective": "58-year-old female with T2DM x 8 years and hypothyroidism. Reports improved glucose control with recent diet changes. Checking blood sugars 2x daily, fasting values 110-130. Denies polyuria, polydipsia, or vision changes. Energy level improved since thyroid dose adjustment last visit.",
        "objective": {
            "vitals": {
                "BP": "138/84 mmHg",
                "HR": "72 bpm",
                "Weight": "172 lbs",
                "BMI": "29.8"
            },
            "physical_exam": "Thyroid: No palpable nodules or enlargement. Feet: Intact sensation to monofilament, good pulses, no ulcerations.",
            "labs": {
                "HbA1c": "7.2% (previous 8.1%)",
                "Fasting glucose": "118 mg/dL",
                "TSH": "2.1 mIU/L (normal)",
                "Creatinine": "0.9 mg/dL",
                "eGFR": ">60 mL/min"
            }
        },
        "assessment": [
            "Type 2 Diabetes Mellitus - improved control, HbA1c trending down",
            "Hypothyroidism - well controlled on current levothyroxine dose",
            "Obesity - BMI 29.8, patient motivated for weight loss"
        ],
        "plan": [
            "Continue Metformin 1000mg BID",
            "Continue Levothyroxine 100mcg daily",
            "Add Jardiance 10mg daily for additional glucose control and cardiovascular benefit",
            "Referral to nutritionist for diabetes education",
            "Repeat HbA1c in 3 months",
            "Annual dilated eye exam scheduled",
            "Pneumococcal vaccine administered today"
        ],
        "medications": [
            {"name": "Metformin", "dose": "1000mg", "frequency": "Twice daily with meals", "purpose": "Diabetes control"},
            {"name": "Levothyroxine", "dose": "100mcg", "frequency": "Once daily on empty stomach", "purpose": "Thyroid hormone replacement"},
            {"name": "Jardiance (Empagliflozin)", "dose": "10mg", "frequency": "Once daily", "purpose": "Diabetes and heart protection"},
            {"name": "Aspirin", "dose": "81mg", "frequency": "Once daily", "purpose": "Cardiovascular protection"}
        ]
    },
    {
        "specialty": "Orthopedics",
        "visit_date": "2025-10-22",
        "provider": "Dr. Jennifer Park, MD",
        "chief_complaint": "Right knee pain and osteoarthritis",
        "subjective": "67-year-old active male with progressive right knee pain x 2 years, worse with stairs and prolonged standing. Pain rated 6/10 at worst. Morning stiffness lasting 15-20 minutes. Has tried OTC NSAIDs with moderate relief. No swelling, locking, or giving way. Enjoys golf but symptoms limiting activity.",
        "objective": {
            "vitals": {
                "BP": "142/88 mmHg",
                "Weight": "195 lbs"
            },
            "physical_exam": "Right knee: Mild effusion, crepitus with range of motion. ROM 0-120 degrees. Tender along medial joint line. Negative McMurray's. Stable ligaments. Able to bear full weight.",
            "imaging": "X-ray right knee: Moderate medial joint space narrowing, osteophyte formation, no acute fracture"
        },
        "assessment": [
            "Osteoarthritis right knee, moderate - Kellgren-Lawrence Grade 3",
            "Hypertension - elevated reading today"
        ],
        "plan": [
            "Trial of intra-articular hyaluronic acid injections (3 injection series)",
            "Physical therapy referral - focus on quadriceps strengthening",
            "Weight loss goal of 10-15 lbs to reduce joint stress",
            "Continue acetaminophen as needed, avoid chronic NSAID use",
            "Consider viscosupplementation if PT ineffective",
            "Discuss total knee replacement if conservative management fails",
            "Re-evaluate in 6 weeks"
        ],
        "medications": [
            {"name": "Acetaminophen", "dose": "650mg", "frequency": "Up to 3 times daily as needed", "purpose": "Pain relief"},
            {"name": "Glucosamine/Chondroitin", "dose": "1500mg/1200mg", "frequency": "Once daily", "purpose": "Joint health supplement"},
            {"name": "Lisinopril", "dose": "10mg", "frequency": "Once daily", "purpose": "Blood pressure"}
        ]
    },
    {
        "specialty": "Primary Care",
        "visit_date": "2025-10-25",
        "provider": "Dr. Amanda Foster, MD",
        "chief_complaint": "Annual physical examination",
        "subjective": "45-year-old female for annual wellness visit. No acute concerns. Feels generally well. Exercises 3-4x per week (walking, yoga). Non-smoker, occasional alcohol use. Family history significant for maternal breast cancer at age 62. Last mammogram 13 months ago (normal). Menstrual cycles regular.",
        "objective": {
            "vitals": {
                "BP": "118/76 mmHg",
                "HR": "68 bpm",
                "Weight": "148 lbs",
                "Height": "5'5\"",
                "BMI": "24.6"
            },
            "physical_exam": "General: Well-appearing. HEENT: Normal. Heart: RRR, no murmurs. Lungs: Clear. Abdomen: Soft, non-tender. Skin: No concerning lesions.",
            "labs": {
                "Total cholesterol": "198 mg/dL",
                "LDL": "115 mg/dL",
                "HDL": "62 mg/dL",
                "Triglycerides": "105 mg/dL",
                "Glucose": "94 mg/dL",
                "TSH": "1.8 mIU/L",
                "Vitamin D": "28 ng/mL (low normal)"
            }
        },
        "assessment": [
            "Health maintenance - annual exam",
            "Vitamin D insufficiency",
            "Family history of breast cancer - average risk screening appropriate"
        ],
        "plan": [
            "All preventive screenings up to date",
            "Mammogram scheduled for next month",
            "Start Vitamin D3 2000 IU daily",
            "Continue current healthy lifestyle",
            "Tdap booster administered today",
            "Colonoscopy due at age 45 - referral placed",
            "Return in 1 year for annual exam"
        ],
        "medications": [
            {"name": "Vitamin D3", "dose": "2000 IU", "frequency": "Once daily", "purpose": "Vitamin D supplementation"},
            {"name": "Multivitamin", "dose": "1 tablet", "frequency": "Once daily", "purpose": "General wellness"}
        ]
    },
    {
        "specialty": "Gastroenterology",
        "visit_date": "2025-10-28",
        "provider": "Dr. Robert Kim, MD",
        "chief_complaint": "Gastroesophageal reflux disease and IBS",
        "subjective": "52-year-old male with longstanding GERD and irritable bowel syndrome. Reports heartburn 3-4x per week despite PPI therapy. Symptoms worse with coffee, spicy foods, late meals. Also notes alternating constipation and diarrhea. No alarm symptoms (weight loss, bleeding, dysphagia). Stress at work exacerbates GI symptoms.",
        "objective": {
            "vitals": {
                "BP": "128/80 mmHg",
                "Weight": "178 lbs",
                "BMI": "26.1"
            },
            "physical_exam": "Abdomen: Soft, mild epigastric tenderness, normal bowel sounds, no masses or organomegaly.",
            "recent_studies": "EGD 18 months ago: Mild esophagitis, small hiatal hernia, negative for Barrett's esophagus. H. pylori negative."
        },
        "assessment": [
            "Gastroesophageal reflux disease - suboptimal control on current therapy",
            "Irritable bowel syndrome, mixed type",
            "Small hiatal hernia"
        ],
        "plan": [
            "Increase Omeprazole to 40mg twice daily (before breakfast and dinner)",
            "Trial of alginate therapy (Gaviscon) after meals and bedtime",
            "Dietary modifications: avoid trigger foods, smaller more frequent meals, no eating 3 hours before bed",
            "Consider low FODMAP diet trial for IBS symptoms",
            "Stress management techniques, consider mindfulness or therapy",
            "Repeat EGD in 6 months if symptoms persist to reassess",
            "Follow-up in 6 weeks"
        ],
        "medications": [
            {"name": "Omeprazole", "dose": "40mg", "frequency": "Twice daily before meals", "purpose": "Reduce stomach acid"},
            {"name": "Gaviscon", "dose": "2 tablets", "frequency": "After meals and bedtime", "purpose": "Acid barrier protection"},
            {"name": "Dicyclomine", "dose": "20mg", "frequency": "As needed for cramping", "purpose": "IBS symptom relief"},
            {"name": "Fiber supplement", "dose": "1 tablespoon", "frequency": "Once daily", "purpose": "Regulate bowel movements"}
        ]
    }
]


# AI-generated insights based on the patient data
AI_INSIGHTS = {
    "health_trends": [
        {
            "trend": "Blood Pressure Trending Up",
            "description": "Your blood pressure readings have been creeping higher over the past 3 months. Current average is 132/82, up from 122/76.",
            "severity": "moderate",
            "recommendation": "Monitor at home daily and discuss medication adjustment with your cardiologist."
        },
        {
            "trend": "Diabetes Control Improving",
            "description": "Excellent progress! Your HbA1c has dropped from 8.1% to 7.2% over 3 months. This means much better blood sugar control.",
            "severity": "positive",
            "recommendation": "Keep up the great work with diet changes. Continue monitoring blood sugars twice daily."
        },
        {
            "trend": "Vitamin D Still Low",
            "description": "Despite supplementation, your Vitamin D level is at the low end of normal (28 ng/mL). Optimal is above 30.",
            "severity": "mild",
            "recommendation": "Consider increasing Vitamin D3 to 4000 IU daily and get 15 minutes of midday sun exposure when possible."
        }
    ],
    "health_guidance": [
        "**Heart Health Priority**: With AFib and rising BP, focus on reducing sodium to under 2000mg daily and increase potassium-rich foods (bananas, spinach, avocados).",
        "**Medication Timing Matters**: Take Levothyroxine 30-60 minutes before breakfast on an empty stomach for best absorption. Don't take with coffee.",
        "**Joint Protection**: Before knee replacement becomes necessary, losing 10-15 lbs could significantly reduce pain and slow arthritis progression.",
        "**GERD Management**: Elevate head of bed 6-8 inches and try eating dinner by 6 PM - this alone can reduce nighttime reflux by 50%.",
        "**Bleeding Risk Awareness**: You're on Warfarin - avoid NSAIDs (ibuprofen, naproxen) as they can increase bleeding risk. Acetaminophen is safer for pain."
    ],
    "doctor_questions": [
        "My BP is still high despite medications - should we increase the Lisinopril dose or add another medication?",
        "I'm taking 11 different medications - are there any that could be combined or eliminated?",
        "The Warfarin requires frequent blood tests - is there a newer blood thinner that would be easier to manage?",
        "Could my GERD medications (Omeprazole) be interfering with my other drugs? I've heard PPIs can affect absorption.",
        "What are the warning signs of a stroke or heart attack I should watch for given my AFib and hypertension?",
        "Is it safe to take Glucosamine with Warfarin? I've read conflicting information online."
    ]
}


# Health Timeline Events - chronological medical history
TIMELINE_EVENTS = [
    {
        "date": "2025-10-20",
        "event_type": "Office Visit",
        "icon": "🏥",
        "color": "primary",
        "title": "Endocrinology Follow-Up",
        "provider": "Dr. Michael Rodriguez",
        "location": "Endocrine Clinic",
        "description": "Diabetes and thyroid checkup. Great news - your blood sugar control improved! A1C dropped from 8.1% to 7.2%.",
        "details": [
            "Started new diabetes medication (Jardiance) for better blood sugar control and heart protection",
            "Thyroid levels are perfect - current medication dose is working well",
            "Lost 6 pounds since last visit - keep up the good work!",
            "Scheduled eye exam to check for diabetes-related changes"
        ]
    },
    {
        "date": "2025-10-15",
        "event_type": "Office Visit",
        "icon": "❤️",
        "color": "danger",
        "title": "Cardiology Follow-Up",
        "provider": "Dr. Sarah Chen",
        "location": "Heart Center",
        "description": "Heart rhythm and blood pressure check. Everything is well-controlled on your current medications.",
        "details": [
            "Heart rate is steady at 76 beats per minute",
            "Blood thinner level is perfect (INR 2.3)",
            "Blood pressure slightly high at 132/82 - increasing medication dose",
            "No heart racing or palpitations reported"
        ]
    },
    {
        "date": "2025-09-28",
        "event_type": "Lab Results",
        "icon": "🔬",
        "color": "info",
        "title": "Quarterly Blood Work",
        "provider": "Quest Diagnostics",
        "location": "Lab",
        "description": "Routine monitoring labs for diabetes, kidney function, and cholesterol.",
        "details": [
            "A1C: 7.2% (down from 8.1% - great improvement!)",
            "Kidney function: Normal (eGFR >60)",
            "Cholesterol: LDL 95 mg/dL (goal met with statin)",
            "Liver enzymes: Normal",
            "Thyroid (TSH): 2.1 - perfect range"
        ]
    },
    {
        "date": "2025-09-15",
        "event_type": "Procedure",
        "icon": "💉",
        "color": "warning",
        "title": "Knee Injection - Session 1 of 3",
        "provider": "Dr. James Martinez",
        "location": "Orthopedic Surgery Center",
        "description": "First gel injection into right knee for arthritis pain relief.",
        "details": [
            "Hyaluronic acid injection to cushion knee joint",
            "Procedure well-tolerated with minimal discomfort",
            "May feel some temporary soreness for 24-48 hours",
            "Next injection scheduled in 1 week",
            "Should see improvement after completing all 3 sessions"
        ]
    },
    {
        "date": "2025-08-30",
        "event_type": "Office Visit",
        "icon": "🦴",
        "color": "secondary",
        "title": "Orthopedic Consultation",
        "provider": "Dr. James Martinez",
        "location": "Orthopedic Clinic",
        "description": "First visit for right knee pain. X-rays taken and treatment plan discussed.",
        "details": [
            "X-rays show moderate arthritis in right knee",
            "Knee is stable with good range of motion (0-120 degrees)",
            "Pain rated 6 out of 10, worse on stairs",
            "Starting with gel injections (3 sessions)",
            "Physical therapy referral for strengthening exercises",
            "Discussed weight loss goal of 10-15 pounds to reduce knee stress"
        ]
    },
    {
        "date": "2025-07-22",
        "event_type": "Medication Change",
        "icon": "💊",
        "color": "success",
        "title": "Blood Pressure Medication Increased",
        "provider": "Dr. Sarah Chen",
        "location": "Phone Consultation",
        "description": "Lisinopril dose increased from 10mg to 20mg due to higher home blood pressure readings.",
        "details": [
            "Home BP readings averaging 135/85 (above goal of 130/80)",
            "Doubled Lisinopril dose to better control blood pressure",
            "Monitor BP at home for 2 weeks and report back",
            "Watch for dry cough or dizziness as possible side effects",
            "May add water pill (diuretic) if BP still high in 2 weeks"
        ]
    },
    {
        "date": "2025-06-10",
        "event_type": "Lab Results",
        "icon": "🔬",
        "color": "info",
        "title": "INR Blood Test",
        "provider": "Anticoagulation Clinic",
        "location": "Lab",
        "description": "Monthly blood thinner monitoring - level is in perfect range.",
        "details": [
            "INR: 2.3 (target range 2.0-3.0)",
            "Warfarin dose remains at 5mg daily",
            "No dose adjustment needed",
            "Continue current diet and avoid major changes to vitamin K intake",
            "Next INR check in 4 weeks"
        ]
    },
    {
        "date": "2025-05-18",
        "event_type": "Emergency Visit",
        "icon": "🚨",
        "color": "danger",
        "title": "ER Visit - Acid Reflux Flare",
        "provider": "Dr. Amanda Lee",
        "location": "County Hospital ER",
        "description": "Went to ER with severe chest burning. Heart was checked and ruled out - it was acid reflux.",
        "details": [
            "Severe heartburn mistaken for possible heart attack",
            "EKG and cardiac enzymes normal - heart is fine",
            "Diagnosed with severe acid reflux (GERD) flare-up",
            "Given antacid medication in ER with good relief",
            "Prescribed Omeprazole 20mg twice daily",
            "Advised to avoid spicy foods, caffeine, late meals",
            "Follow up with primary care doctor in 1 week"
        ]
    },
    {
        "date": "2025-04-12",
        "event_type": "Office Visit",
        "icon": "🏥",
        "color": "primary",
        "title": "Annual Physical Exam",
        "provider": "Dr. Robert Thompson",
        "location": "Primary Care Clinic",
        "description": "Yearly checkup - reviewed all your conditions and updated preventive care.",
        "details": [
            "Blood pressure: 128/78 (good control)",
            "Weight: 178 lbs (down 3 lbs from last year)",
            "All chronic conditions stable and well-managed",
            "Flu shot given",
            "Colonoscopy due next year (last one 8 years ago)",
            "Continue all current medications",
            "Keep up the great work with diet and exercise!"
        ]
    },
    {
        "date": "2025-03-15",
        "event_type": "New Diagnosis",
        "icon": "📋",
        "color": "warning",
        "title": "Irregular Heartbeat Diagnosed",
        "provider": "Dr. Sarah Chen",
        "location": "Heart Center",
        "description": "Episodes of heart racing led to diagnosis of atrial fibrillation (irregular heartbeat).",
        "details": [
            "24-hour heart monitor showed periods of irregular rhythm",
            "Diagnosed with paroxysmal atrial fibrillation (comes and goes)",
            "Started Metoprolol to control heart rate",
            "Started Warfarin blood thinner to prevent stroke risk",
            "Will need regular INR monitoring",
            "Discussed lifestyle changes: limit caffeine and alcohol",
            "Risk is manageable with proper treatment"
        ]
    },
    {
        "date": "2025-02-20",
        "event_type": "Office Visit",
        "icon": "🏥",
        "color": "primary",
        "title": "Primary Care - Heart Palpitations",
        "provider": "Dr. Robert Thompson",
        "location": "Primary Care Clinic",
        "description": "Reported episodes of heart racing and fluttering. Referred to cardiologist for evaluation.",
        "details": [
            "Episodes of rapid heartbeat lasting 10-30 minutes",
            "Sometimes feel lightheaded during episodes",
            "EKG in office showed normal rhythm at that moment",
            "Referred to cardiology for further testing",
            "Ordered 24-hour heart monitor",
            "Advised to avoid caffeine and energy drinks"
        ]
    },
    {
        "date": "2024-11-08",
        "event_type": "Lab Results",
        "icon": "🔬",
        "color": "info",
        "title": "Diabetes Monitoring Labs",
        "provider": "LabCorp",
        "location": "Lab",
        "description": "Quarterly diabetes checkup showed A1C of 8.1% - above goal, leading to diet changes.",
        "details": [
            "A1C: 8.1% (goal is below 7.0%)",
            "Fasting blood sugar: 142 mg/dL (higher than target)",
            "Kidney function: Normal",
            "Cholesterol: Borderline high",
            "Doctor recommended stricter diet and increased exercise",
            "Discussed possibly adding second diabetes medication"
        ]
    },
    {
        "date": "2024-08-05",
        "event_type": "Medication Change",
        "icon": "💊",
        "color": "success",
        "title": "Thyroid Medication Dose Adjusted",
        "provider": "Dr. Michael Rodriguez",
        "location": "Phone Consultation",
        "description": "Increased Levothyroxine from 75mcg to 100mcg due to low thyroid levels.",
        "details": [
            "TSH level was 6.8 (higher than normal range)",
            "Symptoms: Fatigue, feeling cold, slight weight gain",
            "Increased thyroid medication dose",
            "Recheck TSH in 6 weeks after dose change",
            "Should notice improved energy in 3-4 weeks"
        ]
    },
    {
        "date": "2024-06-15",
        "event_type": "Office Visit",
        "icon": "🏥",
        "color": "primary",
        "title": "GI Specialist - Ongoing Heartburn",
        "provider": "Dr. Patricia Williams",
        "location": "Gastroenterology Associates",
        "description": "First visit to GI doctor for chronic heartburn. Upper endoscopy scheduled.",
        "details": [
            "Heartburn 3-4 times per week despite over-the-counter antacids",
            "Worse with coffee, spicy foods, and eating late at night",
            "No trouble swallowing or weight loss",
            "Diagnosed with GERD (chronic acid reflux)",
            "Started prescription Omeprazole 20mg daily",
            "Scheduled for upper endoscopy in 2 weeks",
            "Lifestyle changes discussed: raise bed, avoid trigger foods"
        ]
    },
    {
        "date": "2023-11-15",
        "event_type": "New Diagnosis",
        "icon": "📋",
        "color": "warning",
        "title": "Type 2 Diabetes Diagnosed",
        "provider": "Dr. Robert Thompson",
        "location": "Primary Care Clinic",
        "description": "Routine blood work showed high blood sugar. Diagnosed with Type 2 Diabetes.",
        "details": [
            "Fasting blood sugar: 186 mg/dL (normal is under 100)",
            "A1C: 8.9% (diabetes is 6.5% or higher)",
            "No symptoms noticed - found on routine screening",
            "Started Metformin 500mg twice daily",
            "Referred to diabetes educator",
            "Given blood sugar monitor and supplies",
            "Discussed diet changes and importance of exercise",
            "This is manageable with medication and lifestyle changes"
        ]
    },
    {
        "date": "2023-06-20",
        "event_type": "New Diagnosis",
        "icon": "📋",
        "color": "warning",
        "title": "Underactive Thyroid Diagnosed",
        "provider": "Dr. Michael Rodriguez",
        "location": "Endocrine Clinic",
        "description": "Fatigue and weight gain led to diagnosis of hypothyroidism (underactive thyroid).",
        "details": [
            "Symptoms: Constant fatigue, weight gain, feeling cold",
            "TSH: 12.4 (very high - normal is 0.5-5.0)",
            "Diagnosed with primary hypothyroidism",
            "Started Levothyroxine 75mcg every morning",
            "Take on empty stomach, 30-60 minutes before eating",
            "Should feel better in 4-6 weeks",
            "Recheck thyroid levels in 6 weeks",
            "This is a lifelong condition but very treatable"
        ]
    },
    {
        "date": "2018-06-10",
        "event_type": "New Diagnosis",
        "icon": "📋",
        "color": "warning",
        "title": "High Blood Pressure Diagnosed",
        "provider": "Dr. Robert Thompson",
        "location": "Primary Care Clinic",
        "description": "Blood pressure consistently high at multiple visits. Started on medication.",
        "details": [
            "Blood pressure: 148/94 (confirmed high on 3 separate visits)",
            "Diagnosed with essential hypertension",
            "Started Lisinopril 10mg daily",
            "Recommended home blood pressure monitoring",
            "Discussed reducing salt intake",
            "Encouraged regular exercise and weight loss",
            "Follow up in 4 weeks to check if medication is working"
        ]
    }
]


# Active medical problems with SOAP summaries
ACTIVE_PROBLEMS = [
    {
        "problem": "Irregular Heartbeat (Atrial Fibrillation)",
        "icd10": "I48.0",
        "onset": "March 2023",
        "status": "Stable",
        "simple_summary": {
            "what_you_said": "No heart racing or palpitations lately. Feeling good on current medications. Taking blood thinner as prescribed.",
            "what_tests_showed": "Heart rate is steady at 76 beats per minute. Blood thinness level is perfect (2.3). Heart rhythm test looks normal.",
            "what_it_means": "Your irregular heartbeat is well-managed with medication. The blood thinner is working to prevent stroke risk.",
            "what_were_doing": "Keep taking Metoprolol (controls heart rate) and Warfarin (prevents blood clots). Get monthly blood tests to check clotting levels."
        }
    },
    {
        "problem": "High Blood Pressure",
        "icd10": "I10",
        "onset": "June 2018",
        "status": "Needs Adjustment",
        "simple_summary": {
            "what_you_said": "Blood pressure at home usually 128-135 over 80. Taking medications regularly. Sometimes get headaches in the morning.",
            "what_tests_showed": "Blood pressure in office was 132/82 (a bit high). Should be under 130/80 given your other conditions.",
            "what_it_means": "Your blood pressure is slightly above goal. We may need to increase your medication or add another one.",
            "what_were_doing": "Increasing Lisinopril dose. Track blood pressure at home for 2 weeks. May add water pill if needed. Try reducing salt in diet."
        }
    },
    {
        "problem": "Type 2 Diabetes",
        "icd10": "E11.9",
        "onset": "November 2017",
        "status": "Improving",
        "simple_summary": {
            "what_you_said": "Blood sugar control is better since changing diet. Morning readings 110-130. Checking twice daily. Lost 6 pounds!",
            "what_tests_showed": "Your 3-month blood sugar average dropped from 8.1% to 7.2% - great improvement! Feet look healthy, no nerve damage.",
            "what_it_means": "The diet changes and Metformin are working well. New medication will help protect your heart and kidneys too.",
            "what_were_doing": "Continue Metformin. Starting Jardiance (helps heart and sugar). Goal is to get below 7%. Eye exam scheduled. Keep up the great work!"
        }
    },
    {
        "problem": "Knee Arthritis (Right)",
        "icd10": "M17.11",
        "onset": "April 2022",
        "status": "Getting Worse",
        "simple_summary": {
            "what_you_said": "Right knee hurts at 6 out of 10, especially on stairs. Stiff for 15-20 minutes in morning. Can't play golf as much.",
            "what_tests_showed": "X-ray shows moderate wear-and-tear in knee joint. Good range of motion (0-120 degrees). Knee is stable.",
            "what_it_means": "Moderate arthritis in your knee. Let's try some treatments before considering surgery.",
            "what_were_doing": "Gel injections in knee (3 sessions). Physical therapy to strengthen leg muscles. Try to lose 10-15 lbs. Take Tylenol for pain. May discuss knee replacement in 6 months if no improvement."
        }
    },
    {
        "problem": "Acid Reflux (GERD)",
        "icd10": "K21.9",
        "onset": "July 2019",
        "status": "Needs Better Control",
        "simple_summary": {
            "what_you_said": "Heartburn 3-4 times a week even with medication. Worse after coffee, spicy food, or late dinner. No trouble swallowing.",
            "what_tests_showed": "Mild stomach irritation on last scope. Small hiatal hernia (stomach pushes through diaphragm). No serious damage.",
            "what_it_means": "Acid reflux isn't fully controlled yet. Lifestyle changes plus more medication should help.",
            "what_were_doing": "Doubling Omeprazole dose (take twice daily). Add Gaviscon after meals. Stop eating 3 hours before bed. Raise head of bed 6 inches. Repeat scope if not better in 6 months."
        }
    },
    {
        "problem": "Underactive Thyroid",
        "icd10": "E03.9",
        "onset": "February 2020",
        "status": "Well Controlled",
        "simple_summary": {
            "what_you_said": "Energy is good. No feeling cold, weight gain, or hair loss. Taking thyroid pill every morning on empty stomach.",
            "what_tests_showed": "Thyroid hormone level is 2.1 (perfect range is 0.5-5.0). No lumps in thyroid gland. Weight is stable.",
            "what_it_means": "Your thyroid medication dose is just right. Everything looks good.",
            "what_were_doing": "Keep taking Levothyroxine 100mcg every morning. Recheck levels in 6 months. Remember to take 30-60 minutes before breakfast."
        }
    }
]


# Medication interaction warnings and side effects
MEDICATION_INTERACTIONS = {
    "Warfarin": {
        "interactions": [
            {
                "with": "Acetaminophen",
                "severity": "Moderate",
                "description": "High doses of acetaminophen (>2g/day for several days) may increase bleeding risk. Monitor INR if using regularly."
            },
            {
                "with": "Omeprazole",
                "severity": "Minor",
                "description": "May slightly increase Warfarin levels. Monitor INR after starting or stopping PPIs."
            },
            {
                "with": "Atorvastatin",
                "severity": "Moderate",
                "description": "May enhance anticoagulant effect. Close INR monitoring recommended, especially when starting therapy."
            }
        ],
        "side_effects": [
            "Easy bruising or unusual bleeding (gums, nose, urine)",
            "Blood in stool or black, tarry stools",
            "Severe headache or dizziness",
            "Avoid green leafy vegetables in large amounts (Vitamin K)",
            "Report any falls or head injuries immediately"
        ]
    },
    "Metformin": {
        "interactions": [
            {
                "with": "Lisinopril",
                "severity": "Minor",
                "description": "ACE inhibitors may enhance glucose-lowering effect. Monitor blood sugar closely."
            }
        ],
        "side_effects": [
            "Nausea or diarrhea (usually temporary, take with food)",
            "Vitamin B12 deficiency with long-term use (check levels yearly)",
            "Lactic acidosis (rare but serious - avoid if kidney problems worsen)",
            "Metallic taste in mouth",
            "Stop 48 hours before any procedure with IV contrast dye"
        ]
    },
    "Lisinopril": {
        "interactions": [
            {
                "with": "Jardiance",
                "severity": "Moderate",
                "description": "Both can lower blood pressure. Monitor for dizziness or lightheadedness when standing."
            }
        ],
        "side_effects": [
            "Dry, persistent cough (affects 10-15% of people)",
            "Dizziness when standing up (orthostatic hypotension)",
            "High potassium levels (avoid potassium supplements and salt substitutes)",
            "Swelling of face, lips, or tongue (angioedema - rare but serious)",
            "Monitor kidney function and potassium levels regularly"
        ]
    },
    "Omeprazole": {
        "interactions": [
            {
                "with": "Metformin",
                "severity": "Minor",
                "description": "PPIs may affect Metformin absorption slightly."
            },
            {
                "with": "Warfarin",
                "severity": "Minor",
                "description": "May slightly increase Warfarin effect. Monitor INR."
            }
        ],
        "side_effects": [
            "Headache or nausea (usually mild)",
            "Increased risk of bone fractures with long-term use (>1 year)",
            "May reduce absorption of Vitamin B12, calcium, and magnesium",
            "Slightly increased risk of C. difficile infection",
            "Consider taking calcium and magnesium supplements",
            "Use lowest effective dose for shortest duration needed"
        ]
    },
    "Atorvastatin": {
        "interactions": [
            {
                "with": "Warfarin",
                "severity": "Moderate",
                "description": "May increase bleeding risk. Monitor INR closely."
            }
        ],
        "side_effects": [
            "Muscle pain or weakness (report immediately - could indicate rhabdomyolysis)",
            "Liver enzyme elevation (get liver tests at baseline and as needed)",
            "Take at bedtime as cholesterol is made at night",
            "Avoid grapefruit juice (increases statin levels significantly)",
            "Report severe muscle pain, dark urine, or unusual fatigue"
        ]
    },
    "Metoprolol": {
        "interactions": [
            {
                "with": "Lisinopril",
                "severity": "Moderate",
                "description": "Both lower blood pressure and heart rate. Monitor for excessive lowering."
            }
        ],
        "side_effects": [
            "Fatigue or tiredness (often improves over time)",
            "Cold hands and feet (reduced circulation)",
            "Dizziness or lightheadedness",
            "Don't stop suddenly - must taper off to avoid rebound hypertension",
            "May mask symptoms of low blood sugar if diabetic"
        ]
    }
}
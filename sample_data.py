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


# Active medical problems with SOAP summaries
ACTIVE_PROBLEMS = [
    {
        "problem": "Atrial Fibrillation (Paroxysmal)",
        "icd10": "I48.0",
        "onset": "2023-03-15",
        "status": "Stable",
        "soap_summary": {
            "subjective": "Patient reports no palpitations or episodes since last visit. Feels well on current medications. Compliant with Warfarin and INR monitoring.",
            "objective": "Heart rate 76 bpm, regular rhythm. INR 2.3 (therapeutic). No signs of heart failure. EKG shows normal sinus rhythm.",
            "assessment": "Paroxysmal AFib well-controlled on rate control and anticoagulation. CHA2DS2-VASc score of 3 indicates moderate-high stroke risk, appropriately anticoagulated.",
            "plan": "Continue Metoprolol for rate control, Warfarin for stroke prevention. Monthly INR checks. Consider ablation if episodes increase."
        }
    },
    {
        "problem": "Hypertension",
        "icd10": "I10",
        "onset": "2018-06-20",
        "status": "Suboptimal Control",
        "soap_summary": {
            "subjective": "Home BP readings averaging 128-135 systolic. Reports good medication compliance. Occasional morning headaches.",
            "objective": "Office BP 132/82 (elevated). Target is <130/80 for patient with diabetes and AFib. Taking Lisinopril 20mg and Metoprolol 50mg BID.",
            "assessment": "Hypertension not at goal despite dual therapy. May need dose adjustment or third agent. White coat effect possible.",
            "plan": "Increase Lisinopril to 30mg daily. Home BP log for 2 weeks. Consider adding HCTZ 12.5mg if still above target. Dietary counseling on DASH diet."
        }
    },
    {
        "problem": "Type 2 Diabetes Mellitus",
        "icd10": "E11.9",
        "onset": "2017-11-10",
        "status": "Improved",
        "soap_summary": {
            "subjective": "Patient reports better glucose control with diet changes. Fasting sugars 110-130. Checking BG twice daily. Lost 6 lbs this quarter.",
            "objective": "HbA1c improved from 8.1% to 7.2%. Fasting glucose 118 mg/dL. No signs of neuropathy on foot exam. eGFR stable >60.",
            "assessment": "Type 2 DM showing good response to Metformin and lifestyle changes. Jardiance newly added for cardio-renal protection and additional glucose lowering.",
            "plan": "Continue Metformin 1000mg BID. Start Jardiance 10mg daily. Target HbA1c <7%. Annual eye exam due. Diabetes education referral placed."
        }
    },
    {
        "problem": "Osteoarthritis - Right Knee",
        "icd10": "M17.11",
        "onset": "2022-04-01",
        "status": "Progressive",
        "soap_summary": {
            "subjective": "Right knee pain 6/10, worse with stairs and prolonged standing. Morning stiffness 15-20 minutes. Limiting golf and walking.",
            "objective": "Moderate joint space narrowing on X-ray. Crepitus and mild effusion. ROM 0-120 degrees. Stable ligaments. Kellgren-Lawrence Grade 3.",
            "assessment": "Moderate osteoarthritis right knee. Conservative management trial appropriate before considering surgical options.",
            "plan": "Hyaluronic acid injection series. PT for quad strengthening. Weight loss goal 10-15 lbs. Acetaminophen for pain. Consider TKR if no improvement in 6 months."
        }
    },
    {
        "problem": "Gastroesophageal Reflux Disease",
        "icd10": "K21.9",
        "onset": "2019-07-15",
        "status": "Suboptimal Control",
        "soap_summary": {
            "subjective": "Heartburn 3-4x weekly despite Omeprazole 40mg daily. Worse with coffee, spicy foods, late meals. No dysphagia or weight loss.",
            "objective": "Mild epigastric tenderness. Prior EGD showed mild esophagitis and small hiatal hernia. No Barrett's esophagus. H. pylori negative.",
            "assessment": "GERD inadequately controlled on standard PPI dose. Likely lifestyle factors contributing. Hiatal hernia present.",
            "plan": "Increase Omeprazole to 40mg BID. Add Gaviscon. Dietary modifications and elevate head of bed. Repeat EGD in 6 months if not improved."
        }
    },
    {
        "problem": "Hypothyroidism",
        "icd10": "E03.9",
        "onset": "2020-02-12",
        "status": "Well Controlled",
        "soap_summary": {
            "subjective": "Energy level good since dose adjustment. No cold intolerance, weight changes, or hair loss. Taking medication consistently on empty stomach.",
            "objective": "TSH 2.1 mIU/L (normal range 0.5-5.0). No thyroid enlargement or nodules on exam. Weight stable.",
            "assessment": "Hypothyroidism well-controlled on Levothyroxine 100mcg daily. TSH in optimal range.",
            "plan": "Continue current dose. Recheck TSH in 6 months. Ensure taking 30-60 minutes before food for proper absorption."
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
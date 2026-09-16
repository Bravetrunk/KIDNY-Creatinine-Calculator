# KIDNY: Creatinine Calculator

A modern, fast, and responsive clinical web application for calculating renal function and providing kidney-specific drug dose adjustments based on established international and local clinical practice guidelines.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![PWA Ready](https://img.shields.io/badge/PWA-Ready-success?style=flat-square)
![Offline First](https://img.shields.io/badge/Offline-First-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)

---

## 🌟 Overview

**KIDNY** is engineered for healthcare professionals—physicians, clinical pharmacists, nephrologists, residents, nurses, and medical students. It streamlines bedside and outpatient clinical evaluations by calculating **Creatinine Clearance (CrCl)** and **estimated Glomerular Filtration Rate (eGFR)** in real time, instantly mapping results to renal dosing guidelines, frequency adjustments, and contraindications.

Designed with a modern Bento-grid interface, liquid glassmorphism visuals, zero external runtime build dependencies, and full Progressive Web App (PWA) offline support.

---

## ✨ Key Features

### 1. 🧮 Dual Renal Function Calculation
- **Cockcroft-Gault (CrCl)**: Calculates creatinine clearance in mL/min, with automatic gender adjustment (0.85 for female patients).
- **CKD-EPI 2021 (eGFR)**: Computes filtration rate in mL/min/1.73m² without race coefficient, paired with automatic Chronic Kidney Disease (CKD) staging (Stage 1 to Stage 5).
- **Real-Time Calculation**: Automatically evaluates parameters on every keystroke (`input` event listeners).
- **Input Validation**: Gracefully highlights missing or invalid fields and warns on non-physiological values (e.g. weight < 20 kg or > 300 kg, SCr < 0.1 mg/dL) without impeding workflow.

### 2. 📋 Clinical One-Click Copy Feature
Copying results directly into hospital Electronic Medical Records (EMR / EHR) or progress notes is quick and formatted:

#### Concise Renal Function Summary
Clicking **Copy Result** on the Renal Function card generates the standardized 3-line format:
```text
• CrCl : 60.8 mL/min
• eGFR : 67.1 mL/min/1.73m²
• CKD Stage: Stage 2 (Mild)
```

#### Detailed Medication Recommendation
Clicking copy on any drug card, sidebar check, or drug detail modal generates a full clinical note:
```text
[KIDNY: Creatinine Calculator — Renal Dose Recommendation]
Drug: Metformin (Antidiabetic)
Patient: 65 yo Male | Weight: 70 kg | SCr: 1.2 mg/dL
Renal Function: eGFR 67.1 mL/min/1.73m² (CKD-EPI)
Recommended Dose: Standard dose (Max 2,000 mg/day)
Clinical Note: Monitor eGFR annually.
Reference: ADA Guidelines
```

- **Interactive Feedback**: Visual transition (`Copied! ✓`), emerald badge highlight, and auto-dismissing toast notifications.
- **Cross-Browser Clipboard**: Uses modern `navigator.clipboard` with an automatic `document.execCommand('copy')` textarea fallback for legacy or non-secure contexts.

### 3. 💊 Adaptive Fit-to-Screen Dashboard & Clinical Safety
- **Adaptive Fit-to-Screen Layout**:
  - **Desktop / Workstation**: The entire workspace is engineered to fit within the viewport height (`h-screen overflow-hidden`) with zero outer scrollbar. Left and right columns operate with independent fluid scrolling (`overflow-y-auto custom-scrollbar`), keeping calculations and search controls continuously visible.
  - **Mobile / Tablet**: Gracefully adapts to natural fluid document flow with touch-friendly spacing and responsive card padding.
  - **Adaptive Grid**: Drug cards dynamically arrange into 1, 2, 3, or 4 columns across mobile, laptop, desktop, and ultra-wide displays.
- **Scrollable Category Chips Bar**:
  - Compact horizontal chip bar with smooth touch scrolling and high-contrast active pills, preserving maximum vertical screen space.
- **Consolidated Search**:
  - Unified top search bar with instant clear button (`✕`) for rapid medication lookup.
- **Status Badges & Visual Categorization**:
  - 🛑 **Contraindicated**: Highlighted with red danger styling when kidney function falls below safe thresholds.
  - ⚠️ **Dose Adjustment Required**: Amber warnings for dose reductions or extended dosing intervals.
  - ✅ **Normal Dosing (No Adjustment Needed)**: Green badges when kidney clearance permits standard regimens.
- **Clinical Safety & AKI Caution**:
  - **NSAIDs AKI Alert**: Prominent amber badge on all NSAID cards and modal: `⚠️ ระวังความเสี่ยงไตวายเฉียบพลัน (AKI) หลีกเลี่ยงการใช้ต่อเนื่อง`.
  - **Explicit Parameter Criteria**: Every drug card indicates whether dose adjustment is governed by CrCl or eGFR along with the patient's evaluated value (e.g. `เกณฑ์: CrCl (Cockcroft-Gault) = 60.8 mL/min` or `เกณฑ์: eGFR (CKD-EPI) = 67.1 mL/min/1.73m²`).
  - **Standardized 3-Line Dose Formatting**: Every medication card displays uniform clinical parameters:
    1. **ขนาดยาที่แนะนำ (Recommended Dose)**
    2. **ความถี่ (Frequency)**
    3. **ขนาดยาสูงสุดต่อวัน (Max Daily Dose)**

### 4. 📖 Tiered Rule Details Modal
- Full access to all tiered clearance cut-offs for any drug.
- In-depth clinical instructions (e.g. hemodialysis dosing, post-dialysis supplemental doses, hydration requirements).
- Prominent NSAID caution warning banner for nephrotoxic analgesic agents.
- Authoritative references (Thai Rheumatism Association, Sanford Guide, KDIGO, US FDA Prescribing Information).

### 5. 📱 Progressive Web App (PWA) & Offline Mode
- **Zero-Internet Operation**: Medical teams in shielded hospital wards or basements retain full functionality.
- **Service Worker (`sw.js`)**:
  - **Network-First Strategy** for HTML navigations (`index.html`, `index2.html`) ensuring immediate live updates when online while falling back seamlessly to offline cache.
  - **Stale-While-Revalidate Strategy** for styling, vector icons, and font dependencies.
  - Dynamic cache migration (`kidny-cache-v4`) with automatic purging of obsolete caches.
- **Installable Native App Feel**:
  - Add to Home Screen / Dock across macOS, iOS (Safari Share menu), Android (Chrome install banner), and Windows (Edge).
  - Standalone display mode with custom theme colors (`#6366f1`).
  - High-resolution vector and raster kidney icons (SVG, 192x192, 512x512 maskable, apple-touch-icon, and favicon).

---

## 📐 Formulas & Clinical Equations

### Cockcroft-Gault Equation (CrCl)

$$\text{CrCl (mL/min)} = \frac{(140 - \text{Age}) \times \text{Weight (kg)}}{72 \times \text{SCr (mg/dL)}} \times (0.85 \text{ if Female})$$

*Used primarily for medication dosing adjustments as specified by most FDA drug package inserts.*

### CKD-EPI Equation 2021 (eGFR)

Calculated without race coefficient per the 2021 CKD-EPI recommendations:

$$\text{eGFR} = 142 \times \min\left(\frac{\text{SCr}}{\kappa}, 1\right)^\alpha \times \max\left(\frac{\text{SCr}}{\kappa}, 1\right)^{-1.200} \times 0.9938^{\text{Age}} \times [1.012 \text{ if Female}]$$

Where:
- $\kappa = 0.7$ (Females) or $0.9$ (Males)
- $\alpha = -0.241$ (Females) or $-0.302$ (Males)
- $\min(\text{SCr}/\kappa, 1)$ is the minimum of $\text{SCr}/\kappa$ or $1.0$
- $\max(\text{SCr}/\kappa, 1)$ is the maximum of $\text{SCr}/\kappa$ or $1.0$

### KDIGO CKD Staging Reference

| Stage | eGFR (mL/min/1.73m²) | Description | Status Color |
|:---:|:---:|:---|:---:|
| **Stage 1** | $\ge 90$ | Normal or high kidney function | Green (`#16a34a`) |
| **Stage 2** | $60 - 89$ | Mildly decreased | Light Green (`#22c55e`) |
| **Stage 3a** | $45 - 59$ | Mild to moderately decreased | Yellow (`#ca8a04`) |
| **Stage 3b** | $30 - 44$ | Moderately to severely decreased | Orange (`#f97316`) |
| **Stage 4** | $15 - 29$ | Severely decreased | Red (`#ef4444`) |
| **Stage 5** | $< 15$ | Kidney failure (ESRD) | Dark Red (`#dc2626`) |

---

## 📂 Project Structure

```
KIDNY/
├── index.html              # Primary Bento-grid application with full drug DB & liquid animations
├── index2.html             # Clean reference / secondary layout
├── manifest.json           # PWA Web App Manifest (standalone display, theme color, icons)
├── sw.js                   # Service Worker (Network-First for navigation, offline caching v4)
├── favicon.ico             # Browser tab icon
├── icons/                  # Custom medical kidney icon assets
│   ├── kidney.svg          # Primary vector kidney icon
│   ├── kidney-mark.svg     # Simplified monochrome/gradient kidney symbol
│   ├── icon-192.png        # Standard mobile icon (192x192)
│   ├── icon-512.png        # High-res PWA icon (512x512)
│   ├── icon-maskable-512.png # Adaptive maskable icon for Android (512x512)
│   ├── apple-touch-icon.png  # Apple iOS home screen touch icon (180x180)
│   └── favicon-32x32.png   # Crisp browser tab icon (32x32)
├── README.md               # Complete project documentation
└── .vscode/
    └── launch.json         # Chrome debugging configuration
```

---

## 🚀 Running the Project

KIDNY runs directly in any modern browser without requiring node build tools or compilation.

### Option 1: Local HTTP Server (Recommended for PWA)
Run Python's built-in server:
```bash
python3 -m http.server 8080
```
Or using Node:
```bash
npx serve .
```
Then visit:
👉 **[http://localhost:8080](http://localhost:8080)**

### Option 2: Direct File Launch
Double-click `index.html` to open it in your browser. *(Note: Service Workers require an HTTP/HTTPS origin or localhost to activate offline caching).*

### Troubleshooting Browser Cache
If developing locally and an older cached version is served by your browser:
- **Mac**: Press `Cmd + Shift + R`
- **Windows / Linux**: Press `Ctrl + F5`

---

## ⚠️ Medical Disclaimer

This tool is designed strictly as a clinical decision support and educational aid for healthcare professionals. It does not replace individualized clinical judgment, laboratory evaluation, or official prescribing monographs. Clinicians must verify all dosage adjustments against patient-specific factors, institutional formularies, and official prescribing information prior to ordering or administering therapy.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

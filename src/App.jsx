import React, { useEffect, useState } from "react";
// SPA App.jsx – Octobre Rose v3+ avec design moderne + Optimisation tablette
// npm i @mui/material @mui/icons-material @emotion/react @emotion/styled @supabase/supabase-js react-hook-form jspdf

import {
  Box, Button, Card, CardContent, CardHeader, Container, CssBaseline,
  Divider, FormControl, FormControlLabel, Grid, IconButton, InputLabel,
  LinearProgress, MenuItem, Select, Snackbar, Stack, TextField, Toolbar,
  Typography, Alert, Chip, Avatar, AppBar, Checkbox, Dialog, DialogTitle,
  DialogContent, DialogActions,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";

import { createClient } from "@supabase/supabase-js";
import { useForm, Controller } from "react-hook-form";
import { jsPDF } from "jspdf";

/* =================== THEME "OCTOBRE ROSE" MODERNE OPTIMISÉ TABLETTE =================== */
const themeRose = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#F8BBD9", light: "#FFF0F5", dark: "#F06292", contrastText: "#fff" },
    secondary: { main: "#F8BBD9" },
    background: { default: "#FFF8F8", paper: "#FFFFFF" },
    divider: "#E8E8E8",
    text: { primary: "#2C2C2C", secondary: "#666666" },
  },
  shape: { borderRadius: 16 },
  typography: { 
    fontFamily: ['"Inter"', '"Roboto"', '"Helvetica Neue"', "sans-serif"].join(", "),
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.95rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 600, fontSize: "1rem" },
    h4: { fontWeight: 700, color: "#2C2C2C", fontSize: "1.5rem" },
    h5: { fontWeight: 600, color: "#2C2C2C", fontSize: "1.25rem" },
    h6: { fontWeight: 600, color: "#2C2C2C", fontSize: "1.1rem" },
  },
  components: {
    MuiAppBar: { 
      styleOverrides: { 
        colorPrimary: { 
          backgroundColor: "#F8BBD9",
          boxShadow: "0 4px 20px rgba(248, 187, 217, 0.15)",
        } 
      } 
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
          padding: "0 16px",
        }
      }
    },
    MuiInputLabel: { 
      styleOverrides: { 
        root: { 
          color: "#2C2C2C", 
          fontWeight: 600,
          fontSize: "1rem",
          "&.Mui-focused": { 
            color: "#F06292",
            fontWeight: 700,
          },
        } 
      } 
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            minHeight: "52px",
            fontSize: "1rem",
            backgroundColor: "#FFFFFF",
            "& fieldset": {
              borderWidth: "2px",
              borderColor: "#E0E0E0",
            },
            "&:hover fieldset": {
              borderColor: "#F8BBD9",
              borderWidth: "2px",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#F06292",
              borderWidth: "2px",
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          "& .MuiOutlinedInput-input": {
            padding: "14px 12px",
            fontSize: "1rem",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": { 
            borderColor: "#F8BBD9",
            borderWidth: "2px",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { 
            borderColor: "#F06292", 
            borderWidth: "2px",
          },
        },
        notchedOutline: {
          borderWidth: "2px",
          borderColor: "#E0E0E0",
        },
      },
    },
    MuiCheckbox: { 
      styleOverrides: { 
        root: { 
          color: "#F8BBD9",
          "&.Mui-checked": { 
            color: "#F06292",
          },
        } 
      } 
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "12px 24px",
          fontWeight: 600,
          textTransform: "none",
          fontSize: "1rem",
          minHeight: "48px",
          minWidth: "48px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
          },
        },
        contained: {
          background: "linear-gradient(135deg, #F8BBD9 0%, #F06292 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #F06292 0%, #E91E63 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(233, 30, 99, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 30px rgba(233, 30, 99, 0.15)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiCardHeader: { 
      styleOverrides: { 
        root: { 
          background: "linear-gradient(135deg, #FFF0F5 0%, #F8BBD9 100%)", 
          borderRadius: "16px 16px 0 0",
          padding: "16px",
        }, 
        title: { 
          color: "#C2185B", 
          fontWeight: 700,
          fontSize: "1.1rem",
        } 
      } 
    },
    MuiChip: { 
      styleOverrides: { 
        filledPrimary: { 
          backgroundColor: "#F8BBD9", 
          color: "#C2185B", 
          fontWeight: 600,
          borderRadius: 20,
          fontSize: "0.95rem",
        } 
      } 
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        }
      }
    }
  },
});

/* =================== Supabase =================== */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/* =================== Constantes =================== */
const STATUTS = {
  CREE: "cree",
  EN_COURS: "en_cours",
  VALIDE: "valide",
  SEIN_EN_COURS: "depistage_sein_en_cours",
  SEIN_TERMINE: "depistage_sein_termine",
  VUE_EN_COURS: "depistage_vue_en_cours",
  VUE_TERMINE: "depistage_vue_termine",
};

const ROLES = {
  AGENT: "agent_accueil",
  INFIRMIER: "infirmier",
  SAGE_FEMME: "sage_femme",
  MEDECIN: "medecin",
  ADMIN: "administrateur",
};

/* =================== Utils =================== */
const round2 = (n) => Math.round(n * 100) / 100;
const computeIMC = (tailleCm, poidsKg) => {
  if (!tailleCm || !poidsKg) return "";
  const m = Number(tailleCm) / 100;
  if (m <= 0) return "";
  return round2(Number(poidsKg) / (m * m));
};

const toTitle = (s) =>
  (s || "")
    .replace(/_/g, " ")
    .split(" ")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");

/* =================== Auth =================== */
async function authenticate(email, password) {
  const { data, error } = await supabase
    .from("users")
    .select("id, email, role, nom, prenom, telephone, actif, password_hash")
    .eq("email", email)
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Utilisateur introuvable");
  if (data.actif === false) throw new Error("Compte désactivé");
  if (data.password_hash !== password) throw new Error("Mot de passe incorrect");
  return data;
}

/* =================== AI FUNCTIONS =================== */
function buildBreastConclusion(values) {
  const issues = [];
  const recommendations = [];
  const isAnormal = (v) => String(v || "").toLowerCase() === "anormal";
  
  if (isAnormal(values.inspection_aspect)) {
    issues.push("asymétrie ou aspect général anormal");
    recommendations.push("Évaluation approfondie");
  }
  
  if (isAnormal(values.sein_gauche_etat)) {
    issues.push("sein gauche anormal");
    recommendations.push("Imagerie mammaire");
  } else if (values.sg_nodule_nombre > 0) {
    const mobility = values.sg_mobile ? "mobile" : "NON MOBILE (urgent)";
    const loc = values.sg_localisation && values.sg_localisation !== "–" ? ` ${values.sg_localisation}` : "";
    issues.push(`sein gauche: ${values.sg_nodule_nombre} nodule(s) ${mobility}${loc}`);
    recommendations.push("Échographie mammaire");
    if (!values.sg_mobile) recommendations.push("Suivi urgent");
  }
  
  if (values.sg_ecoulement) {
    const asp = values.sg_ecoulement_aspect && values.sg_ecoulement_aspect !== "–" ? ` (${values.sg_ecoulement_aspect})` : "";
    const col = values.sg_ecoulement_couleur && values.sg_ecoulement_couleur !== "–" ? ` couleur ${values.sg_ecoulement_couleur}` : "";
    issues.push(`écoulement sein gauche${asp}${col}`);
    recommendations.push("Examen cytologique");
  }
  
  if (isAnormal(values.sein_droit_etat)) {
    issues.push("sein droit anormal");
    recommendations.push("Imagerie mammaire");
  } else if (values.sd_nodule_nombre > 0) {
    const mobility = values.sd_mobile ? "mobile" : "NON MOBILE (urgent)";
    const loc = values.sd_localisation && values.sd_localisation !== "–" ? ` ${values.sd_localisation}` : "";
    issues.push(`sein droit: ${values.sd_nodule_nombre} nodule(s) ${mobility}${loc}`);
    recommendations.push("Échographie mammaire");
    if (!values.sd_mobile) recommendations.push("Suivi urgent");
  }
  
  if (values.sd_ecoulement) {
    const asp = values.sd_ecoulement_aspect && values.sd_ecoulement_aspect !== "–" ? ` (${values.sd_ecoulement_aspect})` : "";
    const col = values.sd_ecoulement_couleur && values.sd_ecoulement_couleur !== "–" ? ` couleur ${values.sd_ecoulement_couleur}` : "";
    issues.push(`écoulement sein droit${asp}${col}`);
    recommendations.push("Examen cytologique");
  }

  const hasAbnormalities = issues.length > 0;
  let conclusion = "";
  
  if (hasAbnormalities) {
    conclusion = `DÉPISTAGE: POSITIF\n\nAnomalies détectées:\n• ${issues.join("\n• ")}\n\nRecommandations:\n• ${recommendations.join("\n• ")}\n• Avis spécialisé recommandé`;
  } else {
    conclusion = `DÉPISTAGE: NÉGATIF\n\nExamen clinique mammaire sans particularités.\n\nRecommandations:\n• Auto-examen régulier\n• Suivi annuel\n• Mammographie selon l'âge`;
  }
  
  return conclusion;
}

function buildIVAConclusion(values) {
  const ivaRes = String(values.iva_resultat || "Normal").toLowerCase();
  const hasLesions = values.col_lesions_polypes || values.col_lesions_autre;

  if (ivaRes === "anormal" || hasLesions) {
    let findings = [];
    if (values.col_coloration && values.col_coloration !== "") findings.push(`Coloration: ${values.col_coloration}`);
    if (values.col_lesions_polypes) findings.push("Polypes détectés");
    if (values.col_lesions_autre) findings.push("Autres lésions");
    
    return `IVA: POSITIF\n\nConstatations:\n• ${findings.join("\n• ")}\n\nRecommandations:\n• Colposcopie obligatoire\n• Biopsie possible\n• Suivi rapproché`;
  }
  
  return `IVA: NÉGATIF\n\nExamen normal, sans lésion.\n\nRecommandations:\n• Suivi habituel\n• Dépistage dans 3-5 ans`;
}

function buildVisionReport(values) {
  const lines = [];
  lines.push("EXAMEN OPHTALMOLOGIQUE:");
  
  if (values.refracto_od || values.refracto_og) {
    lines.push(`Réfraction OD: ${values.refracto_od || "–"}`);
    lines.push(`Réfraction OG: ${values.refracto_og || "–"}`);
  }
  
  if (values.prescription_od || values.prescription_og) {
    lines.push(`Correction OD: ${values.prescription_od || "–"}`);
    lines.push(`Correction OG: ${values.prescription_og || "–"}`);
    if (values.prescription_add) lines.push(`Addition presbyopie: ${values.prescription_add}`);
  }

  lines.push("");
  lines.push("DIAGNOSTIC: ");
  if (!values.prescription_od && !values.prescription_og) {
    lines.push("Vision satisfaisante, correction optique non nécessaire.");
  } else {
    lines.push("Correction optique recommandée selon les anomalies réfractives détectées.");
  }
  
  lines.push("");
  lines.push("RECOMMANDATIONS:");
  lines.push("• Consultation ophtalmologique si symptômes visuels");
  lines.push("• Port de correction adapté");
  lines.push("• Suivi régulier recommandé");

  return lines.join("\n");
}

/* =================== PDF UTILITIES =================== */
async function exportBreastPDF(patient, formData, { logoSrc = "/logo.png" } = {}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const m = 15;
  let y = m;

  const checkPage = (height = 10) => {
    if (y + height > h - 15) {
      doc.addPage();
      y = m;
    }
  };

  doc.setFillColor(248, 187, 217);
  doc.rect(0, 0, w, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("RAPPORT DE DÉPISTAGE", w / 2, 10, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Examen Clinique Mammaire – Octobre Rose", w / 2, 20, { align: "center" });
  y = 32;

  checkPage(18);
  doc.setFillColor(255, 245, 248);
  doc.rect(m, y, w - 2*m, 16, "F");
  doc.setDrawColor(248, 187, 217);
  doc.setLineWidth(0.7);
  doc.rect(m, y, w - 2*m, 16, "S");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(240, 98, 146);
  doc.text("IDENTITÉ DE LA PATIENTE", m + 3, y + 4);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(44, 44, 44);
  doc.text(`Nom: ${patient?.nom || "–"}`, m + 3, y + 9);
  doc.text(`Prénom: ${patient?.prenom || "–"}`, m + 65, y + 9);
  doc.text(`Âge: ${patient?.age || "–"} ans`, m + 3, y + 13);
  doc.text(`Taille: ${patient?.taille || "–"} cm | Poids: ${patient?.poids || "–"} kg | IMC: ${patient?.imc || "–"}`, m + 65, y + 13);
  
  y += 20;

  const addSection = (title) => {
    checkPage(6);
    doc.setFillColor(248, 187, 217);
    doc.rect(m, y - 1, w - 2*m, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(240, 98, 146);
    doc.text(title, m + 2, y + 2);
    y += 6;
  };

  const addDataRow = (label, value, label2 = null, value2 = null) => {
    checkPage(3.5);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(240, 98, 146);
    doc.text(label + ":", m + 2, y);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(44, 44, 44);
    doc.text(String(value || "–"), m + 50, y);
    
    if (label2) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(240, 98, 146);
      doc.text(label2 + ":", m + 105, y);
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(44, 44, 44);
      doc.text(String(value2 || "–"), m + 140, y);
    }
    y += 3.8;
  };

  addSection("CONTEXTE DU DÉPISTAGE");
  addDataRow("Dépistage volontaire", formData.depistage_volontaire ? "Oui" : "Non", "Année dernier", formData.annee_dernier_depistage || "–");
  addDataRow("Antécédents médicaux", (formData.antecedents_medicaux || []).join(", ") || "Aucun");
  y += 2;

  addSection("EXAMEN CLINIQUE MAMMAIRE");
  addDataRow("Inspection Aspect", formData.inspection_aspect || "–", "Symétrique", formData.inspection_symetrique ? "Oui" : "Non");
  addDataRow("Sein gauche", formData.sein_gauche_etat || "–", "Sein droit", formData.sein_droit_etat || "–");
  addDataRow("Nodules (G)", formData.sein_gauche_nombre_nodule || "0", "Nodules (D)", formData.sein_droit_nombre_nodule || "0");
  y += 2;

  if (formData.col_coloration || formData.iva_resultat) {
    addSection("EXAMEN DU COL – IVA");
    addDataRow("Coloration", formData.col_coloration || "–", "Résultat IVA", formData.iva_resultat || "–");
    y += 2;
  }

  checkPage(20);
  addSection("CONCLUSION – DÉPISTAGE SEIN");
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(44, 44, 44);
  const conclusionLines = doc.splitTextToSize(formData.conclusion_seins || "Données non disponibles", w - 2*m - 4);
  conclusionLines.forEach(line => {
    checkPage(3);
    doc.text(line, m + 2, y);
    y += 3.5;
  });
  y += 2;

  if (formData.iva_conclusion) {
    checkPage(20);
    addSection("CONCLUSION – IVA");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(44, 44, 44);
    const ivaLines = doc.splitTextToSize(formData.iva_conclusion, w - 2*m - 4);
    ivaLines.forEach(line => {
      checkPage(3);
      doc.text(line, m + 2, y);
      y += 3.5;
    });
  }

  const nbPages = doc.getNumberOfPages();
  for (let i = 1; i <= nbPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "normal");
    doc.text("Centre Diagnostic de Libreville – Octobre Rose", m, h - 5);
    doc.text(`Page ${i}/${nbPages}`, w - m - 15, h - 5);
  }

  doc.save(`rapport_sein_${patient?.nom || "patient"}_${patient?.prenom || ""}.pdf`);
}

async function exportVisionPDF(patient, formData, { logoSrc = "/logo.png" } = {}) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const m = 15;
  let y = m;

  const checkPage = (height = 10) => {
    if (y + height > h - 15) {
      doc.addPage();
      y = m;
    }
  };

  doc.setFillColor(248, 187, 217);
  doc.rect(0, 0, w, 28, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("RAPPORT DE DÉPISTAGE", w / 2, 10, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Examen Ophtalmologique – Contrôle de la Vision", w / 2, 20, { align: "center" });
  y = 32;

  checkPage(14);
  doc.setFillColor(255, 245, 248);
  doc.rect(m, y, w - 2*m, 12, "F");
  doc.setDrawColor(248, 187, 217);
  doc.setLineWidth(0.7);
  doc.rect(m, y, w - 2*m, 12, "S");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(240, 98, 146);
  doc.text("IDENTITÉ DE LA PATIENTE", m + 3, y + 4);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(44, 44, 44);
  doc.text(`Nom: ${patient?.nom || "–"} | Prénom: ${patient?.prenom || "–"} | Âge: ${patient?.age || "–"} ans | Téléphone: ${patient?.telephone || "–"}`, m + 3, y + 8);
  
  y += 16;

  const addSection = (title) => {
    checkPage(6);
    doc.setFillColor(248, 187, 217);
    doc.rect(m, y - 1, w - 2*m, 5, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(240, 98, 146);
    doc.text(title, m + 2, y + 2);
    y += 6;
  };

  checkPage(20);
  addSection("DIAGNOSTIC ET RECOMMANDATIONS");
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(44, 44, 44);
  const diagLines = doc.splitTextToSize(formData.rapport_vue || "Données non disponibles", w - 2*m - 4);
  diagLines.forEach(line => {
    checkPage(3);
    doc.text(line, m + 2, y);
    y += 3.5;
  });

  const nbPages = doc.getNumberOfPages();
  for (let i = 1; i <= nbPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    doc.setFont("helvetica", "normal");
    doc.text("Centre Diagnostic de Libreville – Octobre Rose", m, h - 5);
    doc.text(`Page ${i}/${nbPages}`, w - m - 15, h - 5);
  }

  doc.save(`rapport_vue_${patient?.nom || "patient"}_${patient?.prenom || ""}.pdf`);
}

/* =================== PATIENT SUMMARY CARD =================== */
function PatientSummaryCard({ patient }) {
  return (
    <Card sx={{ mb: 2, background: "linear-gradient(135deg, #FFF5F8 0%, #F3E5F5 100%)" }}>
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={1} sx={{ gridAutoRows: "auto" }}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="caption" sx={{ color: "#F06292", fontWeight: 600 }}>Nom</Typography>
            <Typography variant="body2">{patient.nom}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="caption" sx={{ color: "#F06292", fontWeight: 600 }}>Prénom</Typography>
            <Typography variant="body2">{patient.prenom}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="caption" sx={{ color: "#F06292", fontWeight: 600 }}>Âge/Taille/Poids</Typography>
            <Typography variant="body2">{patient.age} ans / {patient.taille} cm / {patient.poids} kg</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="caption" sx={{ color: "#F06292", fontWeight: 600 }}>IMC</Typography>
            <Typography variant="body2">{patient.imc}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="caption" sx={{ color: "#F06292", fontWeight: 600 }}>Tension</Typography>
            <Typography variant="body2">{patient.tension || "–"}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="caption" sx={{ color: "#F06292", fontWeight: 600 }}>SpO2</Typography>
            <Typography variant="body2">{patient.oxyometrie || "–"}%</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

/* =================== QUADRANT SELECTOR =================== */
function QuadrantSelector({ value = {}, onChange }) {
  const size = 140;
  const radius = 55;
  const toggle = (key) => onChange?.({ ...value, [key]: !value[key] });
  const place = { TL: [40, 40], TR: [80, 40], BL: [40, 80], BR: [80, 80] };

  return (
    <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{ flexWrap: "wrap" }}>
      {["left", "right"].map((side) => (
        <Box key={side} textAlign="center">
          <Typography variant="subtitle2" gutterBottom>
            Sein {side === "left" ? "gauche" : "droit"}
          </Typography>
          <svg width={size} height={size} viewBox="0 0 120 120" style={{ cursor: "pointer", border: "1px solid #ddd", borderRadius: 4 }}>
            <circle cx="60" cy="60" r={radius} fill="none" stroke="#F06292" strokeWidth="2" />
            <line x1="10" y1="60" x2="110" y2="60" stroke="#ccc" strokeWidth="1" />
            <line x1="60" y1="10" x2="60" y2="110" stroke="#ccc" strokeWidth="1" />
            {["TL", "TR", "BL", "BR"].map((quad) => (
              <rect key={quad} x={quad === "TL" || quad === "BL" ? 10 : 60} y={quad === "TL" || quad === "TR" ? 10 : 60} width="50" height="50" fill="transparent" onClick={() => toggle(`${side}_${quad}`)} />
            ))}
            {Object.entries(value)
              .filter(([k, v]) => k.startsWith(side) && v)
              .map(([k]) => {
                const pos = place[k.split("_")[1]];
                return (
                  <g key={k}>
                    <line x1={pos[0] - 6} y1={pos[1] - 6} x2={pos[0] + 6} y2={pos[1] + 6} stroke="#F06292" strokeWidth="2" />
                    <line x1={pos[0] - 6} y1={pos[1] + 6} x2={pos[0] + 6} y2={pos[1] - 6} stroke="#F06292" strokeWidth="2" />
                  </g>
                );
              })}
          </svg>
        </Box>
      ))}
    </Stack>
  );
}

/* =================== HISTORIQUE BY USER =================== */
function HistoriqueByUser({ title, table, userIdKey, userId, onOpen, pageSize = 8 }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = async () => {
    setLoading(true);
    try {
      let query = supabase.from(table).select("*", { count: "exact" }).eq(userIdKey, userId);
      
      if (q) query = query.ilike("nom", `%${q}%`);
      
      query = query.order("updated_at", { ascending: false });
      
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      
      const { data, count, error } = await query.range(from, to);
      
      if (error) throw error;
      setRows(data || []);
      setTotal(count || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [q, page, table, userId]);

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Card variant="outlined">
      <CardHeader title={title} />
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1} mb={2} alignItems={{ xs: "stretch", md: "center" }}>
          <TextField
            value={q}
            onChange={(e) => { setPage(1); setQ(e.target.value); }}
            placeholder="Recherche par nom"
            size="small"
            InputProps={{ endAdornment: <SearchIcon /> }}
            fullWidth
            sx={{ flex: { md: 1 } }}
          />
          <Box flex={1} sx={{ display: { xs: "none", md: "block" } }} />
          <Stack direction="row" spacing={1} sx={{ width: { xs: "100%", md: "auto" } }}>
            <Button size="small" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} fullWidth>Précédent</Button>
            <Typography variant="body2" sx={{ minWidth: 80, textAlign: "center", alignSelf: "center" }}>Page {page}/{pages}</Typography>
            <Button size="small" disabled={page >= pages} onClick={() => setPage((p) => p + 1)} fullWidth>Suivant</Button>
          </Stack>
        </Stack>

        {loading && <LinearProgress />}
        <Stack spacing={1}>
          {rows.map((r) => (
            <Card key={r.id} variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "#F8BBD9" }}>{(r.prenom?.[0] || "?").toUpperCase()}</Avatar>
                <Box flex={1} minWidth={0}>
                  <Typography variant="subtitle2" noWrap>{r.nom} {r.prenom}</Typography>
                  <Typography variant="caption">{r.telephone} • IMC: {r.imc || "–"}</Typography>
                </Box>
                {onOpen && <Button size="small" onClick={() => onOpen(r)} variant="contained" endIcon={<VisibilityIcon />}>Ouvrir</Button>}
              </Stack>
            </Card>
          ))}
          {!loading && rows.length === 0 && <Typography variant="body2">Aucun dossier.</Typography>}
        </Stack>
      </CardContent>
    </Card>
  );
}

/* =================== LIST PATIENTS =================== */
function ListPatients({ title, statutFilter, onOpen, pageSize = 8 }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const load = async () => {
    setLoading(true);
    let query = supabase.from("patients").select("*", { count: "exact" }).order("created_at", { ascending: false });
    if (q) query = query.ilike("nom", `%${q}%`);
    if (statutFilter) query = query.eq("statut", statutFilter);

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, count, error } = await query.range(from, to);
    if (!error) {
      setRows(data || []);
      setTotal(count || 0);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [q, statutFilter, page]);

  const pages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <Card variant="outlined">
      <CardHeader title={title} />
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={1} mb={2} alignItems={{ xs: "stretch", md: "center" }}>
          <TextField
            value={q}
            onChange={(e) => {
              setPage(1);
              setQ(e.target.value);
            }}
            placeholder="Recherche par nom"
            size="small"
            InputProps={{ endAdornment: <SearchIcon /> }}
            fullWidth
            sx={{ flex: { md: 1 } }}
          />
          <Box flex={1} sx={{ display: { xs: "none", md: "block" } }} />
          <Stack direction="row" spacing={1} sx={{ width: { xs: "100%", md: "auto" } }}>
            <Button size="small" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} fullWidth>Précédent</Button>
            <Typography variant="body2" sx={{ minWidth: 80, textAlign: "center", alignSelf: "center" }}>Page {page}/{pages}</Typography>
            <Button size="small" disabled={page >= pages} onClick={() => setPage((p) => p + 1)} fullWidth>Suivant</Button>
          </Stack>
        </Stack>

        {loading && <LinearProgress />}
        <Stack spacing={1}>
          {rows.map((r) => (
            <Card key={r.id} variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: "#F8BBD9" }}>{(r.prenom?.[0] || "?").toUpperCase()}</Avatar>
                <Box flex={1} minWidth={0}>
                  <Typography variant="subtitle2" noWrap>{r.nom} {r.prenom}</Typography>
                  <Typography variant="caption">{r.telephone} • IMC: {r.imc ?? "–"}</Typography>
                </Box>
                {onOpen && (
                  <Button size="small" onClick={() => onOpen(r)} variant="contained" endIcon={<VisibilityIcon />}>
                    Ouvrir
                  </Button>
                )}
              </Stack>
            </Card>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

/* =================== ÉTAPE 1 – Agent d'accueil =================== */
function FormNouveauPatient({ user, onSaved }) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const { control, handleSubmit } = useForm({
    defaultValues: { civilite: "Mme", statut_marital: "celibataire", nombre_enfants: 0, consentement: false },
  });

  const save = async (v) => {
    setSaving(true);
    try {
      const payload = { ...v, statut: STATUTS.CREE, created_by: user?.id };
      const { error } = await supabase.from("patients").insert(payload);
      if (error) throw new Error(error.message);
      setToast("Patient enregistré avec succès");
      setTimeout(() => onSaved?.(), 1500);
    } catch (e) {
      setToast(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader title="Étape 1 – Création Patient (Accueil)" />
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <form onSubmit={handleSubmit(save)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={2}>
              <Controller name="civilite" control={control} render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Civilité</InputLabel>
                  <Select label="Civilité" {...field}>
                    <MenuItem value="Mme">Mme</MenuItem>
                    <MenuItem value="Mlle">Mlle</MenuItem>
                  </Select>
                </FormControl>
              )} />
            </Grid>
            <Grid item xs={12} sm={8} md={5}>
              <Controller name="nom" control={control} render={({ field }) => <TextField label="Nom" fullWidth required {...field} />} />
            </Grid>
            <Grid item xs={12} sm={12} md={5}>
              <Controller name="prenom" control={control} render={({ field }) => <TextField label="Prénom" fullWidth required {...field} />} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller name="profession" control={control} render={({ field }) => <TextField label="Profession" fullWidth {...field} />} />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Controller name="age" control={control} render={({ field }) => <TextField label="Âge" type="number" fullWidth required {...field} />} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller name="telephone" control={control} render={({ field }) => <TextField label="Téléphone" fullWidth required {...field} />} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Controller name="whatsapp" control={control} render={({ field }) => <TextField label="WhatsApp" fullWidth {...field} />} />
            </Grid>
            <Grid item xs={12}>
              <Controller name="adresse" control={control} render={({ field }) => <TextField label="Adresse" fullWidth {...field} />} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Controller name="statut_marital" control={control} render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Statut marital</InputLabel>
                  <Select label="Statut marital" {...field}>
                    <MenuItem value="celibataire">Célibataire</MenuItem>
                    <MenuItem value="mariee">Mariée</MenuItem>
                    <MenuItem value="divorcee">Divorcée</MenuItem>
                    <MenuItem value="veuve">Veuve</MenuItem>
                  </Select>
                </FormControl>
              )} />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Controller name="nombre_enfants" control={control} render={({ field }) => <TextField label="Nombre d'enfants" type="number" fullWidth {...field} />} />
            </Grid>
            <Grid item xs={12}>
              <Controller name="consentement" control={control} render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                  label="Je consens à l'utilisation anonyme de mes données collectées pour des statistiques"
                />
              )} />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
            <Button variant="contained" type="submit" disabled={saving}>
              {saving ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </Stack>
        </form>
      </CardContent>
      {saving && <LinearProgress />}
      <Snackbar open={!!toast} autoHideDuration={4000} onClose={() => setToast("")}>
        <Alert severity={saving ? "info" : "success"}>{toast}</Alert>
      </Snackbar>
    </Card>
  );
}

/* =================== ÉTAPE 2 – Infirmier =================== */
function NurseScreeningForm({ patient, user, onDone }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const { control, handleSubmit, watch } = useForm({
    defaultValues: { 
      taille: patient?.taille || "", 
      poids: patient?.poids || "", 
      tension: "", 
      oxyometrie: "", 
    },
  });

  const taille = watch("taille");
  const poids = watch("poids");
  const imc = computeIMC(taille, poids);

  const save = async (v) => {
    setLoading(true);
    try {
      const imc_calc = computeIMC(v.taille, v.poids);
      await supabase
        .from("patients")
        .update({ 
          taille: v.taille ? Number(v.taille) : null,
          poids: v.poids ? Number(v.poids) : null,
          imc: imc_calc || null,
          tension: v.tension, 
          oxyometrie: v.oxyometrie ? Number(v.oxyometrie) : null, 
          statut: STATUTS.VALIDE 
        })
        .eq("id", patient.id);
      setToast("Données enregistrées, statut validé");
      setTimeout(() => onDone?.(), 1500);
    } catch (e) {
      setToast(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader title={`Étape 2 – Mesures Vitales: ${patient.nom} ${patient.prenom}`} />
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Grid container spacing={1} mb={3} sx={{ gridAutoRows: "auto" }}>
          <Grid item xs={12} sm={6} md={2}><TextField label="Nom" value={patient.nom} fullWidth InputProps={{ readOnly: true }} size="small" /></Grid>
          <Grid item xs={12} sm={6} md={2}><TextField label="Prénom" value={patient.prenom} fullWidth InputProps={{ readOnly: true }} size="small" /></Grid>
          <Grid item xs={12} sm={6} md={1}><TextField label="Âge" value={patient.age} fullWidth InputProps={{ readOnly: true }} size="small" /></Grid>
          <Grid item xs={12} sm={6} md={2}><TextField label="Profession" value={patient.profession || ""} fullWidth InputProps={{ readOnly: true }} size="small" /></Grid>
          <Grid item xs={12} sm={6} md={2}><TextField label="Téléphone" value={patient.telephone} fullWidth InputProps={{ readOnly: true }} size="small" /></Grid>
          <Grid item xs={12} sm={6} md={3}><TextField label="Consentement" value={patient.consentement ? "Oui" : "Non"} fullWidth InputProps={{ readOnly: true }} size="small" /></Grid>
        </Grid>

        <form onSubmit={handleSubmit(save)}>
          <Typography variant="subtitle2" mb={2}>Mesures Anthropométriques</Typography>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={12} sm={4} md={3}>
              <Controller name="taille" control={control} render={({ field }) => (
                <TextField label="Taille (cm)" type="number" fullWidth required {...field} />
              )} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <Controller name="poids" control={control} render={({ field }) => (
                <TextField label="Poids (kg)" type="number" fullWidth required {...field} />
              )} />
            </Grid>
            <Grid item xs={12} sm={4} md={3}>
              <TextField label="IMC (auto)" value={imc} fullWidth InputProps={{ readOnly: true }} />
            </Grid>
          </Grid>

          <Typography variant="subtitle2" mb={2}>Mesures Vitales</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controller name="tension" control={control} render={({ field }) => (
                <TextField label="Tension (ex: 120/80)" fullWidth required {...field} />
              )} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller name="oxyometrie" control={control} render={({ field }) => (
                <TextField label="SpO2 (%)" type="number" fullWidth required {...field} />
              )} />
            </Grid>
          </Grid>

          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer et valider"}
            </Button>
          </Stack>
        </form>
      </CardContent>
      {loading && <LinearProgress />}
      <Snackbar open={!!toast} autoHideDuration={4000} onClose={() => setToast("")}>
        <Alert severity={loading ? "info" : "success"}>{toast}</Alert>
      </Snackbar>
    </Card>
  );
}

/* =================== ÉTAPE 3 – Sage-femme =================== */
function BreastScreeningForm({ patient, user, onDone }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewText, setPreviewText] = useState("");
  const [quadrants, setQuadrants] = useState({});

  const { control, handleSubmit, watch, reset, getValues } = useForm({
    defaultValues: {
      antecedents_medicaux: [],
      depistage_volontaire: false,
      annee_dernier_depistage: "",
      inspection_symetrique: true,
      inspection_aspect: "Normal",
      inspection_nombre: 2,
      sein_gauche_etat: "Normal",
      sg_nodule_nombre: 0,
      sg_mobile: true,
      sg_localisation: "–",
      sg_ecoulement: false,
      sg_ecoulement_aspect: "–",
      sg_ecoulement_couleur: "–",
      sein_droit_etat: "Normal",
      sd_nodule_nombre: 0,
      sd_mobile: true,
      sd_localisation: "–",
      sd_ecoulement: false,
      sd_ecoulement_aspect: "–",
      sd_ecoulement_couleur: "–",
      col_coloration: "",
      col_lesions_polypes: false,
      col_lesions_autre: false,
      iva_resultat: "Normal",
      conclusion_seins: "",
      iva_conclusion: "",
      rdv_medecin_date: "",
      rdv_medecin_nom: "",
    },
  });

  useEffect(() => {
    const load = async () => {
      const { data: ds } = await supabase.from("depistage_sein").select("*").eq("patient_id", patient.id).maybeSingle();
      if (ds) {
        reset({
          antecedents_medicaux: ds.antecedents_medicaux || [],
          depistage_volontaire: !!ds.depistage_volontaire,
          annee_dernier_depistage: ds.annee_dernier_depistage || "",
          inspection_symetrique: !!ds.inspection_symetrique,
          inspection_aspect: ds.inspection_aspect || "Normal",
          inspection_nombre: ds.inspection_nombre || 2,
          sein_gauche_etat: ds.sein_gauche_etat || "Normal",
          sg_nodule_nombre: ds.sein_gauche_nombre_nodule ?? 0,
          sg_mobile: !!ds.sein_gauche_mobile,
          sg_localisation: ds.sein_gauche_localisation || "–",
          sg_ecoulement: !!ds.sein_gauche_ecoulement,
          sg_ecoulement_aspect: ds.sein_gauche_ecoulement_aspect || "–",
          sg_ecoulement_couleur: ds.sein_gauche_ecoulement_couleur || "–",
          sein_droit_etat: ds.sein_droit_etat || "Normal",
          sd_nodule_nombre: ds.sein_droit_nombre_nodule ?? 0,
          sd_mobile: !!ds.sein_droit_mobile,
          sd_localisation: ds.sein_droit_localisation || "–",
          sd_ecoulement: !!ds.sein_droit_ecoulement,
          sd_ecoulement_aspect: ds.sein_droit_ecoulement_aspect || "–",
          sd_ecoulement_couleur: ds.sein_droit_ecoulement_couleur || "–",
          col_coloration: ds.col_coloration || "",
          col_lesions_polypes: (ds.col_lesions || []).includes("polypes"),
          col_lesions_autre: (ds.col_lesions || []).includes("autre"),
          iva_resultat: ds.iva_resultat || "Normal",
          conclusion_seins: ds.conclusion_seins || "",
          iva_conclusion: ds.iva_conclusion || "",
          rdv_medecin_date: ds.rdv_medecin_date ? ds.rdv_medecin_date.substring(0, 10) : "",
          rdv_medecin_nom: ds.rdv_medecin_nom || "",
        });
      }
    };
    if (patient?.id) load();
  }, [patient?.id, reset]);

  const d = watch();
  useEffect(() => {
    const conc = buildBreastConclusion(d);
    const ivaConc = buildIVAConclusion(d);
    if (!d.conclusion_seins) {
      reset({ ...d, conclusion_seins: conc }, { keepDefaultValues: true });
    }
    if (!d.iva_conclusion) {
      reset({ ...d, iva_conclusion: ivaConc }, { keepDefaultValues: true });
    }
  }, [d.inspection_aspect, d.sein_gauche_etat, d.sg_nodule_nombre, d.sg_mobile, d.sein_droit_etat, d.sd_nodule_nombre, d.sd_mobile, d.col_coloration, d.col_lesions_polypes, d.col_lesions_autre, d.iva_resultat]);

  const onPreview = () => {
    const v = getValues();
    setPreviewText(v.conclusion_seins);
    setPreviewOpen(true);
  };

  const onValidate = async () => {
    setLoading(true);
    try {
      const v = getValues();
      const finalConclusion = previewText || v.conclusion_seins;
      
      const payload = {
        patient_id: patient.id,
        sage_femme_id: user.id,
        antecedents_medicaux: v.antecedents_medicaux,
        depistage_volontaire: !!v.depistage_volontaire,
        annee_dernier_depistage: v.annee_dernier_depistage ? Number(v.annee_dernier_depistage) : null,
        inspection_symetrique: !!v.inspection_symetrique,
        inspection_aspect: v.inspection_aspect,
        inspection_nombre: Number(v.inspection_nombre),
        sein_gauche_etat: v.sein_gauche_etat,
        sein_gauche_nombre_nodule: Number(v.sg_nodule_nombre) || 0,
        sein_gauche_mobile: !!v.sg_mobile,
        sein_gauche_localisation: v.sg_localisation,
        sein_gauche_ecoulement: !!v.sg_ecoulement,
        sein_gauche_ecoulement_aspect: v.sg_ecoulement_aspect,
        sein_gauche_ecoulement_couleur: v.sg_ecoulement_couleur,
        sein_droit_etat: v.sein_droit_etat,
        sein_droit_nombre_nodule: Number(v.sd_nodule_nombre) || 0,
        sein_droit_mobile: !!v.sd_mobile,
        sein_droit_localisation: v.sd_localisation,
        sein_droit_ecoulement: !!v.sd_ecoulement,
        sein_droit_ecoulement_aspect: v.sd_ecoulement_aspect,
        sein_droit_ecoulement_couleur: v.sd_ecoulement_couleur,
        col_coloration: v.col_coloration,
        col_lesions: [...(v.col_lesions_polypes ? ["polypes"] : []), ...(v.col_lesions_autre ? ["autre"] : [])],
        iva_resultat: v.iva_resultat,
        iva_conclusion: previewText ? previewText : v.iva_conclusion,
        conclusion_seins: finalConclusion,
        rdv_medecin_date: v.rdv_medecin_date || null,
        rdv_medecin_nom: v.rdv_medecin_nom || null,
      };

      const { error } = await supabase.from("depistage_sein").upsert(payload, { onConflict: "patient_id" });
      if (error) throw new Error(error.message);

      await supabase.from("patients").update({ statut: STATUTS.SEIN_TERMINE }).eq("id", patient.id);
      await exportBreastPDF(patient, payload);

      setPreviewOpen(false);
      setToast("Rapport généré et téléchargé");
      setTimeout(() => onDone?.(), 1500);
    } catch (e) {
      setToast(e.message);
    } finally {
      setLoading(false);
    }
  };

  const antecedentsOptions = [
    { value: "diabete", label: "Diabète" },
    { value: "hypertension", label: "Hypertension" },
    { value: "maladie_cardiaque", label: "Maladie cardiaque" },
    { value: "cancer", label: "Antécédent de cancer" },
    { value: "cancer_sein", label: "Cancer du sein" },
    { value: "autre", label: "Autre" },
  ];

  return (
    <Stack spacing={2}>
      <PatientSummaryCard patient={patient} />
      
      <Card>
        <CardHeader title={`Étape 3 – Dépistage Sein: ${patient.nom} ${patient.prenom}`} />
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <form onSubmit={handleSubmit(onPreview)}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Antécédents & Contexte</Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="body2" sx={{ mb: 1 }}>Antécédents médicaux:</Typography>
                {antecedentsOptions.map((opt) => (
                  <Controller key={opt.value} name="antecedents_medicaux" control={control} render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={(field.value || []).includes(opt.value)}
                          onChange={(e) => {
                            const arr = field.value || [];
                            if (e.target.checked) {
                              field.onChange([...arr, opt.value]);
                            } else {
                              field.onChange(arr.filter((v) => v !== opt.value));
                            }
                          }}
                        />
                      }
                      label={opt.label}
                    />
                  )} />
                ))}
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller name="depistage_volontaire" control={control} render={({ field }) => (
                  <FormControlLabel control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />} label="Dépistage volontaire" />
                )} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller name="annee_dernier_depistage" control={control} render={({ field }) => (
                  <TextField label="Année dernier dépistage" type="number" fullWidth {...field} />
                )} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Inspection générale</Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Controller name="inspection_aspect" control={control} render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Aspect</InputLabel>
                    <Select label="Aspect" {...field}>
                      <MenuItem value="Normal">Normal</MenuItem>
                      <MenuItem value="Anormal">Anormal</MenuItem>
                    </Select>
                  </FormControl>
                )} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller name="inspection_symetrique" control={control} render={({ field }) => (
                  <FormControlLabel control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />} label="Symétrique" />
                )} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller name="inspection_nombre" control={control} render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Nombre</InputLabel>
                    <Select label="Nombre" {...field}>
                      <MenuItem value={1}>1 sein</MenuItem>
                      <MenuItem value={2}>2 seins</MenuItem>
                    </Select>
                  </FormControl>
                )} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Localisation (cliquez sur les cadrants)</Typography>
            <QuadrantSelector value={quadrants} onChange={setQuadrants} />

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Sein Gauche</Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Controller name="sein_gauche_etat" control={control} render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>État</InputLabel>
                    <Select label="État" {...field}>
                      <MenuItem value="Normal">Normal</MenuItem>
                      <MenuItem value="Anormal">Anormal</MenuItem>
                    </Select>
                  </FormControl>
                )} />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Controller name="sg_nodule_nombre" control={control} render={({ field }) => (
                  <TextField label="Nodules" type="number" fullWidth {...field} />
                )} />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Controller name="sg_mobile" control={control} render={({ field }) => (
                  <FormControlLabel control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />} label="Mobile" />
                )} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller name="sg_localisation" control={control} render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Localisation</InputLabel>
                    <Select label="Localisation" {...field}>
                      <MenuItem value="–">–</MenuItem>
                      <MenuItem value="Q. supéro-interne">Q. supéro-interne</MenuItem>
                      <MenuItem value="Q. supéro-externe">Q. supéro-externe</MenuItem>
                      <MenuItem value="Q. inféro-interne">Q. inféro-interne</MenuItem>
                      <MenuItem value="Q. inféro-externe">Q. inféro-externe</MenuItem>
                    </Select>
                  </FormControl>
                )} />
              </Grid>
              <Grid item xs={12}>
                <Controller name="sg_ecoulement" control={control} render={({ field }) => (
                  <FormControlLabel control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />} label="Écoulement mamelonnaire" />
                )} />
              </Grid>
              {watch("sg_ecoulement") && (
                <>
                  <Grid item xs={12} md={6}>
                    <Controller name="sg_ecoulement_aspect" control={control} render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Aspect</InputLabel>
                        <Select label="Aspect" {...field}>
                          <MenuItem value="–">–</MenuItem>
                          <MenuItem value="fluide">Fluide</MenuItem>
                          <MenuItem value="crémeux">Crémeux</MenuItem>
                          <MenuItem value="purulent">Purulent</MenuItem>
                          <MenuItem value="sanglant">Sanglant</MenuItem>
                        </Select>
                      </FormControl>
                    )} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller name="sg_ecoulement_couleur" control={control} render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Couleur</InputLabel>
                        <Select label="Couleur" {...field}>
                          <MenuItem value="–">–</MenuItem>
                          <MenuItem value="clair">Clair</MenuItem>
                          <MenuItem value="blanchâtre">Blanchâtre</MenuItem>
                          <MenuItem value="jaunâtre">Jaunâtre</MenuItem>
                          <MenuItem value="verdâtre">Verdâtre</MenuItem>
                          <MenuItem value="sanglant">Sanglant</MenuItem>
                        </Select>
                      </FormControl>
                    )} />
                  </Grid>
                </>
              )}
            </Grid>

            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Sein Droit</Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Controller name="sein_droit_etat" control={control} render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>État</InputLabel>
                    <Select label="État" {...field}>
                      <MenuItem value="Normal">Normal</MenuItem>
                      <MenuItem value="Anormal">Anormal</MenuItem>
                    </Select>
                  </FormControl>
                )} />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Controller name="sd_nodule_nombre" control={control} render={({ field }) => (
                  <TextField label="Nodules" type="number" fullWidth {...field} />
                )} />
              </Grid>
              <Grid item xs={12} sm={6} md={2}>
                <Controller name="sd_mobile" control={control} render={({ field }) => (
                  <FormControlLabel control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />} label="Mobile" />
                )} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Controller name="sd_localisation" control={control} render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Localisation</InputLabel>
                    <Select label="Localisation" {...field}>
                      <MenuItem value="–">–</MenuItem>
                      <MenuItem value="Q. supéro-interne">Q. supéro-interne</MenuItem>
                      <MenuItem value="Q. supéro-externe">Q. supéro-externe</MenuItem>
                      <MenuItem value="Q. inféro-interne">Q. inféro-interne</MenuItem>
                      <MenuItem value="Q. inféro-externe">Q. inféro-externe</MenuItem>
                    </Select>
                  </FormControl>
                )} />
              </Grid>
              <Grid item xs={12}>
                <Controller name="sd_ecoulement" control={control} render={({ field }) => (
                  <FormControlLabel control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />} label="Écoulement mamelonnaire" />
                )} />
              </Grid>
              {watch("sd_ecoulement") && (
                <>
                  <Grid item xs={12} md={6}>
                    <Controller name="sd_ecoulement_aspect" control={control} render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Aspect</InputLabel>
                        <Select label="Aspect" {...field}>
                          <MenuItem value="–">–</MenuItem>
                          <MenuItem value="fluide">Fluide</MenuItem>
                          <MenuItem value="crémeux">Crémeux</MenuItem>
                          <MenuItem value="purulent">Purulent</MenuItem>
                          <MenuItem value="sanglant">Sanglant</MenuItem>
                        </Select>
                      </FormControl>
                    )} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Controller name="sd_ecoulement_couleur" control={control} render={({ field }) => (
                      <FormControl fullWidth>
                        <InputLabel>Couleur</InputLabel>
                        <Select label="Couleur" {...field}>
                          <MenuItem value="–">–</MenuItem>
                          <MenuItem value="clair">Clair</MenuItem>
                          <MenuItem value="blanchâtre">Blanchâtre</MenuItem>
                          <MenuItem value="jaunâtre">Jaunâtre</MenuItem>
                          <MenuItem value="verdâtre">Verdâtre</MenuItem>
                          <MenuItem value="sanglant">Sanglant</MenuItem>
                        </Select>
                      </FormControl>
                    )} />
                  </Grid>
                </>
              )}
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Examen du col – IVA</Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} md={6}>
                <Controller name="col_coloration" control={control} render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Coloration</InputLabel>
                    <Select label="Coloration" {...field}>
                      <MenuItem value="">Non évalué</MenuItem>
                      <MenuItem value="blanc_cremeux">Blanc crémeux</MenuItem>
                      <MenuItem value="violet">Violet</MenuItem>
                    </Select>
                  </FormControl>
                )} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller name="iva_resultat" control={control} render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Résultat IVA</InputLabel>
                    <Select label="Résultat IVA" {...field}>
                      <MenuItem value="Normal">Normal</MenuItem>
                      <MenuItem value="Anormal">Anormal</MenuItem>
                    </Select>
                  </FormControl>
                )} />
              </Grid>
              <Grid item xs={12}>
                <Controller name="col_lesions_polypes" control={control} render={({ field }) => (
                  <FormControlLabel control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />} label="Polypes/Fibromes" />
                )} />
                <Controller name="col_lesions_autre" control={control} render={({ field }) => (
                  <FormControlLabel control={<Checkbox checked={!!field.value} onChange={(e) => field.onChange(e.target.checked)} />} label="Autres lésions" />
                )} />
              </Grid>
            </Grid>

            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Conclusion Sein (IA - modifiable)</Typography>
            <Controller name="conclusion_seins" control={control} render={({ field }) => (
              <TextField multiline minRows={5} fullWidth {...field} sx={{ mb: 2 }} />
            )} />

            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>Conclusion IVA (IA - modifiable)</Typography>
            <Controller name="iva_conclusion" control={control} render={({ field }) => (
              <TextField multiline minRows={3} fullWidth {...field} sx={{ mb: 2 }} />
            )} />

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>Rendez-vous suivi</Typography>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} md={6}>
                <Controller name="rdv_medecin_date" control={control} render={({ field }) => (
                  <TextField label="Date RDV" type="date" InputLabelProps={{ shrink: true }} fullWidth {...field} />
                )} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Controller name="rdv_medecin_nom" control={control} render={({ field }) => (
                  <TextField label="Nom du médecin" fullWidth {...field} />
                )} />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" type="submit" startIcon={<DownloadIcon />}>
                Prévisualiser et générer
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Édition Conclusion – Sein</DialogTitle>
        <DialogContent dividers>
          <TextField value={previewText} onChange={(e) => setPreviewText(e.target.value)} fullWidth multiline minRows={10} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={onValidate} disabled={loading}>
            Enregistrer et télécharger
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!toast} autoHideDuration={4000} onClose={() => setToast("")}>
        <Alert severity="success">{toast}</Alert>
      </Snackbar>
    </Stack>
  );
}

/* =================== ÉTAPE 4 – Médecin =================== */
function VisionScreeningForm({ patient, user, onDone }) {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewText, setPreviewText] = useState("");

  const { control, handleSubmit, watch, reset, getValues } = useForm({
    defaultValues: { prescription_od: "", prescription_og: "", prescription_add: "", refracto_od: "", refracto_og: "", rapport_vue: "" },
  });

  useEffect(() => {
    const load = async () => {
      const { data: dv } = await supabase.from("depistage_vue").select("*").eq("patient_id", patient.id).maybeSingle();
      if (dv) {
        reset({
          prescription_od: dv.prescription_od ?? "",
          prescription_og: dv.prescription_og ?? "",
          prescription_add: dv.prescription_add ?? "",
          refracto_od: dv.refracto_od ?? "",
          refracto_og: dv.refracto_og ?? "",
          rapport_vue: dv.rapport_vue || "",
        });
      }
    };
    if (patient?.id) load();
  }, [patient?.id, reset]);

  const onPreview = () => {
    const v = getValues();
    const report = v.rapport_vue || buildVisionReport(v);
    setPreviewText(report);
    setPreviewOpen(true);
  };

  const onValidate = async () => {
    setLoading(true);
    try {
      const v = getValues();
      const finalReport = previewText || v.rapport_vue || buildVisionReport(v);

      const payload = {
        patient_id: patient.id,
        medecin_id: user.id,
        prescription_od: v.prescription_od ? Number(v.prescription_od) : null,
        prescription_og: v.prescription_og ? Number(v.prescription_og) : null,
        prescription_add: v.prescription_add || null,
        refracto_od: v.refracto_od ? Number(v.refracto_od) : null,
        refracto_og: v.refracto_og ? Number(v.refracto_og) : null,
        rapport_vue: finalReport,
      };

      const { error } = await supabase.from("depistage_vue").upsert(payload, { onConflict: "patient_id" });
      if (error) throw new Error(error.message);

      await supabase.from("patients").update({ statut: STATUTS.VUE_TERMINE }).eq("id", patient.id);
      await exportVisionPDF(patient, payload);

      setPreviewOpen(false);
      setToast("Rapport généré et téléchargé");
      setTimeout(() => onDone?.(), 1500);
    } catch (e) {
      setToast(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={2}>
      <Card>
        <CardHeader title={`Étape 4 – Dépistage Vision: ${patient?.nom} ${patient?.prenom}`} />
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <form onSubmit={handleSubmit(onPreview)}>
            <Typography variant="subtitle2">Prescription</Typography>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={4}>
                <Controller name="prescription_od" control={control} render={({ field }) => (
                  <TextField label="OD" type="number" fullWidth {...field} />
                )} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller name="prescription_og" control={control} render={({ field }) => (
                  <TextField label="OG" type="number" fullWidth {...field} />
                )} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller name="prescription_add" control={control} render={({ field }) => (
                  <TextField label="Addition" fullWidth {...field} />
                )} />
              </Grid>
            </Grid>

            <Typography variant="subtitle2">Réfraction</Typography>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={12} sm={6}>
                <Controller name="refracto_od" control={control} render={({ field }) => (
                  <TextField label="Réfraction OD" type="number" fullWidth {...field} />
                )} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller name="refracto_og" control={control} render={({ field }) => (
                  <TextField label="Réfraction OG" type="number" fullWidth {...field} />
                )} />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} mt={3}>
              <Button variant="contained" type="submit" startIcon={<DownloadIcon />}>
                Prévisualiser et générer
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>

      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Édition Rapport Vision</DialogTitle>
        <DialogContent dividers>
          <TextField value={previewText} onChange={(e) => setPreviewText(e.target.value)} fullWidth multiline minRows={12} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={onValidate} disabled={loading}>
            Enregistrer et télécharger
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!toast} autoHideDuration={4000} onClose={() => setToast("")}>
        <Alert severity="success">{toast}</Alert>
      </Snackbar>
      {loading && <LinearProgress />}
    </Stack>
  );
}

/* =================== DASHBOARDS =================== */
function DashboardAgent({ user }) {
  const [showNew, setShowNew] = useState(false);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card onClick={() => setShowNew(true)} sx={{ cursor: "pointer" }}>
          <CardHeader title="Créer un nouveau patient" avatar={<AddCircleIcon />} />
          <CardContent><Typography>Accueil - Étape 1</Typography></CardContent>
        </Card>
      </Grid>
      {showNew && (
        <Grid item xs={12}>
          <FormNouveauPatient user={user} onSaved={() => setShowNew(false)} />
        </Grid>
      )}
    </Grid>
  );
}

function DashboardNurse({ user }) {
  const [mode, setMode] = useState("");
  const [selected, setSelected] = useState(null);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card onClick={() => { setMode("salle"); setSelected(null); }} sx={{ cursor: "pointer" }}>
          <CardHeader title="Salle d'attente" />
          <CardContent><Typography>Patients en attente (Statut: Créé)</Typography></CardContent>
        </Card>
      </Grid>

      {mode === "salle" && !selected && (
        <Grid item xs={12}>
          <ListPatients
            title="Patients en attente – Étape 2"
            statutFilter={STATUTS.CREE}
            onOpen={async (p) => {
              await supabase.from("patients").update({ statut: STATUTS.EN_COURS }).eq("id", p.id);
              setSelected({ ...p, statut: STATUTS.EN_COURS });
              setMode("form");
            }}
          />
        </Grid>
      )}

      {mode === "form" && selected && (
        <Grid item xs={12}>
          <NurseScreeningForm patient={selected} user={user} onDone={() => { setSelected(null); setMode("salle"); }} />
        </Grid>
      )}
    </Grid>
  );
}

function DashboardSageFemme({ user }) {
  const [mode, setMode] = useState("");
  const [selected, setSelected] = useState(null);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card onClick={() => { setMode("salle"); setSelected(null); }} sx={{ cursor: "pointer" }}>
          <CardHeader title="Salle d'attente" />
          <CardContent><Typography>Patients en attente (Statut: Validé)</Typography></CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card onClick={() => { setMode("historique"); setSelected(null); }} sx={{ cursor: "pointer" }}>
          <CardHeader title="Historique" avatar={<HistoryIcon />} />
          <CardContent><Typography>Vos dépistages effectués</Typography></CardContent>
        </Card>
      </Grid>

      {mode === "salle" && !selected && (
        <Grid item xs={12}>
          <ListPatients
            title="Patients en attente – Étape 3 (Sein)"
            statutFilter={STATUTS.VALIDE}
            onOpen={async (p) => {
              await supabase.from("patients").update({ statut: STATUTS.SEIN_EN_COURS }).eq("id", p.id);
              setSelected({ ...p, statut: STATUTS.SEIN_EN_COURS });
              setMode("form");
            }}
          />
        </Grid>
      )}

      {mode === "historique" && !selected && (
        <Grid item xs={12}>
          <HistoriqueByUser title="Historique Sage-femme" table="depistage_sein" userIdKey="sage_femme_id" userId={user.id} onOpen={(p) => { setSelected(p); setMode("form"); }} />
        </Grid>
      )}

      {mode === "form" && selected && (
        <Grid item xs={12}>
          <BreastScreeningForm patient={selected} user={user} onDone={() => { setSelected(null); setMode("salle"); }} />
        </Grid>
      )}
    </Grid>
  );
}

function DashboardMedecin({ user }) {
  const [mode, setMode] = useState("");
  const [selected, setSelected] = useState(null);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card onClick={() => { setMode("salle"); setSelected(null); }} sx={{ cursor: "pointer" }}>
          <CardHeader title="Salle d'attente" />
          <CardContent><Typography>Patients en attente (Dépistage sein terminé)</Typography></CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card onClick={() => { setMode("historique"); setSelected(null); }} sx={{ cursor: "pointer" }}>
          <CardHeader title="Historique" avatar={<HistoryIcon />} />
          <CardContent><Typography>Vos dépistages vision effectués</Typography></CardContent>
        </Card>
      </Grid>

      {mode === "salle" && !selected && (
        <Grid item xs={12}>
          <ListPatients
            title="Patients en attente – Étape 4 (Vision)"
            statutFilter={STATUTS.SEIN_TERMINE}
            onOpen={async (p) => {
              await supabase.from("patients").update({ statut: STATUTS.VUE_EN_COURS }).eq("id", p.id);
              setSelected({ ...p, statut: STATUTS.VUE_EN_COURS });
              setMode("form");
            }}
          />
        </Grid>
      )}

      {mode === "historique" && !selected && (
        <Grid item xs={12}>
          <HistoriqueByUser title="Historique Médecin" table="depistage_vue" userIdKey="medecin_id" userId={user.id} onOpen={(p) => { setSelected(p); setMode("form"); }} />
        </Grid>
      )}

      {mode === "form" && selected && (
        <Grid item xs={12}>
          <VisionScreeningForm patient={selected} user={user} onDone={() => { setSelected(null); setMode("salle"); }} />
        </Grid>
      )}
    </Grid>
  );
}

/* =================== Admin Dashboard =================== */
function DashboardAdmin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const load = async () => {
    setLoading(true);
    try {
      const { count: totalPatients, data: patientsList } = await supabase
        .from("patients")
        .select("*", { count: "exact" });
      
      const { count: totalSeinTermine } = await supabase
        .from("patients")
        .select("*", { count: "exact", head: true })
        .eq("statut", STATUTS.SEIN_TERMINE);
      
      const { count: totalVueTermine } = await supabase
        .from("patients")
        .select("*", { count: "exact", head: true })
        .eq("statut", STATUTS.VUE_TERMINE);
      
      const { data: depistagesSein } = await supabase
        .from("depistage_sein")
        .select("conclusion_seins, conclusion_seins_ia");
      
      let positifCount = 0;
      
      if (depistagesSein) {
        depistagesSein.forEach((d) => {
          const conclusion = (d.conclusion_seins || d.conclusion_seins_ia || "").toUpperCase();
          if (conclusion.includes("POSITIF")) {
            positifCount++;
          }
        });
      }
      
      let tempsMovenMinutes = 0;
      if (patientsList && patientsList.length > 0) {
        const patientsTermines = patientsList.filter(p => p.statut === STATUTS.VUE_TERMINE);
        
        if (patientsTermines.length > 0) {
          const totalMinutes = patientsTermines.reduce((acc, p) => {
            const created = new Date(p.created_at);
            const updated = new Date(p.updated_at);
            const diffMs = updated - created;
            const diffMinutes = diffMs / (1000 * 60);
            return acc + diffMinutes;
          }, 0);
          
          tempsMovenMinutes = Math.round(totalMinutes / patientsTermines.length);
        }
      }
      
      const heures = Math.floor(tempsMovenMinutes / 60);
      const minutes = tempsMovenMinutes % 60;
      const tempsMovenFormate = heures > 0 ? `${heures}h ${minutes}m` : `${minutes}m`;
      
      setStats({
        total_patients: totalPatients || 0,
        total_depistage_sein_termine: totalSeinTermine || 0,
        total_depistage_vue_termine: totalVueTermine || 0,
        total_positif_sein: positifCount,
        temps_moyen_parcours: tempsMovenFormate,
      });
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques:", error);
      setStats({
        total_patients: 0,
        total_depistage_sein_termine: 0,
        total_depistage_vue_termine: 0,
        total_positif_sein: 0,
        temps_moyen_parcours: "–",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => { load(); }, []);
  
  return (
    <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #FFF8F8 0%, #FCE4EC 100%)" }}>
      <Container sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: "#2C2C2C", fontSize: { xs: "1.5rem", sm: "2rem" } }}>
          📊 Tableau de bord administrateur
        </Typography>

        {/* Statistiques détaillées */}
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }} sx={{ mb: 4 }}>
          {/* Total Patients */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ 
              background: "linear-gradient(135deg, #F8BBD9 0%, #F06292 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 6px 24px rgba(248, 187, 217, 0.4)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 8px 32px rgba(248, 187, 217, 0.5)",
              },
              transition: "all 0.3s ease"
            }}>
              <Box sx={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
              }} />
              <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: "2rem", sm: "2.5rem" } }}>
                    {stats?.total_patients || 0}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 600, fontSize: { xs: "0.95rem", sm: "1rem" } }}>
                    Total Patients
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  👥 Inscrits cette campagne
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Dépistages Sein Terminés */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ 
              background: "linear-gradient(135deg, #F06292 0%, #E91E63 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 6px 24px rgba(240, 98, 146, 0.4)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 8px 32px rgba(240, 98, 146, 0.5)",
              },
              transition: "all 0.3s ease"
            }}>
              <Box sx={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
              }} />
              <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: "2rem", sm: "2.5rem" } }}>
                    {stats?.total_depistage_sein_termine || 0}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 600, fontSize: { xs: "0.95rem", sm: "1rem" } }}>
                    Dépistages Sein Terminés
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  🩺 Examens cliniques effectués
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Dépistages Vue Terminés */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ 
              background: "linear-gradient(135deg, #AD1457 0%, #C2185B 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 6px 24px rgba(173, 20, 87, 0.4)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 8px 32px rgba(173, 20, 87, 0.5)",
              },
              transition: "all 0.3s ease"
            }}>
              <Box sx={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
              }} />
              <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: "2rem", sm: "2.5rem" } }}>
                    {stats?.total_depistage_vue_termine || 0}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 600, fontSize: { xs: "0.95rem", sm: "1rem" } }}>
                    Contrôles Vue Terminés
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  👁️ Examens ophtalmologiques
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Diagnostics Positifs */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ 
              background: "linear-gradient(135deg, #FF6B9D 0%, #FF1744 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 6px 24px rgba(255, 23, 68, 0.4)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 8px 32px rgba(255, 23, 68, 0.5)",
              },
              transition: "all 0.3s ease"
            }}>
              <Box sx={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
              }} />
              <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: "2rem", sm: "2.5rem" } }}>
                    {stats?.total_positif_sein || 0}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 600, fontSize: { xs: "0.95rem", sm: "1rem" } }}>
                    Diagnostics Positifs
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  ⚠️ Anomalies détectées au sein
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Temps Moyen du Parcours */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ 
              background: "linear-gradient(135deg, #2196F3 0%, #1565C0 100%)",
              color: "white",
              borderRadius: 3,
              boxShadow: "0 6px 24px rgba(33, 150, 243, 0.4)",
              position: "relative",
              overflow: "hidden",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 8px 32px rgba(33, 150, 243, 0.5)",
              },
              transition: "all 0.3s ease"
            }}>
              <Box sx={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.1)",
              }} />
              <CardContent sx={{ p: 3, position: "relative", zIndex: 1 }}>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, fontSize: { xs: "2rem", sm: "2.5rem" } }}>
                    {stats?.temps_moyen_parcours || "–"}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.95, fontWeight: 600, fontSize: { xs: "0.95rem", sm: "1rem" } }}>
                    Temps Moyen Parcours
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  ⏱️ De l'inscription à la fin
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {loading && <LinearProgress sx={{ mt: 2 }} />}
      </Container>
    </Box>
  );
}

/* =================== Auth & App =================== */
function LoginPage({ onLogin }) {
  const { control, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (v) => {
    setLoading(true);
    setError("");
    try {
      const user = await authenticate(v.email, v.password);
      onLogin(user);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #FFF8F8 0%, #F8BBD9 100%)",
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      padding: 2
    }}>
      <Container maxWidth="sm">
        <Card sx={{ 
          width: "100%", 
          borderRadius: 3,
          boxShadow: "0 20px 60px rgba(233, 30, 99, 0.15)",
          border: "1px solid rgba(233, 30, 99, 0.1)"
        }}>
          <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Stack alignItems="center" spacing={2} mb={4}>
              <Box sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #F8BBD9 0%, #F06292 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 40px rgba(233, 30, 99, 0.4), 0 0 0 6px rgba(255, 255, 255, 0.9), 0 0 0 8px rgba(233, 30, 99, 0.2)",
                position: "relative",
              }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: "#FFFFFF" }}>🎀</Typography>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#2C2C2C", textAlign: "center", fontSize: { xs: "1.5rem", sm: "2rem" } }}>
                Centre Diagnostic
              </Typography>
              <Typography variant="h6" sx={{ color: "#F8BBD9", fontWeight: 600 }}>
                Octobre Rose
              </Typography>
            </Stack>
            <form onSubmit={handleSubmit(submit)}>
              <Stack spacing={3}>
                <Controller 
                  name="email" 
                  control={control} 
                  defaultValue="" 
                  render={({ field }) => (
                    <TextField 
                      label="Email" 
                      type="email" 
                      fullWidth 
                      required 
                      {...field}
                    />
                  )} 
                />
                <Controller 
                  name="password" 
                  control={control} 
                  defaultValue="" 
                  render={({ field }) => (
                    <TextField 
                      label="Mot de passe" 
                      type="password" 
                      fullWidth 
                      required 
                      {...field}
                    />
                  )} 
                />
                {error && (
                  <Alert severity="error">{error}</Alert>
                )}
                <Button 
                  variant="contained" 
                  type="submit" 
                  disabled={loading}
                  size="large"
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderRadius: 2,
                  }}
                >
                  {loading ? "Connexion..." : "Se connecter"}
                </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Container>
    </Box>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const logout = () => setUser(null);

  return (
    <ThemeProvider theme={themeRose}>
      <CssBaseline />
      {!user ? (
        <LoginPage onLogin={setUser} />
      ) : (
        <>
          <AppBar position="sticky">
            <Toolbar sx={{ justifyContent: "space-between", px: { xs: 1, sm: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img 
                  src="/logo.png" 
                  alt="Logo" 
                  style={{ 
                    height: 40, 
                    filter: "brightness(0) invert(1)"
                  }} 
                />
                <Typography variant="h6" sx={{ flex: 1, fontWeight: 600, fontSize: { xs: "1rem", sm: "1.25rem" } }}>
                  CDL – Octobre Rose
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip label={toTitle(user.role)} sx={{ mr: 1, backgroundColor: "rgba(255, 255, 255, 0.2)", color: "white", fontSize: { xs: "0.75rem", sm: "0.875rem" } }} />
                <IconButton color="inherit" onClick={logout} size="medium"><LogoutIcon /></IconButton>
              </Box>
            </Toolbar>
          </AppBar>

          <Container sx={{ py: { xs: 2, sm: 3, md: 3 }, maxWidth: { xs: "100%", sm: "100%", md: "lg" } }}>
            {user.role === ROLES.AGENT && <DashboardAgent user={user} />}
            {user.role === ROLES.INFIRMIER && <DashboardNurse user={user} />}
            {user.role === ROLES.SAGE_FEMME && <DashboardSageFemme user={user} />}
            {user.role === ROLES.MEDECIN && <DashboardMedecin user={user} />}
            {user.role === ROLES.ADMIN && <DashboardAdmin />}
          </Container>
        </>
      )}
    </ThemeProvider>
  );
}

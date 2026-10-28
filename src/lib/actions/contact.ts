"use server";

import { prisma } from "@/lib/db";

export interface ContactFormState {
  success: boolean;
  message?: string;
  error?: string;
}

export async function submitContactMessage(formData: {
  fullName: string;
  email: string;
  category: string;
  message: string;
}): Promise<ContactFormState> {
  try {
    const { fullName, email, category, message } = formData;

    if (!fullName?.trim() || !email?.trim() || !message?.trim()) {
      return {
        success: false,
        error: "Tous les champs obligatoires doivent être remplis.",
      };
    }

    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, error: "Adresse email invalide." };
    }

    await prisma.contactMessage.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        category: category?.trim() || "Général",
        message: message.trim(),
      },
    });

    return {
      success: true,
      message: "Votre message a été enregistré avec succès.",
    };
  } catch (err) {
    console.error("Erreur enregistrement contact:", err);
    return {
      success: false,
      error:
        "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer.",
    };
  }
}

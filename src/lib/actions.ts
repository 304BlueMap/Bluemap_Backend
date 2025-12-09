"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { classifyImage } from "@/ai/flows/classify-uploaded-images";
import { db } from "@/lib/data";

const submissionSchema = z.object({
  missionId: z.string(),
  photo: z.instanceof(File),
});

const fileToDataUri = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

type FormState = {
  message: string;
  errors?: {
    missionId?: string[];
    photo?: string[];
  }
};

export async function handleSubmission(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = submissionSchema.safeParse({
    missionId: formData.get("missionId"),
    photo: formData.get("photo"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { missionId, photo } = validatedFields.data;

  if (photo.size === 0) {
    return {
      message: "Please select a photo to upload.",
       errors: { photo: ['Photo is required.'] }
    };
  }

  try {
    const photoDataUri = await fileToDataUri(photo);

    const classificationResult = await classifyImage({ photoDataUri });

    // In a real app, this URL would come from Cloud Storage after upload
    const temporaryPhotoUrl = URL.createObjectURL(photo);

    const newSubmission = db.createSubmission({
      userId: "user1", // Mock current user
      missionId,
      photoUrl: temporaryPhotoUrl, // This is temporary and will only work in the user's session
      location: { latitude: 5.4182, longitude: 100.3327 }, // Mock location
      aiResult: classificationResult.aiResult,
      aiConfidenceScore: classificationResult.aiConfidenceScore,
      isVerified: classificationResult.isVerified,
    });
    
    // The redirect needs to be called outside of the try/catch block
    // as it throws an error to interrupt rendering
    redirect(`/submissions/${newSubmission.id}`);

  } catch (error) {
    console.error("Error processing submission:", error);
    return {
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

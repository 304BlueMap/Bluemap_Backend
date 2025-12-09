"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { handleSubmission } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Loader2, Upload } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Upload className="mr-2 h-4 w-4" />
      )}
      <span>{pending ? "Submitting..." : "Submit for Verification"}</span>
    </Button>
  );
}

export function SubmissionUploadForm({ missionId }: { missionId: string }) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(handleSubmission, initialState);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Finding</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={dispatch} className="space-y-6">
          <input type="hidden" name="missionId" value={missionId} />
          <div className="space-y-2">
            <Label htmlFor="photo">Upload Photo</Label>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="photo" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors">
                    {preview ? (
                        <Image src={preview} alt="Image preview" width={256} height={256} className="h-full w-auto object-contain p-2" />
                    ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Camera className="w-10 h-10 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                        </div>
                    )}
                    <Input id="photo" name="photo" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                </label>
            </div>
            {state.errors?.photo && (
              <p className="text-sm font-medium text-destructive">
                {state.errors.photo[0]}
              </p>
            )}
          </div>
          
          <SubmitButton />

          {state.message && !state.errors && (
            <p className="text-sm font-medium text-destructive">{state.message}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

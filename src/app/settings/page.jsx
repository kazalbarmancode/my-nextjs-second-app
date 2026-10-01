"use client";

import { updateUser } from "@/lib/auth-client";
import { FloppyDisk } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Fieldset,
  Form,
  Input,
  Label,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import React from "react";

export default function Settings() {
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    console.log("Form submitted data:", userData);

    // Better Auth updateUser API Call
    const res = await updateUser({
      name: userData.name,
      // image: userData.image, (প্রয়োজন হলে যোগ করতে পারেন)
    });

    console.log("After update response:", res);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <Surface className="w-full max-w-lg p-8 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
        <Form onSubmit={handleUpdateUser}>
          <Fieldset className="w-full flex flex-col gap-5">
            <div>
              <Fieldset.Legend className="text-2xl font-bold text-white">
                Profile Settings
              </Fieldset.Legend>
              <Description className="text-sm text-slate-400 mt-1">
                Update your profile information.
              </Description>
            </div>

            <Fieldset.Group className="flex flex-col gap-4">
              {/* Name Field */}
              <TextField
                isRequired
                name="name"
                className="flex flex-col gap-1.5"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-slate-300">Name</Label>
                <Input
                  placeholder="John Doe"
                  variant="secondary"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FieldError className="text-xs text-red-400 mt-1" />
              </TextField>

              {/* Email Field */}
              <TextField isRequired name="email" type="email" className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-slate-300">Email</Label>
                <Input
                  placeholder="john@example.com"
                  variant="secondary"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FieldError className="text-xs text-red-400 mt-1" />
              </TextField>

              {/* Bio Field */}
              <TextField
                isRequired
                name="bio"
                className="flex flex-col gap-1.5"
                validate={(value) => {
                  if (value.length < 10) {
                    return "Bio must be at least 10 characters";
                  }
                  return null;
                }}
              >
                <Label className="text-sm font-medium text-slate-300">Bio</Label>
                <TextArea
                  placeholder="Tell us about yourself..."
                  variant="secondary"
                  className="w-full p-4 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24 resize-none"
                />
                <Description className="text-xs text-slate-400 mt-1">
                  Minimum 10 characters
                </Description>
                <FieldError className="text-xs text-red-400 mt-1" />
              </TextField>
            </Fieldset.Group>

            {/* Action Buttons */}
            <Fieldset.Actions className="flex gap-3 mt-4">
              <Button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg shadow-md transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <FloppyDisk className="size-4" />
                Save changes
              </Button>
              <Button
                type="reset"
                variant="tertiary"
                className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Cancel
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
}
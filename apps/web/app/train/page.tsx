"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UploadModal } from "@/components/ui/upload";
import { TrainModelInput } from "common/inferred";
import axios from "axios";
import { BACKEND_URL } from "lib/Utils";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [zipUrl, setZipUrl] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("Man");
  const [age, setAge] = useState(0);
  const [ethinicity, setEthinicity] = useState("");
  const [eyeColor, setEyeColor] = useState("");
  const [bald, setBald] = useState(false);


  async function handleTrainModal() {
    const input = {
      name,
      zipUrl,
      type,
      age,
      ethinicity,
      eyeColor,
      bald,
    };

    console.log(input)

    const res = await axios.post(`${BACKEND_URL}/ai/training`,input);
    console.log(res)
    router.push("/");
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[450px] p-6">
        <CardHeader>
          <CardTitle>Train New Model</CardTitle>
          <CardDescription>
            Create a custom AI model with your photos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Model Name</Label>
                <Input
                  id="name"
                  placeholder="Name of your project"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Type</Label>
                <Select onValueChange={(value) => setType(value)}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Man" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Man">Man</SelectItem>
                    <SelectItem value="Woman">Woman</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Age</Label>
                <Input
                  placeholder="Enter the age of the model"
                  onChange={(e) => setAge(parseInt(e.target.value))}
                ></Input>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Ethnicity</Label>
                <Select onValueChange={(value) => setEthinicity(value)}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="White" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="White">White</SelectItem>
                    <SelectItem value="Black">Black</SelectItem>
                    <SelectItem value="Asian_American">
                      Asian American
                    </SelectItem>
                    <SelectItem value="Eastern_Asian">Eastern Asian</SelectItem>
                    <SelectItem value="South_East_Asian">
                      South East Asian
                    </SelectItem>
                    <SelectItem value="South_Asian">South Asian</SelectItem>
                    <SelectItem value="Middle_Eastern">
                      Middle Eastern
                    </SelectItem>
                    <SelectItem value="Pacific">Pacific</SelectItem>
                    <SelectItem value="Hispanic">Hispanic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Eye Color</Label>
                <Select onValueChange={(value) => setEyeColor(value)}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Brown" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Brown">Brown</SelectItem>
                    <SelectItem value="Blue">Blue</SelectItem>
                    <SelectItem value="Hazel">Hazel</SelectItem>
                    <SelectItem value="Gray">Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="airplane-mode">Bald</Label>
                  <Switch id="airplane-mode" onClick={(e) => setBald(!bald)} />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <UploadModal
          onUploadDone={(zipUrl) => {
            setZipUrl(zipUrl);
          }}
        />
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button
            disabled={
              !zipUrl || !type || !age || !ethinicity  || !eyeColor || !name
            }
            onClick={handleTrainModal}
          >
            Train Model
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;

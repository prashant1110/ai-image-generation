import React from "react";

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

const page = () => {
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
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Type</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Man" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Man</SelectItem>
                    <SelectItem value="sveltekit">Woman</SelectItem>
                    <SelectItem value="astro">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Age</Label>
                <Input placeholder="Enter the age of the model"></Input>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Ethnicity</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="White" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="Asian American">
                      Asian American
                    </SelectItem>
                    <SelectItem value="Eastern Asian">Eastern Asian</SelectItem>
                    <SelectItem value="South East Asian">
                      South East Asian
                    </SelectItem>
                    <SelectItem value="South Asian">South Asian</SelectItem>
                    <SelectItem value="Middle Eastern">
                      Middle Eastern
                    </SelectItem>
                    <SelectItem value="Pacific">Pacific</SelectItem>
                    <SelectItem value="Hispanic">Hispanic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Eye Color</Label>
                <Select>
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
                  <Switch id="airplane-mode" />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <UploadModal/>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Train Model</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;

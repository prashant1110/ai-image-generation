import express from "express";
import {
  TrainModel,
  GenerateImage,
  GenerateImagesFromPack,
} from "common/types";
import { prismaClient } from "db";

const app = express();
const PORT = 4000;
const USER_ID = "123";

//training model
app.post("/ai/training", async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({
      message: "Input incorrect",
    });
    return;
  }

  const data = await prismaClient.model.create({
    data: {
      name: parsedBody.data?.name,
      type: parsedBody.data?.type,
      age: parsedBody.data?.age,
      ethinicity: parsedBody.data?.ethinicity,
      eyeColor: parsedBody.data?.eyeColor,
      bald: parsedBody.data?.bald,
      userId: USER_ID,
    },
  });

  res.json({
    modelId: data.id,
  });
});

//generate image based on model
app.post("/ai/generate", async (req, res) => {
  const parsedBody = GenerateImage.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({});
    return;
  }

  const data = await prismaClient.outputImages.create({
    data: {
      userId: USER_ID,
      prompt: parsedBody.data.prompt,
      modelId: parsedBody.data.modelId,
      imageUrl: "",
    },
  });

  res.json({
    imageId: data.id,
  });
});

//generate pack of images
app.post("/pack/generate", async (req, res) => {
  const parsedBody = GenerateImagesFromPack.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({
      message: "input incorrect",
    });
    return;
  }

  const prompt = await prismaClient.packPrompts.findMany({
    where: {
      packId: parsedBody.data?.packId,
    },
  });

  const images = await prismaClient.outputImages.createManyAndReturn({
    data: prompt.map((prompt) => ({
      userId: USER_ID,
      prompt: prompt.prompt,
      modelId: parsedBody.data?.modelId,
      imageUrl: "",
    })),
  });

  res.json({
    images: images.map((image) => image.id),
  });
});

//get all packs
app.get("/pack/bulk", async (req, res) => {
  const pack = await prismaClient.packs.findMany({});

  res.json({
    pack,
  });
});

//get single image
app.get("/image/bulk", async (req, res) => {
  const images = req.query.images as string[];
  const limit = (req.query.limit as string) ?? "10";
  const offset = (req.query.offset as string) ?? "0";

  const imageData = await prismaClient.outputImages.findMany({
    where: {
      id: { in: images },
      userId: USER_ID,
    },
    skip: parseInt(offset),
    take: parseInt(limit),
  });

  res.json({
    images: imageData,
  });
});

app.post("/fal-ai/webhook/train", async (req, res) => {
  const reqId = req.body.request_id;

  await prismaClient.model.updateMany({
    where: {
      falAiRequestedId: reqId,
    },
    data: {
      trainingStatus: "Generated",
      tensorPath: req.body.tensor_path,
    },
  });

  res.json({ message: "webhook received" });
});

app.post("/fal-ai/webhook/image", async (req, res) => {
  const reqId = req.body.request_id;

  await prismaClient.outputImages.updateMany({
    where: {
      falAiRequestedId: reqId,
    },
    data: {
      status: "Generated",
      imageUrl: req.body.image_url,
    },
  });

  res.json({ message: "webhook received" });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

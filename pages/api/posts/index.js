import Post from "../../../models/post";
import db from "../../../lib/dbConnect";

export default async function handler(req, res) {
  if (req.method !== "GET" || req.method !== "POST") {
    res.status(405).json({ error: "only POST amd GET methods are allowed" });
  }

  if (req.method == "GET") {
    await db.connect();

    const posts = await Post.find({});

    await db.disconnect();

    res.status(200).json({ posts });
    return;
  } else if (req.method == "POST") {
    await db.connect();

    const { title, body } = req.body;

    const post = await Post.create({
      title,
      body,
    });

    await db.disconnect();

    res.status(201).json({ post });
  }
}

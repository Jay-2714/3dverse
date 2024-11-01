
import { exec } from "child_process";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const intro = req.body.intro; 
  exec(`python3 ./public/models/Intro.blend ${intro} --python ./scripts/updattext.py`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).json({ message: 'Error updating Blender text' });
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).json({ message: 'Error in script' });
    }
    
    console.log(`Stdout: ${stdout}`);
    res.status(200).json({ message: 'Text updated successfully' });
  });
}

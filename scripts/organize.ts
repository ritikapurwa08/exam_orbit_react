import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// This script compiles individual JSON files from data/raw_questions
// into a single src/data/generated_questions.json
// Expected naming convention: subjectId-topicId.json
// e.g. rajasthan_geography-physical_features.json
async function organizeQuestions() {
  const rawDir = join(process.cwd(), 'data', 'raw_questions');
  const outDir = join(process.cwd(), 'src', 'data');
  const outPath = join(outDir, 'generated_questions.json');
  
  // Create directories if they don't exist
  if (!existsSync(rawDir)) {
    await mkdir(rawDir, { recursive: true });
    // Write a dummy file so the user knows what to do
    await writeFile(
      join(rawDir, 'example_subject-example_topic.json'),
      JSON.stringify(
        [
          {
            id: "q1",
            text: "Example question?",
            options: ["A", "B", "C", "D"],
            correctAnswerIndex: 0,
            explanation: "Because A is correct."
          }
        ],
        null,
        2
      )
    );
    console.log(`Created ${rawDir} with an example JSON file.`);
  }

  if (!existsSync(outDir)) {
    await mkdir(outDir, { recursive: true });
  }

  try {
    const files = await readdir(rawDir);
    const organizedData: Record<string, Record<string, any[]>> = {};

    let processedCount = 0;
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      
      const content = await readFile(join(rawDir, file), 'utf-8');
      const questions = JSON.parse(content);
      
      const parts = file.replace('.json', '').split('-');
      if (parts.length < 2) {
        console.warn(`File ${file} does not match subjectId-topicId.json pattern. Skipping.`);
        continue;
      }
      
      const [subjectId, topicId] = parts;
      
      if (!organizedData[subjectId]) organizedData[subjectId] = {};
      organizedData[subjectId][topicId] = questions;
      processedCount++;
    }

    await writeFile(outPath, JSON.stringify(organizedData, null, 2));
    console.log(`\n✅ Successfully organized ${processedCount} file(s) into ${outPath}\n`);
  } catch (err) {
    console.error('❌ Error organizing questions:', err);
  }
}

organizeQuestions();

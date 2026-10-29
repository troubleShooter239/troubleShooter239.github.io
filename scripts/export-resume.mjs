import { mkdir, writeFile } from 'node:fs/promises';
import { profile } from '../src/profile.ts';
import { experience, skills } from '../src/data.ts';
import {
  collegeSubjects,
  collegeTechnologies,
  hackathons,
  reading,
  practice,
} from '../src/learning.ts';

await mkdir(new URL('../work/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../work/resume-data.json', import.meta.url),
  JSON.stringify(
    {
      profile,
      experience,
      skills,
      collegeSubjects,
      collegeTechnologies,
      hackathons,
      reading,
      practice,
    },
    null,
    2,
  ),
);

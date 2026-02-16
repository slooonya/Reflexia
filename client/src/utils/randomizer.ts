import { PROMPTS } from '../pages/reflection/reflectionSteps';

export function pickStepPrompt(step){
  const pool = PROMPTS[step];

  if (!pool || pool.length === 0) {
    return "";
  }

  return pool[Math.floor(Math.random() * pool.length)];
}
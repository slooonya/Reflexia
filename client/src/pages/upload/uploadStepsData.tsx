import { type ReactNode } from "react";

import Step1 from '../../assets/images/instruction-step-1.png';
import Step2 from '../../assets/images/instruction-step-2.png';
import Step3 from '../../assets/images/instruction-step-3.png';
import Step4 from '../../assets/images/instruction-step-4.png';
import Step5 from '../../assets/images/instruction-step-5.png';
import Step6 from '../../assets/images/instruction-step-6.png';

export type InstructionStep = {
  image: string,
  description: ReactNode
}

export const steps: InstructionStep[] = [
    {
      image: Step1,
      description: <>
                      Visit <a href="https://takeout.google.com">Google Takeout</a> and select 
                      <strong> YouTube and Youtube Music</strong>.
                   </>
    },
    {
      image: Step2,
      description: <>Under 'Multiple formats,' select <strong>JSON for History.</strong></>
    },
    {
      image: Step3,
      description: <>Under 'All Youtube data included,' select <strong>'history'</strong>.</>
    },
    {
      image: Step4,
      description: <>Click on <strong>'Create export.'</strong></>
    },
    {
      image: Step5,
      description: <>After a few minutes, check your email and <strong>download the data report.</strong></>
    },
    {
      image: Step6,
      description: <>
                    Unzip the file and upload the <code>watch-history.json</code> file. 
                    It can be found at <code>Takeout/YouTube and YouTube Music/history/watch-history.json</code>.
                   </>
    }
  ]
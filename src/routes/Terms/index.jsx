import { SCALE } from 'src/constants';
import BrandHeader from 'src/components/BrandHeader';

import { termsString } from './content';

export default function Terms() {
  return (
    <div className="flex flex-col items-center mt-10">
      <BrandHeader />
      <p className={`${SCALE.WEB_WIDTH} whitespace-pre-wrap`}>{termsString}</p>
    </div>
  );
}

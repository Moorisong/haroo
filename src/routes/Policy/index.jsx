import { SCALE } from 'src/constants';
import BrandHeader from 'src/components/BrandHeader';

import { policyString } from './content';

export default function Policy() {
  return (
    <div className="flex flex-col items-center mt-10">
      <BrandHeader />
      <p className={`${SCALE.WEB_WIDTH} whitespace-pre-wrap`}>{policyString}</p>
    </div>
  );
}

import { SCALE } from 'src/constants';
import BrandHeader from 'src/components/BrandHeader';

import { aboutString } from './content';

export default function Policy() {
  return (
    <div className="flex flex-col items-center mt-10">
      <BrandHeader />
      <p className={`${SCALE.WIDTH_20} whitespace-pre-wrap text-sm`}>{aboutString}</p>
    </div>
  );
}

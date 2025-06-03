import { SCALE, COMPONENT_STYLE } from 'src/constants';
import BrandHeader from 'src/components/BrandHeader';

import { aboutString } from './content';

export default function Policy() {
  return (
    <div className={`${COMPONENT_STYLE.FLEX_COL_ITEM_CENTER} mt-10`}>
      <BrandHeader />
      <p className={`${SCALE.WIDTH_20} whitespace-pre-wrap text-sm mx-auto`}>{aboutString}</p>
    </div>
  );
}

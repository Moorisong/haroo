import { SCALE, COMPONENT_STYLE } from 'src/constants';
import BrandHeader from 'src/components/BrandHeader';

import { termsString } from './content';

export default function Terms() {
  return (
    <div className={`${COMPONENT_STYLE.FLEX_COL_ITEM_CENTER} mt-10`}>
      <BrandHeader />
      <p className={`${SCALE.WEB_WIDTH} whitespace-pre-wrap mx-auto`}>{termsString}</p>
    </div>
  );
}

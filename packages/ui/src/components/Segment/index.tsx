import { Segment as SUISegment } from 'semantic-ui-react';

type SegmentProps = React.ComponentProps<typeof SUISegment>;

export const Segment: React.FC<SegmentProps> = (props) => {
  return <SUISegment {...props} />;
};

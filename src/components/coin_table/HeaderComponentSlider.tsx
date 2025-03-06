import SegmentedControl from '@react-native-segmented-control/segmented-control';
import { useState } from 'react';

const HeaderComponentSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <SegmentedControl
      values={['Rype250', 'Meme50', 'Watchlist']}
      selectedIndex={selectedIndex}
      onChange={event => {
        setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
      }}
    />
  );
};

export default HeaderComponentSlider;

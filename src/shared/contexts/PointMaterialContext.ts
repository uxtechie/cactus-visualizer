import { PointMaterialProxy } from '@Types';
import { Dispatch, SetStateAction, createContext } from 'react';

interface PointMaterialContextProps {
  pointMaterialProxy: PointMaterialProxy;
  setPointMaterialProxy: Dispatch<SetStateAction<PointMaterialProxy>>;
}

export const PointMaterialContext = createContext<PointMaterialContextProps>(
  {
    pointMaterialProxy: {},
    setPointMaterialProxy: () => {}
  });

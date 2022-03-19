import React, { FC, useEffect, useRef } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";

export const NodeWrapper: FC<any> = ({
  value,
  text,
  updateOrder,
  registerItem,
  children,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const layout = useRef<any>(null);
  useEffect(() => {
    registerItem(value, layout.current!);
  }, [registerItem, updateOrder]);

  const point = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const zIndex = useTransform([point.x, point.y], ([latestX, latestY]) =>
    latestX || latestY ? 1 : "unset"
  );

  return (
    <motion.li
      ref={ref}
      drag
      layout
      dragSnapToOrigin
      style={{
        x: point.x,
        y: point.y,
        zIndex,
      }}
      onLayoutMeasure={(measured) => {
        layout.current = measured;
      }}
      onDrag={(event, gesturePoint) => {
        const { velocity } = gesturePoint;
        velocity.y && updateOrder(value, point.y.get(), velocity.y);
      }}
    >
      <>{children}
      {value.children && (
        <motion.div
          style={{
            width: "20px",
            height: "60px",
            backgroundColor: "royalblue",
          }}
        ></motion.div>
      )}</>
    </motion.li>
  );
};
